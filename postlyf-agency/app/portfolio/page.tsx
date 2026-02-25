"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import PortfolioHero from "../../Page/PortfolioHero";
import PortfolioIntro from "../../Page/PortfolioIntro";
import PortfolioFeatured from "../../Page/PortfolioFeatured";
import PortfolioShortForm from "../../Page/PortfolioShortForm";
import PortfolioFilterable from "../../Page/PortfolioFilterable";
import PortfolioProcess from "../../Page/PortfolioProcess";
import PortfolioMetrics from "../../Page/PortfolioMetrics";
import PortfolioCTA from "../../Page/PortfolioCTA";
import PortfolioContact from "../../Page/PortfolioContact";
import Footer from "../../components/Footer";
import CustomCursor from "../../Page/CustomCursor";
import SmoothScroll from "../../components/SmoothScroll";

export default function PortfolioPage() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <SmoothScroll>
            {/* 
              By enclosing everything in <main>, and having exactly one <h1> in PortfolioHero, 
              and hierarchical <h2> and <h3> tags in the subsequent sections, we ensure good SEO structure. 
            */}
            <main className="bg-[#050505] min-h-screen text-white selection:bg-white/20 selection:text-white font-sans antialiased">
                <CustomCursor />

                {/* Progress Bar */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[60]"
                    style={{ scaleX }}
                />

                {/* 1. Hero Section */}
                <PortfolioHero />

                {/* 2. SEO-friendly authority introduction */}
                <PortfolioIntro />

                {/* 3. Featured Projects Case-Study Layout */}
                <PortfolioFeatured />

                {/* 4. Short Form Videos Auto-Scroll Carousel */}
                <PortfolioShortForm />

                {/* 5. Filterable Project Gallery */}
                <PortfolioFilterable />

                {/* 6. Production Process */}
                <PortfolioProcess />

                {/* 7. Results & Metrics */}
                <PortfolioMetrics />

                {/* 8. Call To Action */}
                <PortfolioCTA />

                {/* 9. Premium Contact Form */}
                <PortfolioContact />

                {/* Global Footer */}
                <Footer />
            </main>
        </SmoothScroll>
    );
}
