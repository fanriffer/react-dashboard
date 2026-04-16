import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  LabelList,
  Tooltip,
  Area,
} from "recharts"
import { useTheme } from "../context/ThemeContext"
import { toJpeg } from "html-to-image"
import { useRef } from "react"


export default function Members5YChart({ data }) {
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
  link.download = "members-5y-chart.jpg"
  link.href = dataUrl
  link.click()
}


  // theme colors
  const axisStroke = isDark ? "#fbbf24" : "#f59e0b"         // เส้นแกน (เหลืองใน dark)
  const tickFill = isDark ? "#fbbf24" : "#1d4ed8"           // ตัวอักษรแกน (เหลืองใน dark)
  const labelFill = isDark ? "#ffffff" : "#0f172a"          // label แกน
  const gridStroke = isDark ? "rgba(255,255,255,0.18)" : "rgba(148,163,184,0.35)"

  // ✅ label % (เหมือนเดิม แค่เปลี่ยนสีตามธีม)
  const renderGrowthLabel = ({ x, y, index }) => {
    if (index === 0) return null
    const growth = data[index]?.growthPct
    if (growth == null) return null

    return (
      <text
        x={x}
        y={y - 17}
        fill={isDark ? "#22c55e" : "#16a34a"}
        fontSize="10"
        fontWeight="500"
        textAnchor="middle"
      >
        ↑ +{growth} %
      </text>
    )
  }

  // ✅ label ค่าบนจุด: แก้ซ้อนกันที่ปี 2564 โดย "ขยับ x จุดแรกไปทางขวา"
  const renderValueLabel = ({ x, y, value, index }) => {
    if (value == null) return null

    const shiftX = index === 0 ? 18 : 0 // ⭐ แก้ซ้อน: จุดแรกขยับขวา
    return (
      <text
        x={x + 5}
        y={y - 30}
        fill={isDark ? "#ffffff" : "#0f172a"} // ใน dark ให้เด่นอ่านง่าย
        fontSize="12"
        fontWeight="500"
        textAnchor="middle"
      >
        {Number(value).toLocaleString()}
      </text>
    )
  }

  return (
    <div
      className="
        relative overflow-hidden rounded-[32px] p-8
        shadow-[0_18px_60px_rgba(0,0,0,0.12)]
        bg-gradient-to-br from-white via-orange-50/40 to-yellow-50/30
        dark:from-[#0b2233] dark:via-[#0f2f45] dark:to-[#1a3f5c]
        border border-orange-200/40 dark:border-white/10
      "
    >
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-500/10" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-yellow-200/30 blur-3xl dark:bg-yellow-500/10" />

      {/* header */}
      <div className="relative z-10 mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="font-black text-xl text-slate-800 dark:text-white tracking-tight">
            แนวโน้มสมาชิก
          </div>
          <div className="mt-1 text-sm font-semibold text-slate-500 dark:text-white/70">
            สมาชิก (แนวโน้ม 5ปี)
          </div>
        </div>

        {/* badge */}
        <div className="flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 dark:bg-white/10 border border-slate-200/60 dark:border-white/10">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="text-sm font-bold text-slate-700 dark:text-white/80">
            Trend
          </span>
          <button
            onClick={handleDownload}
            className="text-sm px-4 py-2 rounded-xl border-2 border-orange-300 dark:border-blue-400 font-semibold
             hover:bg-orange-50 dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-lg">JPG
        </button>
        </div>
      </div>
      <div ref={chartRef}>
      <div className="relative z-10">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={data}
            margin={{ top: 30, right: 28, left: 28, bottom: 18 }} 
          >
            <defs>
              <linearGradient id="membersStroke5y" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>

              <linearGradient id="membersFill5y" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={isDark ? 0.18 : 0.20} />
                <stop offset="60%" stopColor="#fb923c" stopOpacity={isDark ? 0.10 : 0.10} />
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
              </linearGradient>

              <filter id="softGlow5y" x="-50%" y="-50%" width="200%" height="200%">
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
              stroke={gridStroke}
            />

            <XAxis
              dataKey="year"
              axisLine={{ stroke: axisStroke, strokeWidth: 1 }}
              tickLine={{ stroke: axisStroke, strokeWidth: 1 }}
              tick={{ fill: tickFill, fontWeight: 500, fontSize: 14 }}
              tickMargin={12}
            >
              <Label
                value="ปีบัญชี"
                position="insideBottom"
                offset={-14}
                style={{ fill: labelFill, fontWeight: 500, fontSize: 12 }}
              />
            </XAxis>

            <YAxis
              domain={[36000, 40000]}
              ticks={[36000, 37000, 38000, 39000, 40000]}
              axisLine={{ stroke: axisStroke, strokeWidth: 1 }}
              tickLine={{ stroke: axisStroke, strokeWidth: 1 }}
              tick={{ fill: tickFill, fontWeight: 500, fontSize: 13 }}
              tickMargin={12}
              width={62} // ⭐ เพิ่มพื้นที่แกนซ้าย ลดโอกาสชน
            >
              <Label
                value="สมาชิก"
                position="insideTop"
                offset={-22}
                style={{ fill: labelFill, fontWeight: 500, fontSize: 12, textAnchor: "middle" }}
                
              />
            </YAxis>

            <Tooltip
              cursor={{ stroke: "rgba(251,191,36,0.35)", strokeWidth: 2, strokeDasharray: "6 6" }}
              contentStyle={{
                backgroundColor: isDark ? "rgba(15, 23, 42, 0.92)" : "rgba(255, 255, 255, 0.96)",
                border: `2px solid ${isDark ? "#60a5fa" : "#fbbf24"}`,
                borderRadius: "14px",
                padding: "10px 12px",
                boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                fontWeight: 500,
                color: isDark ? "#fff" : "#0f172a",
              }}
              labelStyle={{ fontWeight: 900, color: isDark ? "#fbbf24" : "#0f172a" }}
              formatter={(val) => [Number(val).toLocaleString(), "สมาชิก"]}
            />

            {/* area ใต้เส้น */}
            <Area
              type="monotone"
              dataKey="members"
              fill="url(#membersFill5y)"
              stroke="none"
              activeDot={false}
            />

            <Line
              type="monotone"
              dataKey="members"
              stroke="url(#membersStroke5y)"
              strokeWidth={2}
              dot={{
                r: 5,
                fill: "#399321",
                strokeWidth: 2,
                stroke: "#ffffff",
                filter: "url(#softGlow5y)",
              }}
              activeDot={{
                r: 10,
                fill: "#f59e0b",
                stroke: "#ffffff",
                strokeWidth: 4,
              }}
              filter="url(#softGlow5y)"
            >
              <LabelList content={renderValueLabel} />
              <LabelList content={renderGrowthLabel} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
