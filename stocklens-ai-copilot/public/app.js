const $ = (id) => document.getElementById(id);
const form = $("search-form");
const input = $("symbol-input");
const resultsBox = $("search-results");
const stockSection = $("stock-section");
let toastTimer;

function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3500);
}
function fmt(value, suffix = "", digits = 2) {
  if (value === null || value === undefined || value === "" || !Number.isFinite(Number(value))) return "ไม่มีข้อมูล";
  return Number(value).toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: 0 }) + suffix;
}
function money(value, currency = "USD") {
  if (value === null || value === undefined || !Number.isFinite(Number(value)) || Number(value) === 0) return "ไม่มีข้อมูล";
  try { return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(value); }
  catch { return fmt(value); }
}
async function api(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}
function showResults(items) {
  resultsBox.innerHTML = "";
  if (!items.length) {
    resultsBox.innerHTML = '<div class="result-item">ไม่พบผลลัพธ์ ลองค้นหาด้วย Ticker โดยตรง</div>';
  } else {
    for (const item of items) {
      const button = document.createElement("button");
      button.className = "result-item";
      const left = document.createElement("span");
      const strong = document.createElement("strong");
      strong.textContent = item.symbol || "";
      const small = document.createElement("small");
      small.textContent = item.description || "";
      left.append(strong, document.createElement("br"), small);
      const right = document.createElement("small");
      right.textContent = item.type || "Equity";
      button.append(left, right);
      button.addEventListener("click", () => loadStock(item.symbol));
      resultsBox.append(button);
    }
  }
  resultsBox.classList.remove("hidden");
}
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const q = input.value.trim();
  if (!q) return toast("กรุณาพิมพ์ชื่อหุ้นหรือ Ticker");
  resultsBox.classList.remove("hidden");
  resultsBox.textContent = "กำลังค้นหา...";
  try {
    const data = await api(`/api/search?q=${encodeURIComponent(q)}`);
    // If the exact ticker is not in search results, still try it directly.
    const items = data.results || [];
    if (!items.some(x => x.symbol.toUpperCase() === q.toUpperCase())) {
      items.unshift({ symbol: q.toUpperCase(), description: "ลองเปิด Ticker นี้โดยตรง", type: "Symbol" });
    }
    showResults(items);
  } catch (error) {
    showResults([{ symbol: q.toUpperCase(), description: "ลองเปิด Ticker โดยตรง", type: "Symbol" }]);
    toast(error.message);
  }
});
document.querySelectorAll("[data-symbol]").forEach(button => {
  button.addEventListener("click", () => loadStock(button.dataset.symbol));
});

