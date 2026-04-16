import PageShell from "../components/PageShell"
import FinanceTable from "../components/FinanceTable"
import FinanceStatementChartCard from "../components/FinanceStatementChartCard"
import { financeProfitMock, financeStatementMock } from "../mock/financeMock"
import FinanceProfit from "../components/FinanceProfit"
import FinanceProfitChart from "../components/FinanceProfitChart"

export default function Finance() {
  return (
    <PageShell>
      <div className="mt-8 space-y-8 font-prompt">

        <div className="grid grid-cols-1 xl:grid-cols-1 gap-8">
          <FinanceTable data={financeStatementMock} />
          <FinanceStatementChartCard data={financeStatementMock} />
          <FinanceTable data={financeProfitMock}/>
          <FinanceProfitChart data={financeProfitMock}/>
        </div>

      </div>
    </PageShell>
  )
}
