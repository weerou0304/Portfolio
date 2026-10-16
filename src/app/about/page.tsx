"use client";

import { motion } from "framer-motion";
import { Mail, Download } from "lucide-react";
import { ReactLenis } from 'lenis/react';

import { ShaderBackground } from "@/components/ui/plasma-shader";

export default function AboutPage() {
  return (
    <ReactLenis root>
      <main className="relative min-h-screen w-full bg-black text-white selection:bg-white selection:text-black flex flex-col justify-center px-8 md:px-24 py-32 overflow-hidden">
        
        {/* Plasma Background */}
        <div className="absolute inset-0 z-0 opacity-50">
          <ShaderBackground className="w-full h-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto w-full relative z-10"
        >
          <h2 className="text-sm md:text-base tracking-[0.5em] text-white/40 uppercase mb-8">
            About Me
          </h2>
          
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif font-light tracking-tight leading-[1.1] mb-16 text-white">
            I'm a <span className="italic">fresh graduate</span> currently looking for full-time opportunities as a <br className="hidden md:block"/>
            <span className="text-white">VFX Compositor.</span>
          </h1>
          
          <div className="space-y-8 text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-3xl">
            <p>
              I am passionate about digital compositing and visual storytelling. Through my hands-on project experience, I've developed a solid foundation in NukeX, Maya, and Houdini.
            </p>
            <p>
              I'm always eager to learn, adapt, and collaborate with creative teams to bring imaginative ideas to life on screen. If you're looking for a dedicated junior artist who is ready to contribute and grow, I'd love to connect.
            </p>
          </div>

          <motion.div 
            className="mt-20 flex flex-wrap items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=weerou0304@gmail.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-6 p-2 pr-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              <div className="p-4 rounded-full bg-white text-black group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]">
                <Mail className="size-5" />
              </div>
              <span className="text-sm md:text-base tracking-[0.2em] uppercase font-light">Contact Me</span>
            </a>

            <a 
              href="https://www.linkedin.com/in/tan-wee-rou-038749283"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-6 p-2 pr-8 rounded-full bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              <div className="p-4 rounded-full bg-black/50 text-white border border-white/20 group-hover:bg-[#0A66C2] group-hover:border-[#0A66C2] group-hover:scale-110 transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="text-sm md:text-base tracking-[0.2em] uppercase font-light">LinkedIn</span>
            </a>

            <a 
              href="/resume.pdf"
              onClick={(e) => {
                e.preventDefault();
                alert("Resume document is not uploaded yet. You can replace '/public/resume.pdf' when ready!");
              }}
              className="group inline-flex items-center gap-6 p-2 pr-8 rounded-full bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              <div className="p-4 rounded-full bg-black/50 text-white border border-white/20 group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300">
                <Download className="size-5" />
              </div>
              <span className="text-sm md:text-base tracking-[0.2em] uppercase font-light text-white/70 group-hover:text-white transition-colors">Download CV</span>
            </a>
          </motion.div>

        </motion.div>
      </main>
    </ReactLenis>
  );
}
