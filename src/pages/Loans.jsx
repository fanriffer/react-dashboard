import PageShell from "../components/PageShell"
import LoanStatSection from "../components/LoanStatSection"
import LoanBranchChartCard from "../components/LoanBranchChartCard"
import LoanGrowthDotChartCard from "../components/LoanGrowthDotChartCard"
import LoanTrend5YChartCard from "../components/LoanTrend5YChartCard"

import { loanBranchMock } from "../mock/loanBranchMock"
import { loanAccountGrowthMock }  from "../mock/loanTrendMock"
import { loanTrend5YMock } from "../mock/loanTrend5YMock"

export default function Loans() {
  return (
    <PageShell>
      <div className="mt-8 space-y-8 font-prompt">
        <LoanStatSection />

        <LoanBranchChartCard
          data={loanBranchMock} unit="บัญชี" title="สินเชื่อใหม่–ปิดสินเชื่อ แยกตามสาขา ปี 2568"
        />
        <LoanGrowthDotChartCard data={loanAccountGrowthMock}/>
        <LoanTrend5YChartCard data={loanTrend5YMock} />
      </div>
    </PageShell>
  )
}
