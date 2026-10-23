const I18N = {
  th: {
    "nav.workspace":"WORKSPACE","workspace.select":"เลือก Workspace","workspace.rename":"เปลี่ยนชื่อ","workspace.create":"เพิ่ม Workspace","workspace.name":"ชื่อ Workspace","workspace.namePlaceholder":"เช่น หุ้นระยะยาว","workspace.delete":"ลบ Workspace","workspace.personal":"ส่วนตัว",
    "nav.section":"เมนูหลัก","nav.dashboard":"ภาพรวมตลาด","nav.stocks":"หุ้น / วิเคราะห์","nav.portfolio":"พอร์ตหุ้น","nav.watchlist":"รายการติดตาม","nav.alerts":"แจ้งเตือนราคา","nav.copilot":"Stock Co-Pilot","nav.profile":"โปรไฟล์","nav.settings":"ตั้งค่า","nav.dataNote":"ข้อมูลขึ้นอยู่กับสิทธิ์ API และตลาด",
    "topbar.eyebrow":"EQUITY RESEARCH PLATFORM","topbar.connected":"เชื่อมต่อบริการ","page.dashboard":"ภาพรวมตลาด","page.stocks":"หุ้น / วิเคราะห์","page.portfolio":"พอร์ตหุ้น","page.watchlist":"รายการติดตาม","page.alerts":"แจ้งเตือนราคา","page.copilot":"Stock Co-Pilot","page.profile":"โปรไฟล์","page.settings":"ตั้งค่า",
    "profile.defaultName":"โปรไฟล์","dashboard.eyebrow":"RESEARCH WITH CONTEXT","dashboard.heroFirst":"เข้าใจธุรกิจ","dashboard.heroSecond":"ก่อนตัดสินใจลงทุน","dashboard.heroDescription":"ดูภาพรวมตลาด ติดตามหุ้น และตรวจผลการลงทุนจากข้อมูลในที่เดียว","dashboard.explore":"เริ่มวิเคราะห์หุ้น",
    "pulse.title":"ภาพรวมตลาดประจำวัน","pulse.description":"ราคาและการเปลี่ยนแปลงของหุ้นกับ ETF ที่ติดตาม","pulse.refresh":"อัปเดตตลาด","pulse.loadingDate":"กำลังโหลด…","pulse.connecting":"กำลังโหลดตลาด","pulse.loading":"กำลังโหลดสรุปตลาดล่าสุด","pulse.loadingPrices":"กำลังโหลดข้อมูลราคา…","pulse.refreshing":"กำลังอัปเดตราคาและสรุปตลาด","pulse.manualDone":"อัปเดตแล้ว","pulse.cronDone":"ข้อมูลจากรอบล่าสุด","pulse.runFailed":"อัปเดตไม่สำเร็จ","pulse.noRun":"ยังไม่มีรอบอัปเดต","pulse.pricesFor":"ข้อมูลวันที่","pulse.noBrief":"ยังไม่มีข้อมูลตลาด","pulse.refreshPrompt":"กดอัปเดตตลาดเพื่อดึงราคาและสร้างสรุป","pulse.noPrices":"ยังไม่มีราคาให้แสดง","pulse.errorTitle":"โหลดภาพรวมตลาดไม่ได้","pulse.checkServices":"ตรวจ Finnhub และการเชื่อมต่อ Neon แล้วลองอีกครั้ง",
    "news.title":"ข่าวที่มีผลต่อตลาด","news.refresh":"อัปเดตข่าว","news.loading":"กำลังโหลดข่าวตลาด…","news.empty":"ยังไม่มีข่าวสำคัญในช่วงนี้","news.error":"โหลดข่าวตลาดไม่ได้","news.highImpact":"ประเด็นมหภาค","news.companyImpact":"ข่าวบริษัท","news.marketWatch":"ติดตามตลาด","news.topic.rates":"ดอกเบี้ย","news.topic.inflation":"เงินเฟ้อ","news.topic.economy":"เศรษฐกิจ","news.topic.trade":"การค้า/นโยบาย","news.topic.energy":"พลังงาน/ภูมิรัฐศาสตร์","news.topic.company":"บริษัท",
    "stocks.eyebrow":"STOCK RESEARCH","stocks.title":"ค้นหาและวิเคราะห์หุ้น","stocks.description":"เลือกราคา ดูผลต่างวันนี้และตั้งแต่ต้นปี พร้อมกราฟย้อนหลังของหุ้นตัวเดียวกัน","stocks.searchPlaceholder":"ค้นหา Ticker เช่น AAPL, MSFT","stocks.search":"ค้นหา","stocks.popular":"หุ้นยอดนิยม","stocks.company":"COMPANY OVERVIEW",
    "stock.lastPrice":"ราคาล่าสุด","stock.today":"เปลี่ยนแปลงวันนี้","stock.ytd":"เปลี่ยนแปลงปีนี้ (YTD)","stock.todayHint":"เทียบราคาปิดวันก่อน","stock.ytdHint":"เทียบราคาปิดสิ้นปีก่อน","stock.marketCap":"มูลค่าตลาด","stock.marketCapHint":"หน่วยตามแหล่งข้อมูล","stock.peHint":"ราคาต่อกำไร","stock.roeHint":"ผลตอบแทนต่อส่วนผู้ถือหุ้น","stock.metricsTitle":"ตัวชี้วัดทางการเงิน","stock.netMargin":"อัตรากำไรสุทธิ","stock.revenueGrowth":"การเติบโตรายได้ YoY","stock.dividend":"อัตราผลตอบแทนเงินปันผล","stock.metricsFootnote":"ข้อมูลบางรายการขึ้นอยู่กับแพ็กเกจ API และอาจไม่มีสำหรับทุกบริษัท","stock.analysisTitle":"ข้อสังเกตเบื้องต้น","stock.analysisEmpty":"เลือกหุ้นเพื่อดูข้อสังเกตจากตัวชี้วัด","stock.analysisNote":"ไม่ใช่คำแนะนำการลงทุน","stock.dataNote":"ข้อมูลขึ้นอยู่กับสิทธิ์และความพร้อมใช้งานของผู้ให้บริการ",
    "chart.title":"กราฟราคาย้อนหลัง","chart.emptyCaption":"เลือกหุ้นเพื่อดูกราฟรายวัน","chart.rangeLabel":"ช่วงเวลากราฟ","chart.oneMonth":"1 เดือน","chart.threeMonths":"3 เดือน","chart.sixMonths":"6 เดือน","chart.oneYear":"1 ปี","chart.load":"โหลดกราฟ","chart.placeholder":"กราฟจะแสดงหลังเลือกหุ้น","chart.legend":"● ราคาปิดรายวัน","chart.export":"ส่งออก CSV",
    "portfolio.addSelected":"เพิ่มเข้าพอร์ต","portfolio.title":"พอร์ตหุ้นที่ถืออยู่","portfolio.description":"บันทึกต้นทุนและติดตามมูลค่าพอร์ตเทียบกับราคาล่าสุด","portfolio.refresh":"อัปเดตราคาจริง","portfolio.cost":"ต้นทุนรวม","portfolio.positionsCount":"จำนวนรายการที่ถือ","portfolio.value":"มูลค่าปัจจุบัน","portfolio.liveQuote":"อ้างอิงราคาล่าสุด","portfolio.unrealized":"กำไร/ขาดทุนที่ยังไม่รับรู้","portfolio.addTitle":"เพิ่มหุ้นที่ซื้อแล้ว","portfolio.symbol":"หุ้น / Ticker","portfolio.symbolPlaceholder":"เช่น AAPL","portfolio.buyPrice":"ราคาซื้อต่อหุ้น","portfolio.buyPricePlaceholder":"ราคาต่อหุ้น","portfolio.quantity":"จำนวนหุ้น","portfolio.quantityPlaceholder":"จำนวน","portfolio.currency":"สกุลเงิน","portfolio.buyDate":"วันที่ซื้อ","portfolio.currencyNote":"กรอกราคาซื้อและเลือกสกุลเงินให้ตรงกับตลาดของหุ้น · ข้อมูลพอร์ตบันทึกในอุปกรณ์นี้","portfolio.add":"เพิ่มเข้าพอร์ต","portfolio.positionsTitle":"รายการที่ถือ","portfolio.currentPrice":"ราคาล่าสุด","portfolio.todayPL":"วันนี้","portfolio.totalPL":"กำไร/ขาดทุน","portfolio.empty":"ยังไม่มีหุ้นในพอร์ต","portfolio.remove":"ลบ","portfolio.openStock":"เปิดข้อมูลหุ้น","portfolio.loading":"กำลังดึงราคาปัจจุบัน…","portfolio.failed":"ดึงราคาปัจจุบันไม่ได้","portfolio.updateTime":"อัปเดตราคาเมื่อ","portfolio.added":"เพิ่มหุ้นเข้าพอร์ตแล้ว","portfolio.invalid":"ตรวจ Ticker ราคา จำนวน และวันที่ซื้อให้ถูกต้อง","portfolio.limit":"เพิ่มหุ้นได้สูงสุด 30 รายการ","portfolio.confirmDelete":"ลบรายการหุ้นนี้ออกจากพอร์ตหรือไม่?","portfolio.holdingDays":"วันที่ถือ",
    "portfolio.currencyMismatch":"สกุลเงินไม่ตรงกับราคาตลาด",
    "watch.title":"รายการติดตาม","watch.description":"เก็บหุ้นที่สนใจไว้เปิดดูได้รวดเร็ว","watch.note":"รายการนี้แยกตาม Workspace และบันทึกในอุปกรณ์นี้","watch.placeholder":"เพิ่มหุ้น เช่น AAPL","watch.empty":"ยังไม่มีหุ้นที่ติดตาม","watch.added":"เพิ่มหุ้นในรายการติดตามแล้ว","watch.exists":"หุ้นนี้อยู่ในรายการติดตามแล้ว","watch.limit":"ติดตามได้สูงสุด 12 หุ้น",
    "alerts.title":"แจ้งเตือนราคา","alerts.description":"ติดตามระดับราคาที่คุณกำหนด","alerts.note":"ระบบตรวจราคาเมื่อเปิดหน้าเว็บนี้","alerts.symbolPlaceholder":"Ticker","alerts.above":"ราคาสูงกว่าหรือเท่ากับ","alerts.below":"ราคาต่ำกว่าหรือเท่ากับ","alerts.targetPlaceholder":"ราคาเป้าหมาย","alerts.add":"ตั้งแจ้งเตือน","alerts.empty":"ยังไม่มีการแจ้งเตือน","alerts.saved":"บันทึกแจ้งเตือนแล้ว","alerts.invalid":"กรอก Ticker และราคาเป้าหมายให้ถูกต้อง","alerts.limit":"ตั้งแจ้งเตือนได้สูงสุด 10 รายการ","alerts.hit":"ราคาถึงเป้าหมายแล้ว","alerts.waiting":"รอตรวจสอบ",
    "copilot.description":"ถามเรื่องธุรกิจ งบการเงิน และความเสี่ยง","copilot.prompt":"ถามเรื่องธุรกิจ งบการเงิน ความเสี่ยง หรือให้ช่วยอธิบายหุ้น","copilot.greeting":"สวัสดีครับ ผมช่วยอธิบายข้อมูลหุ้นและประเด็นที่ควรศึกษาต่อได้ หากไม่มีข้อมูลตลาดแนบมา ผมจะแจ้งให้ทราบแทนการเดาตัวเลข","copilot.placeholder":"ถาม Stock Co-Pilot…","copilot.send":"ส่งคำถาม ↗","copilot.footnote":"AI อาจผิดพลาด · ไม่ใช่คำแนะนำซื้อขาย · อย่าใส่ API Key ในช่องแชต",
    "profile.title":"โปรไฟล์","profile.description":"ตั้งชื่อโปรไฟล์ที่แสดงบนอุปกรณ์นี้","profile.name":"ชื่อที่แสดง","profile.namePlaceholder":"ชื่อของคุณ","profile.email":"อีเมล (ไม่บังคับ)","profile.localProfile":"โปรไฟล์ในอุปกรณ์นี้","profile.privateTitle":"ข้อมูลส่วนตัว","profile.privateNote":"โปรไฟล์นี้บันทึกไว้ในเบราว์เซอร์ของอุปกรณ์นี้เท่านั้น ยังไม่มีระบบบัญชีหรือซิงก์ข้ามอุปกรณ์","profile.saved":"บันทึกโปรไฟล์แล้ว",
    "settings.title":"ตั้งค่า","settings.description":"ภาษา ธีม และสถานะบริการ","settings.language":"ภาษา","settings.languageNote":"เลือกภาษาของเมนูและข้อความในระบบ","settings.theme":"ธีม","settings.themeNote":"เลือกโหมดสว่างหรือโหมดมืด","settings.dark":"มืด","settings.light":"สว่าง","settings.savedLocally":"การตั้งค่าจะบันทึกในเบราว์เซอร์ของอุปกรณ์นี้","settings.serviceStatus":"สถานะบริการ","settings.serviceLoading":"กำลังตรวจบริการ","settings.configured":"ตั้งค่าแล้ว","settings.missingKey":"ยังไม่มี API Key","settings.connected":"เชื่อมต่อแล้ว","settings.missingUrl":"ยังไม่มี URL","settings.unavailable":"เชื่อมต่อไม่ได้","settings.allReady":"บริการพร้อมใช้งาน","settings.needsSetup":"มีบริการที่ต้องตั้งค่า","settings.statusUnavailable":"ตรวจสถานะไม่ได้",
    "common.add":"เพิ่ม","common.save":"บันทึก","common.cancel":"ยกเลิก","common.delete":"ลบ","common.noData":"ไม่มีข้อมูล","common.searchFirst":"กรุณาค้นหาหุ้นก่อน","common.invalidSymbol":"กรุณากรอก Ticker ให้ถูกต้อง","common.loading":"กำลังโหลด…","footer.disclaimer":"ข้อมูลเพื่อการศึกษา · ไม่ใช่คำแนะนำการลงทุน"
  },
  en: {
    "nav.workspace":"WORKSPACE","workspace.select":"Select workspace","workspace.rename":"Rename","workspace.create":"Add workspace","workspace.name":"Workspace name","workspace.namePlaceholder":"For example, Long-term stocks","workspace.delete":"Delete workspace","workspace.personal":"Personal",
    "nav.section":"MAIN MENU","nav.dashboard":"Market overview","nav.stocks":"Stocks / Research","nav.portfolio":"Portfolio","nav.watchlist":"Watchlist","nav.alerts":"Price alerts","nav.copilot":"Stock Co-Pilot","nav.profile":"Profile","nav.settings":"Settings","nav.dataNote":"Coverage depends on API access and market",
    "topbar.eyebrow":"EQUITY RESEARCH PLATFORM","topbar.connected":"Services connected","page.dashboard":"Market overview","page.stocks":"Stocks / Research","page.portfolio":"Portfolio","page.watchlist":"Watchlist","page.alerts":"Price alerts","page.copilot":"Stock Co-Pilot","page.profile":"Profile","page.settings":"Settings",
    "profile.defaultName":"Profile","dashboard.eyebrow":"RESEARCH WITH CONTEXT","dashboard.heroFirst":"Understand the business","dashboard.heroSecond":"before you invest","dashboard.heroDescription":"Review markets, follow stocks, and track investment performance in one place.","dashboard.explore":"Start stock research",
    "pulse.title":"Daily market overview","pulse.description":"Prices and daily moves for followed stocks and ETFs","pulse.refresh":"Refresh market","pulse.loadingDate":"Loading…","pulse.connecting":"Loading market data","pulse.loading":"Loading the latest market brief","pulse.loadingPrices":"Loading prices…","pulse.refreshing":"Refreshing prices and market brief","pulse.manualDone":"Updated just now","pulse.cronDone":"Latest scheduled update","pulse.runFailed":"Update failed","pulse.noRun":"No update yet","pulse.pricesFor":"Prices for","pulse.noBrief":"No market data yet","pulse.refreshPrompt":"Refresh the market to fetch prices and create a summary","pulse.noPrices":"No prices to show yet","pulse.errorTitle":"Could not load market overview","pulse.checkServices":"Check Finnhub and Neon connectivity, then try again",
    "news.title":"Market-moving news","news.refresh":"Refresh news","news.loading":"Loading market news…","news.empty":"No notable headlines found recently","news.error":"Could not load market news","news.highImpact":"Macro event","news.companyImpact":"Company news","news.marketWatch":"Market watch","news.topic.rates":"Interest rates","news.topic.inflation":"Inflation","news.topic.economy":"Economy","news.topic.trade":"Trade / policy","news.topic.energy":"Energy / geopolitics","news.topic.company":"Company",
    "stocks.eyebrow":"STOCK RESEARCH","stocks.title":"Find and research stocks","stocks.description":"See today’s move, year-to-date return, and the selected stock’s price chart.","stocks.searchPlaceholder":"Search a ticker, such as AAPL or MSFT","stocks.search":"Search","stocks.popular":"Popular stocks","stocks.company":"COMPANY OVERVIEW",
    "stock.lastPrice":"Latest price","stock.today":"Today’s change","stock.ytd":"Year-to-date change","stock.todayHint":"Compared with the prior close","stock.ytdHint":"Compared with the prior year close","stock.marketCap":"Market cap","stock.marketCapHint":"Units from data source","stock.peHint":"Price to earnings","stock.roeHint":"Return on equity","stock.metricsTitle":"Financial metrics","stock.netMargin":"Net profit margin","stock.revenueGrowth":"Revenue growth YoY","stock.dividend":"Dividend yield","stock.metricsFootnote":"Metric coverage depends on the API plan and company","stock.analysisTitle":"Initial observations","stock.analysisEmpty":"Select a stock to see metric observations","stock.analysisNote":"Not investment advice","stock.dataNote":"Data depends on provider access and availability",
    "chart.title":"Historical price chart","chart.emptyCaption":"Select a stock to see daily prices","chart.rangeLabel":"Chart range","chart.oneMonth":"1 month","chart.threeMonths":"3 months","chart.sixMonths":"6 months","chart.oneYear":"1 year","chart.load":"Load chart","chart.placeholder":"The chart appears after you select a stock","chart.legend":"● Daily close","chart.export":"Export CSV",
    "portfolio.addSelected":"Add to portfolio","portfolio.title":"Portfolio holdings","portfolio.description":"Record your cost basis and compare holdings with current market prices.","portfolio.refresh":"Refresh live prices","portfolio.cost":"Total cost","portfolio.positionsCount":"Positions","portfolio.value":"Current value","portfolio.liveQuote":"Based on latest quote","portfolio.unrealized":"Unrealized profit / loss","portfolio.addTitle":"Add a holding","portfolio.symbol":"Ticker","portfolio.symbolPlaceholder":"For example, AAPL","portfolio.buyPrice":"Buy price per share","portfolio.buyPricePlaceholder":"Price per share","portfolio.quantity":"Shares","portfolio.quantityPlaceholder":"Quantity","portfolio.currency":"Currency","portfolio.buyDate":"Purchase date","portfolio.currencyNote":"Use the stock’s market currency for the buy price · Portfolio data is saved on this device.","portfolio.add":"Add holding","portfolio.positionsTitle":"Your positions","portfolio.currentPrice":"Latest price","portfolio.todayPL":"Today","portfolio.totalPL":"Profit / loss","portfolio.empty":"No holdings yet","portfolio.remove":"Remove","portfolio.openStock":"Open stock details","portfolio.loading":"Loading current prices…","portfolio.failed":"Could not load current price","portfolio.updateTime":"Prices updated","portfolio.added":"Holding added","portfolio.invalid":"Check the ticker, price, quantity, and purchase date","portfolio.limit":"You can add up to 30 holdings","portfolio.confirmDelete":"Remove this holding from your portfolio?","portfolio.holdingDays":"Days held",
    "portfolio.currencyMismatch":"Currency differs from the market quote",
    "watch.title":"Watchlist","watch.description":"Save stocks you want to open quickly.","watch.note":"Watchlists are separated by workspace and saved on this device.","watch.placeholder":"Add a ticker, such as AAPL","watch.empty":"No stocks in your watchlist yet","watch.added":"Stock added to watchlist","watch.exists":"This stock is already on your watchlist","watch.limit":"You can follow up to 12 stocks",
    "alerts.title":"Price alerts","alerts.description":"Track price levels you choose.","alerts.note":"Prices are checked when you open this page.","alerts.symbolPlaceholder":"Ticker","alerts.above":"At or above","alerts.below":"At or below","alerts.targetPlaceholder":"Target price","alerts.add":"Create alert","alerts.empty":"No alerts yet","alerts.saved":"Price alert saved","alerts.invalid":"Enter a valid ticker and target price","alerts.limit":"You can create up to 10 alerts","alerts.hit":"Target price reached","alerts.waiting":"Waiting",
    "copilot.description":"Ask about businesses, financials, and risk","copilot.prompt":"Ask about a business, financial statements, risk, or a stock","copilot.greeting":"Hello. I can explain stock data and topics to research. If market data is not attached, I’ll say so instead of guessing numbers.","copilot.placeholder":"Ask Stock Co-Pilot…","copilot.send":"Send ↗","copilot.footnote":"AI can make mistakes · Not investment advice · Never enter an API key in chat",
    "profile.title":"Profile","profile.description":"Set the profile name shown on this device.","profile.name":"Display name","profile.namePlaceholder":"Your name","profile.email":"Email (optional)","profile.localProfile":"Profile on this device","profile.privateTitle":"Your information","profile.privateNote":"This profile is saved only in this browser. There is no account system or cross-device sync yet.","profile.saved":"Profile saved",
    "settings.title":"Settings","settings.description":"Language, appearance, and service status","settings.language":"Language","settings.languageNote":"Choose the language used in menus and interface text.","settings.theme":"Theme","settings.themeNote":"Choose light or dark appearance.","settings.dark":"Dark","settings.light":"Light","settings.savedLocally":"Preferences are saved in this browser.","settings.serviceStatus":"Service status","settings.serviceLoading":"Checking services","settings.configured":"Configured","settings.missingKey":"API key missing","settings.connected":"Connected","settings.missingUrl":"URL missing","settings.unavailable":"Unavailable","settings.allReady":"All services ready","settings.needsSetup":"Setup required","settings.statusUnavailable":"Status unavailable",
    "common.add":"Add","common.save":"Save","common.cancel":"Cancel","common.delete":"Remove","common.noData":"No data","common.searchFirst":"Search for a stock first","common.invalidSymbol":"Enter a valid ticker","common.loading":"Loading…","footer.disclaimer":"For research only · Not investment advice"
  }
};
let currentLanguage = "th";
let activePage = "dashboard";
try { currentLanguage = localStorage.getItem("stocklens-language") === "en" ? "en" : "th"; } catch {}
const pageTitleKeys = { dashboard:"page.dashboard", stocks:"page.stocks", portfolio:"page.portfolio", watchlist:"page.watchlist", alerts:"page.alerts", copilot:"page.copilot", profile:"page.profile", settings:"page.settings" };
const t = key => I18N[currentLanguage]?.[key] || I18N.th[key] || key;

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
let latestQuote = null;
let activeCurrency = "USD";
let latestYearCandles = [];
const yearDataRequests = new Map();

