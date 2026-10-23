const I18N = {
  th: {
    "nav.workspace":"WORKSPACE","workspace.select":"เลือก Workspace","workspace.rename":"เปลี่ยนชื่อ","workspace.create":"เพิ่ม Workspace","workspace.name":"ชื่อ Workspace","workspace.namePlaceholder":"เช่น หุ้นระยะยาว","workspace.delete":"ลบ Workspace","workspace.personal":"ส่วนตัว",
    "nav.section":"เมนูหลัก","nav.dashboard":"ภาพรวมตลาด","nav.stocks":"หุ้น / วิเคราะห์","nav.portfolio":"พอร์ตหุ้น","nav.watchlist":"รายการติดตาม","nav.alerts":"แจ้งเตือนราคา","nav.copilot":"Stock Co-Pilot","nav.profile":"โปรไฟล์","nav.settings":"ตั้งค่า","nav.dataNote":"ข้อมูลขึ้นอยู่กับสิทธิ์ API และตลาด",
    "topbar.eyebrow":"EQUITY RESEARCH PLATFORM","topbar.connected":"เชื่อมต่อบริการ","page.dashboard":"ภาพรวมตลาด","page.stocks":"หุ้น / วิเคราะห์","page.portfolio":"พอร์ตหุ้น","page.watchlist":"รายการติดตาม","page.alerts":"แจ้งเตือนราคา","page.copilot":"Stock Co-Pilot","page.profile":"โปรไฟล์","page.settings":"ตั้งค่า",
    "profile.defaultName":"โปรไฟล์","dashboard.eyebrow":"RESEARCH WITH CONTEXT","dashboard.heroFirst":"เข้าใจธุรกิจ","dashboard.heroSecond":"ก่อนตัดสินใจลงทุน","dashboard.heroDescription":"ดูภาพรวมตลาด ติดตามหุ้น และตรวจผลการลงทุนจากข้อมูลในที่เดียว","dashboard.explore":"เริ่มวิเคราะห์หุ้น",
    "pulse.title":"ภาพรวมตลาดประจำวัน","pulse.description":"ราคาและการเปลี่ยนแปลงของหุ้นกับ ETF ที่ติดตาม","pulse.refresh":"อัปเดตตลาด","pulse.loadingDate":"กำลังโหลด…","pulse.connecting":"กำลังโหลดตลาด","pulse.loading":"กำลังโหลดสรุปตลาดล่าสุด","pulse.loadingPrices":"กำลังโหลดข้อมูลราคา…","pulse.refreshing":"กำลังอัปเดตราคาและสรุปตลาด","pulse.manualDone":"อัปเดตแล้ว","pulse.cronDone":"ข้อมูลจากรอบล่าสุด","pulse.runFailed":"อัปเดตไม่สำเร็จ","pulse.noRun":"ยังไม่มีรอบอัปเดต","pulse.pricesFor":"ข้อมูลวันที่","pulse.noBrief":"ยังไม่มีข้อมูลตลาด","pulse.refreshPrompt":"กดอัปเดตตลาดเพื่อดึงราคาและสร้างสรุป","pulse.noPrices":"ยังไม่มีราคาให้แสดง","pulse.errorTitle":"โหลดภาพรวมตลาดไม่ได้","pulse.checkServices":"ตรวจ Finnhub และการเชื่อมต่อ Neon แล้วลองอีกครั้ง",
    "news.title":"ข่าวที่มีผลต่อตลาด","news.refresh":"อัปเดตข่าว","news.loading":"กำลังโหลดข่าวตลาด…","news.empty":"ยังไม่มีข่าวสำคัญในช่วงนี้","news.error":"โหลดข่าวตลาดไม่ได้","news.highImpact":"ประเด็นมหภาค","news.companyImpact":"ข่าวบริษัท","news.marketWatch":"ติดตามตลาด","news.topic.rates":"ดอกเบี้ย","news.topic.inflation":"เงินเฟ้อ","news.topic.economy":"เศรษฐกิจ","news.topic.trade":"การค้า/นโยบาย","news.topic.energy":"พลังงาน/ภูมิรัฐศาสตร์","news.topic.company":"บริษัท",
    "movers.title":"กลุ่มมาแรงวันนี้","movers.description":"จัดอันดับ ETF และดัชนีตามการเปลี่ยนแปลงของวันนี้","movers.refresh":"อัปเดต","movers.gainers":"บวกมากสุด","movers.losers":"ลบมากสุด","movers.loading":"กำลังโหลดกลุ่มตลาด…","movers.error":"โหลดข้อมูลกลุ่มตลาดไม่ได้","movers.emptyGainers":"ยังไม่พบกลุ่มที่ปรับขึ้นในข้อมูลล่าสุด","movers.emptyLosers":"ยังไม่พบกลุ่มที่ปรับลงในข้อมูลล่าสุด","movers.updated":"อัปเดตข้อมูล","movers.up":"ขึ้น","movers.down":"ลง",

    "pulse.symbolsTitle":"หุ้นที่แสดงในภาพรวม","pulse.symbolsDescription":"รายการนี้บันทึกแยกตาม Workspace บนอุปกรณ์นี้","pulse.symbolsPlaceholder":"Ticker เช่น AAPL","pulse.addSymbol":"เพิ่มหุ้น","pulse.removeSymbol":"เอาออกจากภาพรวม","pulse.invalidSymbol":"กรอก Ticker ให้ถูกต้อง","pulse.existsSymbol":"Ticker นี้อยู่ในรายการแล้ว","pulse.symbolLimit":"เลือกได้สูงสุด 12 Ticker","pulse.noSymbols":"ยังไม่มีหุ้นในรายการ เพิ่ม Ticker เพื่อเริ่มติดตาม","pulse.loadingQuotes":"กำลังโหลดราคาหุ้นที่เลือก…","pulse.quoteUnavailable":"ดึงราคาไม่สำเร็จ",
    "stocks.eyebrow":"STOCK RESEARCH","stocks.title":"ค้นหาและวิเคราะห์หุ้น","stocks.description":"เลือกราคา ดูผลต่างวันนี้และตั้งแต่ต้นปี พร้อมกราฟย้อนหลังของหุ้นตัวเดียวกัน","stocks.searchPlaceholder":"ค้นหา Ticker เช่น AAPL, MSFT","stocks.search":"ค้นหา","stocks.popular":"หุ้นยอดนิยม","stocks.company":"COMPANY OVERVIEW","stock.valuationHeading":"ตัวชี้วัดพื้นฐาน","stock.priceSummary":"สรุปราคาหุ้น","stock.researchLabel":"RESEARCH NOTES","stock.metricsLabel":"KEY METRICS",
    "stock.lastPrice":"ราคาล่าสุด","stock.today":"เปลี่ยนแปลงวันนี้","stock.ytd":"เปลี่ยนแปลงปีนี้ (YTD)","stock.todayHint":"เทียบราคาปิดวันก่อน","stock.ytdHint":"เทียบราคาปิดสิ้นปีก่อน","stock.marketCap":"มูลค่าตลาด","stock.marketCapHint":"หน่วยตามแหล่งข้อมูล","stock.peHint":"ราคาต่อกำไร","stock.roeHint":"ผลตอบแทนต่อส่วนผู้ถือหุ้น","stock.metricsTitle":"ตัวชี้วัดทางการเงิน","stock.netMargin":"อัตรากำไรสุทธิ","stock.revenueGrowth":"การเติบโตรายได้ YoY","stock.dividend":"อัตราผลตอบแทนเงินปันผล","stock.metricsFootnote":"ข้อมูลบางรายการขึ้นอยู่กับแพ็กเกจ API และอาจไม่มีสำหรับทุกบริษัท","stock.analysisTitle":"ข้อสังเกตเบื้องต้น","stock.analysisEmpty":"เลือกหุ้นเพื่อดูข้อสังเกตจากตัวชี้วัด","stock.analysisNote":"ไม่ใช่คำแนะนำการลงทุน","stock.dataNote":"ข้อมูลขึ้นอยู่กับสิทธิ์และความพร้อมใช้งานของผู้ให้บริการ",
    "stage.title":"Stan Weinstein Stage Analysis","stage.description":"ประเมินจากกราฟรายสัปดาห์ เส้น SMA 30 สัปดาห์ และความแข็งแกร่งเทียบ SPY","stage.loading":"กำลังคำนวณ Stage จากข้อมูลรายสัปดาห์…","stage.unavailable":"ยังคำนวณ Stage ไม่ได้","stage.insufficient":"ประวัติรายสัปดาห์ยังไม่พอระบุ Stage อย่างน่าเชื่อถือ","stage.stage1":"Stage 1 · สร้างฐาน","stage.stage2":"Stage 2 · ขาขึ้น","stage.stage3":"Stage 3 · กระจายตัว","stage.stage4":"Stage 4 · ขาลง","stage.description1":"ราคาเริ่มทรงตัวหลังขาลง และเส้นเฉลี่ย 30 สัปดาห์เริ่มแบน","stage.description2":"ราคาอยู่เหนือเส้นเฉลี่ย 30 สัปดาห์ที่กำลังชันขึ้น; ควรดูแรงเทียบตลาดและปริมาณประกอบ","stage.description3":"หลังช่วงขาขึ้น ราคาเริ่มแกว่งใกล้เส้นเฉลี่ยที่แบนลง","stage.description4":"ราคาอยู่ใต้เส้นเฉลี่ย 30 สัปดาห์ที่ลาดลง แสดงแนวโน้มอ่อนตัว","stage.sma":"SMA 30 สัปดาห์","stage.distance":"ราคาห่างจาก SMA","stage.slope":"ความชัน SMA ใน 4 สัปดาห์","stage.rs":"Mansfield-style RS เทียบ SPY","stage.asOf":"ข้อมูลถึง","stage.note":"การประเมินจากกฎราคา ไม่ตรวจรูปแบบฐาน ปริมาณเบรกเอาต์ หรือ breadth ของตลาด และไม่ใช่สัญญาณซื้อขาย","stage.short":"Stage","stage.loadingShort":"กำลังคำนวณ Stage…",
    "chart.eyebrow":"PRICE HISTORY","chart.title":"กราฟราคาย้อนหลัง","chart.emptyCaption":"เลือกหุ้นเพื่อดูกราฟรายวัน","chart.rangeLabel":"ช่วงเวลากราฟ","chart.oneMonth":"1 เดือน","chart.threeMonths":"3 เดือน","chart.sixMonths":"6 เดือน","chart.oneYear":"1 ปี","chart.typeLabel":"รูปแบบกราฟ","chart.line":"กราฟเส้น","chart.candles":"แท่งเทียน","chart.candleUnavailable":"ข้อมูลช่วงเวลานี้ไม่มีราคาเปิด/สูงสุด/ต่ำสุดครบสำหรับแท่งเทียน","chart.load":"โหลดกราฟ","chart.placeholder":"กราฟจะแสดงหลังเลือกหุ้น","chart.legend":"● ราคาปิดรายวัน","chart.legendCandles":"แท่งเทียน · เปิด / สูง / ต่ำ / ปิด","chart.export":"ส่งออก CSV",
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
    "movers.title":"Market movers today","movers.description":"Rank ETFs and indices by today’s percentage change","movers.refresh":"Refresh","movers.gainers":"Top gainers","movers.losers":"Top decliners","movers.loading":"Loading market groups…","movers.error":"Could not load market groups","movers.emptyGainers":"No advancing groups in the latest data","movers.emptyLosers":"No declining groups in the latest data","movers.updated":"Updated","movers.up":"Up","movers.down":"Down",

    "pulse.symbolsTitle":"Stocks shown in this overview","pulse.symbolsDescription":"Saved per workspace on this device","pulse.symbolsPlaceholder":"Ticker, such as AAPL","pulse.addSymbol":"Add stock","pulse.removeSymbol":"Remove from overview","pulse.invalidSymbol":"Enter a valid ticker","pulse.existsSymbol":"This ticker is already in the list","pulse.symbolLimit":"Choose up to 12 tickers","pulse.noSymbols":"No stocks selected. Add a ticker to start tracking it.","pulse.loadingQuotes":"Loading selected stock prices…","pulse.quoteUnavailable":"Could not load price",
    "stocks.eyebrow":"STOCK RESEARCH","stocks.title":"Find and research stocks","stocks.description":"See today’s move, year-to-date return, and the selected stock’s price chart.","stocks.searchPlaceholder":"Search a ticker, such as AAPL or MSFT","stocks.search":"Search","stocks.popular":"Popular stocks","stocks.company":"COMPANY OVERVIEW","stock.valuationHeading":"Key fundamentals","stock.priceSummary":"Stock price summary","stock.researchLabel":"RESEARCH NOTES","stock.metricsLabel":"KEY METRICS",
    "stock.lastPrice":"Latest price","stock.today":"Today’s change","stock.ytd":"Year-to-date change","stock.todayHint":"Compared with the prior close","stock.ytdHint":"Compared with the prior year close","stock.marketCap":"Market cap","stock.marketCapHint":"Units from data source","stock.peHint":"Price to earnings","stock.roeHint":"Return on equity","stock.metricsTitle":"Financial metrics","stock.netMargin":"Net profit margin","stock.revenueGrowth":"Revenue growth YoY","stock.dividend":"Dividend yield","stock.metricsFootnote":"Metric coverage depends on the API plan and company","stock.analysisTitle":"Initial observations","stock.analysisEmpty":"Select a stock to see metric observations","stock.analysisNote":"Not investment advice","stock.dataNote":"Data depends on provider access and availability",
    "stage.title":"Stan Weinstein Stage Analysis","stage.description":"Estimated from weekly closes, the 30-week SMA, and relative strength vs SPY","stage.loading":"Calculating Stage from weekly history…","stage.unavailable":"Stage is unavailable","stage.insufficient":"Not enough weekly history to identify a stage reliably","stage.stage1":"Stage 1 · Basing","stage.stage2":"Stage 2 · Advancing","stage.stage3":"Stage 3 · Topping","stage.stage4":"Stage 4 · Declining","stage.description1":"Price is stabilizing after a decline and the 30-week average is flattening.","stage.description2":"Price is above a rising 30-week average; check relative strength and volume for confirmation.","stage.description3":"After an advance, price is moving around a flattening long-term average.","stage.description4":"Price is below a falling 30-week average, showing a weakening trend.","stage.sma":"30-week SMA","stage.distance":"Price vs SMA","stage.slope":"4-week SMA slope","stage.rs":"Mansfield-style RS vs SPY","stage.asOf":"Data through","stage.note":"Rule-based estimate only. It does not check base structure, breakout volume, or market breadth and is not a trading signal.","stage.short":"Stage","stage.loadingShort":"Calculating Stage…",
    "chart.eyebrow":"PRICE HISTORY","chart.title":"Historical price chart","chart.emptyCaption":"Select a stock to see daily prices","chart.rangeLabel":"Chart range","chart.oneMonth":"1 month","chart.threeMonths":"3 months","chart.sixMonths":"6 months","chart.oneYear":"1 year","chart.typeLabel":"Chart type","chart.line":"Line","chart.candles":"Candlesticks","chart.candleUnavailable":"This range does not include complete OHLC data for candlesticks","chart.load":"Load chart","chart.placeholder":"The chart appears after you select a stock","chart.legend":"● Daily close","chart.legendCandles":"Candlesticks · O / H / L / C","chart.export":"Export CSV",
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
const stageDataRequests = new Map();
const stageRequestQueue = [];
let activeStageRequests = 0;
let latestStageInfo = null;
let cachedMarketGroups = null;
let activeMoverView = "up";

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
  if (latestStageInfo) renderStageCard(latestStageInfo);
  else if ($("stage-badge")) $("stage-badge").textContent = t("stage.loading");
  document.querySelectorAll(".stage-badge[data-symbol]").forEach(element => {
    const saved = stageDataRequests.get(element.dataset.symbol);
    if (saved) saved.promise.then(data => { if (element.isConnected) renderStageBadge(element, data); }).catch(() => {});
    else if (element.classList.contains("stage-pending")) element.textContent = t("stage.loadingShort");
  });
  if (persist) { try { localStorage.setItem("stocklens-language", currentLanguage); } catch {} }
}
async function api(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}

function pumpStageRequestQueue() {
  while (activeStageRequests < 3 && stageRequestQueue.length) {
    const task = stageRequestQueue.shift();
    activeStageRequests++;
    Promise.resolve().then(task).finally(() => {
      activeStageRequests--;
      pumpStageRequestQueue();
    });
  }
}
function getStageInfo(rawSymbol) {
  const symbol = String(rawSymbol || "").trim().toUpperCase();
  const saved = stageDataRequests.get(symbol);
  if (saved && Date.now() - saved.savedAt < 6 * 60 * 60_000) return saved.promise;
  const promise = new Promise((resolve, reject) => {
    stageRequestQueue.push(async () => {
      try { resolve(await api(`/api/stage/${encodeURIComponent(symbol)}`)); }
      catch (error) { stageDataRequests.delete(symbol); reject(error); }
    });
  });
  stageDataRequests.set(symbol, { savedAt: Date.now(), promise });
  pumpStageRequestQueue();
  return promise;
}
function stageText(data) {
  return data?.stage >= 1 && data.stage <= 4 ? t(`stage.stage${data.stage}`) : t("stage.insufficient");
}
function renderStageBadge(element, data) {
  if (!element) return;
  element.classList.remove("stage-1", "stage-2", "stage-3", "stage-4", "stage-pending", "stage-unavailable");
  if (data?.status === "loading") {
    delete element.dataset.stage;
    element.classList.add("stage-pending");
    element.textContent = t("stage.loadingShort");
    element.title = t("stage.loading");
    return;
  }
  const stage = Number(data?.stage);
  if ([1, 2, 3, 4].includes(stage)) {
    element.dataset.stage = String(stage);
    element.classList.add(`stage-${stage}`);
    element.textContent = stageText(data);
    element.title = t("stage.title");
  } else {
    delete element.dataset.stage;
    element.classList.add("stage-unavailable");
    element.textContent = data?.status === "insufficient" ? t("stage.insufficient") : t("stage.unavailable");
    element.title = data?.reason || t("stage.unavailable");
  }
}
function hydrateStageBadge(element, symbol) {
  if (!element || !symbol) return;
  element.dataset.symbol = String(symbol).toUpperCase();
  element.classList.add("stage-pending");
  element.textContent = t("stage.loadingShort");
  getStageInfo(symbol).then(data => {
    if (element.isConnected) renderStageBadge(element, data);
  }).catch(() => {
    if (element.isConnected) renderStageBadge(element, null);
  });
}
function renderStageCard(data = latestStageInfo) {
  const card = $("stage-analysis");
  const badge = $("stage-badge");
  const description = $("stage-description");
  const metrics = $("stage-metrics");
  if (!card || !badge || !description || !metrics) return;
  card.classList.toggle("stage-insufficient", !data?.stage && data?.status !== "loading");
  renderStageBadge(badge, data);
  description.textContent = data?.stage
    ? t(`stage.description${data.stage}`)
    : data?.status === "loading" ? t("stage.loading")
      : data?.status === "insufficient" ? t("stage.insufficient")
      : data ? t("stage.unavailable") : t("stage.loading");
  metrics.replaceChildren();
  if (!data?.stage) return;
  const formatSigned = value => `${Number(value) > 0 ? "+" : ""}${fmt(value, "%")}`;
  const values = [
    [t("stage.sma"), money(data.sma30, activeCurrency)],
    [t("stage.distance"), formatSigned(data.distancePercent)],
    [t("stage.slope"), formatSigned(data.slopePercent4w)],
    [t("stage.rs"), data.mansfieldRsPercent == null ? "—" : formatSigned(data.mansfieldRsPercent)]
  ];
  for (const [label, value] of values) {
    const item = document.createElement("div"); item.className = "stage-metric";
    const title = document.createElement("span"); title.textContent = label;
    const strong = document.createElement("strong"); strong.textContent = value;
    item.append(title, strong); metrics.append(item);
  }
  if (data.asOf) {
    const asOf = document.createElement("div"); asOf.className = "stage-metric";
    const label = document.createElement("span"); label.textContent = t("stage.asOf");
    const value = document.createElement("strong");
    value.textContent = new Date(data.asOf).toLocaleDateString(currentLanguage === "en" ? "en-US" : "th-TH", { timeZone: "Asia/Bangkok", year: "numeric", month: "short", day: "numeric" });
    asOf.append(label, value); metrics.append(asOf);
  }
}
function hydrateStageBadges(entries) {
  for (const [element, symbol] of entries) hydrateStageBadge(element, symbol);
}

function renderCompanyLogo(rawUrl, companyName, symbol) {
  const host = $("company-logo");
  if (!host) return;
  const label = companyName || symbol || "Stock";
  const initials = String(label).trim().slice(0, 1).toLocaleUpperCase(currentLanguage === "en" ? "en-US" : "th-TH") || "S";
  host.replaceChildren();
  host.classList.remove("has-image");
  host.textContent = initials;
  host.title = label;
  host.setAttribute("aria-label", `${label} logo`);
  if (!rawUrl) return;
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== "https:" || !/(^|\.)finnhub\.io$/i.test(url.hostname)) return;
    const image = document.createElement("img");
    image.alt = `${label} logo`;
    image.addEventListener("load", () => {
      host.classList.add("has-image");
      host.textContent = "";
      host.append(image);
    }, { once: true });
    image.addEventListener("error", () => {
      host.classList.remove("has-image");
      host.replaceChildren(document.createTextNode(initials));
    }, { once: true });
    image.src = url.href;
  } catch { /* Keep the ticker monogram when the logo URL is invalid. */ }
}

