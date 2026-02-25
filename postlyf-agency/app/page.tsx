"use client";

import Preloader from "../components/Preloader";
import Hero from "../components/Hero";
import OurWork from "../components/OurWork";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import About from "../components/About";
import PrimaryCTA from "@/components/PrimaryCTA";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import { useScroll } from "framer-motion";
import { useRef } from "react";

export default function Home() {

  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  })

  return (
    <main ref={container} className="relative">
      {/* <Preloader /> */}
      <Hero scrollYProgress={scrollYProgress} />
      <OurWork scrollYProgress={scrollYProgress} />
      {/* <CreativeProcess /> */}
      <Stats />
      <Services />
      <Testimonials />
      <About />
      <PrimaryCTA />
      <Contact />
      <Blog />
      <Footer />
    </main>
  );
} 