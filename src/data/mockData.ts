import { DashboardSystemData, SystemTabKey } from '../types/dashboard';

export const mockSystemsData: Record<SystemTabKey, DashboardSystemData> = {
  // 1. ภาพรวม (Overview - Skymetrics / General metrics 1:1)
  overview: {
    key: 'overview',
    brand: 'Redondo Brand',
    title: 'General metrics',
    subtitle: 'ภาพรวมระบบบริหารจัดการและยอดขายแบบ Real-time',
    kpis: [
      {
        id: 'kpi-1',
        label: 'Profit Margin',
        value: '€123,927.85',
        badge: '+38%',
        arrow: '↑',
        sub: 'Up 38% this week',
        isGreen: true
      },
      {
        id: 'kpi-2',
        label: 'Orders',
        value: '2,792',
        badge: '+11%',
        arrow: '↑',
        sub: 'Up 11% this week',
        isGreen: true
      },
      {
        id: 'kpi-3',
        label: 'Avg. Order Value',
        value: '857',
        badge: '-67%',
        arrow: '↓',
        sub: 'Down 67% this week',
        isGreen: false
      },
      {
        id: 'kpi-4',
        label: 'Units Sold',
        value: '1,571',
        badge: '-29%',
        arrow: '↓',
        sub: 'Down 29% this week',
        isGreen: false
      },
      {
        id: 'kpi-5',
        label: 'Cart Abandonment',
        value: '835',
        badge: '+11%',
        arrow: '↑',
        sub: 'Up 11% this week',
        isGreen: true
      }
    ],
    chart: {
      title: 'Sales & Returns',
      sub: 'Total sales up 7%, while returns decreased by 12%',
      legend1: 'Total sales',
      legendVal1: '4,782',
      legendBadge1: '+7%',
      legend2: 'Returns',
      legendVal2: '503',
      legendBadge2: '-12%',
      tooltipDay: 'Fri',
      tooltipTime: '14 March 2:39 PM',
      tooltipVal: '4,782 sales',
      days: [
        { day: 'Mon', date: '10 March', sales: 1240, returns: 120, salesFormatted: '1,240' },
        { day: 'Tue', date: '11 March', sales: 1450, returns: 110, salesFormatted: '1,450' },
        { day: 'Wed', date: '12 March', sales: 1120, returns: 135, salesFormatted: '1,120' },
        { day: 'Thu', date: '13 March', sales: 2180, returns: 95, salesFormatted: '2,180' },
        { day: 'Fri', date: '14 March 2:39 PM', sales: 4782, returns: 503, salesFormatted: '4,782' },
        { day: 'Sat', date: '15 March', sales: 3920, returns: 210, salesFormatted: '3,920' },
        { day: 'Sun', date: '16 March', sales: 2890, returns: 180, salesFormatted: '2,890' }
      ]
    },
    funnel: {
      title: 'Sales conversion',
      sub: 'Conversion process from leads to deals',
      conversionRate: '10%',
      conversionBadge: '+7%',
      stages: [
        { name: 'Leads', value: 1500, percentage: 100 },
        { name: 'Add to cart', value: 800, percentage: 53 },
        { name: 'Checkout', value: 200, percentage: 13 },
        { name: 'Deals', value: 150, percentage: 10 }
      ]
    },
    sessions: {
      title: 'Sessions',
      uniqueUsers: '3,271',
      uniqueLabel: 'Unique Users',
      totalSessions: '4,182',
      totalLabel: 'Total Sessions',
      gaugePercentage: 78
    },
    traffic: {
      title: 'Traffic Sources',
      spend: '€11,598',
      cpa: '€5.4',
      impressions: '7,574,183',
      clicks: '60,784',
      sources: [
        { name: 'Shop', count: 3707, color: 'bg-amber-400', widthPercent: 47 },
        { name: 'Direct', count: 1490, color: 'bg-emerald-500', widthPercent: 19 },
        { name: 'Instagram', count: 979, color: 'bg-cyan-400', widthPercent: 12.5 },
        { name: 'Google', count: 728, color: 'bg-sky-500', widthPercent: 9.5 },
        { name: 'Facebook', count: 213, color: 'bg-purple-500', widthPercent: 4 },
        { name: 'Others', count: 38, color: 'bg-pink-400', widthPercent: 2 }
      ]
    },
    regions: {
      title: 'Sales by Region',
      rows: [
        { region: 'Spain', orders: 129, trend: '↓', isUp: false, revenue: '€24,063.90' },
        { region: 'Rest of the world', orders: 7, trend: '↑', isUp: true, revenue: '€3,576.18' },
        { region: 'Europa', orders: 129, trend: '↑', isUp: true, revenue: '€24,063.90' },
        { region: 'Mexico', orders: 1, trend: '↓', isUp: false, revenue: '€41.08' }
      ]
    }
  },

  // 2. War Room (Multi-System Aggregated View)
  warroom: {
    key: 'warroom',
    brand: 'บจก. ฤทธา - ห้อง War Room',
    title: 'War Room (มอนิเตอร์ภาพรวม 7 ไซต์งาน)',
    subtitle: 'ศูนย์ควบคุมและเชื่อมต่อ 10 ระบบหลัก: VMS, ลงเวลา, การเงิน, HR, ERP แบบ Real-time',
    kpis: [
      {
        id: 'kpi-1',
        label: 'สถานะระบบทั้งหมด',
        value: '10/10 พร้อมใช้',
        badge: '100%',
        arrow: '↑',
        sub: 'System Uptime 99.98%',
        isGreen: true
      },
      {
        id: 'kpi-2',
        label: 'กำลังพลในทุกไซต์',
        value: '3,842 คน',
        badge: '+6%',
        arrow: '↑',
        sub: 'ครอบคลุม 7 โครงการ',
        isGreen: true
      },
      {
        id: 'kpi-3',
        label: 'Incident Alerts',
        value: '0 วิกฤต',
        badge: '-100%',
        arrow: '↓',
        sub: 'ไม่มีความเสี่ยงไซต์งาน',
        isGreen: true
      },
      {
        id: 'kpi-4',
        label: 'ผู้มาติดต่อวันนี้',
        value: '1,420 คน',
        badge: '+12%',
        arrow: '↑',
        sub: 'เช็คอินผ่านระบบ VMS',
        isGreen: true
      },
      {
        id: 'kpi-5',
        label: 'ความคืบหน้ารวม',
        value: '88.4%',
        badge: '+4.5%',
        arrow: '↑',
        sub: 'ตามเกณฑ์ Milestone Q4',
        isGreen: true
      }
    ],
    chart: {
      title: 'Cross-System Traffic & Incident Events',
      sub: 'ปริมาณ Transaction จากทุกไซต์งานเปรียบเทียบคำเตือนระบบ',
      legend1: 'Total Requests',
      legendVal1: '14,290',
      legendBadge1: '+18%',
      legend2: 'Alert Logs',
      legendVal2: '14',
      legendBadge2: '-60%',
      tooltipDay: 'Fri',
      tooltipTime: '14 March 14:00',
      tooltipVal: '14,290 reqs',
      days: [
        { day: 'Mon', date: '10 March', sales: 9400, returns: 20, salesFormatted: '9,400' },
        { day: 'Tue', date: '11 March', sales: 11200, returns: 18, salesFormatted: '11,200' },
        { day: 'Wed', date: '12 March', sales: 10800, returns: 25, salesFormatted: '10,800' },
        { day: 'Thu', date: '13 March', sales: 12500, returns: 16, salesFormatted: '12,500' },
        { day: 'Fri', date: '14 March 14:00', sales: 14290, returns: 14, salesFormatted: '14,290' },
        { day: 'Sat', date: '15 March', sales: 8900, returns: 10, salesFormatted: '8,900' },
        { day: 'Sun', date: '16 March', sales: 6400, returns: 8, salesFormatted: '6,400' }
      ]
    },
    funnel: {
      title: 'Project Workflow Progression',
      sub: 'กระบวนการส่งมอบงานจาก Drawing ถึง Handover',
      conversionRate: '88%',
      conversionBadge: '+5%',
      stages: [
        { name: 'วางแผน', value: 240, percentage: 100 },
        { name: 'ก่อสร้าง', value: 198, percentage: 82 },
        { name: 'ตรวจรับ QC', value: 180, percentage: 75 },
        { name: 'ส่งมอบ', value: 165, percentage: 68 }
      ]
    },
    sessions: {
      title: 'Active Site Connections',
      uniqueUsers: '7 ไซต์',
      uniqueLabel: 'ไซต์ออนไลน์สมบูรณ์',
      totalSessions: '12,980',
      totalLabel: 'Transactions/hr',
      gaugePercentage: 98
    },
    traffic: {
      title: 'Data Ingestion Streams',
      spend: '99.98%',
      cpa: '12ms',
      impressions: '14.2M',
      clicks: '0 fail',
      sources: [
        { name: 'VMS Gateways', count: 4200, color: 'bg-emerald-500', widthPercent: 40 },
        { name: 'Time Attendance', count: 3840, color: 'bg-sky-500', widthPercent: 35 },
        { name: 'Finance ERP', count: 1820, color: 'bg-amber-400', widthPercent: 15 },
        { name: 'HR Portal', count: 980, color: 'bg-purple-500', widthPercent: 8 },
        { name: 'Sensors/IoT', count: 240, color: 'bg-pink-400', widthPercent: 2 }
      ]
    },
    regions: {
      title: 'Status by Construction Site',
      rows: [
        { region: 'สำนักงานใหญ่ (HQ)', orders: 840, trend: '↑', isUp: true, revenue: '100% ปกติ' },
        { region: 'ไซต์เมืองทองธานี', orders: 650, trend: '↑', isUp: true, revenue: '100% ปกติ' },
        { region: 'ไซต์ภูเก็ตวิลล่า', orders: 480, trend: '↑', isUp: true, revenue: '99.8% ปกติ' },
        { region: 'ไซต์เชียงใหม่เมโทร', orders: 320, trend: '↑', isUp: true, revenue: '100% ปกติ' }
      ]
    }
  },

  // 3. ระบบการเงิน (Finance System)
  finance: {
    key: 'finance',
    brand: 'บจก. ฤทธา - ฝ่ายการเงิน',
    title: 'ระบบการเงินและงบประมาณ (Financial Dashboard)',
    subtitle: 'บริหารจัดการกระแสเงินสด เบิกจ่ายงวดงาน และงบประมาณโครงการ',
    kpis: [
      {
        id: 'kpi-1',
        label: 'รายได้สุทธิ (Net Revenue)',
        value: '฿18,450,200',
        badge: '+24%',
        arrow: '↑',
        sub: 'สูงกว่าเป้าหมายไตรมาส 24%',
        isGreen: true
      },
      {
        id: 'kpi-2',
        label: 'เบิกจ่ายงบโครงการ',
        value: '฿12,190,500',
        badge: '+8%',
        arrow: '↑',
        sub: 'ตามรอบการตรวจรับงาน',
        isGreen: true
      },
      {
        id: 'kpi-3',
        label: 'ต้นทุนเฉลี่ยต่อไซต์',
        value: '฿1,740,000',
        badge: '-14%',
        arrow: '↓',
        sub: 'ประหยัดงบต้นทุนวัสดุ 14%',
        isGreen: false
      },
      {
        id: 'kpi-4',
        label: 'สภาพคล่องหมุนเวียน',
        value: '฿6,259,700',
        badge: '+18%',
        arrow: '↑',
        sub: 'พร้อมสำรองฉุกเฉิน',
        isGreen: true
      },
      {
        id: 'kpi-5',
        label: 'เอกสารรออนุมัติจ่าย',
        value: '24 ฉบับ',
        badge: '-18%',
        arrow: '↓',
        sub: 'เคลียร์เอกสารแล้ว 82%',
        isGreen: false
      }
    ],
    chart: {
      title: 'Cash Inflow vs Project Outflow',
      sub: 'กระแสเงินสดรับชำระเทียบยอดเบิกจ่ายจัดซื้อรายสัปดาห์',
      legend1: 'เงินรับชำระ (Inflow)',
      legendVal1: '฿18.4M',
      legendBadge1: '+24%',
      legend2: 'ยอดเบิกจ่าย (Outflow)',
      legendVal2: '฿12.1M',
      legendBadge2: '+8%',
      tooltipDay: 'Fri',
      tooltipTime: '14 March ปิดยอด',
      tooltipVal: '฿18.45M รับชำระ',
      days: [
        { day: 'Mon', date: '10 March', sales: 4200, returns: 3100, salesFormatted: '฿4.2M' },
        { day: 'Tue', date: '11 March', sales: 5100, returns: 3400, salesFormatted: '฿5.1M' },
        { day: 'Wed', date: '12 March', sales: 3900, returns: 2800, salesFormatted: '฿3.9M' },
        { day: 'Thu', date: '13 March', sales: 6800, returns: 4100, salesFormatted: '฿6.8M' },
        { day: 'Fri', date: '14 March ปิดยอด', sales: 18450, returns: 12190, salesFormatted: '฿18.45M' },
        { day: 'Sat', date: '15 March', sales: 8200, returns: 2100, salesFormatted: '฿8.2M' },
        { day: 'Sun', date: '16 March', sales: 4500, returns: 1800, salesFormatted: '฿4.5M' }
      ]
    },
    funnel: {
      title: 'Invoice Processing Funnel',
      sub: 'ขั้นตอนการเบิกจ่ายจากใบแจ้งหนี้สู่อนุมัติโอนเงิน',
      conversionRate: '82%',
      conversionBadge: '+12%',
      stages: [
        { name: 'วางบิล', value: 320, percentage: 100 },
        { name: 'ตรวจเอกสาร', value: 290, percentage: 90 },
        { name: 'อนุมัติจ่าย', value: 265, percentage: 82 },
        { name: 'โอนสำเร็จ', value: 250, percentage: 78 }
      ]
    },
    sessions: {
      title: 'Budget Utilization',
      uniqueUsers: '74.2%',
      uniqueLabel: 'ใช้น้อยกว่างบประมาณ',
      totalSessions: '฿24.5M',
      totalLabel: 'งบจัดสรรรวม Q4',
      gaugePercentage: 74
    },
    traffic: {
      title: 'Expense Categories',
      spend: '฿12.19M',
      cpa: '4.8%',
      impressions: '1,280 บิล',
      clicks: '98% ทันกำหนด',
      sources: [
        { name: 'จัดซื้อวัสดุ', count: 6800, color: 'bg-amber-400', widthPercent: 55 },
        { name: 'ค่าจ้างช่าง/แรงงาน', count: 3200, color: 'bg-emerald-500', widthPercent: 26 },
        { name: 'เครื่องจักร/เช่า', count: 1200, color: 'bg-sky-500', widthPercent: 10 },
        { name: 'สาธารณูปโภค', count: 680, color: 'bg-purple-500', widthPercent: 6 },
        { name: 'เบ็ดเตล็ด', count: 310, color: 'bg-pink-400', widthPercent: 3 }
      ]
    },
    regions: {
      title: 'Disbursement by Project Site',
      rows: [
        { region: 'ไซต์เมืองทอง', orders: 48, trend: '↑', isUp: true, revenue: '฿4,850,000' },
        { region: 'ไซต์สำนักงานใหญ่', orders: 32, trend: '↑', isUp: true, revenue: '฿3,240,000' },
        { region: 'ไซต์ภูเก็ต', orders: 28, trend: '↓', isUp: false, revenue: '฿2,680,000' },
        { region: 'ไซต์เชียงใหม่', orders: 16, trend: '↓', isUp: false, revenue: '฿1,420,500' }
      ]
    }
  },

  // 4. ระบบลงเวลา (Time Attendance System)
  attendance: {
    key: 'attendance',
    brand: 'บจก. ฤทธา - ไซต์เมืองทอง',
    title: 'ระบบลงเวลาการทำงาน (Time Attendance)',
    subtitle: 'สถิติการสแกนใบหน้า เข้างานตรงเวลา ขาด ลา มาสาย และโอที',
    kpis: [
      {
        id: 'kpi-1',
        label: 'เข้างานตรงเวลา',
        value: '95.8%',
        badge: '+3.2%',
        arrow: '↑',
        sub: 'จากพนักงานทั้งหมด 650 คน',
        isGreen: true
      },
      {
        id: 'kpi-2',
        label: 'สแกนใบหน้าสำเร็จ',
        value: '642 คน',
        badge: '+99%',
        arrow: '↑',
        sub: 'ผ่าน Face Recognition Gate',
        isGreen: true
      },
      {
        id: 'kpi-3',
        label: 'มาสาย (Late In)',
        value: '18 คน',
        badge: '-45%',
        arrow: '↓',
        sub: 'ลดลงอย่างชัดเจนในสัปดาห์นี้',
        isGreen: false
      },
      {
        id: 'kpi-4',
        label: 'ลางาน / ป่วย / กิจ',
        value: '14 คน',
        badge: '+2%',
        arrow: '↑',
        sub: 'อนุมัติผ่านระบบ HR เรียบร้อย',
        isGreen: true
      },
      {
        id: 'kpi-5',
        label: 'ขาดงาน (Absent)',
        value: '2 คน',
        badge: '-50%',
        arrow: '↓',
        sub: 'ฝ่ายบุคคลดำเนินการติดตามแล้ว',
        isGreen: false
      }
    ],
    chart: {
      title: 'Daily Clock-in / Clock-out Activity',
      sub: 'จำนวนการสแกนเข้างานช่วงเช้าเปรียบเทียบผู้มาสาย',
      legend1: 'สแกนเข้าตรงเวลา',
      legendVal1: '624 คน',
      legendBadge1: '+5%',
      legend2: 'มาสายเกิน 08:30',
      legendVal2: '18 คน',
      legendBadge2: '-45%',
      tooltipDay: 'Fri',
      tooltipTime: '14 March 08:00',
      tooltipVal: '624 คน สแกนเข้า',
      days: [
        { day: 'Mon', date: '10 March', sales: 615, returns: 28, salesFormatted: '615 คน' },
        { day: 'Tue', date: '11 March', sales: 630, returns: 20, salesFormatted: '630 คน' },
        { day: 'Wed', date: '12 March', sales: 620, returns: 22, salesFormatted: '620 คน' },
        { day: 'Thu', date: '13 March', sales: 638, returns: 15, salesFormatted: '638 คน' },
        { day: 'Fri', date: '14 March 08:00', sales: 642, returns: 18, salesFormatted: '642 คน' },
        { day: 'Sat', date: '15 March', sales: 480, returns: 8, salesFormatted: '480 คน' },
        { day: 'Sun', date: '16 March', sales: 210, returns: 4, salesFormatted: '210 คน' }
      ]
    },
    funnel: {
      title: 'Morning Check-in Window (07:00 - 08:30)',
      sub: 'การกระจายตัวของเวลาสแกนนิ้ว/ใบหน้าช่วงเช้า',
      conversionRate: '96%',
      conversionBadge: '+3%',
      stages: [
        { name: 'มาถึงไซต์', value: 650, percentage: 100 },
        { name: 'ตรวจ ATK/เซฟตี้', value: 645, percentage: 99 },
        { name: 'สแกนสำเร็จ', value: 642, percentage: 98 },
        { name: 'เข้าพื้นที่ทำงาน', value: 635, percentage: 97 }
      ]
    },
    sessions: {
      title: 'Today Attendance Rate',
      uniqueUsers: '98.7%',
      uniqueLabel: 'อัตราการเข้าปฏิบัติงาน',
      totalSessions: '650',
      totalLabel: 'พนักงานประจำไซต์',
      gaugePercentage: 98
    },
    traffic: {
      title: 'Clock-in Channels',
      spend: '642 คน',
      cpa: '0.8 วินาที',
      impressions: '1,284 สแกน',
      clicks: '99.9% ถูกต้อง',
      sources: [
        { name: 'กล้อง AI Face Recognition', count: 520, color: 'bg-emerald-500', widthPercent: 81 },
        { name: 'แอปมือถือ GPS Beacon', count: 85, color: 'bg-sky-500', widthPercent: 13 },
        { name: 'เครื่องทาบบัตร RFID', count: 28, color: 'bg-amber-400', widthPercent: 4 },
        { name: 'บันทึกด้วยมือ (หัวหน้างาน)', count: 9, color: 'bg-pink-400', widthPercent: 2 }
      ]
    },
    regions: {
      title: 'Attendance by Team / Zone',
      rows: [
        { region: 'ทีมวิศวกรรมโครงสร้าง', orders: 180, trend: '↑', isUp: true, revenue: '100% ครบ' },
        { region: 'ทีมงานระบบ MEP', orders: 145, trend: '↑', isUp: true, revenue: '98.5% ครบ' },
        { region: 'ทีมสถาปัตยกรรม & ตกแต่ง', orders: 160, trend: '↑', isUp: true, revenue: '97.8% ครบ' },
        { region: 'ฝ่ายความปลอดภัย (Safety)', orders: 42, trend: '↑', isUp: true, revenue: '100% ครบ' }
      ]
    }
  },

  // 5. ระบบ VMS (Visitor Management System)
  vms: {
    key: 'vms',
    brand: 'บจก. ฤทธา - สนง.ใหญ่',
    title: 'ระบบบริหารจัดการผู้มาติดต่อ (Visitor Management)',
    subtitle: 'ตรวจรับบัตร แลกบัตรประชาชน ตรวจสอบประวัติ และจัดการการจราจรเข้า-ออก',
    kpis: [
      {
        id: 'kpi-1',
        label: 'ผู้มาติดต่อทั้งหมดวันนี้',
        value: '1,420 คน',
        badge: '+15%',
        arrow: '↑',
        sub: 'เพิ่มขึ้นจากวันพฤหัสบดี 15%',
        isGreen: true
      },
      {
        id: 'kpi-2',
        label: 'เช็คอินรับบัตรสำเร็จ',
        value: '1,385 คน',
        badge: '+12%',
        arrow: '↑',
        sub: 'ผ่านเกณฑ์ตรวจสอบ 97.5%',
        isGreen: true
      },
      {
        id: 'kpi-3',
        label: 'เวลาแลกบัตรเฉลี่ย',
        value: '1.4 นาที',
        badge: '-32%',
        arrow: '↓',
        sub: 'รวดเร็วกว่าสัปดาห์ก่อน 32%',
        isGreen: true
      },
      {
        id: 'kpi-4',
        label: 'กำลังอยู่ในพื้นที่อาคาร',
        value: '84 คน',
        badge: '+4%',
        arrow: '↑',
        sub: 'อาคาร A (52 คน), อาคาร B (32 คน)',
        isGreen: true
      },
      {
        id: 'kpi-5',
        label: 'ยานพาหนะผ่านเข้า-ออก',
        value: '428 คัน',
        badge: '+8%',
        arrow: '↑',
        sub: 'อ่านป้ายทะเบียนอัตโนมัติ (LPR)',
        isGreen: true
      }
    ],
    chart: {
      title: 'Visitor Check-in vs Check-out Volume',
      sub: 'สถิติการเข้าและออกจากอาคารรายชั่วโมง',
      legend1: 'เช็คอิน (เข้า)',
      legendVal1: '1,385 คน',
      legendBadge1: '+15%',
      legend2: 'เช็คเอาท์ (ออก)',
      legendVal2: '1,301 คน',
      legendBadge2: '+10%',
      tooltipDay: 'Fri',
      tooltipTime: '14 March 14:30',
      tooltipVal: '1,385 ผู้ติดต่อ',
      days: [
        { day: 'Mon', date: '10 March', sales: 980, returns: 920, salesFormatted: '980 คน' },
        { day: 'Tue', date: '11 March', sales: 1150, returns: 1080, salesFormatted: '1,150 คน' },
        { day: 'Wed', date: '12 March', sales: 1220, returns: 1140, salesFormatted: '1,220 คน' },
        { day: 'Thu', date: '13 March', sales: 1290, returns: 1210, salesFormatted: '1,290 คน' },
        { day: 'Fri', date: '14 March 14:30', sales: 1385, returns: 1301, salesFormatted: '1,385 คน' },
        { day: 'Sat', date: '15 March', sales: 420, returns: 405, salesFormatted: '420 คน' },
        { day: 'Sun', date: '16 March', sales: 180, returns: 175, salesFormatted: '180 คน' }
      ]
    },
    funnel: {
      title: 'Visitor Processing Flow',
      sub: 'ขั้นตอนการคัดกรองตั้งแต่หน้าป้อมรปภ. จนถึงพบผู้รับการติดต่อ',
      conversionRate: '97%',
      conversionBadge: '+4%',
      stages: [
        { name: 'มาถึงทางเข้า', value: 1420, percentage: 100 },
        { name: 'สแกนบัตร ปชช.', value: 1410, percentage: 99 },
        { name: 'ออกบัตร Smart Card', value: 1385, percentage: 97 },
        { name: 'สแกนเข้าประตู Lobby', value: 1378, percentage: 97 }
      ]
    },
    sessions: {
      title: 'Active Building Occupancy',
      uniqueUsers: '84 คน',
      uniqueLabel: 'ผู้ติดต่อปัจจุบันในอาคาร',
      totalSessions: '1,420',
      totalLabel: 'ผู้ติดต่อสะสมวันนี้',
      gaugePercentage: 62
    },
    traffic: {
      title: 'Visitor Purpose Types',
      spend: '1,385 คน',
      cpa: '1.4 นาที',
      impressions: '428 คัน',
      clicks: '0 เหตุการณ์',
      sources: [
        { name: 'ติดต่อธุรกิจ/ประชุม', count: 680, color: 'bg-emerald-500', widthPercent: 49 },
        { name: 'ส่งพัสดุ/สินค้า', count: 390, color: 'bg-sky-500', widthPercent: 28 },
        { name: 'ผู้รับเหมาช่วง (Subcontractor)', count: 210, color: 'bg-amber-400', widthPercent: 15 },
        { name: 'สมัครงาน/สัมภาษณ์', count: 75, color: 'bg-purple-500', widthPercent: 5 },
        { name: 'อื่น ๆ', count: 30, color: 'bg-pink-400', widthPercent: 3 }
      ]
    },
    regions: {
      title: 'Visitors by Destination Building',
      rows: [
        { region: 'อาคาร A - สนง. บริหารชั้น 1-12', orders: 620, trend: '↑', isUp: true, revenue: '98% ปกติ' },
        { region: 'อาคาร B - ศูนย์วิศวกรรม & QC', orders: 480, trend: '↑', isUp: true, revenue: '99% ปกติ' },
        { region: 'คลังสินค้า & สโตร์กลาง', orders: 240, trend: '↑', isUp: true, revenue: '100% ปกติ' },
        { region: 'ศูนย์ฝึกอบรมพนักงาน', orders: 80, trend: '↓', isUp: false, revenue: '100% ปกติ' }
      ]
    }
  },

  // 6. ระบบ HR (Human Resources System)
  hr: {
    key: 'hr',
    brand: 'บจก. ฤทธา - ทรัพยากรบุคคล',
    title: 'ระบบบริหารทรัพยากรบุคคล (HR Management)',
    subtitle: 'ข้อมูลอัตรากำลังพล การสรรหาบุคลากร การฝึกอบรม และสวัสดิการ',
    kpis: [
      {
        id: 'kpi-1',
        label: 'จำนวนพนักงานทั้งหมด',
        value: '1,250 คน',
        badge: '+4.2%',
        arrow: '↑',
        sub: 'ประจำสำนักงานและไซต์งานก่อสร้าง',
        isGreen: true
      },
      {
        id: 'kpi-2',
        label: 'พนักงานบรรจุใหม่',
        value: '38 คน',
        badge: '+18%',
        arrow: '↑',
        sub: 'ผ่านการทดลองงาน 95%',
        isGreen: true
      },
      {
        id: 'kpi-3',
        label: 'อัตราการลาออก (Turnover)',
        value: '1.8%',
        badge: '-25%',
        arrow: '↓',
        sub: 'ต่ำกว่าเกณฑ์เฉลี่ยอุตสาหกรรม (3.5%)',
        isGreen: false
      },
      {
        id: 'kpi-4',
        label: 'อบรมความปลอดภัยผ่าน',
        value: '98.5%',
        badge: '+2%',
        arrow: '↑',
        sub: 'Safety First Certification',
        isGreen: true
      },
      {
        id: 'kpi-5',
        label: 'ตำแหน่งเปิดรับสมัคร',
        value: '18 อัตรา',
        badge: '+5',
        arrow: '↑',
        sub: 'วิศวกรโยธา โฟร์แมน และจัดซื้อ',
        isGreen: true
      }
    ],
    chart: {
      title: 'Talent Acquisition & Employee Growth',
      sub: 'สถิติการรับพนักงานใหม่เปรียบเทียบการโอนย้ายไซต์งาน',
      legend1: 'บรรจุใหม่',
      legendVal1: '38 คน',
      legendBadge1: '+18%',
      legend2: 'ลาออก/โอนย้าย',
      legendVal2: '6 คน',
      legendBadge2: '-25%',
      tooltipDay: 'Fri',
      tooltipTime: '14 March สรุปประจำเดือน',
      tooltipVal: '38 พนักงานใหม่',
      days: [
        { day: 'Mon', date: '10 March', sales: 12, returns: 1, salesFormatted: '12 คน' },
        { day: 'Tue', date: '11 March', sales: 18, returns: 2, salesFormatted: '18 คน' },
        { day: 'Wed', date: '12 March', sales: 24, returns: 1, salesFormatted: '24 คน' },
        { day: 'Thu', date: '13 March', sales: 30, returns: 3, salesFormatted: '30 คน' },
        { day: 'Fri', date: '14 March สรุป', sales: 38, returns: 6, salesFormatted: '38 คน' },
        { day: 'Sat', date: '15 March', sales: 8, returns: 0, salesFormatted: '8 คน' },
        { day: 'Sun', date: '16 March', sales: 4, returns: 0, salesFormatted: '4 คน' }
      ]
    },
    funnel: {
      title: 'Recruitment & Onboarding Pipeline',
      sub: 'ขั้นตอนการคัดเลือกบุคลากรจากผู้สมัครถึงบรรจุงาน',
      conversionRate: '12%',
      conversionBadge: '+4%',
      stages: [
        { name: 'ผู้สมัคร', value: 320, percentage: 100 },
        { name: 'สัมภาษณ์รอบแรก', value: 120, percentage: 38 },
        { name: 'ทดสอบทักษะช่าง', value: 65, percentage: 20 },
        { name: 'บรรจุเข้าทำงาน', value: 38, percentage: 12 }
      ]
    },
    sessions: {
      title: 'Employee Retention Rate',
      uniqueUsers: '96.4%',
      uniqueLabel: 'อัตราความภักดีองค์กร',
      totalSessions: '1,250',
      totalLabel: 'พนักงานทั้งองค์กร',
      gaugePercentage: 96
    },
    traffic: {
      title: 'Headcount by Department',
      spend: '1,250 คน',
      cpa: '96.4%',
      impressions: '18 ตำแหน่ง',
      clicks: '+48 eNPS',
      sources: [
        { name: 'วิศวกรรมโยธา & ไซต์', count: 680, color: 'bg-emerald-500', widthPercent: 54 },
        { name: 'ช่างเทคนิค & MEP', count: 310, color: 'bg-sky-500', widthPercent: 25 },
        { name: 'บริหาร & สนง.ใหญ่', count: 140, color: 'bg-amber-400', widthPercent: 11 },
        { name: 'ความปลอดภัย & QC', count: 85, color: 'bg-purple-500', widthPercent: 7 },
        { name: 'จัดซื้อ & คลังสินค้า', count: 35, color: 'bg-pink-400', widthPercent: 3 }
      ]
    },
    regions: {
      title: 'Staffing by Construction Site',
      rows: [
        { region: 'ไซต์เมืองทองธานี', orders: 420, trend: '↑', isUp: true, revenue: '100% ครบอัตรา' },
        { region: 'ไซต์สำนักงานใหญ่', orders: 360, trend: '↑', isUp: true, revenue: '98% ครบอัตรา' },
        { region: 'ไซต์ภูเก็ตวิลล่า', orders: 280, trend: '↑', isUp: true, revenue: '96% ครบอัตรา' },
        { region: 'ไซต์เชียงใหม่เมโทร', orders: 190, trend: '↓', isUp: false, revenue: 'ขาด 5 อัตรา' }
      ]
    }
  }
};
