"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, ChevronLeft, ChevronRight, X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { ReactLenis } from 'lenis/react';
import { ShaderBackground } from "@/components/ui/shader-background";
import { filmsData } from "@/data/films";

export default function ShortFilmsPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [expandedStills, setExpandedStills] = useState<Record<string, boolean>>({});
  const [stillLightbox, setStillLightbox] = useState<{ filmSlug: string; index: number } | null>(null);

  // Recalculate smooth scroll limits whenever stills expand or collapse
  useEffect(() => {
    const triggerResize = () => {
      window.dispatchEvent(new Event('resize'));
    };
    triggerResize();
    const t1 = setTimeout(triggerResize, 100);
    const t2 = setTimeout(triggerResize, 300);
    const t3 = setTimeout(triggerResize, 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [expandedStills]);

  useEffect(() => {
    if (!stillLightbox) return;
    const currentFilm = filmsData.find(f => f.slug === stillLightbox.filmSlug);
    if (!currentFilm || !currentFilm.stills) return;
    const total = currentFilm.stills.length;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setStillLightbox(null);
      } else if (e.key === "ArrowLeft") {
        setStillLightbox(prev => prev ? { ...prev, index: (prev.index - 1 + total) % total } : null);
      } else if (e.key === "ArrowRight") {
        setStillLightbox(prev => prev ? { ...prev, index: (prev.index + 1) % total } : null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stillLightbox]);

  return (
    <ReactLenis root>
      <main className="min-h-screen w-full bg-transparent text-white selection:bg-white selection:text-black relative">
        <div className="fixed inset-0 -z-10 pointer-events-none opacity-80"><ShaderBackground /></div>
        
        {/* Lightbox Overlay */}
        <AnimatePresence>
          {lightbox && (
            <>
              <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[190] bg-black/90 cursor-zoom-out"
                onClick={() => setLightbox(null)}
              />
              <div 
                className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center p-4 md:p-12"
                onClick={() => setLightbox(null)}
              >
                <motion.div 
                  layoutId={lightbox}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ boxShadow: "0px 0px 80px 20px rgba(255,255,255,0.2)" }}
                  className="w-full max-w-6xl aspect-video rounded-xl overflow-hidden pointer-events-auto bg-black" 
                >
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${lightbox}?autoplay=1`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  ></iframe>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* Still Photo Lightbox Overlay */}
        <AnimatePresence>
          {stillLightbox && (() => {
            const film = filmsData.find(f => f.slug === stillLightbox.filmSlug);
            if (!film || !film.stills) return null;
            const currentStill = film.stills[stillLightbox.index];
            const total = film.stills.length;

            return (
              <>
                <motion.div
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-[290] bg-black/95 cursor-zoom-out"
                  onClick={() => setStillLightbox(null)}
                />
                <div 
                  className="fixed inset-0 z-[300] pointer-events-none flex flex-col items-center justify-between p-4 md:p-8"
                  onClick={() => setStillLightbox(null)}
                >
                  {/* Top Bar */}
                  <div className="w-full max-w-6xl flex justify-between items-center pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium tracking-wide text-white">{film.title}</span>
                      <span className="text-xs text-white/40 font-mono tracking-wider">
                        Frame {String(stillLightbox.index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                      </span>
                    </div>
                    <button
                      onClick={() => setStillLightbox(null)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      aria-label="Close"
                    >
                      <X className="size-5" />
                    </button>
                  </div>

                  {/* Main Image with Navigation Buttons */}
                  <div className="relative w-full max-w-6xl flex-1 flex items-center justify-center pointer-events-auto my-3" onClick={(e) => e.stopPropagation()}>
                    {total > 1 && (
                      <button
                        onClick={() => setStillLightbox(prev => prev ? { ...prev, index: (prev.index - 1 + total) % total } : null)}
                        className="absolute left-2 md:-left-8 p-3 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 transition-all z-10 backdrop-blur-md"
                        aria-label="Previous still"
                      >
                        <ChevronLeft className="size-6" />
                      </button>
                    )}

                    <motion.img
                      key={currentStill}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      src={currentStill}
                      alt={`Still ${stillLightbox.index + 1}`}
                      className="max-h-[76vh] max-w-full rounded-xl object-contain shadow-[0_0_80px_rgba(255,255,255,0.15)] border border-white/10"
                    />

                    {total > 1 && (
                      <button
                        onClick={() => setStillLightbox(prev => prev ? { ...prev, index: (prev.index + 1) % total } : null)}
                        className="absolute right-2 md:-right-8 p-3 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 transition-all z-10 backdrop-blur-md"
                        aria-label="Next still"
                      >
                        <ChevronRight className="size-6" />
                      </button>
                    )}
                  </div>

                  {/* Bottom indicator text */}
                  <div className="text-center text-xs text-white/40 font-mono tracking-widest uppercase pointer-events-auto">
                    Use Arrow Keys or Click Arrows to Navigate • Click background to close
                  </div>
                </div>
              </>
            );
          })()}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 w-full p-8 z-50 mix-blend-difference pointer-events-auto">
          <Link 
            href="/"
            className="inline-flex items-center gap-4 text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-6" />
            <span className="text-sm tracking-[0.2em] uppercase font-light">Back to Portfolio</span>
          </Link>
        </nav>

        {/* Header */}
        <header className="w-full pt-40 pb-16 px-6 md:px-16 max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-serif font-light tracking-tighter leading-[0.9] text-white">
              <span className="italic">Short</span> Films
            </h1>
          </motion.div>
        </header>

        {/* Films Vertical List */}
        <div className="w-full px-6 md:px-16 max-w-[1800px] mx-auto space-y-32 pb-80 md:pb-96">
          {filmsData.map((film, index) => (
            <motion.section
              key={film.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center"
            >
              {/* Header: Title, Genre, Duration */}
              <div className="w-full max-w-[1700px] flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-white mb-2">{film.title}</h2>
                  <p className="text-sm tracking-[0.3em] uppercase text-white/50"><span className="text-white/30 mr-2">Genre:</span> {film.genre}</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-white/30 text-xs tracking-widest uppercase">
                  <span>{film.duration || "10:00"}</span>
                </div>
              </div>

              {/* Side-by-Side: Video (Left) + 4-Column Stills (Right) */}
              <div className="w-full max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
                {/* Left: Video Player */}
                <div className="lg:col-span-6 w-full">
                  <motion.div 
                    className="w-full aspect-video relative cursor-pointer group"
                    onClick={() => setLightbox(film.id)}
                  >
                    <motion.div
                      layoutId={film.id}
                      whileHover={{ scale: 1.015, boxShadow: "0px 0px 60px 10px rgba(255,255,255,0.15)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-full rounded-2xl overflow-hidden relative border border-white/10 bg-black"
                    >
                      <img 
                        src={film.thumbnail} 
                        alt={film.title} 
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">
                          <Play className="size-7 md:size-8 ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Right: Production Stills (4-Columns) */}
                <div className="lg:col-span-6 w-full">
                  {film.stills && film.stills.length > 0 && (() => {
                    const isExpanded = !!expandedStills[film.slug];
                    const displayedStills = isExpanded ? film.stills : film.stills.slice(0, 12);

                    return (
                      <div className="flex flex-col justify-between h-full">
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-xs md:text-sm tracking-[0.25em] uppercase text-white/70 font-mono">
                              Film Stills
                            </h3>
                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] tracking-wider text-white/70 font-mono">
                              {film.stills.length} Frames
                            </span>
                          </div>

                          {film.stills.length > 12 && (
                            <button
                              onClick={() => setExpandedStills(prev => ({ ...prev, [film.slug]: !prev[film.slug] }))}
                              className="text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors flex items-center gap-1 font-mono"
                            >
                              <span>{isExpanded ? "Collapse" : `View All (${film.stills.length})`}</span>
                              {isExpanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                            </button>
                          )}
                        </div>

                        {/* 4-Column Grid beside video (3 rows = 12 stills by default) */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-3">
                          {displayedStills.map((stillUrl, sIdx) => {
                            const originalIdx = film.stills ? film.stills.indexOf(stillUrl) : sIdx;
                            const frameNum = (originalIdx >= 0 ? originalIdx : sIdx) + 1;
                            return (
                              <motion.div
                                key={sIdx}
                                whileHover={{ scale: 1.04 }}
                                transition={{ duration: 0.2 }}
                                className="relative aspect-video rounded-xl overflow-hidden border border-white/10 hover:border-white/40 bg-black cursor-zoom-in group shadow-md"
                                onClick={() => setStillLightbox({ filmSlug: film.slug, index: originalIdx >= 0 ? originalIdx : sIdx })}
                              >
                                <img
                                  src={stillUrl}
                                  alt={`Still ${frameNum}`}
                                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-1.5">
                                  <span className="text-[9px] tracking-wider text-white/90 font-mono">
                                    #{String(frameNum).padStart(2, "0")}
                                  </span>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>

                        {film.stills.length > 12 && (
                          <div className="mt-4 flex justify-center">
                            <button
                              onClick={() => setExpandedStills(prev => ({ ...prev, [film.slug]: !prev[film.slug] }))}
                              className="group px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white/70 hover:text-white text-xs tracking-[0.15em] uppercase font-mono transition-all duration-300 flex items-center gap-1.5"
                            >
                              <span>{isExpanded ? "Collapse Frames" : `Show All ${film.stills.length} Production Frames`}</span>
                              {isExpanded ? <ChevronUp className="size-3 group-hover:-translate-y-0.5 transition-transform" /> : <ChevronDown className="size-3 group-hover:translate-y-0.5 transition-transform" />}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Story Synopsis & Role Details */}
              <div className="w-full max-w-[1700px] mx-auto mt-2 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-8 space-y-3">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-mono block">
                    Story Synopsis
                  </span>
                  <p className="text-white/80 font-light text-base md:text-lg leading-relaxed">
                    {film.synopsis}
                  </p>
                  {film.synopsisCn && (
                    <p className="text-white/40 font-light text-sm leading-relaxed pt-1">
                      {film.synopsisCn}
                    </p>
                  )}
                </div>

                <div className="md:col-span-4 space-y-3 md:pl-8 md:border-l md:border-white/10">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-mono block">
                    Roles
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {film.roles.map((roleItem, idx) => {
                      const isDirector = roleItem.toLowerCase() === "director";
                      return isDirector ? (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 rounded-lg bg-amber-400/20 border border-amber-400/70 text-amber-200 font-semibold text-xs tracking-wider uppercase font-mono shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:bg-amber-400/30 hover:border-amber-300 hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          {roleItem}
                        </span>
                      ) : (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs tracking-wider uppercase font-mono hover:border-white/30 hover:bg-white/10 transition-colors"
                        >
                          {roleItem}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </main>
    </ReactLenis>
  );
}
