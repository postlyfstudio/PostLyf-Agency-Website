"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView,useMotionValue, useScroll, useSpring, useTransform, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// --- Custom Animated Number (Preserved for the smooth tick-up) ---
interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const AnimatedNumber = ({
  value,
  prefix = "",
  suffix = "",
  duration = 2.5,
}: AnimatedNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
};

const StatsLiquidButton = () => {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const pathname = usePathname();
  const router = useRouter();

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

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (pathname !== "/") {
      await router.push("/");
      setTimeout(() => {
        const element = document.getElementById("contact");
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      const element = document.getElementById("contact");
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <a
      href="/#contact"
      ref={btnRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-transparent border border-white hover:scale-105 rounded-full overflow-hidden transition-all duration-300 hover:border-transparent shrink-0"
    >
      <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
        Get Your Quote
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </span>

      <motion.div
        style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
        animate={{ width: isHovered ? "200%" : "0%", height: isHovered ? "700%" : "0%" }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute pointer-events-none rounded-full bg-white z-0"
      />
    </a>
  );
};

// --- The Custom Postlyf Data Set ---
const STATS_DATA = [
  { id: "01", value: 1000, suffix: "+", label: "Projects Delivered", color: "#0052cc" }, // Blue
  { id: "02", value: 120, suffix: "+", label: "Happy Clients", color: "#10b981" }, // Emerald
  { id: "03", value: 100, suffix: "M+", label: "Organic Views", color: "#FFD700" }, // Gold
  { id: "04", value: 3, suffix: "+", label: "Years Experience", color: "#a855f7" }, // Purple
];

export default function Stats() {
  return (
    <section id="stats" className="relative z-10 bg-[#111111] py-24 md:py-40 border-t border-white/5 overflow-hidden">
      
      {/* Subtle Grain/Noise Overlay simulating film texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="container mx-auto px-6 max-w-[1400px]">
        
        {/* === EDITORIAL SPLIT LAYOUT === */}
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-12">
          
          {/* LEFT COLUMN: Sticky Header & CTA */}
          <div className="lg:w-5/12 flex flex-col items-start relative">
            <div className="sticky top-40">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                {/* Simulated "Recording" Blinker */}
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#888888] font-bold">
                  Highlights
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight text-white mb-10"
              >
                Numbers that <br />
                <span className="text-[#666666]">drive success</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[#888888] max-w-sm text-lg leading-relaxed mb-12 font-regular"
              >
                We don't just edit videos; we engineer attention. From viral shorts to cinematic brand films, our portfolio speaks in numbers.
              </motion.p>

              {/* === STRICT MANDATORY CTA === */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <StatsLiquidButton />
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Typographic Grid */}
          <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-10 lg:mt-0">
            {STATS_DATA.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="group relative pt-8 pb-4"
              >
                {/* Top Border Divider */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
                
                {/* Animated Color Line (Draws across top on hover) */}
                <div 
                  className="absolute top-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-700 ease-[0.23,1,0.32,1]"
                  style={{ backgroundColor: stat.color, boxShadow: `0 0 10px ${stat.color}` }}
                />

                {/* Subtle Hover Gradient Aura */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none blur-3xl rounded-full scale-150 translate-y-10"
                  style={{ backgroundColor: stat.color }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-6 group-hover:text-white transition-colors duration-500">
                    {stat.label}
                  </p>
                  
                  {/* Massive Typography */}
                  <h3 className="text-7xl lg:text-[90px] font-medium tracking-tighter text-white leading-none transform group-hover:translate-x-2 transition-transform duration-500">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </h3>
                </div>

                {/* Creative Touch: Hidden Cinematic Metadata reveals on hover */}
                <div className="absolute bottom-4 right-0 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 font-mono text-[9px] tracking-widest text-white/30">
                  REC. // {stat.id}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
} 