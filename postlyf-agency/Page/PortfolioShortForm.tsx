"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState, memo, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// Just drop your 12 YouTube IDs right here! 
const SHORT_FORM_WORKS = [
  {category: "Motion Graphic", color: "#ff3366", videoId: "-ZDMMC6hRLM" },
  {category: "Documentary Short", color: "#33ff99", videoId: "1caJRQ6vXlI" },
  {category: "Short Form", color: "#3377ff", videoId: "2Bg3Lxd41-Q" },
  {category: "Reel / Short Form", color: "#ffcc00", videoId: "7QHRYiuUWMA" },
  {category: "Motion Graphic", color: "#ff00ff", videoId: "KU0MDUuyPUA" },
  {category: "Reel / Short Form", color: "#00ffff", videoId: "Kj0RBeGI2gE" },
  {category: "Short Form", color: "#ff6600", videoId: "R__k45OAIDA" },
  {category: "Motion Graphic", color: "#00ffcc", videoId: "Xy55qyqs9uY" },
  {category: "Motion Graphic", color: "#cc00ff", videoId: "cp41DY1_8Yw" },
  {category: "Motion Graphic", color: "#ffff00", videoId: "jIfEFpnivYU" },
  {category: "Documentary Short", color: "#ff0033", videoId: "uFaYsdXZ2rk" },
  {category: "Short Form", color: "#33ccff", videoId: "Eaov0Mo0MvY" },
];

