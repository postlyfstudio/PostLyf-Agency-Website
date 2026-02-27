"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Strategy & Creative Direction",
    desc: "We analyze your brand positioning, audience behavior, and campaign goals to design a performance-driven video production strategy."
  },
  {
    num: "02",
    title: "Pre-Production Planning",
    desc: "Scriptwriting, storyboarding, and production planning ensure seamless execution and cinematic storytelling."
  },
  {
    num: "03",
    title: "Professional Video Production",
    desc: "Using cinema-grade equipment, our team captures high-quality visuals aligned with brand objectives and commercial standards."
  },
  {
    num: "04",
    title: "Video Editing & Post-Production",
    desc: "Professional video editing, motion graphics, color grading, and VFX integration crafted for retention and impact."
  },
  {
    num: "05",
    title: "Sound Design & Multi-Platform Delivery",
    desc: "Final sound mixing and optimized exports for YouTube, Instagram, corporate platforms, and digital campaigns."
  }
];

export default function PortfolioProcess() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section ref={containerRef} className="py-24 sm:py-32 bg-[#191919] px-6 sm:px-10 overflow-hidden relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 mb-4">
                            Video Production Process
                        </h2>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
                            Our <span className="font-medium italic">Production Workflow</span>
                        </h3>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Left Sticky Column */}
                    <div className="hidden lg:block col-span-4 relative">
                        <div className="sticky top-40 flex flex-col gap-8">
                            <p className="text-white/60 text-md font-light leading-relaxed pr-8">
                                As a video production agency in Pune, we follow a structured, end-to-end workflow — from strategic planning and professional video shooting to high-end editing, color grading, and final delivery.
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