function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3500);
}
function fmt(value, suffix = "", digits = 2) {
  if (value === null || value === undefined || value === "" || !Number.isFinite(Number(value))) return t("common.noData");
  return Number(value).toLocaleString(currentLanguage === "en" ? "en-US" : "th-TH", { maximumFractionDigits: digits, minimumFractionDigits: 0 }) + suffix;
}
function money(value, currency = "USD") {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return t("common.noData");
  try { return new Intl.NumberFormat(currentLanguage === "en" ? "en-US" : "th-TH", { style: "currency", currency, maximumFractionDigits: 2 }).format(value); }
  catch { return fmt(value); }
}
function applyLanguage(language = currentLanguage, persist = true) {
  currentLanguage = language === "en" ? "en" : "th";
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach(element => { if (element.dataset.dynamic !== "true") element.textContent = t(element.dataset.i18n); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => { element.placeholder = t(element.dataset.i18nPlaceholder); });
  document.querySelectorAll("[data-i18n-aria]").forEach(element => { element.setAttribute("aria-label", t(element.dataset.i18nAria)); });
  document.querySelectorAll("[data-i18n-title]").forEach(element => { element.title = t(element.dataset.i18nTitle); });
  if ($("setting-language")) $("setting-language").value = currentLanguage;
  if (pageTitleKeys[activePage] && $("page-title")) $("page-title").textContent = t(pageTitleKeys[activePage]);
  if (persist) { try { localStorage.setItem("stocklens-language", currentLanguage); } catch {} }
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
    const empty = document.createElement("div");
    empty.className = "result-item";
    empty.textContent = currentLanguage === "en" ? "No matches. Try entering the ticker directly." : "ไม่พบผลลัพธ์ ลองกรอก Ticker โดยตรง";
    resultsBox.append(empty);
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
  if (!q) return toast(currentLanguage === "en" ? "Enter a company name or ticker" : "กรุณาพิมพ์ชื่อหุ้นหรือ Ticker");
  resultsBox.classList.remove("hidden");
  resultsBox.textContent = t("common.loading");
  try {
    const data = await api(`/api/search?q=${encodeURIComponent(q)}`);
    // If the exact ticker is not in search results, still try it directly.
    const items = data.results || [];
    if (!items.some(x => x.symbol.toUpperCase() === q.toUpperCase())) {
      items.unshift({ symbol: q.toUpperCase(), description: "ลองเปิด Ticker นี้โดยตรง", type: "Symbol" });
    }
    showResults(items);
  } catch (error) {
    showResults([{ symbol: q.toUpperCase(), description: currentLanguage === "en" ? "Try this ticker directly" : "ลองเปิด Ticker นี้โดยตรง", type: "Symbol" }]);
    toast(error.message);
  }
});
document.querySelectorAll("[data-symbol]").forEach(button => {
  button.addEventListener("click", () => loadStock(button.dataset.symbol));
});