// --- 1. Custom Minimal YouTube Player ---
const CustomYouTubePlayer = ({ work }: { work: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  const [isBuffering, setIsBuffering] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [imgSrc, setImgSrc] = useState(`https://img.youtube.com/vi/${work.videoId}/maxresdefault.jpg`);

  useEffect(() => {
    const initPlayer = () => {
      if (!containerRef.current || !window.YT) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: work.videoId,
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
  }, [work.videoId]);

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
    <div className="absolute inset-0 w-full h-full z-50 bg-black animate-in fade-in duration-500 group/player cursor-default">
      
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
              e.currentTarget.src = `https://img.youtube.com/vi/${work.videoId}/hqdefault.jpg`; 
            }
          }}
          alt={work.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>  
        </div>
      </div>

      {/* Invisible Play/Pause Hitbox */}
      <div className="absolute inset-0 z-20 cursor-pointer" onClick={togglePlay} />

      {/* Custom Minimal Controls Overlay */}
      <div className={`absolute inset-x-0 bottom-0 z-30 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between transition-opacity duration-300 ${!isBuffering ? "opacity-0 group-hover/player:opacity-100" : "opacity-0 pointer-events-none"}`}>
        <button onClick={togglePlay} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors cursor-pointer text-white">
          {isPlaying ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5" fill="currentColor" />}
        </button>
        <button onClick={toggleMute} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors cursor-pointer text-white">
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

// --- 2. Memoized Video Card ---
const ShortVideoCard = memo(({ work, isActive, onPlay }: { work: any; isActive: boolean; onPlay: () => void; }) => {
  const [imgSrc, setImgSrc] = useState(`https://img.youtube.com/vi/${work.videoId}/maxresdefault.jpg`);

  return (
    <div className="absolute inset-0 w-full h-full" onClick={!isActive ? onPlay : undefined}>
      {isActive ? (
        <CustomYouTubePlayer work={work} />
      ) : (
        <div className="relative w-full h-full cursor-pointer">
          {/* Automatically fetches YouTube thumbnail (Crash-proof logic) */}
          <img
            src={imgSrc}
            onError={(e) => { 
              if (!e.currentTarget.src.includes('hqdefault')) {
                e.currentTarget.src = `https://img.youtube.com/vi/${work.videoId}/hqdefault.jpg`; 
              }
            }}
            alt={work.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
          
          <div className="absolute inset-x-0 bottom-0 p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 block border border-white/10 w-fit px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
              {work.category}
            </span>
            <h3 className="text-2xl font-light tracking-tight mb-4 text-white">{work.title}</h3>
            <div className="h-1 transition-all duration-700 w-0 group-hover:w-full ease-[0.16,1,0.3,1] rounded-full" style={{ backgroundColor: work.color }} />
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 scale-90 group-hover:scale-100 ease-[0.16,1,0.3,1] pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                <path d="M8 5V19L19 12L8 5Z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
ShortVideoCard.displayName = "ShortVideoCard";

// --- 3. Main Infinite Section ---
export default function PortfolioShortForm() {
  // Duplicates the videos to create the infinite loop track
  const duplicatedWorks = [...SHORT_FORM_WORKS, ...SHORT_FORM_WORKS, ...SHORT_FORM_WORKS];

  const x = useMotionValue(0);
  const setRef = useRef<HTMLDivElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [setWidth, setSetWidth] = useState(0);

  // Pre-load YouTube API immediately
  useEffect(() => {
    if (!document.getElementById("youtube-api-script") && !window.YT) {
      const script = document.createElement("script");
      script.id = "youtube-api-script";
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  }, []);

  // Measure the EXACT width of one set of videos for the perfect jump cut
  const updateWidth = useCallback(() => {
    if (setRef.current) {
      setSetWidth(setRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  // The Magic Jump Cut Listener
  useEffect(() => {
    return x.on("change", (latest) => {
      if (setWidth === 0) return;
      // If user drags past Set 1 to the left, seamlessly jump back to 0
      if (latest <= -setWidth) {
        x.set(latest + setWidth);
      } 
      // If user drags past Set 1 to the right, seamlessly jump back to -setWidth
      else if (latest > 0) {
        x.set(latest - setWidth);
      }
    });
  }, [x, setWidth]);

  // Auto-Scroll Loop (Pauses on hover OR if a video is playing)
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      if (!isHovered && activeVideoId === null && setWidth > 0) {
        x.set(x.get() - 1); // Adjust speed here
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, activeVideoId, setWidth, x]);

  const handlePlay = useCallback((uniqueId: string) => {
    setActiveVideoId((prevId) => (prevId === uniqueId ? null : uniqueId));
  }, []);

  // Closes the active video when the user starts dragging the carousel
  const handleDragStart = () => {
    setIsHovered(true);
    if (activeVideoId !== null) {
      setActiveVideoId(null);
    }
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden">
      
      {/* Header */}
      <div className="px-6 sm:px-10 max-w-7xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
            Short Form <span className="font-medium italic text-white">Video Editing</span>
          </h2>
          <p className="font-light text-white/50 text-sm mt-4 max-w-2xl">
            Professional short form video editing designed to increase engagement, retention, and brand visibility across Instagram, YouTube, and emerging social platforms.
          </p>
        </motion.div>
        <div className="hidden md:flex items-center gap-2 mt-8 text-white/30 text-[10px] uppercase tracking-widest">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Drag to explore
        </div>
      </div>

      {/* Infinite Drag Carousel */}
      <div
        className="relative w-full overflow-visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          style={{ x }}
          drag="x" // Free dragging enabled at all times!
          dragElastic={0} // Removes "bounciness" so the infinite loop math stays invisible
          onDragStart={handleDragStart} // <--- PAUSES CURRENT VIDEO ON DRAG
          onDragEnd={() => setIsHovered(false)}
          className="flex w-max px-6 sm:px-10 cursor-grab active:cursor-grabbing"
        >
          {/* We render exactly 3 identical sets to guarantee the screen is always full */}
          
          {/* SET 1 (Measured for exact width) */}
          <div ref={setRef} className="flex gap-4 sm:gap-8 pr-4 sm:pr-8">
            {SHORT_FORM_WORKS.map((work, idx) => {
              const uniqueId = `set1-${idx}`;
              return (
                <motion.div key={uniqueId} data-cursor-text="PLAY" className="group relative w-[260px] h-[460px] sm:w-[300px] sm:h-[533px] md:w-[350px] md:h-[622px] flex-shrink-0 bg-[#0a0a0a] rounded-2xl overflow-hidden" whileHover={activeVideoId === uniqueId ? {} : { y: -10 }} transition={{ duration: 0.4 }}>
                  <ShortVideoCard work={work} isActive={activeVideoId === uniqueId} onPlay={() => handlePlay(uniqueId)} />
                </motion.div>
              );
            })}
          </div>

          {/* SET 2 */}
          <div className="flex gap-4 sm:gap-8 pr-4 sm:pr-8">
            {SHORT_FORM_WORKS.map((work, idx) => {
              const uniqueId = `set2-${idx}`;
              return (
                <motion.div key={uniqueId} data-cursor-text="PLAY" className="group relative w-[260px] h-[460px] sm:w-[300px] sm:h-[533px] md:w-[350px] md:h-[622px] flex-shrink-0 bg-[#0a0a0a] rounded-2xl overflow-hidden" whileHover={activeVideoId === uniqueId ? {} : { y: -10 }} transition={{ duration: 0.4 }}>
                  <ShortVideoCard work={work} isActive={activeVideoId === uniqueId} onPlay={() => handlePlay(uniqueId)} />
                </motion.div>
              );
            })}
          </div>

          {/* SET 3 */}
          <div className="flex gap-4 sm:gap-8 pr-4 sm:pr-8">
            {SHORT_FORM_WORKS.map((work, idx) => {
              const uniqueId = `set3-${idx}`;
              return (
                <motion.div key={uniqueId} data-cursor-text="PLAY" className="group relative w-[260px] h-[460px] sm:w-[300px] sm:h-[533px] md:w-[350px] md:h-[622px] flex-shrink-0 bg-[#0a0a0a] rounded-2xl overflow-hidden" whileHover={activeVideoId === uniqueId ? {} : { y: -10 }} transition={{ duration: 0.4 }}>
                  <ShortVideoCard work={work} isActive={activeVideoId === uniqueId} onPlay={() => handlePlay(uniqueId)} />
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </section>
  );
}