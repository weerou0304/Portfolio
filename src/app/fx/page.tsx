"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactLenis } from 'lenis/react';
import { ShaderBackground } from "@/components/ui/shader-background";

export default function FXPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

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
                <motion.video 
                  layoutId={lightbox}
                  src={lightbox} 
                  autoPlay loop controls
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ boxShadow: "0px 0px 80px 20px rgba(255,255,255,0.2)" }}
                  className="max-w-full max-h-full rounded-lg pointer-events-auto bg-black/50" 
                />
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
              <span className="italic">Effects</span> (FX)
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl leading-relaxed">
              Designing dynamic simulations, explosive destruction, and intricate procedural systems to bring chaotic beauty into digital worlds.
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
              FX Final Project
            </h3>
            
            <motion.div 
              className="w-full max-w-6xl mx-auto h-full relative cursor-zoom-in flex items-center justify-center"
              style={{ opacity: lightbox === "/portfolio/fx/VE2308-1_TanWeeRou_2308200_FInalProject_v01.mp4" ? 0 : 1 }}
              onClick={() => setLightbox("/portfolio/fx/VE2308-1_TanWeeRou_2308200_FInalProject_v01.mp4")}
            >
              <motion.video 
                layoutId="/portfolio/fx/VE2308-1_TanWeeRou_2308200_FInalProject_v01.mp4"
                whileHover={{ scale: 1.02, boxShadow: "0px 0px 60px 10px rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.98 }}
                src="/portfolio/fx/VE2308-1_TanWeeRou_2308200_FInalProject_v01.mp4"
                className="w-full h-auto aspect-video object-cover rounded-xl border border-white/10 bg-black shadow-2xl cursor-zoom-in"
                autoPlay
                loop
                muted
                playsInline
              />
            </motion.div>
            
            <div className="max-w-3xl mx-auto mt-12 text-center font-light leading-relaxed space-y-8">
              <p className="text-white/50 text-lg">
                Complex fluid dynamics, particle simulations, and rigid body destructions designed to interact seamlessly with the live-action plate. Procedurally generated in <strong className="text-white/90 font-medium">Houdini</strong> and rendered with <strong className="text-white/90 font-medium">Mantra/Karma</strong>.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm tracking-widest uppercase">
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white/70 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/houdini/white" alt="Houdini" className="w-4 h-4 opacity-70" />
                  Houdini
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white/70 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/nuke/white" alt="Nuke" className="w-4 h-4 opacity-70" />
                  Nuke
                </div>
              </div>
            </div>
          </motion.section>

        </div>
      </main>
    </ReactLenis>
  );
}