async function loadStock(rawSymbol) {
  const symbol = String(rawSymbol || "").trim().toUpperCase();
  if (!symbol) return;
  input.value = symbol;
  stockSection.classList.remove("hidden");
  resultsBox.classList.add("hidden");
  $("stock-symbol").textContent = symbol;
  $("company-name").textContent = "กำลังโหลดข้อมูล...";
  $("company-meta").textContent = "กำลังเชื่อมต่อ Finnhub";
  $("analysis").innerHTML = '<p class="muted">กำลังวิเคราะห์ตัวชี้วัด...</p>';
  stockSection.scrollIntoView({ behavior: "smooth", block: "start" });

  const [quoteR, profileR, metricsR, analysisR] = await Promise.allSettled([
    api(`/api/quote/${encodeURIComponent(symbol)}`),
    api(`/api/profile/${encodeURIComponent(symbol)}`),
    api(`/api/metrics/${encodeURIComponent(symbol)}`),
    api(`/api/analysis/${encodeURIComponent(symbol)}`)
  ]);
  const quote = quoteR.status === "fulfilled" ? quoteR.value : null;
  const profile = profileR.status === "fulfilled" ? profileR.value : null;
  const metrics = metricsR.status === "fulfilled" ? metricsR.value : null;
  const analysis = analysisR.status === "fulfilled" ? analysisR.value : null;

  $("company-name").textContent = profile?.name || symbol;
  $("company-meta").textContent = [profile?.exchange, profile?.industry, profile?.country].filter(Boolean).join(" · ") || "ข้อมูลบริษัทไม่มีในแผน API หรือไม่รองรับ Ticker นี้";
  $("price").textContent = quote ? money(quote.price, profile?.currency || "USD") : "ไม่มีข้อมูล";
  const change = quote?.changePercent;
  $("price-change").textContent = quote ? `${fmt(quote.change)} (${fmt(change, "%")}) · Finnhub` : (quoteR.reason?.message || "ไม่สามารถดึงราคาได้");
  $("price-change").style.color = Number(change) >= 0 ? "var(--green)" : "var(--red)";
  $("market-cap").textContent = profile?.marketCapitalization ? fmt(profile.marketCapitalization) : "ไม่มีข้อมูล";
  $("pe").textContent = fmt(metrics?.peTTM, "x");
  $("roe").textContent = fmt(metrics?.roeTTM, "%");
  $("roa").textContent = fmt(metrics?.roaTTM, "%");
  $("margin").textContent = fmt(metrics?.netProfitMarginTTM, "%");
  $("growth").textContent = fmt(metrics?.revenueGrowthTTMYoy, "%");
  $("eps").textContent = fmt(metrics?.epsTTM);
  $("dividend").textContent = fmt(metrics?.dividendYieldIndicatedAnnual, "%");

  const analysisBox = $("analysis");
  analysisBox.innerHTML = "";
  if (analysis?.observations?.length) {
    analysis.observations.forEach(text => {
      const p = document.createElement("p");
      p.className = "observation";
      p.textContent = text;
      analysisBox.append(p);
    });
  } else {
    const p = document.createElement("p");
    p.textContent = analysisR.status === "rejected" ? analysisR.reason.message : "ยังไม่มีข้อมูลเพียงพอสำหรับสรุป";
    analysisBox.append(p);
  }
  $("data-note").querySelector("span").textContent =
    `แหล่งข้อมูล: Finnhub · เวลาดึงข้อมูล ${new Date().toLocaleString()} · ราคาและตัวชี้วัดอาจล่าช้า/ไม่ครบตามแผน API`;
  if (!quote && !profile && !metrics) toast("โหลดข้อมูลไม่สำเร็จ: ตรวจ API Key, สิทธิ์แผน และ Ticker");
}
if (window.lucide) window.lucide.createIcons();

// Extra workspace tools: watchlist, comparisons, local price alerts, return calculator,
// historical chart + CSV export, and a persisted light/dark preference.
let activeSymbol = "";
let latestCandles = [];
const readStore = (key, fallback = []) => {
  try { const value = JSON.parse(localStorage.getItem(key) || "null"); return Array.isArray(fallback) ? (Array.isArray(value) ? value : fallback) : (value ?? fallback); }
  catch { return fallback; }
};
const writeStore = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { toast("อุปกรณ์ไม่อนุญาตให้บันทึกข้อมูลในเบราว์เซอร์"); } };
const safeSymbol = (value) => String(value || "").trim().toUpperCase().replace(/\s+/g, "");

