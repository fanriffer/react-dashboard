import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts"
import { toJpeg } from "html-to-image"
import { useRef, useState } from "react"

export default function MembersBranchChart({ data }) {
  const chartRef = useRef(null)
  const [selectedYear, setSelectedYear] = useState(2568)
  const [showYears, setShowYears] = useState(false)
  const years = [2568, 2567, 2566, 2565]

  const handleDownload = async () => {
    if (!chartRef.current) return

    const dataUrl = await toJpeg(chartRef.current, {
      quality: 0.95,
      backgroundColor: "#ffffff",
    })

    const link = document.createElement("a")
    link.download = "members-branch-chart.jpg"
    link.href = dataUrl
    link.click()
  }

  return (
    <div className="rounded-3xl bg-white via-orange-50/20 to-yellow-50/30 dark:bg-[#1e3a52] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-sm relative overflow-hidden">

      {/* Decorative background (light mode only) */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-200/30 to-orange-200/20 dark:opacity-0 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-200/20 to-yellow-200/20 dark:opacity-0 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Header with Year Selector */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h3 className="font-black text-xl text-gray-800 dark:text-white tracking-tight">
              สมาชิก เข้า-ออก แยกสาขา {selectedYear}
            </h3>
            
            {/* Year Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowYears(!showYears)}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="text-2xl">⊙</span>
              </button>
              
              {/* Year Pills Dropdown */}
              {showYears && (
                <div className="absolute top-14 right-0 flex flex-col gap-2 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-2xl border-2 border-orange-200 dark:border-slate-600 z-20">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year)
                        setShowYears(false)
                      }}
                      className={`
                        px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap
                        ${selectedYear === year 
                          ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-lg scale-105' 
                          : 'bg-orange-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-orange-200 dark:hover:bg-slate-600'
                        }
                      `}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="text-sm px-4 py-2 rounded-xl border-2 border-orange-300 dark:border-blue-400 font-semibold hover:bg-orange-50 dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-lg"
          >
            ดาวน์โหลด JPG
          </button>
        </div>

        {/* Chart */}
        <div ref={chartRef}>
          <ResponsiveContainer width="100%" height={340}>
            <LineChart 
              data={data} 
              margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
            >
              <defs>
                {/* Gradient for green line */}
                <linearGradient id="colorJoin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
                
                {/* Gradient for red line */}
                <linearGradient id="colorLeave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>

                {/* Glow filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <CartesianGrid 
                strokeDasharray="5 5" 
                stroke="#d1d5db" 
                opacity={1}
                vertical={false}
                strokeWidth={1}
              />

              <XAxis
                dataKey="branch"
                axisLine={{ stroke: "#f59e0b", strokeWidth: 3 }}
                tickLine={{ stroke: "#f59e0b", strokeWidth: 2 }}
                tick={{ 
                  fill: "#d97706", 
                  fontWeight: 700, 
                  fontSize: 14 
                }}
                tickMargin={12}
                height={60}
              />

              <YAxis
                axisLine={{ stroke: "#f59e0b", strokeWidth: 3 }}
                tickLine={{ stroke: "#f59e0b", strokeWidth: 2 }}
                tick={{ 
                  fill: "#d97706", 
                  fontWeight: 700, 
                  fontSize: 13 
                }}
                tickMargin={10}
                width={50}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.98)",
                  border: "3px solid #fbbf24",
                  borderRadius: "16px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                  padding: "12px 16px",
                  fontWeight: 600
                }}
                cursor={{ 
                  stroke: 'rgba(251, 191, 36, 0.3)',
                  strokeWidth: 2,
                  strokeDasharray: '5 5'
                }}
                labelStyle={{
                  fontWeight: 700,
                  color: '#1f2937',
                  marginBottom: '4px'
                }}
              />

              <Legend
                wrapperStyle={{
                  paddingTop: "24px",
                  fontWeight: 700,
                  fontSize: "14px"
                }}
                iconType="circle"
                iconSize={12}
              />

              {/* Enhanced Lines with area fill and glow */}
              <Line
                type="monotone"
                dataKey="join"
                name="เข้า"
                stroke="#22c55e"
                strokeWidth={4}
                dot={{ 
                  r: 6, 
                  fill: "#22c55e", 
                  strokeWidth: 3, 
                  stroke: "#fff",
                  filter: "url(#glow)"
                }}
                activeDot={{ 
                  r: 8, 
                  fill: "#16a34a",
                  stroke: "#fff",
                  strokeWidth: 3
                }}
                fill="url(#colorJoin)"
                filter="url(#glow)"
              />
              
              <Line
                type="monotone"
                dataKey="leave"
                name="ออก"
                stroke="#ef4444"
                strokeWidth={4}
                dot={{ 
                  r: 6, 
                  fill: "#ef4444", 
                  strokeWidth: 3, 
                  stroke: "#ffffff",
                  filter: "url(#glow)"
                }}
                activeDot={{ 
                  r: 8, 
                  fill: "#dc2626",
                  stroke: "#fff",
                  strokeWidth: 3
                }}
                fill="url(#colorLeave)"
                filter="url(#glow)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}