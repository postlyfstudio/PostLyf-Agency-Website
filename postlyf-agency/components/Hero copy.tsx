"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const words = ["masterpieces.", "results.", "innovation.", "success."];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  // Text swapping logic for AnimatePresence
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Scroll-linked animation logic (Sticky cinematic effect)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 24]);

  return (
    <section ref={containerRef} id="hero" className="relative h-[150vh] bg-[#000000]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between">
        <motion.div
          style={{ scale, borderRadius }}
          className="relative w-full h-full flex flex-col items-center pt-[15vh] bg-[#050505] border-x border-b border-white/5"
        >
          {/* Subtle Top Spotlight (Matching dhero.studio) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white opacity-[0.03] blur-[100px] pointer-events-none" />

          {/* Floating Particles (Matching dhero.studio squares) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/10 w-1.5 h-1.5"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: Math.random() * 3 + 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-4xl mx-auto">
            
            {/* Glassmorphic Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              className="px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8"
            >
              <span className="text-[11px] font-medium text-gray-300 uppercase tracking-[0.15em]">
                Creative Digital Agency
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-[1.1] mb-6">
              Turning pixels into <br />
              <span className="block h-[1.2em] overflow-hidden mt-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[wordIndex]}
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="block bg-gradient-to-r from-[#0052cc] via-[#FFD700] to-[#FFD700] bg-clip-text text-transparent font-bold pb-2"
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 1 }}
              className="max-w-xl mx-auto text-[#888888] text-lg leading-relaxed mb-10"
            >
              Transform ideas into impactful digital experiences that 
              captivate your audience and fuel business growth.
            </motion.p>

            {/* CTAs (Exact Match) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.4, duration: 0.8 }}
              className="flex flex-row items-center justify-center gap-4"
            >
              <button className="px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300">
                Our services
              </button>
              <button className="px-7 py-3.5 bg-white/10 text-white text-sm font-semibold rounded-lg backdrop-blur-md border border-white/5 hover:bg-white/15 transition-colors duration-300">
                Get in touch
              </button>
            </motion.div>
          </div>

          {/* Trusted By Section (Fixed to bottom of Hero) */}
          <motion.div 
            style={{ opacity }}
            className="absolute bottom-12 w-full flex flex-col items-center z-10"
          >
            <span className="text-[10px] uppercase tracking-[0.1em] text-gray-500 mb-6">
              They Trusted Us
            </span>
            <div className="flex items-center justify-center gap-12 opacity-40 grayscale">
              {/* Placeholders for client logos - replacing with text for now */}
              <span className="font-bold text-xl tracking-tighter">Vignetique</span>
              <span className="font-serif text-xl italic">kooki</span>
              <span className="font-mono text-xl uppercase">Optimo</span>
              <span className="font-bold text-xl">RecruiterOne</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}   