import { exportFinanceStatementToExcel } from "../utils/exportExcel"

export default function FinanceTable({ data }) {
  return (
    <div className="font-prompt">
     <div className="flex items-center justify-between mb-2">
        <button
onClick={() => exportFinanceStatementToExcel({ rows: data, filename: "งบสถานะการเงิน_2568.xlsx",}) }
className=" text-sm px-4 py-2 rounded-xl border-2 border-orange-300 dark:border-blue-400
 font-semibold hover:bg-orange-50 dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-lg ">
  ดาวน์โหลด Excel
</button>
      <div className="text-slate-700 dark:text-slate-100 font-semibold ">
        ตารางแสดงงบสถานะการเงิน
      </div>
      <div className="text-slate-500 dark:text-slate-100 ">
        หน่วย : ล้านบาท
      </div>
     </div>

      <div
        className="
          rounded-2xl overflow-hidden shadow-sm mt-3
          border border-slate-200/70 dark:border-white/10
        "
      >
        <table className="w-full text-sm text-center">
          {/* Header */}
          <thead className="bg-[#EED3A6] text-slate-800 font-semibold dark:bg-slate-800 dark:text-slate-100">
            <tr>
              <th className="p-3 text-left">รายการ</th>
              <th className="p-3">2566</th>
              <th className="p-3">2567</th>
              <th className="p-3">2568</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-white dark:bg-slate-900">
            {data.map((row) => (
              <tr
                key={row.label}
                className="
                  border-t border-slate-200/70 dark:border-white/10
                  hover:bg-slate-50 dark:hover:bg-white/5
                  transition
                "
              >
                <td className="p-3 text-left text-slate-800 dark:text-slate-100">
                  {row.label}
                </td>
                <td className="p-3 text-slate-700 dark:text-slate-200">
                  {row.y2566.toLocaleString()}
                </td>
                <td className="p-3 text-slate-700 dark:text-slate-200">
                  {row.y2567.toLocaleString()}
                </td>
                <td className="p-3 text-slate-700 dark:text-slate-200">
                  {row.y2568.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
