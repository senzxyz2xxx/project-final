# The Nexus Dashboard — Next.js Application

ระบบ Dashboard กลางตามข้อกำหนดของ **The Nexus Dashboard** และภาพดีไซน์ต้นแบบ (Pixel-matched) พร้อม Sidebar ภาษาไทย 2 หมวดหมู่ และ Mock Data แยกแต่ละระบบอย่างสมบูรณ์

---

## 🚀 โครงสร้าง Sidebar ใหม่ (ตามภาพที่แนบ)

```
ภาพรวม
 ├── ⊞ ภาพรวม (Overview / General Metrics)
 └── 🖥️ War Room (ศูนย์ควบคุมรวมทุกระบบ 7 ไซต์งาน)

ระบบ
 ├── 📊 ระบบการเงิน (Financial Dashboard & Budget)
 ├── ⏰ ระบบลงเวลา (Time Attendance & Face Scan)
 ├── 🚚 ระบบ VMS (Visitor Management System)
 └── 👥 ระบบ HR (Human Resources Management)
```

---

## 📦 วิธีการติดตั้งและรัน Next.js

1. เปิด Terminal หรือ PowerShell ในโฟลเดอร์นี้:
   ```bash
   cd c:\Users\User\Documents\PassF
   ```

2. ติดตั้ง Dependencies:
   ```bash
   npm install
   ```

3. เริ่มต้นเซิร์ฟเวอร์สำหรับ Development:
   ```bash
   npm run dev
   ```

4. เปิดบราวเซอร์ที่:
   ```
   http://localhost:3000
   ```

---

## 🗂️ โครงสร้างไฟล์ Next.js (App Router)

```
c:\Users\User\Documents\PassF/
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS custom themes & colors
├── postcss.config.js          # PostCSS configuration
├── next.config.mjs            # Next.js configuration
├── index.html                 # เวอร์ชั่น Standalone HTML (เปิดดูได้ทันทีไม่ต้อง build)
├── src/
│   ├── app/
│   │   ├── globals.css        # Stylesheet & Font setup
│   │   ├── layout.tsx         # Root HTML layout
│   │   └── page.tsx           # หน้า Dashboard หลัก เชื่อม State & Components
│   ├── components/
│   │   ├── Sidebar.tsx        # แถบเมนูซ้ายมือ (ภาพรวม / ระบบการเงิน / ลงเวลา / VMS / HR)
│   │   ├── Header.tsx         # แถบด้านบนพร้อมตัวกรองวันที่ และเลือกองค์กร
│   │   ├── MetricCards.tsx    # การ์ดสรุปตัวเลข KPI 5 กล่องบนสุด
│   │   ├── SalesReturnsChart.tsx   # กราฟเส้นโค้ง Area Gradient และ Tooltip
│   │   ├── ConversionFunnelChart.tsx # กราฟแท่งทรง Comb Funnel
│   │   ├── SessionsGauge.tsx  # กราฟเกจครึ่งวงกลม (Semi-circle)
│   │   ├── TrafficSourcesCard.tsx  # แถบความคืบหน้าหลากสี & แจกแจงช่องทาง
│   │   ├── RegionalSalesTable.tsx  # ตารางแสดงสถิติภูมิภาค/ไซต์งาน
│   │   └── AIAssistantDrawer.tsx   # แถบสไลด์สั่งงาน AI ด้วยข้อความ Prompt
│   ├── data/
│   │   └── mockData.ts        # Mock Data ครบทั้ง 6 มุมมอง (overview, warroom, finance, attendance, vms, hr)
│   └── types/
│       └── dashboard.ts       # TypeScript Interfaces สำหรับ Data Type ทั้งหมด
```

---

## 💡 Mock Data แต่ละระบบที่จัดเตรียมไว้ (`src/data/mockData.ts`)

| แท็บ | วัตถุประสงค์ | ข้อมูล KPI เด่นในระบบ |
|---|---|---|
| **ภาพรวม (overview)** | General Metrics ตามแบบฉบับ Retail / E-commerce | Profit Margin €123,927.85, Orders 2,792, Units Sold 1,571 |
| **War Room (warroom)** | รวมศูนย์ข้อมูล 7 ไซต์งานของ บจก. ฤทธา | 10/10 ระบบพร้อมใช้, กำลังพล 3,842 คน, 0 Incident Alerts |
| **ระบบการเงิน (finance)** | รายรับ-รายจ่าย งบประมาณเบิกจ่ายโครงการ | รายได้สุทธิ ฿18.45M, เบิกจ่าย ฿12.19M, สภาพคล่อง ฿6.25M |
| **ระบบลงเวลา (attendance)** | สแกนใบหน้า เข้างานตรงเวลา ขาด ลา มาสาย | เข้างานตรงเวลา 95.8%, สแกนใบหน้าสำเร็จ 642 คน, มาสาย 18 คน |
| **ระบบ VMS (vms)** | บริหารจัดการผู้มาติดต่อและยานพาหนะเข้า-ออก | ผู้ติดต่อรวม 1,420 คน, เช็คอินสำเร็จ 1,385 คน, อยู่ในอาคาร 84 คน |
| **ระบบ HR (hr)** | ทรัพยากรบุคคล การสรรหาบุคลากร และสวัสดิการ | พนักงานทั้งหมด 1,250 คน, บรรจุใหม่ 38 คน, ลาออกต่ำเพียง 1.8% |
