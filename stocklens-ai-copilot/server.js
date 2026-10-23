require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const path = require("path");
const { databaseConfigured, ensureSchema, query } = require("./db");

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
  if (!item || Date.now() - item.savedAt > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return item.value;
}

function setCache(key, value) {
  cache.set(key, { value, savedAt: Date.now() });
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

app.get("/api/market-pulse", async (_req, res) => {
  if (!databaseConfigured()) {
    return res.status(503).json({ error: "กรุณาตั้ง DATABASE_URL เพื่อเชื่อมต่อ Neon" });
  }
  try {
    await ensureSchema();
    const briefResult = await query(
      `SELECT as_of_date, summary, model, symbols_count, generated_at
       FROM market_briefs ORDER BY as_of_date DESC LIMIT 1`
    );
    const brief = briefResult.rows[0] || null;
    const snapshotsResult = brief
      ? await query(
          `SELECT symbol, price, change, change_percent, day_high, day_low,
                  day_open, previous_close, quote_time, captured_at
           FROM market_snapshots WHERE as_of_date = $1 ORDER BY symbol`,
          [brief.as_of_date]
        )
      : { rows: [] };
    const runResult = await query(
      `SELECT status, started_at, finished_at, error
       FROM cron_runs WHERE job_name = 'market-pulse'
       ORDER BY started_at DESC LIMIT 1`
    );
    res.json({ available: Boolean(brief), brief, snapshots: snapshotsResult.rows, lastRun: runResult.rows[0] || null });
  } catch (error) {
    console.error("Market pulse error:", error.message);
    res.status(503).json({ error: "อ่านสรุปตลาดจาก Neon ไม่สำเร็จ กรุณาตรวจการตั้งค่า DATABASE_URL" });
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
  if (!key) return res.status(503).json({ error: "ยังไม่ได้ตั้งค่า Finnhub API Key" });
  const days = Math.max(7, Math.min(365, Number.parseInt(req.query.days || "90", 10) || 90));
  const cacheKey = `candles:${symbol}:${days}`;
  const saved = cached(cacheKey);
  if (saved) return res.json(saved);
  try {
    const to = Math.floor(Date.now() / 1000);
    const from = to - days * 86400;
    const url = new URL("https://finnhub.io/api/v1/stock/candle");
    url.searchParams.set("symbol", symbol);
    url.searchParams.set("resolution", "D");
    url.searchParams.set("from", String(from));
    url.searchParams.set("to", String(to));
    url.searchParams.set("token", key);
    const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 429) return res.status(429).json({ error: "Finnhub จำกัดจำนวนคำขอกราฟ ลองใหม่อีกสักครู่" });
      if (response.status === 401 || response.status === 403) return res.status(502).json({ error: "Finnhub ไม่อนุญาตข้อมูลย้อนหลัง ตรวจ API Key และสิทธิ์แพ็กเกจ" });
      return res.status(502).json({ error: "Finnhub ตอบกลับข้อมูลกราฟไม่สำเร็จ" });
    }
    if (payload.s !== "ok" || !Array.isArray(payload.t) || !Array.isArray(payload.c)) {
      return res.status(404).json({ error: payload.s === "no_data" ? "ไม่มีข้อมูลย้อนหลังสำหรับหุ้นนี้ในช่วงที่เลือก" : "Finnhub ยังไม่มีข้อมูลกราฟสำหรับหุ้นนี้" });
    }
    const candles = payload.t.map((time, index) => ({
      time: Number(time) * 1000,
      close: Number(payload.c[index]),
      high: Number(payload.h?.[index]),
      low: Number(payload.l?.[index]),
      open: Number(payload.o?.[index]),
      volume: Number(payload.v?.[index])
    })).filter(item => Number.isFinite(item.time) && Number.isFinite(item.close));
    if (!candles.length) return res.status(404).json({ error: "ข้อมูลย้อนหลังที่ได้รับไม่สมบูรณ์" });
    const result = { symbol, candles, source: "Finnhub", days };
    setCache(cacheKey, result);
    res.json(result);
  } catch (error) {
    console.error("Candles error:", error.message);
    res.status(502).json({ error: "เชื่อมต่อข้อมูลกราฟไม่สำเร็จ" });
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
    if (Number.isFinite(m.peTTM)) observations.push(m.peTTM > 30
      ? "P/E สูงกว่า 30 เท่า: ควรตรวจสอบว่าการเติบโตของกำไรรองรับมูลค่าหรือไม่"
      : m.peTTM > 0 ? "P/E อยู่ที่ " + m.peTTM.toFixed(2) + " เท่า; ควรเปรียบเทียบกับคู่แข่งในอุตสาหกรรม"
      : "P/E ติดลบหรือไม่พร้อมใช้งาน จึงไม่ควรใช้ P/E แบบทั่วไปในการประเมิน");
    if (Number.isFinite(m.roeTTM)) observations.push("ROE: " + m.roeTTM.toFixed(2) + "%; ตรวจสอบแนวโน้มหลายปีและระดับหนี้ประกอบ");
    if (Number.isFinite(m.netProfitMarginTTM)) observations.push("อัตรากำไรสุทธิ: " + m.netProfitMarginTTM.toFixed(2) + "%");
    if (Number.isFinite(m.revenueGrowthTTMYoy)) observations.push("การเติบโตของรายได้ YoY: " + m.revenueGrowthTTMYoy.toFixed(2) + "%");
    if (!observations.length) observations.push("ข้อมูลตัวชี้วัดไม่เพียงพอสำหรับสรุป โปรดลองหุ้นอื่นหรือตรวจสอบสิทธิ์ API");
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
