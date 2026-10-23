# StockLens AI

เว็บวิเคราะห์หุ้นภาษาไทยด้วย Finnhub, Google Gemini และ Neon Postgres มีทั้งหน้า dashboard และงาน cron สำหรับบันทึกภาพรวมตลาดประจำวัน

## เริ่มใช้งานในเครื่อง

1. ใช้ Node.js 20 ขึ้นไป แล้วรัน `npm install`
2. คัดลอก `.env.example` เป็น `.env`
3. ใส่ `FINNHUB_API_KEY`, `GEMINI_API_KEY` และ connection string จาก Neon ใน `DATABASE_URL`
4. ตั้ง `MARKET_SYMBOLS` เป็น Ticker ที่ Finnhub plan ของคุณรองรับ
5. สร้างตารางใน Neon: `npm run db:migrate`
6. เปิดเว็บด้วย `npm start` แล้วไปที่ `http://localhost:3000`
7. ทดลองงานตามเวลาแบบทันทีด้วย `npm run cron:market-pulse`

ห้ามใส่ API keys หรือ `DATABASE_URL` ใน `public/` หรือ commit ไฟล์ `.env` ขึ้น GitHub

## การตั้ง cron บน Render

`render.yaml` สร้าง Web Service และ Cron Job แยกกัน งาน cron รัน `npm run cron:market-pulse` เวลา 01:30 UTC วันจันทร์ถึงศุกร์ (08:30 น. เวลาไทย) โดยดึงราคา Finnhub, สร้างสรุปภาษาไทยด้วย Gemini และ upsert ข้อมูลลง Neon จึงรันซ้ำในวันเดียวกันได้

ใน Render ให้ตั้ง Root Directory เป็น `stocklens-ai-copilot`; Build Command ใช้ `npm install` เพราะไฟล์แอปอยู่ใน Git repository แล้ว ไม่ต้องอัปโหลดหรือแตก ZIP ระหว่าง build

ใส่ `FINNHUB_API_KEY`, `GEMINI_API_KEY` และ `DATABASE_URL` ให้ทั้ง Web Service และ Cron Job ใน Render Environment; ใช้ `GEMINI_MODEL` และ `MARKET_SYMBOLS` เพื่อปรับโมเดล/หุ้นที่ติดตาม งาน cron ต้องจบด้วย exit code เพื่อให้ Render บันทึกผลสำเร็จหรือล้มเหลว

## ฟังก์ชัน

- ค้นหาหุ้น ราคา บริษัท ตัวชี้วัด และกราฟย้อนหลังจาก Finnhub
- Stock Co-Pilot ใช้ Gemini โดยส่ง API key จากฝั่ง server เท่านั้น
- สรุปตลาดประจำวันและ snapshot ราคา เก็บใน Neon/Postgres
- ประวัติรอบ cron พร้อมสถานะสำเร็จ/ล้มเหลว
- Workspace หลายชุด พร้อมรายการติดตามและแจ้งเตือนราคาแยกตามชุด (เก็บใน browser ของอุปกรณ์นี้)
- กราฟเส้นราคาปิดย้อนหลัง ปรับช่วงเวลาและส่งออก CSV ได้
- Endpoint ตรวจสถานะ: `GET /api/health`; สรุปตลาด: `GET /api/market-pulse`

## ข้อจำกัด

ข้อมูลราคาและการค้นหาหุ้นขึ้นกับสิทธิ์ Finnhub และอาจล่าช้า; cron ทำ snapshot ตามตาราง ไม่ใช่ข้อมูลสด การแจ้งเตือนที่หน้าเว็บยังตรวจเมื่อเปิดเว็บเท่านั้น และ watchlist ยังไม่ได้ผูกบัญชีผู้ใช้ Gemini อาจสรุปผิด จึงควรตรวจแหล่งข้อมูลก่อนใช้งานตัดสินใจลงทุน
