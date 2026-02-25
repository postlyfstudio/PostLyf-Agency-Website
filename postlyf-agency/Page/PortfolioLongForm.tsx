"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LONG_FORM_WORKS = [
    {
        title: "The Art of Storytelling",
        category: "Documentary / 15:00",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
        desc: "A deep dive into the creative process of modern digital artists."
    },
    {
        title: "Global Tech Summit 2024",
        category: "Event Highlight / 08:30",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
        desc: "Capturing the energy and innovation of the world's leading tech event."
    },
    {
        title: "Nature's Resonance",
        category: "Cinematic Essay / 12:00",
        image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1975&auto=format&fit=crop",
        desc: "A visual journey through untouched landscapes across three continents."
    }
];

export default function PortfolioLongForm() {
    return (
        <section className="py-20 sm:py-32 px-6 sm:px-10 bg-[#050505]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 sm:mb-20 text-center md:text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4"
                    >
                        LONG FORM <span className="text-white/30 italic">NARRATIVES</span>
                    </motion.h2>
                    <p className="text-white/40 tracking-widest uppercase text-[10px]">Extended Stories • Cinematic Directing</p>
                </div>

                <div className="grid grid-cols-1 gap-20 sm:gap-32">
                    {LONG_FORM_WORKS.map((work, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-center">
                                {/* Visual */}
                                <div
                                    data-cursor-text="VIEW"
                                    className="relative w-full md:w-3/5 aspect-video overflow-hidden rounded-xl border border-white/5 cursor-pointer"
                                >
                                    <Image
                                        src={work.image}
                                        alt={work.title}
                                        fill
                                        priority={index === 0}
                                        sizes="(max-width: 768px) 100vw, 60vw"
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                {/* Content */}
                                <div className="w-full md:w-2/5">
                                    <span className="text-blue-500 font-medium tracking-widest uppercase text-[10px] mb-3 sm:mb-4 block">
                                        {work.category}
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
                                        {work.title}
                                    </h3>
                                    <p className="text-white/60 leading-relaxed text-base md:text-lg mb-6 sm:mb-8 text-center md:text-left">
                                        {work.desc}
                                    </p>

                                    <motion.button
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-3 text-sm font-semibold tracking-wide group-hover:text-blue-500 transition-colors"
                                    >
                                        DISCOVER PROJECT
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </div>

                            {/* Background index number */}
                            <span className="absolute -top-10 -left-10 text-[20vw] font-bold text-white/[0.02] pointer-events-none select-none">
                                0{index + 1}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
