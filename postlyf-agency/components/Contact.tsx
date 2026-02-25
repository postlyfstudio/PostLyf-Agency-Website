"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";

const SERVICES = [
  "Video Editing",
  "Video Shooting",
  "Web Development",
];

const SubmitLiquidButton = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const fillMouseX = useMotionValue(0);
  const fillMouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const smoothX = useSpring(fillMouseX, springConfig);
  const smoothY = useSpring(fillMouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    fillMouseX.set(e.clientX - rect.left);
    fillMouseY.set(e.clientY - rect.top);
  };

  return (
    <button
      type="submit"
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // YOUR EXACT STYLING
      className="group relative z-10 inline-flex items-center gap-2 px-4 py-3 bg-white text-black hover:text-white border border-white/10 hover:scale-105  transition-all duration-500 rounded-full overflow-hidden duration-500]"
    >
      <span className="relative z-10 font-bold text-sm tracking-widest uppercase">Send Message</span>

      {/* Exact Icon Container */}
      <div className="relative z-10 w-10 h-10 rounded-2xl bg-black flex items-center justify-center group-hover:bg-white transition-all duration-500">
        <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black transition-all duration-500" />
      </div>

      {/* THE LIQUID FILL EFFECT */}
      <motion.div
        style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
        animate={{ width: isHovered ? "200%" : "0%", height: isHovered ? "700%" : "0%" }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute pointer-events-none rounded-full bg-[#1a1a1a] z-0"
      />
    </button>
  );
};

export default function Contact() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Magnetic Button Logic for Submit
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // CONTINUOUS PARTICLES logic from Hero.tsx
  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      moveX: (Math.random() - 0.5) * 350,
      moveY: (Math.random() - 0.5) * 350,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 1.5 + 1.5,
      blinkDuration: Math.random() * 3 + 2,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <section id="contact" className="relative z-10 bg-[#050505] min-h-screen py-24 md:py-32 overflow-hidden border-t border-white/5">

      {/* 1. Cinematic Grain Overlay (consistency with PrimaryCTA) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-20" />

      {/* 2. Hero-style Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white opacity-[0.03] blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* CONTINUOUS PARTICLES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-white rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.initialX}%`,
              top: `${p.initialY}%`,
            }}
            animate={{
              x: [0, p.moveX, 0],
              y: [0, p.moveY, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-[1400px] relative z-10">

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* === LEFT COLUMN: Info & Direct Contact === */}
          <div className="w-full lg:w-5/12 flex flex-col gap-12">

            <div className="max-w-md">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold">Inquiry Open</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl lg:text-[70px] font-medium tracking-tight text-white leading-[1] mb-8"
              >
                Let&apos;s build <br />
                something <span className="text-[#666666] italic">grand.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[#888888] text-base md:text-lg leading-relaxed font-light"
              >
                Have a vision? We have the craft. From high-end cinematic edits to scalable digital platforms, we bring ideas to life with precision.
              </motion.p>
            </div>

            {/* Direct Contact Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 md:gap-5"
            >
              {/* Email Pill */}
              <a href="mailto:hello@postlyf.com" className="group flex items-center justify-between p-4 md:p-5 md:pr-8 rounded-2xl md:rounded-3xl bg-[#111111]/40 border border-white/5 hover:bg-[#161616]/60 hover:border-white/20 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-4 md:gap-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 text-white">
                    <Mail className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#666666] font-bold">Email Interface</span>
                    <span className="text-white font-medium text-base md:text-lg">hello@postlyf.com</span>
                  </div>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </a>

              {/* WhatsApp Pill */}
              <a href="https://wa.me/YOUR_PHONE_NUMBER" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 md:p-5 md:pr-8 rounded-2xl md:rounded-3xl bg-[#111111]/40 border border-white/5 hover:bg-[#161616]/60 hover:border-[#25D366]/30 transition-all duration-500 overflow-hidden relative backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/0 to-[#25D366]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center gap-4 md:gap-5 relative z-10">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#25D366] transition-all duration-500 text-white">
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#666666] font-bold group-hover:text-[#25D366]/80 transition-colors">Direct Encrypted</span>
                    <span className="text-white font-medium text-base md:text-lg">WhatsApp Support</span>
                  </div>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#25D366] group-hover:border-[#25D366] group-hover:text-black transition-all duration-500 relative z-10">
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </a>
            </motion.div>

          </div>

          {/* === RIGHT COLUMN: Interactive Form === */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="w-full lg:w-7/12"
          >
            <form
              ref={formRef}
              className="bg-[#111111]/30 border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 backdrop-blur-2xl flex flex-col gap-10 md:gap-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none" />

              {/* Service Selection */}
              <div>
                <label className="text-[11px] uppercase tracking-[0.3em] text-[#555555] font-bold mb-6 block">
                  Identify your needs
                </label>
                <div className="flex flex-wrap gap-3">
                  {SERVICES.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => setSelectedService(service === selectedService ? null : service)}
                      className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-500 border ${selectedService === service
                        ? "bg-white text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                        : "bg-white/5 text-[#888888] border-white/5 hover:border-white/20 hover:text-white"
                        }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minimal Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    required
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-white transition-all duration-500 peer placeholder-transparent"
                    placeholder="John Doe"
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-0 transition-all duration-500 pointer-events-none font-medium ${focusedField === 'name' ? '-top-6 text-[#555555] text-[10px] uppercase tracking-[0.2em]' : 'top-4 text-[#444444] text-lg'
                      } peer-valid:-top-6 peer-valid:text-[#555555] peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-[0.2em] px-0`}
                  >
                    Your Name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    required
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-white transition-all duration-500 peer placeholder-transparent"
                    placeholder="john@example.com"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-0 transition-all duration-500 pointer-events-none font-medium ${focusedField === 'email' ? '-top-6 text-[#555555] text-[10px] uppercase tracking-[0.2em]' : 'top-4 text-[#444444] text-lg'
                      } peer-valid:-top-6 peer-valid:text-[#555555] peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-[0.2em] px-0`}
                  >
                    Email Address
                  </label>
                </div>
              </div>

              <div className="relative group">
                <textarea
                  id="message"
                  required
                  rows={4}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-white transition-all duration-500 resize-none peer placeholder-transparent"
                  placeholder="Tell us about your project..."
                />
                <label
                  htmlFor="message"
                  className={`absolute left-0 transition-all duration-500 pointer-events-none font-medium ${focusedField === 'message' ? '-top-6 text-[#555555] text-[10px] uppercase tracking-[0.2em]' : 'top-4 text-[#444444] text-lg'
                    } peer-valid:-top-6 peer-valid:text-[#555555] peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-[0.2em] px-0`}
                >
                  Project Brief
                </label>
              </div>

              {/* Enhanced Magnetic Submit Button */}
              <div className="flex justify-end mt-4">
                <SubmitLiquidButton />
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}