// src/components/LoanGrowthDotChartCard.jsx
import { useMemo, useRef, useEffect, useState } from "react"
import { toJpeg } from "html-to-image"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ReferenceLine,
} from "recharts"

const fmt = (n) => (typeof n === "number" ? n.toLocaleString("th-TH") : "—")


function useIsDark() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  )

  useEffect(() => {
    if (typeof document === "undefined") return
    const el = document.documentElement
    const update = () => setIsDark(el.classList.contains("dark"))
    update()
    const obs = new MutationObserver(update)
    obs.observe(el, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])

  return isDark
}

export default function LoanGrowthDotChartCard({
  data,
  title = "อัตราการเติบโตของสินเชื่อรวมปีบัญชี",
  unitLeft = "สินเชื่อ",
  unitRight = "ปีบัญชี",
}) {
  const wrapRef = useRef(null)
  const isDark = useIsDark()

  const theme = useMemo(() => {
    return isDark
      ? {
          cardBg: "bg-slate-900",
          border: "border-white/10",
          title: "text-white",
          sub: "text-white/70",
          axis: "rgba(255,255,255,0.70)",
          grid: "rgba(255,255,255,0.10)",
          tooltipBg: "rgba(15,15,15,0.92)",
          tooltipBorder: "rgba(255,255,255,0.12)",
          downloadBorder: "border-blue-400",
          downloadHover: "hover:bg-white/5",
        }
      : {
          cardBg: "bg-white",
          border: "border-slate-200/70",
          title: "text-slate-900",
          sub: "text-slate-600",
          axis: "rgba(15,23,42,0.70)",
          grid: "rgba(15,23,42,0.10)",
          tooltipBg: "rgba(255,255,255,0.98)",
          tooltipBorder: "rgba(15,23,42,0.12)",
          downloadBorder: "border-orange-300",
          downloadHover: "hover:bg-orange-50",
        }
  }, [isDark])

  const ORANGE = "#47ca05"

  const last = data?.[data.length - 1]


  const yMin = Math.min(...data.map((d) => d.accounts))
  const yMax = Math.max(...data.map((d) => d.accounts))

  const handleDownload = async () => {
    if (!wrapRef.current) return
    const darkNow =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
    try {
      const dataUrl = await toJpeg(wrapRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: darkNow ? "#0b1220" : "#ffffff",
        fontEmbedCSS: "",
      })
      const link = document.createElement("a")
      link.download = "loan-growth.jpg"
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error("Download failed:", err)
    }
  }

  return (
    <div
      className={`
        rounded-[24px] p-5 sm:p-6
        border ${theme.border}
        ${theme.cardBg}
        shadow-[0_14px_50px_rgba(2,6,23,0.10)]
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className={`text-sm ${theme.sub}`}>{unitLeft}</div>

        <div className="flex-1 text-center">
          <div className={`text-base font-semibold ${theme.title}`}>{title}</div>
        </div>

        <button
          onClick={handleDownload}
          className={`
            text-sm px-4 py-2 rounded-xl border-2
            ${theme.downloadBorder}
            font-semibold transition
            ${theme.downloadHover}
          `}
          aria-label="download"
          title="ดาวน์โหลด JPG"
        >
          ดาวน์โหลด JPG
        </button>
      </div>

      {/* Chart */}
      <div ref={wrapRef} className="mt-3">
        <div className="h-[220px] sm:h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 25, right: 30, left: 6, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} />

              <XAxis
                dataKey="year"
                tick={{ fill: theme.axis, fontSize: 12 }}
                axisLine={{ stroke: theme.grid }}
                tickLine={false}
              />
              <YAxis
                domain={[Math.floor(yMin - 50), Math.ceil(yMax + 50)]}
                tick={{ fill: theme.axis, fontSize: 12 }}
                axisLine={{ stroke: theme.grid }}
                tickLine={false}
              />

              <Tooltip
                formatter={(v) => [fmt(v), "บัญชี"]}
                contentStyle={{
                  background: theme.tooltipBg,
                  border: `1px solid ${theme.tooltipBorder}`,
                  borderRadius: 12,
                  color: isDark ? "white" : "#0f172a",
                }}
              />

              {/* เส้นบางสีส้มเชื่อมจุด */}
              <Line
                type="linear"
                dataKey="accounts"
                stroke={ORANGE}
                strokeWidth={2}
                dot={{ r: 7, fill: ORANGE, stroke: ORANGE }}
                activeDot={{ r: 9 }}
              />

              {/* ไฮไลท์จุดปีล่าสุดให้เด่น + ตัวเลข 2,934 */}
              {last ? (
                <>
                  <ReferenceDot
                    x={last.year}
                    y={last.accounts}
                    r={10}
                    fill={ORANGE}
                    stroke={ORANGE}
                  />
                  <ReferenceLine
                    x={last.year}
                    stroke="transparent"
                    label={{
                      value: fmt(last.accounts),
                      position: "top",
                      fill: theme.title.includes("white") ? "white" : "#0f172a",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  />
                </>
              ) : null}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* หน่วยแกนขวาล่าง */}
        <div className={`-mt-3 text-right text-sm ${theme.sub}`}>{unitRight}</div>
      </div>
    </div>
  )
}
