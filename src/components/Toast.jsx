import React, { useEffect } from "react";

const Toast = ({ msg, onClose, type = "success" }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";
  const iconColor = type === "success" ? "text-green-500" : type === "error" ? "text-red-400" : "text-white/60";
  const borderColor = type === "success" ? "border-green-600" : type === "error" ? "border-red-600" : "border-white/20";

  return (
    <div
      className={`fixed top-6 right-6 z-50 bg-black border ${borderColor} border-l-4 px-6 py-4 shadow-2xl font-mono text-sm flex items-center gap-4 animate-slide-in max-w-sm`}
    >
      <span className={`${iconColor} text-base flex-shrink-0`}>{icon}</span>
      <div className="flex-1">
        <div className="text-white/80 text-xs">{msg}</div>
      </div>
      <button
        onClick={onClose}
        className="text-white/20 hover:text-white transition-colors text-xs flex-shrink-0"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
