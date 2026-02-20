/**
 * Returns Tailwind classes for severity badge
 */
export const getSeverityClasses = (severity) => {
  switch (severity) {
    case "High":
      return "bg-red-900/30 text-red-400 border border-red-800";
    case "Medium":
      return "bg-yellow-900/30 text-yellow-400 border border-yellow-800";
    case "Low":
      return "bg-green-900/30 text-green-400 border border-green-800";
    default:
      return "bg-white/10 text-white/60 border border-white/10";
  }
};

/**
 * Returns hex color for severity
 */
export const getSeverityColor = (severity) => {
  switch (severity) {
    case "High":
      return "#ef4444";
    case "Medium":
      return "#eab308";
    case "Low":
      return "#22c55e";
    default:
      return "#ffffff";
  }
};

/**
 * Returns left border color for stat cards
 */
export const getSeverityBorderColor = (type) => {
  switch (type) {
    case "high":
      return "#ef4444";
    case "medium":
      return "#eab308";
    case "low":
      return "#22c55e";
    default:
      return "transparent";
  }
};

/**
 * Formats date string to locale display
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

/**
 * Truncates text to given length
 */
export const truncateText = (text, maxLen = 120) => {
  if (!text) return "";
  return text.length > maxLen ? text.slice(0, maxLen) + "…" : text;
};

/**
 * Generates a random complaint ID
 */
export const generateId = () => {
  return "CMP-" + Math.floor(Math.random() * 9000 + 1000);
};
