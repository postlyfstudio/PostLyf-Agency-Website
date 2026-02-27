"use client";

import { motion } from "framer-motion";

export default function PortfolioIntro() {
    return (
        <section className="relative bg-[#111111] py-32 sm:py-48 px-6 sm:px-10 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

                    {/* Left Column - SEO H2 and mini description */}
                    <div className="col-span-1 lg:col-span-5 flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white/40 mb-4">
                                The Studio
                            </h2>
                            <p className="text-3xl sm:text-4xl font-light tracking-tight text-white/90 leading-snug">
                                Professional Video Production & Editing for <span className="font-medium text-white italic">Brands and Creators.</span>
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="h-[1px] w-full bg-white/10 origin-left"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-2 gap-8"
                        >
                            <div>
                                <span className="block text-4xl sm:text-5xl font-light mb-2">150+</span>
                                <span className="text-[10px] uppercase tracking-[0.15em] text-white/50">Projects Delivered</span>
                            </div>
                            <div>
                                <span className="block text-4xl sm:text-5xl font-light mb-2">50M+</span>
                                <span className="text-[10px] uppercase tracking-[0.15em] text-white/50">Views Generated</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Large structured text copy */}
                    <div className="col-span-1 lg:col-span-6 lg:col-start-7 lg:mt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-lg sm:text-xl text-white/60 font-light leading-relaxed flex flex-col gap-6"
                        >
                            <p>
                                PostLfy Studio is a video production agency in Pune delivering cinematic storytelling, professional video editing, and corporate video production for brands and creators worldwide.
                            </p>

                            <p>
                                From short form video editing and YouTube content to branded campaigns and commercial films, our work is designed to build authority, increase engagement, and drive measurable digital growth.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Subtle background element */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
}
