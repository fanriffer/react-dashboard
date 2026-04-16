export const depositsMock = {
  branch: "นาทวี",
  year: 2567,
  type: "เงินฝากวาดีอะห์(ออมทรัพย์)",

  // KPI (เหมือนหน้า รวม)
  totalDepM: 666953,      // เงินฝากรวม (M)
  inMonthM: 90593,        // ฝากเดือนนี้ (M)
  outMonthM: 51785,       // ถอนเดือนนี้ (M)
  netMonthM: 38810,        // สุทธิเดือนนี้ (M)

  // table รายเดือน (ไว้ใส่ของจริง/ต่อ API)
  rows: [
  { month: "ม.ค.", in: 54125, out: 23548, balance: 30577 },
  { month: "ก.พ.", in: 25581, out: 11584, balance: 13997 },
  { month: "มี.ค.", in: 34488, out: 12587, balance: 21901 },
  { month: "เม.ย.", in: 75585, out: 35849, balance: 39736 },
  { month: "พ.ค.", in: 23515, out: 10856, balance: 12659 },
  { month: "มิ.ย.", in: 82545, out: 44851, balance: 37694 },
  { month: "ก.ค.", in: 63458, out: 29458, balance: 34000 },
  { month: "ส.ค.", in: 75541, out: 19584, balance: 55957 },
  { month: "ก.ย.", in: 36587, out: 20563, balance: 16024 },
  { month: "ต.ค.", in: 45782, out: 25463, balance: 20319 },
  { month: "พ.ย.", in: 59151, out: 30789, balance: 28362 },
  { month: "ธ.ค.", in: 90595, out: 51785, balance: 38810 },
  ],

  // chart data (recharts)
  chart: [
  { month: "ม.ค.", in: 54125, out: 23548, balance: 30577 },
  { month: "ก.พ.", in: 25581, out: 11584, balance: 13997 },
  { month: "มี.ค.", in: 34488, out: 12587, balance: 21901 },
  { month: "เม.ย.", in: 75585, out: 35849, balance: 39736 },
  { month: "พ.ค.", in: 23515, out: 10856, balance: 12659 },
  { month: "มิ.ย.", in: 82545, out: 44851, balance: 37694 },
  { month: "ก.ค.", in: 63458, out: 29458, balance: 34000 },
  { month: "ส.ค.", in: 75541, out: 19584, balance: 55957 },
  { month: "ก.ย.", in: 36587, out: 20563, balance: 16024 },
  { month: "ต.ค.", in: 45782, out: 25463, balance: 20319 },
  { month: "พ.ย.", in: 59151, out: 30789, balance: 28362 },
  { month: "ธ.ค.", in: 90595, out: 51785, balance: 38810 },
  ],
}
