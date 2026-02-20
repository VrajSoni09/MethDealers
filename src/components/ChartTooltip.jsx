import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ChartTooltip = ({ active, payload, label }) => {
  const { isDark } = useTheme();
  
  if (!active || !payload || !payload.length) return null;

  return (
    <div className={`px-3 py-2 font-mono text-xs shadow-xl border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
      {label && <div className={`mb-1 text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{label}</div>}
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span style={{ color: p.color || (isDark ? "#fff" : "#000") }}>■</span>
          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{p.name}:</span>
          <span className="font-bold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default ChartTooltip;
