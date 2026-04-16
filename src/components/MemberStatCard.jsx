export default function MemberStatCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-100",
  accent = "bg-blue-400", 
}) {
  return (
    <div className="
      relative overflow-hidden
      rounded-3xl p-6
      shadow-[0_4px_20px_rgba(0,0,0,0.08)]
      hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      transition-all duration-300
      flex items-center gap-5
      dark:from-[#102B3F] dark:to-[#1a3f5c]
      border border-orange-200/30 dark:border-blue-400/10
    ">

      {/* 🔥 แถบสีด้านบน */}
      <div className={`absolute top-0 left-0 w-full h-1.5 ${accent}`} />

      {/* Icon Container */}
      <div className={`p-4 rounded-2xl ${color} shadow-lg flex items-center justify-center`}>
        <Icon className="text-3xl text-blue-700 dark:text-yellow-700" />
      </div>

      {/* Text Content */}
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          {title}
        </div>
        <div className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
      </div>
    </div>
  )
}
