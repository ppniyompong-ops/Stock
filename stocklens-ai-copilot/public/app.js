const $ = (id) => document.getElementById(id);
const form = $("search-form");
const input = $("symbol-input");
const resultsBox = $("search-results");
const stockSection = $("stock-section");
let toastTimer;
let activeSymbol = "";
let latestCandles = [];
let stockRequestId = 0;
let chartRequestId = 0;
let lastChartWidth = 0;

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
  activeSymbol = symbol;
  const requestId = ++stockRequestId;
  input.value = symbol;
  stockSection.classList.remove("hidden");
  resultsBox.classList.add("hidden");
  $("stock-symbol").textContent = symbol;
  $("company-name").textContent = "กำลังโหลดข้อมูล...";
  $("company-meta").textContent = "กำลังเชื่อมต่อ Finnhub";
  $("analysis").innerHTML = '<p class="muted">กำลังวิเคราะห์ตัวชี้วัด...</p>';
  $("chart-caption").textContent = `${symbol} · ราคาปิดรายวัน (Finnhub และแหล่งข้อมูลสำรอง)`;
  $("price-chart").innerHTML = '<div class="chart-placeholder">กำลังโหลดกราฟราคา…</div>';
  $("export-csv").disabled = true;
  latestCandles = [];
  void loadChart();
  stockSection.scrollIntoView({ behavior: "smooth", block: "start" });

  const [quoteR, profileR, metricsR, analysisR] = await Promise.allSettled([
    api(`/api/quote/${encodeURIComponent(symbol)}`),
    api(`/api/profile/${encodeURIComponent(symbol)}`),
    api(`/api/metrics/${encodeURIComponent(symbol)}`),
    api(`/api/analysis/${encodeURIComponent(symbol)}`)
  ]);
  if (requestId !== stockRequestId) return;
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

// Workspace data is kept locally and separated by the selected workspace.
const workspaceStorageKey = "stocklens-workspaces";
const workspaceActiveKey = "stocklens-active-workspace";
const defaultWorkspace = { id: "default", name: "ส่วนตัว" };
function loadWorkspaces() {
  try {
    const parsed = JSON.parse(localStorage.getItem(workspaceStorageKey) || "null");
    const valid = Array.isArray(parsed) ? parsed.filter(item => item && typeof item.id === "string" && typeof item.name === "string" && item.name.trim()).slice(0, 8) : [];
    return valid.length ? valid : [{ ...defaultWorkspace }];
  } catch { return [{ ...defaultWorkspace }]; }
}
let workspaces = loadWorkspaces();
let activeWorkspaceId = (() => {
  try { const saved = localStorage.getItem(workspaceActiveKey); return workspaces.some(item => item.id === saved) ? saved : workspaces[0].id; }
  catch { return workspaces[0].id; }
})();
function saveWorkspaces() {
  try {
    localStorage.setItem(workspaceStorageKey, JSON.stringify(workspaces));
    localStorage.setItem(workspaceActiveKey, activeWorkspaceId);
  } catch { toast("เบราว์เซอร์ไม่อนุญาตให้บันทึก Workspace"); }
}
function scopedStorageKey(key, workspaceId = activeWorkspaceId) { return `${key}:${workspaceId}`; }
const readStore = (key, fallback = []) => {
  try {
    let raw = localStorage.getItem(scopedStorageKey(key));
    if (raw === null && activeWorkspaceId === "default") {
      raw = localStorage.getItem(key);
      if (raw !== null) localStorage.setItem(scopedStorageKey(key), raw);
    }
    const value = JSON.parse(raw || "null");
    return Array.isArray(fallback) ? (Array.isArray(value) ? value : fallback) : (value ?? fallback);
  }
  catch { return fallback; }
};
const writeStore = (key, value) => { try { localStorage.setItem(scopedStorageKey(key), JSON.stringify(value)); } catch { toast("อุปกรณ์ไม่อนุญาตให้บันทึกข้อมูลในเบราว์เซอร์"); } };
const safeSymbol = (value) => String(value || "").trim().toUpperCase().replace(/\s+/g, "");

