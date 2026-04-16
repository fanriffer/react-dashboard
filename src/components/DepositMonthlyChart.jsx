import { useEffect, useMemo, useState } from "react"
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


export default function DepositMonthlyChart({ data = [] }) {
  // ✅ 1) ทำให้กราฟรู้ว่า dark/light เปลี่ยน
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

  // ✅ 2) โทนสีตามโหมด (ปรับได้)
  const theme = useMemo(() => {
    return {
      axisText: isDark ? "#e2e8f0" : "#1f2937",     // สีตัวอักษรแกน (สำคัญ)
      axisTick: isDark ? "#cbd5e1" : "#64748b",    // สีตัวเลขบนแกน
      grid: isDark ? "rgba(148,163,184,0.25)" : "#e5e7eb",
      axisLine: isDark ? "rgba(246,185,2,0.7)" : "#f6b902",
      tooltipBg: isDark ? "rgba(2,6,23,0.92)" : "rgba(255,255,255,0.98)",
      tooltipText: isDark ? "#e2e8f0" : "#0f172a",
    }
  }, [isDark])

  return (
    <div className="h-[540px] min-w-0 w-full">
      <ResponsiveContainer width="100%" height="100%" minHeight={320}>
        <LineChart
          layout="vertical"
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 28 }} // ✅ ดึงลงล่างอีกนิด
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} />

          {/* ✅ แกน X = ตัวเลข */}
          <XAxis
            type="number"
            tick={{ fill: theme.axisTick, fontSize: 12 }}
            axisLine={{ stroke: theme.axisLine }}
            tickLine={false}
          />

          {/* ✅ แกน Y = เดือน */}
          <YAxis
            type="category"
            dataKey="month"
            width={45}
            tick={{ fill: theme.axisText, fontSize: 12 }}   // ✅ จุดสำคัญ: ใช้ theme.axisText
            axisLine={{ stroke: theme.axisLine }}
            tickLine={false}
          />

          <Tooltip
            formatter={(value) => Number(value).toLocaleString()}
            labelStyle={{ fontWeight: 700, color: theme.tooltipText }}
            contentStyle={{
              backgroundColor: theme.tooltipBg,
              border: isDark ? "1px solid rgba(148,163,184,0.25)" : "1px solid #e5e7eb",
              borderRadius: 12,
              color: theme.tooltipText,
            }}
            itemStyle={{ color: theme.tooltipText }}
          />

          {/* ✅ ทำให้ legend เปลี่ยนสีตามโหมดด้วย */}
          <Legend wrapperStyle={{ color: theme.axisText }} />

          <Line
            type="linear"
            dataKey="in"
            name="ฝาก"
            stroke="#22c55e"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="linear"
            dataKey="out"
            name="ถอน"
            stroke="#ef4444"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="linear"
            dataKey="balance"
            name="ยอดคงเหลือ"
            stroke="#f59e0b"
            strokeWidth={2.5}
            strokeDasharray="6 4"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