async function loadStock(rawSymbol, { preservePage = false } = {}) {
  const symbol = String(rawSymbol || "").trim().toUpperCase();
  if (!symbol) return;
  activeSymbol = symbol;
  latestQuote = null;
  latestYearCandles = [];
  const requestId = ++stockRequestId;
  input.value = symbol;
  if (!preservePage) navigateToPage("stocks");
  stockSection.classList.remove("hidden");
  resultsBox.classList.add("hidden");
  $("stock-symbol").textContent = symbol;
  $("company-name").textContent = t("common.loading");
  $("company-meta").textContent = currentLanguage === "en" ? "Connecting to Finnhub" : "กำลังเชื่อมต่อ Finnhub";
  $("analysis").textContent = currentLanguage === "en" ? "Loading financial metrics…" : "กำลังวิเคราะห์ตัวชี้วัด…";
  $("chart-caption").textContent = `${symbol} · ${currentLanguage === "en" ? "Daily close (Finnhub and fallback providers)" : "ราคาปิดรายวัน (Finnhub และแหล่งข้อมูลสำรอง)"}`;
  $("price-chart").textContent = t("common.loading");
  $("export-csv").disabled = true;
  $("today-change").textContent = t("common.loading");
  $("ytd-change").textContent = t("common.loading");
  latestCandles = [];
  if (!preservePage) stockSection.scrollIntoView({ behavior: "smooth", block: "start" });
  void loadChart();
  void getYearData(symbol).then(data => {
    if (symbol !== activeSymbol) return;
    latestYearCandles = data.candles || [];
    activeCurrency = data.currency || activeCurrency;
    updateYtdChange();
  }).catch(() => {
    if (symbol === activeSymbol) updateYtdChange();
  });

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

  latestQuote = quote;
  activeCurrency = profile?.currency || activeCurrency;
  $("company-name").textContent = profile?.name || symbol;
  $("company-meta").textContent = [profile?.exchange, profile?.industry, profile?.country].filter(Boolean).join(" · ") || (currentLanguage === "en" ? "Company profile unavailable for this ticker" : "ข้อมูลบริษัทไม่มีในแผน API หรือไม่รองรับ Ticker นี้");
  $("price").textContent = quote ? money(quote.price, profile?.currency || "USD") : t("common.noData");
  const change = quote?.changePercent;
  $("today-change").textContent = quote && Number.isFinite(Number(quote.change))
    ? `${Number(quote.change) > 0 ? "+" : ""}${money(quote.change, activeCurrency)} (${fmt(change, "%")})`
    : t("common.noData");
  $("today-change").style.color = Number.isFinite(Number(change)) ? (Number(change) >= 0 ? "var(--green)" : "var(--red)") : "";
  $("price-source").textContent = quote?.source || "Finnhub";
  updateYtdChange();
  $("market-cap").textContent = profile?.marketCapitalization ? fmt(profile.marketCapitalization) : t("common.noData");
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
    p.textContent = analysisR.status === "rejected" ? analysisR.reason.message : currentLanguage === "en" ? "Not enough data to summarize yet" : "ยังไม่มีข้อมูลเพียงพอสำหรับสรุป";
    analysisBox.append(p);
  }
  if (!quote && !profile && !metrics) toast(currentLanguage === "en" ? "Could not load stock data. Check the API key, plan access, and ticker." : "โหลดข้อมูลไม่สำเร็จ: ตรวจ API Key, สิทธิ์แผน และ Ticker");
}
if (window.lucide) window.lucide.createIcons();

