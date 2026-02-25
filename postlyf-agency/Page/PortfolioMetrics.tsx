"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const METRICS = [
    { value: 150, suffix: "+", label: "Projects Delivered" },
    { value: 50, suffix: "M+", label: "Views Generated" },
    { value: 12, suffix: "", label: "Industry Awards" },
    { value: 100, suffix: "%", label: "Client Satisfaction" },
];

export default function PortfolioMetrics() {
    return (
        <section className="py-24 sm:py-32 bg-[#050505] px-6 sm:px-10">
            <div className="max-w-7xl mx-auto relative cursor-default">

                {/* Visual background abstraction */}
                <div className="absolute inset-0 bg-white/[0.02] rounded-3xl blur-[80px] pointer-events-none" />

                <div className="relative border border-white/10 rounded-3xl p-10 sm:p-16 lg:p-24 overflow-hidden">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {METRICS.map((metric, index) => (
                            <MetricCounter key={index} metric={metric} delay={index * 0.1} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function MetricCounter({ metric, delay }: { metric: any; delay: number }) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const inView = useInView(nodeRef, { once: true, margin: "-100px" });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [inView, controls]);

    return (
        <div ref={nodeRef} className="flex flex-col gap-4 relative">
            <motion.div
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="flex items-baseline"
            >
                <AnimatedNumber value={metric.value} inView={inView} delay={delay} />
                <span className="text-3xl sm:text-5xl font-light text-white">{metric.suffix}</span>
            </motion.div>

            <motion.div
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.8, delay: delay + 0.3 } }
                }}
            >
                <div className="h-[1px] w-8 bg-white/20 mb-4" />
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white/50 block">
                    {metric.label}
                </span>
            </motion.div>
        </div>
    );
}

function AnimatedNumber({ value, inView, delay }: { value: number; inView: boolean; delay: number }) {
    const numRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!inView) return;

        let startTime: number;
        const duration = 2000; // 2 seconds

        const updateNumber = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            // Wait for delay before starting counting
            if (progress < delay * 1000) {
                requestAnimationFrame(updateNumber);
                return;
            }

            const activeProgress = progress - (delay * 1000);
            const percentage = Math.min(activeProgress / duration, 1);

            // Easing function (easeOutExpo)
            const easeProgress = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

            const currentVal = Math.floor(easeProgress * value);

            if (numRef.current) {
                numRef.current.textContent = currentVal.toString();
            }

            if (percentage < 1) {
                requestAnimationFrame(updateNumber);
            }
        };

        requestAnimationFrame(updateNumber);
    }, [inView, value, delay]);

    return <span ref={numRef} className="text-5xl sm:text-6xl lg:text-8xl font-light tracking-tighter">0</span>;
}
