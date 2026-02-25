"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";

const PROJECTS = [
  { id: 1, title: "Cinematic Event", type: "Reels / Shorts", thumb: "from-blue-600/50", color: "#3B82F6" },
  { id: 2, title: "Fashion Edit", type: "Reels / Shorts", thumb: "from-rose-600/50", color: "#F43F5E" },
  { id: 3, title: "Tech Documentary", type: "Long-form YouTube", thumb: "from-yellow-600/50", color: "#EAB308" },
  { id: 4, title: "Gym Hype", type: "TikTok", thumb: "from-emerald-600/50", color: "#10B981" },
  { id: 5, title: "App Promo Ad", type: "Motion Graphics", thumb: "from-cyan-600/50", color: "#06B6D4" },
  { id: 6, title: "Product Teaser", type: "Reels / Shorts", thumb: "from-purple-600/50", color: "#A855F7" },
  { id: 7, title: "Podcast Full Episode", type: "Video Podcast", thumb: "from-indigo-600/50", color: "#6366F1" },
  { id: 8, title: "Founder Story", type: "TikTok", thumb: "from-orange-600/50", color: "#F97316" },
];

const VideoCard = ({ project }: { project: any }) => {
  return (
    <div className="group relative rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden bg-[#0d0d0d] cursor-pointer border border-white/5 shrink-0 
      w-[65vw] sm:w-[320px] lg:w-[380px] xl:w-[440px] 
      h-[45vw] sm:h-[200px] lg:h-[240px] xl:h-[300px] 
      transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(255,255,255,0.06)]">
      {/* Background Gradient & Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.thumb} to-[#050505] transition-opacity duration-700 z-10 opacity-100 group-hover:opacity-40`} />
      <div className="absolute inset-0 bg-[#0a0a0a] z-0" />

      {/* Play Button Overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center transition-transform duration-700 group-hover:scale-110 pointer-events-none">
        <div className="w-10 h-10 md:w-12 md:h-12 xl:w-16 xl:h-16 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 bg-white/10 transition-all duration-500 group-hover:bg-white shadow-2xl">
          <Play
            className="w-3 h-3 md:w-4 md:h-4 xl:w-6 xl:h-6 text-white transition-colors duration-500 group-hover:text-black"
            fill="currentColor"
          />
        </div>
      </div>

      {/* Content Info */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 xl:p-10 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
        <span
          className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-bold mb-2 md:mb-3 block transform translate-y-3 opacity-60 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
          style={{ color: project.color }}
        >
          {project.type}
        </span>
        <h3 className="text-xl md:text-2xl xl:text-3xl font-medium text-white tracking-tight leading-tight transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          {project.title}
        </h3>

        <div className="h-[2px] bg-white/30 mt-4 xl:mt-5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      </div>
    </div>
  );
};

const PortfolioEndLiquidButton = () => {
  const btnRef = useRef<HTMLAnchorElement>(null);
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
    <Link
      href="/portfolio"
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // YOUR EXACT RESPONSIVE STYLING
      className="group relative inline-flex items-center gap-3 md:gap-4 px-6 py-3 md:px-8 md:py-4 xl:px-10 xl:py-5 bg-white text-black hover:text-white rounded-full font-bold text-xs md:text-sm xl:text-base overflow-hidden border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
    >
      <span className="relative z-10 flex items-center gap-2 md:gap-3">
        View Entire Portfolio
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
      </span>

      {/* THE LIQUID FILL EFFECT (Replaces the static slide-up div) */}
      <motion.div
        style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
        animate={{ width: isHovered ? "200%" : "0%", height: isHovered ? "700%" : "0%" }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute pointer-events-none rounded-full bg-[#1a1a1a] z-0"
      />
    </Link>
  );
};

export default function OurWork({ scrollYProgress: pageScrollYProgress }: { scrollYProgress?: MotionValue<number> }) {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // No longer using useSpring here as Lenis handles global smoothing.
  // Using direct scrollYProgress for immediate responsiveness with the smooth scroll.

  // Finish horizontal scrolling at 95% of the scroll container.
  const x = useTransform(scrollYProgress, [0, 0.95], ["calc(0% - 0vw)", "calc(-100% + 100vw)"]);
  const progressScale = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  return (
    <section
      ref={targetRef}
      id="work"
      className="relative h-[400vh] bg-[#191919]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">

        {/* Creative Background Elements (Static & Parallax) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
          <div className="absolute bottom-[-20%] left-[10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.9)_100%)] z-10" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay z-10" />
        </div>

        {/* 1. STATIC CENTERED HEADER */}
        <div className="w-full pt-[12vh] sm:pt-[12vh] lg:pt-[14vh] flex flex-col items-center justify-center text-center z-30 pointer-events-none px-6 shrink-0 md:mb-10">
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <span className="w-8 md:w-16 h-[1px] bg-white/20" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 font-medium">
              Featured projects
            </span>
            <span className="w-8 md:w-16 h-[1px] bg-white/20" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-medium tracking-tighter text-white leading-[1] mb-4 md:mb-6">
            How we helped <br className="sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic font-serif pr-2 md:pr-4">
              others succeed.
            </span>
          </h2>

          <p className="text-white/40 text-[10px] sm:text-xs md:text-base lg:text-lg max-w-xs sm:max-w-md md:max-w-lg leading-relaxed font-light px-4">
            High-impact visual storytelling that transforms brands into legends.
          </p>
        </div>

        {/* 2. HORIZONTAL SCROLL TRACK */}
        <div className="relative flex-1 flex items-center z-20 pointer-events-none w-full min-h-0 pb-[6vh]">
          <motion.div
            style={{ x, willChange: "transform" }}
            className="flex items-center gap-6 md:gap-12 xl:gap-16 pl-[5vw] md:pl-[10vw] w-max pointer-events-auto"
          >
            {/* Video Gallery */}
            {PROJECTS.map((project) => (
              <VideoCard key={project.id} project={project} />
            ))}

            {/* End CTA Block - Added exact margin-right logic to lock it completely center-screen when scrolling ends */}
            <div className="w-[85vw] sm:w-[400px] lg:w-[480px] xl:w-[560px] mr-[7.5vw] sm:mr-[calc(25vw-200px)] lg:mr-[calc(25vw-240px)] xl:mr-[calc(25vw-280px)] shrink-0 flex flex-col items-center justify-center text-center">
              <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
                Your vision, <br />
                <span className="text-white/40 italic font-serif">our expertise.</span>
              </h3>
              <PortfolioEndLiquidButton />
            </div>
          </motion.div>
        </div>

        {/* 3. MINIMAL PROGRESS BAR */}
        <div className="absolute bottom-6 md:bottom-10 left-[5vw] md:left-[10vw] right-[5vw] md:right-[10vw] z-30 pointer-events-none">
          <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full">
            <motion.div
              style={{ scaleX: progressScale, transformOrigin: "left" }}
              className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/80 to-white"
            />
          </div>
        </div>

      </div>
    </section>
  );
}