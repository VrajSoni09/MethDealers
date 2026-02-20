import React, { useState, useEffect } from "react";

const AnimatedNumber = ({ target, duration = 1600 }) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setVal(Math.floor(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{val.toLocaleString()}</span>;
};

const StatCard = ({ label, value, isNum, colorVariant = "blue", icon, sub }) => {
  const colorClasses = {
    blue: "card-blue",
    purple: "card-purple", 
    cyan: "card-cyan",
    green: "card-green",
    orange: "card-orange",
    pink: "card-pink"
  };

  const iconColors = {
    blue: "text-blue-500 dark:text-blue-400",
    purple: "text-purple-500 dark:text-purple-400",
    cyan: "text-cyan-500 dark:text-cyan-400",
    green: "text-green-500 dark:text-green-400",
    orange: "text-orange-500 dark:text-orange-400",
    pink: "text-pink-500 dark:text-pink-400"
  };

  return (
    <div
      className={`card-interactive ${colorClasses[colorVariant]} p-6 flex flex-col gap-3 animate-fade-in-up`}
      style={{
        opacity: 0,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="text-gray-600 dark:text-gray-400 font-medium text-sm uppercase tracking-wider">
          {label}
        </div>
        {icon && (
          <span className={`${iconColors[colorVariant]} text-xl transition-transform duration-300 hover:scale-110`}>
            {icon}
          </span>
        )}
      </div>
      <div className="text-gray-900 dark:text-gray-100 text-3xl font-bold font-display">
        {isNum ? <AnimatedNumber target={parseInt(value)} /> : value}
      </div>
      {sub && (
        <div className="text-gray-600 dark:text-gray-400 font-mono text-xs">
          {sub}
        </div>
      )}
    </div>
  );
};

export default StatCard;
