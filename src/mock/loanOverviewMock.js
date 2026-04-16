// src/mock/loanOverviewMock.js
export const loanOverviewMock = {
  branch: "นาทวี",
  year: 2567,

  totalLoanMember: 808071418,
  totalLoanCoop: 38182474,

  loanNewMonth: 185,
  loanCloseMonth: 62,
  loanNetMonth: 123,

  rows: [
    { month: "ม.ค.", newLoan: 40, closeLoan: 15, remain: 2934 },
    { month: "ก.พ.", newLoan: 28, closeLoan: 7, remain: 2942 },
  ],

  chart: [
    { month: "ม.ค.", newLoan: 40, closeLoan: 15 },
    { month: "ก.พ.", newLoan: 28, closeLoan: 7 },
  ],
}
