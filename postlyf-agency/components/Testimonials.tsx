"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// --- Enhanced, Impactful Testimonial Data ---
const REVIEWS = [
  {
    id: 1,
    quote: "We chose Postlyf for our B2B video strategy, and the results exceeded expectations. Their strategic editing team delivered a modern aesthetic that perfectly showcases our solutions. A fantastic partnership from start to finish!",
    name: "Mihai D.",
    role: "CEO @ Oxidelta",
    initials: "MD"
  },
  {
    id: 2,
    quote: "Working with them was transformative! Their motion graphics and pacing perfectly captured our vision. The ad creatives exceeded expectations, making our launch effortless. Highly recommend their post-production expertise!",
    name: "Flavian P.",
    role: "CEO @ Ality",
    initials: "FP"
  },
  {
    id: 3,
    quote: "They delivered a stunning set of cinematic reels for our fashion brand. Their attention to detail and sound design streamlined our marketing beautifully. Professional, creative, a truly remarkable partner!",
    name: "Mihaela L.",
    role: "Co-Founder @ Soleil",
    initials: "ML"
  },
  {
    id: 4,
    quote: "Postlyf delivered an exceptional campaign through their professional expertise and strategic approach. Their custom edits perfectly understood our needs. Outstanding agency, instrumental to our success!",
    name: "Marius H.",
    role: "CMO @ Vignetique",
    initials: "MH"
  },
  {
    id: 5,
    quote: "We partnered with them for our YouTube channel revamp. They delivered sleek, retention-optimized videos that showcase our brand beautifully. Professional editing and incredible speed. Highly recommended!",
    name: "Cosmina V.",
    role: "Co-Founder @ Kooki",
    initials: "CV"
  }
];

const StoriesLiquidButton = () => {
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
      href="/portfolio/#porthero"
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:text-white border border-white/20 hover:scale-105 rounded-full overflow-hidden transition-all duration-300 font-semibold text-sm tracking-wide"
    >
      <span className="relative z-10 flex items-center gap-2">
        Read more stories
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
      </span>

      <motion.div
        style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
        animate={{ width: isHovered ? "200%" : "0%", height: isHovered ? "700%" : "0%" }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute pointer-events-none rounded-full bg-[#1a1a1a] z-0"
      />
    </Link>
  );
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative z-10 bg-[#111111] overflow-hidden lg:h-[100dvh] flex items-center border-t border-white/5 py-20 lg:py-0">

      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white/[0.02] rounded-full blur-[100px] md:blur-[150px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 max-w-[1400px] h-full flex flex-col lg:flex-row items-center gap-12 sm:gap-16 lg:gap-20 relative z-10">

        {/* === LEFT SIDE === */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center relative z-20 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-6 lg:mb-8 w-max"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#888888] font-bold">
              Stories of Success
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[75px] font-medium tracking-tight text-white leading-[1.05] mb-6"
          >
            Hear it <span className="text-[#666666]">from</span> <br />
            our clients.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#888888] max-w-md text-base md:text-lg leading-relaxed mb-10 md:mb-12 font-regular"
          >
            Learn why top professionals, creators, and brands trust our post-production solutions to complete their customer journeys and scale their impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <StoriesLiquidButton />
          </motion.div>
        </div>

        {/* === RIGHT SIDE: Infinite Scroll (FRAMER MOTION FIX) === */}
        <div className="w-full lg:w-6/12 h-[50vh] sm:h-[60vh] lg:h-[80%] lg:-my-[15%] relative flex justify-center lg:justify-end overflow-hidden">

          <div className="absolute top-0 left-0 right-0 h-20 md:h-35 bg-gradient-to-b from-[#111111] via-[#111111]/90 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-20 md:h-35 bg-gradient-to-t from-[#111111] via-[#111111]/90 to-transparent z-20 pointer-events-none" />

          <div className="w-full max-w-lg">
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 20, // Lower = Faster. Change to 8 for extremely fast, 20 for slow.
                repeat: Infinity,
              }}
              className="flex flex-col"
            >
              {/* SET 1 */}
              <div className="flex flex-col gap-6 pb-6">
                {REVIEWS.map((review, index) => (
                  <div key={`set1-${index}`} className="group relative p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] bg-[#191919]/80 border border-white/5 backdrop-blur-xl flex flex-col justify-between w-full transition-colors duration-500 hover:bg-[#161616]">
                    <div className="flex gap-1 mb-4 md:mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#FFD700] fill-[#FFD700]" />
                      ))}
                    </div>
                    <p className="text-white/90 text-sm md:text-lg leading-relaxed font-light mb-6 md:mb-8">
                      {review.quote}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <span className="text-white/60 font-bold tracking-widest text-xs">{review.initials}</span>
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-medium tracking-wide">{review.name}</h4>
                        <p className="text-[#888888] text-[10px] uppercase tracking-[0.15em] mt-1">{review.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* SET 2 (Exact Duplicate for the perfect loop) */}
              <div className="flex flex-col gap-6 pb-6">
                {REVIEWS.map((review, index) => (
                  <div key={`set2-${index}`} className="group relative p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] bg-[#111111]/80 border border-white/5 backdrop-blur-xl flex flex-col justify-between w-full transition-colors duration-500 hover:bg-[#161616]">
                    <div className="flex gap-1 mb-4 md:mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#FFD700] fill-[#FFD700]" />
                      ))}
                    </div>
                    <p className="text-white/90 text-sm md:text-lg leading-relaxed font-light mb-6 md:mb-8">
                      {review.quote}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <span className="text-white/60 font-bold tracking-widest text-xs">{review.initials}</span>
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-medium tracking-wide">{review.name}</h4>
                        <p className="text-[#888888] text-[10px] uppercase tracking-[0.15em] mt-1">{review.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}