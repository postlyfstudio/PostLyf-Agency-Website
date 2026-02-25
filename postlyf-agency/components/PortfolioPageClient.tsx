"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import PortfolioHero from "../Page/PortfolioHero";
import PortfolioShortForm from "../Page/PortfolioShortForm";
import PortfolioLongForm from "../Page/PortfolioLongForm";
import PortfolioBTS from "../Page/PortfolioBTS";
import Footer from "./Footer";
import CustomCursor from "../Page/CustomCursor";
import SmoothScroll from "./SmoothScroll";
import { useEffect } from "react";

export default function PortfolioPageClient() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <SmoothScroll>
            <main className="bg-[#050505] min-h-screen text-white">
                <CustomCursor />
                {/* Progress Bar */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[60]"
                    style={{ scaleX }}
                />

                {/* Hero Section */}
                <PortfolioHero />

                {/* Short Form Videos Section */}
                <PortfolioShortForm />

                {/* Long Form Videos Section */}
                <PortfolioLongForm />

                {/* BTS / Shooting Section */}
                <PortfolioBTS />

                <Footer />
            </main>
        </SmoothScroll>
    );
}
