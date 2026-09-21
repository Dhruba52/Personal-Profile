import React from 'react';
import { ChevronUp, Cpu, Heart, Shield, Terminal } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sfx } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const scrollToTop = () => {
    sfx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`relative z-10 border-t py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs transition-colors duration-300 ${
        isLight
          ? 'bg-slate-100/90 border-slate-200 text-slate-600'
          : 'bg-[#02050f]/90 border-cyan-500/20 text-slate-400'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & System Status */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <div className={`flex items-center space-x-2 font-bold tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <Cpu className="w-4 h-4 text-cyan-500" />
            <span>{personalInfo.codename}</span>
          </div>
          <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
            Engineered for GitHub Pages • Lightweight, responsive & static-ready
          </p>
        </div>

        {/* Status indicator */}
        <div className="flex items-center space-x-4 text-[11px]">
          <div className="flex items-center space-x-1.5 text-cyan-600 dark:text-cyan-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>CORE_ONLINE: 100%</span>
          </div>
          <span className={isLight ? 'text-slate-300' : 'text-slate-700'}>|</span>
          <span className={isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}>JSTU • EEE BATCH-05</span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => sfx.playHover()}
          className={`p-2.5 rounded-xl border transition-colors flex items-center space-x-1.5 ${
            isLight
              ? 'bg-white border-slate-300 text-slate-700 hover:text-cyan-700 hover:border-cyan-400 shadow-sm'
              : 'bg-slate-900 border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400'
          }`}
          title="Scroll back to top"
        >
          <ChevronUp className="w-4 h-4" />
          <span className="text-xs font-semibold">TOP</span>
        </button>
      </div>

      <div className={`max-w-7xl mx-auto mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] ${isLight ? 'border-slate-200 text-slate-500' : 'border-slate-900 text-slate-500'}`}>
        <div>
          © {new Date().getFullYear()} {personalInfo.name}. All systems operational.
        </div>
        <div className="mt-2 sm:mt-0">
          Designed with Cyberpunk & Robotics aesthetics.
        </div>
      </div>
    </footer>
  );
};
