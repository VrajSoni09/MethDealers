import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

const NAV_ITEMS = [
  { id: "dashboard", icon: "📊", label: "Dashboard", path: "/app/dashboard" },
  { id: "complaints", icon: "📋", label: "Complaints", path: "/app/complaints" },
  { id: "input", icon: "📝", label: "Input", path: "/app/input" },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/app/output") {
      return location.pathname.startsWith("/app/output");
    }
    return location.pathname === path;
  };

  return (
    <aside
      className={`h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-30 flex flex-col transition-all duration-300 shadow-xl flex-shrink-0 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-gray-700 min-h-[64px]">
        {!collapsed && (
          <span className="text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wider truncate mr-2">
            Navigation
          </span>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 ml-auto flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-hidden">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            title={collapsed ? item.label : ""}
            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-200 group mx-2 rounded-lg ${
              isActive(item.path)
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            {!collapsed && (
              <span className="font-medium text-sm truncate">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Theme Toggle */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center">
          <ThemeToggle />
          {!collapsed && (
            <span className="ml-3 text-gray-500 dark:text-gray-400 text-sm font-medium">
              {isDark ? "Dark" : "Light"} Mode
            </span>
          )}
        </div>
      </div>

      {/* User section */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Signed in as</div>
          <div className="text-gray-900 dark:text-gray-100 text-sm truncate font-mono">officer@railintel.gov.in</div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
