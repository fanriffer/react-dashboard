import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { memberYearlyMock } from "../mock/memberYearlyMock"
import { toJpeg } from "html-to-image"
import { useRef} from "react"


export default function MemberYearlyChartCard() {
  const data = memberYearlyMock

  // สุทธิ "ปีล่าสุด"
  const last = data[data.length - 1]
  const netLast = last.in - last.out

  const chartRef = useRef(null)
  const handleDownload = async () => {
  if (!chartRef.current) return

  const isDark = document.documentElement.classList.contains("dark")

  try {
    const dataUrl = await toJpeg(chartRef.current, {
      quality: 0.95,
      backgroundColor: isDark ? "#0b2233" : "#FFF8DC",

      // ✅ แก้ SecurityError เรื่อง remote css/fonts
      fontEmbedCSS: "",

      // ✅ กันกรณีภาพหลุดขอบ
      pixelRatio: 2,
    })

    const link = document.createElement("a")
    link.download = "members-year.jpg"
    link.href = dataUrl
    link.click()
  } catch (err) {
    console.error("Download failed:", err)
  }
}

  return (
    <div
      className="
        relative overflow-hidden rounded-[32px] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.12)]
                 bg-gradient-to-br from-white via-orange-50/40 to-yellow-50/30
                 dark:from-[#0b2233] dark:via-[#0f2f45] dark:to-[#1a3f5c]"
    >
      {/* Header */}
      <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-sm text-slate-600 dark:text-slate-300">เข้า</span>

            <span className="ml-3 h-2.5 w-2.5 rounded-full bg-rose-500" />
            <span className="text-sm text-slate-600 dark:text-slate-300">ออก</span>
          </div>

          <h3 className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
            สมาชิกเข้า–ออก รายปี
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            เปรียบเทียบจำนวนสมาชิกเข้าและออกในแต่ละปี
          </p>
        </div>

        {/* Summary */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">สุทธิปีล่าสุด</span>
          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            +{netLast}
          </span>
          <button
            onClick={handleDownload}
            className="text-sm px-4 py-2 rounded-xl border-2 border-orange-300 dark:border-blue-400 font-semibold
             hover:bg-orange-50 dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-lg">JPG
          </button>
        </div>
      </div>

      {/* Chart */}
      <div ref={chartRef}>
      <div className="h-[220px] w-full px-2 pb-4 sm:h-[260px] sm:px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: -10}}>
            <CartesianGrid strokeDasharray="3 3" />

            {/* ✅ เปลี่ยน key แกน X จาก month -> year */}
            <XAxis
              dataKey="year"
              tick={{ fill: "#f6b902", fontSize: 15 }}
              axisLine={{ stroke: "#f6b902" }}
            />
            <YAxis
              tick={{ fill: "#f6b902", fontSize: 15 }}
              axisLine={{ stroke: "#f6b902" }}
            />

            <Tooltip />

            <Line
              type="linear"
              dataKey="in"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              stroke="#10b981"
            />
            <Line
              type="linear"
              dataKey="out"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              stroke="#f43f5e"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
     </div>
    </div>
  )
}
