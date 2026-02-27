"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/#hero", hash: "hero" },
  { name: "About", href: "/#about", hash: "about" },
  { name: "Services", href: "/#services", hash: "services" },
  { name: "Portfolio", href: "/portfolio", hash: null },
];

const smoothScrollTo = (targetY: number, duration = 1200) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime: number | null = null;

  const easeInOutCubic = (t: number) =>
    t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animation = (currentTime: number) => {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // States for scroll behavior
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

const handleScroll = async (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  hash: string | null,
  href: string
) => {
  if (!hash) return;

  e.preventDefault();

  if (pathname !== "/") {
    await router.push("/");
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  } else {
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 md:px-8 py-3.5 backdrop-blur-md bg-[#000000]/70 border-b border-white/5"
      >
        {/* 1. Wrapper to bring the Logo and CTA closer to the center links */}
        <div className="flex items-center justify-between w-full max-w-6xl">

          {/* Logo */}
          <Link
            href="/#hero"
            onClick={(e) => handleScroll(e, "hero", "/#hero")}
            className="relative w-28 md:w-32 h-10 md:h-12 flex items-center shrink-0"
          >
            <Image
              src="/logo.svg"
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
                  className={`relative group text-sm font-normal tracking-wide transition-colors duration-300 ${isActive ? "text-[#0052cc]" : "text-white"
                    }`}
                >
                  {item.name}

                  {/* 4. Left-to-Right Animated Underline */}
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white origin-right transform scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
                </Link>
              );
            })}
          </nav>

          {/* CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/#contact"
              onClick={(e) => handleScroll(e, "contact", "/#contact")}
              className="hidden sm:inline-flex group relative items-center justify-center px-6 py-2.5 text-sm font-normal text-white transition-all duration-300 bg-transparent border border-[#ffff]/50 rounded-full hover:border-[#0052cc] hover:bg-[#0052cc]/10 overflow-hidden shrink-0"
            >
              <span className="relative z-10 tracking-wide">Get Quote</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[45] bg-[#050505] pt-24 px-8 md:hidden"
          >
            <nav className="flex flex-col gap-8">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      handleScroll(e, item.hash, item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-3xl font-medium text-white/90 hover:text-[#0052cc] transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <Link
                  href="/#contact"
                  onClick={(e) => {
                    handleScroll(e, "contact", "/#contact");
                    setIsMobileMenuOpen(false);
                  }}
                  className="inline-flex items-center justify-center w-full py-4 text-lg font-medium text-black bg-white rounded-xl shadow-lg shadow-white/10"
                > 
                  Get Quote
                </Link>
              </motion.div>
            </nav>

            <div className="absolute bottom-10 left-8 right-8">
              <p className="text-white/40 text-sm mb-4 uppercase tracking-[0.2em]">Contact Us</p>
              <p className="text-white/80 text-xl font-medium">hello@postlyf.com</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}