function renderMarketGroups(data = cachedMarketGroups) {
  const host = $("market-groups-list");
  if (!host) return;
  host.replaceChildren();
  document.querySelectorAll("[data-mover-view]").forEach(tab => {
    const selected = tab.dataset.moverView === activeMoverView;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  const validItems = (data?.items || []).filter(item => item.changePercent != null && Number.isFinite(Number(item.changePercent)));
  const rows = validItems.filter(item => activeMoverView === "up" ? Number(item.changePercent) > 0 : Number(item.changePercent) < 0)
    .sort((a, b) => activeMoverView === "up"
      ? Number(b.changePercent) - Number(a.changePercent)
      : Number(a.changePercent) - Number(b.changePercent))
    .slice(0, 10);
  if (!rows.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = data ? t(activeMoverView === "up" ? "movers.emptyGainers" : "movers.emptyLosers") : t("movers.loading");
    host.append(empty);
  } else {
    const maxChange = Math.max(...rows.map(item => Math.abs(Number(item.changePercent))), 0.01);
    rows.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "market-group-row" + (Number(item.changePercent) < 0 ? " loser" : "");
      button.setAttribute("aria-label", `${item.nameEn} ${item.symbol} · ${currentLanguage === "en" ? item.descriptionEn : item.descriptionTh} · ${Number(item.changePercent) >= 0 ? "+" : ""}${Number(item.changePercent).toFixed(2)}%`);
      const identity = document.createElement("span");
      identity.className = "market-group-identity";
      const rank = document.createElement("span");
      rank.className = "market-group-rank";
      rank.textContent = String(index + 1).padStart(2, "0");
      const ticker = document.createElement("span");
      ticker.className = "market-group-ticker";
      ticker.textContent = item.symbol;
      const details = document.createElement("span");
      details.className = "market-group-details";
      const name = document.createElement("strong");
      name.textContent = item.nameEn;
      const description = document.createElement("small");
      description.textContent = currentLanguage === "en" ? item.descriptionEn : item.descriptionTh;
      const stage = document.createElement("span");
      stage.className = "stage-badge compact stage-pending";
      details.append(name, description, stage);
      identity.append(rank, ticker, details);
      const meter = document.createElement("span");
      meter.className = "market-group-meter";
      const fill = document.createElement("span");
      fill.style.width = `${Math.max(4, Math.abs(Number(item.changePercent)) / maxChange * 100)}%`;
      meter.append(fill);
      const change = document.createElement("strong");
      const amount = Number(item.changePercent);
      change.className = "market-group-change " + (amount >= 0 ? "positive" : "negative");
      change.textContent = `${amount >= 0 ? "+" : ""}${amount.toFixed(2)}%`;
      button.append(identity, meter, change);
      button.addEventListener("click", () => loadStock(item.symbol));
      host.append(button);
      hydrateStageBadge(stage, item.symbol);
    });
  }
  const status = $("market-groups-status");
  if (data?.updatedAt) {
    const updated = new Date(data.updatedAt);
    status.textContent = `${t("movers.updated")} · ${Number.isNaN(updated.getTime()) ? "—" : updated.toLocaleTimeString(currentLanguage === "en" ? "en-US" : "th-TH", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Bangkok" })} · ${validItems.length} ${currentLanguage === "en" ? "groups" : "กลุ่ม"}`;
  } else if (data?.error) status.textContent = data.error;
  else status.textContent = "";
  status.dataset.dynamic = "true";
}

