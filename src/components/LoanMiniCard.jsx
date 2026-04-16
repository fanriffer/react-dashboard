const fmt = (n) => (typeof n === "number" ? n.toLocaleString("th-TH") : "—")

export default function LoanMiniCard({
  title,
  value,
  unit = "บัญชี",
  icon: Icon,
  accent = "bg-emerald-500",     // สีแถบ/แท่ง
  accentSoft = "bg-emerald-50",  // สีพื้น icon
  percent = 33,
}) {
  return (
    <div
      className="
        relative rounded-[28px] p-6
        bg-white dark:bg-slate-900
        shadow-[0_12px_30px_rgba(2,6,23,0.10)]
        border border-slate-200/60 dark:border-white/10
        overflow-hidden
      "
    >
      {/* ✅ แถบสีด้านบน */}
      <div className={`absolute top-0 left-0 w-full h-2 ${accent}`} />

      {/* icon มุมขวาบน */}
      <div
        className={`
          absolute right-5 top-5 h-11 w-11 rounded-xl
          grid place-items-center
          ${accentSoft} dark:bg-white/10
        `}
      >
        <Icon className={`text-xl ${accent.replace("bg-", "text-")} dark:text-white`} />
      </div>

      {/* title */}
      <div className="mt-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
        {title}
      </div>

      {/* value */}
      <div className="mt-6 flex items-end gap-3">
        <div className="text-6xl font-black tracking-tight text-[#0B4A78] dark:text-white">
          {fmt(value)}
        </div>
        <div className="pb-2 text-sm font-semibold text-slate-500 dark:text-white/70">
          {unit}
        </div>
      </div>

      {/* progress bar */}
      <div className="mt-6 h-2 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
        <div  className={`h-full rounded-full ${accent} transition-all duration-500`}
              style={{ width: `${Math.max(0, Math.min(100, percent))}%` }} />
      </div>
    </div>
  )
}
