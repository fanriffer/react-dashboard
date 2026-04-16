import { useEffect, useMemo, useRef, useState } from "react"
import { toJpeg } from "html-to-image"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LabelList,
} from "recharts"

const fmt = (n) =>
  typeof n === "number"
    ? n.toLocaleString("th-TH", { maximumFractionDigits: 2 })
    : "—"

export default function FinanceProfitChart({
  data = [],
  unit = "ล้านบาท",
  title = "งบกำไรขาดทุน",
}) {
  const wrapRef = useRef(null)

  // ✅ ทำให้ component รู้ทันทีว่า <html class="dark"> เปลี่ยนแล้ว
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  )

  useEffect(() => {
    const el = document.documentElement
    const obs = new MutationObserver(() => {
      setIsDark(el.classList.contains("dark"))
    })
    obs.observe(el, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])

  // ✅ สีธีม Figma
  const COLORS = useMemo(
    () => ({
      y2566: "#6BCB77", // เขียว
      y2567: "#D97B7B", // ชมพู/แดง
      y2568: "#F2D15C", // เหลือง
    }),
    []
  )

  // ✅ สีแกน/เส้น/ตัวเลข รองรับ light/dark
  const axisTick = isDark ? "rgba(255,255,255,0.72)" : "rgba(15,23,42,0.70)"
  const axisLine = isDark ? "rgba(255,255,255,0.18)" : "rgba(15,23,42,0.18)"
  const gridStroke = isDark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.10)"
  const labelFill = isDark ? "rgba(255,255,255,0.88)" : "rgba(15,23,42,0.78)"

  // ✅ ปุ่ม Export JPG
  const handleDownload = async () => {
    if (!wrapRef.current) return
    const nowDark = document.documentElement.classList.contains("dark")

    try {
      const dataUrl = await toJpeg(wrapRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: nowDark ? "#0b2233" : "#ffffff",
        fontEmbedCSS: "",
      })

      const link = document.createElement("a")
      link.download = "finance-statement.jpg"
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error("Download failed:", err)
    }
  }

  return (
    <div
      className="
        rounded-[28px]
        bg-white dark:bg-slate-900
        shadow-[0_18px_55px_rgba(2,6,23,0.10)]
        p-4 sm:p-6
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <button
          onClick={handleDownload}
          className="
            text-sm px-4 py-2 rounded-xl
            border-2 border-orange-300 dark:border-blue-400
            font-semibold
            hover:bg-orange-50 dark:hover:bg-slate-800
            transition-all duration-300 hover:shadow-lg
          "
        >
          ดาวน์โหลด JPG
        </button>

        <div className="flex-1 text-center">
          <div className="text-base font-semibold text-slate-700 dark:text-white">
            {title}
          </div>

          {/* Legend แบบ dot เหมือน Figma */}
          <div className="mt-2 flex items-center justify-center gap-5 text-sm">
            <span className="flex items-center gap-2 text-slate-600 dark:text-white/70">
              <span className="h-3 w-3 rounded-full" style={{ background: COLORS.y2566 }} />
              2566
            </span>
            <span className="flex items-center gap-2 text-slate-600 dark:text-white/70">
              <span className="h-3 w-3 rounded-full" style={{ background: COLORS.y2567 }} />
              2567
            </span>
            <span className="flex items-center gap-2 text-slate-600 dark:text-white/70">
              <span className="h-3 w-3 rounded-full" style={{ background: COLORS.y2568 }} />
              2568
            </span>
          </div>
        </div>

        <div className="text-sm text-slate-600 dark:text-white/70 whitespace-nowrap">
          หน่วย : {unit}
        </div>
      </div>

      {/* Chart Area (ตรงนี้จะถูก export เป็น JPG) */}
      <div ref={wrapRef} className="mt-10">
        <div className="h-[260px] sm:h-[260px] w-full">
          {/* ✅ key บังคับให้ recharts redraw ตอน isDark เปลี่ยน */}
          <ResponsiveContainer key={isDark ? "dark" : "light"} width="100%" height="100%">
            <BarChart
              data={data}
              barCategoryGap={70}
              margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />

              <XAxis
                dataKey="label"
                tick={{ fill: axisTick, fontSize: 12 }}
                axisLine={{ stroke: axisLine }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: axisTick, fontSize: 12 }}
                axisLine={{ stroke: axisLine }}
                tickLine={false}
              />

              <Tooltip
                formatter={(v) => [fmt(v), unit]}
                contentStyle={{
                  borderRadius: 12,
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.12)"}`,
                  background: isDark ? "rgba(2,6,23,0.92)" : "rgba(255,255,255,0.97)",
                  color: isDark ? "white" : "rgba(15,23,42,0.92)",
                }}
                labelStyle={{ color: isDark ? "rgba(255,255,255,0.85)" : "rgba(15,23,42,0.75)" }}
              />

              {/* ซ่อน Legend ของ recharts เพราะเราทำเองด้านบน */}
              <Legend wrapperStyle={{ display: "none" }} />

              <Bar dataKey="y2566" fill={COLORS.y2566} radius={[12, 12, 0, 0]}>
                <LabelList
                  dataKey="y2566"
                  position="top"
                  formatter={(v) => fmt(v)}
                  style={{ fill: labelFill, fontSize: 11, fontWeight: 700 }}
                />
              </Bar>

              <Bar dataKey="y2567" fill={COLORS.y2567} radius={[12, 12, 0, 0]}>
                <LabelList
                  dataKey="y2567"
                  position="top"
                  formatter={(v) => fmt(v)}
                  style={{ fill: labelFill, fontSize: 11, fontWeight: 700 }}
                />
              </Bar>

              <Bar dataKey="y2568" fill={COLORS.y2568} radius={[12, 12, 0, 0]}>
                <LabelList
                  dataKey="y2568"
                  position="top"
                  formatter={(v) => fmt(v)}
                  style={{ fill: labelFill, fontSize: 11, fontWeight: 700 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
