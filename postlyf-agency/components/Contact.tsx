"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Loader2, CheckCircle2 } from "lucide-react";

// 1. Added Social Marketing
const SERVICES = [
  "Video Production",
  "Video Editing",
  "Web Development",
  "Social Media Marketing"
];

const SubmitLiquidButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
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
      disabled={isSubmitting}
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative z-10 inline-flex items-center gap-2 px-4 py-3 bg-white text-black hover:text-white border border-white/10 hover:scale-105 transition-all duration-500 rounded-full overflow-hidden disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
    >
      <span className="relative z-10 font-bold text-sm tracking-widest uppercase">
        {isSubmitting ? "Sending..." : "Request Proposal"}
      </span>

      <div className="relative z-10 w-10 h-10 rounded-2xl bg-black flex items-center justify-center group-hover:bg-white transition-all duration-500">
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 text-white group-hover:text-black animate-spin" />
        ) : (
          <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black transition-all duration-500" />
        )}
      </div>

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
  const [mounted, setMounted] = useState(false);

  // 2. State is now an Array to hold multiple selections
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    setMounted(true);
  }, []);

  // 3. Toggle Logic: Add if not present, Remove if already present
  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Pulls securely from your .env.local file
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          services_requested: selectedServices.length > 0 ? selectedServices.join(", ") : "None selected",
          subject: `New Inquiry from ${formData.name} - PostLyf Website`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: "", email: "", message: "" });
        setSelectedServices([]); // Clear the selections on success

        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

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

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white opacity-[0.03] blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {mounted && particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-white rounded-full"
            style={{ width: p.size, height: p.size, left: `${p.initialX}%`, top: `${p.initialY}%` }}
            animate={{ x: [0, p.moveX, 0], y: [0, p.moveY, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-[1400px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* LEFT COLUMN */}
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 md:gap-5"
            >
              <a href="mailto:social@postlyf.com?subject=Project%20Inquiry%20-%20PostLyf" className="group flex items-center justify-between p-4 md:p-5 md:pr-8 rounded-2xl md:rounded-3xl bg-[#111111]/40 border border-white/5 hover:bg-[#161616]/60 hover:border-white/20 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-4 md:gap-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 text-white">
                    <Mail className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#666666] font-bold">Email Interface</span>
                    <span className="text-white font-medium text-base md:text-lg">social@postlyf.com</span>
                  </div>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </a>

              <a href="https://wa.me/9226719090" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 md:p-5 md:pr-8 rounded-2xl md:rounded-3xl bg-[#111111]/40 border border-white/5 hover:bg-[#161616]/60 hover:border-[#25D366]/30 transition-all duration-500 overflow-hidden relative backdrop-blur-sm">
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

          {/* RIGHT COLUMN: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="w-full lg:w-7/12"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#111111]/30 border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 backdrop-blur-2xl flex flex-col gap-10 md:gap-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none" />

              <div>
                <label className="text-[11px] uppercase tracking-[0.3em] text-[#555555] font-bold mb-5 block">
                  Services Required
                </label>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {SERVICES.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        // 5. Sleeker, smaller, premium pills
                        className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border ${isSelected
                            ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                            : "bg-white/5 text-white/50 border-white/5 hover:bg-white/10 hover:text-white"
                          }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-white transition-all duration-500 peer placeholder-transparent"
                    placeholder="John Doe"
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-0 transition-all duration-500 pointer-events-none font-medium ${focusedField === 'name' || formData.name ? '-top-6 text-[#555555] text-[10px] uppercase tracking-[0.2em]' : 'top-4 text-[#444444] text-lg'
                      } px-0`}
                  >
                    Your Name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-white transition-all duration-500 peer placeholder-transparent"
                    placeholder="john@example.com"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-0 transition-all duration-500 pointer-events-none font-medium ${focusedField === 'email' || formData.email ? '-top-6 text-[#555555] text-[10px] uppercase tracking-[0.2em]' : 'top-4 text-[#444444] text-lg'
                      } px-0`}
                  >
                    Email Address
                  </label>
                </div>
              </div>

              <div className="relative group">
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-white transition-all duration-500 resize-none peer placeholder-transparent"
                  placeholder="Tell us about your project..."
                />
                <label
                  htmlFor="message"
                  className={`absolute left-0 transition-all duration-500 pointer-events-none font-medium ${focusedField === 'message' || formData.message ? '-top-6 text-[#555555] text-[10px] uppercase tracking-[0.2em]' : 'top-4 text-[#444444] text-lg'
                    } px-0`}
                >
                  Project Brief
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-emerald-400 text-sm font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Message sent successfully.
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm font-medium"
                    >
                      Something went wrong. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="ml-auto">
                  <SubmitLiquidButton isSubmitting={status === 'submitting'} />
                </div>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}