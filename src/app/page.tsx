"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Phone, FileText, Download } from "lucide-react";
import { useState, useRef } from "react";
import { ReactLenis } from 'lenis/react';
import { useRouter } from "next/navigation";
import Link from "next/link";
import FancyButton from '@/components/ui/shiny-button';

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Parallax fade effect for the background video
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.1]);

  const skills = [
    { name: 'Houdini', icon: 'https://cdn.simpleicons.org/houdini/white' },
    { name: 'NukeX', icon: 'https://cdn.simpleicons.org/nuke/white' },
    { name: 'Maya', icon: 'https://cdn.simpleicons.org/autodeskmaya/white' },
    { name: 'Premiere Pro', textIcon: 'Pr' },
    { name: 'After Effects', textIcon: 'Ae' }
  ];

  return (
    <ReactLenis root>
      <main ref={containerRef} className="relative min-h-screen w-full bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
        
        {/* Fixed Cinematic Background Video */}
        <motion.div style={{ opacity: videoOpacity }} className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
          <video
            src="/portfolio/home/VE2308_TanWeeRou_2308200.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-black via-black/80 to-transparent" />
        </motion.div>

        <article className="relative z-10 w-full pb-48">
          <AnimatePresence>
            {isLightboxOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-0 z-[190] bg-black/90 cursor-zoom-out"
                  onClick={() => setIsLightboxOpen(false)}
                />
                <div 
                  className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center p-4 md:p-12"
                  onClick={() => setIsLightboxOpen(false)}
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ boxShadow: "0px 0px 80px 20px rgba(255,255,255,0.2)" }}
                    className="w-full max-w-6xl aspect-video rounded-xl overflow-hidden pointer-events-auto bg-black" 
                  >
                    <video 
                      src="/portfolio/home/VE2308_TanWeeRou_2308200.mp4" 
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>
          
          {/* HERO SECTION */}
          <section className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 pt-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <h2 className="text-sm md:text-base tracking-[0.5em] text-white/60 uppercase mb-6">
                Tan Wee Rou
              </h2>
              <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] font-serif font-light tracking-tighter leading-[0.9]">
                <span className="italic">Port</span>folio
              </h1>
              
              <p className="mt-12 text-lg md:text-xl text-white/70 max-w-2xl font-light leading-relaxed mb-10">
                Hi, I'm Wee Rou. Welcome to my portfolio! I love bringing stories to life through digital compositing and visual effects. Feel free to scroll down and explore my work.
              </p>

              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <button 
                  onClick={() => setIsLightboxOpen(true)}
                  className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-transform hover:scale-105 duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                >
                  <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center pl-1 group-hover:bg-black/20 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium tracking-[0.2em] uppercase">Play Showreel</span>
                </button>

                <a 
                  href="/resume"
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-full border border-white/20 text-sm font-light tracking-[0.2em] uppercase text-white/80 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all"
                >
                  <FileText className="size-4" />
                  Resume
                </a>
                
                <a 
                  href="/about"
                  className="px-6 py-4 text-sm font-light tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
                >
                  About Me
                </a>
              </div>
            </motion.div>
          </section>

          {/* EXPERTISE SECTION (Horizontal Marquee) */}
          <section className="w-full py-24 md:py-32 overflow-hidden bg-black/50 backdrop-blur-md border-b border-white/5">
            <div className="px-8 md:px-24 mb-16 max-w-5xl">
              <h3 className="text-xs tracking-[0.5em] uppercase text-white/40 border-b border-white/10 pb-4">Areas of Expertise</h3>
            </div>
            
            <div className="relative w-full flex overflow-hidden mask-image-x">
              <motion.div 
                className="flex whitespace-nowrap gap-12 md:gap-24 items-center px-8"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 30, repeat: Infinity }}
              >
                {[...skills, ...skills, ...skills, ...skills].map((skill, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-4 text-xl md:text-2xl lg:text-3xl font-light text-white/70 hover:text-white transition-colors cursor-default"
                  >
                    {skill.icon && <img src={skill.icon} alt={skill.name} className="w-8 h-8 md:w-10 md:h-10 opacity-70" />}
                    {skill.textIcon && (
                      <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded bg-[#9999FF]/20 text-[#9999FF] text-sm md:text-base font-bold font-sans not-italic">
                        {skill.textIcon}
                      </div>
                    )}
                    {skill.name}
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* JOURNEY (Timeline) */}
          <section className="w-full py-24 md:py-32 px-8 md:px-24 relative">
            <div className="max-w-5xl">
              <h3 className="text-xs tracking-[0.5em] uppercase text-white/40 mb-16 border-b border-white/10 pb-4">Journey</h3>
              
              <div className="relative border-l border-white/20 ml-2 md:ml-4 space-y-24 py-8">
                
                {/* Event 1 */}
                <motion.div 
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
                  className="relative pl-10 md:pl-16 transition-opacity"
                >
                  <motion.div 
                    initial={{ backgroundColor: "rgba(255,255,255,0.2)", boxShadow: "0px 0px 0px rgba(255,255,255,0)" }}
                    whileInView={{ backgroundColor: "rgba(255,255,255,1)", boxShadow: "0px 0px 15px rgba(255,255,255,0.8)" }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
                    className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full z-10" 
                  />
                  
                  <div className="text-white/50 text-xs tracking-widest uppercase mb-4">
                    Jan 2023 — Jul 2023 <span className="mx-2">|</span> Cheras
                  </div>
                  <h4 className="text-2xl md:text-3xl font-light mb-2">Sales Executive, Propnex Realty</h4>
                  <ul className="space-y-4 text-white/70 font-light leading-relaxed list-disc list-outside ml-4 mt-6 max-w-2xl">
                    <li>Talked with clients regularly to understand their needs and provide suitable solutions.</li>
                    <li>Followed up consistently to build good relationships and hit sales goals.</li>
                    <li>Worked with teammates to improve sales approaches and find new clients.</li>
                  </ul>
                </motion.div>

                        {/* Event 2 */}
                <motion.div 
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
                  className="relative pl-10 md:pl-16 transition-opacity"
                >
                  <motion.div 
                    initial={{ backgroundColor: "rgba(255,255,255,0.2)", boxShadow: "0px 0px 0px rgba(255,255,255,0)" }}
                    whileInView={{ backgroundColor: "rgba(255,255,255,1)", boxShadow: "0px 0px 15px rgba(255,255,255,0.8)" }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
                    className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full z-10" 
                  />
                  
                  <div className="text-white/40 text-[10px] md:text-xs tracking-widest uppercase mb-3">
                    Aug 2023 <span className="mx-2">|</span> Bandar Sunway
                  </div>
                  <h4 className="text-xl md:text-2xl font-light mb-1 text-white/80">Enrolled at The One Academy</h4>
                  <ul className="space-y-2 text-white/50 text-sm font-light leading-relaxed list-disc list-outside ml-4 mt-3 max-w-2xl">
                    <li>Began journey in Visual Effects.</li>
                  </ul>
                </motion.div>

                {/* Event 3 */}
                <motion.div 
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
                  className="relative pl-10 md:pl-16 transition-opacity"
                >
                  <motion.div 
                    initial={{ backgroundColor: "rgba(255,255,255,0.2)", boxShadow: "0px 0px 0px rgba(255,255,255,0)" }}
                    whileInView={{ backgroundColor: "rgba(255,255,255,1)", boxShadow: "0px 0px 15px rgba(255,255,255,0.8)" }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
                    className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full z-10" 
                  />
                  
                  <div className="text-white/50 text-xs tracking-widest uppercase mb-4">
                    Apr 2024 — Present <span className="mx-2">|</span> Subang Jaya
                  </div>
                  <h4 className="text-2xl md:text-3xl font-light mb-2">Design Team, Stun PC Trading</h4>
                  <ul className="space-y-4 text-white/70 font-light leading-relaxed list-disc list-outside ml-4 mt-6 max-w-2xl">
                    <li>Designed banners and branding visuals for online platforms.</li>
                    <li>Helped build brand identity and improved overall brand awareness.</li>
                  </ul>
                </motion.div>

                {/* Event 4 */}
                <motion.div 
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
                  className="relative pl-10 md:pl-16 transition-opacity"
                >
                  <motion.div 
                    initial={{ backgroundColor: "rgba(255,255,255,0.2)", boxShadow: "0px 0px 0px rgba(255,255,255,0)" }}
                    whileInView={{ backgroundColor: "rgba(255,255,255,1)", boxShadow: "0px 0px 15px rgba(255,255,255,0.8)" }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
                    className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full z-10" 
                  />
                  
                  <div className="text-white/50 text-xs tracking-widest uppercase mb-4">
                    Jul 2026 — Aug 2026 <span className="mx-2">|</span> Subang Jaya
                  </div>
                  <h4 className="text-2xl md:text-3xl font-light mb-2">Video Editor (Freelance)</h4>
                  <ul className="space-y-4 text-white/70 font-light leading-relaxed list-disc list-outside ml-4 mt-6 max-w-2xl">
                    <li>Created short-form promo and social media videos from start to finish.</li>
                    <li>Communicated with clients to understand their needs and adjusted videos based on feedback.</li>
                    <li>Handled multiple projects at the same time and always delivered on time.</li>
                  </ul>
                </motion.div>

                {/* Event 5 */}
                <motion.div 
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
                  className="relative pl-10 md:pl-16 transition-opacity"
                >
                  <motion.div 
                    initial={{ backgroundColor: "rgba(255,255,255,0.2)", boxShadow: "0px 0px 0px rgba(255,255,255,0)" }}
                    whileInView={{ backgroundColor: "rgba(255,255,255,1)", boxShadow: "0px 0px 15px rgba(255,255,255,0.8)" }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
                    className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full z-10" 
                  />
                  
                  <div className="text-white/40 text-[10px] md:text-xs tracking-widest uppercase mb-3">
                    Aug 2026 <span className="mx-2">|</span> Bandar Sunway
                  </div>
                  <h4 className="text-xl md:text-2xl font-light mb-1 text-white/80">Graduated from The One Academy</h4>
                  <ul className="space-y-2 text-white/50 text-sm font-light leading-relaxed list-disc list-outside ml-4 mt-3 max-w-2xl">
                    <li>Completed Diploma in Visual Effects.</li>
                  </ul>
                </motion.div>

                              </div>
            </div>
          </section>

          {/* PORTFOLIO NAVIGATION */}
          <section id="works" className="w-full py-24 md:py-32 px-8 md:px-24">
            <div className="max-w-5xl">
              <h3 className="text-xs tracking-[0.5em] uppercase text-white/40 mb-12 border-b border-white/10 pb-4">Selected Works</h3>
              <div className="flex flex-col gap-8">
                {[
                  { title: 'Compositing', desc: 'Digital Compositing', href: '/compositing', variant: 'red' as const },
                  { title: 'Short Films', desc: 'Cinematic Storytelling', href: '/short-films', variant: 'default' as const },
                  { title: 'Lighting', desc: 'Cinematic Lighting', href: '/lighting', variant: 'green' as const },
                  { title: 'CFX', desc: 'Character FX & Simulation', href: '/cfx', variant: 'default' as const },
                  { title: 'FX', desc: 'Visual Effects & Dynamics', href: '/fx', variant: 'indigo' as const }
                ].map((item, i) => (
                  <Link href={item.href} key={item.title}>
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="group flex items-center justify-between p-8 md:p-12 border border-white/10 hover:border-white/30 bg-black/40 backdrop-blur-md rounded-2xl transition-all hover:bg-white/5"
                    >
                      <div>
                        <h4 className="text-4xl md:text-6xl font-light mb-4">{item.title}</h4>
                        <p className="text-white/50 text-sm md:text-base tracking-widest uppercase">{item.desc}</p>
                      </div>
                      
                      <div className="shrink-0 ml-4 pointer-events-none">
                        <FancyButton 
                          icon={<ArrowRight className="size-4 md:size-5 text-white" />} 
                          variant={item.variant}
                        />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* EDUCATION & CONTACT */}
          <section className="w-full py-24 md:py-32 px-8 md:px-24 bg-black/50 backdrop-blur-md border-t border-white/5">
            <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-xs tracking-[0.5em] uppercase text-white/40 mb-12 border-b border-white/10 pb-4">Education</h3>
                <h4 className="text-2xl font-light mb-2">The One Academy</h4>
                <div className="text-white/50 text-sm tracking-widest uppercase mb-4">
                  Diploma in Visual Effects
                </div>
                
                <h3 className="text-xs tracking-[0.5em] uppercase text-white/40 mb-8 mt-20 border-b border-white/10 pb-4">Languages</h3>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center text-white/80 gap-2">
                    <span className="text-xl font-light">Chinese</span>
                    <span className="text-white/40 text-xs tracking-widest uppercase">Native</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center text-white/80 gap-2">
                    <span className="text-xl font-light">English</span>
                    <span className="text-white/40 text-xs tracking-widest uppercase">Conversational</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center text-white/80 gap-2">
                    <span className="text-xl font-light">Malay</span>
                    <span className="text-white/40 text-xs tracking-widest uppercase">Basic</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xs tracking-[0.5em] uppercase text-white/40 mb-12 border-b border-white/10 pb-4">Contact</h3>
                <div className="space-y-8 text-white/70 font-light">
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=weerou0304@gmail.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 hover:text-white transition-colors group"
                  >
                    <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                      <Mail className="size-5" />
                    </div>
                    <span className="text-lg">weerou0304@gmail.com</span>
                  </a>
                  <div className="flex items-center gap-6 group">
                    <div className="p-4 rounded-full bg-white/5">
                      <Phone className="size-5" />
                    </div>
                    <span className="text-lg">012-6618172</span>
                  </div>
                  <a 
                    href="/resume"
                    className="flex items-center gap-6 hover:text-white transition-colors group"
                  >
                    <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                      <FileText className="size-5" />
                    </div>
                    <span className="text-lg">Curriculum Vitae / Resume</span>
                  </a>
                </div>
              </motion.div>

            </div>
          </section>

        </article>
      </main>
    </ReactLenis>
  );
}
