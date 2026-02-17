"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const navItems = [
  { name: "Home", href: "/", hash: "hero" },
  { name: "About", href: "/#about", hash: "about" },
  { name: "Services", href: "/#services", hash: "services" },
  { name: "Portfolio", href: "/portfolio", hash: null },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // States for scroll behavior
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Hook into scroll events to hide/show
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // 3. Hide header ONLY when scrolling DOWN and past the Hero/Work section (approx 800px)
    if (latest > 800 && latest > previous) {
      setHidden(true);
    } else {
      // Show immediately and smoothly when scrolling UP
      setHidden(false);
    }
  });

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    hash: string | null,
    href: string
  ) => {
    if (!hash) return;
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (hash === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 py-3.5 backdrop-blur-md bg-[#050505]/70 border-b border-white/5"
    >
      {/* 1. Wrapper to bring the Logo and CTA closer to the center links */}
      <div className="flex items-center justify-between w-full max-w-6xl">
        
        {/* Logo */}
        <Link
          href="/#hero"
          onClick={(e) => handleScroll(e, "hero", "/#hero")}
          className="relative w-32 h-12 flex items-center shrink-0"
        >
          <Image
            src="/logo.png"
            alt="Postlyf Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = pathname === "/portfolio" && item.name === "Portfolio";

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.hash, item.href)}
                // 2. Changed font-medium to font-normal (Regular)
                className={`relative group text-sm font-normal tracking-wide transition-colors duration-300 ${
                  isActive ? "text-[#0052cc]" : "text-white"
                }`}
              >
                {item.name}
                
                {/* 4. Left-to-Right Animated Underline */}
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white origin-right transform scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <Link
          href="/#contact"
          onClick={(e) => handleScroll(e, "contact", "/#contact")}
          className="hidden md:inline-flex group relative items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 bg-transparent border border-[#ffff]/50 rounded-full hover:border-[#0052cc] hover:bg-[#0052cc]/10 overflow-hidden shrink-0"
        >
          <span className="relative z-10 tracking-wide">Get Quote</span>
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        </Link>

      </div>
    </motion.header>
  );
}