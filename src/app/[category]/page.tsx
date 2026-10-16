"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Placeholder data generator with Unsplash images
const generateWorks = (category: string) => {
  if (category.toLowerCase() === "light" || category.toLowerCase() === "lighting") {
    return [
      { id: 4, title: "Final Project", type: "video", url: "/portfolio/light/VE2308-1_TanWeeRou_2308200_FinalProject_v01.mp4" },
      { id: 1, title: "Art Studio", type: "image", url: "/portfolio/light/VE2308-1_TanWeeRou_2308200_Artstudio.png" },
      { id: 2, title: "Candles", type: "image", url: "/portfolio/light/VE2308-1_TanWeeRou_2308200_Candles_v01.png" },
      { id: 3, title: "Christmas", type: "image", url: "/portfolio/light/VE2308-1_TanWeeRou_2308200_Christmas_v01.png" },
      { id: 5, title: "Local Train", type: "image", url: "/portfolio/light/VE2308-1_TanWeeRou_2308200_LocalTrain.png" },
      { id: 6, title: "Mad Science", type: "image", url: "/portfolio/light/VE2308-1_TanWeeRou_2308200_Madscience_v03.png" },
      { id: 7, title: "Science Fiction", type: "image", url: "/portfolio/light/VE2308-1_TanWeeRou_2308200_ScienceFiction.png" },
      { id: 8, title: "Warzone", type: "image", url: "/portfolio/light/VE2308-1_TanWeeRou_2308200_Warzone.png" },
    ];
  }

  if (category.toLowerCase() === "fx") {
    return [
      { id: 1, title: "FX Final Project", type: "video", url: "/portfolio/fx/VE2308-1_TanWeeRou_2308200_FInalProject_v01.mp4" },
    ];
  }

  if (category.toLowerCase() === "compositing") {
    return [
      { id: 2, title: "Final Project v01", type: "video", url: "/portfolio/compositing/VE2308-1_TanWeeRou_2308200_06_FinalProject_v01.mp4" },
      { id: 3, title: "Final Assignment Breakdown", type: "video", url: "/portfolio/compositing/VE2308-1_TanWeeRou_2308200_FinalAssignment_breakdown_V01.mp4" },
      { id: 4, title: "FX 01", type: "video", url: "/portfolio/compositing/fx01_v03.mp4" },
      { id: 5, title: "A01", type: "video", url: "/portfolio/compositing/VE2308-1_TanWeeRou_2308200_A01_v01.mp4" },
      { id: 6, title: "A02", type: "video", url: "/portfolio/compositing/VE2308-1_TanWeeRou_2308200_A02_v02.mp4" },
      { id: 7, title: "A03", type: "video", url: "/portfolio/compositing/VE2308-1_TanWeeRou_2308200_A03_v02.mp4" },
    ];
  }

  return Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: `${category.toUpperCase()} Project ${i + 1}`,
    type: i % 3 === 0 ? "video" : "image",
    url: `https://images.unsplash.com/photo-${1550000000000 + (i * 1000000)}?auto=format&fit=crop&w=800&q=80`,
  }));
};

