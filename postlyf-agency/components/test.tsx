"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  Play,
  Code,
  Layout,
  MonitorPlay,
  Sparkles,
  Camera,
  ShoppingCart,
  RefreshCcw,
  Briefcase,
} from "lucide-react";

const SERVICES_DATA = {
  video: [
    { title: "Reels & Shorts Editing", desc: "High-retention short-form content engineered for TikTok, Reels, and Shorts.", icon: MonitorPlay },
    { title: "Ads & Motion Graphics", desc: "Dynamic visuals and refined typography that elevate brand storytelling.", icon: Sparkles },
    { title: "YouTube Video Editing", desc: "Long-form content optimized for retention, pacing and growth.", icon: Play },
    { title: "Corporate Video Editing", desc: "Professional storytelling for B2B and internal communications.", icon: Briefcase },
    { title: "Video Shooting", desc: "Premium cinematic production tailored to campaign goals.", icon: Camera },
  ],
  web: [
    { title: "Custom Web Development", desc: "High-performance bespoke web experiences built with modern frameworks.", icon: Code },
    { title: "Business Websites", desc: "Authoritative digital presence designed to convert.", icon: Briefcase },
    { title: "Portfolio Websites", desc: "Creative showcases that attract premium clients.", icon: Layout },
    { title: "E-Commerce Websites", desc: "Fast, frictionless stores optimized for conversions.", icon: ShoppingCart },
    { title: "Performance Optimization", desc: "Speed, UX and SEO upgrades for modern standards.", icon: RefreshCcw },
  ],
};

const ServiceLiquidButton = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Added onClick to route to your contact section since it's a "Start Project" CTA
      onClick={() => window.location.href = "/#contact"}
      // YOUR EXACT STYLING (with 'relative' added for the absolute fill to work)
      className="relative flex items-center justify-between gap-4 px-6 py-3.5 rounded-full bg-white text-black group/btn overflow-hidden hover:scale-[1.02] transition-transform duration-300 ml-auto shadow-[0_0_20px_rgba(255,255,255,0.15)]"
    >
      <span className="relative z-10 text-[11px] uppercase tracking-[0.2em] font-bold">
        Start Project
      </span>

      {/* Exact Icon Container */}
      <div className="relative z-10 w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover/btn:bg-black transition-colors duration-300">
        <ArrowUpRight className="w-3.5 h-3.5 text-black group-hover/btn:text-white transition-colors duration-300" />
      </div>

      {/* THE LIQUID FILL EFFECT */}
      <motion.div
        style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
        animate={{ width: isHovered ? "200%" : "0%", height: isHovered ? "700%" : "0%" }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute pointer-events-none rounded-full bg-[#e5e5e5] z-0"
      />
    </button>
  );
};