// Workspace data is kept locally and separated by the selected workspace.
const workspaceStorageKey = "stocklens-workspaces";
const workspaceActiveKey = "stocklens-active-workspace";
const defaultWorkspace = { id: "default", name: t("workspace.personal") };
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
  } catch { toast(currentLanguage === "en" ? "This browser could not save the workspace" : "เบราว์เซอร์ไม่อนุญาตให้บันทึก Workspace"); }
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
const writeStore = (key, value) => { try { localStorage.setItem(scopedStorageKey(key), JSON.stringify(value)); } catch { toast(currentLanguage === "en" ? "This browser could not save the data" : "อุปกรณ์ไม่อนุญาตให้บันทึกข้อมูลในเบราว์เซอร์"); } };
const safeSymbol = (value) => String(value || "").trim().toUpperCase().replace(/\s+/g, "");
function localDateValue() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

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
  $("workspace-dialog-title").textContent = mode === "create" ? t("workspace.create") : t("workspace.rename");
  nameInput.value = mode === "rename" ? (current?.name || "") : "";
  dialog.showModal();
  nameInput.focus();
}

$("workspace-select").addEventListener("change", () => {
  activeWorkspaceId = $("workspace-select").value;
  saveWorkspaces();
  renderWatchlist();
  renderAlerts();
  void renderPortfolio();
  checkPriceAlerts();
  document.querySelector(".workspace-more").open = false;
  toast((currentLanguage === "en" ? "Workspace changed to " : "เปลี่ยนเป็น Workspace: ") + (workspaces.find(item => item.id === activeWorkspaceId)?.name || ""));
});
$("workspace-add").addEventListener("click", () => {
  if (workspaces.length >= 8) return toast(currentLanguage === "en" ? "You can create up to 8 workspaces" : "สร้าง Workspace ได้สูงสุด 8 รายการ");
  openWorkspaceDialog("create");
});
$("workspace-rename").addEventListener("click", () => {
  document.querySelector(".workspace-more").open = false;
  openWorkspaceDialog("rename");
});
$("workspace-delete").addEventListener("click", () => {
  document.querySelector(".workspace-more").open = false;
  if (workspaces.length <= 1) return toast(currentLanguage === "en" ? "Keep at least one workspace" : "ต้องเหลือ Workspace อย่างน้อย 1 รายการ");
  const current = workspaces.find(item => item.id === activeWorkspaceId);
  const confirmDelete = currentLanguage === "en"
    ? "Delete workspace “" + current?.name + "” and its watchlist, alerts, and portfolio?"
    : "ลบ Workspace “" + current?.name + "” และรายการติดตาม/แจ้งเตือน/พอร์ตของ Workspace นี้หรือไม่?";
  if (!current || !window.confirm(confirmDelete)) return;
  try {
    localStorage.removeItem(scopedStorageKey("stocklens-watchlist", current.id));
    localStorage.removeItem(scopedStorageKey("stocklens-alerts", current.id));
    localStorage.removeItem(scopedStorageKey("stocklens-portfolio", current.id));
  } catch {}
  workspaces = workspaces.filter(item => item.id !== current.id);
  activeWorkspaceId = workspaces[0].id;
  saveWorkspaces();
  renderWorkspaceControls();
  renderWatchlist();
  renderAlerts();
  void renderPortfolio();
  toast(currentLanguage === "en" ? "Workspace deleted" : "ลบ Workspace แล้ว");
});
$("workspace-form").addEventListener("submit", event => {
  event.preventDefault();
  const name = $("workspace-name").value.trim();
  if (!name) return toast(currentLanguage === "en" ? "Enter a workspace name" : "กรุณาตั้งชื่อ Workspace");
  if (workspaces.some(item => item.name.toLocaleLowerCase() === name.toLocaleLowerCase() && (workspaceDialogMode === "create" || item.id !== activeWorkspaceId))) {
    return toast(currentLanguage === "en" ? "That workspace name is already in use" : "มี Workspace ชื่อนี้แล้ว");
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
  void renderPortfolio();
  $("workspace-dialog").close();
  toast(workspaceDialogMode === "create"
    ? (currentLanguage === "en" ? `Workspace “${name}” created` : `สร้าง Workspace “${name}” แล้ว`)
    : (currentLanguage === "en" ? "Workspace renamed" : "เปลี่ยนชื่อ Workspace แล้ว"));
});
$("workspace-cancel").addEventListener("click", () => $("workspace-dialog").close());
document.addEventListener("click", event => {
  if (!event.target.closest(".workspace-more")) document.querySelector(".workspace-more").open = false;
});

const pageAliases = { "market-pulse":"dashboard", research:"stocks", fundamentals:"stocks", "history-chart":"stocks" };
function navigateToPage(requestedPage, { updateHash = true, scroll = true } = {}) {
  const page = pageAliases[requestedPage] || requestedPage;
  if (!pageTitleKeys[page]) return navigateToPage("dashboard", { updateHash, scroll });
  activePage = page;
  document.querySelectorAll("[data-page-view]").forEach(view => {
    const active = view.dataset.pageView === page;
    view.classList.toggle("active", active);
    view.setAttribute("aria-hidden", active ? "false" : "true");
  });
  document.querySelectorAll("[data-page-target]").forEach(link => {
    const active = link.dataset.pageTarget === page;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  $("page-title").textContent = t(pageTitleKeys[page]);
  if (updateHash && location.hash !== `#${page}`) history.pushState({}, "", `#${page}`);
  if (page === "portfolio") void renderPortfolio();
  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
  if (page === "stocks" && scroll) setTimeout(() => input.focus({ preventScroll: true }), 250);
}
document.addEventListener("click", event => {
  const link = event.target.closest("a[data-page-target]");
  if (!link) return;
  event.preventDefault();
  navigateToPage(link.dataset.pageTarget);
});
window.addEventListener("hashchange", () => navigateToPage(location.hash.slice(1), { updateHash: false, scroll: false }));
window.addEventListener("popstate", () => navigateToPage(location.hash.slice(1), { updateHash: false, scroll: false }));

function renderWatchlist() {
  const host = $("watchlist"); const items = readStore("stocklens-watchlist"); host.replaceChildren();
  if (!items.length) { const empty = document.createElement("p"); empty.className = "empty-state"; empty.textContent = t("watch.empty"); host.append(empty); return; }
  items.forEach(symbol => {
    const row = document.createElement("div"); row.className = "watch-row";
    const open = document.createElement("button"); open.className = "watch-open"; open.textContent = symbol; open.addEventListener("click", () => loadStock(symbol));
    const remove = document.createElement("button"); remove.className = "remove-button"; remove.textContent = t("common.delete"); remove.setAttribute("aria-label", `${t("common.delete")} ${symbol}`); remove.addEventListener("click", () => { writeStore("stocklens-watchlist", items.filter(x => x !== symbol)); renderWatchlist(); });
    row.append(open, remove); host.append(row);
  });
}
$("watch-add")?.addEventListener("click", () => {
  const symbol = safeSymbol($("watch-input").value);
  if (!/^[A-Z0-9.^-]{1,20}$/.test(symbol)) return toast(t("common.invalidSymbol"));
  const items = readStore("stocklens-watchlist");
  if (items.includes(symbol)) return toast(t("watch.exists"));
  if (items.length >= 12) return toast(t("watch.limit"));
  writeStore("stocklens-watchlist", [...items, symbol]); $("watch-input").value = ""; renderWatchlist(); toast(`${symbol} · ${t("watch.added")}`);
});

function renderAlerts() {
  const host = $("alerts-list"); const items = readStore("stocklens-alerts"); host.replaceChildren();
  if (!items.length) { const empty = document.createElement("p"); empty.className = "empty-state"; empty.textContent = t("alerts.empty"); host.append(empty); return; }
  items.forEach((item, index) => {
    const row = document.createElement("div"); row.className = "alert-row";
    const text = document.createElement("span"); text.textContent = `${item.symbol} ${item.direction === "above" ? "≥" : "≤"} ${item.target} · ${item.triggered ? t("alerts.hit") : t("alerts.waiting")}`;
    const remove = document.createElement("button"); remove.className = "remove-button"; remove.textContent = t("common.delete"); remove.addEventListener("click", () => { const updated = readStore("stocklens-alerts"); updated.splice(index, 1); writeStore("stocklens-alerts", updated); renderAlerts(); });
    row.append(text, remove); host.append(row);
  });
}
$("alert-add")?.addEventListener("click", () => {
  const symbol = safeSymbol($("alert-symbol").value); const target = Number($("alert-price").value); const direction = $("alert-direction").value;
  if (!/^[A-Z0-9.^-]{1,20}$/.test(symbol) || !Number.isFinite(target) || target <= 0) return toast(t("alerts.invalid"));
  const items = readStore("stocklens-alerts");
  if (items.length >= 10) return toast(t("alerts.limit"));
  items.push({ symbol, target, direction, triggered: false }); writeStore("stocklens-alerts", items); renderAlerts(); toast(t("alerts.saved"));
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
      if (hit) { item.triggered = true; changed = true; toast(currentLanguage === "en" ? `${item.symbol} reached ${fmt(q.price)}` : `แจ้งเตือน ${item.symbol}: ราคาถึง ${fmt(q.price)} แล้ว`); }
    } catch { /* API may be unavailable or rate-limited; retry on next page visit. */ }
  }
  if (changed && workspaceId === activeWorkspaceId) { writeStore("stocklens-alerts", items); renderAlerts(); }
}

let portfolioRenderId = 0;
function emptyTableRow(message) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = 8; cell.className = "empty-state"; cell.textContent = message;
  row.append(cell); return row;
}
function groupedMoney(groups) {
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([currency, value]) => `${money(value, currency)} ${currency}`)
    .join(" · ") || t("common.noData");
}
function groupedPercent(groups) {
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([currency, value]) => `${value.cost > 0 ? fmt(value.pl / value.cost * 100, "%") : t("common.noData")} ${currency}`)
    .join(" · ") || "—";
}
async function renderPortfolio() {
  const renderId = ++portfolioRenderId;
  const workspaceId = activeWorkspaceId;
  const positions = readStore("stocklens-portfolio");
  const tbody = $("portfolio-rows");
  const costGroups = new Map();
  const valueGroups = new Map();
  const profitGroups = new Map();
  const addToGroup = (map, currency, amount) => map.set(currency, (map.get(currency) || 0) + amount);
  for (const item of positions) addToGroup(costGroups, item.currency || "USD", Number(item.buyPrice) * Number(item.quantity));
  $("portfolio-cost").textContent = groupedMoney(costGroups);
  $("portfolio-count").textContent = `${positions.length} ${t("portfolio.positionsCount")}`;
  $("portfolio-value").textContent = positions.length ? t("portfolio.loading") : t("common.noData");
  $("portfolio-profit").textContent = positions.length ? t("portfolio.loading") : t("common.noData");
  $("portfolio-profit-percent").textContent = "—";
  $("portfolio-updated").textContent = "";
  if (!positions.length) {
    tbody.replaceChildren(emptyTableRow(t("portfolio.empty")));
    return;
  }
  tbody.replaceChildren(emptyTableRow(t("portfolio.loading")));

  const symbols = [...new Set(positions.map(item => item.symbol))];
  const quotes = new Map();
  let cursor = 0;
  const workers = Array.from({ length: Math.min(4, symbols.length) }, async () => {
    while (cursor < symbols.length) {
      const symbol = symbols[cursor++];
      try { quotes.set(symbol, await api(`/api/quote/${encodeURIComponent(symbol)}`)); }
      catch { quotes.set(symbol, null); }
    }
  });
  await Promise.all(workers);
  if (renderId !== portfolioRenderId || workspaceId !== activeWorkspaceId) return;

  tbody.replaceChildren();
  for (const item of positions) {
    const quote = quotes.get(item.symbol);
    const currency = item.currency || "USD";
    const quantity = Number(item.quantity);
    const buyPrice = Number(item.buyPrice);
    const row = document.createElement("tr");
    const symbolCell = document.createElement("td");
    const open = document.createElement("button");
    open.type = "button"; open.className = "portfolio-symbol"; open.textContent = item.symbol;
    open.dataset.openSymbol = item.symbol; open.title = t("portfolio.openStock");
    symbolCell.append(open);
    const date = document.createElement("td");
    const parsedDate = new Date(`${item.buyDate}T12:00:00Z`);
    date.textContent = Number.isNaN(parsedDate.getTime()) ? item.buyDate : parsedDate.toLocaleDateString(currentLanguage === "en" ? "en-US" : "th-TH", { timeZone: "UTC", year: "numeric", month: "short", day: "numeric" });
    const shares = document.createElement("td"); shares.textContent = fmt(quantity, "", 6);
    const cost = document.createElement("td"); cost.textContent = `${money(buyPrice, currency)} ${currency}`;
    const current = document.createElement("td"); current.textContent = quote ? `${money(quote.price, currency)} ${currency}` : t("portfolio.failed");
    const today = document.createElement("td");
    const profit = document.createElement("td");
    if (quote && Number.isFinite(Number(quote.price))) {
      const todayValue = Number(quote.change) * quantity;
      const profitValue = (Number(quote.price) - buyPrice) * quantity;
      today.textContent = Number.isFinite(todayValue) ? `${todayValue > 0 ? "+" : ""}${money(todayValue, currency)} ${currency}` : "—";
      profit.textContent = `${profitValue > 0 ? "+" : ""}${money(profitValue, currency)} ${currency}`;
      if (Number.isFinite(todayValue)) today.className = todayValue >= 0 ? "positive" : "negative";
      profit.className = profitValue >= 0 ? "positive" : "negative";
      addToGroup(valueGroups, currency, Number(quote.price) * quantity);
      const bucket = profitGroups.get(currency) || { pl: 0, cost: 0 };
      bucket.pl += profitValue; bucket.cost += buyPrice * quantity; profitGroups.set(currency, bucket);
    } else {
      today.textContent = "—"; profit.textContent = "—";
    }
    const actions = document.createElement("td");
    const remove = document.createElement("button");
    remove.type = "button"; remove.className = "remove-button"; remove.textContent = t("portfolio.remove"); remove.dataset.deletePosition = item.id;
    actions.append(remove);
    row.append(symbolCell, date, shares, cost, current, today, profit, actions);
    tbody.append(row);
  }
  $("portfolio-value").textContent = groupedMoney(valueGroups);
  $("portfolio-profit").textContent = groupedMoney(new Map([...profitGroups].map(([currency, value]) => [currency, value.pl])));
  $("portfolio-profit").classList.toggle("negative", [...profitGroups.values()].some(value => value.pl < 0));
  $("portfolio-profit").classList.toggle("positive", [...profitGroups.values()].some(value => value.pl >= 0));
  $("portfolio-profit-percent").textContent = groupedPercent(profitGroups);
  $("portfolio-updated").textContent = `${t("portfolio.updateTime")} ${new Date().toLocaleTimeString(currentLanguage === "en" ? "en-US" : "th-TH", { hour: "2-digit", minute: "2-digit" })}`;
}
$("portfolio-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const symbol = safeSymbol($("portfolio-symbol").value);
  const buyPrice = Number($("portfolio-buy-price").value);
  const quantity = Number($("portfolio-quantity").value);
  const currency = $("portfolio-currency").value;
  const buyDate = $("portfolio-buy-date").value;
  const todayText = localDateValue();
  if (!/^[A-Z0-9.^-]{1,20}$/.test(symbol) || !Number.isFinite(buyPrice) || buyPrice <= 0 || !Number.isFinite(quantity) || quantity <= 0 || !buyDate || buyDate > todayText) return toast(t("portfolio.invalid"));
  const positions = readStore("stocklens-portfolio");
  if (positions.length >= 30) return toast(t("portfolio.limit"));
  const id = globalThis.crypto?.randomUUID?.() || `holding-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  writeStore("stocklens-portfolio", [...positions, { id, symbol, buyPrice, quantity, currency, buyDate }]);
  $("portfolio-form").reset();
  $("portfolio-buy-date").value = todayText;
  renderPortfolio();
  toast(t("portfolio.added"));
});
$("portfolio-refresh")?.addEventListener("click", () => void renderPortfolio());
$("portfolio-symbol")?.addEventListener("change", event => {
  const symbol = safeSymbol(event.target.value);
  const suggested = symbol.endsWith(".BK") ? "THB" : symbol === activeSymbol ? activeCurrency : "USD";
  if ([...$("portfolio-currency").options].some(option => option.value === suggested)) $("portfolio-currency").value = suggested;
});
$("portfolio-add-selected")?.addEventListener("click", () => {
  if (!activeSymbol) return toast(t("common.searchFirst"));
  navigateToPage("portfolio");
  $("portfolio-symbol").value = activeSymbol;
  if ([...$("portfolio-currency").options].some(option => option.value === activeCurrency)) $("portfolio-currency").value = activeCurrency;
  $("portfolio-buy-date").value ||= localDateValue();
  setTimeout(() => $("portfolio-buy-price").focus(), 250);
});
$("portfolio-rows")?.addEventListener("click", event => {
  const open = event.target.closest("[data-open-symbol]");
  if (open) return void loadStock(open.dataset.openSymbol);
  const remove = event.target.closest("[data-delete-position]");
  if (!remove || !window.confirm(t("portfolio.confirmDelete"))) return;
  const positions = readStore("stocklens-portfolio").filter(item => item.id !== remove.dataset.deletePosition);
  writeStore("stocklens-portfolio", positions);
  void renderPortfolio();
});

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
  svg.setAttribute("aria-label", currentLanguage === "en" ? `Daily closing price line chart for ${activeSymbol}` : `กราฟเส้นราคาปิด ${activeSymbol}`);

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

  const dateLabel = timestamp => new Date(Number(timestamp)).toLocaleDateString(currentLanguage === "en" ? "en-US" : "th-TH", { day: "numeric", month: "short", timeZone: "Asia/Bangkok" });
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
  stats.textContent = currentLanguage === "en"
    ? `${activeSymbol} · ${rows.length} trading days · Latest ${fmt(last)} · Change ${change >= 0 ? "+" : ""}${change.toFixed(2)}%`
    : `${activeSymbol} · ${rows.length} วันซื้อขาย · ล่าสุด ${fmt(last)} · เปลี่ยนแปลง ${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
  host.append(stats);
  $("export-csv").disabled = false;
}
async function loadChart() {
  if (!activeSymbol) return toast(t("common.searchFirst"));
  const requestId = ++chartRequestId;
  const symbol = activeSymbol;
  const host = $("price-chart");
  const loadButton = $("chart-load");
  host.textContent = t("common.loading");
  const days = Number($("chart-range").value);
  $("export-csv").disabled = true;
  loadButton.disabled = true;
  try {
    const data = days === 365 ? await getYearData(symbol) : await api(`/api/candles/${encodeURIComponent(symbol)}?days=${encodeURIComponent(days)}`);
    if (requestId !== chartRequestId || symbol !== activeSymbol) return;
    $("chart-caption").textContent = `${symbol} · ${currentLanguage === "en" ? "Daily close from" : "ราคาปิดรายวันจาก"} ${data.source || (currentLanguage === "en" ? "market data provider" : "แหล่งข้อมูลตลาด")}`;
    renderChart(data.candles || []);
  } catch (error) {
    if (requestId !== chartRequestId || symbol !== activeSymbol) return;
    host.replaceChildren();
    const message = document.createElement("div");
    message.className = "chart-placeholder";
    message.textContent = error.message || (currentLanguage === "en" ? "Could not load chart. Try again later." : "โหลดกราฟไม่สำเร็จ ลองอีกครั้งภายหลัง");
    host.append(message);
  } finally {
    if (requestId === chartRequestId) loadButton.disabled = false;
  }
}

function getYearData(symbol) {
  const cached = yearDataRequests.get(symbol);
  if (cached && Date.now() - cached.savedAt < 60_000) return cached.promise;
  const promise = api(`/api/candles/${encodeURIComponent(symbol)}?days=365`).catch(error => {
    yearDataRequests.delete(symbol);
    throw error;
  });
  yearDataRequests.set(symbol, { savedAt: Date.now(), promise });
  return promise;
}
function updateYtdChange() {
  const element = $("ytd-change");
  const details = $("ytd-change-detail");
  const candles = [...latestYearCandles].filter(item => Number.isFinite(Number(item.time)) && Number.isFinite(Number(item.close))).sort((a, b) => Number(a.time) - Number(b.time));
  const thisYear = new Date().getFullYear();
  const priorYearCandles = candles.filter(item => new Date(Number(item.time)).getFullYear() < thisYear);
  const currentYearCandles = candles.filter(item => new Date(Number(item.time)).getFullYear() === thisYear);
  const base = priorYearCandles.length ? priorYearCandles[priorYearCandles.length - 1] : currentYearCandles[0];
  const currentPrice = Number(latestQuote?.price) > 0 ? Number(latestQuote.price) : Number(candles[candles.length - 1]?.close);
  const basePrice = Number(base?.close);
  if (!Number.isFinite(currentPrice) || !Number.isFinite(basePrice) || basePrice <= 0) {
    element.textContent = t("common.noData");
    details.textContent = currentLanguage === "en" ? "Year-to-date history is unavailable" : "ไม่มีข้อมูลราคาต้นปีเพียงพอ";
    element.classList.remove("positive", "negative");
    return;
  }
  const delta = currentPrice - basePrice;
  const percent = delta / basePrice * 100;
  element.textContent = `${delta > 0 ? "+" : ""}${money(delta, activeCurrency)} (${percent > 0 ? "+" : ""}${fmt(percent, "%")})`;
  element.classList.toggle("positive", delta >= 0);
  element.classList.toggle("negative", delta < 0);
  details.textContent = `${currentLanguage === "en" ? "From" : "เทียบกับ"} ${money(basePrice, activeCurrency)} · ${currentLanguage === "en" ? "year end / first available close" : "ราคาปิดสิ้นปีก่อน / วันแรกที่มีข้อมูล"}`;
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
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"}));const a=document.createElement("a");a.href=url;a.download=`${activeSymbol}-history.csv`;document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);toast(currentLanguage === "en" ? "CSV exported" : "ส่งออก CSV แล้ว");
});

