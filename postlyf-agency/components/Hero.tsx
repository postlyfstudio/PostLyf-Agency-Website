"use client";

import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, MotionValue, useMotionTemplate } from "framer-motion";
import { useMemo, useRef, useEffect, useState, memo } from "react";
import Link from "next/link";

const words = ["Growth", "Authority", "Engagement", "Scale"];

const LOGOS = [
  { name: "Mahindra" },
  { name: "KASHISH" },
  { name: "PROPERTY SEARCH" },
  { name: "LawTech" },
  { name: "INDUSTRY MAGNATES" },
  { name: "Director's Institute" },
  { name: "GENOME" },
  { name: "DI DATABANK" },
  { name: "WDC" },
];

// --- Internal Particle Component (Memoized for performance) ---
const Particle = memo(({ p, mouseX, mouseY, dimensions }: {
  p: any,
  mouseX: MotionValue<number>,
  mouseY: MotionValue<number>,
  dimensions: { width: number, height: number }
}) => {
  const pullX = useTransform(mouseX, (mx) => {
    if (dimensions.width === 0) return 0;
    const px = (p.initialX / 100) * dimensions.width;
    const dx = mx - px;
    const py = (p.initialY / 100) * dimensions.height;
    const dy = mouseY.get() - py;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = 220;

    if (distance < radius) {
      const strength = (1 - distance / radius);
      return (dx / distance) * strength * 70;
    }
    return 0;
  });

  const pullY = useTransform(mouseY, (my) => {
    if (dimensions.height === 0) return 0;
    const py = (p.initialY / 100) * dimensions.height;
    const dy = my - py;
    const px = (p.initialX / 100) * dimensions.width;
    const dx = mouseX.get() - px;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = 220;

    if (distance < radius) {
      const strength = (1 - distance / radius);
      return (dy / distance) * strength * 70;
    }
    return 0;
  });

  const springX = useSpring(pullX, { stiffness: 60, damping: 20 });
  const springY = useSpring(pullY, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      style={{
        width: p.size,
        height: p.size,
        left: `${p.initialX}%`,
        top: `${p.initialY}%`,
        x: springX,
        y: springY,
        opacity: 0.6,
        willChange: "transform",
      }}
      className="absolute bg-white rounded-full transition-shadow duration-300"
      animate={{
        translateX: [0, p.moveX, 0],
        translateY: [0, p.moveY, 0],
        boxShadow: ["0 0 10px rgba(255,255,255,0.2)", "0 0 15px rgba(255,255,255,0.4)", "0 0 10px rgba(255,255,255,0.2)"],
      }}
      transition={{
        duration: p.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: p.delay,
      }}
    />
  );
});

Particle.displayName = "Particle";

// --- Internal Liquid Button Component ---
type LiquidButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
};

const LiquidButton = ({
  children,
  variant = "primary",
  href,
  onClick,
}: LiquidButtonProps) => {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
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

  const isPrimary = variant === "primary";

  const baseClasses = `
    group relative h-[52px] min-w-[170px] px-2 inline-flex items-center justify-center text-[16px] font-medium rounded-full overflow-hidden transition-colors duration-500
    ${isPrimary
      ? "bg-white text-black hover:text-white"
      : "bg-[#3a3a3a] text-white border border-white/10 hover:border-white/20"}
  `;

  const content = (
    <>
      <span className="relative z-10">{children}</span>

      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: isHovered ? "200%" : "0%",
          height: isHovered ? "700%" : "0%",
        }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="absolute pointer-events-none rounded-full bg-[#1a1a1a]"
      />
    </>
  );

  // 🔥 If href exists → render Link
  if (href) {
    return (
      <Link
        href={href}
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={baseClasses}
      >
        {content}
      </Link>
    );
  }

  // Default button
  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={baseClasses}
    >
      {content}
    </button>
  );
};

