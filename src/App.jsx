import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import InputPage from "./pages/InputPage";
import OutputPage from "./pages/OutputPage";
import Sidebar from "./components/Sidebar";
import Toast from "./components/Toast";

// ─── App Shell (main layout) ────────────────────────────────────────
const AppShell = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleViewComplaint = useCallback((complaint) => {
    navigate(`/output/${complaint.id}`);
  }, [navigate]);

  const handleToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
  }, []);

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex`}>
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className="flex-1 transition-all duration-300 min-h-screen p-6 md:p-8 bg-white dark:bg-gray-950 overflow-auto">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage onToast={handleToast} />} />
          <Route path="/complaints" element={<ComplaintsPage onView={handleViewComplaint} />} />
          <Route path="/input" element={<InputPage onToast={handleToast} />} />
          <Route path="/output/:complaintId" element={<OutputPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>

      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

// ─── Main App Component ────────────────────────────────────────
const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/*" element={<AppShell />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
