"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const CATEGORIES = [
    "All",
    "Long Form",
    "Corporate",
    "Video Shooting",
    "Course Editing",
    "Podcast Editing",
    "Kinetic Typography"
];

const PROJECTS = [
    {
        id: 1,
        title: "Global Tech Summit",
        category: "Corporate",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
        description: "Full event coverage and promotional highlights."
    },
    {
        id: 2,
        title: "The Mindset Masterclass",
        category: "Course Editing",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
        description: "A 10-episode high-production value educational series."
    },
    {
        id: 3,
        title: "Founders Talk",
        category: "Podcast Editing",
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1974&auto=format&fit=crop",
        description: "Multi-cam podcast editing with visual graphics."
    },
    {
        id: 4,
        title: "Future of Finance",
        category: "Long Form",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
        description: "A 45-minute documentary exploring DeFi markets."
    },
    {
        id: 5,
        title: "Neon Kinetic",
        category: "Kinetic Typography",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        description: "Fast-paced typographic promo for a sneaker brand."
    },
    {
        id: 6,
        title: "Automotive BTS",
        category: "Video Shooting",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983&auto=format&fit=crop",
        description: "Behind the scenes shooting for a luxury car commercial."
    },
];

export default function PortfolioFilterable() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = PROJECTS.filter(project =>
        activeCategory === "All" ? true : project.category === activeCategory
    );

    return (
        <section className="py-24 sm:py-32 bg-[#050505] px-6 sm:px-10 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 mb-4">
                            Archive
                        </h2>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
                            Project <span className="font-medium italic">Directory</span>
                        </h3>
                    </motion.div>

                    {/* Filter Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-wrap gap-2 md:max-w-xl md:justify-end"
                    >
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-wider transition-all duration-300 ${activeCategory === category
                                        ? "bg-white text-black font-medium"
                                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Project Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                key={project.id}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-video overflow-hidden rounded-xl bg-[#0a0a0a] mb-4">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm bg-black/20 transform scale-90 group-hover:scale-100 transition-all duration-300">
                                            View Project
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-lg font-medium tracking-tight group-hover:text-white transition-colors">{project.title}</h4>
                                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">{project.category}</span>
                                    </div>
                                    <p className="text-sm text-white/50 font-light truncate">{project.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-white/40 font-light">
                        No projects found in this category.
                    </div>
                )}
            </div>
        </section>
    );
}
