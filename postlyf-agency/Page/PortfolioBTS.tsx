"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const BTS_ITEMS = [
    {
        title: "Behind the Lens",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
        className: "md:col-span-2 md:row-span-2"
    },
    {
        title: "Set Life",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        title: "Color Grading",
        image: "https://images.unsplash.com/photo-1460518451285-97b620fb2d9d?q=80&w=2070&auto=format&fit=crop",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        title: "Shooting Urban Nomads",
        image: "https://images.unsplash.com/photo-1514525253361-bee8718a300c?q=80&w=1974&auto=format&fit=crop",
        className: "md:col-span-1 md:row-span-2"
    },
    {
        title: "Sound Design",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
        className: "md:col-span-1 md:row-span-1"
    }
];

export default function PortfolioBTS() {
    return (
        <section className="py-20 sm:py-32 px-6 sm:px-10 bg-[#050505]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 sm:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 text-right"
                    >
                        BEHIND THE <span className="text-white/30 italic">SCENES</span>
                    </motion.h2>
                    <p className="text-white/40 tracking-widest uppercase text-[10px] text-right">Raw Footage • On-Site Energy • Process</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 h-[1000px] sm:h-[1200px] md:h-[900px]">
                    {BTS_ITEMS.map((item, index) => (
                        <motion.div
                            key={index}
                            data-cursor-text="RAW"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative group overflow-hidden rounded-xl bg-[#161616] cursor-pointer ${item.className}`}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                priority={index < 3}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105 opacity-50 group-hover:opacity-100"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h4 className="text-xl font-bold tracking-tight text-white">
                                    {item.title}
                                </h4>
                            </div>

                            {/* Decorative corner */}
                            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/20 group-hover:border-white/60 transition-colors" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
