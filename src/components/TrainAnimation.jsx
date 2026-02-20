import React, { useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { gsap } from "gsap";

const TrainSVG = ({ isDark }) => (
  <svg width="756" height="118" viewBox="0 0 756 118" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Engine body */}
    <rect x="0" y="21.6" width="243" height="81" rx="5.4" fill={isDark ? "#ea580c" : "#f97316"} stroke={isDark ? "#dc2626" : "#ea580c"} strokeWidth="2.7" />
    <rect x="216" y="32.4" width="59.4" height="59.4" rx="2.7" fill={isDark ? "#dc2626" : "#ea580c"} stroke={isDark ? "#b91c1c" : "#dc2626"} strokeWidth="2.7" />
    {/* Engine accent stripe */}
    <rect x="5.4" y="24.3" width="162" height="13.5" rx="0" fill={isDark ? "#fed7aa" : "#fdba74"} />
    {/* Chimney */}
    <rect x="221.4" y="8.1" width="21.6" height="27" rx="2.7" fill={isDark ? "#dc2626" : "#ea580c"} stroke={isDark ? "#b91c1c" : "#dc2626"} strokeWidth="1.35" />
    {/* Front buffer */}
    <rect x="0" y="43.2" width="10.8" height="43.2" rx="0" fill={isDark ? "#c2410c" : "#ea580c"} />
    <rect x="0" y="51.3" width="16.2" height="5.4" rx="0" fill={isDark ? "#dc2626" : "#ea580c"} />
    <rect x="0" y="67.5" width="16.2" height="5.4" rx="0" fill={isDark ? "#dc2626" : "#ea580c"} />
    {/* Engine windows */}
    <rect x="27" y="29.7" width="37.8" height="24.3" rx="2.7" fill={isDark ? "#1e293b" : "#334155"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="1.35" />
    <rect x="75.6" y="29.7" width="37.8" height="24.3" rx="2.7" fill={isDark ? "#1e293b" : "#334155"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="1.35" />
    <rect x="124.2" y="29.7" width="37.8" height="24.3" rx="2.7" fill={isDark ? "#1e293b" : "#334155"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="1.35" />
    {/* Window reflections */}
    <rect x="29.7" y="32.4" width="10.8" height="8.1" rx="0" fill={isDark ? "#fdba74" : "#fed7aa"} opacity="0.8" />
    <rect x="78.3" y="32.4" width="10.8" height="8.1" rx="0" fill={isDark ? "#fdba74" : "#fed7aa"} opacity="0.8" />
    {/* Engine wheels */}
    <circle cx="48.6" cy="108" r="16.2" fill={isDark ? "#c2410c" : "#ea580c"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="2.7" />
    <circle cx="48.6" cy="108" r="8.1" fill={isDark ? "#dc2626" : "#ea580c"} stroke={isDark ? "#b91c1c" : "#dc2626"} strokeWidth="1.35" />
    <circle cx="148.5" cy="108" r="16.2" fill={isDark ? "#c2410c" : "#ea580c"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="2.7" />
    <circle cx="148.5" cy="108" r="8.1" fill={isDark ? "#dc2626" : "#ea580c"} stroke={isDark ? "#b91c1c" : "#dc2626"} strokeWidth="1.35" />
    <circle cx="216" cy="108" r="13.5" fill={isDark ? "#c2410c" : "#ea580c"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="2.7" />
    <circle cx="216" cy="108" r="6.75" fill={isDark ? "#dc2626" : "#ea580c"} />
    {/* Coupling */}
    <rect x="243" y="59.4" width="27" height="10.8" rx="0" fill={isDark ? "#dc2626" : "#ea580c"} />

    {/* Coach 1 */}
    <rect x="270" y="27" width="210.6" height="75.6" rx="2.7" fill={isDark ? "#ea580c" : "#f97316"} stroke={isDark ? "#dc2626" : "#ea580c"} strokeWidth="2.7" />
    <rect x="275.4" y="29.7" width="199.8" height="10.8" rx="0" fill={isDark ? "#dc2626" : "#ea580c"} />
    <rect x="280.8" y="35.1" width="48.6" height="27" rx="2.7" fill={isDark ? "#1e293b" : "#334155"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="1.35" />
    <rect x="340.2" y="35.1" width="48.6" height="27" rx="2.7" fill={isDark ? "#1e293b" : "#334155"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="1.35" />
    <rect x="399.6" y="35.1" width="48.6" height="27" rx="2.7" fill={isDark ? "#1e293b" : "#334155"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="1.35" />
    <rect x="459" y="35.1" width="16.2" height="27" rx="0" fill={isDark ? "#1e293b" : "#334155"} stroke={isDark ? "#dc2626" : "#ea580c"} strokeWidth="1.35" />
    {/* Coach 1 label */}
    <rect x="291.6" y="70.2" width="162" height="8.1" rx="0" fill={isDark ? "#c2410c" : "#ea580c"} />
    {/* Coach 1 wheels */}
    <circle cx="318.6" cy="108" r="13.5" fill={isDark ? "#c2410c" : "#ea580c"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="2.7" />
    <circle cx="318.6" cy="108" r="6.75" fill={isDark ? "#dc2626" : "#ea580c"} />
    <circle cx="432" cy="108" r="13.5" fill={isDark ? "#c2410c" : "#ea580c"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="2.7" />
    <circle cx="432" cy="108" r="6.75" fill={isDark ? "#dc2626" : "#ea580c"} />
    {/* Coupling */}
    <rect x="480.6" y="59.4" width="27" height="10.8" rx="0" fill={isDark ? "#dc2626" : "#ea580c"} />

    {/* Coach 2 */}
    <rect x="507.6" y="27" width="210.6" height="75.6" rx="2.7" fill={isDark ? "#ea580c" : "#f97316"} stroke={isDark ? "#dc2626" : "#ea580c"} strokeWidth="2.7" />
    <rect x="513" y="29.7" width="199.8" height="10.8" rx="0" fill={isDark ? "#dc2626" : "#ea580c"} />
    <rect x="518.4" y="35.1" width="48.6" height="27" rx="2.7" fill={isDark ? "#1e293b" : "#334155"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="1.35" />
    <rect x="577.8" y="35.1" width="48.6" height="27" rx="2.7" fill={isDark ? "#1e293b" : "#334155"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="1.35" />
    <rect x="637.2" y="35.1" width="48.6" height="27" rx="2.7" fill={isDark ? "#1e293b" : "#334155"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="1.35" />
    <rect x="696.6" y="35.1" width="16.2" height="27" rx="0" fill={isDark ? "#1e293b" : "#334155"} stroke={isDark ? "#dc2626" : "#ea580c"} strokeWidth="1.35" />
    <rect x="529.2" y="70.2" width="162" height="8.1" rx="0" fill={isDark ? "#c2410c" : "#ea580c"} />
    {/* Coach 2 wheels */}
    <circle cx="556.2" cy="108" r="13.5" fill={isDark ? "#c2410c" : "#ea580c"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="2.7" />
    <circle cx="556.2" cy="108" r="6.75" fill={isDark ? "#dc2626" : "#ea580c"} />
    <circle cx="669.6" cy="108" r="13.5" fill={isDark ? "#c2410c" : "#ea580c"} stroke={isDark ? "#fdba74" : "#fed7aa"} strokeWidth="2.7" />
    <circle cx="669.6" cy="108" r="6.75" fill={isDark ? "#dc2626" : "#ea580c"} />
  </svg>
);

const TrainAnimation = () => {
  const trainRef = useRef(null);
  const smokeRef = useRef(null);
  const trackRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const train = trainRef.current;
    const smoke = smokeRef.current;
    const track = trackRef.current;

    if (!train || !smoke || !track) return;

    // Set initial positions
    gsap.set(train, { x: -945 });
    gsap.set(smoke, { opacity: 0.15, scale: 1 });

    // Train movement animation
    const trainTimeline = gsap.timeline({ repeat: -1 });
    trainTimeline.to(train, {
      x: window.innerWidth + 945,
      duration: 8,
      ease: "none",
    });

    // Smoke animation
    const smokeTimeline = gsap.timeline({ repeat: -1 });
    smokeTimeline
      .to(smoke, {
        opacity: 0.25,
        y: "-=8",
        scaleX: 1.15,
        duration: 2,
        ease: "power1.inOut",
      })
      .to(smoke, {
        opacity: 0.15,
        y: "+=8",
        scaleX: 1,
        duration: 2,
        ease: "power1.inOut",
      });

    // Track scrolling animation
    const trackTimeline = gsap.timeline({ repeat: -1 });
    trackTimeline.to(track, {
      backgroundPosition: "-70px 0",
      duration: 1,
      ease: "none",
    });

    // Cleanup
    return () => {
      trainTimeline.kill();
      smokeTimeline.kill();
      trackTimeline.kill();
    };
  }, []);

  return (
    <div className="relative w-full h-24 overflow-hidden select-none pointer-events-none mt-24">
      {/* Track Layer - Behind train */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        {/* Compact track base */}
        <div className={`absolute bottom-2 left-0 right-0 h-2 ${isDark ? 'bg-gray-800' : 'bg-gray-300'} border-t border-b ${isDark ? 'border-gray-700' : 'border-gray-400'}`} />

        {/* Compact track sleepers */}
        <div
          ref={trackRef}
          className="absolute bottom-2 left-0 right-0 h-3"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 45px, ${isDark ? 'rgba(156, 163, 175, 0.2)' : 'rgba(107, 114, 128, 0.3)'} 45px, ${isDark ? 'rgba(156, 163, 175, 0.2)' : 'rgba(107, 114, 128, 0.3)'} 63px)`,
            backgroundSize: "63px 100%",
          }}
        />

        {/* Compact rail lines */}
        <div className={`absolute bottom-3 left-0 right-0 h-0.5 ${isDark ? 'bg-gray-600' : 'bg-gray-500'}`} />
        <div className={`absolute bottom-2 left-0 right-0 h-0.5 ${isDark ? 'bg-gray-600' : 'bg-gray-500'}`} />
      </div>

      {/* Enhanced smoke effect */}
      <div
        ref={smokeRef}
        className="absolute z-20"
        style={{ bottom: "140px", left: "243px", width: "108px", height: "81px" }}
      >
        <div className={`w-13.5 h-13.5 rounded-full ${isDark ? 'bg-orange-300' : 'bg-orange-200'} blur-sm`} />
        <div className={`w-18.9 h-18.9 rounded-full ${isDark ? 'bg-orange-200' : 'bg-orange-100'} blur-md -mt-10.8 ml-8.1`} />
        <div className={`w-10.8 h-10.8 rounded-full ${isDark ? 'bg-orange-400' : 'bg-orange-300'} blur-sm -mt-8.1 ml-16.2`} />
      </div>

      {/* Train with GSAP animation - Above track */}
      <div
        ref={trainRef}
        className="absolute bottom-0 z-30"
        style={{ filter: isDark ? 'brightness(1.1)' : 'brightness(0.9)' }}
      >
        <TrainSVG isDark={isDark} />
      </div>
    </div>
  );
};

export default TrainAnimation;
