import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import ThemeToggle from "../components/ThemeToggle"

export default function Mainlayout() {
  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 dark:bg-[#2F4F4F] dark:text-slate-100 font-sans transition-colors duration-300 bg">
      <Sidebar />

      {/* Content */}
      <main className="flex-1 relative p-8 lg:p-10 ml-0 transition-all duration-300 overflow-x-hidden">
        {/* Top Bar Area */}
        <div className="absolute top-8 right-10 z-20 flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-surface rounded-full shadow-sm border border-slate-200/60 dark:border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">System Online</span>
          </div>
          <ThemeToggle />
        </div>

        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
