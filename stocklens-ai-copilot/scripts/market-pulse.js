require("dotenv").config();

const { closeDatabase, ensureSchema, query } = require("../db");

const SYMBOL_RE = /^[A-Z0-9.^-]{1,20}$/;
const JOB_NAME = "market-pulse";
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

function numberOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function symbolsToUpdate() {
  const raw = process.env.MARKET_SYMBOLS || "SPY,QQQ,AAPL,MSFT,NVDA,GOOGL,AMZN,META";
  const symbols = [...new Set(raw.split(",").map(value => value.trim().toUpperCase()).filter(value => SYMBOL_RE.test(value)))];
  if (!symbols.length) throw new Error("MARKET_SYMBOLS has no valid ticker symbols");
  if (symbols.length > 20) throw new Error("MARKET_SYMBOLS supports up to 20 symbols per run");
  return symbols;
}

function marketDate(date) {
  const values = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(date).map(part => [part.type, part.value]));
  return values.year + "-" + values.month + "-" + values.day;
}

async function fetchQuote(symbol) {
  const url = new URL("https://finnhub.io/api/v1/quote");
  url.searchParams.set("symbol", symbol);
  url.searchParams.set("token", process.env.FINNHUB_API_KEY);
  const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(response.status === 429 ? "Finnhub rate limit reached" : "Finnhub returned " + response.status);
  const quote = await response.json();
  if (!Number.isFinite(Number(quote.c)) || Number(quote.c) <= 0) throw new Error("No current quote available for this ticker");
  return quote;
}

async function saveSnapshot(symbol, quote, asOfDate) {
  const sql = [
    "INSERT INTO market_snapshots",
    "(as_of_date, symbol, price, change, change_percent, day_high, day_low, day_open, previous_close, quote_time, captured_at)",
    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())",
    "ON CONFLICT (as_of_date, symbol) DO UPDATE SET",
    "price = EXCLUDED.price, change = EXCLUDED.change, change_percent = EXCLUDED.change_percent,",
    "day_high = EXCLUDED.day_high, day_low = EXCLUDED.day_low, day_open = EXCLUDED.day_open,",
    "previous_close = EXCLUDED.previous_close, quote_time = EXCLUDED.quote_time, captured_at = NOW()"
  ].join(" ");
  await query(sql, [
    asOfDate, symbol, Number(quote.c), numberOrNull(quote.d), numberOrNull(quote.dp),
    numberOrNull(quote.h), numberOrNull(quote.l), numberOrNull(quote.o), numberOrNull(quote.pc),
    Number(quote.t) > 0 ? new Date(Number(quote.t) * 1000) : null
  ]);
}

function fallbackBrief(quotes) {
  const values = quotes.map(({ symbol, quote }) => ({ symbol, percent: numberOrNull(quote.dp) }))
    .filter(item => item.percent !== null);
  const advancing = values.filter(item => item.percent > 0).length;
  const declining = values.filter(item => item.percent < 0).length;
  const average = values.length ? values.reduce((sum, item) => sum + item.percent, 0) / values.length : 0;
  const best = [...values].sort((a, b) => b.percent - a.percent)[0];
  const worst = [...values].sort((a, b) => a.percent - b.percent)[0];
  const format = item => item.symbol + " " + (item.percent > 0 ? "+" : "") + item.percent.toFixed(2) + "%";
  const lines = [
    "• มีราคา " + quotes.length + " ตัว และมีข้อมูลเปอร์เซ็นต์ " + values.length + " ตัว",
    values.length ? "• ในกลุ่มที่มีข้อมูล: บวก " + advancing + " · ลบ " + declining + " · เฉลี่ย " + (average > 0 ? "+" : "") + average.toFixed(2) + "%" : "• Finnhub ยังไม่ส่งเปอร์เซ็นต์การเปลี่ยนแปลงของหุ้นที่ติดตาม",
    best ? "• ปรับขึ้นเด่น: " + format(best) : "",
    worst ? "• ปรับลงเด่น: " + format(worst) : "",
    "• สรุปจากราคา Finnhub โดยตรง"
  ];
  return lines.filter(Boolean).join("\n");
}

