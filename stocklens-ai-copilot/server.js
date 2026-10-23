require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const path = require("path");
const { databaseConfigured, ensureSchema, query } = require("./db");
const { runMarketPulse } = require("./scripts/market-pulse");

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "20kb" }));
app.disable("x-powered-by");
// Small in-memory per-IP limiter; resets naturally when the instance restarts.
const requestBuckets = new Map();
app.use("/api", (req, res, next) => {
  const now = Date.now();
  const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown").split(",")[0].trim();
  let bucket = requestBuckets.get(ip);
  if (!bucket || now - bucket.start > 60_000) bucket = { start: now, count: 0 };
  bucket.count += 1; requestBuckets.set(ip, bucket);
  if (bucket.count > 90) return res.status(429).json({ error: "มีคำขอมากเกินไป กรุณารอประมาณ 1 นาทีแล้วลองใหม่" });
  if (requestBuckets.size > 5000) for (const [key, value] of requestBuckets) if (now - value.start > 60_000) requestBuckets.delete(key);
  next();
});
app.use(express.static(path.join(__dirname, "public")));

const SYMBOL_RE = /^[A-Z0-9.^-]{1,20}$/;
const cache = new Map();
const CACHE_TTL_MS = 60_000;

function validSymbol(value) {
  return typeof value === "string" && SYMBOL_RE.test(value.trim().toUpperCase());
}

function cached(key) {
  const item = cache.get(key);
  if (!item || Date.now() - item.savedAt > (item.ttl || CACHE_TTL_MS)) {
    cache.delete(key);
    return null;
  }
  return item.value;
}

function setCache(key, value, ttl = CACHE_TTL_MS) {
  cache.set(key, { value, savedAt: Date.now(), ttl });
}

function parseFinnhubCandles(payload) {
  if (payload?.s !== "ok" || !Array.isArray(payload.t) || !Array.isArray(payload.c)) return [];
  return payload.t.map((time, index) => ({
    time: Number(time) * 1000,
    close: Number(payload.c[index]),
    high: Number(payload.h?.[index]),
    low: Number(payload.l?.[index]),
    open: Number(payload.o?.[index]),
    volume: Number(payload.v?.[index])
  })).filter((item, index) => payload.c[index] != null && Number.isFinite(item.time) && Number.isFinite(item.close));
}

async function fetchFinnhubCandles(symbol, from, to, key) {
  const url = new URL("https://finnhub.io/api/v1/stock/candle");
  url.searchParams.set("symbol", symbol);
  url.searchParams.set("resolution", "D");
  url.searchParams.set("from", String(from));
  url.searchParams.set("to", String(to));
  url.searchParams.set("token", key);
  const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(`Finnhub returned HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  const candles = parseFinnhubCandles(payload);
  if (!candles.length) throw new Error(payload.s === "no_data" ? "Finnhub returned no candles" : "Finnhub returned invalid candles");
  return candles;
}

async function fetchYahooCandles(symbol, from, to) {
  // Yahoo Finance uses hyphens for share classes (for example BRK-B).
  const yahooSymbol = symbol.replace(/\./g, "-");
  const url = new URL(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}`);
  url.searchParams.set("period1", String(from));
  url.searchParams.set("period2", String(to));
  url.searchParams.set("interval", "1d");
  const response = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": "Mozilla/5.0 StockLensAI/2.0" },
    signal: AbortSignal.timeout(12000)
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`Yahoo Finance returned HTTP ${response.status}`);
  if (payload.chart?.error) throw new Error(payload.chart.error.description || "Yahoo Finance rejected the ticker");
  const result = payload.chart?.result?.[0];
  const quote = result?.indicators?.quote?.[0];
  if (!Array.isArray(result?.timestamp) || !Array.isArray(quote?.close)) throw new Error("Yahoo Finance returned no daily history");
  const candles = result.timestamp.map((time, index) => ({
    time: Number(time) * 1000,
    close: Number(quote.close[index]),
    high: Number(quote.high?.[index]),
    low: Number(quote.low?.[index]),
    open: Number(quote.open?.[index]),
    volume: Number(quote.volume?.[index])
  })).filter((item, index) => quote.close[index] != null && Number.isFinite(item.time) && Number.isFinite(item.close));
  if (!candles.length) throw new Error("Yahoo Finance returned no usable daily history");
  return candles;
}