function renderWorkspaceControls() {
  const select = $("workspace-select");
  select.replaceChildren();
  for (const workspace of workspaces) {
    const option = document.createElement("option");
    option.value = workspace.id;
    option.textContent = workspace.name;
    select.append(option);
  }
  select.value = activeWorkspaceId;
  $("workspace-delete").disabled = workspaces.length <= 1;
}

let workspaceDialogMode = "create";
function openWorkspaceDialog(mode) {
  workspaceDialogMode = mode;
  const dialog = $("workspace-dialog");
  const nameInput = $("workspace-name");
  const current = workspaces.find(item => item.id === activeWorkspaceId);
  $("workspace-dialog-title").textContent = mode === "create" ? "เพิ่ม Workspace" : "เปลี่ยนชื่อ Workspace";
  nameInput.value = mode === "rename" ? (current?.name || "") : "";
  dialog.showModal();
  nameInput.focus();
}

$("workspace-select").addEventListener("change", () => {
  activeWorkspaceId = $("workspace-select").value;
  saveWorkspaces();
  renderWatchlist();
  renderAlerts();
  checkPriceAlerts();
  document.querySelector(".workspace-more").open = false;
  toast(`เปลี่ยนเป็น Workspace: ${workspaces.find(item => item.id === activeWorkspaceId)?.name || ""}`);
});
$("workspace-add").addEventListener("click", () => {
  if (workspaces.length >= 8) return toast("สร้าง Workspace ได้สูงสุด 8 รายการ");
  openWorkspaceDialog("create");
});
$("workspace-rename").addEventListener("click", () => {
  document.querySelector(".workspace-more").open = false;
  openWorkspaceDialog("rename");
});
$("workspace-delete").addEventListener("click", () => {
  document.querySelector(".workspace-more").open = false;
  if (workspaces.length <= 1) return toast("ต้องเหลือ Workspace อย่างน้อย 1 รายการ");
  const current = workspaces.find(item => item.id === activeWorkspaceId);
  if (!current || !window.confirm(`ลบ Workspace “${current.name}” และรายการติดตาม/แจ้งเตือนของ Workspace นี้หรือไม่?`)) return;
  try {
    localStorage.removeItem(scopedStorageKey("stocklens-watchlist", current.id));
    localStorage.removeItem(scopedStorageKey("stocklens-alerts", current.id));
  } catch {}
  workspaces = workspaces.filter(item => item.id !== current.id);
  activeWorkspaceId = workspaces[0].id;
  saveWorkspaces();
  renderWorkspaceControls();
  renderWatchlist();
  renderAlerts();
  toast("ลบ Workspace แล้ว");
});
$("workspace-form").addEventListener("submit", event => {
  event.preventDefault();
  const name = $("workspace-name").value.trim();
  if (!name) return toast("กรุณาตั้งชื่อ Workspace");
  if (workspaces.some(item => item.name.toLocaleLowerCase() === name.toLocaleLowerCase() && (workspaceDialogMode === "create" || item.id !== activeWorkspaceId))) {
    return toast("มี Workspace ชื่อนี้แล้ว");
  }
  if (workspaceDialogMode === "create") {
    const id = globalThis.crypto?.randomUUID?.() || `workspace-${Date.now().toString(36)}`;
    workspaces.push({ id, name });
    activeWorkspaceId = id;
  } else {
    const current = workspaces.find(item => item.id === activeWorkspaceId);
    if (current) current.name = name;
  }
  saveWorkspaces();
  renderWorkspaceControls();
  renderWatchlist();
  renderAlerts();
  $("workspace-dialog").close();
  toast(workspaceDialogMode === "create" ? `สร้าง Workspace “${name}” แล้ว` : "เปลี่ยนชื่อ Workspace แล้ว");
});
$("workspace-cancel").addEventListener("click", () => $("workspace-dialog").close());
document.addEventListener("click", event => {
  if (!event.target.closest(".workspace-more")) document.querySelector(".workspace-more").open = false;
});

