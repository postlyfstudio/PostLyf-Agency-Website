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

const SERVICES = [
  {
    title: "Pre-Production",
    tags: ["Concept Development", "Scripting", "Location Scouting", "Video Shooting"],
    description: "Exceptional content begins with meticulous planning. We design strategic concepts and coordinate every detail—laying the ultimate groundwork for visually striking video production.",
    color: "#4ade80",
    btnText: "Pre-Production services",
    Icon: GreenIcon
  },
  {
    title: "Post-Production",
    tags: ["Video Editing", "Color Grading", "VFX", "Sound Design"],
    description: "Transforming raw footage into captivating stories. Our post-production team uses cutting-edge techniques, dynamic motion graphics, and immersive sound design to maximize viewer retention.",
    color: "#c084fc",
    btnText: "Post-Production services",
    Icon: PurpleIcon
  },
  {
    title: "Web Development",
    tags: ["Custom Websites", "E-Commerce", "Web Apps", "Optimization"],
    description: "We build powerful, scalable websites that transform visitors into customers. Combining strategic design with technical excellence, every line of code is crafted for performance and security.",
    color: "#38bdf8",
    btnText: "Development services",
    Icon: BlueIcon
  },
  {
    title: "Social Marketing",
    tags: ["Strategy", "Content Creation", "Paid Ads", "Analytics"],
    description: "Amplify your brand's voice and reach. We craft data-driven social media strategies that engage audiences, foster communities, and drive measurable growth across all major platforms.",
    color: "#fb923c",
    btnText: "Marketing services",
    Icon: OrangeIcon
  }
];

const StackCard = ({ index, service, progress, totalCards }: any) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.05;
  const scale = useTransform(progress, [index * 0.25, 1], [1, targetScale]);

  return (
    <div
      // FIXED: Adding consistent bottom margins to EVERY card (including the last one) 
      // creates the scroll distance required for them to securely stick and stack properly.
      className="sticky w-full flex justify-center items-start mb-[20vh] lg:mb-[30vh]"
      style={{ top: `calc(var(--base-top) + ${index * 20}px)` }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: "top center",
        }}
        className="relative w-full h-auto min-h-[400px] lg:min-h-[500px] rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 lg:p-16 flex flex-col md:flex-row items-center gap-10 md:gap-16 border border-white/10 shadow-[0_-15px_40px_rgba(0,0,0,0.5)] overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] to-[#0a0a0a] z-0" />

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
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white [--base-top:200px] md:[--base-top:280px] lg:[--base-top:340px]"
    >
      <div className="sticky top-0 z-30 pt-8 md:pt-12 lg:pt-16 pb-6 md:pb-8 bg-[#050505]">
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

      {/* FIXED: Padding Bottom added so when the final card sticks, it stays in place for a comfortable margin before pushing the section up */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative pb-[20vh] lg:pb-[30vh] pt-4 md:pt-8">
        {SERVICES.map((service, index) => (
          <StackCard
            key={service.title}
            index={index}
            service={service}
            progress={scrollYProgress}
            totalCards={SERVICES.length}
          />
        ))}
      </div>
    </section>
  );
}