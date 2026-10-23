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
  const symbols = [...new Set(raw.split(",").map((value) => value.trim().toUpperCase()).filter((value) => SYMBOL_RE.test(value)))];
  if (!symbols.length) throw new Error("MARKET_SYMBOLS has no valid ticker symbols");
  if (symbols.length > 20) throw new Error("MARKET_SYMBOLS supports up to 20 symbols per run");
  return symbols;
}

async function fetchQuote(symbol) {
  const url = new URL("https://finnhub.io/api/v1/quote");
  url.searchParams.set("symbol", symbol);
  url.searchParams.set("token", process.env.FINNHUB_API_KEY);
  const response = await fetch(url, { signal: AbortSignal.timeout(12_000) });
  if (!response.ok) {
    const reason = response.status === 429 ? "Finnhub rate limit reached" : `Finnhub returned ${response.status}`;
    throw new Error(reason);
  }
  const quote = await response.json();
  if (!Number.isFinite(Number(quote.c)) || Number(quote.c) <= 0) {
    throw new Error("No current quote available for this ticker");
  }
  return quote;
}

async function saveSnapshot(symbol, quote, asOfDate) {
  await query(
    `INSERT INTO market_snapshots
       (as_of_date, symbol, price, change, change_percent, day_high, day_low,
        day_open, previous_close, quote_time, captured_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
     ON CONFLICT (as_of_date, symbol) DO UPDATE SET
       price = EXCLUDED.price,
       change = EXCLUDED.change,
       change_percent = EXCLUDED.change_percent,
       day_high = EXCLUDED.day_high,
       day_low = EXCLUDED.day_low,
       day_open = EXCLUDED.day_open,
       previous_close = EXCLUDED.previous_close,
       quote_time = EXCLUDED.quote_time,
       captured_at = NOW()`,
    [
      asOfDate,
      symbol,
      Number(quote.c),
      numberOrNull(quote.d),
      numberOrNull(quote.dp),
      numberOrNull(quote.h),
      numberOrNull(quote.l),
      numberOrNull(quote.o),
      numberOrNull(quote.pc),
      Number(quote.t) > 0 ? new Date(Number(quote.t) * 1000) : null
    ]
  );
}

async function createDailyBrief(quotes, asOfDate) {
  const data = quotes.map(({ symbol, quote }) => ({
    symbol,
    price: Number(quote.c),
    change: numberOrNull(quote.d),
    changePercent: numberOrNull(quote.dp),
    high: numberOrNull(quote.h),
    low: numberOrNull(quote.l),
    quoteTime: Number(quote.t) > 0 ? new Date(Number(quote.t) * 1000).toISOString() : null
  }));
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: "คุณเป็นผู้ช่วยสรุปข้อมูลตลาดหุ้นภาษาไทย สรุปเฉพาะข้อมูลที่ได้รับ ไม่แต่งตัวเลขหรือข่าว บอกว่าข้อมูลราคาเป็น snapshot จาก Finnhub ณ เวลาที่ระบุ แบ่งเป็นภาพรวมสั้น ๆ จุดที่เปลี่ยนแปลงเด่น และสิ่งที่ควรตรวจสอบต่อ ห้ามให้คำแนะนำซื้อขายหรือคาดการณ์ผลตอบแทน" }]
        },
        contents: [{ role: "user", parts: [{ text: `สรุปข้อมูล snapshot วันที่ ${asOfDate} ต่อไปนี้ให้เข้าใจง่าย ความยาวไม่เกิน 5 bullet:\n${JSON.stringify(data)}` }] }],
        // Gemini 3.5 Flash-Lite no longer accepts legacy sampling parameters
        // such as temperature. Keep only the output limit for model compatibility.
        generationConfig: { maxOutputTokens: 700 }
      }),
      signal: AbortSignal.timeout(25_000)
    }
  );
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = String(payload.error?.message || "").replace(/\s+/g, " ").slice(0, 240);
    throw new Error(response.status === 429
      ? `Gemini rate limit reached${detail ? `: ${detail}` : ""}`
      : `Gemini returned ${response.status}${detail ? `: ${detail}` : ""}`);
  }
  const summary = (payload.candidates?.[0]?.content?.parts || []).map((part) => part.text || "").join("\n").trim();
  if (!summary) throw new Error("Gemini returned an empty market brief");
  return summary;
}

async function main() {
  let runId = null;
  const started = new Date();
  const asOfDate = started.toISOString().slice(0, 10);

  try {
    await ensureSchema();
    const runResult = await query(
      "INSERT INTO cron_runs (job_name, status) VALUES ($1, 'running') RETURNING id",
      [JOB_NAME]
    );
    runId = runResult.rows[0].id;

    const symbols = symbolsToUpdate();
    if (!process.env.FINNHUB_API_KEY) throw new Error("FINNHUB_API_KEY is required on the Cron service");
    if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is required on the Cron service");

    const quotes = [];
    const failures = [];
    for (const symbol of symbols) {
      try {
        const quote = await fetchQuote(symbol);
        await saveSnapshot(symbol, quote, asOfDate);
        quotes.push({ symbol, quote });
      } catch (error) {
        failures.push({ symbol, error: error.message });
        console.warn(`Skipped ${symbol}: ${error.message}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 1_000));
    }
    if (!quotes.length) throw new Error("Finnhub did not return a usable quote for any configured symbol");

    const summary = await createDailyBrief(quotes, asOfDate);
    await query(
      `INSERT INTO market_briefs (as_of_date, summary, model, symbols_count, generated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (as_of_date) DO UPDATE SET
         summary = EXCLUDED.summary,
         model = EXCLUDED.model,
         symbols_count = EXCLUDED.symbols_count,
         generated_at = NOW()`,
      [asOfDate, summary, MODEL, quotes.length]
    );

    const details = { asOfDate, updated: quotes.map((item) => item.symbol), failed: failures };
    await query(
      "UPDATE cron_runs SET status = 'succeeded', finished_at = NOW(), details = $2::jsonb WHERE id = $1",
      [runId, JSON.stringify(details)]
    );
    console.log(JSON.stringify({ job: JOB_NAME, status: "succeeded", ...details }));
  } catch (error) {
    if (runId !== null) {
      await query(
        "UPDATE cron_runs SET status = 'failed', finished_at = NOW(), error = $2 WHERE id = $1",
        [runId, error.message]
      ).catch((updateError) => console.error("Could not record failed run:", updateError.message));
    }
    throw error;
  } finally {
    await closeDatabase();
  }
}

main().catch((error) => {
  console.error("Market pulse job failed:", error.message);
  process.exitCode = 1;
});
