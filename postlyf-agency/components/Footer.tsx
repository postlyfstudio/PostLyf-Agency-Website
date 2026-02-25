"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowUpRight,
    Instagram,
    Linkedin,
    Twitter,
    Youtube,
    ChevronUp,
    Mail,
    ArrowRight
} from "lucide-react";

const FOOTER_LINKS = [
    {
        title: "Menu",
        links: [
            { label: "Home", href: "/" },
            { label: "About Us", href: "/#about" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Our Services", href: "/#services" },
            { label: "Contact", href: "/#contact" },
        ]
    },
    {
        title: "Services",
        links: [
            { label: "Video Production", href: "/#services" },
            { label: "AI Engineering", href: "/#services" },
            { label: "Digital Branding", href: "/#services" },
            { label: "Motion Graphics", href: "/#services" },
            { label: "Web Experiences", href: "/#services" },
        ]
    },
];

const SOCIAL_LINKS = [
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        // Reduced top/bottom padding to tighten overall height
        <footer className="relative bg-[#191919] pt-16 pb-8 overflow-hidden z-10 border-t border-white/5">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 max-w-[1400px] relative z-10">

                {/* === MAIN CONTENT === */}
                {/* Reduced bottom padding and gaps */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-10">

                    {/* Brand Identity (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col items-start">
                        {/* Tighter margin on logo */}
                        <Link href="/" className="relative w-36 h-12 mb-6 block">
                            <Image
                                src="/logo.svg"
                                alt="Postlyf Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>

                        <p className="text-[#a0a0a0] text-base md:text-lg leading-relaxed max-w-sm mb-6">
                            Crafting high-impact digital narratives through cinematic production and intelligent AI engineering.
                        </p>

                        <div className="flex gap-4 mb-8">
                            {SOCIAL_LINKS.map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#888888] hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </Link>
                            ))}
                        </div>

                        <Link
                            href="mailto:hello@postlyf.com"
                            className="group inline-flex items-center gap-3 text-white font-medium text-base md:text-lg transition-colors hover:text-[#888888]"
                        >
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                                <Mail className="w-4 h-4" />
                            </div>
                            hello@postlyf.com
                        </Link>
                    </div>

                    {/* Links Grid (5 cols) */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-8">
                        {FOOTER_LINKS.map((col, idx) => (
                            <div key={idx} className="flex flex-col">
                                <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">{col.title}</h4>
                                {/* Tighter gaps between links */}
                                <ul className="flex flex-col gap-2.5">
                                    {col.links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <Link
                                                href={link.href}
                                                className="group inline-flex items-center text-[#777777] hover:text-white transition-colors duration-300 text-sm md:text-base"
                                            >
                                                <span className="relative">
                                                    {link.label}
                                                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Newsletter (3 cols) */}
                    <div className="lg:col-span-3 flex flex-col">
                        <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">Newsletter</h4>
                        <p className="text-[#777777] text-sm mb-5 leading-relaxed">
                            Stay updated with our latest projects, industry insights, and creative updates.
                        </p>
                        <form className="relative group/form">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-full py-3.5 px-6 pr-14 text-white text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                            />
                            <button
                                type="submit"
                                className="absolute right-1.5 top-1.5 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90 active:scale-95 transition-all group-hover/form:scale-105"
                                aria-label="Subscribe"
                            >
                                <ArrowRight size={18} className="group-hover/form:translate-x-0.5 transition-transform" />
                            </button>
                        </form>
                        <p className="text-[10px] text-[#555555] mt-3 ml-4">
                            * By subscribing, you agree to our Privacy Policy.
                        </p>
                    </div>
                </div>

                {/* === LARGE TYPOGRAPHY SECTION === */}
                {/* Drastically reduced vertical padding to keep the text anchored without dead space */}
                <div className="relative pt-8 pb-10 border-t border-white/5">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full flex flex-col items-center justify-center text-center"
                    >
                        {/* Scaled text slightly down to [12vw] so it fits neatly within the vertical rhythm */}
                        <h2 className="text-[11vw] md:text-[12vw] font-bold leading-none tracking-tighter select-none pointer-events-none mb-[-1vw]">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/50 to-transparent">
                                POSTLYF
                            </span>
                        </h2>
                        <p className="text-[#444444] text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.8em] sm:tracking-[1em] md:tracking-[1.5em] font-medium ml-[0.8em] sm:ml-[1em] md:ml-[1.5em]">
                            Elevating Digital Standards
                        </p>
                    </motion.div>
                </div>

                {/* === BOTTOM BAR === */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-white/5 gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-[#555555] text-xs font-medium tracking-wide">
                        <p>© {currentYear} Postlyf Studio. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-3 text-[#888888] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                        Back to Top
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-all">
                            <ChevronUp size={14} />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    );
}