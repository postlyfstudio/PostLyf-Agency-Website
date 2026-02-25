"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PROCESS_STEPS = [
    {
        num: "01",
        title: "Discovery & Strategy",
        desc: "We dive deep into your brand identity, target audience, and campaign goals to develop a strategic framework that drives the creative direction."
    },
    {
        num: "02",
        title: "Pre-Production",
        desc: "Meticulous planning ensures seamless execution. We handle moodboarding, scriptwriting, storyboarding, and talent acquisition."
    },
    {
        num: "03",
        title: "Production",
        desc: "Using cinema-grade equipment, our lighting and camera teams capture stunning visuals that align perfectly with the established vision."
    },
    {
        num: "04",
        title: "Post-Production",
        desc: "The magic happens in the edit. We craft the narrative pacing, apply high-end VFX, and grade the footage to achieve a distinct cinematic look."
    },
    {
        num: "05",
        title: "Sound & Delivery",
        desc: "Immersive sound design and final mixing elevate the emotional impact. Assets are delivered formatted perfectly for every required platform."
    }
];

export default function PortfolioProcess() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section ref={containerRef} className="py-24 sm:py-32 bg-[#050505] px-6 sm:px-10 overflow-hidden relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 mb-4">
                            Workflow
                        </h2>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
                            The <span className="font-medium italic">Process</span>
                        </h3>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Left Sticky Column */}
                    <div className="hidden lg:block col-span-4 relative">
                        <div className="sticky top-40 flex flex-col gap-8">
                            <p className="text-white/60 text-lg font-light leading-relaxed pr-8">
                                A systematic, transparent approach from the initial brief to the final delivery. Quality control is maintained at every single touchpoint.
                            </p>

                            {/* Decorative element responding to scroll */}
                            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center relative mt-12">
                                <motion.div
                                    style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 360]) }}
                                    className="w-full h-full absolute flex items-center justify-center flex-col gap-[3px]"
                                >
                                    <div className="w-[1px] h-2 bg-white/50 absolute top-2" />
                                    <div className="w-[1px] h-2 bg-white/50 absolute bottom-2" />
                                    <div className="h-[1px] w-2 bg-white/50 absolute left-2" />
                                    <div className="h-[1px] w-2 bg-white/50 absolute right-2" />
                                </motion.div>
                                <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Right Scrolling Column */}
                    <div className="col-span-1 lg:col-span-8 flex flex-col gap-8 relative">
                        {PROCESS_STEPS.map((step, index) => (
                            <ProcessItem key={index} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProcessItem({ step, index }: { step: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative border-b border-white/10 pb-8 hover:pb-12 transition-all duration-500"
        >
            <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6 md:gap-12 items-start">
                <div className="text-3xl sm:text-4xl font-light text-white/30 group-hover:text-white transition-colors duration-500">
                    {step.num}
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="text-xl sm:text-2xl tracking-tight font-medium group-hover:pl-4 transition-all duration-500 ease-[0.16,1,0.3,1]">
                        {step.title}
                    </h4>
                    <p className="text-sm sm:text-base text-white/50 font-light leading-relaxed max-w-xl group-hover:text-white/80 transition-colors duration-500">
                        {step.desc}
                    </p>
                </div>
            </div>

            {/* Hover accent line */}
            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-white group-hover:w-full transition-all duration-700 ease-[0.16,1,0.3,1]" />
        </motion.div>
    );
}