function setActiveNavigation(targetId) {
  const links = [...document.querySelectorAll(".sidebar-nav .nav")];
  const chosen = links.find(link => link.dataset.navTarget === targetId) || links[0];
  for (const link of links) {
    const active = link === chosen;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
}
document.querySelector(".sidebar-nav").addEventListener("click", event => {
  const link = event.target.closest("a[data-nav-target]");
  if (!link) return;
  let targetId = link.dataset.navTarget;
  let target = $(targetId);
  if (link.dataset.requiresStock && stockSection.classList.contains("hidden")) {
    event.preventDefault();
    targetId = "research";
    target = $(targetId);
    toast("ค้นหาหุ้นก่อน เพื่อเปิดตัวชี้วัดของบริษัท");
  } else {
    event.preventDefault();
  }
  if (!target) return;
  if (location.hash !== `#${targetId}`) history.pushState({}, "", `#${targetId}`);
  setActiveNavigation(targetId);
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  if (targetId === "research") setTimeout(() => input.focus({ preventScroll: true }), 350);
});
window.addEventListener("hashchange", () => setActiveNavigation(location.hash.slice(1)));
window.addEventListener("popstate", () => setActiveNavigation(location.hash.slice(1)));
if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveNavigation(visible.target.id);
  }, { rootMargin: "-15% 0px -70% 0px", threshold: [0, .15, .35, .6] });
  for (const link of document.querySelectorAll(".sidebar-nav .nav")) {
    const target = $(link.dataset.navTarget);
    if (target) navObserver.observe(target);
  }
}
setActiveNavigation(location.hash.slice(1) || "market-pulse");

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
  const workspaceId = activeWorkspaceId;
  const items = readStore("stocklens-alerts"); let changed = false;
  for (const item of items) {
    if (item.triggered) continue;
    try {
      const q = await api(`/api/quote/${encodeURIComponent(item.symbol)}`);
      if (workspaceId !== activeWorkspaceId) return;
      const hit = item.direction === "above" ? Number(q.price) >= item.target : Number(q.price) <= item.target;
      if (hit) { item.triggered = true; changed = true; toast(`แจ้งเตือน ${item.symbol}: ราคาถึง ${fmt(q.price)} แล้ว`); }
    } catch { /* API may be unavailable or rate-limited; retry on next page visit. */ }
  }
  if (changed && workspaceId === activeWorkspaceId) { writeStore("stocklens-alerts", items); renderAlerts(); }
}

