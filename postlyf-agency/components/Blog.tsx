"use client";

import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import React, { useState, useRef } from "react";

const BlogLiquidButton = () => {
    const btnRef = useRef<HTMLAnchorElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <Link
            href="/portfolio"
            ref={btnRef}
            aria-label="Explore all journal entries"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // YOUR EXACT STYLING & ACCESSIBILITY CLASSES
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-black hover:text-white rounded-full border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#050505]"
        >
            <span className="relative z-10 font-bold text-sm tracking-widest uppercase">
                Explore Journal
            </span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />

            {/* THE LIQUID FILL EFFECT */}
            <motion.div
                style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
                animate={{ width: isHovered ? "200%" : "0%", height: isHovered ? "700%" : "0%" }}
                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                className="absolute pointer-events-none rounded-full bg-[#1a1a1a] z-0"
            />
        </Link>
    );
};

const BLOG_POSTS = [
    {
        id: "video-production-company-in-pune-2026",
        category: "Video Production",
        title: "How a Video Production Company in Pune Drives Real Business Growth",
        excerpt:
            "Discover how strategic video production, cinematic storytelling, and performance-driven editing help brands increase engagement, authority, and conversions.",
        date: "Mar 02, 2026",
        isoDate: "2026-03-02",
        readTime: "7 min read",
        color: "#3b82f6",
        featured: true,
    },
    {
        id: "how-to-grow-on-youtube-2026",
        category: "YouTube Strategy",
        title: "How to Grow on YouTube in 2026: Editing, Retention & Algorithm Strategy",
        excerpt:
            "A practical guide to YouTube growth using professional video editing, audience retention tactics, and data-driven content strategy.",
        date: "Feb 18, 2026",
        isoDate: "2026-02-18",
        readTime: "6 min read",
        color: "#10b981",
        featured: false,
    },
    {
        id: "high-converting-website-design-tips",
        category: "Web Development",
        title: "High-Converting Website Design Tips for Modern Brands",
        excerpt:
            "Learn how performance-focused web development and conversion-driven design turn website traffic into measurable business results.",
        date: "Feb 05, 2026",
        isoDate: "2026-02-05",
        readTime: "5 min read",
        color: "#a855f7",
        featured: false,
    },
    {
        id: "short-form-video-marketing-strategy",
        category: "Short Form Video",
        title: "Short Form Video Marketing Strategy That Increases Engagement & Reach",
        excerpt:
            "Explore how short form video editing and social media strategy boost retention, audience growth, and brand visibility across platforms.",
        date: "Jan 20, 2026",
        isoDate: "2026-01-20",
        readTime: "6 min read",
        color: "#f97316",
        featured: false,
    }
];

// --- Animation Variants ---
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }
};

const TiltCard = ({ children, color }: { children: React.ReactNode, color: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;
        x.set(mouseXPos / width - 0.5);
        y.set(mouseYPos / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative h-full w-full"
        >
            {children}
            {/* Dynamic Spotlight Effect */}
            <motion.div
                style={{
                    background: `radial-gradient(500px circle at var(--x) var(--y), ${color}10, transparent 40%)`,
                    // @ts-ignore - custom properties for CSS
                    "--x": useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]),
                    // @ts-ignore - custom properties for CSS
                    "--y": useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]),
                }}
                className="absolute inset-0 z-20 pointer-events-none rounded-[2.5rem]"
            />
        </motion.div>
    );
};

