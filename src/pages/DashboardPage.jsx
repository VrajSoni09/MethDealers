import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, BarChart, Bar, ScatterChart, Scatter, ResponsiveContainer, Legend,
} from "recharts";
import StatCard from "../components/StatCard";
import ChartTooltip from "../components/ChartTooltip";
import { PIE_DATA, LINE_DATA, BAR_DATA, SCATTER_DATA } from "../data/chartData";
import ComplaintCard from "../components/ComplaintCard";
import { formatDate } from "../utils/helpers";

const DashboardPage = ({ onToast }) => {
  const { isDark } = useTheme();
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    highPriority: 0,
  });

  useEffect(() => {
    // Load complaints from localStorage
    const storedComplaints = Object.keys(localStorage)
      .filter(key => key.startsWith('complaint_'))
      .map(key => JSON.parse(localStorage.getItem(key)))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    setComplaints(storedComplaints);

    // Calculate stats
    const total = storedComplaints.length;
    const pending = storedComplaints.filter(c => c.status === 'pending').length;
    const resolved = storedComplaints.filter(c => c.status === 'resolved').length;
    const highPriority = storedComplaints.filter(c => c.severity === 'HIGH').length;

    setStats({ total, pending, resolved, highPriority });
  }, []);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Dashboard
        </h1>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Welcome to the Rail Complaint Management System
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Complaints"
          value={stats.total}
          icon="📊"
          color="blue"
          isDark={isDark}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon="⏳"
          color="yellow"
          isDark={isDark}
        />
        <StatCard
          title="Resolved"
          value={stats.resolved}
          icon="✅"
          color="green"
          isDark={isDark}
        />
        <StatCard
          title="High Priority"
          value={stats.highPriority}
          icon="🚨"
          color="red"
          isDark={isDark}
        />
      </div>

      {/* Recent Complaints */}
      <div>
        <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Recent Complaints
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.slice(0, 6).map((complaint) => (
            <div key={complaint.id}>
              <ComplaintCard
                complaint={complaint}
                onClick={() => onToast(`Viewing complaint #${complaint.id}`, 'info')}
                isDark={isDark}
              />
              <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                {complaint.text.substring(0, 100)}...
              </p>
              <div className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {complaint.location} • {formatDate(complaint.timestamp)}
              </div>
              <button
                onClick={() => navigate(`/app/output/${complaint.id}`)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  isDark
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Complaints by Category">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={recentComplaints.length > 0 ? [
                  { name: "Service Delay", value: recentComplaints.filter(c => c.category === "Service Delay").length, fill: "#3B82F6" },
                  { name: "Cleanliness", value: recentComplaints.filter(c => c.category === "Cleanliness").length, fill: "#8B5CF6" },
                  { name: "Facility", value: recentComplaints.filter(c => c.category === "Facility").length, fill: "#10B981" },
                  { name: "Staff Behavior", value: recentComplaints.filter(c => c.category === "Staff Behavior").length, fill: "#F59E0B" },
                ] : [
                  { name: "No Data", value: 1, fill: "#E5E7EB" }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {recentComplaints.length > 0 ? (
                  PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))
                ) : (
                  <Cell fill="#E5E7EB" />
                )}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Daily Complaints Trend">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={recentComplaints.length > 0 ? LINE_DATA : [
              { date: "Mon", complaints: 0 },
              { date: "Tue", complaints: 0 },
              { date: "Wed", complaints: 0 },
              { date: "Thu", complaints: 0 },
              { date: "Fri", complaints: 0 },
              { date: "Sat", complaints: 0 },
              { date: "Sun", complaints: 0 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#E5E7EB"} />
              <XAxis
                dataKey="date"
                stroke={isDark ? "#9CA3AF" : "#6B7280"}
                tick={{ fill: isDark ? "#9CA3AF" : "#6B7280", fontSize: 12 }}
              />
              <YAxis
                stroke={isDark ? "#9CA3AF" : "#6B7280"}
                tick={{ fill: isDark ? "#9CA3AF" : "#6B7280", fontSize: 12 }}
              />
              <Tooltip content={<ChartTooltip isDark={isDark} />} />
              <Line
                type="monotone"
                dataKey="complaints"
                stroke={isDark ? "#3B82F6" : "#2563EB"}
                strokeWidth={2}
                dot={{ fill: isDark ? "#3B82F6" : "#2563EB", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Category vs Severity Breakdown">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={BAR_DATA} barSize={10} barCategoryGap="30%">
              <CartesianGrid stroke={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} />
              <XAxis
                dataKey="category"
                tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 9, fontFamily: "monospace" }}
                axisLine={{ stroke: isDark ? "#374151" : "#d1d5db" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 9, fontFamily: "monospace" }}
                axisLine={{ stroke: isDark ? "#374151" : "#d1d5db" }}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Legend formatter={(v) => <span style={{ color: isDark ? "#9ca3af" : "#6b7280", fontSize: 10, fontFamily: "monospace" }}>{v}</span>} />
              <Bar dataKey="High" fill="#ef4444" />
              <Bar dataKey="Medium" fill="#eab308" />
              <Bar dataKey="Low" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Complaint Cluster Scatter Plot">
          <ResponsiveContainer width="100%" height={230}>
            <ScatterChart>
              <CartesianGrid stroke={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} />
              <XAxis
                type="number"
                dataKey="x"
                name="Feature X"
                tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 9, fontFamily: "monospace" }}
                axisLine={{ stroke: isDark ? "#374151" : "#d1d5db" }}
                tickLine={false}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Feature Y"
                tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 9, fontFamily: "monospace" }}
                axisLine={{ stroke: isDark ? "#374151" : "#d1d5db" }}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: isDark ? "#4b5563" : "#9ca3af" }} />
              <Scatter data={SCATTER_DATA} fill={isDark ? "#ffffff" : "#000000"} opacity={0.6} />
            </ScatterChart>
          </ResponsiveContainer>
          <div className="mt-3 flex flex-wrap gap-3">
            {[
              { label: "Delay", color: isDark ? "#ffffff" : "#000000" },
              { label: "Safety", color: isDark ? "#9ca3af" : "#6b7280" },
              { label: "Cleanliness", color: isDark ? "#6b7280" : "#4b5563" },
              { label: "Food", color: isDark ? "#4b5563" : "#374151" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                <span className={`font-mono text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{c.label}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Quick activity */}
      <SectionCard title="Recent System Activity">
        <div className="space-y-2">
          {[
            { time: "2 min ago", event: "CMP-011 flagged as High severity — Safety violation detected", dot: "#ef4444" },
            { time: "8 min ago", event: "Model retrained on 450 new complaints — Accuracy improved to 94.7%", dot: "#22c55e" },
            { time: "15 min ago", event: "Cluster C1 (Delay) grew by 12 complaints — Route 12345 affected", dot: "#eab308" },
            { time: "22 min ago", event: "CMP-004 escalated — Food safety complaint forwarded to hygiene dept.", dot: "#ef4444" },
            { time: "1 hr ago", event: "Daily digest report generated for Northern Railway Zone", dot: isDark ? "#ffffff" : "#000000" },
          ].map((item, i) => (
            <div key={i} className={`flex items-start gap-3 py-2 border-b last:border-0 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.dot }} />
              <div className="flex-1">
                <div className={`font-mono text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.event}</div>
              </div>
              <div className={`font-mono text-[10px] flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.time}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default DashboardPage;