function renderChart(candles) {
  const host = $("price-chart");
  const rows = candles.filter(item => Number.isFinite(Number(item?.time)) && Number.isFinite(Number(item?.close)));
  host.replaceChildren();
  latestCandles = rows;
  if (!rows.length) {
    host.innerHTML = '<div class="chart-placeholder">ไม่มีข้อมูลราคาย้อนหลังสำหรับ Ticker หรือช่วงเวลานี้</div>';
    $("export-csv").disabled = true;
    return;
  }

  const width = Math.max(host.clientWidth || 920, 340), height = 300, pad = { top: 20, right: 20, bottom: 34, left: 70 };
  lastChartWidth = width;
  const values = rows.map(item => Number(item.close));
  const rawMin = Math.min(...values), rawMax = Math.max(...values);
  const spread = rawMax - rawMin || Math.max(Math.abs(rawMax) * 0.02, 1);
  const min = rawMin - spread * 0.08, max = rawMax + spread * 0.08, range = max - min;
  const plotWidth = width - pad.left - pad.right, plotHeight = height - pad.top - pad.bottom;
  const x = index => pad.left + index * plotWidth / Math.max(1, rows.length - 1);
  const y = value => pad.top + (max - value) * plotHeight / range;
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `กราฟเส้นราคาปิด ${activeSymbol}`);

  for (let index = 0; index < 4; index++) {
    const value = max - index * range / 3;
    const yy = y(value);
    const grid = document.createElementNS(ns, "line");
    grid.setAttribute("x1", pad.left); grid.setAttribute("x2", width - pad.right);
    grid.setAttribute("y1", yy); grid.setAttribute("y2", yy);
    grid.setAttribute("class", "chart-gridline"); svg.append(grid);
    const label = document.createElementNS(ns, "text");
    label.setAttribute("x", pad.left - 10); label.setAttribute("y", yy + 4);
    label.setAttribute("text-anchor", "end"); label.setAttribute("class", "chart-label");
    label.textContent = fmt(value, "", 2); svg.append(label);
  }

  const path = document.createElementNS(ns, "path");
  path.setAttribute("d", values.map((value, index) => `${index ? "L" : "M"}${x(index)},${y(value)}`).join(" "));
  path.setAttribute("class", "chart-line"); svg.append(path);
  for (const index of [...new Set([0, rows.length - 1])]) {
    const point = document.createElementNS(ns, "circle");
    point.setAttribute("cx", x(index)); point.setAttribute("cy", y(values[index])); point.setAttribute("r", "4");
    point.setAttribute("class", "chart-point"); svg.append(point);
  }

  const dateLabel = timestamp => new Date(Number(timestamp)).toLocaleDateString("th-TH", { day: "numeric", month: "short", timeZone: "Asia/Bangkok" });
  const start = document.createElementNS(ns, "text");
  start.setAttribute("x", pad.left); start.setAttribute("y", height - 8); start.setAttribute("class", "chart-label");
  start.textContent = dateLabel(rows[0].time); svg.append(start);
  const end = document.createElementNS(ns, "text");
  end.setAttribute("x", width - pad.right); end.setAttribute("y", height - 8); end.setAttribute("text-anchor", "end");
  end.setAttribute("class", "chart-label"); end.textContent = dateLabel(rows[rows.length - 1].time); svg.append(end);
  host.append(svg);

  const first = values[0], last = values[values.length - 1], change = first ? (last / first - 1) * 100 : 0;
  const stats = document.createElement("div");
  stats.className = "chart-stats";
  stats.textContent = `${activeSymbol} · ${rows.length} วันซื้อขาย · ล่าสุด ${fmt(last)} · เปลี่ยนแปลง ${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
  host.append(stats);
  $("export-csv").disabled = false;
}
async function loadChart() {
  if (!activeSymbol) return toast("ค้นหาหุ้นก่อน แล้วจึงโหลดกราฟ");
  const requestId = ++chartRequestId;
  const symbol = activeSymbol;
  const host = $("price-chart");
  const loadButton = $("chart-load");
  host.innerHTML = '<div class="chart-placeholder">กำลังโหลดข้อมูลกราฟ…</div>';
  $("export-csv").disabled = true;
  loadButton.disabled = true;
  try {
    const data = await api(`/api/candles/${encodeURIComponent(symbol)}?days=${encodeURIComponent($("chart-range").value)}`);
    if (requestId !== chartRequestId || symbol !== activeSymbol) return;
    $("chart-caption").textContent = `${symbol} · ราคาปิดรายวันจาก ${data.source || "แหล่งข้อมูลตลาด"}`;
    renderChart(data.candles || []);
  } catch (error) {
    if (requestId !== chartRequestId || symbol !== activeSymbol) return;
    host.replaceChildren();
    const message = document.createElement("div");
    message.className = "chart-placeholder";
    message.textContent = error.message || "โหลดกราฟไม่สำเร็จ ลองอีกครั้งภายหลัง";
    host.append(message);
  } finally {
    if (requestId === chartRequestId) loadButton.disabled = false;
  }
}
$("chart-load")?.addEventListener("click", loadChart);
$("chart-range")?.addEventListener("change", loadChart);
if ("ResizeObserver" in window) {
  const chartResizeObserver = new ResizeObserver(() => {
    const width = Math.max($("price-chart").clientWidth || 920, 340);
    if (latestCandles.length && Math.abs(width - lastChartWidth) > 8) renderChart(latestCandles);
  });
  chartResizeObserver.observe($("price-chart"));
}
$("export-csv")?.addEventListener("click", () => {
  if (!latestCandles.length) return;
  const rows=[["date","open","high","low","close","volume"],...latestCandles.map(c=>[new Date(c.time).toISOString().slice(0,10),c.open,c.high,c.low,c.close,c.volume])];
  const csv="\uFEFF"+rows.map(row=>row.map(value=>`"${String(value ?? "").replace(/"/g,'""')}"`).join(",")).join("\r\n");
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"}));const a=document.createElement("a");a.href=url;a.download=`${activeSymbol}-history.csv`;document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);toast("ส่งออก CSV แล้ว");
});

