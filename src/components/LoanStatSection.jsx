import { loansMock } from "../mock/loansMock"
import LoanMiniCard from "./LoanMiniCard"
import { FaSignInAlt, FaSignOutAlt, FaFileAlt } from "react-icons/fa"

const max = Math.max(
  loansMock.newLoan,
  loansMock.closeLoan,
  loansMock.outstandingDebtors
)

const percentNew = (loansMock.newLoan / max) * 100
const percentClose = (loansMock.closeLoan / max) * 100
const percentOutstanding = (loansMock.outstandingDebtors / max) * 100


export default function LoanStatSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <LoanMiniCard
        title="สินเชื่อใหม่"
        value={loansMock.newLoan}
        unit={loansMock.unit}
        icon={FaFileAlt}
        accent="bg-emerald-500"
        accentSoft="bg-emerald-100"
        percent={percentNew}
      />

      <LoanMiniCard
        title="ปิดสินเชื่อ"
        value={loansMock.closeLoan}
        unit={loansMock.unit}
        icon={FaSignOutAlt}
        accent="bg-red-500"
        accentSoft="bg-red-100"
        percent={percentClose}
      />

      <LoanMiniCard
        title="ลูกหนี้คงเหลือ"
        value={loansMock.outstandingDebtors}
        unit={loansMock.unit}
        icon={FaSignInAlt}
        accent="bg-sky-500"
        accentSoft="bg-sky-100"
        percent={percentOutstanding}
      />
    </div>
  )
}
