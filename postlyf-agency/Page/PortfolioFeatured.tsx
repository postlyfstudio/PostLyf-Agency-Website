"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const FEATURED_PROJECTS = [
    {
        title: "The Odyssey",
        client: "Aurora Tech",
        role: "Full Production • Post-Production",
        description: "A cinematic brand film detailing the evolution of future technology through dynamic visual storytelling and high-end VFX.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        year: "2024",
    },
    {
        title: "Neon Pulse",
        client: "Elevate Apparel",
        role: "Creative Direction • Editing",
        description: "High-energy commercial campaign focused on kinetic typography, fast-paced edits, and a neon-drenched aesthetic.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        year: "2024",
    },
    {
        title: "Echoes of Time",
        client: "Horizon Studios",
        role: "Color Grading • Sound Design",
        description: "An atmospheric short documentary exploring the intricate craftsmanship behind traditional watchmaking, elevated by immersive soundscapes.",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983&auto=format&fit=crop",
        year: "2023",
    }
];

export default function PortfolioFeatured() {
    return (
        <section className="bg-[#050505] py-24 sm:py-32 px-6 sm:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16 sm:mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 mb-4">
                            Select Works
                        </h2>
                        <h3 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight">
                            Featured <span className="font-medium italic">Case Studies</span>
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-white/30"
                    >
                        [ 01 — 03 ]
                    </motion.div>
                </div>

                <div className="flex flex-col gap-24 sm:gap-32">
                    {FEATURED_PROJECTS.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
            {/* Image Container */}
            <div className={`w-full lg:col-span-8 overflow-hidden rounded-xl bg-[#0a0a0a] ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/10] overflow-hidden w-full cursor-pointer">
                    <motion.div
                        style={{ y: imageY }}
                        className="absolute inset-[-15%] w-[130%] h-[130%]"
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                    </motion.div>

                    {/* View Case Study Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1]">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white">View</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className={`w-full lg:col-span-4 flex flex-col ${index % 2 !== 0 ? 'lg:order-1 lg:items-end lg:text-right' : 'lg:items-start lg:text-left'}`}>
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 border border-white/10 px-3 py-1 rounded-full">
                        0{index + 1}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                        {project.year}
                    </span>
                </div>

                <h4 className="text-3xl sm:text-4xl font-light tracking-tight mb-2">
                    {project.title}
                </h4>

                <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-8 mt-2">
                    Client // {project.client}
                </p>

                <div className="h-[1px] w-full bg-white/10 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/40 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                </div>

                <p className="text-sm text-white/60 leading-relaxed max-w-sm mb-8">
                    {project.description}
                </p>

                <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Role</span>
                    <span className="text-xs font-medium uppercase tracking-wider text-white/80">{project.role}</span>
                </div>
            </div>
        </motion.div>
    );
}
