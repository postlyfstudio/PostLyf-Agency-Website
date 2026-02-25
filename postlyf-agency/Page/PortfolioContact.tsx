"use client";

import { motion } from "framer-motion";

export default function PortfolioContact() {
    return (
        <section id="contact" className="py-24 sm:py-32 bg-[#050505] px-6 sm:px-10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left Column - Copy & Contact Info */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mb-12"
                        >
                            <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4 font-medium">Inquiries</h2>
                            <h3 className="text-4xl sm:text-5xl font-light tracking-tight mb-6">
                                Start a <span className="font-medium italic">Project</span>
                            </h3>
                            <p className="text-white/60 font-light leading-relaxed max-w-md text-lg">
                                We are currently accepting new projects for Q3 and Q4. Fill out the form below with your project details, and we will get back to you within 24 hours to schedule a discovery call.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col gap-8"
                        >
                            <div>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-medium">Email Us</h4>
                                <a href="mailto:hello@postlyf.studio" className="text-xl font-light hover:text-white/70 transition-colors">hello@postlyf.studio</a>
                            </div>

                            <div>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-medium">Studio Location</h4>
                                <address className="text-lg font-light not-italic text-white/80">
                                    123 Creative Avenue,<br />
                                    Design District,<br />
                                    New York, NY 10012
                                </address>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Premium Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white/[0.02] border border-white/5 p-8 sm:p-12 rounded-3xl backdrop-blur-md relative"
                    >
                        {/* Internal Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] blur-[80px] rounded-full pointer-events-none" />

                        <form className="flex flex-col gap-8 relative z-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <FormInput label="First Name" type="text" id="fname" placeholder="John" />
                                <FormInput label="Last Name" type="text" id="lname" placeholder="Doe" />
                            </div>

                            <FormInput label="Email Address" type="email" id="email" placeholder="john@company.com" />
                            <FormInput label="Company / Brand" type="text" id="company" placeholder="Acme Corp" />

                            <div className="flex flex-col gap-3 group">
                                <label htmlFor="budget" className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium group-focus-within:text-white transition-colors">
                                    Project Budget
                                </label>
                                <select
                                    id="budget"
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors appearance-none font-light"
                                >
                                    <option value="" disabled selected className="text-black/50">Select Range</option>
                                    <option value="5k" className="text-black bg-white">$5k - $10k</option>
                                    <option value="10k" className="text-black bg-white">$10k - $25k</option>
                                    <option value="25k" className="text-black bg-white">$25k+</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-3 group">
                                <label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium group-focus-within:text-white transition-colors">
                                    Project Details
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    placeholder="Tell us about your goals, timeline, and vision..."
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors resize-none font-light"
                                />
                            </div>

                            <button
                                type="button"
                                className="mt-4 w-full bg-white text-black py-4 rounded-full font-medium uppercase tracking-widest text-xs hover:bg-white/90 transition-colors"
                            >
                                Submit Request
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function FormInput({ label, type, id, placeholder }: { label: string; type: string; id: string; placeholder: string }) {
    return (
        <div className="flex flex-col gap-3 group">
            <label htmlFor={id} className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium group-focus-within:text-white transition-colors">
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors font-light"
            />
        </div>
    );
}
