import { useMemo, useState, useRef } from "react"
import { FiDownload, FiChevronDown } from "react-icons/fi"
import { toJpeg } from "html-to-image"
import { FaDollarSign } from "react-icons/fa"
import { HiChartBar } from "react-icons/hi2"

import PageShell from "../components/PageShell"
import StatKpiCard from "../components/StatKpiCard"
import PlanMonthlyChart from "../components/PlanMonthlyChart"
import PlanCumulativeChart from "../components/PlanCumulativeChart"

import { plansMock } from "../mock/plansMock"
import { exportPlansToExcel } from "../utils/exportExcel"


function FilterPill({ label, value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        inline-flex items-center gap-2
        rounded-full border border-orange-200/80 bg-gradient-to-r from-[#fff3cf]/90 to-[#ffe7a6]/80
        px-5 py-2.5 text-sm font-bold text-slate-700
        shadow-md backdrop-blur-sm
        hover:shadow-lg hover:scale-[1.02] transition-all duration-300
        dark:border-slate-600/70 dark:bg-gradient-to-r dark:from-slate-800/80 dark:to-slate-700/80 dark:text-slate-100 
      "
    >
      <span className="text-slate-500 dark:text-slate-400 font-semibold">{label}</span>
      <span className="max-w-[220px] truncate">{value}</span>
      <FiChevronDown className="opacity-70 text-lg" />
    </button>
  )
}

export default function Plans() {
  const data = plansMock
  const rows = data.rows

  const [branch] = useState(data.branch)
  const [year] = useState(String(data.year))
  const [type] = useState(data.type)

  // ✅ kpi รวมไว้แบบเดียวกับหน้าก่อน ๆ (รองรับ API ง่าย)
  const kpi = useMemo(
    () => ({
      planTotal: data.planTotal,
      planActual: data.planActual,
      variance: data.planVariance,
      achievement: data.planAchievementPct,
    }),[data])

const monthlyChartRef = useRef(null)
const cumulativeChartRef = useRef(null)


const handleExportMonthlyChart = async () => {
  if (!monthlyChartRef.current) return

  const isDark = document.documentElement.classList.contains("dark")

  try {
    const dataUrl = await toJpeg(monthlyChartRef.current, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: isDark ? "#0b2233" : "#fff8dc",
    })

    const link = document.createElement("a")
    link.download = `plans-monthly_${branch}_${year}.jpg`
    link.href = dataUrl
    link.click()
  } catch (err) {
    console.error("Export failed:", err)
  }
}

const handleExportCumulativeChart = async () => {
  if (!cumulativeChartRef.current) return

  const isDark = document.documentElement.classList.contains("dark")

  try {
    const dataUrl = await toJpeg(cumulativeChartRef.current, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: isDark ? "#0b2233" : "#fff8dc",
    })

    const link = document.createElement("a")
    link.download = `plans-cumulative_${branch}_${year}.jpg`
    link.href = dataUrl
    link.click()
  } catch (err) {
    console.error("Export failed:", err)
  }
}

  return (
    <PageShell>
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <FilterPill label="สาขา" value={branch} onClick={() => {}} />
          <FilterPill label="ปี" value={year} onClick={() => {}} />
          <FilterPill label="ประเภท" value={type} onClick={() => {}} />
        </div>

        {/* ✅ KPI Cards (ทำก่อน) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatKpiCard
            title="แผนงานรวม"
            value={kpi.planTotal}
            unit="ล้านบาท"
            accent="sky"
            icon={FaDollarSign}
          />
          <StatKpiCard
            title="ผลงานจริง"
            value={kpi.planActual}
            unit="ล้านบาท"
            accent="emerald"
            icon={FaDollarSign}
          />
          <StatKpiCard
            title="ต่างจากแผน"
            value={kpi.variance }
            unit="ล้านบาท"
            accent="rose"
            icon={FaDollarSign}
            valueClassName={kpi.variance < 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}

          />
          <StatKpiCard
            title="ความสำเร็จ"
            value={kpi.achievement}
            unit="%"
            accent="amber"
            icon={HiChartBar}
          />
        </div>

        {/* ✅ Charts layout (ยังไม่ใส่กราฟจริง แค่จัดหน้าให้เหมือนภาพ) */}
<div className="grid grid-cols-1 gap-6">
  {/* กราฟบน */}
  <div className="relative rounded-3xl border border-slate-200/60 bg-white/70 dark:bg-slate-900/55 backdrop-blur
    shadow-[0_18px_50px_rgba(2,6,23,0.10)]">
    <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/50 dark:border-slate-700/50">
<button
  onClick={handleExportMonthlyChart}
  className="
    inline-flex items-center gap-2 rounded-xl
    border border-slate-200/70 bg-white/80
    px-5 py-2 text-sm font-bold text-slate-700
    shadow-sm hover:shadow-md hover:bg-white transition-all
    dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-yellow-500">
  <FiDownload className="text-base" /> Export
</button>
      <div> 
        <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">
          ผลงานรายเดือน (เทียบแผน)
        </h3>
        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          ข้อมูลตัวอย่าง (จะเชื่อม API ทีหลัง)
        </p>
      </div>
    </div>

    <div className="p-6">
      <div 
      ref={monthlyChartRef}
      className="rounded-2xl border border-orange-200/50 bg-gradient-to-br from-[#fff8dc] to-[#fff3cf]/50 p-5
        dark:border-slate-700/40 dark:bg-gradient-to-br dark:from-[#0b2233] dark:to-[#102B3F]">
        <div className="w-full h-[360px] min-w-0 grid place-items-center text-slate-500 dark:text-slate-300">
          <PlanMonthlyChart data={data.monthlyChart} />
        </div>
      </div>
    </div>
  </div>

  {/* กราฟล่าง */}
  <div className="reletive rounded-3xl border border-slate-200/60 bg-white/70 dark:bg-slate-900/55 backdrop-blur
    shadow-[0_18px_50px_rgba(2,6,23,0.10)]">
    <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/50 dark:border-slate-700/50">
    
<button
  onClick={handleExportCumulativeChart}
  className="
    inline-flex items-center gap-2 rounded-xl
    border border-slate-200/70 bg-white/80
    px-5 py-2 text-sm font-bold text-slate-700
    shadow-sm hover:shadow-md hover:bg-white transition-all
    dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-yellow-500">
  <FiDownload className="text-base" /> Export
</button>
      <div>
        <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">
          ยอดคงเหลือสะสม (เทียบแผน)
        </h3>
        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          ข้อมูลตัวอย่าง (จะเชื่อม API ทีหลัง)
        </p>
      </div>
    </div>

    <div className="p-6">
      <div
       ref={cumulativeChartRef}
       className="rounded-2xl border border-orange-200/50 bg-gradient-to-br from-[#fff8dc] to-[#fff3cf]/50 p-5
        dark:border-slate-700/40 dark:bg-gradient-to-br dark:from-[#0b2233] dark:to-[#102B3F]">
        <div className="w-full h-[360px] min-w-0 grid place-items-center text-slate-500 dark:text-slate-300">
          <PlanCumulativeChart data={data.cumulativeChart}/>
        </div>
      </div>
    </div>
  </div>
  {/* ตาราง */}
<div className="rounded-3xl border border-slate-200/60 bg-white/70 dark:bg-slate-900/55 backdrop-blur
  shadow-[0_18px_50px_rgba(2,6,23,0.10)]">
  <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/50 dark:border-slate-700/50">
  <button className=" inline-flex items-center gap-2 rounded-xl
    border border-slate-200/70 bg-white/80
    px-5 py-2 text-sm font-bold text-slate-700
    shadow-sm hover:shadow-md hover:bg-white transition-all
    dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-yellow-500"
  onClick={() =>
    exportPlansToExcel({
      rows: data.rows,
      monthlyChart: data.monthlyChart,
      cumulativeChart: data.cumulativeChart,
      branch: data.branch,
      year: data.year,
      type: data.type,
    })
  }
>
  Export
</button>
    <div>
      <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">
        ตารางสรุปแผนงานรายเดือน
      </h3>
    </div>
  </div>

  <div className="p-6">
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 dark:border-slate-700/50 dark:bg-slate-900/40">
      <table className="w-full text-sm">
        <thead className="bg-[#fde7bf]/70 dark:bg-slate-900/80">
          <tr className="text-slate-700 dark:text-slate-200">
            <th className="px-4 py-3 text-left font-extrabold">เดือน</th>
            <th className="px-4 py-3 text-right font-extrabold">แผนงาน</th>
            <th className="px-4 py-3 text-right font-extrabold">ผลงานจริง</th>
            <th className="px-4 py-3 text-right font-extrabold">ต่างจากแผน</th>
            <th className="px-4 py-3 text-right font-extrabold">ความสำเร็จ %</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr key={r.month} className="border-t border-slate-200/60 dark:border-slate-700/50">
              <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">{r.month}</td>

              <td className="px-4 py-3 text-right text-slate-800 dark:text-slate-100">
                {r.plan.toFixed(2)}
              </td>

              <td className="px-4 py-3 text-right text-slate-800 dark:text-slate-100">
                {r.actual.toFixed(2)}
              </td>

              <td
                className={[
                  "px-4 py-3 text-right font-bold",
                  r.variance < 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400",
                ].join(" ")}
              >
                {r.variance >= 0 ? `+${r.variance.toFixed(2)}` : r.variance.toFixed(2)}
              </td>

              <td className="px-4 py-3 text-right text-slate-800 dark:text-slate-100">
                {r.achievementPct.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

</div>

      </div>
    </PageShell>
  )
}
