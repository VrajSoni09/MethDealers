import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <span className="text-white text-sm font-black tracking-tighter">IR</span>
        </div>
        <div>
          <span className="text-gray-900 dark:text-gray-100 font-display font-semibold text-lg tracking-tight">Rail Intelligence</span>
        </div>
      </div>

      {/* Nav Links and Theme Toggle */}
      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-8">
          {["Overview", "Features", "About"].map((item) => (
            <button
              key={item}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium text-sm transition-colors duration-200 hover:scale-105 transform"
            >
              {item}
            </button>
          ))}
        </div>
        
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* CTA */}
        <button
          onClick={() => navigate('/login')}
          className="btn-primary text-sm px-6 py-2.5 shadow-lg hover:shadow-xl"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