app.get("/api/health", async (_req, res) => {
  let neon = databaseConfigured() ? "unavailable" : "not_configured";
  if (databaseConfigured()) {
    try {
      await ensureSchema();
      await query("SELECT 1");
      neon = "connected";
    } catch (error) {
      console.error("Neon health check failed:", error.message);
    }
  }
  res.json({
    ok: true,
    service: "StockLens AI",
    timestamp: new Date().toISOString(),
    integrations: {
      finnhub: Boolean(process.env.FINNHUB_API_KEY),
      gemini: Boolean(process.env.GEMINI_API_KEY),
      neon
    }
  });
});

async function readMarketPulse() {
  if (!databaseConfigured()) throw new Error("กรุณาตั้ง DATABASE_URL เพื่อเชื่อมต่อ Neon");
  await ensureSchema();
  const briefResult = await query(
    `SELECT as_of_date, summary, model, symbols_count, generated_at
     FROM market_briefs ORDER BY as_of_date DESC LIMIT 1`
  );
  const brief = briefResult.rows[0] || null;
  const snapshotsResult = brief
    ? await query(
        `SELECT as_of_date, symbol, price, change, change_percent, day_high, day_low,
                day_open, previous_close, quote_time, captured_at
         FROM market_snapshots WHERE as_of_date = $1 ORDER BY symbol`,
        [brief.as_of_date]
      )
    : await query(
        `SELECT as_of_date, symbol, price, change, change_percent, day_high, day_low,
                day_open, previous_close, quote_time, captured_at
         FROM market_snapshots
         WHERE as_of_date = (SELECT MAX(as_of_date) FROM market_snapshots)
         ORDER BY symbol`
      );
  const runResult = await query(
    `SELECT status, started_at, finished_at, error, details
     FROM cron_runs WHERE job_name = 'market-pulse'
     ORDER BY started_at DESC LIMIT 1`
  );
  const snapshots = snapshotsResult.rows;
  return {
    available: Boolean(brief), brief, snapshots,
    snapshotDate: brief?.as_of_date || snapshots[0]?.as_of_date || null,
    lastRun: runResult.rows[0] || null
  };
}

app.get("/api/market-pulse", async (_req, res) => {
  if (!databaseConfigured()) {
    return res.status(503).json({ error: "กรุณาตั้ง DATABASE_URL เพื่อเชื่อมต่อ Neon" });
  }
  try {
    res.json(await readMarketPulse());
  } catch (error) {
    console.error("Market pulse error:", error.message);
    res.status(503).json({ error: "อ่านสรุปตลาดจาก Neon ไม่สำเร็จ กรุณาตรวจการตั้งค่า DATABASE_URL" });
  }
});

let marketPulseRefresh = null;
app.post("/api/market-pulse/refresh", async (_req, res) => {
  if (!databaseConfigured()) return res.status(503).json({ error: "กรุณาตั้ง DATABASE_URL เพื่อเชื่อมต่อ Neon" });
  if (!process.env.FINNHUB_API_KEY) return res.status(503).json({ error: "กรุณาตั้ง FINNHUB_API_KEY ใน Environment ของ Web Service" });
  try {
    if (!marketPulseRefresh) {
      marketPulseRefresh = runMarketPulse({ trigger: "manual" }).finally(() => { marketPulseRefresh = null; });
    }
    await marketPulseRefresh;
    res.json(await readMarketPulse());
  } catch (error) {
    console.error("Manual market pulse failed:", error.message);
    res.status(502).json({ error: error.message || "อัปเดตภาพรวมตลาดไม่สำเร็จ" });
  }
});

