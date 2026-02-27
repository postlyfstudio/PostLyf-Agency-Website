"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const CTALiquidButton = () => {
    const btnRef = useRef<HTMLAnchorElement>(null);
    const fillMouseX = useMotionValue(0);
    const fillMouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
    const smoothX = useSpring(fillMouseX, springConfig);
    const smoothY = useSpring(fillMouseY, springConfig);

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        fillMouseX.set(e.clientX - rect.left);
        fillMouseY.set(e.clientY - rect.top);
    };

    return (
        <Link
            href="/#contact"
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // YOUR EXACT STYLING
            className="group relative z-10 inline-flex items-center gap-4 md:gap-6 px-10 py-5 md:px-14 md:py-8 bg-white text-black hover:text-white transition-all duration-500 border border-white/10 rounded-full overflow-hidden transition-transform duration-500 hover:scale-105 active:scale-95 font-bold text-lg md:text-xl tracking-tight shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
        >
            <span className="relative z-10">Start Your Project</span>

            {/* Exact inner icon container styling */}
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black transition-colors duration-500 relative z-10">
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:text-white transition-colors" />
            </div>

            {/* THE LIQUID FILL EFFECT (Replaces the static slide-up div) */}
            <motion.div
                style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
                animate={{ width: isHovered ? "200%" : "0%", height: isHovered ? "700%" : "0%" }}
                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                // Using your specific #f0f0f0 hover color
                className="absolute pointer-events-none rounded-full bg-[#1a1a1a] z-0"
            />
        </Link>
    );
};

export default function PrimaryCTA() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Magnetic Button Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.35);
        y.set((e.clientY - centerY) * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Scroll Parallax for Background Marquee
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xPos1 = useTransform(scrollYProgress, [0, 1], ["-5%", "-25%"]);
    const xPos2 = useTransform(scrollYProgress, [0, 1], ["-25%", "-5%"]);

    return (
        <section
            ref={containerRef}
            className="relative z-10 bg-[#111111] py-40 md:py-64 overflow-hidden border-y border-white/5 flex items-center justify-center"
        >
            {/* 1. Cinematic Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-20" />

            {/* 2. Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#666666]/10 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* 3. Dual-Level Parallax Marquee */}
            <div className="absolute inset-0 flex flex-col justify-center gap-4 pointer-events-none z-0 opacity-[0.032] select-none">
                {/* Layer 1: Forward */}
                <motion.div
                    style={{ x: xPos1 }}
                    className="flex whitespace-nowrap"
                >
                    <h2 className="text-[150px] md:text-[280px] font-bold tracking-tighter leading-none italic uppercase">
                        Start the Vision • Start the Vision • Start the Vision •
                    </h2>
                </motion.div>

                {/* Layer 2: Backward */}
                <motion.div
                    style={{ x: xPos2 }}
                    className="flex whitespace-nowrap"
                >
                    <h2 className="text-[150px] md:text-[280px] font-bold tracking-tighter leading-none uppercase">
                        Let's create magic • Let's create magic • Let's create magic •
                    </h2>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">

                {/* Animated Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-10 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                    <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold">Available for new projects</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    className="text-4xl sm:text-5xl md:text-8xl lg:text-[110px] font-medium tracking-tight text-white leading-[1] mb-12 max-w-5xl px-4"
                >
                    Ready to <span className="text-[#666666]">elevate</span> <br />
                    your digital <span className="italic font-light">story?</span>
                </motion.h2>

                {/* 4. Magnetic Button Container */}
                <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ x: mouseX, y: mouseY }}
                    className="relative"
                >
                    {/* Subtle Glow under button */}
                    <div className="absolute -inset-8 bg-white/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* 4. Magnetic Button Container */}
                    <motion.div
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ x: mouseX, y: mouseY }}
                        className="relative"
                    >
                        {/* Subtle Glow under button */}
                        <div className="absolute -inset-8 bg-white/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        {/* === STRICT MANDATORY CTA REPLACED HERE === */}
                        <CTALiquidButton />

                        {/* Magnetic text hint */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-[#444444] font-medium"
                        >
                            Click to connect
                        </motion.div>
                    </motion.div>
                </motion.div>   

            </div>
        </section>
    );
}
