import { membersByBranchMock } from "../mock/membersChartMock"
import { membersGrowthByFiscalYearMock,membersTrend5YMock } from "../mock/membersExtraChartsMock"

import MembersBranchChart from "../components/MembersBranchChart"
import MembersGrowthFiscalChart from "../components/MembersGrowthFiscalChart"
import Members5YChart from "../components/Members5YChart"
import MemberMonthlyChartCard from "../components/MemberMonthlyChartCard"
import MemberYearlyChartCard from "../components/MemberYearlyChartCard"
import PageShell from "../components/PageShell"
import MembersStatSection from "../components/MembersStatSection"

export default function Members() {
  return (
<PageShell>
  <div className="mt-8 font-prompt ">
    <div className="space-y-8 ">

      {/* summary cards */}
      <div className="mb-6">
        <MembersStatSection />
        </div>  
           

      {/* chart */}
      <MembersBranchChart data={membersByBranchMock} />

 <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
  

  <MembersGrowthFiscalChart data={membersGrowthByFiscalYearMock} />
  <Members5YChart data={membersTrend5YMock}/>
  
  </div>

  <div className="space-y-8">
    <MemberMonthlyChartCard />
     <MemberYearlyChartCard />
    </div>
  </div>
</div>
</PageShell>
  )
}