async function loadMarketGroups(options = {}) {
  const button = $("market-groups-refresh");
  if (button) button.disabled = true;
  if (!cachedMarketGroups) renderMarketGroups(null);
  try {
    cachedMarketGroups = await api(`/api/market-groups${options.refresh ? "?refresh=1" : ""}`);
    renderMarketGroups(cachedMarketGroups);
  } catch (error) {
    if (cachedMarketGroups) {
      renderMarketGroups(cachedMarketGroups);
      $("market-groups-status").textContent = error.message;
    } else {
      renderMarketGroups(null);
      const host = $("market-groups-list");
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = `${t("movers.error")}: ${error.message}`;
      host.replaceChildren(empty);
    }
  } finally {
    if (button) button.disabled = false;
  }
}

document.querySelectorAll("[data-mover-view]").forEach(tab => tab.addEventListener("click", () => {
  activeMoverView = tab.dataset.moverView === "down" ? "down" : "up";
  renderMarketGroups();
}));
$("market-groups-refresh")?.addEventListener("click", () => loadMarketGroups({ refresh: true }));
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
      const meta = document.createElement("span");
      meta.className = "result-item-meta";
      const right = document.createElement("small");
      right.textContent = item.type || "Equity";
      const stage = document.createElement("span");
      stage.className = "stage-badge compact stage-pending";
      stage.textContent = t("stage.loadingShort");
      meta.append(right, stage);
      button.append(left, meta);
      button.addEventListener("click", () => loadStock(item.symbol));
      resultsBox.append(button);
      hydrateStageBadge(stage, item.symbol);
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
  latestStageInfo = { status: "loading" };
  const requestId = ++stockRequestId;
  input.value = symbol;
  if (!preservePage) navigateToPage("stocks");
  stockSection.classList.remove("hidden");
  resultsBox.classList.add("hidden");
  $("stock-symbol").textContent = symbol;
  $("company-name").textContent = t("common.loading");
  $("company-meta").textContent = currentLanguage === "en" ? "Connecting to Finnhub" : "กำลังเชื่อมต่อ Finnhub";
  renderCompanyLogo(null, symbol, symbol);
  $("stage-badge").className = "stage-badge stage-pending";
  $("stage-badge").textContent = t("stage.loadingShort");
  $("stage-description").textContent = t("stage.loading");
  $("stage-metrics").replaceChildren();
  $("stage-analysis").classList.remove("stage-insufficient");
  $("analysis").textContent = currentLanguage === "en" ? "Loading financial metrics…" : "กำลังวิเคราะห์ตัวชี้วัด…";
  $("chart-caption").textContent = `${symbol} · ${currentLanguage === "en" ? "Daily close (Finnhub and fallback providers)" : "ราคาปิดรายวัน (Finnhub และแหล่งข้อมูลสำรอง)"}`;
  $("price-chart").textContent = t("common.loading");
  $("export-csv").disabled = true;
  $("today-change").textContent = t("common.loading");
  $("today-change").classList.remove("positive", "negative");
  $("ytd-change").textContent = t("common.loading");
  $("ytd-change").classList.remove("positive", "negative");
  latestCandles = [];
  if (!preservePage) stockSection.scrollIntoView({ behavior: "smooth", block: "start" });
  void loadChart();
  void getYearData(symbol).then(history => {
    if (requestId !== stockRequestId) return;
    latestYearCandles = history.candles || [];
    activeCurrency = history.currency || activeCurrency;
    updateYtdChange();
  }).catch(() => {
    if (requestId === stockRequestId) updateYtdChange();
  });
  void getStageInfo(symbol).then(stage => {
    if (requestId !== stockRequestId) return;
    latestStageInfo = stage;
    renderStageCard(stage);
  }).catch(() => {
    if (requestId !== stockRequestId) return;
    latestStageInfo = { status: "unavailable" };
    renderStageCard(latestStageInfo);
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
  renderStageCard(latestStageInfo);
  $("company-name").textContent = profile?.name || symbol;
  renderCompanyLogo(profile?.logo, profile?.name || symbol, symbol);
  $("company-meta").textContent = [profile?.exchange, profile?.industry, profile?.country].filter(Boolean).join(" · ") || (currentLanguage === "en" ? "Company profile unavailable for this ticker" : "ข้อมูลบริษัทไม่มีในแผน API หรือไม่รองรับ Ticker นี้");
  $("price").textContent = quote ? money(quote.price, profile?.currency || "USD") : t("common.noData");
  const change = quote?.changePercent;
  $("today-change").textContent = quote && Number.isFinite(Number(quote.change))
    ? `${Number(quote.change) > 0 ? "+" : ""}${money(quote.change, activeCurrency)} (${fmt(change, "%")})`
    : t("common.noData");
  $("today-change").classList.toggle("positive", Number.isFinite(Number(change)) && Number(change) >= 0);
  $("today-change").classList.toggle("negative", Number.isFinite(Number(change)) && Number(change) < 0);
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
    analysis.observations.forEach(item => {
      const p = document.createElement("p");
      const observation = typeof item === "string" ? { text: item, severity: "neutral" } : item;
      const severity = ["negative", "positive"].includes(observation?.severity) ? observation.severity : "neutral";
      p.className = "observation " + severity;
      p.textContent = observation?.text || "";
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
  void loadMarketPulse();
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
    localStorage.removeItem(scopedStorageKey("stocklens-market-pulse-symbols", current.id));
  } catch {}
  workspaces = workspaces.filter(item => item.id !== current.id);
  activeWorkspaceId = workspaces[0].id;
  saveWorkspaces();
  renderWorkspaceControls();
  renderWatchlist();
  renderAlerts();
  void renderPortfolio();
  void loadMarketPulse();
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
    const stack = document.createElement("span"); stack.className = "portfolio-symbol-stack";
    const stage = document.createElement("span"); stage.className = "stage-badge compact stage-pending";
    stack.append(open, stage);
    const remove = document.createElement("button"); remove.className = "remove-button"; remove.textContent = t("common.delete"); remove.setAttribute("aria-label", `${t("common.delete")} ${symbol}`); remove.addEventListener("click", () => { writeStore("stocklens-watchlist", items.filter(x => x !== symbol)); renderWatchlist(); });
    row.append(stack, remove); host.append(row); hydrateStageBadge(stage, symbol);
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
    const details = document.createElement("span"); details.className = "portfolio-symbol-stack alert-symbol-stack";
    const stage = document.createElement("span"); stage.className = "stage-badge compact stage-pending";
    details.append(text, stage);
    const remove = document.createElement("button"); remove.className = "remove-button"; remove.textContent = t("common.delete"); remove.addEventListener("click", () => { const updated = readStore("stocklens-alerts"); updated.splice(index, 1); writeStore("stocklens-alerts", updated); renderAlerts(); });
    row.append(details, remove); host.append(row); hydrateStageBadge(stage, item.symbol);
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
  const stageEntries = [];
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
    const symbolStack = document.createElement("span"); symbolStack.className = "portfolio-symbol-stack";
    const stage = document.createElement("span"); stage.className = "stage-badge compact stage-pending";
    symbolStack.append(open, stage); symbolCell.append(symbolStack); stageEntries.push([stage, item.symbol]);
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
  hydrateStageBadges(stageEntries);
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
  const rows = [...(candles || [])]
    .filter(item => Number.isFinite(Number(item?.time)) && Number.isFinite(Number(item?.close)))
    .sort((a, b) => Number(a.time) - Number(b.time));
  host.replaceChildren();
  latestCandles = rows;
  const candlesticks = $("chart-type")?.value === "candles";
  const legend = $("chart-legend-label");
  if (legend) { legend.textContent = t(candlesticks ? "chart.legendCandles" : "chart.legend"); legend.dataset.dynamic = "true"; }
  if (!rows.length) {
    const empty = document.createElement("div");
    empty.className = "chart-placeholder";
    empty.textContent = currentLanguage === "en" ? "No historical prices are available for this ticker or range." : "ไม่มีข้อมูลราคาย้อนหลังสำหรับ Ticker หรือช่วงเวลานี้";
    host.append(empty);
    $("export-csv").disabled = true;
    return;
  }

  const plottedRows = candlesticks ? rows.filter(item => [item.open, item.high, item.low, item.close].every(value => value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value)))) : rows;
  if (!plottedRows.length) {
    const empty = document.createElement("div");
    empty.className = "chart-placeholder";
    empty.textContent = t("chart.candleUnavailable");
    host.append(empty);
    $("export-csv").disabled = false;
    return;
  }
  const width = Math.max(host.clientWidth || 920, 340), height = 300, pad = { top: 20, right: 20, bottom: 34, left: 70 };
  lastChartWidth = width;
  const values = plottedRows.map(item => Number(item.close));
  const rawMin = candlesticks ? Math.min(...plottedRows.map(item => Number(item.low))) : Math.min(...values);
  const rawMax = candlesticks ? Math.max(...plottedRows.map(item => Number(item.high))) : Math.max(...values);
  const spread = rawMax - rawMin || Math.max(Math.abs(rawMax) * 0.02, 1);
  const min = rawMin - spread * 0.08, max = rawMax + spread * 0.08, range = max - min;
  const plotWidth = width - pad.left - pad.right, plotHeight = height - pad.top - pad.bottom;
  const x = index => pad.left + index * plotWidth / Math.max(1, plottedRows.length - 1);
  const y = value => pad.top + (max - value) * plotHeight / range;
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", candlesticks
    ? (currentLanguage === "en" ? `Daily candlestick chart for ${activeSymbol}` : `กราฟแท่งเทียนรายวัน ${activeSymbol}`)
    : (currentLanguage === "en" ? `Daily closing price line chart for ${activeSymbol}` : `กราฟเส้นราคาปิด ${activeSymbol}`));

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

  if (candlesticks) {
    const candleWidth = Math.max(2, Math.min(12, plotWidth / Math.max(1, plottedRows.length) * 0.62));
    plottedRows.forEach((item, index) => {
      const open = Number(item.open), close = Number(item.close);
      const group = document.createElementNS(ns, "g");
      group.setAttribute("class", close >= open ? "chart-candle chart-candle-up" : "chart-candle chart-candle-down");
      const wick = document.createElementNS(ns, "line");
      wick.setAttribute("x1", x(index)); wick.setAttribute("x2", x(index));
      wick.setAttribute("y1", y(Number(item.high))); wick.setAttribute("y2", y(Number(item.low)));
      wick.setAttribute("class", "chart-candle-wick");
      const body = document.createElementNS(ns, "rect");
      body.setAttribute("x", x(index) - candleWidth / 2);
      body.setAttribute("y", Math.min(y(open), y(close)));
      body.setAttribute("width", candleWidth);
      body.setAttribute("height", Math.max(1.5, Math.abs(y(open) - y(close))));
      body.setAttribute("class", "chart-candle-body");
      const title = document.createElementNS(ns, "title");
      title.textContent = `${new Date(Number(item.time)).toLocaleDateString(currentLanguage === "en" ? "en-US" : "th-TH")} · O ${fmt(open)} · H ${fmt(item.high)} · L ${fmt(item.low)} · C ${fmt(close)}`;
      group.append(wick, body, title);
      svg.append(group);
    });
  } else {
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", values.map((value, index) => `${index ? "L" : "M"}${x(index)},${y(value)}`).join(" "));
    path.setAttribute("class", "chart-line"); svg.append(path);
    for (const index of [...new Set([0, plottedRows.length - 1])]) {
      const point = document.createElementNS(ns, "circle");
      point.setAttribute("cx", x(index)); point.setAttribute("cy", y(values[index])); point.setAttribute("r", "4");
      point.setAttribute("class", "chart-point"); svg.append(point);
    }
  }

  const dateLabel = timestamp => new Date(Number(timestamp)).toLocaleDateString(currentLanguage === "en" ? "en-US" : "th-TH", { day: "numeric", month: "short", timeZone: "Asia/Bangkok" });
  const start = document.createElementNS(ns, "text");
  start.setAttribute("x", pad.left); start.setAttribute("y", height - 8); start.setAttribute("class", "chart-label");
  start.textContent = dateLabel(plottedRows[0].time); svg.append(start);
  const end = document.createElementNS(ns, "text");
  end.setAttribute("x", width - pad.right); end.setAttribute("y", height - 8); end.setAttribute("text-anchor", "end");
  end.setAttribute("class", "chart-label"); end.textContent = dateLabel(plottedRows[plottedRows.length - 1].time); svg.append(end);
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
  const days = Number(document.querySelector('[data-chart-days][aria-pressed="true"]')?.dataset.chartDays || 365);
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
document.querySelectorAll("[data-chart-days]").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll("[data-chart-days]").forEach(option => {
    const selected = option === button;
    option.classList.toggle("active", selected);
    option.setAttribute("aria-pressed", String(selected));
  });
  if (activeSymbol) void loadChart();
}));
$("chart-type")?.addEventListener("change", () => {
  if (latestCandles.length) renderChart(latestCandles);
});
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
  renderMarketGroups();
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

