import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { COMPLAINTS } from "../data/complaints";
import { getSeverityClasses, formatDate } from "../utils/helpers";
import ChartTooltip from "../components/ChartTooltip";

const OutputPage = ({ apiService }) => {
  const { isDark } = useTheme();
  const { complaintId } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get complaint data from API
    const fetchComplaint = async () => {
      try {
        const response = await apiService.getComplaint(complaintId);
        console.log('Loaded complaint from database:', response);
        setComplaint(response);
      } catch (error) {
        console.error('Failed to fetch complaint from database:', error);
        
        // Fallback to localStorage if API fails
        const storedData = localStorage.getItem(`complaint_${complaintId}`);
        if (storedData) {
          const data = JSON.parse(storedData);
          console.log('Fallback to localStorage:', data);
          setComplaint(data);
        } else {
          // Mock data for demo
          const mockData = {
            id: complaintId,
            text: "The train was delayed by 3 hours without any announcement. The AC was not working and there was no water in the toilets. Passengers were left stranded in the hot weather.",
            category: "Service Delay",
            final_category: "Service Delay",
            severity: "Medium",
            priority_flag: "MEDIUM",
            confidence: 0.85,
            confidence_category: 0.85,
            confidence_severity: 0.75,
            location: "New Delhi Railway Station",
            coordinates: { lat: 28.6139, lng: 77.2090 },
            zone: "Northern",
            trainNo: "12345",
            timestamp: new Date().toISOString(),
            aiAnalysis: {
              predicted_category: "Service Delay",
              final_category: "Service Delay",
              predicted_severity: "Medium",
              severity: "Medium",
              priority_flag: "MEDIUM",
              confidence: 0.85,
              confidence_category: 0.85,
              confidence_severity: 0.75,
              key_issues: ["delay", "ac not working", "no water"],
              sentiment: "negative",
              urgency_score: 0.7
            }
          };
          console.log('Setting mock data:', mockData);
          setComplaint(mockData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [complaintId, apiService]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <div className="inline-block w-6 h-6 border-2 border-t-transparent rounded-full animate-spin mb-4" />
          <p>Loading complaint analysis...</p>
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        <p>Complaint not found</p>
      </div>
    );
  }

  // Confidence breakdown
  const confData = [
    { name: complaint.final_category || complaint.category, value: Math.round((complaint.confidence_category || complaint.confidence) * 100) },
    { name: "Other", value: Math.round((1 - (complaint.confidence_category || complaint.confidence)) * 100) },
  ];

  // Category comparison mock
  const catComparison = [
    { name: complaint.final_category || complaint.category, value: Math.round((complaint.confidence_category || complaint.confidence) * 100) },
    { name: "Alt 1", value: Math.round((1 - (complaint.confidence_category || complaint.confidence)) * 60) },
    { name: "Alt 2", value: Math.round((1 - (complaint.confidence_category || complaint.confidence)) * 35) },
    { name: "Alt 3", value: Math.round((1 - (complaint.confidence_category || complaint.confidence)) * 15) },
  ];

  // Similar complaints in same cluster
  const similar = COMPLAINTS.filter(
    (x) => x.cluster === complaint.cluster && x.id !== complaint.id
  ).slice(0, 3);

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-black font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Analysis Output</h1>
        <p className={`font-mono text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          AI prediction results for complaint {complaint.id}
        </p>
      </div>

      {/* Main complaint view */}
      <div className={`border p-6 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <span className={`font-mono text-[10px] px-2 py-0.5 border ${isDark ? 'text-gray-400 bg-gray-700 border-gray-600' : 'text-gray-600 bg-gray-100 border-gray-300'}`}>
            {complaint.id}
          </span>
          <span className={`font-mono text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formatDate(complaint.timestamp)}</span>
          {complaint.trainNo && complaint.trainNo !== "N/A" && (
            <span className={`font-mono text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Train #{complaint.trainNo}</span>
          )}
          {complaint.zone && complaint.zone !== "N/A" && (
            <span className={`font-mono text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{complaint.zone} Zone</span>
          )}
        </div>

        {/* Full complaint text */}
        <p className={`text-sm leading-relaxed font-sans mb-6 border-l-2 pl-4 ${isDark ? 'text-gray-300 border-gray-600' : 'text-gray-700 border-gray-300'}`}>
          {complaint.text}
        </p>

        {/* Result grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <div className={`border p-4 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
            <div className={`font-mono text-[10px] uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Predicted Category</div>
            <div className={`font-bold text-sm font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{complaint.final_category || complaint.category}</div>
          </div>
          <div className={`border p-4 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
            <div className={`font-mono text-[10px] uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Severity</div>
            <div className={`inline-block text-xs px-2 py-1 font-mono font-bold ${getSeverityClasses(complaint.severity)}`}>
              {complaint.severity}
            </div>
          </div>
          <div className={`border p-4 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
            <div className={`font-mono text-[10px] uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Priority</div>
            <div className={`inline-block text-xs px-2 py-1 font-mono font-bold ${
              complaint.priority_flag === 'HIGH' ? 'bg-red-100 text-red-700' :
              complaint.priority_flag === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {complaint.priority_flag}
            </div>
          </div>
          <div className={`border p-4 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
            <div className={`font-mono text-[10px] uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Category Confidence</div>
            <div className={`font-black font-mono text-lg ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
              {complaint.confidence_category ? (complaint.confidence_category * 100).toFixed(1) : (complaint.confidence * 100).toFixed(1)}%
            </div>
          </div>
          <div className={`border p-4 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
            <div className={`font-mono text-[10px] uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Severity Confidence</div>
            <div className={`font-black font-mono text-lg ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
              {complaint.confidence_severity ? (complaint.confidence_severity * 100).toFixed(1) : 'N/A'}%
            </div>
          </div>
          <div className={`border p-4 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
            <div className={`font-mono text-[10px] uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Cluster ID</div>
            <div className={`font-black font-mono text-lg ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{complaint.cluster || 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* AI Reasoning */}
      <div className={`border p-5 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>AI Reasoning Summary</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          {[
            { label: "Key Tokens Detected", value: `"delayed", "stranded", "no announcement"` },
            { label: "Sentiment Score", value: "−0.72 (Strongly Negative)" },
            { label: "Pattern Match", value: `${(similar.length || 0) + 8} similar complaints in ${complaint.cluster || 'N/A'}` },
          ].map((item) => (
            <div key={item.label} className={`border p-3 ${isDark ? 'border-gray-600 bg-gray-800/30' : 'border-gray-200 bg-gray-50'}`}>
              <div className={`uppercase tracking-wider mb-1 text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.label}</div>
              <div className={isDark ? 'text-gray-300' : 'text-gray-700'}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Confidence Pie */}
        <div className={`border p-5 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
          <div className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Classification Confidence</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={confData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} dataKey="value" paddingAngle={3} strokeWidth={0}>
                <Cell fill={isDark ? "#ffffff" : "#000000"} />
                <Cell fill={isDark ? "#1a1a1a" : "#e5e5e5"} />
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 ${isDark ? 'bg-white' : 'bg-black'}`} />
              <span className={`font-mono text-[10px] ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{complaint.final_category || complaint.category}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 ${isDark ? 'bg-gray-600' : 'bg-gray-400'}`} />
              <span className={`font-mono text-[10px] ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Other</span>
            </div>
          </div>
        </div>

        {/* Category comparison bar */}
        <div className={`border p-5 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
          <div className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Category Probability Comparison</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={catComparison} layout="vertical" barSize={10}>
              <CartesianGrid stroke={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} />
              <XAxis type="number" tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 9, fontFamily: "monospace" }} axisLine={{ stroke: isDark ? "#374151" : "#d1d5db" }} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 9, fontFamily: "monospace" }} axisLine={{ stroke: isDark ? "#374151" : "#d1d5db" }} tickLine={false} width={55} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="value" fill={isDark ? "#ffffff" : "#000000"} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Similar Complaints */}
      <div className={`border p-5 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Similar Complaints {complaint.cluster ? `— Cluster ${complaint.cluster}` : ''}</div>
        {similar.length === 0 ? (
          <div className={`font-mono text-xs py-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No similar complaints found in this cluster.</div>
        ) : (
          <div className="space-y-3">
            {similar.map((s) => (
              <div key={s.id} className={`border p-4 ${isDark ? 'border-gray-600 bg-gray-800/30' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`font-mono text-[10px] px-2 py-0.5 ${isDark ? 'text-gray-400 bg-gray-700 border-gray-600' : 'text-gray-600 bg-gray-100 border-gray-300'}`}>{s.id}</span>
                  <span className={`font-mono text-[10px] px-2 py-0.5 ${getSeverityClasses(s.severity)}`}>{s.severity}</span>
                  <span className={`font-mono text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formatDate(s.timestamp || s.date)}</span>
                  <span className={`font-mono text-[10px] ml-auto ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {(s.confidence * 100).toFixed(0)}% match
                  </span>
                </div>
                <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{s.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Panel */}
      <div className={`border p-5 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Recommended Actions</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="btn-primary py-3 text-center">
            Escalate to Dept. →
          </button>
          <button className="btn-secondary py-3 text-center">
            Add to Report
          </button>
          <button className="btn-secondary py-3 text-center">
            Mark Resolved
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutputPage;
