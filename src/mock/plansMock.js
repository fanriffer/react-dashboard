const calcRow = (plan, actual) => {
  const variance = actual - plan
  const achievementPct = (actual / plan) * 100

  return { plan, actual, variance, achievementPct }
}

const plansMock = {
  branch: "นาทวี",
  year: 2567,
  type: "เงินฝากวาดีอะห์(ออมทรัพย์)",

  planTotal: 1840.47,
  planActual: 1638.45,
  planVariance: -202.022,
  planAchievementPct: 89.0,

  monthlyChart: [
    { month: "ม.ค.", plan: 150.0, actual: 142.0 },
    { month: "ก.พ.", plan: 150.0, actual: 148.5 },
    { month: "มี.ค.", plan: 150.0, actual: 155.2 },
    { month: "เม.ย.", plan: 150.0, actual: 146.3 },
    { month: "พ.ค.", plan: 150.0, actual: 158.4 },
    { month: "มิ.ย.", plan: 150.0, actual: 140.6 },
    { month: "ก.ค.", plan: 150.0, actual: 149.1 },
    { month: "ส.ค.", plan: 150.0, actual: 160.8 },
    { month: "ก.ย.", plan: 150.0, actual: 137.2 },
    { month: "ต.ค.", plan: 150.0, actual: 141.5 },
    { month: "พ.ย.", plan: 150.0, actual: 146.25 },
    { month: "ธ.ค.", plan: 190.0, actual: 112.6 },
  ],

  cumulativeChart: [
    { month: "ม.ค.", planCum: 150.0, actualCum: 142.0 },
    { month: "ก.พ.", planCum: 300.0, actualCum: 290.5 },
    { month: "มี.ค.", planCum: 450.0, actualCum: 445.7 },
    { month: "เม.ย.", planCum: 600.0, actualCum: 592.0 },
    { month: "พ.ค.", planCum: 750.0, actualCum: 750.4 },
    { month: "มิ.ย.", planCum: 900.0, actualCum: 891.0 },
    { month: "ก.ค.", planCum: 1050.0, actualCum: 1040.1 },
    { month: "ส.ค.", planCum: 1200.0, actualCum: 1200.9 },
    { month: "ก.ย.", planCum: 1350.0, actualCum: 1338.1 },
    { month: "ต.ค.", planCum: 1500.0, actualCum: 1479.6 },
    { month: "พ.ย.", planCum: 1650.0, actualCum: 1625.85 },
    { month: "ธ.ค.", planCum: 1840.47, actualCum: 1638.45 },
  ],

  rows: [],
}

plansMock.rows = plansMock.monthlyChart.map((m) => ({
  month: m.month,
  ...calcRow(m.plan, m.actual),
}))

export { plansMock }
