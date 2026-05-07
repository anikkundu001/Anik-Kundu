import { motion } from "motion/react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-white/5 bg-dark relative overflow-hidden">
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8 text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">
            <a href="https://github.com/anikkundu001" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/anik-kundu-8233b02b2/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://x.com/ANIK_KUNDU_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="opacity-40">LOC:</span>
              <span className="text-zinc-300 font-medium">Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="opacity-40">EMAIL:</span>
              <span className="text-zinc-300 font-medium">kunduanik406@gmail.com</span>
            </div>
            <div className="text-[10px] text-zinc-600 font-mono tracking-tighter">
              SYSTEM_V2.0.0_STABLE
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
