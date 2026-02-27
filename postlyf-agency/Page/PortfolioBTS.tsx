"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const BTS_WORKS = [
    {
        title: "On Set: Desert Winds",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
        category: "Behind the Scenes"
    },
    {
        title: "Studio Setup: Neon Nights",
        image: "https://images.unsplash.com/photo-1598897349489-447a9744c9a4?q=80&w=2070&auto=format&fit=crop",
        category: "Production"
    },
    {
        title: "Color Grading Session",
        image: "https://images.unsplash.com/photo-1551503766-ac63dfa6401c?q=80&w=2070&auto=format&fit=crop",
        category: "Post-Production"
    },
    {
        title: "Night Shoot Logistics",
        image: "https://images.unsplash.com/photo-1485646327022-b17fa01433ac?q=80&w=1954&auto=format&fit=crop",
        category: "On Location"
    },
    {
        title: "Equipment Mastery",
        image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=1976&auto=format&fit=crop",
        category: "Technical"
    },
    {
        title: "The Creative Huddle",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
        category: "Directing"
    }
];

export default function PortfolioBTS() {
    return (
        <section className="relative py-32 bg-[#050505] overflow-hidden">
            <div className="px-6 sm:px-10 max-w-7xl mx-auto mb-20">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-end text-right gap-6"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight">
                        The <span className="font-medium italic">Process</span>
                    </h2>
                    <p className="text-white/40 tracking-widest uppercase text-xs flex items-center justify-end gap-2">
                        Behind the Scenes & Production
                        <span className="w-12 h-[1px] bg-white/40" />
                    </p>
                </motion.div>
            </div>

            <div className="px-6 sm:px-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BTS_WORKS.map((work, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-[#111]"
                        >
                            <Image
                                src={work.image}
                                alt={work.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                                <span className="text-[10px] uppercase tracking-widest text-white/50 mb-2">{work.category}</span>
                                <h3 className="text-xl font-light tracking-tight">{work.title}</h3>
                            </div>

                            {/* Decorative Corner */}
                            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20 group-hover:border-white/60 transition-colors duration-500" />
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20 group-hover:border-white/60 transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Text Decor */}
            <div className="absolute left-0 bottom-0 pointer-events-none select-none opacity-[0.02] transform translate-y-1/2 -translate-x-1/4">
                <h2 className="text-[30vw] font-bold whitespace-nowrap leading-none tracking-tighter">
                    PRODUCTION
                </h2>
            </div>
        </section>
    );
}