// Helper component to pause video when not centered and show full controls
function CarouselVideo({ src, isCenter, onReady }: { src: string, isCenter: boolean, onReady?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (videoRef.current) {
      if (isCenter) {
        if (isPlaying) videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isCenter, isPlaying]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement>) => {
    if (videoRef.current && videoRef.current.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = Math.max(0, Math.min(1, x / rect.width));
      videoRef.current.currentTime = percent * videoRef.current.duration;
      setProgress(percent * 100);
    }
  };

  const togglePlay = (e: React.MouseEvent | React.PointerEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
  };

  const toggleSpeed = (e: React.MouseEvent | React.PointerEvent) => {
    e.stopPropagation();
    const nextSpeed = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1;
    setSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  return (
    <div className="w-full h-full relative group">
      <video 
        ref={videoRef}
        src={src} 
        loop 
        muted={!isCenter} 
        playsInline
        preload="auto"
        className="w-full h-full object-cover pointer-events-none"
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={onReady}
      />
      
      {/* Play/Pause Center Indicator (optional, shown briefly or when paused) */}
      {isCenter && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white pl-1">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {isCenter && (
        <div className="absolute bottom-0 left-0 w-full p-4 md:px-8 pb-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-50 bg-gradient-to-t from-black/80 to-transparent">
          
          {/* Progress Bar Area */}
          <div 
            className="w-full h-6 cursor-pointer flex items-center"
            onPointerDown={(e) => {
              e.stopPropagation(); // Prevent slider from dragging
              handleScrub(e);
            }}
            onPointerMove={(e) => {
              if (e.buttons === 1) {
                e.stopPropagation();
                handleScrub(e);
              }
            }}
          >
            <div className="w-full h-1 bg-white/20 rounded overflow-hidden relative group-hover:h-2 transition-all duration-300">
              <div className="absolute top-0 left-0 h-full bg-white transition-all duration-75" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex justify-between items-center text-white" onPointerDown={e => e.stopPropagation()}>
            <button onClick={togglePlay} className="hover:text-white/70 transition-colors p-2 -ml-2 outline-none">
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button onClick={toggleSpeed} className="hover:bg-white/20 text-xs font-bold px-3 py-1.5 rounded transition-colors bg-white/10 outline-none backdrop-blur-sm tracking-wider">
              {speed}x
            </button>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [works, setWorks] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastWheelTime = useRef(0);

  useEffect(() => {
    if (category) {
      setWorks(generateWorks(category));
      setCurrentIndex(0);
    }
  }, [category]);

  if (!category || works.length === 0) return null;

  if (category.toLowerCase() === "cfx") {
    return <CfxLayout category={category} />;
  }

  const nextSlide = () => {
    if (works.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % works.length);
  };
  
  const prevSlide = () => {
    if (works.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? works.length - 1 : prev - 1));
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (works.length <= 1) return; // Disable scrolling if only 1 item

    const now = Date.now();
    if (now - lastWheelTime.current < 50) return; 
    lastWheelTime.current = now;

    if (e.deltaY > 0) nextSlide();
    else if (e.deltaY < 0) prevSlide();
  };

  return (
    <main 
      className="fixed inset-0 w-full h-screen bg-black text-white flex items-center justify-center overflow-hidden"
      onWheel={handleWheel}
    >
      {/* Cinematic Background Blur (Optional, adds to atmosphere) */}
      <div className="absolute inset-0 opacity-20 blur-3xl pointer-events-none scale-110 transition-all duration-1000">
        {works[currentIndex]?.type === 'image' && (
          <img src={works[currentIndex].url} className="w-full h-full object-cover" alt="" />
        )}
      </div>

      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
         <h1 className="text-sm md:text-base font-light tracking-[0.5em] uppercase text-white/50">
            {category}
         </h1>
      </div>

      {/* Slider Container */}
      <div className="relative w-full max-w-7xl h-[60vh] md:h-[75vh] flex items-center justify-center">
        {works.map((work, idx) => {
          // Determine relative position
          let position = "hidden";
          if (idx === currentIndex) position = "center";
          else if (works.length > 1) {
            if (idx === currentIndex - 1 || (currentIndex === 0 && idx === works.length - 1)) position = "left";
            else if (idx === currentIndex + 1 || (currentIndex === works.length - 1 && idx === 0)) position = "right";
          }

          const variants = {
            center: { 
              x: "0%", 
              scale: works.length === 1 ? 1.1 : 1, 
              zIndex: 10, 
              opacity: 1, 
              filter: "blur(0px)",
              boxShadow: "0px 0px 100px 30px rgba(255,255,255,0.15)"
            },
            left: { x: "-55%", scale: 0.65, zIndex: 5, opacity: 0.3, filter: "blur(6px)", boxShadow: "0px 0px 0px 0px rgba(255,255,255,0)" },
            right: { x: "55%", scale: 0.65, zIndex: 5, opacity: 0.3, filter: "blur(6px)", boxShadow: "0px 0px 0px 0px rgba(255,255,255,0)" },
            hidden: { x: "0%", scale: 0.4, zIndex: 0, opacity: 0, filter: "blur(10px)", boxShadow: "0px 0px 0px 0px rgba(255,255,255,0)" },
          };

          return (
            <motion.div
              key={work.id}
              variants={variants}
              initial={position}
              animate={position}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute w-[80vw] md:w-[60vw] h-full cursor-pointer overflow-hidden bg-neutral-900 rounded-lg ${position === 'hidden' ? 'pointer-events-none' : ''}`}
              onClick={() => {
                if (works.length <= 1) return;
                if (position === "left") prevSlide();
                if (position === "right") nextSlide();
              }}
              drag={position !== 'hidden' && works.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (works.length <= 1) return;
                const swipe = offset.x;
                if (swipe < -50) nextSlide();
                else if (swipe > 50) prevSlide();
              }}
            >
              {work.type === 'video' ? (
                <CarouselVideo 
                  src={work.url} 
                  isCenter={position === "center"} 
                />
              ) : (
                <img 
                  src={work.url} 
                  alt={work.title}
                  className="w-full h-full object-cover pointer-events-none"
                />
              )}

              {/* Edge Blur / Vignette for side images */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: position === "center" ? 0 : 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  boxShadow: "inset 0 0 100px 60px rgba(0,0,0,1)",
                }}
              />

              {/* Title Overlay at the Top with size 8 */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: position === "center" ? 1 : 0.4 }}
                transition={{ delay: position === "center" ? 0.3 : 0, duration: 0.8 }}
                className="absolute top-6 left-0 w-full flex justify-center z-20 pointer-events-none"
              >
                <h3 className="text-[8px] md:text-[10px] font-sans tracking-[0.3em] uppercase text-white/90 font-semibold drop-shadow-md">
                  {work.title}
                </h3>
              </motion.div>
              
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      {works.length > 1 && (
        <div className="absolute bottom-12 left-12 z-50 flex gap-4 hidden md:flex">
          <button onClick={prevSlide} className="p-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors text-white">
              <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="p-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors text-white">
              <ChevronRight size={24} />
          </button>
        </div>
      )}

    </main>
  );
}

// ------------------------------------------------------------------
// CFX Vertical Scrolling Layout
// ------------------------------------------------------------------
import { ReactLenis } from 'lenis/react';

function CfxLayout({ category }: { category: string }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeRenderIndex, setActiveRenderIndex] = useState(0);

  const renderFinals = [
    "/portfolio/cfx/render_final/VE2308-1_TanWeeRou_2308200_Front.png",
    "/portfolio/cfx/render_final/VE2308-1_TanWeeRou_2308200_Quater.png",
    "/portfolio/cfx/render_final/VE2308-1_TanWeeRou_2308200_Back.png",
    "/portfolio/cfx/render_final/VE2308-1_TanWeeRou_2308200_Fullbody.png"
  ];

  const videoBreakdowns = [
    { src: "/portfolio/cfx/video_breakdown/skeleton.mp4", name: "Skeleton" },
    { src: "/portfolio/cfx/video_breakdown/muscle_text.mp4", name: "Muscle" },
    { src: "/portfolio/cfx/video_breakdown/fat_text.mp4", name: "Fat" },
    { src: "/portfolio/cfx/video_breakdown/fascia_text.mp4", name: "Fascia" },
    { src: "/portfolio/cfx/video_breakdown/skin.mp4", name: "Skin" },
    { src: "/portfolio/cfx/video_breakdown/cloth.mp4", name: "Cloth" },
    { src: "/portfolio/cfx/video_breakdown/hair.mp4", name: "Hair" },
    { src: "/portfolio/cfx/video_breakdown/break.mp4", name: "Break" },
    { src: "/portfolio/cfx/video_breakdown/final.mp4", name: "Final" }
  ];

  const pictureBreakdowns = Array.from({length: 8}, (_, i) => `/portfolio/cfx/Picture_breakdown/${i+1}.png`);

  return (
    <ReactLenis root>
      <main className="w-full bg-[#0a0a0a] text-white selection:bg-white selection:text-black font-sans">
        
        {/* Lightbox Overlay */}
        <AnimatePresence>
          {lightbox && (
            <>
              <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[190] bg-black/80 cursor-zoom-out"
                onClick={() => setLightbox(null)}
              />
              <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center p-4 md:p-12">
                {lightbox.endsWith('.mp4') ? (
                  <motion.video 
                    layoutId={lightbox}
                    src={lightbox} 
                    autoPlay loop controls
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ boxShadow: "0px 0px 80px 20px rgba(255,255,255,0.2)" }}
                    className="max-w-full max-h-full rounded-lg pointer-events-auto bg-black/50" 
                  />
                ) : (
                  <motion.img 
                    layoutId={lightbox}
                    src={lightbox} 
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ boxShadow: "0px 0px 80px 20px rgba(255,255,255,0.2)" }}
                    className="max-w-full max-h-full object-contain rounded-lg pointer-events-auto bg-black/50" 
                  />
                )}
              </div>
            </>
          )}
        </AnimatePresence>

        <article className="relative w-full">
          
          {/* Hero Title Section */}
          <section className="sticky top-0 w-full h-screen flex overflow-hidden bg-[#0a0a0a] z-[1] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <video 
              src="/portfolio/cfx/title.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover opacity-90" 
            />
            <div className="absolute inset-0 bg-black/50 pointer-events-none" />
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute bottom-16 left-8 md:bottom-24 md:left-16 z-10 text-left space-y-8"
            >
              <div>
                <h1 className="text-6xl md:text-[8rem] font-serif font-light tracking-tighter text-white drop-shadow-2xl leading-[0.85] mb-2">
                  <span className="italic">Jack</span><br/>Sparrow
                </h1>
                <p className="text-xs md:text-sm tracking-[0.5em] text-white/60 uppercase pl-1 mt-4">
                  Character FX
                </p>
              </div>

              <div className="space-y-6">
                <a 
                  href="https://drive.google.com/drive/folders/1LAVQuuewgh8V6R28yB1A3R3v4QCJnM-9?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 bg-black/40 hover:bg-white/10 border border-white/20 backdrop-blur-md px-6 py-3 rounded-full transition-all duration-300 pointer-events-auto"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-white/70 group-hover:text-white transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-light text-white/80 group-hover:text-white transition-colors">
                    View Process PDF
                  </span>
                </a>

                <div className="pt-2">
                  <p className="text-[9px] md:text-[10px] tracking-[0.4em] text-white/40 uppercase mb-3 ml-1">
                    Software Used
                  </p>
                  <div className="flex flex-wrap items-center gap-2 max-w-xl md:max-w-2xl">
                    {["Maya", "Houdini", "ZBrush", "Mari", "NukeX", "Substance Painter", "Wrap", "Marvelous Designer"].map((software) => (
                      <span key={software} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded backdrop-blur-md text-[9px] md:text-[10px] tracking-[0.2em] text-white/50 uppercase whitespace-nowrap">
                        {software}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Character Turntable */}
          <section className="sticky top-0 w-full h-screen flex flex-col items-center justify-center bg-[#111] z-[2] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] overflow-hidden px-4 md:px-12 rounded-t-3xl border-t border-white/5">
            <div className="w-full max-w-5xl space-y-6 md:space-y-8 flex flex-col items-center justify-center -mt-16 md:-mt-24">
              <h2 className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/50 text-center">Character Turntable</h2>
              <motion.video 
                layoutId="/portfolio/cfx/VE2308-1_TanWeeRou_2308200_Character_Turntable.mp4"
                whileHover={{ scale: 1.1, zIndex: 50, boxShadow: "0px 30px 60px rgba(0,0,0,0.8)" }}
                whileTap={{ scale: 0.98 }}
                src="/portfolio/cfx/VE2308-1_TanWeeRou_2308200_Character_Turntable.mp4" 
                autoPlay loop muted playsInline 
                className="w-full max-h-[70vh] object-contain rounded-lg shadow-xl cursor-zoom-in relative z-10 bg-black" 
                style={{ opacity: lightbox === "/portfolio/cfx/VE2308-1_TanWeeRou_2308200_Character_Turntable.mp4" ? 0 : 1 }}
                onClick={() => setLightbox("/portfolio/cfx/VE2308-1_TanWeeRou_2308200_Character_Turntable.mp4")}
              />
            </div>
          </section>

          {/* Render Final */}
          <section className="sticky top-0 w-full h-screen flex flex-col items-center justify-center bg-[#151515] z-[3] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] overflow-hidden px-4 md:px-12 rounded-t-3xl border-t border-white/5">
            <div className="w-full h-full flex flex-col items-center pt-20 md:pt-24 relative">
              <h2 className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/50 text-center mb-8">Render Final</h2>
              
              <div className="relative w-full flex-1 flex items-center justify-center mb-24">
                  {renderFinals.map((src, idx) => {
                    let offset = idx - activeRenderIndex;
                    if (offset > 1) offset -= renderFinals.length;
                    if (offset < -2) offset += renderFinals.length;

                    // Design the diagonal layout
                    let x = "0%";
                    let y = "0%";
                    let scale = 1;
                    let opacity = 1;
                    let zIndex = 20;

                    if (offset === 0) {
                      x = "0%";
                      y = "0%";
                      scale = 1;
                      zIndex = 30;
                      opacity = 1;
                    } else if (offset === -1) {
                      x = "-55%";
                      y = "0%";
                      scale = 0.7;
                      zIndex = 20;
                      opacity = 0.5;
                    } else if (offset === 1) {
                      x = "55%";
                      y = "0%";
                      scale = 0.7;
                      zIndex = 20;
                      opacity = 0.5;
                    } else {
                      // offset -2 or 2
                      x = offset < 0 ? "-95%" : "95%";
                      y = "0%";
                      scale = 0.5;
                      zIndex = 10;
                      opacity = 0.2;
                    }

                    return (
                      <motion.div 
                        key={src} 
                        animate={{ x, y, scale, opacity, zIndex }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute cursor-pointer rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] bg-[#0a0a0a] overflow-hidden flex items-center justify-center"
                        onClick={() => {
                          if (offset === 0) setLightbox(src);
                          else setActiveRenderIndex(idx);
                        }}
                      >
                        <motion.img 
                          layoutId={src}
                          src={src} 
                          className="w-auto h-auto max-w-[85vw] md:max-w-[65vw] max-h-[70vh] object-contain" 
                          style={{ opacity: lightbox === src ? 0 : 1 }}
                        />
                      </motion.div>
                    )
                  })}
              </div>
            </div>
          </section>

          {/* Video Breakdown */}
          <section className="sticky top-0 w-full h-screen flex flex-col items-center justify-center bg-[#1a1a1a] z-[4] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] overflow-hidden px-4 md:px-12 rounded-t-3xl border-t border-white/5">
            <div className="w-full max-w-5xl space-y-6 md:space-y-8 flex flex-col items-center -mt-16 md:-mt-24">
              <h2 className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/50 text-center">Video Breakdown</h2>
              <div className="grid grid-cols-3 gap-2 md:gap-4 w-full">
                  {videoBreakdowns.map((item) => (
                    <motion.div 
                      key={item.src}
                      whileHover={{ scale: 1.15, zIndex: 50, boxShadow: "0px 20px 40px rgba(0,0,0,0.8)" }}
                      whileTap={{ scale: 0.95 }}
                      className="overflow-hidden rounded-lg shadow-lg bg-black cursor-zoom-in z-10 relative group" 
                      onClick={() => setLightbox(item.src)}
                    >
                      <motion.video 
                        layoutId={item.src}
                        src={item.src} 
                        autoPlay loop muted playsInline 
                        className="w-full h-auto object-cover aspect-video" 
                        style={{ opacity: lightbox === item.src ? 0 : 1 }}
                      />
                      {/* Overlay title on hover to save vertical space */}
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/90 text-center">{item.name}</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </section>

          {/* Picture Breakdown */}
          <section className="sticky top-0 w-full h-screen flex bg-[#000] z-[5] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] overflow-hidden rounded-t-3xl border-t border-white/5">
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[1.8fr_1fr] items-center">
              
              {/* Left Side: Title and Video */}
              <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 space-y-6 relative z-10">
                <h2 className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/50">
                  Picture Breakdown
                </h2>
                <div className="relative overflow-hidden w-full max-w-3xl rounded-lg shadow-2xl">
                   <video 
                     src="/portfolio/cfx/Picture_breakdown/picture_breakdown.mp4" 
                     autoPlay loop muted playsInline 
                     className="w-full h-auto object-cover bg-[#111]" 
                   />
                </div>
              </div>

              {/* Right Side: Auto Scrolling Images */}
              <div className="relative h-full flex gap-4 p-4 overflow-hidden bg-transparent">
                {/* Overlay gradients to fade out top and bottom */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#000] to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#000] to-transparent z-20 pointer-events-none" />

                {/* Column 1 (Scrolls Up) */}
                <motion.div 
                  className="flex-1 flex flex-col"
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                >
                  <div className="flex flex-col gap-4 pb-4">
                    {pictureBreakdowns.filter((_, i) => i % 2 === 0).map((src, idx) => (
                      <motion.div 
                        key={`c1a-${idx}`} 
                        whileHover={{ scale: 1.05, zIndex: 50, boxShadow: "0px 20px 40px rgba(0,0,0,0.8)" }}
                        whileTap={{ scale: 0.95 }}
                        className="overflow-hidden rounded-lg cursor-zoom-in relative bg-black/20" 
                        onClick={() => setLightbox(src)}
                      >
                        <motion.img layoutId={src} src={src} className="w-full h-auto object-cover" style={{ opacity: lightbox === src ? 0 : 1 }} />
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-4 pb-4">
                    {pictureBreakdowns.filter((_, i) => i % 2 === 0).map((src, idx) => (
                      <motion.div 
                        key={`c1b-${idx}`} 
                        whileHover={{ scale: 1.05, zIndex: 50, boxShadow: "0px 20px 40px rgba(0,0,0,0.8)" }}
                        whileTap={{ scale: 0.95 }}
                        className="overflow-hidden rounded-lg cursor-zoom-in relative bg-black/20" 
                        onClick={() => setLightbox(src)}
                      >
                        <motion.img src={src} className="w-full h-auto object-cover" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Column 2 (Scrolls Down) */}
                <motion.div 
                  className="flex-1 flex flex-col justify-end"
                  animate={{ y: ["-50%", "0%"] }}
                  transition={{ ease: "linear", duration: 40, repeat: Infinity }}
                >
                  <div className="flex flex-col gap-4 pb-4">
                    {pictureBreakdowns.filter((_, i) => i % 2 !== 0).map((src, idx) => (
                      <motion.div 
                        key={`c2a-${idx}`} 
                        whileHover={{ scale: 1.05, zIndex: 50, boxShadow: "0px 20px 40px rgba(0,0,0,0.8)" }}
                        whileTap={{ scale: 0.95 }}
                        className="overflow-hidden rounded-lg cursor-zoom-in relative bg-black/20" 
                        onClick={() => setLightbox(src)}
                      >
                        <motion.img layoutId={src} src={src} className="w-full h-auto object-cover" style={{ opacity: lightbox === src ? 0 : 1 }} />
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-4 pb-4">
                    {pictureBreakdowns.filter((_, i) => i % 2 !== 0).map((src, idx) => (
                      <motion.div 
                        key={`c2b-${idx}`} 
                        whileHover={{ scale: 1.05, zIndex: 50, boxShadow: "0px 20px 40px rgba(0,0,0,0.8)" }}
                        whileTap={{ scale: 0.95 }}
                        className="overflow-hidden rounded-lg cursor-zoom-in relative bg-black/20" 
                        onClick={() => setLightbox(src)}
                      >
                        <motion.img src={src} className="w-full h-auto object-cover" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Final Breakdown */}
          <section className="sticky top-0 w-full h-screen flex flex-col items-center justify-center bg-[#000] z-[6] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] overflow-hidden px-4 md:px-12 rounded-t-3xl border-t border-white/10">
            <div className="w-full max-w-[90vw] lg:max-w-[80vw] 2xl:max-w-[1400px] space-y-6 md:space-y-8 flex flex-col items-center justify-center -mt-8 md:-mt-12">
              <h2 className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/50 text-center">Final Breakdown</h2>
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/15 bg-black shadow-[0_0_80px_20px_rgba(255,255,255,0.08)] relative">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/cQlMfuFvJ24" 
                  title="Jack Sparrow CFX Final Breakdown" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                />
              </div>
            </div>
          </section>

        </article>
      </main>
    </ReactLenis>
  );
}
