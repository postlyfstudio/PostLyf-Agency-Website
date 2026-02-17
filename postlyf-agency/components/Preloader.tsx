"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait a tiny bit at 100% before triggering the exit animation
          setTimeout(() => setIsLoading(false), 400); 
          return 100;
        }
        // Adjust this number to make the loader faster or slower
        return prev + 1.5; 
      });
    }, 30); 
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          // The "Curtain Lift" exit animation
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Postlyf Logo Animation */}
          <div className="relative text-5xl md:text-7xl font-black tracking-widest uppercase">
            {/* The Dim Outline Layer */}
            <span 
              className="text-transparent" 
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
            >
              Postlyf
            </span>

            {/* The Gold/Blue Glowing Fill Layer */}
            <motion.div
              className="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-transparent bg-clip-text bg-linear-to-r from-[#0052cc] via-[#FFD700] to-[#FFD700]"
              style={{ width: `${progress}%` }}
            >
              Postlyf
            </motion.div>
          </div>

          {/* Progress Counter & Bar */}
          <div className="mt-10 flex flex-col items-center w-48 md:w-64">
            <span className="font-mono text-sm text-gray-500 mb-3 tracking-widest">
              {Math.floor(progress)}%
            </span>
            <div className="w-full h-px bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}