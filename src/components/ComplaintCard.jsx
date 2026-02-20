import React from "react";
import { formatDate, truncateText } from "../utils/helpers";

const ComplaintCard = ({ complaint, onView }) => {
  const { id, text, category, severity, date, confidence } = complaint;

  const getCardColor = (category) => {
    const colors = {
      "Punctuality": "card-blue",
      "Cleanliness": "card-green", 
      "Staff Behavior": "card-purple",
      "Safety": "card-orange",
      "Facilities": "card-cyan",
      "Food": "card-pink"
    };
    return colors[category] || "card-blue";
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Punctuality": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "Cleanliness": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      "Staff Behavior": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      "Safety": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      "Facilities": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
      "Food": "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300"
    };
    return colors[category] || "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
  };

  return (
    <div className={`card-interactive ${getCardColor(category)} p-6 flex flex-col gap-4 animate-fade-in-up`} style={{ opacity: 0 }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700">
            #{id}
          </span>
        </div>
        <span className="text-gray-500 dark:text-gray-400 font-mono text-xs flex-shrink-0">{formatDate(date)}</span>
      </div>

      {/* Text */}
      <p className="text-gray-900 dark:text-gray-100 text-sm leading-relaxed">
        {truncateText(text, 130)}
      </p>

      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`font-mono text-xs px-3 py-1 rounded-full ${getCategoryColor(category)}`}>
          {category}
        </span>
        <span className={`tag-${severity.toLowerCase()}`}>
          {severity}
        </span>
        <span className="font-mono text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full ml-auto">
          {(confidence * 100).toFixed(0)}% confidence
        </span>
      </div>

      {/* Action */}
      <div className="pt-2">
        <button
          onClick={() => onView(complaint)}
          className="btn-primary text-sm w-full"
        >
          View Details →
        </button>
      </div>
    </div>
  );
};

export default ComplaintCard;
