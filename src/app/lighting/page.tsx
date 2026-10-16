"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactLenis } from 'lenis/react';
import { ShaderBackground } from "@/components/ui/shader-background";

export default function LightingPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const images = [
    { name: "Art Studio", src: "/portfolio/light/VE2308-1_TanWeeRou_2308200_Artstudio.png" },
    { name: "Candles", src: "/portfolio/light/VE2308-1_TanWeeRou_2308200_Candles_v01.png" },
    { name: "Christmas", src: "/portfolio/light/VE2308-1_TanWeeRou_2308200_Christmas_v01.png" },
    { name: "Local Train", src: "/portfolio/light/VE2308-1_TanWeeRou_2308200_LocalTrain.png" },
    { name: "Mad Science", src: "/portfolio/light/VE2308-1_TanWeeRou_2308200_Madscience_v03.png" },
    { name: "Science Fiction", src: "/portfolio/light/VE2308-1_TanWeeRou_2308200_ScienceFiction.png" },
    { name: "Warzone", src: "/portfolio/light/VE2308-1_TanWeeRou_2308200_Warzone.png" }
  ];

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
                className="fixed inset-0 z-[190] bg-black/80 cursor-zoom-out"
                onClick={() => setLightbox(null)}
              />
              <div 
                className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center p-4 md:p-12"
                onClick={() => setLightbox(null)}
              >
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
        <header className="w-full pt-40 pb-24 px-6 md:px-16 max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] font-serif font-light tracking-tighter leading-[0.9] mb-8 text-white">
              <span className="italic">Light</span>ing
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl leading-relaxed">
              Sculpting scenes with mood, atmosphere, and photorealistic illumination to set the perfect emotional tone.
            </p>
          </motion.div>
        </header>

        <div className="w-full px-6 md:px-16 max-w-[1800px] mx-auto space-y-32 pb-48">
          
          {/* Section: Final Project */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center"
          >
            <h3 className="text-xs tracking-[0.5em] uppercase text-white/40 mb-12 border-b border-white/10 pb-4 w-full text-left">
              Final Project
            </h3>
            
            <motion.div 
              className="w-full max-w-6xl mx-auto h-full relative cursor-zoom-in flex items-center justify-center"
              style={{ opacity: lightbox === "/portfolio/light/VE2308-1_TanWeeRou_2308200_FinalProject_v01.mp4" ? 0 : 1 }}
              onClick={() => setLightbox("/portfolio/light/VE2308-1_TanWeeRou_2308200_FinalProject_v01.mp4")}
            >
              <motion.video 
                layoutId="/portfolio/light/VE2308-1_TanWeeRou_2308200_FinalProject_v01.mp4"
                whileHover={{ scale: 1.02, boxShadow: "0px 0px 60px 10px rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.98 }}
                src="/portfolio/light/VE2308-1_TanWeeRou_2308200_FinalProject_v01.mp4"
                className="w-full h-auto aspect-video object-cover rounded-xl border border-white/10 bg-black shadow-2xl cursor-zoom-in"
                autoPlay
                loop
                muted
                playsInline
              />
            </motion.div>
            
            <div className="max-w-3xl mx-auto mt-12 text-center font-light leading-relaxed space-y-8">
              <p className="text-white/50 text-lg">
                Cinematic lighting sequence established in <strong className="text-white/90 font-medium">Houdini</strong> and <strong className="text-white/90 font-medium">NukeX</strong>. Balancing key lights, fill, and volumetric scattering to enhance the narrative focus and depth.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm tracking-widest uppercase">
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white/70 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/houdini/white" alt="Houdini" className="w-4 h-4 opacity-70" />
                  Houdini
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white/70 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/nuke/white" alt="NukeX" className="w-4 h-4 opacity-70" />
                  NukeX
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section: Lighting Studies */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center"
          >
            <h3 className="text-xs tracking-[0.5em] uppercase text-white/40 mb-12 border-b border-white/10 pb-4 w-full text-left">
              Lighting Studies
            </h3>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 w-full max-w-7xl mx-auto">
              {images.map((img, idx) => (
                <div key={idx} className="relative group cursor-zoom-in break-inside-avoid">
                  <motion.div 
                    className="w-full relative overflow-hidden rounded-xl border border-white/10 bg-black"
                    style={{ opacity: lightbox === img.src ? 0 : 1 }}
                    onClick={() => setLightbox(img.src)}
                  >
                    <motion.img 
                      layoutId={img.src}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      src={img.src}
                      alt={img.name}
                      className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.div>
                  {/* Floating Title (appears on hover) */}
                  <div className="absolute inset-0 pointer-events-none flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm tracking-[0.2em] uppercase font-medium text-white drop-shadow-md bg-black/40 backdrop-blur-md px-3 py-1 rounded-md">
                      {img.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

        </div>
      </main>
    </ReactLenis>
  );
}
