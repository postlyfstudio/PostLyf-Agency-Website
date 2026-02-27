"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, memo, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react";

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

// 1. Pure Video Editing SEO Metadata
const CATEGORY_DATA: Record<string, { heading: string; italic: string; description: string }> = {
  "Featured": {
    heading: "Featured",
    italic: "Video Production",
    description:
      "A curated showcase of our most impactful video production, professional editing, and cinematic storytelling projects."
  },
  "Corporate": {
    heading: "Corporate",
    italic: "Video Production",
    description:
      "High-end corporate video production and commercial editing designed to strengthen brand authority and drive business growth."
  },
  "Documentaries": {
    heading: "Long Form",
    italic: "Documentary Editing",
    description:
      "Long form video editing and documentary production crafted for deep audience engagement and narrative impact."
  },
  "Video Production": {
    heading: "Professional",
    italic: "Video Production   ",
    description:
      "On-location video shooting and production services engineered for cinematic visuals and premium brand storytelling."
  },
  "Course Editing": {
    heading: "Course",
    italic: "Video Editing",
    description:
      "Professional course video editing for educators, creators, and digital learning platforms seeking high production value."
  },
  "Podcast Editing": {
    heading: "Podcast",
    italic: "Video Editing",
    description:
      "Multi-camera podcast video editing, color grading, and sound enhancement for high-retention content."
  },
  "Motion Graphics": {
    heading: "Motion Graphics",
    italic: "& Visual Effects",
    description:
      "Advanced motion graphics, kinetic typography, and visual effects integration for high-impact video production."
  },
//   "Cinematic": {
//     heading: "Cinematic",
//     italic: "Video Production",
//     description:
//       "Premium cinematic video production and advanced color grading designed for emotional storytelling and brand elevation."
//   },
};

const CATEGORIES = Object.keys(CATEGORY_DATA);

// 2. Added exactly 6 'featured: true' projects. Drop your real 25+ Video IDs here!
const PROJECTS = [
    { id: 1, title: "MagnetsMedia Style", category: "Documentaries", featured: true, videoId: "MemMmQjOSC0", description: "MagnetsMedia Style 3D Documentary." },
    { id: 2, title: "Bonito Design Video", category: "Cinematic", featured: true, videoId: "By_H9nswCjI", description: "Cinematic Video for Bonito Design" },
    { id: 3, title: "Meteomind Launch Video", category: "Motion Graphics", featured: true, videoId: "Hg39xlCCjXQ", description: "Launch Video for Meteomind.Ai" },
    { id: 4, title: "PNG’s HR Journey Uncovered   ", category: "Podcast Editing", featured: true, videoId: "UDhom9RZyBI", description: "A 40-minute Podcast for The HRs Universe." },
    { id: 5, title: "TikTok Module", category: "Course Editing", featured: true, videoId: "HlsYR8RAB2o", description: "TikTok Module for SMBG" },
    { id: 6, title: "BSM AV", category: "Corporate", featured: true, videoId: "nsdCxqUUqt4", description: "Commercial video for BSM AV" },
    
    { id: 7, title: "ClinovaPack", category: "Corporate", featured: false, videoId: "bga4oeupTWo", description: "Commercial Video ClinovaPack" },
    { id: 8, title: "You Misread Your Controller Display", category: "Corporate", featured: false, videoId: "W9Dk1zYDW-Y", description: "Commercial Video GIC." },
    { id: 9, title: "Shrikant Bapat: Inspiring Success Stories", category: "Corporate", featured: false, videoId: "WksuY8LeDaQ", description: "Commercial Video Directors' Institute Testimonials." },
    { id: 10, title: "Square Solution", category: "Corporate", featured: false, videoId: "3rEaeDFlTSI", description: "Commercial Video Square Solution." },

    { id: 11, title: "Nike", category: "Documentaries", featured: false, videoId: "fZikgOgH_oc", description: "3D Documentary on Nike." },
    { id: 12, title: "Hitler Documentry", category: "Documentaries", featured: false, videoId: "1e8HIb0IlJY", description: "3D Documentary on Hitler." },
    { id: 13, title: "Crime related", category: "Documentaries", featured: false, videoId: "LW8ZpVyMV5E", description: "3D Documentary on Crime." },

    { id: 14, title: "PBF Plant Tour Snapshot", category: "Video Production", featured: false, videoId: "2P44EeyYWNQ", description: "Cinematic Video for PBF." },
    { id: 15, title: "Cinematic Highlight", category: "Video Production", featured: false, videoId: "7kcwp4iR7uQ", description: "Cinematic Video for Accucia." },
    { id: 16, title: "Beauty Academy Advertisement", category: "Video Production", featured: false, videoId: "r2NGMUROU0M", description: "Cinematic Video for Classic Beauty." },
    { id: 17, title: "Interior Design", category: "Video Production", featured: false, videoId: "vjkmaKqPCA0", description: "Cinematic Video on Interior Design." },
    { id: 18, title: "Route Mapping", category: "Video Production", featured: false, videoId: "HDL7pF5i8tE", description: "Cinematic Route Mapping Video for Sowparnika." },
    { id: 19, title: "BTS", category: "Video Production", featured: false, videoId: "Z-D7eEHkAvk" },
    { id: 20, title: "BTS 2", category: "Video Production", featured: false, videoId: "Gr7eHduNO0c" },
    { id: 21, title: "Ghee Reel 1", category: "Video Production", featured: false, videoId: "51WeE778pbA" },
    { id: 22, title: "GYM Reel", category: "Video Production", featured: false, videoId: "FFpcdNV5zvM" },
    { id: 23, title: "Ghee Reel 2", category: "Video Production", featured: false, videoId: "l29-DIaSmjk" },
    { id: 24, title: "Ghee Product Shoot", category: "Video Production", featured: false, videoId: "MLdqvwhI7PY" },
    { id: 25, title: "UGC Shoot", category: "Video Production", featured: false, videoId: "36-lqgqrXK4" },
    { id: 26, title: "Cricket Reel", category: "Video Production", featured: false, videoId: "ffFnpkiqxq4" },
    { id: 27, title: "UGC Shoot 2", category: "Video Production", featured: false, videoId: "z6pBbm6c3r8" },
    { id: 28, title: "Film Promo", category: "Video Production", featured: false, videoId: "pId3lPghV90" },

    { id: 29, title: "Ex-Facebook & Uber Heads Reveal 9 SIMPLE HABITS", category: "Podcast Editing", featured: false, videoId: "xwFgddaaBXs", description: "Ex-Facebook & Uber Heads Reveal 9 SIMPLE HABITS to EARN ₹50 Lakh/Year | IBP EP34" },
    { id: 30, title: "The Dirty Secrets of Underworld-Bollywood & Cricket", category: "Podcast Editing", featured: false, videoId: "K1CCA_cWOB8", description: "ACP Podcast on Avinash Dharmadhikari" },
    { id: 31, title: "How Happy Teachers can bring a great Change", category: "Podcast Editing", featured: false, videoId: "DRWusoAmipk", description: "English Podcast for Happiness Podcast" },

];