const pulseSymbolsStorageKey = "stocklens-market-pulse-symbols";
const pulseSymbolsDefault = ["SPY", "QQQ", "AAPL", "MSFT", "NVDA", "GOOGL", "AMZN", "META"];
let marketPulseSymbols = [];
let pulseQuoteRequestId = 0;

function normalizePulseSymbols(values) {
  if (!Array.isArray(values)) return [];
  return [...new Set(values.map(safeSymbol).filter(symbol => /^[A-Z0-9.^-]{1,20}$/.test(symbol)))].slice(0, 12);
}

function initializePulseSymbols(data) {
  const stored = readStore(pulseSymbolsStorageKey, null);
  if (Array.isArray(stored)) marketPulseSymbols = normalizePulseSymbols(stored);
  else {
    const fromSnapshots = normalizePulseSymbols((data?.snapshots || []).map(item => item.symbol));
    marketPulseSymbols = fromSnapshots.length ? fromSnapshots : [...pulseSymbolsDefault];
    writeStore(pulseSymbolsStorageKey, marketPulseSymbols);
  }
  renderPulseSymbolManager();
}

function renderPulseSymbolManager() {
  const host = $("pulse-symbols");
  const count = $("pulse-symbol-count");
  if (!host || !count) return;
  host.replaceChildren();
  count.textContent = `${marketPulseSymbols.length} / 12`;
  for (const symbol of marketPulseSymbols) {
    const chip = document.createElement("span");
    chip.className = "pulse-symbol-chip";
    const open = document.createElement("button");
    open.type = "button";
    open.className = "pulse-symbol-open";
    open.textContent = symbol;
    open.addEventListener("click", () => loadStock(symbol));
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "pulse-symbol-remove";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `${t("pulse.removeSymbol")} ${symbol}`);
    remove.title = t("pulse.removeSymbol");
    remove.addEventListener("click", () => {
      marketPulseSymbols = marketPulseSymbols.filter(item => item !== symbol);
      writeStore(pulseSymbolsStorageKey, marketPulseSymbols);
      renderPulseSymbolManager();
      void loadPulseQuotes();
    });
    chip.append(open, remove);
    host.append(chip);
  }
  const form = $("pulse-symbol-form");
  const input = $("pulse-symbol-input");
  const addButton = form?.querySelector("button[type='submit']");
  if (addButton) addButton.disabled = marketPulseSymbols.length >= 12;
  if (input) input.disabled = marketPulseSymbols.length >= 12;
}

