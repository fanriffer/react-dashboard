import { summaryMock } from "../mock/summaryMock"
import {
  FaMale,
  FaFemale,
  FaUniversity,
  FaDollarSign,
  FaSyncAlt,
  FaCashRegister,
} from "react-icons/fa"


const fmt = (n) => (typeof n === "number" ? new Intl.NumberFormat("th-TH").format(n) : "—")
const fmtM = (n) => (typeof n === "number" ? `${fmt(n)} M` : "—")
const fmtPct = (n) => (typeof n === "number" ? `${n.toFixed(1)}%` : "—")

const iconMap = {
  members: FaSyncAlt,
  male: FaMale,
  female: FaFemale,
  asset: FaUniversity,
  deposit: FaDollarSign,
  loan: FaCashRegister,
  fund: FaSyncAlt,
  profit: FaDollarSign,
  plan: FaSyncAlt,
}

const accentStyles = {
  sky: { bar: "bg-[#93c5fd]", chip: "bg-[#EAF3FF] dark:bg-white/10", icon: "text-blue-900 dark:text-yellow-300" },
  amber:{ bar: "bg-[#f6b902]", chip: "bg-[#FFF3CF] dark:bg-white/10", icon: "text-blue-900 dark:text-yellow-300" },
  emerald:{bar:"bg-emerald-300", chip:"bg-[#ECFDF5] dark:bg-white/10", icon:"text-emerald-700 dark:text-emerald-300"},
  indigo:{bar:"bg-indigo-300", chip:"bg-[#EEF2FF] dark:bg-white/10", icon:"text-indigo-700 dark:text-indigo-300"},
  rose:{bar:"bg-rose-300", chip:"bg-[#FFF1F2] dark:bg-white/10", icon:"text-rose-700 dark:text-rose-300"},
}

function buildSummaryCards(d) {
  return [
    {
      key: "members",
      title: "สมาชิก",
      mainLabel: "สมาชิกทั้งหมด",
      mainValue: d.totalUsers,
      unit: "คน",
      iconKey: "members",
      accent: "sky",
      subItems: [
        { label: "เข้าเดือนนี้", value: d.membersInMonth, iconKey: "members" },
        { label: "ออกเดือนนี้", value: d.membersOutMonth, iconKey: "members" },
        { label: "ชาย", value: d.totalMan, iconKey: "male" },
        { label: "หญิง", value: d.totalWoman, iconKey: "female" },
      ],
    },
    {
      key: "deposit",
      title: "เงินฝาก",
      mainLabel: "เงินฝากรวม",
      mainValue: d.totalDep,
      unit: "M",
      iconKey: "deposit",
      accent: "emerald",
      subItems: [
        { label: "ฝากเดือนนี้", value: d.depositInMonth, unit: "M", iconKey: "deposit" },
        { label: "ถอนเดือนนี้", value: d.depositOutMonth, unit: "M", iconKey: "deposit" },
        { label: "สุทธิเดือนนี้", value: d.depositNetMonth, unit: "M", iconKey: "deposit" },
      ],
    },
    {
      key: "loan",
      title: "สินเชื่อ",
      mainLabel: "ให้สินเชื่อสมาชิก",
      mainValue: d.totalLoanMember,
      unit: "",
      iconKey: "loan",
      accent: "amber",
      subItems: [
        { label: "ให้สินเชื่อสหกรณ์อื่น", value: d.totalLoanAic, iconKey: "loan" },
        { label: "สินเชื่อใหม่เดือนนี้", value: d.loanNewMonth, iconKey: "loan" },
        { label: "ปิดสินเชื่อเดือนนี้", value: d.loanCloseMonth, iconKey: "loan" },
      ],
    },
    {
      key: "asset",
      title: "สินทรัพย์",
      mainLabel: "สินทรัพย์รวม",
      mainValue: d.totalAsset,
      unit: "M",
      iconKey: "asset",
      accent: "indigo",
      subItems: [],
    },
    {
      key: "fund",
      title: "กองทุน",
      mainLabel: "รวมกองทุน",
      mainValue: d.totalFund,
      unit: "",
      iconKey: "fund",
      accent: "rose",
      subItems: [
        { label: "ทุนซากาต", value: d.totalZakat, iconKey: "fund" },
        { label: "ทุนพัฒนาสังคม", value: d.totalSociety, iconKey: "fund" },
      ],
    },
    {
      key: "profit",
      title: "กำไร",
      mainLabel: "กำไรสุทธิสะสมปี",
      mainValue: d.netProfitYTD,
      unit: "M",
      iconKey: "profit",
      accent: "emerald",
      subItems: [{ label: "เทียบปีก่อน", value: fmtPct(d.netProfitYoY), iconKey: "profit" }],
    },
    {
      key: "plan",
      title: "% แผน",
      mainLabel: "ความสำเร็จแผน",
      mainValue: d.planAchievementPct,
      unit: "%",
      iconKey: "plan",
      accent: "amber",
      subItems: [
        { label: "แผนรวม", value: d.planTotal, unit: "M", iconKey: "plan" },
        { label: "ผลงานจริง", value: d.planActual, unit: "M", iconKey: "plan" },
        { label: "ต่างจากแผน", value: d.planVariance, unit: "M", iconKey: "plan" },
      ],
    },
  ]
}

