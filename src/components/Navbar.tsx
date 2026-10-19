"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Compositing", path: "/compositing" },
  { name: "Short Films", path: "/short-films" },
  { name: "Lighting", path: "/lighting" },
  { name: "CFX", path: "/cfx" },
  { name: "FX", path: "/fx" },
  { name: "About Me", path: "/about" },
  { name: "Resume", path: "/resume" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto max-w-[95vw] md:max-w-max w-full md:w-auto">
      <div className="flex items-center px-2 py-1.5 md:p-2 rounded-full backdrop-blur-xl bg-black/40 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] w-full">
        
        {/* Scrollable Links Area */}
        <div 
          ref={scrollRef}
          className="flex items-center gap-1 overflow-x-auto no-scroll scroll-smooth w-full" 
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          <style>{`.no-scroll::-webkit-scrollbar { display: none; }`}</style>
          
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className="relative px-3 md:px-5 py-2 md:py-2.5 rounded-full text-[11px] md:text-sm font-medium tracking-wide transition-colors whitespace-nowrap shrink-0"
              >
                <span className={cn(
                  "relative z-10 transition-colors duration-300",
                  isActive ? "text-black" : "text-white/60 hover:text-white"
                )}>
                  {item.name}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="active-nav-bg"
                    className="absolute inset-0 bg-white rounded-full z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Fixed Theme Toggle Button on the Right */}
        <div className="shrink-0 pl-1 md:pl-2 ml-1 md:ml-2 border-l border-white/10">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 md:p-2.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

      </div>
    </nav>
  );
}
