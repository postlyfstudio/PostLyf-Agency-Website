"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LONG_FORM_WORKS = [
    {
        title: "The Silent Forest",
        category: "Short Film / Narrative",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop",
        description: "An immersive journey through the whispers of ancient giants.",
        year: "2024"
    },
    {
        title: "Pulse of Tokyo",
        category: "Documentary",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop",
        description: "Exploring the neon veins and hidden hearts of the world's most vibrant city.",
        year: "2023"
    },
    {
        title: "Echoes of Eternity",
        category: "Music Video",
        image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
        description: "Visualizing the ethereal soundscapes of synth-wave dreams.",
        year: "2024"
    }
];

export default function PortfolioLongForm() {
    return (
        <section className="relative py-32 bg-[#050505]">
            <div className="px-6 sm:px-10 max-w-7xl mx-auto mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-6"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight">
                        Long Form <span className="font-medium italic">Narratives</span>
                    </h2>
                    <p className="text-white/40 tracking-widest uppercase text-xs flex items-center gap-2">
                        <span className="w-12 h-[1px] bg-white/40" />
                        Cinematic Storytelling & Features
                    </p>
                </motion.div>
            </div>

            <div className="px-6 sm:px-10 max-w-7xl mx-auto flex flex-col gap-32">
                {LONG_FORM_WORKS.map((work, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className={`group relative flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
                    >
                        {/* Image Container */}
                        <div className="relative w-full md:w-3/5 aspect-[16/9] overflow-hidden rounded-2xl">
                            <Image
                                src={work.image}
                                alt={work.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 scale-90 group-hover:scale-100">
                                <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5V19L19 12L8 5Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="w-full md:w-2/5 flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <span className="text-white/40 text-sm font-mono">{work.year}</span>
                                <span className="w-8 h-[1px] bg-white/20" />
                                <span className="text-white/50 text-xs uppercase tracking-widest">{work.category}</span>
                            </div>

                            <h3 className="text-3xl sm:text-4xl font-light tracking-tight group-hover:text-white/80 transition-colors">
                                {work.title}
                            </h3>

                            <p className="text-white/60 text-lg leading-relaxed font-light">
                                {work.description}
                            </p>

                            <motion.button
                                whileHover={{ x: 10 }}
                                className="flex items-center gap-3 text-white text-sm uppercase tracking-[0.2em] font-medium mt-4 group/btn"
                            >
                                View Case Study
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-x-2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
