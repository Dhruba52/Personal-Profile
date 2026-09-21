import React from 'react';
import { personalPhilosophy } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const PhilosophySection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        {/* Cinematic Section Container */}
        <div
          className={`relative p-8 sm:p-14 rounded-3xl border backdrop-blur-2xl transition-all duration-300 overflow-hidden group ${
            isLight
              ? 'bg-gradient-to-b from-white/95 to-sky-50/70 border-sky-200/90 shadow-xl shadow-sky-900/10'
              : 'bg-gradient-to-b from-[#091530]/90 to-[#050b18]/95 border-cyan-500/30 shadow-2xl'
          }`}
        >
          {/* Subtle Cyber Corner Marks */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-500" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-500" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-500" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-500" />

          {/* Tagline */}
          <div
            className={`inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-mono mb-6 border transition-colors ${
              isLight
                ? 'bg-cyan-100 text-cyan-800 border-cyan-300'
                : 'bg-cyan-950/70 border-cyan-500/30 text-cyan-400'
            }`}
          >
            <span>// OPERATING_PRINCIPLE.CFG</span>
          </div>

          {/* Large Typography */}
          <h2
            className={`font-tech text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider mb-8 bg-clip-text text-transparent ${
              isLight
                ? 'bg-gradient-to-r from-cyan-800 via-sky-700 to-purple-800'
                : 'bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-400 text-glow-cyan'
            }`}
          >
            {personalPhilosophy.headline}
          </h2>

          {/* Philosophy Statement */}
          <p
            className={`font-display text-lg sm:text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed mb-8 ${
              isLight ? 'text-slate-800 font-medium' : 'text-slate-100/90 font-normal'
            }`}
          >
            &ldquo;{personalPhilosophy.quote}&rdquo;
          </p>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-6" />

          <div className={`font-mono text-xs uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Dhruba Acharjee • Jamalpur Science & Technology University
          </div>
        </div>
      </div>
    </section>
  );
};
