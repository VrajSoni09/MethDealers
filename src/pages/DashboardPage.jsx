import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, BarChart, Bar, ScatterChart, Scatter, ResponsiveContainer, Legend,
} from "recharts";
import StatCard from "../components/StatCard";
import ChartTooltip from "../components/ChartTooltip";
import { PIE_DATA, LINE_DATA, BAR_DATA, SCATTER_DATA } from "../data/chartData";
import { formatDate } from "../utils/helpers";

const SectionCard = ({ title, children }) => {
  const { isDark } = useTheme();
  return (
    <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
      <div className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{title}</div>
      {children}
    </div>
  );
};

const DashboardPage = ({ apiService }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  // Initialize with zero data
  const [stats, setStats] = useState({
    totalComplaints: 0,
    resolvedToday: 0,
    pendingReview: 0,
    avgResolutionTime: 0,
    criticalIssues: 0
  });

  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complaintsData, statsData] = await Promise.all([
          apiService.getComplaints(),
          apiService.getStats()
        ]);
        
        setRecentComplaints(complaintsData.slice(0, 5)); // Show latest 5
        setStats(statsData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiService]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className={`text-2xl font-black font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Dashboard</h1>
          <p className={`font-mono text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            AI Complaint Intelligence · System Overview · Live
          </p>
        </div>
        <div className={`flex items-center gap-2 border px-3 py-2 ${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-slow" />
          <span className={`font-mono text-[10px] uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>System Online</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Complaints"
          value={stats.totalComplaints}
          isNum={true}
          colorVariant="blue"
          icon="📊"
        />
        <StatCard
          label="Resolved Today"
          value={stats.resolvedToday}
          isNum={true}
          colorVariant="green"
          icon="✅"
        />
        <StatCard
          label="Pending Review"
          value={stats.pendingReview}
          isNum={true}
          colorVariant="orange"
          icon="⏳"
        />
        <StatCard
          label="Critical Issues"
          value={stats.criticalIssues}
          isNum={true}
          colorVariant="pink"
          icon="🚨"
        />
      </div>

      {/* Recent Complaints Section */}
      <SectionCard title="Recent Complaints">
        <div className="space-y-3">
          {recentComplaints.length === 0 ? (
            <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="text-4xl mb-2">📋</div>
              <p className="font-mono text-sm">No complaints submitted yet</p>
              <p className="font-mono text-xs mt-1">Submit your first complaint to see it here</p>
            </div>
          ) : (
            recentComplaints.map((complaint) => (
              <div
                key={complaint.id}
                className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        complaint.severity === 'High'
                          ? 'bg-red-100 text-red-700'
                          : complaint.severity === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {complaint.severity}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {complaint.category}
                      </span>
                    </div>
                    <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                      {complaint.text.substring(0, 100)}...
                    </p>
                    <div className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {complaint.location} • {formatDate(complaint.timestamp)}
                    </div>
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
              </div>
            ))
          )}
        </div>
      </SectionCard>

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
