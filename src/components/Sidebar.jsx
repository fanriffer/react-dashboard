import { NavLink } from "react-router-dom"
import logo from "../assets/aicex.png"
import {
  HiUsers,
  HiBanknotes,
  HiDocumentText,
  HiCurrencyDollar,
  HiChartBar,
  HiSquares2X2,
} from "react-icons/hi2"

const menu = [
  { to: "/members", label: "สมาชิก", icon: HiUsers },
  { to: "/deposits", label: "เงินฝากสมาชิก", icon: HiBanknotes },
  { to: "/loans", label: "สินเชื่อ", icon: HiDocumentText },
  { to: "/finance", label: "การเงิน", icon: HiCurrencyDollar },
  { to: "/plans", label: "ข้อมูลแผนงาน", icon: HiChartBar },
  { to: "/summary", label: "รวม", icon: HiSquares2X2 },
]

export default function Sidebar() {
  return (
    <aside
      className="
        shrink-0
        w-[90px] lg:w-[290px]
        bg-[#F5F5DC] dark:bg-[#102B3F]
        p-3 lg:p-5
        border-r border-slate-200/60 dark:border-white/10
        font-prompt
        transition-all duration-300
      "
    >
      {/* logo section */}
      <div className="rounded-[28px] bg-white/80 dark:bg-white/0 p-3 shadow-sm">
        <div className="rounded-[22px] bg-white dark:bg-white p-4 flex items-center justify-center">
          <img
            src={logo}
            alt="AiCe Logo"
            className="w-10 lg:w-32 transition-all"
          />
        </div>

        {/* text (ซ่อนเมื่อจอเล็ก) */}
        <div className="hidden lg:block mt-4 font-semibold leading-snug text-center text-[#2D7A2C] dark:text-yellow-600">
          สหกรณ์อิสลามซิดดีก จำกัด
          <div className="text-[10px] text-slate-600 dark:text-white/70 font-medium mt-1">
            AS-SIDDEEK ISLAMIC COOPERATIVE LIMITED
          </div>
        </div>
      </div>

      {/* menu */}
      <nav className="mt-8 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/members"}
              className={({ isActive }) =>
                [
                  "group flex items-center",
                  "justify-center lg:justify-start",
                  "gap-0 lg:gap-4",
                  "px-2 lg:px-4 py-3 rounded-2xl font-semibold transition-all",
                  "text-slate-800 dark:text-slate-100",
                  "hover:bg-white/70 hover:shadow-sm dark:hover:text-yellow-600",
                  isActive ? "bg-white shadow dark:text-yellow-600" : "",
                ].join(" ")
              }
            >
              {/* icon */}
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-white/90">
                <Icon className="text-2xl text-slate-700" />
              </span>

              {/* label (ซ่อนเมื่อจอเล็ก) */}
              <span className="hidden lg:block text-lg whitespace-nowrap">
                {item.label}
              </span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