export default function ServicesPremium() {
  const [activeTab, setActiveTab] = useState<"video" | "web">("video");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeServices = SERVICES_DATA[activeTab];
  const HighlightedIcon = activeServices[activeIndex].icon;

  // Reset on tab switch
  useEffect(() => {
    setActiveIndex(0);
  }, [activeTab]);

  // Auto Rotate
  useEffect(() => {
    if (isHovered) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        prev === activeServices.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeServices, isHovered]);

  return (
    <section
      id="services"
      // Adjusted top and bottom padding to be perfectly equal for balanced vertical alignment
      className="relative w-full min-h-screen lg:h-[100dvh] bg-[#050505] overflow-hidden text-white flex items-center py-28 lg:py-32 selection:bg-white selection:text-black"
    >
      {/* Subtle Luxury Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-center h-full relative z-10">

        {/* =========================================
            LOCKED HEADER & TAB SWITCHER 
        ========================================= */}
        <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-10 lg:mb-16 shrink-0">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-6 lg:mb-8 w-max"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#888888] font-bold">
                Our Expertise
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl lg:text-[6rem] leading-[0.95] tracking-tight font-medium">
              Services that <br className="hidden md:block" />
              <span className="text-white/30 italic font-light">
                scale brands.
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap p-1.5 bg-[#111111] border border-white/10 rounded-2xl md:rounded-full w-full sm:w-max backdrop-blur-md shadow-2xl shrink-0">
            {(["video", "web"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative flex-1 sm:flex-none px-4 sm:px-8 md:px-10 py-3 md:py-3.5 rounded-xl md:rounded-full text-[10px] sm:text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-300 outline-none"
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 bg-white rounded-xl md:rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-300 ${activeTab === tab ? "text-black" : "text-[#888888] hover:text-white"}`}>
                  {tab === "video" ? "Video Editing" : "Web Development"}
                </span>
              </button>
            ))}
          </div>
        </header>

        {/* =========================================
            BALANCED 50/50 MAIN CONTENT
        ========================================= */}
        {/* Changed to a grid to perfectly balance the left and right containers */}
        <main className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left Menu - Full width of its column */}
          <div className="w-full flex flex-col gap-2.5 lg:gap-5 order-2 lg:order-1">
            {activeServices.map((service, index) => (
              <div
                key={service.title}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setIsHovered(true);
                }}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setActiveIndex(index)}
                className="group cursor-pointer flex items-center gap-4 sm:gap-5"
              >
                {/* Number Indicator */}
                <span className={`text-[10px] sm:text-[12px] font-mono tracking-widest w-4 transition-colors duration-500 ${activeIndex === index ? "text-white" : "text-white/20"
                  }`}>
                  0{index + 1}
                </span>

                {/* Animated Line with Glowing Terminal Dot */}
                <div className="relative flex items-center h-full">
                  <motion.div
                    animate={{ width: activeIndex === index ? (window.innerWidth < 640 ? 20 : 30) : 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    className="h-[1px] bg-white relative"
                  >
                    <motion.div
                      animate={{ scale: activeIndex === index ? 1 : 0, opacity: activeIndex === index ? 1 : 0 }}
                      className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    />
                  </motion.div>
                </div>

                {/* Typography */}
                <h3 className={`text-sm sm:text-base md:text-lg lg:text-[1.35rem] tracking-wide font-light transition-all duration-500 ${activeIndex === index
                    ? "text-white translate-x-3"
                    : "text-white/30 group-hover:text-white/60 group-hover:translate-x-1"
                  }`}>
                  {service.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Right Showcase - Transformed into a Horizontal Layout */}
          <div className="w-full flex justify-center lg:justify-end order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeServices[activeIndex].title}
                // Animations mapped to X-axis to complement horizontal orientation
                initial={{ opacity: 0, x: 20, filter: "blur(10px)", scale: 0.98 }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, x: -20, filter: "blur(10px)", scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                // Horizontal styling: wider max-width, shorter min-height
                className="relative w-full lg:max-w-[560px] min-h-[260px] sm:min-h-[280px] lg:min-h-[300px] rounded-[1.5rem] sm:rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-transparent backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden group hover:border-white/[0.15] transition-colors duration-500 flex flex-col justify-between"
              >
                {/* Soft top-light reflection inside card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

                {/* Floating Background Icon - Positioned far right for landscape fit */}
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-16 -right-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700"
                >
                  <HighlightedIcon className="w-60 sm:w-80 h-60 sm:h-80 text-white" />
                </motion.div>

                {/* Card Top Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                      <HighlightedIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight">
                      {activeServices[activeIndex].title}
                    </h4>
                  </div>
                  {/* DOne */}

                  <p className="text-white/50 text-xs sm:text-base leading-relaxed font-light max-w-full sm:max-w-[90%]">
                    {activeServices[activeIndex].desc}
                  </p>
                </div>

                {/* Card Bottom / Luxury CTA Button */}
                <div className="relative z-10 w-full flex items-end justify-between mt-6 sm:mt-8">
                  {/* Subtle index tracker visible on larger screens */}
                  <span className="hidden sm:block text-white/20 text-[10px] font-mono tracking-widest uppercase">
                    Service 0{activeIndex + 1}
                  </span>

                  <ServiceLiquidButton />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </main>
      </div>
    </section>
  );
} 