const NEWS_IMPACT_RULES = [
  { label: "rates", pattern: /\b(fed|fomc|federal reserve|interest rate|rate cut|rate hike|central bank|monetary policy)\b|เฟด|ดอกเบี้ย|ธนาคารกลาง/i },
  { label: "inflation", pattern: /\b(inflation|cpi|pce|consumer price|producer price)\b|เงินเฟ้อ/i },
  { label: "economy", pattern: /\b(payrolls?|unemployment|jobs report|nonfarm|gdp|recession)\b|การจ้างงาน|ว่างงาน|จีดีพี|เศรษฐกิจถดถอย/i },
  { label: "trade", pattern: /\b(tariff|trade war|sanction|export ban|shutdown|debt ceiling)\b|ภาษีนำเข้า|สงครามการค้า|คว่ำบาตร/i },
  { label: "energy", pattern: /\b(war|missile|conflict|oil price|opec|crude|strait of hormuz)\b|สงคราม|น้ำมัน|ภูมิรัฐศาสตร์/i },
  { label: "company", pattern: /\b(earnings|profit warning|guidance|merger|acquisition|bankruptcy|layoffs)\b|ผลประกอบการ|ควบรวม|ล้มละลาย|เลิกจ้าง/i }
];

function scoreNewsImpact(article) {
  const text = (String(article.headline || "") + " " + String(article.summary || "")).slice(0, 2400);
  const topics = NEWS_IMPACT_RULES.filter(rule => rule.pattern.test(text)).map(rule => rule.label);
  const macroHits = topics.filter(topic => topic !== "company").length;
  return { impact: macroHits > 0 ? "high" : topics.length ? "watch" : "normal", topics };
}

app.get("/api/news", async (_req, res) => {
  if (!process.env.FINNHUB_API_KEY) return res.status(503).json({ error: "กรุณาตั้ง FINNHUB_API_KEY เพื่อโหลดข่าวตลาด" });
  const saved = cached("market-news:general");
  if (saved) return res.json(saved);
  try {
    const url = new URL("https://finnhub.io/api/v1/news");
    url.searchParams.set("category", "general");
    url.searchParams.set("token", process.env.FINNHUB_API_KEY);
    const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!response.ok) throw new Error(response.status === 429 ? "Finnhub news rate limit reached" : "Finnhub news returned " + response.status);
    const payload = await response.json();
    if (!Array.isArray(payload)) throw new Error("Finnhub returned an invalid news response");
    const cutoff = Math.floor(Date.now() / 1000) - 7 * 86400;
    const articles = payload
      .filter(item => item && item.headline && Number.isFinite(Number(item.datetime)) && Number(item.datetime) >= cutoff && /^https?:\/\//i.test(String(item.url || "")))
      .map(item => ({
        id: String(item.id || item.url), headline: String(item.headline).slice(0, 240),
        summary: String(item.summary || "").slice(0, 320), source: String(item.source || "Finnhub").slice(0, 80),
        url: item.url, datetime: Number(item.datetime), ...scoreNewsImpact(item)
      }))
      .sort((a, b) => (a.impact === "high" ? 0 : a.impact === "watch" ? 1 : 2) - (b.impact === "high" ? 0 : b.impact === "watch" ? 1 : 2) || b.datetime - a.datetime)
      .slice(0, 8);
    const result = { articles, source: "Finnhub" };
    setCache("market-news:general", result, 5 * 60_000);
    res.json(result);
  } catch (error) {
    console.error("Market news error:", error.message);
    res.status(502).json({ error: error.message || "โหลดข่าวตลาดไม่สำเร็จ" });
  }
});

app.get("/api/search", async (req, res) => {
  const q = String(req.query.q || "").trim();
  if (q.length < 1 || q.length > 60) {
    return res.status(400).json({ error: "กรุณาพิมพ์ชื่อหุ้นหรือ Ticker" });
  }

  const cacheKey = `search:${q.toLowerCase()}`;
  const saved = cached(cacheKey);
  if (saved) return res.json(saved);

  // Finnhub symbol search works best for US symbols; Thai coverage depends on plan/provider.
  if (!process.env.FINNHUB_API_KEY) {
    return res.status(503).json({
      error: "ยังไม่ได้ตั้งค่า Finnhub API Key",
      hint: "คัดลอก .env.example เป็น .env แล้วใส่ API key ใหม่ที่ Finnhub"
    });
  }

  try {
    const url = new URL("https://finnhub.io/api/v1/search");
    url.searchParams.set("q", q);
    url.searchParams.set("token", process.env.FINNHUB_API_KEY);
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) {
      return res.status(response.status === 429 ? 429 : 502).json({
        error: response.status === 429
          ? "Finnhub rate limit เต็ม กรุณารอสักครู่"
          : "ค้นหาหุ้นผ่าน Finnhub ไม่สำเร็จ"
      });
    }
    const payload = await response.json();
    const results = (payload.result || []).slice(0, 12).map(x => ({
      symbol: x.displaySymbol || x.symbol,
      description: x.description || "",
      type: x.type || ""
    }));
    const result = { results, source: "Finnhub" };
    setCache(cacheKey, result);
    res.json(result);
  } catch (error) {
    console.error("Search error:", error.message);
    res.status(502).json({ error: "เชื่อมต่อ Finnhub ไม่สำเร็จ" });
  }
});