function applyTheme(light, persist = false) {
  document.documentElement.classList.toggle("light-theme", light);
  if ($("setting-theme")) $("setting-theme").value = light ? "light" : "dark";
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = light ? "#f1f6f5" : "#0b1118";
  if (persist) { try { localStorage.setItem("stocklens-theme", light ? "light" : "dark"); } catch {} }
}
let savedLightTheme = false;
try { savedLightTheme = localStorage.getItem("stocklens-theme") === "light"; } catch {}
applyTheme(savedLightTheme);
$("setting-theme")?.addEventListener("change", event => applyTheme(event.target.value === "light", true));
$("setting-language")?.addEventListener("change", event => {
  applyLanguage(event.target.value);
  renderWatchlist(); renderAlerts(); void renderPortfolio(); renderProfile();
  if (activeSymbol) void loadStock(activeSymbol, { preservePage: true });
  void loadMarketPulse();
  renderMarketNews(cachedMarketNews);
  renderIntegrationStatus(cachedIntegrationStatus);
});

function readProfile() {
  try {
    const profile = JSON.parse(localStorage.getItem("stocklens-profile") || "null");
    return profile && typeof profile === "object" ? profile : { name: "", email: "" };
  } catch { return { name: "", email: "" }; }
}
function renderProfile() {
  const profile = readProfile();
  const name = profile.name?.trim() || t("profile.defaultName");
  const email = profile.email?.trim() || t("profile.localProfile");
  $("profile-name").value = profile.name || "";
  $("profile-email").value = profile.email || "";
  $("profile-preview-name").textContent = name;
  $("profile-preview-email").textContent = email;
  $("profile-name-small").textContent = name;
  const initials = name.slice(0, 1).toLocaleUpperCase(currentLanguage === "en" ? "en-US" : "th-TH") || "U";
  $("profile-avatar-large").textContent = initials;
  $("profile-avatar-small").textContent = initials;
  for (const id of ["profile-preview-name", "profile-name-small"]) {
    if (profile.name?.trim()) $(id).dataset.dynamic = "true";
    else delete $(id).dataset.dynamic;
  }
  if (profile.email?.trim()) $("profile-preview-email").dataset.dynamic = "true";
  else delete $("profile-preview-email").dataset.dynamic;
}
$("profile-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const profile = { name: $("profile-name").value.trim().slice(0, 40), email: $("profile-email").value.trim().slice(0, 100) };
  try { localStorage.setItem("stocklens-profile", JSON.stringify(profile)); }
  catch { return toast(currentLanguage === "en" ? "This browser could not save the profile" : "เบราว์เซอร์ไม่อนุญาตให้บันทึกโปรไฟล์"); }
  renderProfile(); toast(t("profile.saved"));
});

