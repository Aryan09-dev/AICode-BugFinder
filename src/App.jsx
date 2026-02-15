
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './app/component/Dashboard'
import DashboardLayout from './app/component/DashboardLayout'
import LandingPage from './app/component/LandingPage'
import LoginRegister from './app/component/LoginRegister'
import ManualBug from './app/component/ManualBug'
import NewScan from './app/component/NewScan'
import Reports from './app/component/Reports'
import ScanHistory from './app/component/ScanHistory'
import ScanResult from './app/component/ScanResult'
import Settings from './app/component/Settings'





function App() {

  return (
    <>


      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-layout" element={<DashboardLayout />} />
        <Route path="/new-scan" element={<DashboardLayout currentPage="new-scan"><NewScan /></DashboardLayout>} />
        <Route path="/scan-results" element={<ScanResult />} />
        <Route path="/scan-history" element={<ScanHistory />} />
        <Route path="/manual-bugs" element={<ManualBug />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />

      </Routes>



    </>
  )
}

export default App
