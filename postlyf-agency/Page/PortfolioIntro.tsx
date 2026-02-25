"use client";

import { motion } from "framer-motion";

export default function PortfolioIntro() {
    return (
        <section className="relative bg-[#050505] py-32 sm:py-48 px-6 sm:px-10 overflow-hidden">
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
                                We are the silent force behind <span className="font-medium text-white italic">industry-leading brands & creators.</span>
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
                                PostLyf Studio isn&apos;t just another editing service. We are a cinematic production house dedicated to elevating digital presence through high-end storytelling, meticulous post-production, and strategic thinking.
                            </p>
                            <p>
                                Our approach bridges the gap between commercial aesthetics and engaging social formats. We understand that in today&apos;s saturated market, your content needs to do more than just look good—it needs to command attention, establish authority, and drive conversion.
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