async function loadPulseQuotes() {
  const host = $("pulse-snapshots");
  if (!host) return;
  const requestId = ++pulseQuoteRequestId;
  const symbols = [...marketPulseSymbols];
  host.replaceChildren();
  if (!symbols.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = t("pulse.noSymbols");
    host.append(empty);
    return;
  }
  const loading = document.createElement("div");
  loading.className = "chart-placeholder pulse-quotes-loading";
  loading.textContent = t("pulse.loadingQuotes");
  host.append(loading);
  const quotes = new Map();
  let next = 0;
  const worker = async () => {
    while (next < symbols.length) {
      const symbol = symbols[next++];
      try { quotes.set(symbol, { quote: await api(`/api/quote/${encodeURIComponent(symbol)}`) }); }
      catch (error) { quotes.set(symbol, { error }); }
    }
  };
  await Promise.all(Array.from({ length: Math.min(4, symbols.length) }, () => worker()));
  if (requestId !== pulseQuoteRequestId) return;
  host.replaceChildren();
  const en = currentLanguage === "en";
  for (const ticker of symbols) {
    const result = quotes.get(ticker);
    const quote = result?.quote;
    const card = document.createElement("article");
    card.className = "pulse-ticker" + (quote ? "" : " unavailable");
    const heading = document.createElement("div");
    heading.className = "pulse-ticker-heading";
    const symbol = document.createElement("button");
    symbol.type = "button";
    symbol.className = "pulse-ticker-symbol";
    symbol.textContent = ticker;
    symbol.title = en ? "Open stock details" : "เปิดหน้าวิเคราะห์หุ้น";
    symbol.addEventListener("click", () => loadStock(ticker));
    const percent = document.createElement("span");
    const changePercent = quote?.changePercent == null ? Number.NaN : Number(quote.changePercent);
    percent.className = "pulse-change";
    if (Number.isFinite(changePercent)) percent.classList.add(changePercent >= 0 ? "positive" : "negative");
    percent.textContent = Number.isFinite(changePercent) ? `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%` : "—";
    heading.append(symbol, percent);
    const price = document.createElement("strong");
    price.className = "pulse-price";
    price.textContent = quote ? fmt(quote.price, "", 2) : t("pulse.quoteUnavailable");
    const detail = document.createElement("small");
    detail.className = "muted";
    detail.textContent = quote
      ? (en ? "Change " : "เปลี่ยน ") + fmt(quote.change, "", 2) + (en ? " · High " : " · สูง ") + fmt(quote.high, "", 2) + (en ? " · Low " : " · ต่ำ ") + fmt(quote.low, "", 2)
      : t("pulse.quoteUnavailable");
    const stage = document.createElement("span");
    stage.className = "stage-badge compact stage-pending";
    card.append(heading, price, detail, stage);
    host.append(card);
    hydrateStageBadge(stage, ticker);
  }
}