function applyTheme(light, persist = false) {
  document.documentElement.classList.toggle("light-theme", light);
  const button = $("theme-toggle");
  if (button) {
    button.textContent = light ? "☾" : "☀";
    button.setAttribute("aria-label", light ? "เปลี่ยนเป็นธีมมืด" : "เปลี่ยนเป็นธีมสว่าง");
    button.title = light ? "เปลี่ยนเป็นธีมมืด" : "เปลี่ยนเป็นธีมสว่าง";
  }
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = light ? "#f1f6f5" : "#0b1118";
  if (persist) { try { localStorage.setItem("stocklens-theme", light ? "light" : "dark"); } catch {} }
}
let savedLightTheme = false;
try { savedLightTheme = localStorage.getItem("stocklens-theme") === "light"; } catch {}
applyTheme(savedLightTheme);
$("theme-toggle")?.addEventListener("click", () => applyTheme(!document.documentElement.classList.contains("light-theme"), true));

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
      : run?.status === "failed" ? "Cron รอบล่าสุดไม่สำเร็จ" : "ยังไม่พบประวัติ Cron";

    if (!data.available || !data.brief) {
      $("pulse-date").textContent = data.snapshotDate
        ? "ข้อมูลราคาวันที่ " + formatPulseDate(data.snapshotDate)
        : "ยังไม่มีสรุปตลาด";
      summary.textContent = run?.status === "failed"
        ? `Cron ทำงานไม่สำเร็จ: ${run.error || "เปิด Render Logs ของ stocklens-market-pulse เพื่อตรวจสาเหตุ"}`
        : data.snapshots?.length
          ? "มี snapshot ราคาแล้ว แต่ยังไม่มีสรุป Gemini สำหรับวันนี้"
          : "ยังไม่พบประวัติการรัน Cron ตรวจว่า Render มี service stocklens-market-pulse และตั้ง FINNHUB_API_KEY, GEMINI_API_KEY, DATABASE_URL ไว้ใน service นี้ครบแล้ว";
      $("pulse-model").textContent = "";
    } else {
      $("pulse-date").textContent = "ข้อมูลวันที่ " + formatPulseDate(data.brief.as_of_date);
      summary.textContent = data.brief.summary;
      $("pulse-model").textContent = data.brief.symbols_count + " Ticker · " + data.brief.model + " · สร้างเมื่อ " + new Date(data.brief.generated_at).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
    }

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
    if (!snapshots.childElementCount) {
      snapshots.innerHTML = run?.status === "failed"
        ? '<div class="empty-state">Cron ไม่ได้บันทึกราคา ตรวจข้อความ error และ Environment ของ service</div>'
        : '<div class="empty-state">ข้อมูลราคาจะปรากฏหลัง cron ทำงานสำเร็จ</div>';
    }
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

renderWorkspaceControls();
renderWatchlist();
renderAlerts();
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
