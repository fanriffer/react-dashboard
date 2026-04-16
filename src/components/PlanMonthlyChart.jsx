import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"



export default function PlanMonthlyChart({ data = [] }) {
  // ✅ Theme ตามโหมด (อ่าน class "dark" ที่ <html>)
  const isDark = document.documentElement.classList.contains("dark")

  const axisText = isDark ? "#cbd5e1" : "#1f2937"
  const axisTick = isDark ? "#94a3b8" : "#64748b"
  const gridStroke = isDark ? "rgba(148,163,184,0.18)" : "#e5e7eb"
  const axisLine = isDark ? "rgba(246,185,2,0.55)" : "#f6b902"

  return (
    <div className="w-full h-[320px] min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />

          <XAxis
            dataKey="month"
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
            formatter={(value) => Number(value).toLocaleString()}
            contentStyle={{
              background: isDark ? "rgba(2,6,23,0.85)" : "rgba(255,255,255,0.95)",
              border: `1px solid ${isDark ? "rgba(148,163,184,0.25)" : "#e5e7eb"}`,
              borderRadius: 12,
              color: axisText,
            }}
            labelStyle={{ color: axisText, fontWeight: 800 }}
          />

          <Legend wrapperStyle={{ color: axisText }} />

          {/* ✅ ค่าแผนงาน (เส้นประ) */}
          <Line
            type="monotone"
            dataKey="plan"
            name="ค่าแผนงาน"
            stroke="#60a5fa"
            strokeWidth={2.2}
            strokeDasharray="6 4"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />

          {/* ✅ ผลงานจริง */}
          <Line
            type="monotone"
            dataKey="actual"
            name="ผลงานจริง"
            stroke="#22c55e"
            strokeWidth={2.6}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
