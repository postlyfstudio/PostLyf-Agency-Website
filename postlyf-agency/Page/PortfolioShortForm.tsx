"use client";

import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
    // Duplicate the array to create an infinite loop effect
    const duplicatedWorks = [...SHORT_FORM_WORKS, ...SHORT_FORM_WORKS, ...SHORT_FORM_WORKS];

    // We use motion value for x so we can animate it and also allow dragging to update it
    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const controls = useAnimation();

    // Calculate the width of one set of items to know when to loop
    const itemWidth = 350; // md:w-[350px]
    const gap = 32; // md:gap-8 (2rem)
    const singleSetWidth = (itemWidth + gap) * SHORT_FORM_WORKS.length;

    useEffect(() => {
        let animationFrameId: number;

        const animate = () => {
            if (!isHovered) {
                // Move left by a small amount each frame
                const currentX = x.get();
                // If we've scrolled past one full set, loop back
                if (currentX <= -singleSetWidth) {
                    x.set(currentX + singleSetWidth);
                } else {
                    x.set(currentX - 1); // Adjust speed here (higher = faster)
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered, singleSetWidth, x]);

    return (
        <section className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden">
            <div className="px-6 sm:px-10 max-w-7xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-4"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
                        Short Form <span className="font-medium italic">Experiences</span>
                    </h2>
                    <p className="text-white/40 tracking-widest uppercase text-[10px] flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-white/40" />
                        Interactive Vertical Formats
                    </p>
                </motion.div>

                <div className="hidden md:flex items-center gap-2 mt-8 text-white/30 text-[10px] uppercase tracking-widest">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Drag to explore
                </div>
            </div>

            <div
                className="relative cursor-grab active:cursor-grabbing w-full overflow-visible"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                ref={containerRef}
            >
                <motion.div
                    style={{ x }}
                    drag="x"
                    dragConstraints={containerRef}
                    dragElastic={0.1}
                    onDragStart={() => setIsHovered(true)}
                    onDragEnd={() => setIsHovered(false)}
                    className="flex gap-4 sm:gap-8 px-6 sm:px-10 w-max"
                >
                    {duplicatedWorks.map((work, index) => (
                        <motion.div
                            key={index}
                            data-cursor-text="PLAY"
                            className="group relative w-[260px] h-[460px] sm:w-[300px] sm:h-[533px] md:w-[350px] md:h-[622px] flex-shrink-0 bg-[#0a0a0a] rounded-2xl overflow-hidden"
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Image
                                src={work.image}
                                alt={work.title}
                                fill
                                sizes="(max-width: 768px) 300px, 350px"
                                className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 block border border-white/10 w-fit px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                                    {work.category}
                                </span>
                                <h3 className="text-2xl font-light tracking-tight mb-4">
                                    {work.title}
                                </h3>

                                {/* Visual Accent Line */}
                                <div
                                    className="h-1 transition-all duration-700 w-0 group-hover:w-full ease-[0.16,1,0.3,1] rounded-full"
                                    style={{ backgroundColor: work.color }}
                                />
                            </div>

                            {/* Play Icon Suggestion */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 scale-90 group-hover:scale-100 ease-[0.16,1,0.3,1] pointer-events-none">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="ml-1">
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
