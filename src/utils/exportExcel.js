import * as XLSX from "xlsx"

/* ===============================
   EXPORT : DEPOSITS
   =============================== */
export function exportDepositsToExcel({ rows, branch, year, type }) {
  const sheetRows = rows.map((r) => ({
    เดือน: r.month,
    ฝาก: r.in,
    ถอน: r.out,
    คงเหลือ: r.balance,
  }))

  const ws = XLSX.utils.json_to_sheet(sheetRows)

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "สรุปเงินฝาก")

  const filename = `เงินฝาก_${branch}_${year}.xlsx`
  XLSX.writeFile(wb, filename)
}

/* ===============================
   EXPORT : PLANS
   =============================== */
export function exportPlansToExcel({
  rows,
  monthlyChart,
  cumulativeChart,
  branch,
  year,
}) {
  // ตารางสรุป
  const sheetRows = rows.map((r) => ({
    เดือน: r.month,
    แผนงาน: r.plan,
    ผลงานจริง: r.actual,
    ต่างจากแผน: r.variance,
    ความสำเร็จเปอร์เซ็นต์: Number(r.achievementPct.toFixed(1)),
  }))

  // กราฟรายเดือน
  const sheetMonthly = monthlyChart.map((m) => ({
    เดือน: m.month,
    แผนงาน: m.plan,
    ผลงานจริง: m.actual,
  }))

  // กราฟสะสม
  const sheetCumulative = cumulativeChart.map((c) => ({
    เดือน: c.month,
    แผนสะสม: c.planCum,
    ผลงานจริงสะสม: c.actualCum,
  }))

  const wb = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(sheetRows),
    "ตารางสรุป"
  )

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(sheetMonthly),
    "รายเดือน(เทียบแผน)"
  )

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(sheetCumulative),
    "สะสม(เทียบแผน)"
  )

  const filename = `แผนงาน_${branch}_${year}.xlsx`
  XLSX.writeFile(wb, filename)
}

export function exportFinanceStatementToExcel({
  rows,
  filename = "งบสถานะการเงิน.xlsx",
}) {
  const sheetRows = rows.map((r) => ({
    รายการ: r.label,
    "2566": r.y2566,
    "2567": r.y2567,
    "2568": r.y2568,
  }))

  const ws = XLSX.utils.json_to_sheet(sheetRows)

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "งบสถานะการเงิน")

  XLSX.writeFile(wb, filename)
}

export function exportFinanceProfitToExcel({
  rows,
  filename = "งบกำไรขาดทุน.xlsx",
}) {
  const sheetRows = rows.map((r) => ({
    รายการ: r.label,
    "2566": r.y2566,
    "2567": r.y2567,
    "2568": r.y2568,
  }))

  const ws = XLSX.utils.json_to_sheet(sheetRows)

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "งบกำไรขาดทุน")

  XLSX.writeFile(wb, filename)
}