$("pulse-symbol-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const symbol = safeSymbol($("pulse-symbol-input").value);
  if (!/^[A-Z0-9.^-]{1,20}$/.test(symbol)) return toast(t("pulse.invalidSymbol"));
  if (marketPulseSymbols.includes(symbol)) return toast(t("pulse.existsSymbol"));
  if (marketPulseSymbols.length >= 12) return toast(t("pulse.symbolLimit"));
  marketPulseSymbols = [...marketPulseSymbols, symbol];
  writeStore(pulseSymbolsStorageKey, marketPulseSymbols);
  $("pulse-symbol-input").value = "";
  renderPulseSymbolManager();
  void loadPulseQuotes();
});

async function loadMarketPulse(options = {}) {
  const isRefresh = options.refresh === true;
  const button = $("pulse-refresh");
  const summary = $("pulse-summary");
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

    initializePulseSymbols(data);
    void loadPulseQuotes();
    for (const id of ["pulse-date", "pulse-status", "pulse-summary"]) $(id).dataset.dynamic = "true";
  } catch (error) {
    $("pulse-date").textContent = t("pulse.errorTitle");
    status.className = "pulse-status failed";
    status.textContent = error.message || t("pulse.errorTitle");
    summary.textContent = t("pulse.checkServices");
    initializePulseSymbols(null);
    void loadPulseQuotes();
    for (const id of ["pulse-date", "pulse-status", "pulse-summary"]) $(id).dataset.dynamic = "true";
  } finally {
    button.disabled = false;
  }
}

