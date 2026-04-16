import { useMemo, useRef, useEffect, useState } from "react"
import { toJpeg } from "html-to-image"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
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

export default function LoanBranchChartCard({
  data,
  title = "สินเชื่อใหม่–ปิดสินเชื่อ แยกตามสาขา ปี 2568",
  unit = "บัญชี",
}) {
  const wrapRef = useRef(null)
  const isDark = useIsDark()

  const theme = useMemo(() => {
    return isDark
      ? {
          cardBg: "bg-slate-900",
          cardBorder: "border-white/10",
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
          cardBorder: "border-slate-200/70",
          title: "text-slate-900",
          sub: "text-slate-500",
          axis: "rgba(15,23,42,0.70)",
          grid: "rgba(15,23,42,0.10)",
          tooltipBg: "rgba(255,255,255,0.98)",
          tooltipBorder: "rgba(15,23,42,0.12)",
          downloadBorder: "border-orange-300",
          downloadHover: "hover:bg-orange-50",
        }
  }, [isDark])

  const COLORS = useMemo(
    () => ({
      newLoan: "#EF4444",
      closeLoan: "#22C55E",
    }),
    []
  )

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
      link.download = "loan-branch-2568.jpg"
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
        border ${theme.cardBorder}
        ${theme.cardBg}
        shadow-[0_14px_50px_rgba(2,6,23,0.10)]
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <button
          onClick={handleDownload}
          className={`
            text-sm px-4 py-2 rounded-xl border-2
            ${theme.downloadBorder}
            font-semibold transition
            ${theme.downloadHover}
          `}
        >
          ดาวน์โหลด JPG
        </button>

        <div className="flex-1 text-center">
          <div className={`text-base font-semibold ${theme.title}`}>{title}</div>

          <div className={`mt-2 flex items-center justify-center gap-6 text-sm ${theme.sub}`}>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: COLORS.newLoan }} />
              สินเชื่อใหม่
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: COLORS.closeLoan }} />
              ปิดสินเชื่อ
            </span>
          </div>
        </div>
      </div>

      <div ref={wrapRef} className="mt-4">
        <div className="h-[260px] sm:h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap={26} margin={{ top: 14, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} />

              <XAxis
                dataKey="branch"
                tick={{ fill: theme.axis, fontSize: 12 }}
                axisLine={{ stroke: theme.grid }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: theme.axis, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(v, name) => [fmt(v), name === "newLoan" ? "สินเชื่อใหม่" : "ปิดสินเชื่อ"]}
                labelFormatter={(label) => `สาขา: ${label}`}
                contentStyle={{
                  background: theme.tooltipBg,
                  border: `1px solid ${theme.tooltipBorder}`,
                  borderRadius: 12,
                  color: isDark ? "white" : "#0f172a",
                }}
              />

              <Bar dataKey="newLoan" fill={COLORS.newLoan} radius={[10, 10, 0, 0]}>
                <LabelList
                  dataKey="newLoan"
                  position="top"
                  formatter={(v) => fmt(v)}
                  style={{ fill: theme.axis, fontSize: 11, fontWeight: 700 }}
                />
              </Bar>

              <Bar dataKey="closeLoan" fill={COLORS.closeLoan} radius={[10, 10, 0, 0]}>
                <LabelList
                  dataKey="closeLoan"
                  position="top"
                  formatter={(v) => fmt(v)}
                  style={{ fill: theme.axis, fontSize: 11, fontWeight: 700 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
