require("dotenv").config();

const { closeDatabase, ensureSchema, query } = require("../db");

const SYMBOL_RE = /^[A-Z0-9.^-]{1,20}$/;
const JOB_NAME = "market-pulse";
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
const FALLBACK_MODEL = process.env.GEMINI_FALLBACK_MODEL || "gemini-3.8-flash";

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
  return {
    headline: "สรุปจากราคาตลาด",
    summary: "มีข้อมูลราคา " + quotes.length + " ตัว โดยมีข้อมูลการเปลี่ยนแปลง " + values.length + " ตัว",
    tone: values.length ? advancing > declining ? "positive" : declining > advancing ? "negative" : "mixed" : "mixed",
    insights: values.length ? ["บวก " + advancing + " · ลบ " + declining + " · เฉลี่ย " + (average > 0 ? "+" : "") + average.toFixed(2) + "%", best ? "ขึ้นเด่น: " + format(best) : "", worst ? "ลงเด่น: " + format(worst) : ""].filter(Boolean) : ["Finnhub ยังไม่ส่งเปอร์เซ็นต์การเปลี่ยนแปลงของหุ้นที่ติดตาม"],
    watchouts: ["สรุปจากราคา Finnhub โดยตรง ไม่มีการคาดการณ์หรือสัญญาณซื้อขาย"]
  };
}

function normalizeBrief(value) {
  if (!value || typeof value !== "object") return null;
  const clean = (item, max = 220) => typeof item === "string" ? item.replace(/\s+/g, " ").trim().slice(0, max) : "";
  const headline = clean(value.headline, 100);
  const summary = clean(value.summary, 420);
  const tone = ["positive", "mixed", "negative"].includes(value.tone) ? value.tone : "mixed";
  const insights = Array.isArray(value.insights) ? value.insights.map(item => clean(item)).filter(Boolean).slice(0, 3) : [];
  const watchouts = Array.isArray(value.watchouts) ? value.watchouts.map(item => clean(item)).filter(Boolean).slice(0, 2) : [];
  return headline && summary ? { headline, summary, tone, insights, watchouts } : null;
}

async function createDailyBrief(quotes, asOfDate) {
  if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not configured");
  const data = quotes.map(({ symbol, quote }) => ({
    symbol, price: Number(quote.c), change: numberOrNull(quote.d), changePercent: numberOrNull(quote.dp),
    high: numberOrNull(quote.h), low: numberOrNull(quote.l),
    quoteTime: Number(quote.t) > 0 ? new Date(Number(quote.t) * 1000).toISOString() : null
  }));
  const schema = {
    type: "object",
    properties: {
      headline: { type: "string" },
      summary: { type: "string" },
      tone: { type: "string", enum: ["positive", "mixed", "negative"] },
      insights: { type: "array", items: { type: "string" }, maxItems: 3 },
      watchouts: { type: "array", items: { type: "string" }, maxItems: 2 }
    },
    required: ["headline", "summary", "tone", "insights", "watchouts"]
  };
  const models = [...new Set([MODEL, FALLBACK_MODEL])];
  let lastError = null;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const model = models[Math.min(attempt < 2 ? 0 : 1, models.length - 1)];
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model) + ":generateContent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: "You are a concise market-brief analyst. Use only supplied quote data. Do not invent news, causes, projections, or trading advice. Return a small JSON object with a Thai headline, one short Thai summary, tone based only on the count and average of supplied daily percentage changes, up to 3 short insights, and up to 2 caveats. Keep every text field under 180 characters." }] },
            contents: [{ role: "user", parts: [{ text: "Create a compact market interface brief for " + asOfDate + ". Quote data:\n" + JSON.stringify(data) }] }],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: attempt < 2 ? 420 : 320,
              responseMimeType: "application/json",
              responseSchema: schema
            }
          }),
          signal: AbortSignal.timeout(15_000)
        }
      );
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const detail = String(payload.error?.message || "").replace(/\s+/g, " ").slice(0, 140);
        lastError = new Error("Gemini returned " + response.status + (detail ? ": " + detail : ""));
        if (![408, 429, 500, 502, 503, 504].includes(response.status) && response.status !== 404) break;
      } else {
        const candidate = payload.candidates?.[0];
        const output = (candidate?.content?.parts || []).filter(part => !part.thought).map(part => part.text || "").join("\n").trim();
        try {
          const brief = normalizeBrief(JSON.parse(output));
          if (brief && candidate?.finishReason !== "MAX_TOKENS") return { brief, model };
          lastError = new Error(candidate?.finishReason === "MAX_TOKENS" ? "Gemini response exceeded the compact brief limit" : "Gemini returned an incomplete brief");
        } catch {
          lastError = new Error("Gemini returned an invalid compact brief");
        }
      }
    } catch (error) {
      lastError = error;
    }
    if (attempt < 3) {
      const delay = Math.min(500 * (2 ** attempt) + Math.floor(Math.random() * 300), 3000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw lastError || new Error("Gemini market brief unavailable");
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
      const generated = await createDailyBrief(quotes, asOfDate);
      summary = JSON.stringify(generated.brief);
      summaryModel = generated.model;
    } catch (error) {
      aiError = error.message;
      summary = JSON.stringify(fallbackBrief(quotes));
      summaryModel = "rule-based";
      console.warn("Gemini brief unavailable; saved compact price-based summary: " + String(aiError).slice(0, 160));
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
    console.log(JSON.stringify({
      job: JOB_NAME, status: "succeeded", asOfDate, trigger,
      updatedCount: quotes.length, failedCount: failures.length,
      updated: quotes.map(item => item.symbol), summaryModel,
      aiFallback: Boolean(aiError)
    }));
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
