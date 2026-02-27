"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import PortfolioHero from "../../Page/PortfolioHero";
import PortfolioIntro from "../../Page/PortfolioIntro";
import PortfolioFeatured from "../../Page/PortfolioFeatured";
import PortfolioFilterable from "../../Page/PortfolioFilterable";
import PortfolioShortForm from "../../Page/PortfolioShortForm";
import PortfolioProcess from "../../Page/PortfolioProcess";
import PortfolioMetrics from "../../Page/PortfolioMetrics";
import PortfolioCTA from "../../Page/PortfolioCTA";
import PortfolioContact from "../../Page/PortfolioContact";
import Footer from "../../components/Footer";
import CustomCursor from "../../Page/CustomCursor";
import SmoothScroll from "../../components/SmoothScroll";
import PrimaryCTA from "@/components/PrimaryCTA";
import Contact from "@/components/Contact";
import { useEffect } from "react";

export default function PortfolioPage() {
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

                <PortfolioHero />
                <PortfolioIntro />
                {/* <PortfolioFeatured /> */}
                <PortfolioShortForm />
                <PortfolioFilterable />
                <PortfolioProcess />
                <PortfolioMetrics />
                <PrimaryCTA />
                <Contact />
                {/* <PortfolioCTA />
                <PortfolioContact /> */}
                <Footer />
            </main>
        </SmoothScroll>
    );
}