function renderWatchlist() {
  const host = $("watchlist"); const items = readStore("stocklens-watchlist"); host.replaceChildren();
  if (!items.length) { host.innerHTML = '<p class="empty-state">ยังไม่มีหุ้นที่ติดตาม</p>'; return; }
  items.forEach(symbol => {
    const row = document.createElement("div"); row.className = "watch-row";
    const open = document.createElement("button"); open.className = "watch-open"; open.textContent = symbol; open.addEventListener("click", () => loadStock(symbol));
    const remove = document.createElement("button"); remove.className = "remove-button"; remove.textContent = "ลบ"; remove.setAttribute("aria-label", `ลบ ${symbol} จากรายการติดตาม`); remove.addEventListener("click", () => { writeStore("stocklens-watchlist", items.filter(x => x !== symbol)); renderWatchlist(); });
    row.append(open, remove); host.append(row);
  });
}
$("watch-add")?.addEventListener("click", () => {
  const symbol = safeSymbol($("watch-input").value);
  if (!/^[A-Z0-9.^-]{1,20}$/.test(symbol)) return toast("กรุณากรอก Ticker ให้ถูกต้อง");
  const items = readStore("stocklens-watchlist");
  if (items.includes(symbol)) return toast("หุ้นนี้อยู่ในรายการติดตามแล้ว");
  if (items.length >= 12) return toast("ติดตามได้สูงสุด 12 หุ้น");
  writeStore("stocklens-watchlist", [...items, symbol]); $("watch-input").value = ""; renderWatchlist(); toast(`เพิ่ม ${symbol} แล้ว`);
});

function renderCompare() {
  const host = $("compare-list"); const items = readStore("stocklens-compare"); host.replaceChildren();
  if (!items.length) { host.innerHTML = '<p class="empty-state">เพิ่มหุ้นได้สูงสุด 3 ตัว</p>'; return; }
  const table = document.createElement("div"); table.className = "compare-table";
  const header = document.createElement("div"); header.className = "compare-row compare-head"; header.innerHTML = '<span>Ticker</span><span>ราคา</span><span>P/E</span><span></span>'; table.append(header);
  items.forEach(symbol => {
    const row = document.createElement("div"); row.className = "compare-row";
    const name = document.createElement("button"); name.className = "watch-open"; name.textContent = symbol; name.addEventListener("click", () => loadStock(symbol));
    const price = document.createElement("span"); price.textContent = "…";
    const pe = document.createElement("span"); pe.textContent = "…";
    const remove = document.createElement("button"); remove.className = "remove-button"; remove.textContent = "×"; remove.setAttribute("aria-label", `ลบ ${symbol} จากเปรียบเทียบ`); remove.addEventListener("click", () => { writeStore("stocklens-compare", items.filter(x => x !== symbol)); renderCompare(); });
    row.append(name, price, pe, remove); table.append(row);
    Promise.allSettled([api(`/api/quote/${encodeURIComponent(symbol)}`), api(`/api/metrics/${encodeURIComponent(symbol)}`)]).then(([q,m]) => {
      price.textContent = q.status === "fulfilled" ? fmt(q.value.price, "", 2) : "N/A";
      pe.textContent = m.status === "fulfilled" ? fmt(m.value?.metrics?.peTTM ?? m.value?.peTTM, "x") : "N/A";
    });
  });
  host.append(table);
}
$("compare-add")?.addEventListener("click", () => {
  const symbol = safeSymbol($("compare-input").value);
  if (!/^[A-Z0-9.^-]{1,20}$/.test(symbol)) return toast("กรุณากรอก Ticker ให้ถูกต้อง");
  const items = readStore("stocklens-compare");
  if (items.includes(symbol)) return toast("มีหุ้นนี้ในการเปรียบเทียบแล้ว");
  if (items.length >= 3) return toast("เปรียบเทียบได้สูงสุด 3 หุ้น");
  writeStore("stocklens-compare", [...items, symbol]); $("compare-input").value = ""; renderCompare();
});