function formatPulseDate(value) {
  if (!value) return t("pulse.noRun");
  const dateText = String(value).slice(0, 10);
  const date = new Date(dateText + "T12:00:00Z");
  return Number.isNaN(date.getTime()) ? dateText : date.toLocaleDateString(currentLanguage === "en" ? "en-US" : "th-TH", { dateStyle: "long", timeZone: "Asia/Bangkok" });
}

async function loadMarketPulse(options = {}) {
  const isRefresh = options.refresh === true;
  const button = $("pulse-refresh");
  const summary = $("pulse-summary");
  const snapshots = $("pulse-snapshots");
  const status = $("pulse-status");
  button.disabled = true;
  if (isRefresh) {
    status.className = "pulse-status pending";
    status.textContent = t("pulse.refreshing");
    status.dataset.dynamic = "true";
  }
  try {
    const data = await api(isRefresh ? "/api/market-pulse/refresh" : "/api/market-pulse", isRefresh ? { method: "POST" } : {});
    const run = data.lastRun;
    status.className = "pulse-status " + (run?.status === "succeeded" ? "success" : run?.status === "failed" ? "failed" : "pending");
    status.textContent = run?.status === "succeeded"
      ? (run.details?.trigger === "manual" ? t("pulse.manualDone") : t("pulse.cronDone"))
      : run?.status === "failed" ? t("pulse.runFailed") : t("pulse.noRun");

    if (!data.available || !data.brief) {
      $("pulse-date").textContent = data.snapshotDate
        ? t("pulse.pricesFor") + " " + formatPulseDate(data.snapshotDate)
        : t("pulse.noBrief");
      summary.textContent = run?.status === "failed"
        ? t("pulse.runFailed") + ": " + (run.error || t("pulse.checkServices"))
        : t("pulse.refreshPrompt");
    } else {
      $("pulse-date").textContent = t("pulse.pricesFor") + " " + formatPulseDate(data.brief.as_of_date);
      summary.textContent = data.brief.summary;
    }

    snapshots.replaceChildren();
    const en = currentLanguage === "en";
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
      detail.textContent = (en ? "Change " : "เปลี่ยน ") + fmt(item.change, "", 2) + (en ? " · High " : " · สูง ") + fmt(item.day_high, "", 2) + (en ? " · Low " : " · ต่ำ ") + fmt(item.day_low, "", 2);
      card.append(heading, price, detail);
      snapshots.append(card);
    }
    if (!snapshots.childElementCount) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = t("pulse.noPrices");
      snapshots.append(empty);
    }
    for (const id of ["pulse-date", "pulse-status", "pulse-summary"]) $(id).dataset.dynamic = "true";
  } catch (error) {
    $("pulse-date").textContent = t("pulse.errorTitle");
    status.className = "pulse-status failed";
    status.textContent = error.message || t("pulse.errorTitle");
    summary.textContent = t("pulse.checkServices");
    snapshots.replaceChildren();
    for (const id of ["pulse-date", "pulse-status", "pulse-summary"]) $(id).dataset.dynamic = "true";
  } finally {
    button.disabled = false;
  }
}

