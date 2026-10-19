import Link from "next/link";
import { Mail, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 py-12 md:py-16 px-6 md:px-16 z-50 relative mt-auto">
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left: Brand / Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-white/90">
            Tan <span className="font-serif italic text-white/50">Wee Rou</span>
          </h2>
          <p className="text-[10px] md:text-xs tracking-[0.2em] text-white/40 uppercase">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>

        {/* Right: Social Links */}
        <div className="flex items-center gap-6">
          <Link href="/resume" className="text-white/40 hover:text-white transition-colors duration-300 text-xs tracking-widest uppercase flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </Link>
          <a href="mailto:weerou0304@gmail.com" className="text-white/40 hover:text-white transition-colors duration-300">
            <span className="sr-only">Email</span>
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/tan-wee-rou-038749283" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-300" title="LinkedIn">
            <span className="sr-only">LinkedIn</span>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
