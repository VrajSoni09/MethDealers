import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { COMPLAINTS } from "../data/complaints";
import { getSeverityClasses, formatDate } from "../utils/helpers";
import ChartTooltip from "../components/ChartTooltip";

const OutputPage = () => {
  const { complaintId } = useParams();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load complaint from localStorage
    const stored = localStorage.getItem(`complaint_${complaintId}`);
    if (stored) {
      setComplaint(JSON.parse(stored));
    } else {
      navigate("/complaints");
    }
    setLoading(false);
  }, [complaintId, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={`text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <h2 className="text-2xl font-bold mb-4">Complaint Not Found</h2>
          <p className="mb-4">The complaint you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/complaints")}
            className={`px-6 py-2 rounded-lg font-medium ${
              isDark 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Back to Complaints
          </button>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "HIGH": return "text-red-600";
      case "MEDIUM": return "text-yellow-600";
      case "LOW": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
   <>
     <div className={`min-h-screen ${isDark ? 'bg-gray-950' : 'bg-gray-50'} py-8`}>
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate("/complaints")}
          className={`mb-6 flex items-center gap-2 text-sm font-medium ${
            isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          ← Back to Complaints
        </button>

        <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
          <div className="mb-6">
            <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Complaint Details
            </h1>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              ID: {complaint.id}
            </div>
          </div>
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
      
      <div className={`border p-5 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>AI Reasoning Summary</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          {[
            { label: "Key Tokens Detected", value: `"delayed", "stranded", "no announcement"` },
            { label: "Sentiment Score", value: "−0.72 (Strongly Negative)" },
            { label: "Pattern Match", value: `${complaint.cluster ? 8 : 0} similar complaints in ${complaint.cluster || 'N/A'}` },
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
   </>
  );
};

export default OutputPage;
