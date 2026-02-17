import Preloader from "../components/Preloader";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main className="relative bg-[#050505] min-h-screen">
      {/* <Preloader /> */}
      <Hero />
      
      {/* We will build the "Our Work" section next to slide up over the Hero */}
      <section id="our-work" className="relative z-20 h-screen bg-[#0A0A0A] flex items-center justify-center border-t border-white/5">
        <h2 className="text-6xl font-bold italic opacity-20">Our Work Section Coming Soon...</h2>
      </section>
    </main>
  );
}