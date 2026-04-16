import { useMemo, useState } from "react"
import { FiDownload, FiChevronDown } from "react-icons/fi"
import { FaDollarSign } from "react-icons/fa"
import { useRef } from "react"
import { toJpeg } from "html-to-image"
import { exportDepositsToExcel } from "../utils/exportExcel"

import PageShell from "../components/PageShell"
import StatKpiCard from "../components/StatKpiCard"
import DepositMonthlyChart from "../components/DepositMonthlyChart"
import { depositsMock } from "../mock/depositsMock"





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
      <span className="max-w-[220px] truncate ">{value}</span>
      <FiChevronDown className="opacity-70 text-lg " />
    </button>
  )
}

function Card({ title, children, onExport }) {
  return (
    <div
      className="
        rounded-3xl border border-slate-200/60
        bg-white/70 dark:bg-slate-900/55 backdrop-blur
        shadow-[0_18px_50px_rgba(2,6,23,0.10)]
      "
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/50 dark:border-slate-700/50">
        <div>
          <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">{title}</h3>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">ข้อมูลตัวอย่าง (จะเชื่อม API ทีหลัง)</p>
        </div>

        <button
          onClick={onExport}
          className="
            inline-flex items-center gap-2 rounded-xl
            border border-slate-200/70 bg-white/80
            px-4 py-2 text-sm font-bold text-slate-700
            shadow-sm hover:shadow-md hover:bg-white transition-all
            dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-yellow-500
          "
        >
          <FiDownload className="text-base" />
          Export
        </button>
      </div>

      <div className="p-6">{children}</div>
    </div>
  )
}

export default function Deposits() {
  // ✅ ตอนนี้ใช้ mock ก่อน
  const data = depositsMock

  // mock state ไว้ทำ dropdown ต่อ
  const [branch] = useState(data.branch)
  const [year] = useState(String(data.year))
  const [type] = useState(data.type)

  // ✅ KPI (ไว้ทำให้ UI เร็ว และอนาคต API ส่งมาก็แทนได้)
  const kpi = useMemo(
    () => ({
      total: data.totalDepM,
      inM: data.inMonthM,
      outM: data.outMonthM,
      netM: data.netMonthM,
    }),
    [data]
  )
const chartRef = useRef(null)

const handleExportChart = async () => {
  if (!chartRef.current) return

  const isDark = document.documentElement.classList.contains("dark")

  try {
    const dataUrl = await toJpeg(chartRef.current, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: isDark ? "#0b2233" : "#fff8dc",
    })

    const link = document.createElement("a")
    link.download = "deposit-chart.jpg"
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

        {/* KPI row (เหมือนหน้า รวม) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatKpiCard title="เงินฝากรวม" value={kpi.total} unit="" accent="sky" icon={FaDollarSign} />
          <StatKpiCard title="ฝากเดือนนี้" value={kpi.inM} unit="บาท" accent="emerald" icon={FaDollarSign} />
          <StatKpiCard title="ถอนเดือนนี้" value={kpi.outM} unit="บาท" accent="rose" icon={FaDollarSign} />
          <StatKpiCard title="สุทธิเดือนนี้" value={kpi.netM} unit="บาท" accent="amber" icon={FaDollarSign} />
        </div>

        {/* Table + Chart */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card title="สรุปเงินฝากรายเดือน" onExport={() => exportDepositsToExcel({
                        rows: data.rows,
                        branch: data.branch,
                        year: data.year,
                        type: data.type,})}>

            <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 dark:border-slate-700/50 dark:bg-slate-900/40">
              <div className=" flex items-center justify-center text-slate-400 dark:text-slate-500">
                
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-white/90 backdrop-blur dark:bg-slate-900/90">
          <tr className="text-slate-600 dark:text-slate-300">
            <th className="px-4 py-3 text-left font-extrabold">เดือน</th>
            <th className="px-4 py-3 text-right font-extrabold">ฝาก</th>
            <th className="px-4 py-3 text-right font-extrabold">ถอน</th>
            <th className="px-4 py-3 text-right font-extrabold">คงเหลือ</th>
          </tr>
        </thead>

        <tbody>
          {data.rows.map((r) => (
            <tr
              key={r.month}
              className="border-t border-slate-200/60 dark:border-slate-700/50 text-slate-800 dark:text-slate-100"
            >
              <td className="px-4 py-3 font-semibold">{r.month}</td>
              <td className="px-4 py-3 text-right">{r.in.toLocaleString()}</td>
              <td className="px-4 py-3 text-right">{r.out.toLocaleString()}</td>
              <td className="px-4 py-3 text-right font-bold">{r.balance.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
              </div>
            </div>
          </Card>
    <Card title="สรุปเงินฝากรายเดือน" onExport={handleExportChart}>
                          
      <div
         ref={chartRef}
           className="rounded-2xl border border-orange-200/50
             bg-gradient-to-br from-[#fff8dc] to-[#fff3cf]/50 p-5
             dark:border-slate-700/40
             dark:bg-gradient-to-br dark:from-[#0b2233] dark:to-[#102B3F]">
        <div className="min-w-0 w-full h-[540px]">
      <DepositMonthlyChart data={data.chart} />
    </div>
  </div>
</Card>
        </div>
      </div>
    </PageShell>
  )
}