app.get("/api/candles/:symbol", async (req, res) => {
  const symbol = String(req.params.symbol || "").trim().toUpperCase();
  if (!validSymbol(symbol)) return res.status(400).json({ error: "Ticker ไม่ถูกต้อง" });
  const key = process.env.FINNHUB_API_KEY;
  const days = Math.max(7, Math.min(365, Number.parseInt(req.query.days || "90", 10) || 90));
  const cacheKey = `candles:${symbol}:${days}`;
  const saved = cached(cacheKey);
  if (saved) return res.json(saved);
  const to = Math.floor(Date.now() / 1000);
  const from = to - days * 86400;

  if (key) {
    try {
      const candles = await fetchFinnhubCandles(symbol, from, to, key);
      const result = { symbol, candles, source: "Finnhub", days };
      setCache(cacheKey, result);
      return res.json(result);
    } catch (error) {
      // Daily candles may be unavailable on the configured Finnhub plan. Keep
      // the chart controls usable by trying the no-key historical-data fallback.
      console.warn("Finnhub candles unavailable; trying Yahoo Finance fallback:", error.message);
    }
  }

  try {
    const candles = await fetchYahooCandles(symbol, from, to);
    const result = { symbol, candles, source: "Yahoo Finance (สำรอง)", days };
    setCache(cacheKey, result);
    return res.json(result);
  } catch (error) {
    console.error("Historical chart providers failed:", error.message);
    return res.status(502).json({
      error: key
        ? "ดึงกราฟไม่สำเร็จทั้งจาก Finnhub และแหล่งข้อมูลสำรอง ตรวจ Ticker แล้วลองใหม่"
        : "ดึงกราฟจากแหล่งข้อมูลสำรองไม่สำเร็จ ตรวจ Ticker แล้วลองใหม่"
    });
  }
});

app.get("/api/quote/:symbol", async (req, res) => {
  const symbol = String(req.params.symbol || "").trim().toUpperCase();
  if (!validSymbol(symbol)) return res.status(400).json({ error: "Ticker ไม่ถูกต้อง" });
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return res.status(503).json({ error: "ยังไม่ได้ตั้งค่า Finnhub API Key" });

  const cacheKey = `quote:${symbol}`;
  const saved = cached(cacheKey);
  if (saved) return res.json(saved);

  try {
    const url = new URL("https://finnhub.io/api/v1/quote");
    url.searchParams.set("symbol", symbol);
    url.searchParams.set("token", key);
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) {
      return res.status(response.status === 429 ? 429 : 502).json({
        error: response.status === 429 ? "Finnhub rate limit เต็ม" : "ดึงราคาหุ้นไม่สำเร็จ"
      });
    }
    const q = await response.json();
    if (!q || (!q.c && !q.pc)) {
      return res.status(404).json({
        error: "ไม่พบราคาสำหรับ Ticker นี้ หรือแผน API ไม่รองรับตลาดดังกล่าว",
        symbol
      });
    }
    const result = {
      symbol,
      price: q.c,
      change: q.d,
      changePercent: q.dp,
      high: q.h,
      low: q.l,
      open: q.o,
      previousClose: q.pc,
      timestamp: q.t ? new Date(q.t * 1000).toISOString() : null,
      source: "Finnhub",
      note: "ความล่าช้าและความครอบคลุมของข้อมูลขึ้นอยู่กับตลาดและแพ็กเกจ API"
    };
    setCache(cacheKey, result);
    res.json(result);
  } catch (error) {
    console.error("Quote error:", error.message);
    res.status(502).json({ error: "เชื่อมต่อ Finnhub ไม่สำเร็จ" });
  }
});