function HelloLeonCard({ card }) {
  const a = accentStyles[card.accent] || accentStyles.amber
  const Icon = iconMap[card.iconKey] || FaSyncAlt

  const mainText =
    card.unit === "M" ? fmtM(card.mainValue)
    : card.unit === "%" ? fmtPct(card.mainValue)
    : `${fmt(card.mainValue)}${card.unit ? ` ${card.unit}` : ""}`

  return (
    <div
      className="
        relative overflow-hidden rounded-3xl p-5 sm:p-6
        bg-white/70 dark:bg-slate-900/55 backdrop-blur
        border border-slate-200/60 dark:border-slate-700/50
        shadow-[0_18px_50px_rgba(2,6,23,0.10)]
        hover:shadow-[0_26px_70px_rgba(2,6,23,0.14)] transition-all duration-300 
      "
    >
      <div className={`absolute left-0 top-0 h-1.5 w-full ${a.bar}`} />
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-slate-200/40 blur-3xl dark:bg-white/5" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-500/10" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">{card.title}</div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{card.mainLabel}</div>
          </div>
          <div className={`h-10 w-10 rounded-2xl grid place-items-center ${a.chip}`}>
            <Icon className={`text-xl ${a.icon}`} />
          </div>
        </div>

        <div className="mt-4  text-4xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          {mainText}
        </div>

        {card.subItems?.length ? (
          <div className="mt-4 grid grid-cols-1 gap-2">
            {card.subItems.map((s) => {
              const SubIcon = iconMap[s.iconKey] || FaSyncAlt
              const v =
                typeof s.value === "string"
                  ? s.value
                  : s.unit === "M"
                  ? fmtM(s.value)
                  : `${fmt(s.value)}${s.unit ? ` ${s.unit}` : ""}`

              return (
                <div
                  key={s.label}
                  className="
                    flex items-center justify-between gap-3
                    rounded-2xl bg-white/70 dark:bg-white/10
                    border border-slate-200/60 dark:border-slate-700/50
                    px-4 py-3
                  "
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-200">
                    <SubIcon className={`text-base ${a.icon}`} />
                    {s.label}
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">{v}</div>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function Summary() {
  const cards = buildSummaryCards(summaryMock)

  return (
    
    <div className="font-prompt p-4 sm:p-6 mt-10">
      <div
        className="
          rounded-[2rem] border border-slate-200/60
          bg-gradient-to-br from-[#FFFDF4] via-[#F7FAFF] to-[#EEF4FF]
          p-4 sm:p-6
          shadow-sm
          dark:border-slate-700/50
          dark:from-[#071a28] dark:via-[#0b2233] dark:to-[#0e2a3f]
        "
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card) => (
            <HelloLeonCard key={card.key} card={card} />
          ))}
        </div>
      </div>
    </div>
  )
}
