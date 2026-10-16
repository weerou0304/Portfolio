"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we already loaded in this session to avoid showing it on every page navigation
    const hasLoaded = sessionStorage.getItem("app-loaded");
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    // Simulate cinematic loading
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Ease out the progress
      const remaining = 100 - currentProgress;
      const increment = Math.max(1, Math.random() * (remaining * 0.3));
      currentProgress += increment;
      
      if (currentProgress >= 99) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem("app-loaded", "true");
        }, 800);
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white"
        >
          {/* Logo or Title */}
          <motion.div 
            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-center">
              Tan <span className="italic">Wee Rou</span>
            </h1>
            <p className="text-[10px] md:text-xs tracking-[0.5em] text-white/40 uppercase text-center">
              Portfolio
            </p>
          </motion.div>

          {/* Progress Bar Container */}
          <div className="absolute bottom-16 md:bottom-24 w-48 md:w-80 flex flex-col items-center gap-4">
            {/* Number */}
            <div className="text-xs font-mono tracking-widest text-white/40 font-light">
              {progress.toString().padStart(3, '0')} %
            </div>
            
            {/* Line */}
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