function renderAlerts() {
  const host = $("alerts-list"); const items = readStore("stocklens-alerts"); host.replaceChildren();
  if (!items.length) { host.innerHTML = '<p class="empty-state">ยังไม่มีการแจ้งเตือน</p>'; return; }
  items.forEach((item, index) => {
    const row = document.createElement("div"); row.className = "alert-row";
    const text = document.createElement("span"); text.textContent = `${item.symbol} ${item.direction === "above" ? "≥" : "≤"} ${item.target} ${item.triggered ? "· ถึงเป้าหมายแล้ว" : "· รอตรวจสอบ"}`;
    const remove = document.createElement("button"); remove.className = "remove-button"; remove.textContent = "ลบ"; remove.addEventListener("click", () => { const updated = readStore("stocklens-alerts"); updated.splice(index, 1); writeStore("stocklens-alerts", updated); renderAlerts(); });
    row.append(text, remove); host.append(row);
  });
}
$("alert-add")?.addEventListener("click", () => {
  const symbol = safeSymbol($("alert-symbol").value); const target = Number($("alert-price").value); const direction = $("alert-direction").value;
  if (!/^[A-Z0-9.^-]{1,20}$/.test(symbol) || !Number.isFinite(target) || target <= 0) return toast("กรอก Ticker และราคาเป้าหมายให้ถูกต้อง");
  const items = readStore("stocklens-alerts");
  if (items.length >= 10) return toast("ตั้งแจ้งเตือนได้สูงสุด 10 รายการ");
  items.push({ symbol, target, direction, triggered: false }); writeStore("stocklens-alerts", items); renderAlerts(); toast("บันทึกแจ้งเตือนแล้ว");
});
async function checkPriceAlerts() {
  const items = readStore("stocklens-alerts"); let changed = false;
  for (const item of items) {
    if (item.triggered) continue;
    try {
      const q = await api(`/api/quote/${encodeURIComponent(item.symbol)}`);
      const hit = item.direction === "above" ? Number(q.price) >= item.target : Number(q.price) <= item.target;
      if (hit) { item.triggered = true; changed = true; toast(`แจ้งเตือน ${item.symbol}: ราคาถึง ${fmt(q.price)} แล้ว`); }
    } catch { /* API may be unavailable or rate-limited; retry on next page visit. */ }
  }
  if (changed) { writeStore("stocklens-alerts", items); renderAlerts(); }
}

function calculateReturn() {
  const investment = Number($("calc-investment").value); const entry = Number($("calc-entry").value); const target = Number($("calc-target").value);
  const profitEl = $("calc-profit"); const returnEl = $("calc-return");
  if (![investment, entry, target].every(Number.isFinite) || investment < 0 || entry <= 0 || target < 0) { profitEl.textContent = "ตรวจสอบข้อมูล"; returnEl.textContent = "กรอกตัวเลขที่ถูกต้อง"; return; }
  const profit = investment / entry * (target - entry); const pct = (target / entry - 1) * 100;
  profitEl.textContent = `${profit >= 0 ? "+" : "−"}${Math.abs(profit).toLocaleString("en-US", {maximumFractionDigits:2, minimumFractionDigits:2})}`;
  profitEl.classList.toggle("negative", profit < 0); returnEl.textContent = `ผลตอบแทน ${pct >= 0 ? "+" : ""}${pct.toFixed(2)}% · ยังไม่หักค่าธรรมเนียม/ภาษี`;
}
["calc-investment", "calc-entry", "calc-target"].forEach(id => $(id)?.addEventListener("input", calculateReturn));