$("pulse-refresh")?.addEventListener("click", () => loadMarketPulse({ refresh: true }));
loadMarketPulse();

function formatNewsTime(timestamp) {
  const date = new Date(Number(timestamp) * 1000);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleString(currentLanguage === "en" ? "en-US" : "th-TH", {
    timeZone: "Asia/Bangkok", dateStyle: "medium", timeStyle: "short"
  });
}

let cachedMarketNews = null;
function renderMarketNews(data) {
  const host = $("news-list");
  if (!host) return;
  host.replaceChildren();
  if (data?.error) {
    const message = document.createElement("div");
    message.className = "news-empty error";
    message.textContent = data.error;
    host.append(message);
    return;
  }
  if (!data?.articles?.length) {
    const empty = document.createElement("div");
    empty.className = "news-empty";
    empty.textContent = data ? t("news.empty") : t("news.loading");
    host.append(empty);
    return;
  }
  const impactText = { high: "news.highImpact", watch: "news.companyImpact", normal: "news.marketWatch" };
  for (const item of data.articles) {
    const card = document.createElement("article");
    card.className = "news-item " + item.impact;
    const heading = document.createElement("div");
    heading.className = "news-item-heading";
    const badge = document.createElement("span");
    badge.className = "news-impact " + item.impact;
    badge.textContent = t(impactText[item.impact] || impactText.normal);
    heading.append(badge);
    for (const topic of item.topics || []) {
      const tag = document.createElement("span");
      tag.className = "news-topic";
      tag.textContent = t("news.topic." + topic);
      heading.append(tag);
    }
    const link = document.createElement("a");
    link.className = "news-title";
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = item.headline;
    card.append(heading, link);
    if (item.summary) {
      const description = document.createElement("p");
      description.textContent = item.summary;
      card.append(description);
    }
    const meta = document.createElement("div");
    meta.className = "news-meta-line";
    const source = document.createElement("span");
    source.textContent = item.source;
    meta.append(source);
    const timestamp = Number(item.datetime);
    if (Number.isFinite(timestamp) && timestamp > 0) {
      const time = document.createElement("time");
      time.dateTime = new Date(timestamp * 1000).toISOString();
      time.textContent = formatNewsTime(timestamp);
      meta.append(time);
    }
    card.append(meta);
    host.append(card);
  }
}

