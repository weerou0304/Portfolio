"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { ReactLenis } from 'lenis/react';
import { ShaderBackground } from "@/components/ui/shader-background";

export default function CompositingPage() {
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
            <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-serif font-light tracking-tighter leading-[0.9] mb-8 text-white">
              <span className="italic">Compos</span>iting
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl leading-relaxed">
              Seamlessly integrating computer-generated elements with live-action footage to create believable, striking visual narratives.
            </p>
          </motion.div>
        </header>

        <div className="w-full px-6 md:px-16 max-w-[1800px] mx-auto space-y-32 pb-48">
          
          {/* Section 1: Final Project */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h3 className="text-xs tracking-[0.5em] uppercase text-white/40 mb-12 border-b border-white/10 pb-4">
              Final Project
            </h3>
            
            <div className="w-full max-w-6xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl relative">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/atvFDvUej2g" 
                title="Compositing Final Project v02" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              />
            </div>
            
            <div className="max-w-3xl mx-auto mt-12 text-center font-light leading-relaxed space-y-8">
              <p className="text-white/50 text-lg">
                Camera tracking and solve were handled in <strong className="text-white/90 font-medium">PFTrack</strong>, with CG elements generated using <strong className="text-white/90 font-medium">Maya</strong>. The full sequence was then seamlessly composited in <strong className="text-white/90 font-medium">Nuke</strong>.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm tracking-widest uppercase">
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white/70 flex items-center gap-2">
                  PFTrack
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white/70 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/autodeskmaya/white" alt="Maya" className="w-4 h-4 opacity-70" />
                  Maya
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white/70 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/nuke/white" alt="Nuke" className="w-4 h-4 opacity-70" />
                  Nuke
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 2: Matte Painting Project */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h3 className="text-xs tracking-[0.5em] uppercase text-white/40 mb-12 border-b border-white/10 pb-4">
              Final Assignment Breakdown
            </h3>
            
            <motion.div 
              className="w-full max-w-6xl mx-auto h-full relative cursor-zoom-in flex items-center justify-center"
              style={{ opacity: lightbox === "/portfolio/compositing/VE2308-1_TanWeeRou_2308200_FinalAssignment_breakdown_V01.mp4" ? 0 : 1 }}
              onClick={() => setLightbox("/portfolio/compositing/VE2308-1_TanWeeRou_2308200_FinalAssignment_breakdown_V01.mp4")}
            >
              <motion.video 
                layoutId="/portfolio/compositing/VE2308-1_TanWeeRou_2308200_FinalAssignment_breakdown_V01.mp4"
                whileHover={{ scale: 1.02, boxShadow: "0px 0px 60px 10px rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.98 }}
                src="/portfolio/compositing/VE2308-1_TanWeeRou_2308200_FinalAssignment_breakdown_V01.mp4"
                className="w-full h-auto aspect-video object-cover rounded-xl border border-white/10 bg-black shadow-2xl cursor-zoom-in"
                autoPlay
                loop
                muted
                playsInline
              />
            </motion.div>
            
            <div className="max-w-3xl mx-auto mt-12 text-center font-light leading-relaxed space-y-8">
              <p className="text-white/50 text-lg">
                The 3D assets and lighting setups were built in <strong className="text-white/90 font-medium">Maya</strong>. Advanced multipass compositing, grading, and final integration were executed in <strong className="text-white/90 font-medium">NukeX</strong>.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm tracking-widest uppercase">
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white/70 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/autodeskmaya/white" alt="Maya" className="w-4 h-4 opacity-70" />
                  Maya
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white/70 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/nuke/white" alt="NukeX" className="w-4 h-4 opacity-70" />
                  NukeX
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Environment */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h3 className="text-xs tracking-[0.5em] uppercase text-white/40 mb-12 border-b border-white/10 pb-4">
              Terrain
            </h3>
            
            <motion.div 
              whileHover={{ scale: 1.02, boxShadow: "0px 0px 60px 10px rgba(255,255,255,0.15)" }}
              className="w-full max-w-6xl mx-auto border border-white/10 rounded-xl bg-black shadow-2xl p-2 md:p-4 transition-shadow"
            >
              <BeforeAfterSlider 
                beforeImage="/portfolio/compositing/before.jpg" 
                afterImage="/portfolio/compositing/after.jpg" 
              />
            </motion.div>

            <div className="max-w-3xl mx-auto mt-12 text-center font-light leading-relaxed space-y-8">
              <p className="text-white/50 text-lg">
                The entire terrain and environment were generated from scratch entirely in <strong className="text-white/90 font-medium">Houdini</strong>. The raw CG render was then brought into <strong className="text-white/90 font-medium">NukeX</strong> for final compositing, where atmospherics, grading, and volumetric light scattering were seamlessly integrated.
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
              
              <p className="text-white/40 text-sm italic">
                * Drag the slider to compare the raw CG render against the final composite.
              </p>
            </div>
          </motion.section>

          {/* Section 2: Card */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h3 className="text-xs tracking-[0.5em] uppercase text-white/40 mb-12 border-b border-white/10 pb-4">
              Card Integration
            </h3>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 w-full mx-auto items-center">
              
              {/* Slider side */}
              <motion.div 
                whileHover={{ scale: 1.02, boxShadow: "0px 0px 60px 10px rgba(255,255,255,0.15)" }}
                className="w-full h-full border border-white/10 rounded-xl bg-black shadow-2xl p-2 md:p-4 flex flex-col transition-shadow"
              >
                <BeforeAfterSlider 
                  beforeImage="/portfolio/compositing/card_before.png" 
                  afterImage="/portfolio/compositing/card_after.png" 
                />
              </motion.div>

              {/* Video side */}
              <motion.div 
                className="w-full h-full relative cursor-zoom-in flex items-center"
                style={{ opacity: lightbox === "/portfolio/compositing/VE2308-1_TanWeeRou_2308200_A02_v02.mp4" ? 0 : 1 }}
                onClick={() => setLightbox("/portfolio/compositing/VE2308-1_TanWeeRou_2308200_A02_v02.mp4")}
              >
                <motion.video 
                  layoutId="/portfolio/compositing/VE2308-1_TanWeeRou_2308200_A02_v02.mp4"
                  whileHover={{ scale: 1.02, boxShadow: "0px 0px 60px 10px rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  src="/portfolio/compositing/VE2308-1_TanWeeRou_2308200_A02_v02.mp4"
                  className="w-full h-auto aspect-video object-cover rounded-xl border border-white/10 bg-black shadow-2xl cursor-zoom-in"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </motion.div>

            </div>

            <div className="max-w-3xl mx-auto mt-12 text-center font-light leading-relaxed space-y-8">
              <p className="text-white/50 text-lg">
                The 3D card elements were modeled, textured, and rendered in <strong className="text-white/90 font-medium">Maya</strong>, then seamlessly integrated with the background plate in <strong className="text-white/90 font-medium">NukeX</strong> using multi-pass compositing techniques.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm tracking-widest uppercase">
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white/70 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/autodeskmaya/white" alt="Maya" className="w-4 h-4 opacity-70" />
                  Maya
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white/70 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/nuke/white" alt="NukeX" className="w-4 h-4 opacity-70" />
                  NukeX
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Flower */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h3 className="text-xs tracking-[0.5em] uppercase text-white/40 mb-12 border-b border-white/10 pb-4">
              Flower Integration
            </h3>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 w-full mx-auto items-center">
              
              {/* Slider side */}
              <motion.div 
                whileHover={{ scale: 1.02, boxShadow: "0px 0px 60px 10px rgba(255,255,255,0.15)" }}
                className="w-full h-full border border-white/10 rounded-xl bg-black shadow-2xl p-2 md:p-4 flex flex-col transition-shadow"
              >
                <BeforeAfterSlider 
                  beforeImage="/portfolio/compositing/flower_before.png" 
                  afterImage="/portfolio/compositing/flower_after.png" 
                />
              </motion.div>

              {/* Video side */}
              <motion.div 
                className="w-full h-full relative cursor-zoom-in flex items-center"
                style={{ opacity: lightbox === "/portfolio/compositing/fx01_v03.mp4" ? 0 : 1 }}
                onClick={() => setLightbox("/portfolio/compositing/fx01_v03.mp4")}
              >
                <motion.video 
                  layoutId="/portfolio/compositing/fx01_v03.mp4"
                  whileHover={{ scale: 1.02, boxShadow: "0px 0px 60px 10px rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  src="/portfolio/compositing/fx01_v03.mp4"
                  className="w-full h-auto aspect-video object-cover rounded-xl border border-white/10 bg-black shadow-2xl cursor-zoom-in"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </motion.div>

            </div>

            <div className="max-w-3xl mx-auto mt-12 text-center font-light leading-relaxed space-y-8">
              <p className="text-white/50 text-lg">
                This intricate flower setup was handled in <strong className="text-white/90 font-medium">Maya</strong> for realistic shading and lighting. It was then brought into <strong className="text-white/90 font-medium">NukeX</strong> for advanced depth of field matching, color grading, and final scene integration.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm tracking-widest uppercase">
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white/70 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/autodeskmaya/white" alt="Maya" className="w-4 h-4 opacity-70" />
                  Maya
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white/70 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/nuke/white" alt="NukeX" className="w-4 h-4 opacity-70" />
                  NukeX
                </div>
              </div>
            </div>
          </motion.section>

        </div>
      </main>
    </ReactLenis>
  );
}
