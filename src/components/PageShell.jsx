export default function PageShell({ children }) {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-prompt">
      <div
        className="
          max-w-[1600px] mx-auto
          rounded-[2rem] border border-slate-200/60
          bg-gradient-to-br from-[#FFFDF4] via-[#F7FAFF] to-[#EEF4FF]
          p-4 sm:p-6 lg:p-8
          shadow-sm
          dark:border-slate-700/50
          dark:from-[#071a28] dark:via-[#0b2233] dark:to-[#0e2a3f] mt-10
        "
      >
        {children}
      </div>
    </div>
  )
}
