"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const SHORT_FORM_WORKS = [
    {
        title: "Urban Motion",
        category: "Reel / Short Form",
        image: "https://images.unsplash.com/photo-1514525253361-bee8718a300c?q=80&w=1974&auto=format&fit=crop",
        color: "#ff3366"
    },
    {
        title: "Eco Pulse",
        category: "TikTok / Social",
        image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop",
        color: "#33ff99"
    },
    {
        title: "Cyber Shift",
        category: "VFX / Short Form",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        color: "#3377ff"
    },
    {
        title: "Midnight Drive",
        category: "Cinematic Reel",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983&auto=format&fit=crop",
        color: "#ffcc00"
    },
    {
        title: "Neon Streets",
        category: "Reel / Travel",
        image: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=1974&auto=format&fit=crop",
        color: "#ff00ff"
    }
];

export default function PortfolioShortForm() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-[#050505]">
            <div className="sticky top-0 h-screen flex flex-col items-start justify-center overflow-hidden">
                <div className="px-6 sm:px-10 mb-8 sm:mb-12">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-2"
                    >
                        SHORT FORM <span className="text-white/30 italic">EXPERIENCES</span>
                    </motion.h2>
                    <p className="text-white/40 tracking-widest uppercase text-[10px]">Scroll to explore • Vertical Masterpieces</p>
                </div>

                <motion.div style={{ x, z: 0, willChange: "transform" }} className="flex gap-4 sm:gap-8 px-6 sm:px-10">
                    {SHORT_FORM_WORKS.map((work, index) => (
                        <motion.div
                            key={index}
                            data-cursor-text="PLAY"
                            className="group relative w-[260px] h-[460px] sm:w-[300px] sm:h-[533px] md:w-[350px] md:h-[622px] flex-shrink-0 bg-[#161616] rounded-2xl overflow-hidden cursor-pointer"
                            whileHover={{ scale: 0.98 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Image / Thumbnail placeholder */}
                            <Image
                                src={work.image}
                                alt={work.title}
                                fill
                                priority={index < 2}
                                sizes="(max-width: 768px) 300px, 350px"
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10" />

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 p-8 z-20">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2 block">
                                    {work.category}
                                </span>
                                <h3 className="text-2xl font-semibold tracking-tight">
                                    {work.title}
                                </h3>

                                {/* Visual Accent */}
                                <div
                                    className="absolute bottom-0 left-0 h-1 transition-all duration-500 w-0 group-hover:w-full"
                                    style={{ backgroundColor: work.color }}
                                />
                            </div>

                            {/* Play Icon Suggestion */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 5V19L19 12L8 5Z" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
