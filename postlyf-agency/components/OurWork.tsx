"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from "framer-motion";
import { Play, ArrowRight, X, Pause, Volume2, VolumeX, Loader2 } from "lucide-react";
import React, { useRef, useState, useEffect, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const PROJECTS = [
  { id: 1, title: "Nike Documentary", type: "Documentaries", thumb: "from-blue-600/50", color: "#3B82F6", videoId: "fZikgOgH_oc" },
  { id: 2, title: "Meteomind Launch Video", type: "Motion Graphics", thumb: "from-rose-600/50", color: "#F43F5E", videoId: "Hg39xlCCjXQ" },
  { id: 3, title: "Crime Documentary", type: "Long-form YouTube", thumb: "from-yellow-600/50", color: "#EAB308", videoId: "LW8ZpVyMV5E" },
  { id: 4, title: "Hitler Documentry", type: "Documentaries", thumb: "from-emerald-600/50", color: "#10B981", videoId: "MemMmQjOSC0" },
  { id: 5, title: "Course Module", type: "Long Form Edit", thumb: "from-cyan-600/50", color: "#06B6D4", videoId: "HlsYR8RAB2o" },
  { id: 6, title: "Bonito Cinematic Video", type: "Cinematic Edit", thumb: "from-purple-600/50", color: "#A855F7", videoId: "By_H9nswCjI" },
  { id: 7, title: "Corporate Edit", type: "Commercial Edit", thumb: "from-indigo-600/50", color: "#6366F1", videoId: "W9Dk1zYDW-Y" },
  { id: 8, title: "Route Mapping", type: "Motion Graphics", thumb: "from-orange-600/50", color: "#F97316", videoId: "HDL7pF5i8tE" },
];

// --- Custom YouTube Player (Replaces the basic iframe) ---
const CustomYouTubePlayer = ({ project, onClose }: { project: any; onClose: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [isBuffering, setIsBuffering] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const initPlayer = () => {
      if (!containerRef.current || !window.YT) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: project.videoId,
        playerVars: {
          autoplay: 1,
          controls: 0, // Minimal UI
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: (event: any) => {
            setDuration(event.target.getDuration());
            event.target.playVideo();
            intervalRef.current = setInterval(() => {
              if (event.target.getCurrentTime) setCurrentTime(event.target.getCurrentTime());
            }, 500);
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsBuffering(false);
              setIsPlaying(true);
            }
            if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
            if (event.data === window.YT.PlayerState.ENDED) setIsPlaying(false);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) initPlayer();
    else window.onYouTubeIframeAPIReady = initPlayer;

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (playerRef.current && playerRef.current.destroy) playerRef.current.destroy();
    };
  }, [project.videoId]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current?.playVideo) return;
    if (isPlaying) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current?.mute) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="absolute inset-0 w-full h-full z-50 bg-black animate-in fade-in duration-500 group/player cursor-default">

      {/* User's Close Button */}
      {/* <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-black/40 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white z-[60] transition-colors border border-white/10 opacity-0 group-hover/player:opacity-100"
      >
        <X className="w-4 h-4 md:w-5 md:h-5" />
      </button> */}

      {/* Hidden Embedded Video wrapper */}
      <div className="absolute inset-0 w-full h-full pointer-events-none scale-[1.05]">
        <div ref={containerRef} className="w-full h-full border-none" />
      </div>

      {/* Buffering Facade (Keeps your exact styles while loading invisibly) */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-700 pointer-events-none ${isBuffering ? "opacity-100" : "opacity-0"}`}>
        <img
          src={`https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`}
          onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`; }}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover z-10 opacity-40"
        />
        <div className="absolute inset-0 bg-[#0a0a0a] z-0" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="w-10 h-10 md:w-12 md:h-12 xl:w-16 xl:h-16 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 bg-white/10 shadow-2xl">
            <Loader2 className="w-4 h-4 md:w-5 md:h-5 xl:w-6 xl:h-6 text-white animate-spin" />
          </div>
        </div>
      </div>

      {/* Invisible Play/Pause Hitbox covering the video */}
      <div className="absolute inset-0 z-20 cursor-pointer" onClick={togglePlay} />

      {/* Custom Minimal Controls Overlay */}
      <div className={`absolute inset-x-0 bottom-0 z-30 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between transition-opacity duration-300 ${!isBuffering ? "opacity-0 group-hover/player:opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="flex items-center gap-3 md:gap-4 text-white z-40">
          <button onClick={togglePlay} className="w-10 h-10 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors cursor-pointer relative">
            {isPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" /> : <Play className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" />}
          </button>
          {/* <span classNa me="text-sm md:text-base font-medium line-clamp-1 max-w-[140px] sm:max-w-[180px] lg:max-w-[220px]">{project.title}</span> */}
        </div>
        <div className="flex items-center gap-3 md:gap-4 text-white z-40">
          {/* <span className="text-[10px] md:text-xs font-mono font-medium opacity-80 mt-[2px]">{formatTime(currentTime)} / {formatTime(duration)}</span> */}
          <button onClick={toggleMute} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors cursor-pointer relative">
            {isMuted ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- VideoCard (Wrapped in memo for lag-free scroll) ---
const VideoCard = memo(({
  project,
  isPlaying,
  onPlay,
  onClose
}: {
  project: any;
  isPlaying: boolean;
  onPlay: () => void;
  onClose: () => void;
}) => {
  return (
    <div className={`group relative rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden bg-[#0d0d0d] border border-white/5 shrink-0 
      w-[65vw] sm:w-[320px] lg:w-[380px] xl:w-[440px] 
      h-[45vw] sm:h-[200px] lg:h-[240px] xl:h-[300px] 
      transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(255,255,255,0.06)] 
      ${!isPlaying ? "cursor-pointer" : ""}`}
    >
      {!isPlaying ? (
        /* --- STATE 1: THE FACADE --- */
        <div className="absolute inset-0 w-full h-full cursor-pointer z-10" onClick={onPlay}>
          <img
            src={`https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`}
            alt={project.title}
            onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`; }}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 z-10 opacity-70 group-hover:opacity-40 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#0a0a0a] z-0" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center transition-transform duration-700 group-hover:scale-110 pointer-events-none">
            <div className="w-10 h-10 md:w-12 md:h-12 xl:w-16 xl:h-16 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 bg-white/10 transition-all duration-500 group-hover:bg-white shadow-2xl">
              <Play className="w-3 h-3 md:w-4 md:h-4 xl:w-6 xl:h-6 text-white transition-colors duration-500 group-hover:text-black" fill="currentColor" />
            </div>
          </div>

          {/* Content Info (Title & Category) */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 xl:p-10 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
            <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-bold mb-2 md:mb-3 block transform translate-y-3 opacity-60 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500" style={{ color: project.color }}>
              {project.type}
            </span>
            <h3 className="text-xl md:text-2xl xl:text-3xl font-medium text-white tracking-tight leading-tight transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              {project.title}
            </h3>
            <div className="h-[2px] bg-white/30 mt-4 xl:mt-5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </div>
        </div>
      ) : (
        /* --- STATE 2: THE REAL VIDEO (Custom Minimal Player) --- */
        <CustomYouTubePlayer project={project} onClose={onClose} />
      )}
    </div>
  );
});
VideoCard.displayName = "VideoCard";