export default function Hero({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const auraX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const auraY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({ // Reduced particle count for performance
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      moveX: (Math.random() - 0.5) * 120,
      moveY: (Math.random() - 0.5) * 120,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 5 + 6,
      delay: Math.random() * 5,
      pullStrength: Math.random() * 40 + 20,
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000); // Increased interval slightly
    return () => clearInterval(interval);
  }, []);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions, { passive: true });
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.55]);
  const rotate = useTransform(scrollYProgress, [0, 0.15], [0, -17]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15], [0, -80]);
  const particleOpacity = useTransform(scrollYProgress, [0, 0.15], [0.8, 0]);

  return (
    <motion.section
      ref={containerRef}
      id="hero"
      style={{
        opacity,
        pointerEvents: useTransform(scrollYProgress, [0, 0.14, 0.15], ["auto", "auto", "none"]) as any,
        willChange: "opacity, transform",
      }}
      className="sticky top-0 h-screen bg-[#050505] z-0 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white opacity-[0.02] blur-[100px] pointer-events-none z-0" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white opacity-[0.03] blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <motion.div
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${auraX}px ${auraY}px, rgba(255, 255, 255, 0.08), transparent 70%)`,
        }}
        className="absolute inset-0 pointer-events-none z-25 mix-blend-overlay"
      />

      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{ opacity: particleOpacity }}
      >
        {mounted && particles.map((p) => (
          <Particle
            key={p.id}
            p={p}
            mouseX={mouseX}
            mouseY={mouseY}
            dimensions={dimensions}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ scale, rotate, y, willChange: "transform" }}
        className="relative z-10 w-full h-full flex flex-col justify-between pt-[18vh] md:pt-[22vh] pb-10 px-6"
      >
        <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="px-3 py-1 rounded-full border border-white/10 bg-[#161616]/40 backdrop-blur-md mb-3"
          >
            <span className="text-[10px] md:text-[11px] font-light text-white/70 uppercase tracking-[0.1em]">
              Creative Digital Agency
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[85px] font-semibold tracking-tight text-white leading-[1.1] mb-4 w-full">
            Turning Stories into <br className="hidden sm:inline" />
            <span className="block h-[1.2em] overflow-hidden mt-1 relative z-20">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIndex]}
                  initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                  className="block bg-gradient-to-r from-[#3377ff] via-[#6699ff] to-[#FFD700] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(51,119,255,0.3)]"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="font-regular max-w-xl mx-auto text-white/80 text-sm sm:text-base md:text-md leading-relaxed mb-8"
          >
            A premium video production and digital marketing agency in Pune helping brands scale through strategy-led content.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
          >
            <div className="w-full sm:w-auto">
              <LiquidButton variant="primary" href="/#services">Our services</LiquidButton>
            </div>
            <div className="w-full sm:w-auto">
              <LiquidButton variant="secondary" href="/#contact">
                Get in touch
              </LiquidButton>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="w-full flex flex-col items-center mt-auto pb-8 md:pb-14"
        >
          <span className="text-[9px] md:text-[13px] uppercase text-white/80 mb-6 md:mb-8 font-regular">
            They Trusted Us
          </span>

          <div className="w-full max-w-7xl mx-auto overflow-hidden relative flex 
                before:absolute before:left-0 before:top-0 before:z-20 before:h-full before:w-12 sm:before:w-24 md:before:w-48 before:bg-gradient-to-r before:from-[#050505] before:to-transparent 
                after:absolute after:right-0 after:top-0 after:z-20 after:h-full after:w-12 sm:after:w-24 md:after:w-48 after:bg-gradient-to-l after:from-[#050505] after:to-transparent">

            <motion.div
              className="flex gap-16 sm:gap-24 md:gap-32 items-center pr-16 sm:pr-24 md:pr-32"
              animate={{ x: ["0%", "-33.33%"] }}
              transition={{
                ease: "linear",
                duration: 20,
                repeat: Infinity,
                repeatType: "loop"
              }}
              whileHover={{ transition: { duration: 60 } }}
            >
              {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, index) => (
                <div key={index} className="relative w-max shrink-0 flex items-center justify-center group/logo">
                  <span className="text-xl sm:text-2xl md:text-[28px] font-bold tracking-tight text-white/50 group-hover/logo:text-white transition-colors duration-500 whitespace-nowrap">
                    {logo.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
