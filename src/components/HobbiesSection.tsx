import React from 'react';
import { Crown, Activity, Layers, Film, Tv, Cpu, Sparkles } from 'lucide-react';
import { hobbies } from '../data/portfolioData';
import { sfx } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

export const HobbiesSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const getHobbyIcon = (id: string) => {
    switch (id) {
      case 'chess':
        return Crown;
      case 'badminton':
        return Activity;
      case 'card-game-29':
        return Layers;
      case 'video-editing-hobby':
        return Film;
      case 'anime-hobby':
        return Tv;
      case 'technology-hobby':
      default:
        return Cpu;
    }
  };

  return (
    <section id="hobbies" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border transition-colors ${
              isLight
                ? 'bg-purple-100 text-purple-800 border-purple-300'
                : 'bg-purple-950/60 border-purple-500/30 text-purple-300'
            }`}
          >
            <span>&lt;MODULE_07: RECREATION_&_PASSIONS&gt;</span>
          </div>
          <h2
            className={`font-tech text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase transition-colors ${
              isLight ? 'text-slate-900' : 'text-white text-glow-purple'
            }`}
          >
            WHEN I'M NOT BUILDING THINGS...
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent my-3" />
          <p className={`font-mono text-xs sm:text-sm max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Activities that keep the mind sharp, reflexes fast, and curiosity alive.
          </p>
        </div>

        {/* Hobbies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby) => {
            const Icon = getHobbyIcon(hobby.id);

            return (
              <div
                key={hobby.id}
                id={`hobby-card-${hobby.id}`}
                onMouseEnter={() => sfx.playHover()}
                className={`p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1.5 relative group overflow-hidden ${
                  isLight
                    ? 'bg-white/95 border-slate-200/90 hover:border-cyan-400 hover:shadow-xl shadow-md shadow-slate-200/50'
                    : 'bg-[#081024]/85 border-purple-500/20 hover:border-cyan-400/80 hover:bg-[#0c1836] shadow-xl'
                }`}
              >
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-purple-500/10 group-hover:bg-cyan-500/15 rounded-full blur-2xl transition-all" />

                {/* Top row */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl border transition-colors ${
                      isLight
                        ? 'bg-cyan-50 border-cyan-200 text-cyan-700 group-hover:bg-cyan-100'
                        : 'bg-slate-900 border-slate-800 text-cyan-400 group-hover:text-cyan-300'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      isLight
                        ? 'bg-slate-100 text-slate-600 border-slate-200'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    LEISURE
                  </span>
                </div>

                {/* Name */}
                <h3
                  className={`text-xl font-tech font-bold transition-colors mb-1 ${
                    isLight ? 'text-slate-900 group-hover:text-cyan-700' : 'text-white group-hover:text-cyan-300'
                  }`}
                >
                  {hobby.name}
                </h3>

                {/* Tagline */}
                <div className={`text-xs font-mono font-semibold mb-3 ${isLight ? 'text-purple-700' : 'text-purple-300'}`}>
                  {hobby.tagline}
                </div>

                {/* Description */}
                <p className={`text-sm font-sans leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {hobby.description}
                </p>

                {/* Bottom interactive feedback */}
                <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono ${isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800 text-slate-400'}`}>
                  <span className="text-[11px]">Dynamic Focus</span>
                  <span className="text-cyan-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>Active</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
