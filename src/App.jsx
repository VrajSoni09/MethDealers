import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { apiService } from "./services/apiService";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import InputPage from "./pages/InputPage";
import OutputPage from "./pages/OutputPage";
import Sidebar from "./components/Sidebar";
import Toast from "./components/Toast";

// ─── App Shell (authenticated layout) ────────────────────────────────────────
const AppShell = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleViewComplaint = useCallback((complaint) => {
    navigate(`/app/output/${complaint.id}`);
  }, [navigate]);

  const handleToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
  }, []);

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex`}>
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className="flex-1 transition-all duration-300 min-h-screen p-6 md:p-8 bg-white dark:bg-gray-950 overflow-auto">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage apiService={apiService} />} />
          <Route path="/complaints" element={<ComplaintsPage onView={handleViewComplaint} apiService={apiService} />} />
          <Route path="/input" element={<InputPage onToast={handleToast} apiService={apiService} />} />
          <Route path="/output/:complaintId" element={<OutputPage apiService={apiService} />} />
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
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
            
            {/* Protected routes */}
            <Route path="/app/*" element={<AppShell />} />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