const MARKET_GROUPS = [
  ["XLC", "Communication Services", "บริการสื่อสาร", "Communication services", "บริการสื่อสาร"],
  ["XLY", "Consumer Discretionary", "สินค้าอุปโภคบริโภคฟุ่มเฟือย", "Consumer discretionary", "สินค้าอุปโภคบริโภคฟุ่มเฟือย"],
  ["XLP", "Consumer Staples", "สินค้าอุปโภคบริโภคจำเป็น", "Consumer staples", "สินค้าอุปโภคบริโภคจำเป็น"],
  ["XLE", "Energy", "พลังงาน", "Energy", "พลังงาน"],
  ["XLF", "Financials", "การเงิน", "Financials", "การเงิน"],
  ["XLV", "Health Care", "การแพทย์", "Health care", "การแพทย์"],
  ["XLI", "Industrials", "อุตสาหกรรม", "Industrials", "อุตสาหกรรม"],
  ["XLB", "Materials", "วัสดุ", "Materials", "วัสดุ"],
  ["XLRE", "Real Estate", "อสังหาริมทรัพย์", "Real estate", "อสังหาริมทรัพย์"],
  ["XLU", "Utilities", "สาธารณูปโภค", "Utilities", "สาธารณูปโภค"],
  ["XLK", "Technology", "เทคโนโลยี", "Technology", "เทคโนโลยี"],
  ["SPY", "S&P 500", "ดัชนี S&P 500", "S&P 500 index", "ดัชนี S&P 500"],
  ["QQQ", "Nasdaq 100", "หุ้น Nasdaq 100", "Nasdaq 100", "หุ้น Nasdaq 100"],
  ["DIA", "Dow Jones 30", "ดาวโจนส์ 30", "Dow Jones 30", "ดาวโจนส์ 30"],
  ["IWM", "Russell 2000", "หุ้นขนาดเล็ก", "Russell 2000 small caps", "หุ้นขนาดเล็ก"],
  ["VT", "Total World", "หุ้นทั่วโลก", "Total world stocks", "หุ้นทั่วโลก"],
  ["TLT", "US Treasury 20Y+", "พันธบัตรรัฐบาลสหรัฐฯ 20 ปีขึ้นไป", "US Treasury bonds 20Y+", "พันธบัตรรัฐบาลสหรัฐฯ 20 ปีขึ้นไป"],
  ["GLD", "Gold", "ทองคำ", "Gold", "ทองคำ"],
  ["SMH", "Semiconductors", "เซมิคอนดักเตอร์", "Semiconductors", "เซมิคอนดักเตอร์"],
  ["DRAM", "Memory", "หน่วยความจำ", "Memory semiconductors", "เซมิคอนดักเตอร์หน่วยความจำ"],
  ["BUG", "Cybersecurity", "ความปลอดภัยไซเบอร์", "Cybersecurity", "ความปลอดภัยไซเบอร์"],
  ["IGV", "Software", "ซอฟต์แวร์", "Software", "ซอฟต์แวร์"],
  ["XBI", "Biotechnology", "เทคโนโลยีชีวภาพ", "Biotechnology", "เทคโนโลยีชีวภาพ"],
  ["TAN", "Solar", "พลังงานแสงอาทิตย์", "Solar energy", "พลังงานแสงอาทิตย์"],
  ["NLR", "Nuclear Energy", "พลังงานนิวเคลียร์", "Nuclear energy", "พลังงานนิวเคลียร์"],
  ["NASA", "Space", "อวกาศ", "Space innovators", "นวัตกรรมอวกาศ"],
  ["IBIT", "Bitcoin ETF", "กองทุน Bitcoin", "Bitcoin ETF", "กองทุน Bitcoin"],
  ["MAGS", "Magnificent Seven", "หุ้น 7 นางฟ้า", "Magnificent Seven stocks", "หุ้น 7 นางฟ้า"]
];
let marketGroupsInFlight = null;

