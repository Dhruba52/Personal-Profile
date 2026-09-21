import React from 'react';
import { Trophy, Code, Bot, Calendar, Sparkles } from 'lucide-react';
import { competitions } from '../data/portfolioData';
import { sfx } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

export const CompetitionsSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section id="competitions" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border transition-colors ${
              isLight
                ? 'bg-purple-100 text-purple-800 border-purple-300'
                : 'bg-purple-950/60 border-purple-500/30 text-purple-300'
            }`}
          >
            <span>&lt;MODULE_05: ARENA_&_EVENTS&gt;</span>
          </div>
          <h2
            className={`font-tech text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase transition-colors ${
              isLight ? 'text-slate-900' : 'text-white text-glow-purple'
            }`}
          >
            COMPETITIONS & EVENTS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent my-3" />
          <p className={`font-mono text-xs sm:text-sm max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Hands-on exhibition, project showcases, and competitive engineering participation.
          </p>
        </div>

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitions.map((comp) => {
            const isRobotics = comp.id === 'robofusion-uftb';
            const Icon = isRobotics ? Bot : Code;

            return (
              <div
                key={comp.id}
                id={`comp-card-${comp.id}`}
                onMouseEnter={() => sfx.playHover()}
                className={`p-6 rounded-2xl border transition-all duration-300 relative group overflow-hidden ${
                  isLight
                    ? 'bg-white/95 border-slate-200/90 hover:border-purple-400 shadow-md hover:shadow-xl shadow-slate-200/50'
                    : 'bg-[#081024]/90 border-purple-500/20 hover:border-purple-400/60 hover:bg-[#0d1838] shadow-xl'
                }`}
              >
                {/* Tech Bracket */}
                <div
                  className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 transition-colors ${
                    isLight ? 'border-purple-300 group-hover:border-purple-500' : 'border-purple-500/40 group-hover:border-purple-400'
                  }`}
                />

                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl border transition-colors ${
                      isLight
                        ? 'bg-purple-50 border-purple-200 text-purple-700'
                        : 'bg-slate-900 border-slate-800 text-purple-400 group-hover:text-purple-300'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                      isLight
                        ? 'bg-purple-100 text-purple-800 border-purple-300'
                        : 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
                    }`}
                  >
                    {comp.type}
                  </span>
                </div>

                <h3
                  className={`text-2xl font-tech font-bold transition-colors mb-2 ${
                    isLight ? 'text-slate-900 group-hover:text-purple-700' : 'text-white group-hover:text-purple-300'
                  }`}
                >
                  {comp.name}
                </h3>

                <p className={`text-sm font-sans leading-relaxed mb-4 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {comp.description}
                </p>

                <div className={`pt-3 border-t flex items-center justify-between text-xs font-mono ${isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800 text-slate-400'}`}>
                  <span>Category: Practical Exhibition</span>
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Active Engagement</span>
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