$("pulse-refresh")?.addEventListener("click", () => loadMarketPulse({ refresh: true }));
loadMarketPulse();
loadMarketGroups();

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
  const body = document.createElement("div"); body.className = "copilot-message-body"; body.textContent = text;
  item.append(name, body); copilotMessages.append(item); copilotMessages.scrollTop = copilotMessages.scrollHeight;
  return body;
}
function appendCopilotInline(parent, text) {
  const pattern = /\*\*([^*]+)\*\*|`([^`]+)`/g;
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > cursor) parent.append(document.createTextNode(text.slice(cursor, match.index)));
    const node = document.createElement(match[1] ? "strong" : "code");
    node.textContent = match[1] || match[2];
    parent.append(node);
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) parent.append(document.createTextNode(text.slice(cursor)));
}
function renderCopilotMarkdown(element, markdown) {
  element.replaceChildren();
  let list = null;
  let listKind = "";
  let codeLines = null;
  const closeList = () => { list = null; listKind = ""; };
  for (const line of String(markdown || "").split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      closeList();
      if (codeLines) {
        const pre = document.createElement("pre"); const code = document.createElement("code"); code.textContent = codeLines.join("\n"); pre.append(code); element.append(pre); codeLines = null;
      } else codeLines = [];
      continue;
    }
    if (codeLines) { codeLines.push(line); continue; }
    if (!line.trim()) { closeList(); continue; }
    const heading = line.match(/^\s{0,3}(#{1,3})\s+(.+)$/);
    if (heading) {
      closeList();
      const node = document.createElement(heading[1].length === 1 ? "h3" : "h4");
      appendCopilotInline(node, heading[2]); element.append(node); continue;
    }
    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
      const numbered = /^\s*\d+[.)]\s+/.test(line);
      const kind = numbered ? "ol" : "ul";
      if (!list || listKind !== kind) { closeList(); list = document.createElement(kind); listKind = kind; element.append(list); }
      const item = document.createElement("li");
      appendCopilotInline(item, line.replace(numbered ? /^\s*\d+[.)]\s+/ : /^\s*[-*]\s+/, ""));
      list.append(item); continue;
    }
    if (/^\s*---+\s*$/.test(line)) { closeList(); element.append(document.createElement("hr")); continue; }
    closeList();
    const paragraph = document.createElement("p");
    appendCopilotInline(paragraph, line.trim()); element.append(paragraph, document.createElement("br"));
  }
  if (codeLines) {
    const pre = document.createElement("pre"); const code = document.createElement("code"); code.textContent = codeLines.join("\n"); pre.append(code); element.append(pre);
  }
  element.closest(".copilot-message")?.scrollIntoView({ block: "nearest" });
}
copilotForm?.addEventListener("submit", async (event) => {
  event.preventDefault(); const message = copilotInput.value.trim(); if (!message) return;
  addCopilotMessage("user", message); copilotInput.value = "";
  const send = $("copilot-send"); send.disabled = true; send.textContent = "กำลังคิด…";
  const reply = addCopilotMessage("assistant", "กำลังวิเคราะห์คำถาม…");
  try {
    const data = await api("/api/copilot", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, symbol: activeSymbol })
    });
    renderCopilotMarkdown(reply, data.answer);
  }
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
