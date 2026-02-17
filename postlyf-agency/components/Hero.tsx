"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const words = ["masterpieces", "results", "innovation", "success"];

const LOGOS = [
  { name: "Vignetique" }, 
  { name: "Kooki" },
  { name: "Optimo" },
  { name: "RecruiterOne" },
  { name: "Soleil" },
  { name: "Skoolvers" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentRotate = useTransform(scrollYProgress, [0, 1], [0, -2]); 

  return (
    <section ref={containerRef} id="hero" className="relative h-[150vh] bg-[#050505]">
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* === BACKGROUND ELEMENTS === */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white opacity-[0.02] blur-[100px] pointer-events-none z-0" />
        
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0052cc]/10 rounded-full blur-[120px] pointer-events-none z-0"
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/35 w-1 h-1 rounded-sm"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -40, 0], opacity: [0, 0.6, 0] }}
              transition={{
                duration: Math.random() * 3 + 4,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* === MAIN CONTENT === */}
        <motion.div
          style={{ scale: contentScale, opacity: contentOpacity, rotate: contentRotate }}
          className="relative z-10 w-full h-full flex flex-col justify-between pt-[18vh] pb-10 px-6"
        >
          {/* Centered Hero Block */}
          <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto">
            
            {/* Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-2"
            >
              <span className="text-[12px] font-light text-gray-400 uppercase tracking-[0.1em]">
                Creative Digital Agency
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-4xl lg:text-[70px] font-normal tracking-tight text-white leading-[1.1] mb-2 w-full">
              Turning pixels into <br />
              <span className="block h-[1.3em] overflow-hidden mt-1 relative z-20">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[wordIndex]}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                    className="block bg-gradient-to-r from-[#3377ff] to-[#FFD700] bg-clip-text text-transparent pb-4"
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 1 }}
              className="max-w-2xl mx-auto text-[#a1a1aa] text-lg lg:text-xl leading-relaxed mb-10"
            >
              Transform ideas into impactful digital experiences that 
              captivate your audience and fuel business growth.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.4, duration: 0.8 }}
              className="flex flex-row items-center justify-center gap-5"
            >
              <button className="group relative px-8 py-3.5 bg-white text-black text-sm font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:text-white">
                <span className="relative z-10 tracking-wide">Our services</span>
                <div className="absolute inset-0 bg-[#111111] translate-y-[101%] transition-transform duration-300 ease-out group-hover:translate-y-0" />
              </button>
              
              <button className="group relative px-8 py-3.5 bg-white/5 text-white text-sm font-semibold rounded-lg backdrop-blur-md border border-white/10 overflow-hidden transition-all duration-300 hover:text-black">
                <span className="relative z-10 tracking-wide">Get in touch</span>
                <div className="absolute inset-0 bg-white translate-y-[101%] transition-transform duration-300 ease-out group-hover:translate-y-0" />
              </button>
            </motion.div>
          </div>

          {/* Bottom Marquee */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8, duration: 1 }}
            className="w-full flex flex-col items-center mt-auto"
          >
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#666666] mb-6">
              They Trusted Us
            </span>
            
            <div className="w-full max-w-5xl mx-auto overflow-hidden relative flex before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-[#050505] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-[#050505] after:to-transparent">
              <motion.div
                className="flex gap-20 items-center grayscale opacity-40"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 25, repeat: Infinity }}
              >
                {[...LOGOS, ...LOGOS].map((logo, index) => (
                   <div key={index} className="relative w-max shrink-0 flex items-center justify-center px-4">
                     <span className="text-xl md:text-2xl font-semibold tracking-wide text-white">{logo.name}</span>
                   </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}