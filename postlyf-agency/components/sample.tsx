"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue
} from "framer-motion";
import {
  MonitorPlay,
  Play,
  Code,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Target,
  Zap,
  Globe
} from "lucide-react";

const SERVICES_DATA = [
  {
    title: "Short-Form Content",
    description: "Engineered for high-retention on TikTok, Reels, and Shorts. We transform raw footage into viral-ready assets with strategic hooks and cinematic pacing.",
    icon: MonitorPlay,
    features: ["Viral Hooks", "Dynamic Pacing", "Strategic Storytelling"],
    accent: "from-blue-500/20 to-purple-500/20",
    glow: "rgba(59, 130, 246, 0.15)"
  },
  {
    title: "Long-Form Production",
    description: "Premium YouTube editing and documentary-style storytelling. We focus on audience retention and build deep engagement through cinematic sequences.",
    icon: Play,
    features: ["Retention Optimization", "Cinematic Sound Design", "Visual Flow"],
    accent: "from-orange-500/20 to-red-500/20",
    glow: "rgba(249, 115, 22, 0.15)"
  },
  {
    title: "Bespoke Web Dev",
    description: "High-performance digital experiences built with Next.js and React. We blend state-of-the-art aesthetics with technical excellence to drive conversions.",
    icon: Code,
    features: ["Awwwards-Tier UI", "Lightning Speed", "SEO Mastery"],
    accent: "from-emerald-500/20 to-cyan-500/20",
    glow: "rgba(16, 185, 129, 0.15)"
  },
  {
    title: "Brand Motion Design",
    description: "Dynamic visual identities and motion graphics that elevate your presence. From high-converting ads to logo animations that stay in mind.",
    icon: Sparkles,
    features: ["Premium Animation", "Visual Identity", "3D Graphics"],
    accent: "from-indigo-500/20 to-pink-500/20",
    glow: "rgba(99, 102, 241, 0.15)"
  }
];

const Card = ({
  i,
  title,
  description,
  icon: Icon,
  features,
  accent,
  glow,
  progress,
  range,
  targetScale
}: {
  i: number;
  title: string;
  description: string;
  icon: any;
  features: string[];
  accent: string;
  glow: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef(null);

  // Depth Animation: Scale down exactly when scroll progress enters its range
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          transformOrigin: "top",
          top: `calc(15% + ${i * 30}px)`,
          backgroundColor: "#0a0a0a",
          boxShadow: `0 -10px 40px -10px rgba(0,0,0,0.5), 0 0 20px -5px ${glow}`
        }}
        className="relative h-[550px] w-full max-w-[1000px] rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col md:flex-row group transition-colors duration-500 hover:border-white/20"
      >
        {/* Card Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-30 group-hover:opacity-40 transition-opacity duration-700`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)]" />

        {/* Left Side: Content */}
        <div className="relative z-10 w-full md:w-1/2 p-8 md:p-12 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <span className="text-[12px] font-mono tracking-[0.3em] text-white/30 uppercase">
              Service / 0{i + 1}
            </span>
          </div>

          <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-[1.1]">
            {title}
          </h3>

          <p className="text-white/60 text-lg font-light leading-relaxed mb-8 max-w-[90%]">
            {description}
          </p>

          <div className="mt-auto flex flex-wrap gap-3">
            {features.map((feature, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] uppercase tracking-wider text-white/40"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Visual Element / CTA */}
        <div className="relative z-10 w-full md:w-1/2 p-12 flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-white/5">
          <div className="w-full h-full flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-700">
            <Icon className="w-[80%] h-[80%] text-white transform group-hover:rotate-6 transition-transform duration-700" />
          </div>

          <button className="relative overflow-hidden group/btn px-10 py-5 rounded-full bg-white text-black font-bold uppercase tracking-widest text-[11px] flex items-center gap-3 transition-transform duration-300 hover:scale-[1.05] active:scale-95">
            <span className="relative z-10 text-[11px] uppercase tracking-[0.2em] font-bold">
              Book Service
            </span>
            <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-black group-hover/btn:rotate-45 transition-transform duration-300" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
          </button>
        </div>

        {/* Index Watermark */}
        <div className="absolute -bottom-10 -left-10 text-[15rem] font-bold text-white/[0.02] pointer-events-none select-none">
          0{i + 1}
        </div>
      </motion.div>
    </div>
  );
};

export default function Services() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-[#050505] selection:bg-white selection:text-black"
      style={{ height: `${SERVICES_DATA.length * 100 + 50}vh` }}
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 h-[30vh] md:h-[40vh] w-full flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="px-5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8 inline-block"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#888888] font-bold">
            World Class Solutions
          </span>
        </motion.div>

        <h2 className="text-[clamp(2.5rem,8vw,6.5rem)] font-medium leading-[0.9] tracking-tighter text-white">
          Our <span className="text-white/30 italic font-light">Services</span>
        </h2>
      </div>

      {/* Cards Container */}
      <div className="relative px-6">
        {SERVICES_DATA.map((service, i) => {
          // Each card stays at scale 1 until the next one starts coming in
          // It scales to 0.95 (or slightly less for deeper cards)
          const range: [number, number] = [i * 0.2, 1];
          const targetScale = 1 - ((SERVICES_DATA.length - i) * 0.04);

          return (
            <Card
              key={`p_${i}`}
              i={i}
              {...service}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