async function createDailyBrief(quotes, asOfDate) {
  if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not configured");
  const data = quotes.map(({ symbol, quote }) => ({
    symbol, price: Number(quote.c), change: numberOrNull(quote.d), changePercent: numberOrNull(quote.dp),
    high: numberOrNull(quote.h), low: numberOrNull(quote.l),
    quoteTime: Number(quote.t) > 0 ? new Date(Number(quote.t) * 1000).toISOString() : null
  }));
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(MODEL) + ":generateContent",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: "สรุปเฉพาะตัวเลขที่ได้รับเป็นภาษาไทย ไม่แต่งข่าวหรือคาดการณ์ แยกภาพรวมและหุ้นที่ขึ้นลงเด่น ไม่ให้คำแนะนำซื้อขาย" }] },
        contents: [{ role: "user", parts: [{ text: "สรุปข้อมูลราคาตลาดวันที่ " + asOfDate + " ให้เข้าใจง่าย ไม่เกิน 4 bullet:\n" + JSON.stringify(data) }] }],
        generationConfig: { maxOutputTokens: 500 }
      }),
      signal: AbortSignal.timeout(10_000)
    }
  );
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = String(payload.error?.message || "").replace(/\s+/g, " ").slice(0, 180);
    throw new Error(response.status === 429 ? "Gemini rate limit reached" : "Gemini returned " + response.status + (detail ? ": " + detail : ""));
  }
  const summary = (payload.candidates?.[0]?.content?.parts || []).map(part => part.text || "").join("\n").trim();
  if (!summary) throw new Error("Gemini returned an empty market brief");
  return summary;
}

async function runMarketPulse({ trigger = "cron", close = false } = {}) {
  let runId = null;
  const asOfDate = marketDate(new Date());

  try {
    await ensureSchema();
    const runResult = await query(
      "INSERT INTO cron_runs (job_name, status, details) VALUES ($1, 'running', $2::jsonb) RETURNING id",
      [JOB_NAME, JSON.stringify({ trigger })]
    );
    runId = runResult.rows[0].id;

    if (!process.env.FINNHUB_API_KEY) throw new Error("FINNHUB_API_KEY is required");
    const symbols = symbolsToUpdate();
    const quotesBySymbol = new Array(symbols.length);
    const failures = [];
    let nextSymbol = 0;
    const workerCount = Math.min(4, symbols.length);
    await Promise.all(Array.from({ length: workerCount }, async () => {
      while (true) {
        const index = nextSymbol++;
        if (index >= symbols.length) return;
        const symbol = symbols[index];
        try {
          const quote = await fetchQuote(symbol);
          await saveSnapshot(symbol, quote, asOfDate);
          quotesBySymbol[index] = { symbol, quote };
        } catch (error) {
          failures.push({ symbol, error: error.message });
          console.warn("Skipped " + symbol + ": " + error.message);
        }
        await new Promise(resolve => setTimeout(resolve, 250));
      }
    }));
    const quotes = quotesBySymbol.filter(Boolean);
    if (!quotes.length) throw new Error("Finnhub returned no usable quotes. Check the API key, market access, and ticker list.");

    let summary;
    let summaryModel = MODEL;
    let aiError = null;
    try {
      summary = await createDailyBrief(quotes, asOfDate);
    } catch (error) {
      aiError = error.message;
      summary = fallbackBrief(quotes);
      summaryModel = "rule-based";
      console.warn("Gemini brief unavailable; saved price-based summary: " + aiError);
    }

    const briefSql = [
      "INSERT INTO market_briefs (as_of_date, summary, model, symbols_count, generated_at)",
      "VALUES ($1, $2, $3, $4, NOW())",
      "ON CONFLICT (as_of_date) DO UPDATE SET summary = EXCLUDED.summary, model = EXCLUDED.model,",
      "symbols_count = EXCLUDED.symbols_count, generated_at = NOW()"
    ].join(" ");
    await query(briefSql, [asOfDate, summary, summaryModel, quotes.length]);

    const details = { asOfDate, trigger, updated: quotes.map(item => item.symbol), failed: failures, summaryModel, aiError };
    await query(
      "UPDATE cron_runs SET status = 'succeeded', finished_at = NOW(), details = $2::jsonb WHERE id = $1",
      [runId, JSON.stringify(details)]
    );
    console.log(JSON.stringify({ job: JOB_NAME, status: "succeeded", ...details }));
    return details;
  } catch (error) {
    if (runId !== null) {
      await query(
        "UPDATE cron_runs SET status = 'failed', finished_at = NOW(), error = $2 WHERE id = $1",
        [runId, error.message]
      ).catch(updateError => console.error("Could not record failed run:", updateError.message));
    }
    throw error;
  } finally {
    if (close) await closeDatabase();
  }
}

if (require.main === module) {
  runMarketPulse({ trigger: "cron", close: true }).catch(error => {
    console.error("Market pulse job failed:", error.message);
    process.exitCode = 1;
  });
}

module.exports = { runMarketPulse };