app.get("/api/market-groups", async (req, res) => {
  const cacheKey = "market-groups:v2";
  const forceRefresh = req.query.refresh === "1";
  const saved = forceRefresh ? null : cached(cacheKey);
  if (saved) return res.json(saved);
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return res.status(503).json({ error: "ยังไม่ได้ตั้งค่า Finnhub API Key" });
  if (marketGroupsInFlight) {
    try { return res.json(await marketGroupsInFlight); }
    catch (error) { return res.status(error.status || 502).json({ error: error.message }); }
  }

  marketGroupsInFlight = (async () => {
  const quotes = new Map();
  let nextIndex = 0;
  let rateLimited = false;
  const worker = async () => {
    while (nextIndex < MARKET_GROUPS.length && !rateLimited) {
      const index = nextIndex++;
      const [symbol] = MARKET_GROUPS[index];
      const existing = forceRefresh ? null : cached(`quote:${symbol}`);
      if (existing && existing.changePercent != null && Number.isFinite(Number(existing.changePercent))) {
        quotes.set(symbol, existing);
        continue;
      }
      try {
        await new Promise(resolve => setTimeout(resolve, 200));
        const url = new URL("https://finnhub.io/api/v1/quote");
        url.searchParams.set("symbol", symbol);
        url.searchParams.set("token", key);
        const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (response.status === 429) { rateLimited = true; continue; }
        if (!response.ok) continue;
        const q = await response.json();
        if (!q || q.dp == null || q.c == null || !Number.isFinite(Number(q.dp)) || !Number.isFinite(Number(q.c))) continue;
        const result = {
          symbol, price: Number(q.c), change: Number(q.d), changePercent: Number(q.dp),
          high: Number(q.h), low: Number(q.l), open: Number(q.o), previousClose: Number(q.pc),
          timestamp: q.t ? new Date(q.t * 1000).toISOString() : null, source: "Finnhub"
        };
        setCache(`quote:${symbol}`, result);
        quotes.set(symbol, result);
      } catch (error) {
        console.warn(`Market group quote unavailable for ${symbol}:`, error.message);
      }
    }
  };
  await Promise.all(Array.from({ length: 4 }, () => worker()));

  const items = MARKET_GROUPS.flatMap(([symbol, nameEn, nameTh, descriptionEn, descriptionTh]) => {
    const quote = quotes.get(symbol);
    if (!quote) return [];
    return [{
      symbol, nameEn, nameTh, descriptionEn, descriptionTh,
      price: quote.price, change: quote.change, changePercent: quote.changePercent,
      timestamp: quote.timestamp, source: quote.source
    }];
  });
  if (!items.length) {
    const error = new Error(rateLimited ? "Finnhub rate limit เต็ม กรุณารอสักครู่แล้วลองใหม่" : "Finnhub ไม่มีข้อมูลราคาของกลุ่มตลาดในขณะนี้");
    error.status = rateLimited ? 429 : 502;
    throw error;
  }
  const result = { items, updatedAt: new Date().toISOString(), source: "Finnhub" };
  setCache(cacheKey, result, 5 * 60_000);
  return result;
  })();
  try { res.json(await marketGroupsInFlight); }
  catch (error) { res.status(error.status || 502).json({ error: error.message || "Finnhub ไม่มีข้อมูลกลุ่มตลาด" }); }
  finally { marketGroupsInFlight = null; }
});

app.get("/api/profile/:symbol", async (req, res) => {
  const symbol = String(req.params.symbol || "").trim().toUpperCase();
  if (!validSymbol(symbol)) return res.status(400).json({ error: "Ticker ไม่ถูกต้อง" });
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return res.status(503).json({ error: "ยังไม่ได้ตั้งค่า Finnhub API Key" });

  const cacheKey = `profile:${symbol}`;
  const saved = cached(cacheKey);
  if (saved) return res.json(saved);

  try {
    const url = new URL("https://finnhub.io/api/v1/stock/profile2");
    url.searchParams.set("symbol", symbol);
    url.searchParams.set("token", key);
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) return res.status(502).json({ error: "ดึงข้อมูลบริษัทไม่สำเร็จ" });
    const p = await response.json();
    if (!p || !p.name) return res.status(404).json({ error: "ไม่พบข้อมูลบริษัท", symbol });
    const result = {
      symbol,
      name: p.name,
      country: p.country,
      currency: p.currency,
      exchange: p.exchange,
      industry: p.finnhubIndustry,
      marketCapitalization: p.marketCapitalization,
      shareOutstanding: p.shareOutstanding,
      weburl: p.weburl,
      logo: p.logo,
      source: "Finnhub"
    };
    setCache(cacheKey, result);
    res.json(result);
  } catch (error) {
    console.error("Profile error:", error.message);
    res.status(502).json({ error: "เชื่อมต่อ Finnhub ไม่สำเร็จ" });
  }
});