function renderChart(candles) {
  const host = $("price-chart"); host.replaceChildren(); latestCandles = candles;
  if (!candles.length) { host.innerHTML = '<div class="chart-placeholder">ไม่มีข้อมูลกราฟในช่วงเวลานี้</div>'; $("export-csv").disabled = true; return; }
  const width = 900, height = 260, pad = { top: 18, right: 16, bottom: 28, left: 54 };
  const values = candles.map(c => Number(c.close)).filter(Number.isFinite); const min = Math.min(...values), max = Math.max(...values); const range = max - min || Math.max(1, Math.abs(max) * .02);
  const x = i => pad.left + i * (width - pad.left - pad.right) / Math.max(1, candles.length - 1);
  const y = v => pad.top + (max - v) * (height - pad.top - pad.bottom) / range;
  const ns = "http://www.w3.org/2000/svg"; const svg = document.createElementNS(ns, "svg"); svg.setAttribute("viewBox", `0 0 ${width} ${height}`); svg.setAttribute("role", "img"); svg.setAttribute("aria-label", `กราฟราคาปิด ${activeSymbol}`);
  for (let i=0;i<4;i++) { const yy=pad.top+i*(height-pad.top-pad.bottom)/3; const line=document.createElementNS(ns,"line"); line.setAttribute("x1",pad.left);line.setAttribute("x2",width-pad.right);line.setAttribute("y1",yy);line.setAttribute("y2",yy);line.setAttribute("class","chart-gridline");svg.append(line); const label=document.createElementNS(ns,"text");label.setAttribute("x",pad.left-8);label.setAttribute("y",yy+4);label.setAttribute("text-anchor","end");label.setAttribute("class","chart-label");label.textContent=fmt(max-i*range/3,"",2);svg.append(label); }
  const path=document.createElementNS(ns,"path"); path.setAttribute("d",values.map((v,i)=>`${i?"L":"M"}${x(i)},${y(v)}`).join(" "));path.setAttribute("class","chart-line");svg.append(path);
  const area=document.createElementNS(ns,"path"); area.setAttribute("d",`${path.getAttribute("d")} L${x(values.length-1)},${height-pad.bottom} L${x(0)},${height-pad.bottom} Z`);area.setAttribute("class","chart-area");svg.insertBefore(area,path);
  const start=document.createElementNS(ns,"text");start.setAttribute("x",pad.left);start.setAttribute("y",height-6);start.setAttribute("class","chart-label");start.textContent=new Date(candles[0].time).toLocaleDateString();svg.append(start);
  const end=document.createElementNS(ns,"text");end.setAttribute("x",width-pad.right);end.setAttribute("y",height-6);end.setAttribute("text-anchor","end");end.setAttribute("class","chart-label");end.textContent=new Date(candles[candles.length-1].time).toLocaleDateString();svg.append(end);
  host.append(svg);
  const stats=document.createElement("div");stats.className="chart-stats";const first=values[0],last=values[values.length-1],change=(last/first-1)*100;
  stats.textContent=`${activeSymbol} · ${candles.length} วันซื้อขาย · ล่าสุด ${fmt(last)} · เปลี่ยนแปลงในช่วง ${change>=0?"+":""}${change.toFixed(2)}%`;host.append(stats);$("export-csv").disabled=false;
}
async function loadChart() {
  if (!activeSymbol) return toast("ค้นหาหุ้นก่อน แล้วจึงโหลดกราฟ");
  const host = $("price-chart"); host.innerHTML='<div class="chart-placeholder">กำลังโหลดข้อมูลกราฟ…</div>'; $("export-csv").disabled=true;
  try { const data=await api(`/api/candles/${encodeURIComponent(activeSymbol)}?days=${encodeURIComponent($("chart-range").value)}`);renderChart(data.candles||[]); }
  catch(error) { host.innerHTML=''; const message=document.createElement("div");message.className="chart-placeholder";message.textContent=error.message||"โหลดกราฟไม่สำเร็จ";host.append(message); }
}
$("chart-load")?.addEventListener("click", loadChart);
$("chart-range")?.addEventListener("change", loadChart);
$("export-csv")?.addEventListener("click", () => {
  if (!latestCandles.length) return;
  const rows=[["date","open","high","low","close","volume"],...latestCandles.map(c=>[new Date(c.time).toISOString().slice(0,10),c.open,c.high,c.low,c.close,c.volume])];
  const csv="\uFEFF"+rows.map(row=>row.map(value=>`"${String(value ?? "").replace(/"/g,'""')}"`).join(",")).join("\r\n");
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"}));const a=document.createElement("a");a.href=url;a.download=`${activeSymbol}-history.csv`;document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);toast("ส่งออก CSV แล้ว");
});

