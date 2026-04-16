import { useTheme } from "../context/ThemeContext"
import { HiMoon, HiSun } from "react-icons/hi2"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`
        relative w-24 h-11 rounded-full shadow-md
        transition-colors duration-300
        ${isDark ? "bg-[#A8D4FF]" : "bg-[#C79A50]"}
      `}
    >
      {/* ลูกกลมเลื่อน */}
      <span
        className="absolute top-1 left-1 w-9 h-9 rounded-full bg-white shadow
                   flex items-center justify-center
                   transition-transform duration-300"
        style={{
          transform: isDark ? "translateX(52px)" : "translateX(0px)",
        }}
      >
        {isDark ? (
          <HiMoon className="text-xl text-slate-900" />
        ) : (
          <HiSun className="text-xl text-slate-900" />
        )}
      </span>
    </button>
  )
}