// --- Private Google Drive Player ---
const CustomDrivePlayer = ({ project }: { project: any }) => {
    return (
        <div className="absolute inset-0 w-full h-full z-50 bg-black animate-in fade-in duration-500 rounded-xl overflow-hidden cursor-default">
            <iframe
                src={`https://drive.google.com/file/d/${project.driveId}/preview`}
                className="w-full h-full border-none"
                allow="autoplay"
                allowFullScreen
            />
            {/* Note: We cannot overlay custom Play/Pause buttons here because 
        Google Drive does not allow external code to control its player. 
        The user will use the standard Google Drive play buttons.
      */}
        </div>
    );
};

// --- 1. Custom Minimal YouTube Player ---
const CustomYouTubePlayer = ({ project }: { project: any }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);

    const [isBuffering, setIsBuffering] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [imgSrc, setImgSrc] = useState(`https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`);

    useEffect(() => {
        const initPlayer = () => {
            if (!containerRef.current || !window.YT) return;
            playerRef.current = new window.YT.Player(containerRef.current, {
                videoId: project.videoId,
                playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, rel: 0, playsinline: 1, enablejsapi: 1 },
                events: {
                    onReady: (e: any) => e.target.playVideo(),
                    onStateChange: (e: any) => {
                        if (e.data === window.YT.PlayerState.PLAYING) {
                            setIsBuffering(false);
                            setIsPlaying(true);
                        }
                        if (e.data === window.YT.PlayerState.PAUSED || e.data === window.YT.PlayerState.ENDED) {
                            setIsPlaying(false);
                        }
                    },
                },
            });
        };

        if (window.YT && window.YT.Player) initPlayer();
        else window.onYouTubeIframeAPIReady = initPlayer;

        return () => {
            if (playerRef.current?.destroy) playerRef.current.destroy();
        };
    }, [project.videoId]);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isPlaying) playerRef.current?.pauseVideo();
        else playerRef.current?.playVideo();
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isMuted) { playerRef.current?.unMute(); setIsMuted(false); }
        else { playerRef.current?.mute(); setIsMuted(true); }
    };

    return (
        <div className="absolute inset-0 w-full h-full z-50 bg-black animate-in fade-in duration-500 group/player cursor-default rounded-xl overflow-hidden">

            {/* Hidden Embedded Video */}
            <div className="absolute inset-0 w-full h-full pointer-events-none scale-[1.05]">
                <div ref={containerRef} className="w-full h-full border-none" />
            </div>

            {/* Buffering Facade (Crash-proof thumbnail loader) */}
            <div className={`absolute inset-0 z-10 transition-opacity duration-700 pointer-events-none ${isBuffering ? "opacity-100" : "opacity-0"}`}>
                <img
                    src={imgSrc}
                    onError={(e) => {
                        if (!e.currentTarget.src.includes('hqdefault')) {
                            e.currentTarget.src = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;
                        }
                    }}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                    </div>
                </div>
            </div>

            {/* Invisible Play/Pause Hitbox */}
            <div className="absolute inset-0 z-20 cursor-pointer" onClick={togglePlay} />

            {/* Custom Minimal Controls Overlay */}
            <div className={`absolute inset-x-0 bottom-0 z-30 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between transition-opacity duration-300 ${!isBuffering ? "opacity-0 group-hover/player:opacity-100" : "opacity-0 pointer-events-none"}`}>
                <button onClick={togglePlay} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors cursor-pointer text-white">
                    {isPlaying ? <Pause className="w-4 h-4" fill="currentColor" /> : <Play className="w-4 h-4" fill="currentColor" />}
                </button>
                <button onClick={toggleMute} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors cursor-pointer text-white">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

// --- 2. Memoized Project Card ---
// --- Memoized Project Card (Hybrid Router) ---
const ProjectCard = memo(({ project, isActive, onPlay }: { project: any; isActive: boolean; onPlay: () => void; }) => {
    // If it's a Drive video, use the custom thumbnail. Otherwise, fetch from YouTube.
    const defaultThumb = project.driveId
        ? `https://drive.google.com/thumbnail?id=${project.driveId}&sz=w1280`
        : `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`;

    const [imgSrc, setImgSrc] = useState(defaultThumb);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`group ${!isActive ? "cursor-pointer" : ""}`}
            onClick={!isActive ? onPlay : undefined}
        >
            <div className="relative aspect-video overflow-hidden rounded-xl bg-[#0a0a0a] mb-4">
                {isActive ? (
                    // SMART ROUTING: Load Drive or YouTube based on the ID provided
                    project.driveId ? <CustomDrivePlayer project={project} /> : <CustomYouTubePlayer project={project} />
                ) : (
                    <>
                        <img
                            src={imgSrc}
                            onError={(e) => {
                                // Only fallback to hqdefault if it's a YouTube video
                                if (project.videoId && !e.currentTarget.src.includes('hqdefault')) {
                                    e.currentTarget.src = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;
                                }
                            }}
                            loading="lazy"
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm bg-black/20 transform scale-90 group-hover:scale-100 transition-all duration-300">
                                Play Video
                            </span>
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-col gap-1 pointer-events-none">
                <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium tracking-tight group-hover:text-white transition-colors text-white/90">
                        {project.title}
                    </h4>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 shrink-0 ml-4">
                        {project.category}
                    </span>
                </div>
                <p className="text-sm text-white/50 font-light truncate">
                    {project.description}
                </p>
            </div>
        </motion.div>
    );
});
ProjectCard.displayName = "ProjectCard";

// --- 3. Main Filterable Portfolio Section ---
export default function PortfolioFilterable() {
    const [activeCategory, setActiveCategory] = useState("Featured");
    const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

    useEffect(() => {
        if (!document.getElementById("youtube-api-script") && !window.YT) {
            const script = document.createElement("script");
            script.id = "youtube-api-script";
            script.src = "https://www.youtube.com/iframe_api";
            document.head.appendChild(script);
        }
    }, []);

    const filteredProjects = PROJECTS.filter(project => {
        if (activeCategory === "All") return true;
        if (activeCategory === "Featured") return project.featured;
        return project.category === activeCategory;
    });

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setActiveVideoId(null);
    };

    const handlePlay = useCallback((id: number) => {
        setActiveVideoId((prevId) => (prevId === id ? null : id));
    }, []);

    const currentMeta = CATEGORY_DATA[activeCategory];

    return (
        <section className="py-24 sm:py-32 bg-[#111111] px-6 sm:px-10 min-h-screen">
            <div className="max-w-7xl mx-auto">

                {/* FIX 1: Changed items-end to items-start so buttons lock to the top and don't bounce */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-12 sm:mb-16">

                    {/* FIX 2: Added a strict min-height (min-h-[160px]) so the text animation never collapses the page */}
                    <div className="lg:max-w-xl min-h-[180px] sm:min-h-[160px]">
                        <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 mb-6 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-white/20" />
                            Category / {activeCategory}
                        </h2>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <h3 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-4 leading-[1.1]">
                                    {currentMeta.heading} <br className="hidden sm:block" />
                                    <span className="font-medium italic text-white/60">{currentMeta.italic}</span>
                                </h3>
                                <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-md font-light">
                                    {currentMeta.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Premium "Liquid Pill" Filters */}
                    <div className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end mt-2">
                        {CATEGORIES.map((category) => {
                            const isActive = activeCategory === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    // FIX 3: Standardized 'font-medium' on ALL states so button widths never shrink/expand!
                                    className={`relative px-5 py-2.5 rounded-full text-[11px] font-medium uppercase tracking-wider transition-colors duration-300 border border-white/5 ${isActive ? "text-black" : "text-white/50 hover:text-white bg-white/5 hover:bg-white/10"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeFilterBg"
                                            className="absolute inset-0 bg-white rounded-full z-0 shadow-lg"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{category}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Project Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 min-h-[400px]">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                isActive={activeVideoId === project.id}
                                onPlay={() => handlePlay(project.id)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-center py-20 text-white/40 font-light"
                    >
                        New projects in this category are launching soon.
                    </motion.div>
                )}

            </div>
        </section>
    );
}