async function loadMarketNews() {
  const button = $("news-refresh");
  if (!button) return;
  button.disabled = true;
  try {
    cachedMarketNews = await api("/api/news");
    renderMarketNews(cachedMarketNews);
  } catch (error) {
    cachedMarketNews = { error: error.message || t("news.error") };
    renderMarketNews(cachedMarketNews);
  } finally {
    button.disabled = false;
  }
}

$("news-refresh")?.addEventListener("click", loadMarketNews);
loadMarketNews();

let cachedIntegrationStatus = null;
function renderIntegrationStatus(data) {
  if (!data) return;
  if (data.error) {
    $("integration-title").textContent = t("settings.statusUnavailable");
    $("integration-dot").classList.add("offline");
    for (const id of ["service-finnhub", "service-gemini", "service-neon"]) {
      $(id).className = "service-chip offline";
      $(id).textContent = $(id).id.replace("service-", "") + " · " + t("settings.statusUnavailable");
    }
    return;
  }
  const integrations = data.integrations || {};
  const services = [
    { id: "service-finnhub", name: "Finnhub", ready: integrations.finnhub, label: integrations.finnhub ? "settings.configured" : "settings.missingKey" },
    { id: "service-gemini", name: "Gemini", ready: integrations.gemini, label: integrations.gemini ? "settings.configured" : "settings.missingKey" },
    { id: "service-neon", name: "Neon", ready: integrations.neon === "connected", label: integrations.neon === "connected" ? "settings.connected" : integrations.neon === "not_configured" ? "settings.missingUrl" : "settings.unavailable" }
  ];
  services.forEach(service => {
    const chip = $(service.id);
    chip.className = "service-chip " + (service.ready ? "ready" : "offline");
    chip.textContent = service.name + " · " + t(service.label);
  });
  const ready = services.every(service => service.ready);
  $("integration-title").textContent = ready ? t("settings.allReady") : t("settings.needsSetup");
  $("integration-dot").classList.toggle("offline", !ready);
}

async function loadIntegrationStatus() {
  try {
    cachedIntegrationStatus = await api("/api/health");
  } catch {
    cachedIntegrationStatus = { error: true };
  }
  renderIntegrationStatus(cachedIntegrationStatus);
}
loadIntegrationStatus();

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

applyLanguage(currentLanguage, false);
applyTheme(savedLightTheme, false);
renderProfile();
renderWorkspaceControls();
renderWatchlist();
renderAlerts();
$("portfolio-buy-date").value ||= localDateValue();
navigateToPage(location.hash.slice(1) || "dashboard", { updateHash: false, scroll: false });
