"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "./MagneticButton";

export default function PortfolioHero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    const titleWords = "CRAFTING CINEMATIC STORIES".split(" ");

    return (
        <section
            ref={containerRef}
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background with grain and subtle gradient */}
            <motion.div
                style={{ y, scale, opacity, willChange: "transform, opacity" }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-[#050505]" />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* Abstract shapes */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full" />
            </motion.div>

            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
                >
                    <span className="text-[11px] font-light text-white/50 uppercase tracking-[0.2em]">
                        Selected Works Archive
                    </span>
                </motion.div>

                <h1 className="text-6xl md:text-[8vw] font-bold tracking-tighter leading-[0.9] flex flex-wrap justify-center gap-x-[0.2em]">
                    {titleWords.map((word, i) => (
                        <span key={i} className="overflow-hidden inline-block">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 1,
                                    delay: i * 0.1,
                                    ease: [0.33, 1, 0.68, 1],
                                }}
                                className="inline-block"
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="mt-8 text-white/40 text-sm md:text-lg max-w-2xl mx-auto uppercase tracking-widest font-light mb-12"
                >
                    A curated selection of short-form, long-form, and BTS masterpieces.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <MagneticButton>View Showreel</MagneticButton>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 rotate-90 origin-left ml-1 translate-y-4">
                    Scroll Down
                </span>
            </motion.div>
        </section>
    );
}
