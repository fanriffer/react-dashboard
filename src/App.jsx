import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Mainlayout from "./Layouts/Mainlayout"

import Members from "./pages/Members"
import Deposits from "./pages/Deposits"
import Loans from "./pages/Loans"
import Finance from "./pages/Finance"
import Plans from "./pages/Plans"
import Summary from "./pages/Summary"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Mainlayout />}>
          {/* เข้า / ให้เด้งไป /members */}
          <Route index element={<Navigate to="/members" replace />} />

          <Route path="/members" element={<Members />} />
          <Route path="/deposits" element={<Deposits />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/summary" element={<Summary />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
  
}