const PortfolioEndLiquidButton = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
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
    <button
      onClick={() => router.push("/portfolio")}
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative inline-flex items-center gap-3 md:gap-4 px-6 py-3 md:px-8 md:py-4 xl:px-10 xl:py-5 bg-white text-black hover:text-white rounded-full font-bold text-xs md:text-sm xl:text-base overflow-hidden border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
    >
      <span className="relative z-10 flex items-center gap-2 md:gap-3">
        View Entire Portfolio
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
      </span>

      <motion.div
        style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
        animate={{ width: isHovered ? "200%" : "0%", height: isHovered ? "700%" : "0%" }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute pointer-events-none rounded-full bg-[#1a1a1a] z-0"
      />
    </button>
  );
};

export default function OurWork({ scrollYProgress: pageScrollYProgress }: { scrollYProgress?: MotionValue<number> }) {
  const targetRef = useRef<HTMLDivElement>(null);

  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

  // Pre-load YouTube API immediately for zero-lag mounting
  useEffect(() => {
    if (!document.getElementById("youtube-api-script") && !window.YT) {
      const script = document.createElement("script");
      script.id = "youtube-api-script";
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 0.95], ["calc(0% - 0vw)", "calc(-100% + 100vw)"]);
  const progressScale = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  return (
    <section ref={targetRef} id="work" className="relative h-[400vh] bg-[#191919]">
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">

        {/* Creative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
          <div className="absolute bottom-[-20%] left-[10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.9)_100%)] z-10" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay z-10" />
        </div>

        {/* 1. STATIC CENTERED HEADER */}
        <div className="w-full pt-[12vh] sm:pt-[12vh] lg:pt-[14vh] flex flex-col items-center justify-center text-center z-30 pointer-events-none px-6 shrink-0 md:mb-10">
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <span className="w-8 md:w-16 h-[1px] bg-white/20" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 font-medium">
              Featured projects
            </span>
            <span className="w-8 md:w-16 h-[1px] bg-white/20" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-medium tracking-tighter text-white leading-[1] mb-4 md:mb-6">
            How we helped <br className="sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic font-serif pr-2 md:pr-4">
              others succeed.
            </span>
          </h2>

          <p className="text-white/40 text-[10px] sm:text-xs md:text-base lg:text-lg max-w-xs sm:max-w-md md:max-w-lg leading-relaxed font-light px-4">
            High-impact visual storytelling that transforms brands into legends.
          </p>
        </div>

        {/* 2. HORIZONTAL SCROLL TRACK */}
        <div className="relative flex-1 flex items-center z-20 pointer-events-none w-full min-h-0 pb-[6vh]">
          <motion.div
            style={{ x, willChange: "transform" }}
            className="flex items-center gap-6 md:gap-12 xl:gap-16 pl-[5vw] md:pl-[10vw] w-max pointer-events-auto transform-gpu"
          >
            {/* Video Gallery */}
            {PROJECTS.map((project) => (
              <VideoCard
                key={project.id}
                project={project}
                isPlaying={activeVideoId === project.id}
                onPlay={() => setActiveVideoId(project.id)}
                onClose={() => setActiveVideoId(null)}
              />
            ))}

            {/* End CTA Block */}
            <div className="w-[85vw] sm:w-[400px] lg:w-[480px] xl:w-[560px] mr-[7.5vw] sm:mr-[calc(25vw-200px)] lg:mr-[calc(25vw-240px)] xl:mr-[calc(25vw-280px)] shrink-0 flex flex-col items-center justify-center text-center">
              <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
                Your vision, <br />
                <span className="text-white/40 italic font-serif">our expertise.</span>
              </h3>
              <PortfolioEndLiquidButton />
            </div>
          </motion.div>
        </div>

        {/* 3. MINIMAL PROGRESS BAR */}
        <div className="absolute bottom-6 md:bottom-10 left-[5vw] md:left-[10vw] right-[5vw] md:right-[10vw] z-30 pointer-events-none">
          <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full">
            <motion.div
              style={{ scaleX: progressScale, transformOrigin: "left" }}
              className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/80 to-white"
            />
          </div>
        </div>

      </div>
    </section>
  );
}