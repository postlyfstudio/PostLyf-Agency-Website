"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Premium 3D-styled SVGs
const GreenIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 drop-shadow-2xl">
    <mask id="green-cut">
      <rect width="100" height="100" fill="white" />
      <path d="M50 50 L50 110 M50 50 L-10 15 M50 50 L110 15" stroke="black" strokeWidth="8" strokeLinecap="round" />
      <circle cx="50" cy="50" r="6" fill="black" />
    </mask>
    <circle cx="50" cy="50" r="45" fill="currentColor" mask="url(#green-cut)" />
  </svg>
);

const PurpleIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 drop-shadow-2xl">
    <path d="M50 5 Q50 50 95 50 Q50 50 50 95 Q50 50 5 50 Q50 50 50 5 Z" fill="currentColor" />
  </svg>
);

const BlueIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 drop-shadow-2xl">
    <mask id="blue-cut">
      <rect width="100" height="100" fill="white" />
      <circle cx="50" cy="65" r="28" fill="black" />
    </mask>
    <circle cx="50" cy="50" r="45" fill="currentColor" mask="url(#blue-cut)" />
    <circle cx="50" cy="80" r="10" fill="currentColor" />
  </svg>
);

const OrangeIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 drop-shadow-2xl">
    <mask id="orange-cut">
      <rect width="100" height="100" fill="white" />
      <circle cx="50" cy="50" r="18" fill="black" />
      <path d="M-10 50 L110 50" stroke="black" strokeWidth="8" />
    </mask>
    <circle cx="50" cy="50" r="45" fill="currentColor" mask="url(#orange-cut)" />
    <circle cx="50" cy="50" r="10" fill="currentColor" />
  </svg>
);

const SERVICES =[
  {
    title: "Pre-Production",
    tags: ["Concept Development", "Scripting", "Location Scouting", "Video Shooting"],
    description: "Strategic planning for high-impact video production. From concept development and scripting to location scouting and professional video shooting, we build the foundation for cinematic content that performs.",
    color: "#4ade80",
    btnText: "Pre-Production services",
    Icon: GreenIcon
  },
  {
    title: "Post-Production",
    tags: ["Video Editing", "Color Grading", "Motion Graphics", "Sound Design"],
    description: "Professional video editing, color grading, motion graphics, and sound design crafted to maximize retention and engagement. We transform raw footage into polished, performance-driven content.",
    color: "#c084fc",
    btnText: "Post-Production services",
    Icon: PurpleIcon
  },
  {
    title: "Web Development",
    tags: ["Custom Websites", "E-Commerce", "Web Apps", "Optimization"],
    description: "Custom web development focused on performance, scalability, and conversion. We design high-performance websites and digital platforms that turn traffic into measurable growth.",
    color: "#38bdf8",
    btnText: "Development services",
    Icon: BlueIcon
  },
  {
    title: "Social Marketing",
    tags: ["Strategy", "Content Creation", "Paid Ads", "Analytics"],
    description: "Data-driven social media marketing designed to increase reach, engagement, and revenue. We combine strategy, content creation, and analytics to build sustainable digital growth systems. ",
    color: "#fb923c",
    btnText: "Marketing services",
    Icon: OrangeIcon
  }
];

const StackCard = ({ index, service, progress, totalCards }: any) => {
  // Dynamically calculate the point where this specific card starts scaling
  const startProgress = index * (1 / totalCards);
  const targetScale = 1 - (totalCards - 1 - index) * 0.05;
  
  const scale = useTransform(progress, [startProgress, 1], [1, targetScale]);
  // Creates a 3D depth effect by dimming the cards as they stack backwards
  const overlayOpacity = useTransform(progress, [startProgress, 1],[0, 0.5]);

  return (
    <div
      className="sticky w-full flex justify-center items-start mb-[15vh] md:mb-[25vh]"
      style={{ top: `calc(10vh + ${index * 25}px)` }} // Enhanced spacing increments
    >
      <motion.div
        style={{
          scale,
          transformOrigin: "top center",
        }}
        className="relative w-full h-auto min-h-[400px] lg:min-h-[500px] rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 lg:p-16 flex flex-col md:flex-row items-center gap-10 md:gap-16 border border-white/10 shadow-[0_-15px_40px_rgba(0,0,0,0.6)] overflow-hidden group"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] to-[#0a0a0a] z-0" />
        
        {/* Dimming overlay for stacked effect */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black z-20 pointer-events-none"
        />

        <div className="relative z-10 flex-1 w-full flex flex-col justify-center">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight text-white">
            {service.title}
          </h3>

          <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
            {service.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 text-white/90 text-[10px] md:text-sm font-medium tracking-wide bg-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-white/60 text-sm md:text-lg leading-relaxed mb-8 md:mb-10 max-w-xl font-light">
            {service.description}
          </p>

          <button
            className="w-max px-6 py-3 md:px-8 md:py-4 rounded-full text-black font-semibold text-xs md:text-sm transition-opacity hover:opacity-90 flex items-center gap-3 hover:scale-105 duration-300"
            style={{ backgroundColor: service.color }}
          >
            {service.btnText}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="19" x2="19" y2="5"></line>
              <polyline points="12 5 19 5 19 12"></polyline>
            </svg>
          </button>
        </div>

        <div className="relative z-10 w-full md:w-[45%] hidden md:flex justify-center items-center pb-10 md:pb-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] md:w-3/4 md:h-3/4 blur-[80px] md:blur-[100px] opacity-30 transition-opacity duration-500 group-hover:opacity-50"
            style={{ backgroundColor: service.color }}
          />

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 text-white"
            style={{ color: service.color }}
          >
            <div className="transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-3">
              <service.Icon />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ServicesPremium() {
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Focus scroll specifically on the cards container
  // Progress starts when the container hits the top stick offset (10vh)
  const { scrollYProgress } = useScroll({
    target: cardsContainerRef,
    offset:["start 10vh", "end end"],
  });

  return (
    <section id="services" className="relative w-full bg-[#050505] text-white overflow-clip">
      
      {/* HEADER: No longer sticky. Scrolling it away naturally resolves all visual collisions */}
      <div className="relative z-30 pt-16 md:pt-24 pb-8 md:pb-16 bg-[#050505]">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
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

              <h2 className="text-4xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-tight font-medium">
                Services that <br className="hidden md:block" />
                <span className="text-white/30 italic font-light">
                  scale brands.
                </span>
              </h2>
            </div>
          </header>
        </div>
      </div>

      {/* CARDS CONTAINER */}
      <div 
        ref={cardsContainerRef}
        className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative pt-4"
      >
        {SERVICES.map((service, index) => (
          <StackCard
            key={service.title}
            index={index}
            service={service}
            progress={scrollYProgress}
            totalCards={SERVICES.length}
          />
        ))}

        {/* SPACER (CRITICAL FIX)
            Forces extra scrollable height at the bottom.
            This ensures the last card stops perfectly and remains sticky for the 
            exact same duration as the previous cards before moving to the next section. */}
        <div className="h-[40vh] md:h-[50vh] w-full" />
      </div>
    </section>
  );
}