app.get("/api/metrics/:symbol", async (req, res) => {
  const symbol = String(req.params.symbol || "").trim().toUpperCase();
  if (!validSymbol(symbol)) return res.status(400).json({ error: "Ticker ไม่ถูกต้อง" });
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return res.status(503).json({ error: "ยังไม่ได้ตั้งค่า Finnhub API Key" });

  const cacheKey = `metrics:${symbol}`;
  const saved = cached(cacheKey);
  if (saved) return res.json(saved);

  try {
    const url = new URL("https://finnhub.io/api/v1/stock/metric");
    url.searchParams.set("symbol", symbol);
    url.searchParams.set("metric", "all");
    url.searchParams.set("token", key);
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) return res.status(502).json({ error: "ดึงตัวชี้วัดไม่สำเร็จ" });
    const payload = await response.json();
    const m = payload.metric || {};
    const result = {
      symbol,
      peTTM: m.peTTM ?? null,
      pbQuarterly: m.pbQuarterly ?? null,
      roeTTM: m.roeTTM ?? null,
      roaTTM: m.roaTTM ?? null,
      netProfitMarginTTM: m.netProfitMarginTTM ?? null,
      revenueGrowthTTMYoy: m.revenueGrowthTTMYoy ?? null,
      epsTTM: m.epsTTM ?? null,
      dividendYieldIndicatedAnnual: m.dividendYieldIndicatedAnnual ?? null,
      source: "Finnhub",
      note: "ตัวชี้วัดอาจไม่มีครบทุกหุ้นและขึ้นกับแพ็กเกจ"
    };
    setCache(cacheKey, result);
    res.json(result);
  } catch (error) {
    console.error("Metrics error:", error.message);
    res.status(502).json({ error: "เชื่อมต่อ Finnhub ไม่สำเร็จ" });
  }
});

// Basic rule-based summary: transparent, not investment advice, and not an LLM.
app.get("/api/analysis/:symbol", async (req, res) => {
  const symbol = String(req.params.symbol || "").trim().toUpperCase();
  if (!validSymbol(symbol)) return res.status(400).json({ error: "Ticker ไม่ถูกต้อง" });
  if (!process.env.FINNHUB_API_KEY) return res.status(503).json({ error: "ยังไม่ได้ตั้งค่า Finnhub API Key" });

  try {
    const url = new URL("https://finnhub.io/api/v1/stock/metric");
    url.searchParams.set("symbol", symbol);
    url.searchParams.set("metric", "all");
    url.searchParams.set("token", process.env.FINNHUB_API_KEY);
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) return res.status(502).json({ error: "ไม่สามารถดึงข้อมูลเพื่อวิเคราะห์ได้" });
    const payload = await response.json();
    const m = payload.metric || {};
    const observations = [];
    const numeric = key => m[key] === null || m[key] === undefined || m[key] === "" ? null : Number.isFinite(Number(m[key])) ? Number(m[key]) : null;
    const pe = numeric("peTTM");
    const roe = numeric("roeTTM");
    const margin = numeric("netProfitMarginTTM");
    const revenueGrowth = numeric("revenueGrowthTTMYoy");
    if (pe !== null) observations.push({
      text: pe > 30
        ? "P/E สูงกว่า 30 เท่า: ควรตรวจสอบว่าการเติบโตของกำไรรองรับมูลค่าหรือไม่"
        : pe > 0 ? "P/E อยู่ที่ " + pe.toFixed(2) + " เท่า; ควรเปรียบเทียบกับคู่แข่งในอุตสาหกรรม"
        : "P/E ติดลบ จึงไม่ควรใช้ P/E แบบทั่วไปในการประเมิน",
      severity: pe > 30 || pe <= 0 ? "negative" : "neutral"
    });
    if (roe !== null) observations.push({
      text: "ROE: " + roe.toFixed(2) + "%; ตรวจสอบแนวโน้มหลายปีและระดับหนี้ประกอบ",
      severity: roe < 0 ? "negative" : roe >= 15 ? "positive" : "neutral"
    });
    if (margin !== null) observations.push({
      text: "อัตรากำไรสุทธิ: " + margin.toFixed(2) + "%",
      severity: margin < 0 ? "negative" : margin > 0 ? "positive" : "neutral"
    });
    if (revenueGrowth !== null) observations.push({
      text: "การเติบโตของรายได้ YoY: " + revenueGrowth.toFixed(2) + "%",
      severity: revenueGrowth < 0 ? "negative" : revenueGrowth > 0 ? "positive" : "neutral"
    });
    if (!observations.length) observations.push({
      text: "ข้อมูลตัวชี้วัดไม่เพียงพอสำหรับสรุป โปรดลองหุ้นอื่นหรือตรวจสอบสิทธิ์ API",
      severity: "neutral"
    });
    res.json({
      symbol,
      observations,
      type: "rule-based",
      source: "Finnhub metrics",
      disclaimer: "เป็นการสรุปจากตัวชี้วัดที่มี ไม่ใช่คำแนะนำซื้อขาย และไม่ใช่การวิเคราะห์โดย LLM"
    });
  } catch (error) {
    console.error("Analysis error:", error.message);
    res.status(502).json({ error: "เชื่อมต่อ Finnhub ไม่สำเร็จ" });
  }
});


