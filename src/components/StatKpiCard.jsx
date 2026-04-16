export default function StatKpiCard({ title, value, unit = "", accent = "sky", icon: Icon , valueClassName = ""}) {
  const accents = {
    sky: "bg-[#93c5fd]",
    emerald: "bg-emerald-300",
    amber: "bg-[#f6b902]",
    rose: "bg-rose-300",
    indigo: "bg-indigo-300",
  }

  return (
    <div
      className="
        relative overflow-hidden rounded-3xl p-5
        bg-white/70 dark:bg-slate-900/55 backdrop-blur
        border border-slate-200/60 dark:border-slate-700/50
        shadow-[0_18px_50px_rgba(2,6,23,0.10)]
      "
    >
      <div className={`absolute left-0 top-0 h-1.5 w-full ${accents[accent] || accents.sky}`} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">{title}</div>
      <div className={[ "mt-3 text-3xl font-black", valueClassName || "text-slate-900 dark:text-white",].join(" ")}>
          {typeof value === "number" ? value.toLocaleString() : value}{" "}
          {unit ? (<span className="text-base font-bold text-slate-500 dark:text-slate-300">{unit} </span>) : null}
      </div>
        </div>
        {Icon ? (
          <div className="h-10 w-10 rounded-2xl bg-white/70 dark:bg-white/10 grid place-items-center">
            <Icon className="text-xl text-blue-900 dark:text-yellow-300" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
