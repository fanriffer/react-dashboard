import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  LabelList,
  Area,
} from "recharts"
import { useTheme } from "../context/ThemeContext"
import { toJpeg } from "html-to-image"
import { useRef } from "react"

export default function MembersGrowthFiscalChart({ data }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const chartRef = useRef(null)

const handleDownload = async () => {
  if (!chartRef.current) return

  const dataUrl = await toJpeg(chartRef.current, {
    quality: 0.95,
    backgroundColor: isDark ? "#0b2233" : "#ffffff", // ให้ไฟล์ออกมาสวยตามโหมด
  })

  const link = document.createElement("a")
  link.download = "members-growth.jpg"
  link.href = dataUrl
  link.click()
}


  // ✅ ชุดสีตามโหมด (ปรับได้ตามใจ)
  const C = {
    axis: "#f59e0b", // ส้มแกนเหมือนเดิม
    text: isDark ? "#ffffff" : "#0f172a", // ✅ เหลืองตอน dark
    tickX: isDark ? "#fbbf24" : "#1d4ed8", // tick แกน X
    tickY: isDark ? "#fbbf24" : "#0d3ab5", // tick แกน Y
    grid: isDark ? "rgba(255,255,255,0.22)" : "rgba(148,163,184,0.35)",
    tooltipBg: isDark ? "rgba(15,23,42,0.96)" : "rgba(255,255,255,0.96)",
    tooltipBorder: isDark ? "#60a5fa": "#fbbf24",
    tooltipText: isDark ? "#ffffff" : "#0f172a",
    cursor: isDark ? "rgba(251,191,36,0.25)" : "rgba(251,191,36,0.35)",
    dotStroke: isDark ? "rgba(252, 252, 252, 0.85)" : "#ffffff",
  }

  // ✅ label เหนือจุด (เปลี่ยนสีตาม theme)
  const renderValueLabel = ({ x, y, value }) => {
    if (value == null) return null
    return (
      <text
        x={x}
        y={y - 22}
        fill={C.text}          // ✅ เหลืองตอน dark
        fontSize="13"
        fontWeight="500"
        textAnchor="middle"
      >
        {Number(value).toLocaleString()}
      </text>
    )
  }

  return (
    <div
      className="relative overflow-hidden rounded-[32px] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.12)]
                 bg-gradient-to-br from-white via-orange-50/40 to-yellow-50/30
                 dark:from-[#0b2233] dark:via-[#0f2f45] dark:to-[#1a3f5c]"
    >
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-500/10" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-yellow-200/30 blur-3xl dark:bg-yellow-500/10" />

      {/* header */}
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <div>
          <div className="text-center font-black text-x1 text-slate-800 dark:text-white tracking-tight">
            อัตราการเติบโตของสมาชิกรอบปีบัญชี
          </div>
          <div className="mt-1  text-sm font-semibold text-slate-500 dark:text-white/70">
            แสดงจำนวนสมาชิกตามปีบัญชี
          </div>
        </div>

        <div
          className="hidden sm:flex items-center gap-2 rounded-full px-4 py-2
                     bg-white/70 dark:bg-white/10 border border-slate-200/60 dark:border-white/10"
        >
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="text-sm font-bold text-slate-700 dark:text-white/80">
            Growth</span>
            <button
              onClick={handleDownload}
              className="text-sm px-4 py-2 rounded-xl border-2 border-orange-300 dark:border-blue-400 font-semibold
              hover:bg-orange-50 dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-lg">JPG
            </button>
        </div>
      </div>

      <div className="relative z-10">
        <div ref={chartRef}>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 30, right: 28, left: 18, bottom: 18 }}>
            {/* gradients */}
            <defs>
              <linearGradient id="membersStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>

              <linearGradient id="membersFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.20} />
                <stop offset="60%" stopColor="#fb923c" stopOpacity={0.10} />
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
              </linearGradient>

              {/* soft glow */}
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <CartesianGrid
              strokeDasharray="6 6"
              vertical={false}
              stroke={C.grid}    // ✅ grid เปลี่ยนตาม theme
            />

            <XAxis
              dataKey="year"
              axisLine={{ stroke: C.axis, strokeWidth: 1 }}
              tickLine={{ stroke: C.axis, strokeWidth: 1 }}
              tick={{ fill: C.tickX, fontWeight: 500, fontSize: 14 }} // ✅ เหลืองตอน dark
              tickMargin={12}
            >
              <Label
                value="ปีบัญชี"
                position="insideBottom"
                offset={-14}
                style={{ fill: C.text, fontWeight: 500, fontSize: 12 }} // ✅ เหลืองตอน dark
              />
            </XAxis>

            <YAxis
              domain={[34000, 38000]}
              ticks={[34000, 35000, 36000, 37000, 38000]}
              axisLine={{ stroke: C.axis, strokeWidth: 1 }}
              tickLine={{ stroke: C.axis, strokeWidth: 1 }}
              tick={{ fill: C.tickY, fontWeight: 500, fontSize: 13 }} // ✅ เหลืองตอน dark
              tickMargin={10}
              width={56}
            >
              <Label
                value="สมาชิก"
                position="insideTop"
                offset={-22}
                style={{
                  fill: C.text,        // ✅ เหลืองตอน dark
                  fontWeight: 500,
                  fontSize: 12,
                  textAnchor: "middle",
                }}
              />
            </YAxis>

            <Tooltip
              cursor={{
                stroke: C.cursor,
                strokeWidth: 2,
                strokeDasharray: "6 6",
              }}
              contentStyle={{
                backgroundColor: C.tooltipBg,                 // ✅ dark เป็นกล่องเข้ม
                border: `2px solid ${C.tooltipBorder}`,
                borderRadius: "14px",
                padding: "10px 12px",
                boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                fontWeight: 500,
                color: C.tooltipText,                         // ✅ ตัวอักษรเหลืองตอน dark
              }}
              labelStyle={{ color: C.tooltipText, fontWeight: 900 }}
              itemStyle={{ color: C.tooltipText }}
              formatter={(val) => [Number(val).toLocaleString(), "สมาชิก"]}
            />

            {/* เติมพื้นที่ใต้เส้น */}
            <Area
              type="monotone"
              dataKey="members"
              fill="url(#membersFill)"
              stroke="none"
              activeDot={false}
            />

            <Line
              type="monotone"
              dataKey="members"
              stroke="url(#membersStroke)"
              strokeWidth={2}
              dot={{
                r: 5,
                fill: "#399321",
                strokeWidth: 2,
                stroke: C.dotStroke,     // ✅ dark ไม่ควรเป็นขาวจ้า
                filter: "url(#softGlow)",
              }}
              activeDot={{
                r: 10,
                fill: "#f59e0b",
                stroke: C.dotStroke,
                strokeWidth: 4,
              }}
              filter="url(#softGlow)"
            >
              <LabelList content={renderValueLabel} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
