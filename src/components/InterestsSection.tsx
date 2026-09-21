import React from 'react';
import { Bot, Brain, Code2, Film, FileText, BarChart3, Sparkles } from 'lucide-react';
import { interestsSkills } from '../data/portfolioData';
import { sfx } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

export const InterestsSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const iconMap: Record<string, React.ElementType> = {
    Bot,
    Brain,
    Code2,
    Film,
    FileText,
    BarChart3,
  };

  const getStatusBadge = (status: string) => {
    if (isLight) {
      switch (status) {
        case 'Exploring':
          return {
            bg: 'bg-cyan-100/90',
            text: 'text-cyan-800',
            border: 'border-cyan-300',
            dot: 'bg-cyan-600',
          };
        case 'Learning':
          return {
            bg: 'bg-purple-100/90',
            text: 'text-purple-800',
            border: 'border-purple-300',
            dot: 'bg-purple-600',
          };
        case 'Interested':
        default:
          return {
            bg: 'bg-emerald-100/90',
            text: 'text-emerald-800',
            border: 'border-emerald-300',
            dot: 'bg-emerald-600',
          };
      }
    }

    switch (status) {
      case 'Exploring':
        return {
          bg: 'bg-cyan-950/80',
          text: 'text-cyan-300',
          border: 'border-cyan-500/40',
          dot: 'bg-cyan-400',
        };
      case 'Learning':
        return {
          bg: 'bg-purple-950/80',
          text: 'text-purple-300',
          border: 'border-purple-500/40',
          dot: 'bg-purple-400',
        };
      case 'Interested':
      default:
        return {
          bg: 'bg-emerald-950/80',
          text: 'text-emerald-300',
          border: 'border-emerald-500/40',
          dot: 'bg-emerald-400',
        };
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border transition-colors ${
              isLight
                ? 'bg-purple-100 text-purple-800 border-purple-300'
                : 'bg-purple-950/60 border-purple-500/30 text-purple-300'
            }`}
          >
            <span>&lt;MODULE_02: CURIOSITY_ENGINE&gt;</span>
          </div>
          <h2
            className={`font-tech text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase transition-colors ${
              isLight ? 'text-slate-900' : 'text-white text-glow-purple'
            }`}
          >
            WHAT I LOVE TO EXPLORE
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent my-3" />
          <p className={`font-mono text-xs sm:text-sm max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Core technical interests, creative passions, and ongoing learning trajectories.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interestsSkills.map((item) => {
            const Icon = iconMap[item.icon] || Sparkles;
            const badgeStyle = getStatusBadge(item.status);

            return (
              <div
                key={item.id}
                id={`interest-card-${item.id}`}
                onMouseEnter={() => sfx.playHover()}
                className={`rounded-2xl p-6 border transition-all duration-300 relative group overflow-hidden ${
                  isLight
                    ? 'bg-white/95 border-slate-200/90 hover:border-cyan-400 hover:shadow-xl shadow-md shadow-slate-200/50'
                    : 'bg-[#070e1f]/90 border-cyan-500/20 hover:border-cyan-400/60 hover:bg-[#0c1836] shadow-xl'
                }`}
              >
                {/* Subtle top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent group-hover:via-cyan-400 transition-all" />

                {/* Card Top Row: Icon & Status Label */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl border transition-all ${
                      isLight
                        ? 'bg-cyan-50 border-cyan-200 text-cyan-700 group-hover:scale-110 group-hover:bg-cyan-100'
                        : 'bg-slate-900 border-slate-800 text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 group-hover:border-cyan-500/40'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span
                    className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium ${badgeStyle.bg} ${badgeStyle.text} border ${badgeStyle.border}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`} />
                    <span>{item.status}</span>
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`text-xl font-bold font-tech tracking-wide transition-colors mb-2 ${
                    isLight ? 'text-slate-900 group-hover:text-cyan-700' : 'text-white group-hover:text-cyan-300'
                  }`}
                >
                  {item.name}
                </h3>

                {/* Description */}
                <p className={`text-sm font-sans leading-relaxed mb-4 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {item.description}
                </p>

                {/* Focus Areas / Keywords */}
                <div className={`pt-3 border-t ${isLight ? 'border-slate-100' : 'border-slate-800/80'}`}>
                  <div className="text-[10px] font-mono uppercase text-slate-400 mb-2">
                    Key Exploration Nodes:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.focusAreas.map((area, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                          isLight
                            ? 'bg-slate-100 text-slate-700 border border-slate-200 group-hover:border-cyan-300 group-hover:bg-cyan-50/50'
                            : 'bg-slate-900 text-slate-300 border border-slate-800 group-hover:border-cyan-900/40'
                        }`}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
