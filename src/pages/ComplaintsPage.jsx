import React, { useState, useMemo, useEffect } from "react";
import { CATEGORIES, SEVERITIES } from "../data/complaints";
import { useTheme } from "../contexts/ThemeContext";
import { formatDate } from "../utils/helpers";
import { useNavigate } from 'react-router-dom';

const ComplaintsPage = ({ onView, apiService }) => {
  const { isDark } = useTheme();
  
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState({
    category: "All",
    severity: "All",
    date: "",
    search: ""
  });
  const [loading, setLoading] = useState(true);

  // Fetch complaints from API
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await apiService.getComplaints();
        setComplaints(data);
      } catch (error) {
        console.error('Failed to fetch complaints:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [apiService]);

  // Filter complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesCategory = filter.category === "All" || c.category === filter.category;
      const matchesSeverity = filter.severity === "All" || c.severity === filter.severity;
      const matchesSearch = filter.search === "" || 
        c.text.toLowerCase().includes(filter.search.toLowerCase());
      return matchesCategory && matchesSeverity && matchesSearch;
    });
  }, [complaints, filter]);

  const resetFilters = () => {
    setFilter({ category: "All", severity: "All", search: "" });
  };

  const highCount = filteredComplaints.filter((c) => c.severity === "High").length;
  const medCount = filteredComplaints.filter((c) => c.severity === "Medium").length;
  const lowCount = filteredComplaints.filter((c) => c.severity === "Low").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className={`text-2xl font-black font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Complaints</h1>
          <p className={`font-mono text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {filteredComplaints.length} results ·{" "}
            <span className="text-red-400">{highCount} High</span> ·{" "}
            <span className="text-yellow-400">{medCount} Medium</span> ·{" "}
            <span className="text-green-400">{lowCount} Low</span>
          </p>
        </div>
        <div className={`font-mono text-[10px] border px-3 py-2 ${
          isDark ? 'text-gray-300 border-gray-600' : 'text-gray-700 border-gray-300'
        }`}>
          Showing {filteredComplaints.length} of {complaints.length} total
        </div>
      </div>

      {/* Filter Panel */}
      <div className={`border rounded-lg p-4 space-y-3 ${
        isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
            <select
              value={filter.category}
              onChange={(e) => setFilter(f => ({ ...f, category: e.target.value }))}
              className={`w-full px-3 py-2 rounded text-sm border ${
                isDark ? 'bg-gray-900 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Severity</label>
            <select
              value={filter.severity}
              onChange={(e) => setFilter(f => ({ ...f, severity: e.target.value }))}
              className={`w-full px-3 py-2 rounded text-sm border ${
                isDark ? 'bg-gray-900 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="All">All Severities</option>
              {SEVERITIES.map((sev) => (
                <option key={sev} value={sev}>{sev}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
            <input
              type="date"
              value={filter.date}
              onChange={(e) => setFilter(f => ({ ...f, date: e.target.value }))}
              className={`w-full px-3 py-2 rounded text-sm border ${
                isDark ? 'bg-gray-900 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
          <div>
            <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Search</label>
            <input
              type="text"
              value={filter.search}
              onChange={(e) => setFilter(f => ({ ...f, search: e.target.value }))}
              placeholder="Search complaints..."
              className={`w-full px-3 py-2 rounded text-sm border ${
                isDark ? 'bg-gray-900 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
        </div>
        <button
          onClick={resetFilters}
          className={`text-xs px-3 py-1 rounded transition-colors ${
            isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Reset Filters
        </button>
      </div>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredComplaints.length === 0 ? (
          <div className={`col-span-full text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <div className="text-4xl mb-4">📋</div>
            <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>No complaints found</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {filteredComplaints.length === 0 
                ? "No complaints have been submitted yet. Submit your first complaint to see it here."
                : "No complaints match your current filters. Try adjusting your search criteria."
              }
            </p>
          </div>
        ) : (
          filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className={`p-4 rounded-lg border transition-all hover:shadow-lg cursor-pointer ${
                isDark
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => onView(complaint)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
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
                <span className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formatDate(complaint.timestamp)}
                </span>
              </div>
              <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                {complaint.text.substring(0, 120)}...
              </h3>
              <div className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                📍 {complaint.location}
                {complaint.trainNo && ` • Train ${complaint.trainNo}`}
              </div>
              {complaint.confidence && (
                <div className={`mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  AI Confidence: {(complaint.confidence * 100).toFixed(1)}%
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {/* Results */}
      {filteredComplaints.length === 0 ? (
        <div className={`border rounded-lg p-16 text-center ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`text-4xl mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>📋</div>
          <div className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No complaints match your filters.</div>
          <button onClick={resetFilters} className={`mt-4 font-mono text-xs underline transition-colors ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
            Clear filters
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ComplaintsPage;
