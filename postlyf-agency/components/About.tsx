"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";

const SimplexNoise = function () {
    const F3 = 1 / 3, G3 = 1 / 6;
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = Math.floor(Math.random() * 256);
    const perm = new Uint8Array(512), permMod12 = new Uint8Array(512);

    for (let j = 0; j < 512; j++) {
        perm[j] = p[j & 255];
        permMod12[j] = perm[j] % 12;
    }

    function grad(hash: number, x: number, y: number, z: number) {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    return {
        noise3D: function (xin: number, yin: number, zin: number) {
            let n0, n1, n2, n3;

            const s = (xin + yin + zin) * F3;
            const i = Math.floor(xin + s);
            const j = Math.floor(yin + s);
            const k = Math.floor(zin + s);

            const t = (i + j + k) * G3;
            const X0 = i - t;
            const Y0 = j - t;
            const Z0 = k - t;

            const x0 = xin - X0;
            const y0 = yin - Y0;
            const z0 = zin - Z0;

            let i1, j1, k1, i2, j2, k2;

            if (x0 >= y0) {
                if (y0 >= z0) {
                    i1 = 1; j1 = 0; k1 = 0;
                    i2 = 1; j2 = 1; k2 = 0;
                } else if (x0 >= z0) {
                    i1 = 1; j1 = 0; k1 = 0;
                    i2 = 1; j2 = 0; k2 = 1;
                } else {
                    i1 = 0; j1 = 0; k1 = 1;
                    i2 = 1; j2 = 0; k2 = 1;
                }
            } else if (y0 < z0) {
                i1 = 0; j1 = 0; k1 = 1;
                i2 = 0; j2 = 1; k2 = 1;
            } else if (x0 < z0) {
                i1 = 0; j1 = 1; k1 = 0;
                i2 = 0; j2 = 1; k2 = 1;
            } else {
                i1 = 0; j1 = 1; k1 = 0;
                i2 = 1; j2 = 1; k2 = 0;
            }

            const x1 = x0 - i1 + G3;
            const y1 = y0 - j1 + G3;
            const z1 = z0 - k1 + G3;

            const x2 = x0 - i2 + 2 * G3;
            const y2 = y0 - j2 + 2 * G3;
            const z2 = z0 - k2 + 2 * G3;

            const x3 = x0 - 1 + 3 * G3;
            const y3 = y0 - 1 + 3 * G3;
            const z3 = z0 - 1 + 3 * G3;

            const ii = i & 255;
            const jj = j & 255;
            const kk = k & 255;

            let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
            if (t0 < 0) n0 = 0;
            else {
                t0 *= t0;
                n0 = t0 * t0 * grad(permMod12[ii + perm[jj + perm[kk]]], x0, y0, z0);
            }

            let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
            if (t1 < 0) n1 = 0;
            else {
                t1 *= t1;
                n1 = t1 * t1 * grad(permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]], x1, y1, z1);
            }

            let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
            if (t2 < 0) n2 = 0;
            else {
                t2 *= t2;
                n2 = t2 * t2 * grad(permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]], x2, y2, z2);
            }

            let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
            if (t3 < 0) n3 = 0;
            else {
                t3 *= t3;
                n3 = t3 * t3 * grad(permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]], x3, y3, z3);
            }

            return 32 * (n0 + n1 + n2 + n3);
        }
    };
};

const Word = ({ children, progress, range, isHighlighted }: any) => {
    const opacity = useTransform(progress, range, [0.2, 1]);
    const y = useTransform(progress, range, [12, 0]);
    // Base color for words is #666666, highlighted is white with 80% opacity
    const textColor = isHighlighted ? "rgba(255, 255, 255, 0.8)" : "rgb(102, 102, 102)";

    return (
        <motion.span
            className="relative inline-block mr-[1.5vw] md:mr-[0.8vw] mt-[1vw] md:mt-[0.5vw]"
            style={{
                opacity,
                y,
                color: textColor,
                filter: isHighlighted ? "drop-shadow(0 0 8px rgba(255,255,255,0.1))" : "none"
            }}
        >
            {children}
        </motion.span>
    );
};