// Stock Co-Pilot: real Gemini LLM. The key stays server-side only.
const chatWindows = new Map();
app.post("/api/copilot", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "ยังไม่ได้ตั้งค่า GEMINI_API_KEY ใน Render → Environment" });
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  const symbol = typeof req.body?.symbol === "string" ? req.body.symbol.trim().toUpperCase() : "";
  const context = typeof req.body?.context === "string" ? req.body.context.slice(0, 5000) : "";
  if (message.length < 1 || message.length > 1500) return res.status(400).json({ error: "คำถามต้องมีความยาว 1–1500 ตัวอักษร" });
  if (symbol && !validSymbol(symbol)) return res.status(400).json({ error: "Ticker ไม่ถูกต้อง" });
  const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown").split(",")[0].trim();
  const now = Date.now(); let win = chatWindows.get(ip);
  if (!win || now - win.start > 60_000) win = { start: now, count: 0 };
  win.count++; chatWindows.set(ip, win);
  if (win.count > 8) return res.status(429).json({ error: "Stock Co-Pilot ถึงขีดจำกัดชั่วคราว กรุณารอ 1 นาที" });
  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const prompt = `คุณคือ Stock Co-Pilot ผู้ช่วยวิจัยหุ้นที่ระมัดระวัง ตอบเป็นภาษาเดียวกับผู้ใช้ (ค่าเริ่มต้นภาษาไทย) อธิบายอย่างเป็นระบบ แยกข้อเท็จจริงออกจากสมมติฐาน หากไม่มีข้อมูลให้บอกตรงๆ ห้ามแต่งตัวเลขหรืออ้างว่าได้ดูราคาสดถ้าไม่มีข้อมูลในบริบท ห้ามรับประกันผลตอบแทน และย้ำความเสี่ยงเมื่อเหมาะสม ไม่ใช่คำแนะนำการลงทุนส่วนบุคคล\nTicker: ${symbol || "ไม่ได้ระบุ"}\nข้อมูลที่เว็บมีให้ (อาจว่าง/ไม่ครบ): ${context || "ไม่มีข้อมูลตลาดแนบมา"}\nคำถาม: ${message}`;
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 900 } }),
      signal: AbortSignal.timeout(25000)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("Gemini API error status:", response.status);
      return res.status(response.status === 429 ? 429 : 502).json({ error: response.status === 429 ? "โควตา Gemini เต็มชั่วคราว กรุณารอสักครู่" : "เรียก Gemini ไม่สำเร็จ ตรวจสอบ API Key, Billing และชื่อโมเดลใน Render" });
    }
    const answer = (data.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join("\n").trim();
    if (!answer) return res.status(502).json({ error: "Gemini ไม่ส่งคำตอบกลับมา ลองถามใหม่อีกครั้ง" });
    res.json({ answer, model, provider: "Google Gemini", disclaimer: "คำตอบ AI อาจผิดพลาดและไม่ใช่คำแนะนำการลงทุน" });
  } catch (error) {
    console.error("Stock Co-Pilot request failed:", error.name);
    res.status(504).json({ error: "Stock Co-Pilot ใช้เวลานานเกินไป กรุณาลองใหม่" });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`StockLens AI running at http://localhost:${PORT}`);
});