$("theme-toggle")?.addEventListener("click", () => {
  const light=document.documentElement.classList.toggle("light-theme");
  try { localStorage.setItem("stocklens-theme",light?"light":"dark"); } catch {}
});
try { if (localStorage.getItem("stocklens-theme")==="light") document.documentElement.classList.add("light-theme"); } catch {}

function formatPulseDate(value) {
  if (!value) return "ยังไม่มีข้อมูลตามรอบเวลา";
  const dateText = String(value).slice(0, 10);
  const date = new Date(dateText + "T12:00:00Z");
  return Number.isNaN(date.getTime()) ? dateText : date.toLocaleDateString("th-TH", { dateStyle: "long", timeZone: "Asia/Bangkok" });
}

async function loadMarketPulse() {
  const refresh = $("pulse-refresh");
  const summary = $("pulse-summary");
  const snapshots = $("pulse-snapshots");
  refresh.disabled = true;
  try {
    const data = await api("/api/market-pulse");
    const run = data.lastRun;
    const status = $("pulse-status");
    status.className = "pulse-status " + (run?.status === "succeeded" ? "success" : run?.status === "failed" ? "failed" : "pending");
    status.textContent = run?.status === "succeeded"
      ? "Cron สำเร็จ · " + (run.finished_at ? new Date(run.finished_at).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" }) : "")
      : run?.status === "failed" ? "Cron รอบล่าสุดไม่สำเร็จ" : "รอ cron ทำงานรอบแรก";

    if (!data.available || !data.brief) {
      $("pulse-date").textContent = "ยังไม่มีสรุปตลาด";
      summary.textContent = "เมื่อกำหนด Finnhub, Gemini และ Neon แล้ว งาน cron จะดึง snapshot และสร้างสรุปตลาดให้อัตโนมัติ";
      $("pulse-model").textContent = "";
      snapshots.innerHTML = '<div class="empty-state">ข้อมูลราคาจะปรากฏหลัง cron ทำงานสำเร็จ</div>';
      return;
    }

    $("pulse-date").textContent = "ข้อมูลวันที่ " + formatPulseDate(data.brief.as_of_date);
    summary.textContent = data.brief.summary;
    $("pulse-model").textContent = data.brief.symbols_count + " Ticker · " + data.brief.model + " · สร้างเมื่อ " + new Date(data.brief.generated_at).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
    snapshots.replaceChildren();
    for (const item of data.snapshots || []) {
      const card = document.createElement("article");
      card.className = "pulse-ticker";
      const heading = document.createElement("div");
      heading.className = "pulse-ticker-heading";
      const symbol = document.createElement("strong");
      symbol.textContent = item.symbol;
      const percent = document.createElement("span");
      const changePercent = item.change_percent === null || item.change_percent === undefined ? Number.NaN : Number(item.change_percent);
      percent.className = "pulse-change " + (changePercent >= 0 ? "positive" : "negative");
      percent.textContent = Number.isFinite(changePercent) ? (changePercent >= 0 ? "+" : "") + changePercent.toFixed(2) + "%" : "—";
      heading.append(symbol, percent);
      const price = document.createElement("strong");
      price.className = "pulse-price";
      price.textContent = fmt(item.price, "", 2);
      const detail = document.createElement("small");
      detail.className = "muted";
      detail.textContent = "เปลี่ยน " + fmt(item.change, "", 2) + " · สูง " + fmt(item.day_high, "", 2) + " · ต่ำ " + fmt(item.day_low, "", 2);
      card.append(heading, price, detail);
      snapshots.append(card);
    }
    if (!snapshots.childElementCount) snapshots.innerHTML = '<div class="empty-state">รอบล่าสุดไม่มีข้อมูลราคา</div>';
  } catch (error) {
    $("pulse-date").textContent = "อ่านข้อมูลตลาดไม่สำเร็จ";
    $("pulse-status").className = "pulse-status failed";
    $("pulse-status").textContent = error.message || "เชื่อมต่อ Neon ไม่สำเร็จ";
    summary.textContent = "ตรวจ DATABASE_URL และการเชื่อมต่อ Neon แล้วลองโหลดใหม่";
    snapshots.replaceChildren();
  } finally {
    refresh.disabled = false;
  }
}

$("pulse-refresh")?.addEventListener("click", loadMarketPulse);
loadMarketPulse();
async function loadIntegrationStatus() {
  try {
    const data = await api("/api/health");
    const integrations = data.integrations || {};
    const configured = [
      integrations.finnhub ? "Finnhub ตั้งค่าแล้ว" : "Finnhub ขาด key",
      integrations.gemini ? "Gemini ตั้งค่าแล้ว" : "Gemini ขาด key",
      integrations.neon === "connected" ? "Neon เชื่อมต่อแล้ว" : integrations.neon === "not_configured" ? "Neon ขาด URL" : "Neon เชื่อมต่อไม่ได้"
    ];
    const ready = Boolean(integrations.finnhub && integrations.gemini && integrations.neon === "connected");
    $("integration-title").textContent = ready ? "ตั้งค่าบริการครบ" : "ตรวจสอบการตั้งค่า";
    $("integration-list").textContent = configured.join(" · ");
    $("integration-dot").classList.toggle("offline", !ready);
  } catch {
    $("integration-title").textContent = "ตรวจสถานะบริการไม่ได้";
    $("integration-dot").classList.add("offline");
  }
}
loadIntegrationStatus();

const originalLoadStock = loadStock;
loadStock = async function(symbol) { activeSymbol=safeSymbol(symbol); await originalLoadStock(symbol); await loadChart(); };
renderWatchlist(); renderCompare(); renderAlerts(); calculateReturn();
checkPriceAlerts();

// Stock Co-Pilot chat UI; no API key is ever sent to the browser.
const copilotForm = $("copilot-form");
const copilotInput = $("copilot-input");
const copilotMessages = $("copilot-messages");
function addCopilotMessage(role, text) {
  const item = document.createElement("div"); item.className = `copilot-message ${role}`;
  const name = document.createElement("strong"); name.textContent = role === "user" ? "คุณ" : "Stock Co-Pilot";
  const body = document.createElement("p"); body.textContent = text;
  item.append(name, body); copilotMessages.append(item); copilotMessages.scrollTop = copilotMessages.scrollHeight;
  return body;
}
copilotForm?.addEventListener("submit", async (event) => {
  event.preventDefault(); const message = copilotInput.value.trim(); if (!message) return;
  addCopilotMessage("user", message); copilotInput.value = "";
  const send = $("copilot-send"); send.disabled = true; send.textContent = "กำลังคิด…";
  const reply = addCopilotMessage("assistant", "กำลังวิเคราะห์คำถาม…");
  let context = "";
  if (activeSymbol) {
    context = `Ticker ที่เลือก: ${activeSymbol}. ข้อมูลราคาหรือ metrics อาจยังไม่ได้โหลดหรือไม่ครบ; ห้ามถือว่ามีข้อมูลสด`;
    const price = $("price")?.textContent; const name = $("company-name")?.textContent;
    if (price && price !== "—" && price !== "ไม่มีข้อมูล") context += `\nราคาที่หน้าเว็บแสดง: ${price}`;
    if (name && name !== "—") context += `\nชื่อบริษัท: ${name}`;
  }
  try { const data = await api("/api/copilot", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message, symbol: activeSymbol || "", context }) }); reply.textContent = data.answer; }
  catch (error) { reply.textContent = `${error.message || "ส่งคำถามไม่สำเร็จ"} หากยังไม่ได้ตั้ง GEMINI_API_KEY ให้เพิ่มใน Render → Environment แล้ว Deploy ใหม่`; }
  finally { send.disabled = false; send.textContent = "ส่งคำถาม ↗"; copilotInput.focus(); }
});
