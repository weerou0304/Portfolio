"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink, ArrowLeft, FileText } from "lucide-react";
import { ReactLenis } from 'lenis/react';
import Link from "next/link";
import { ShaderBackground } from "@/components/ui/plasma-shader";

export default function ResumePage() {
  return (
    <ReactLenis root>
      <main className="relative min-h-screen w-full bg-black text-white selection:bg-white selection:text-black flex flex-col px-6 md:px-16 py-28 md:py-36 overflow-x-hidden">
        
        {/* Plasma Background */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <ShaderBackground className="w-full h-full" />
        </div>

        <div className="max-w-5xl mx-auto w-full relative z-10 flex flex-col gap-10">
          
          {/* Top Navigation & Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8"
          >
            <div>
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors mb-4"
              >
                <ArrowLeft className="size-3.5" /> Back to Home
              </Link>
              <h1 className="text-4xl md:text-6xl font-serif font-light tracking-tight">
                Curriculum <span className="italic">Vitae</span>
              </h1>
              <p className="text-white/50 text-sm tracking-widest uppercase mt-2">
                Tan Wee Rou &mdash; VFX Compositor
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="/resume.pdf"
                download="Tan_Wee_Rou_Compositor_Resume.pdf"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-all font-medium text-xs md:text-sm tracking-[0.2em] uppercase shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105 duration-300"
              >
                <Download className="size-4" />
                Download PDF
              </a>

              <a 
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all text-xs md:text-sm tracking-[0.2em] uppercase font-light text-white/80 hover:text-white"
              >
                <ExternalLink className="size-4" />
                Open in New Tab
              </a>
            </div>
          </motion.div>

          {/* Embedded Viewer Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex flex-col items-center"
          >
            {/* Desktop / Tablet Iframe Container */}
            <div className="w-full bg-[#111] rounded-2xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              
              {/* Window Bar */}
              <div className="px-6 py-4 bg-[#181818] border-b border-white/5 flex items-center justify-between text-xs text-white/40 tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 inline-block" />
                  <span className="ml-3 font-mono text-white/60">Tan_Wee_Rou_Resume.pdf</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/40">
                  <FileText className="size-3.5" /> A4 Single Page
                </div>
              </div>

              {/* PDF Preview Frame */}
              <div className="w-full min-h-[700px] md:min-h-[1050px] bg-white flex items-center justify-center">
                <iframe 
                  src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                  title="Tan Wee Rou Resume"
                  className="w-full h-[700px] md:h-[1050px] border-none"
                />
              </div>

            </div>

            {/* Mobile Fallback Card */}
            <div className="md:hidden mt-6 text-center text-xs text-white/40 tracking-widest uppercase">
              Tip: Tap "Open in New Tab" or "Download PDF" for the best mobile viewing experience.
            </div>
          </motion.div>

        </div>
      </main>
    </ReactLenis>
  );
}
