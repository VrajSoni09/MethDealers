import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TrainAnimation from "../components/TrainAnimation";
import { useTheme } from "../contexts/ThemeContext";

const HERO_STATS = [
  { label: "Complaints Processed", value: "2.4M+", colorVariant: "blue" },
  { label: "Model Accuracy", value: "94.7%", colorVariant: "green" },
  { label: "Railway Zones", value: "18", colorVariant: "purple" },
  { label: "Avg Resolution", value: "4.2 days", colorVariant: "orange" },
];

const FEATURES = [
  {
    icon: "🎯",
    title: "AI Categorization",
    desc: "NLP models automatically classify complaints into 12 categories with 94.7% accuracy.",
    colorVariant: "blue"
  },
  {
    icon: "⚡",
    title: "Severity Detection",
    desc: "Real-time severity scoring flags critical complaints for immediate action.",
    colorVariant: "orange"
  },
  {
    icon: "🔍",
    title: "Pattern Recognition",
    desc: "Clustering algorithms identify systemic issues across routes, coaches, and zones.",
    colorVariant: "purple"
  },
  {
    icon: "📊",
    title: "Live Dashboard",
    desc: "Real-time analytics across all 18 railway zones with interactive visualizations.",
    colorVariant: "cyan"
  },
];

const LandingPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Staggered reveal using CSS animation delays
    const els = heroRef.current?.querySelectorAll("[data-reveal]");
    els?.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.15}s`;
    });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
      <Navbar />

      {/* Hero */}
      <main
        ref={heroRef}
        className="flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-16 text-center relative"
      >
        {/* Enhanced background effects */}
        {/* <div className="fixed inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none" /> */}
        
        {isDark && (
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
        )}

        <div
          data-reveal
          className="animate-fade-in-up inline-flex items-center px-4 py-2 mb-6 bg-gray-100 dark:bg-gray-800 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-300 text-xs font-medium uppercase tracking-wider border border-gray-200 dark:border-gray-700"
          style={{ opacity: 0 }}
        >
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
          Government of India · Ministry of Railways · AI Division
        </div>

        <h1
          data-reveal
          className="animate-fade-in-up text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight leading-none mb-1 max-w-5xl"
          style={{ opacity: 0 }}
        >
          <h2 className="gradient-bg">Rail Checker</h2>
          <span className="text-black dark:text-white text-3xl font-normal tracking-wider">Complaint Intelligence</span>
        </h1>

        <p
          data-reveal
          className="animate-fade-in-up text-black dark:text-white text-lg md:text-xl max-w-3xl leading-relaxed mb-3 font-light"
          style={{ opacity: 0 }}
        >
          Advanced machine learning for automatic categorization, severity detection, and pattern
          discovery across millions of Indian Railways passenger complaints. Powered by transformer
          models trained on 2.4M+ real complaints.
        </p>

        <div data-reveal className="animate-fade-in-up flex flex-col sm:flex-row gap-4 mb-2" style={{ opacity: 0 }}>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary text-base px-8 py-4 shadow-lg hover:shadow-xl"
          >
            Login to Dashboard →
          </button>
          <button className="btn-outline text-base px-8 py-4">
            View Demo
          </button>
        </div>

        <TrainAnimation />

        {/* Enhanced Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
          style={{ opacity: 0, animationDelay: "0.8s" }}
        >
          {HERO_STATS.map((s, index) => (
            <div
              key={s.label}
              className={`card-interactive card-${s.colorVariant} p-6 text-center animate-fade-in-up`}
              style={{ animationDelay: `${0.8 + index * 0.1}s` }}
            >
              <div className="text-gray-900 dark:text-gray-100 text-2xl font-bold font-display mb-2">
                {s.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Enhanced Features section */}
      <section className="px-6 py-20 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">
              System Capabilities
            </div>
            <h2 className="text-gray-900 dark:text-gray-100 text-4xl font-black font-display mb-4">
              Intelligence at Scale
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Our comprehensive suite of AI-powered tools transforms railway complaint management
              through advanced machine learning and real-time analytics.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((f, index) => (
              <div
                key={f.title}
                className={`card-interactive card-${f.colorVariant} p-8 animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-gray-900 dark:text-gray-100 font-bold text-xl mb-3 font-display">
                  {f.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
