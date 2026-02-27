"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "./MagneticButton";
import Link from "next/link";

export default function PortfolioHero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const titleWords = "VIDEO PRODUCTION SHOWCASE".split(" ");

    return (
        <section
            ref={containerRef}
            className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background with grain and subtle gradient */}
            <motion.div
                style={{ y, scale, opacity, willChange: "transform, opacity" }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-[#050505]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent opacity-50" />
                <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* Abstract shape */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-white/[0.02] blur-[120px] rounded-full" />
            </motion.div>

            <div className="relative z-10 text-center px-6 w-full max-w-7xl mx-auto flex flex-col items-center mt-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-medium text-white/80 uppercase tracking-[0.2em]">
                        Video Production Portfolio
                    </span>
                </motion.div>

                <h1 className="text-[12vw] sm:text-[10vw] lg:text-[7vw] font-bold tracking-tighter leading-[0.85] flex flex-wrap justify-center gap-x-[0.2em] mb-8">
                    {titleWords.map((word, i) => (
                        <span key={i} className="overflow-hidden inline-block py-2">
                            <motion.span
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 1.2,
                                    delay: i * 0.15,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="inline-block origin-bottom"
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-white/50 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto tracking-wide font-light mb-12"
                >
                    We are a video production agency in Pune delivering cinematic storytelling, professional video editing, and corporate film production for brands and creators worldwide.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center gap-6"
                >
                    <MagneticButton>
                        <span className="flex items-center gap-3 px-8 py-4 font-medium uppercase tracking-widest text-sm">
                            Start a Project
                            <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                            </svg>
                        </span>
                    </MagneticButton>

                    {/* <Link href="#contact" className="group flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300">
                        Start a Project
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link> */}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
            >
                {/* <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                    Scroll
                </span> */}
                <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                        className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-white to-transparent"
                    />
                </div>
            </motion.div>
        </section>
    );
}
