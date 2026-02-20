/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "'Helvetica Neue'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
        serif: ["'Poppins'", "'Playfair Display'", "Georgia", "serif"],
        display: ["'Poppins'", "sans-serif"],
      },
      colors: {
        // Light mode colors
        light: {
          primary: "#3b82f6",
          secondary: "#8b5cf6",
          accent: "#06b6d4",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
          background: "#ffffff",
          surface: "#f8fafc",
          card: "#ffffff",
          text: "#1e293b",
          textSecondary: "#64748b",
          border: "#e2e8f0",
          muted: "#f1f5f9",
        },
        // Dark mode colors (existing rail theme enhanced)
        dark: {
          primary: "#60a5fa",
          secondary: "#a78bfa",
          accent: "#22d3ee",
          success: "#34d399",
          warning: "#fbbf24",
          error: "#f87171",
          background: "#0a0a0a",
          surface: "#111111",
          card: "#1a1a1a",
          text: "#ffffff",
          textSecondary: "#a1a1aa",
          border: "#27272a",
          muted: "#18181b",
        },
        // Gradient colors
        gradient: {
          start: "#3b82f6",
          end: "#8b5cf6",
          accent: "#06b6d4",
        },
        // Card colors for variety
        card: {
          blue: "rgba(59, 130, 246, 0.1)",
          purple: "rgba(139, 92, 246, 0.1)",
          cyan: "rgba(6, 182, 212, 0.1)",
          green: "rgba(16, 185, 129, 0.1)",
          orange: "rgba(245, 158, 11, 0.1)",
          pink: "rgba(236, 72, 153, 0.1)",
        },
      },
      animation: {
        "train-move": "trainMove 8s linear infinite",
        "track-scroll": "trackScroll 1s linear infinite",
        "fade-in-up": "fadeInUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
        "slide-in": "slideIn 0.4s ease forwards",
        "count-up": "countUp 0.6s ease forwards",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        "rotate-slow": "rotate 20s linear infinite",
        "scale-pulse": "scalePulse 2s ease-in-out infinite",
      },
      keyframes: {
        trainMove: {
          "0%": { transform: "translateX(-350px)" },
          "100%": { transform: "translateX(calc(100vw + 350px))" },
        },
        trackScroll: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "-60px 0" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideIn: {
          from: { transform: "translateX(30px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.4)" },
        },
        scalePulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.4)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "card-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