export default function Blog() {
    const featuredPost = BLOG_POSTS.find(post => post.featured)!;
    const recentPosts = BLOG_POSTS.filter(post => !post.featured);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section
            id="insights"
            aria-labelledby="insights-heading"
            className="relative z-10 bg-[#111111] py-24 md:py-32 overflow-hidden border-t border-white/5"
        >
            {/* === BACKGROUND ELEMENTS === */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {/* <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" /> */}
            </div>

            {/* Grid Pattern */}
            {/* <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" /> */}

            <div className="container mx-auto px-6 md:px-12 max-w-[1400px] relative z-10">
                {/* === SECTION HEADER === */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 md:mb-24">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
                        >
                            <Sparkles className="w-3 h-3 text-blue-400" />
                            <span className="text-xs uppercase tracking-[0.2em] text-gray-300 font-semibold">
                                Postlyf Intelligence
                            </span>
                        </motion.div>

                        <motion.h2
                            id="insights-heading"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-medium tracking-tighter text-white leading-[1.1] md:leading-[1.05]"
                        >
                            Future-forward <br />
                            <span className="text-gray-400 italic font-light">perspectives.</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <BlogLiquidButton />
                    </motion.div>
                </header>

                {/* === BLOG GRID === */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                    {/* LEFT: Featured Post */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="lg:col-span-7 h-full"
                    >
                        <TiltCard color={featuredPost.color}>
                            <article className="h-full">
                                <Link
                                    href="/#hero"
                                    aria-label={`Read featured post: ${featuredPost.title}`}
                                    className="group block h-full focus:outline-none rounded-[2.5rem] focus:ring-2 focus:ring-blue-500"
                                >
                                    <div className="relative h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] rounded-[1.5rem] md:rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col justify-end p-6 md:p-14 transition-all duration-500 group-hover:border-white/20 group-hover:bg-[#111]">

                                        <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                                            <header className="flex flex-wrap items-center gap-4 mb-6">
                                                <span className="px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-bold text-white bg-white/10 rounded-full backdrop-blur-md">
                                                    Featured
                                                </span>
                                                <time dateTime={featuredPost.isoDate} className="flex items-center gap-2 text-sm text-gray-400 tracking-wide">
                                                    <Clock className="w-4 h-4" /> {featuredPost.readTime}
                                                </time>
                                            </header>

                                            <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-tight mb-6 transition-transform duration-300 group-hover:-translate-y-1">
                                                {featuredPost.title}
                                            </h3>

                                            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
                                                {featuredPost.excerpt}
                                            </p>

                                            <footer className="flex items-center gap-4 text-sm font-bold text-blue-400 tracking-[0.1em] uppercase">
                                                <span>Read Full Case</span>
                                                <div className="w-10 h-px bg-blue-400/50 group-hover:w-16 transition-all duration-300" />
                                                <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                            </footer>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        </TiltCard>
                    </motion.div>

                    {/* RIGHT: Recent Posts List */}
                    <ul className="lg:col-span-5 flex flex-col gap-5">
                        {recentPosts.map((post, idx) => (
                            <motion.li
                                key={post.id}
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + idx * 0.1 }}
                                onMouseEnter={() => setHoveredId(post.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className="group relative"
                            >
                                <article>
                                    <Link
                                        href="/#hero"
                                        onClick={(e) => {
                                            if (window.location.pathname === "/") {
                                                e.preventDefault();
                                                const el = document.getElementById("hero");
                                                el?.scrollIntoView({ behavior: "smooth" });
                                            }
                                        }}
                                        aria-label={`Read post: ${post.title}`}
                                        className="block focus:outline-none rounded-[1.5rem] focus:ring-2 focus:ring-blue-500"
                                    >
                                        <div className={`p-6 md:p-8 rounded-[1.5rem] border transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[200px] ${hoveredId === post.id
                                            ? "bg-white/[0.04] border-white/20 translate-x-2"
                                            : "bg-[#0a0a0a] border-white/5 hover:border-white/10"
                                            }`}>

                                            <div className="relative z-10">
                                                <header className="flex items-center gap-3 mb-4">
                                                    <div
                                                        className="w-2 h-2 rounded-full"
                                                        style={{ backgroundColor: post.color, boxShadow: `0 0 10px ${post.color}` }}
                                                    />
                                                    <span className="text-xs uppercase tracking-[0.15em] font-semibold text-gray-400">
                                                        {post.category}
                                                    </span>
                                                </header>

                                                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-gray-100 leading-snug mb-4 group-hover:text-white transition-colors duration-300">
                                                    {post.title}
                                                </h3>
                                            </div>

                                            <footer className="flex items-center justify-between mt-auto pt-5 border-t border-white/5 relative z-10">
                                                <time dateTime={post.isoDate} className="text-xs font-mono text-gray-400 tracking-wider">
                                                    {post.date}
                                                </time>
                                                <div className="flex items-center gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                    <span className="text-xs font-bold tracking-wider uppercase text-white">Read</span>
                                                    <ArrowUpRight className="w-4 h-4 text-white" />
                                                </div>
                                            </footer>

                                            <div
                                                className="absolute -top-6 -right-6 w-[100px] h-[100px] rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                                                style={{ backgroundColor: post.color }}
                                            />
                                        </div>
                                    </Link>
                                </article>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" /> */}
        </section>
    );
}