const AboutLiquidButton = ({ href, children, className, liquidColor }: { href: string, children: React.ReactNode, className: string, liquidColor: string }) => {
    const btnRef = useRef<HTMLAnchorElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 150, mass: 0.8 };
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
            href={href}
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // Added group, relative, and overflow-hidden to contain the liquid inside your rounded-[10px] borders
            className={`group relative inline-flex items-center justify-center overflow-hidden transition-colors duration-300  ${className}`}
        >
            <span className="relative z-10 transition-colors duration-300">
                {children}
            </span>

            {/* THE LIQUID FILL EFFECT */}
            <motion.div
                style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
                animate={{ width: isHovered ? "200%" : "0%", height: isHovered ? "700%" : "0%" }}
                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                className={`absolute pointer-events-none rounded-full z-0 ${liquidColor}`}
            />
        </Link>
    );
};

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const auraRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "center center"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 35,
        mass: 1.2,
        restDelta: 0.001
    });

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        const aura = auraRef.current;
        if (!container || !canvas || !aura) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const simplex = SimplexNoise();

        let width = 0;
        let height = 0;
        let time = 0;
        let animationFrameId: number;

        const mouse = { x: -1000, y: -1000 };
        const targetMouse = { x: -1000, y: -1000 };
        const velocity = { x: 0, y: 0 };
        const trail: any[] = [];
        const ripples: any[] = [];

        const config = {
            lineDensity: 12,
            pointResolution: 11,
            noiseScaleX: 0.00145,
            noiseScaleY: 0.0021,
            noiseAmplitude: 74,
            verticalWave: 14,
            driftSpeed: 0.00165,
            trailLength: 14,
            repelRadius: 260,
            repelForce: 58,
            swirlForce: 9,
            rippleForce: 22,
            rippleSpeed: 3.4,
            rippleLife: 180
        };

        function resize() {
            if (!container || !canvas || !ctx) return;
            // Calculate sizes strictly relative to the container, not the whole window
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        }

        function updateMouse() {
            if (!aura) return;
            mouse.x += (targetMouse.x - mouse.x) * 0.1;
            mouse.y += (targetMouse.y - mouse.y) * 0.1;

            velocity.x += ((targetMouse.x - mouse.x) - velocity.x) * 0.1;
            velocity.y += ((targetMouse.y - mouse.y) - velocity.y) * 0.1;

            const speed = Math.hypot(velocity.x, velocity.y);

            trail.unshift({
                x: mouse.x,
                y: mouse.y,
                energy: Math.min(1.2, 0.72 + speed * 0.02)
            });

            if (trail.length > config.trailLength) trail.pop();

            const auraScale = 0.96 + Math.min(0.12, speed * 0.006);

            aura.style.opacity = mouse.x < 0 ? "0" : "1";
            // 150px offset perfectly centers the 300x300px aura
            aura.style.transform = `translate(${mouse.x - 150}px, ${mouse.y - 150}px) scale(${auraScale.toFixed(3)})`;
        }

        function pushRipple(x: number, y: number) {
            ripples.unshift({ x, y, radius: 0, life: config.rippleLife });
            if (ripples.length > 7) ripples.pop();
        }

        function updateRipples() {
            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
                r.radius += config.rippleSpeed;
                r.life -= 1;
                if (r.life <= 0) ripples.splice(i, 1);
            }
        }

        function applyTrailWarp(px: number, py: number) {
            for (let i = 0; i < trail.length; i++) {
                const t = trail[i];
                const dx = px - t.x;
                const dy = py - t.y;
                const distSq = dx * dx + dy * dy;
                const radius = config.repelRadius * (1 - i / (trail.length * 1.3));
                if (distSq >= radius * radius) continue;

                const dist = Math.sqrt(distSq) + 0.0001;
                const nx = dx / dist;
                const ny = dy / dist;
                const falloff = Math.exp(-distSq / (radius * radius * 0.4));
                const tailFade = 1 - i / (trail.length + 2);
                const influence = falloff * t.energy * tailFade;

                px += nx * influence * config.repelForce;
                py += ny * influence * config.repelForce * 0.35;
                px += -ny * influence * config.swirlForce;
                py += nx * influence * config.swirlForce * 0.45;
                px += velocity.x * influence * 0.05;
                py += velocity.y * influence * 0.05;
            }

            return { x: px, y: py };
        }

        function render() {
            if (!ctx || !canvas) return;
            time += config.driftSpeed;
            ctx.clearRect(0, 0, width, height);

            updateMouse();
            updateRipples();

            for (let x = -config.noiseAmplitude; x < width + config.noiseAmplitude; x += config.lineDensity) {
                ctx.beginPath();
                let first = true;

                for (let y = -24; y < height + 24; y += config.pointResolution) {
                    const drift = simplex.noise3D(x * config.noiseScaleX, (y + time * 190) * config.noiseScaleY, time * 0.65);
                    const ridge = simplex.noise3D((x + drift * 110) * config.noiseScaleX, y * config.noiseScaleY, time);
                    const macro = simplex.noise3D(x * 0.00065, y * 0.0012, time * 0.35);

                    let px = x + ridge * config.noiseAmplitude + drift * config.noiseAmplitude * 0.2 + macro * 14;
                    let py = y + drift * config.verticalWave + macro * 5;

                    const warped = applyTrailWarp(px, py);

                    if (first) {
                        ctx.moveTo(warped.x, warped.y);
                        first = false;
                    } else {
                        ctx.lineTo(warped.x, warped.y);
                    }

                    const intensity = (ridge + 1) * 0.5;
                    ctx.lineWidth = 0.34 + intensity * 1.35;
                    ctx.strokeStyle = `rgba(255,255,255,${(0.02 + intensity * 0.1).toFixed(4)})`;
                }

                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(render);
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!container) return;
            // FIX: Calculate mouse position strictly relative to the container!
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const relativeY = e.clientY - rect.top;

            const prevX = targetMouse.x;
            const prevY = targetMouse.y;

            targetMouse.x = relativeX;
            targetMouse.y = relativeY;

            if (prevX > -999) {
                velocity.x = (targetMouse.x - prevX) * 0.28;
                velocity.y = (targetMouse.y - prevY) * 0.28;
            }
        };

        const handleMouseLeave = () => {
            targetMouse.x = -1000;
            targetMouse.y = -1000;
            trail.length = 0;
            if (aura) aura.style.opacity = "0";
        };

        const handleMouseDown = (e: MouseEvent) => {
            if (!container) return;
            // FIX: Ensure ripples happen exactly where you click, relative to the section
            const rect = container.getBoundingClientRect();
            pushRipple(e.clientX - rect.left, e.clientY - rect.top);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("resize", resize);

        resize();
        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("resize", resize);
        };
    }, []);

    const p1 = "We are a video production agency in Pune helping creators and brands grow through cinematic content and digital strategy.";
    const p2 = "From short form video editing and YouTube content to corporate video production and branded campaigns, we turn raw footage into engaging content that builds trust and drives measurable results.";

    const words1 = p1.split(" ");
    const words2 = p2.split(" ");

    // SEO-focused premium highlight keywords
    const mainWords1 = [
    "video",
    "production",
    "agency",
    "Pune",
    "creators",
    "brands",
    "cinematic",
    "digital"
    ];

    const mainWords2 = [
    "short",
    "video",
    "editing",
    "YouTube",
    "corporate",
    "production",
    "engaging",
    "measurable",
    "results"
    ];

    return (
        <section
            id="about"
            ref={containerRef}  
            className="relative flex flex-col justify-center min-h-[100vh] overflow-hidden border-t border-white/5 bg-[#191919] py-20 px-6 sm:px-[8vw]"
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

            <div
                ref={auraRef}
                className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[2] opacity-0 blur-[24px] mix-blend-screen hidden md:block"
                style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(205,224,255,0.06) 34%, rgba(0,0,0,0) 70%)",
                    transform: "translate(-1000px, -1000px) scale(0.96)"
                }}
            />

            <div className="relative z-[3] max-w-[1600px] mx-auto flex flex-col items-start pointer-events-none">

                {/* Text is perfectly static and wrapped without any motion.div movement tracking */}
                <div className="max-w-[900px] pointer-events-auto">
                    <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-medium text-[#666666] leading-[1.1] tracking-[-0.03em] mb-[30px] md:mb-[40px]">
                        {words1.map((word, i) => {
                            const start = (i / words1.length) * 0.4;
                            const end = start + (0.4 / words1.length);
                            const cleanWord = word.replace(/[.,]/g, "");
                            const isHighlighted = mainWords1.includes(cleanWord);
                            return (
                                <Word key={i} progress={smoothProgress} range={[start, end]} isHighlighted={isHighlighted}>
                                    {word}
                                </Word>
                            );
                        })}
                    </h2>

                    <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-medium text-[#666666] leading-[1.1] tracking-[-0.03em] mb-[40px] md:mb-[50px]">
                        {words2.map((word, i) => {
                            const start = 0.4 + (i / words2.length) * 0.6;
                            const end = start + (0.6 / words2.length);
                            const cleanWord = word.replace(/[.,]/g, "");
                            const isHighlighted = mainWords2.includes(cleanWord);
                            return (
                                <Word key={i} progress={smoothProgress} range={[start, end]} isHighlighted={isHighlighted}>
                                    {word}
                                </Word>
                            );
                        })}
                    </h2>
                </div>

                <div className="flex flex-wrap gap-4 pointer-events-auto">

                    {/* Primary "Get in touch" Button */}
                    <AboutLiquidButton
                        href="/#contact"
                        className="px-6 md:px-7 py-3 md:py-3.5 bg-white text-black rounded-[10px] text-sm md:text-base font-medium hover:text-white border border-white/10 hover:scale-105 transition-all duration-300"
                        liquidColor="bg-[#1a1a1a]"
                    >
                        Get in touch
                    </AboutLiquidButton>

                    {/* Secondary "More about us" Button */}
                    <AboutLiquidButton
                        href="/#work"
                        className="px-6 md:px-7 py-3 md:py-3.5 bg-[#333] text-white rounded-[10px] text-sm md:text-base font-medium border border-white hover:scale-105 transition-all duration-500"
                        liquidColor="bg-[#1a1a1a]"
                    >
                        More about us
                    </AboutLiquidButton>

                </div>
            </div>
        </section>
    );
}