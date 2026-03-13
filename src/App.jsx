import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./App.css";

import Dashboard from "./app/component/Dashboard";
import DashboardLayout from "./app/component/DashboardLayout";
import LandingPage from "./app/component/LandingPage";
import LoginRegister from "./app/component/LoginRegister";
import ManualBug from "./app/component/ManualBug";
import NewScan from "./app/component/NewScan";
import Reports from "./app/component/Reports";
import ScanHistory from "./app/component/ScanHistory";
import ScanResult from "./app/component/ScanResult";
import Settings from "./app/component/Settings";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decoded = jwtDecode(token);

      const expiryTime = decoded.exp * 1000;
      const currentTime = Date.now();

      const timeLeft = expiryTime - currentTime;

      const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
      };

      if (timeLeft <= 0) {
        logout();
      } else {
        const timer = setTimeout(logout, timeLeft);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginRegister />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/dashboard-layout" element={<DashboardLayout />} />

        <Route
          path="/new-scan"
          element={
            <DashboardLayout currentPage="new-scan">
              <NewScan />
            </DashboardLayout>
          }
        />

        <Route path="/scan-results/:scanId" element={<ScanResult />} />

        <Route path="/scan-history" element={<ScanHistory />} />

        <Route path="/manual-bugs" element={<ManualBug />} />

        <Route path="/reports" element={<Reports />} />

        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
