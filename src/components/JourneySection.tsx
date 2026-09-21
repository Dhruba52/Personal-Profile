import React from 'react';
import { Award, Users, Bot, HeartHandshake, BookOpen, UserCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { journeyActivities } from '../data/portfolioData';
import { sfx } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

export const JourneySection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const getActivityIcon = (id: string) => {
    switch (id) {
      case 'cr-eee05':
        return Users;
      case 'assistant-organizing-sec':
        return Bot;
      case 'clever-sapiens':
        return Sparkles;
      case 'green-voice':
        return HeartHandshake;
      case 'home-tutor':
        return BookOpen;
      case 'robotics-recruitment-2026':
      default:
        return UserCheck;
    }
  };

  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border transition-colors ${
              isLight
                ? 'bg-cyan-100 text-cyan-800 border-cyan-300'
                : 'bg-cyan-950/60 border-cyan-500/30 text-cyan-400'
            }`}
          >
            <span>&lt;MODULE_04: TIMELINE_&_LEADERSHIP&gt;</span>
          </div>
          <h2
            className={`font-tech text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase transition-colors ${
              isLight ? 'text-slate-900' : 'text-white text-glow-cyan'
            }`}
          >
            JOURNEY & ACTIVITIES
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent my-3" />
          <p className={`font-mono text-xs sm:text-sm max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Chronological log of student leadership, community initiatives, and volunteer service.
          </p>
        </div>

        {/* Futuristic Timeline */}
        <div className="relative">
          {/* Central Vertical Spine */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500/20" />

          <div className="space-y-12">
            {journeyActivities.map((act, index) => {
              const Icon = getActivityIcon(act.id);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={act.id}
                  id={`journey-node-${act.id}`}
                  onMouseEnter={() => sfx.playHover()}
                  className={`relative flex items-center ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Timeline Node Marker */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="relative">
                      <div
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                          isLight
                            ? act.active
                              ? 'border-cyan-500 bg-white shadow-lg shadow-cyan-500/30 text-cyan-700'
                              : 'border-purple-400 bg-white shadow-md shadow-purple-500/20 text-purple-700'
                            : act.active
                            ? 'border-cyan-400 bg-cyan-950 shadow-lg shadow-cyan-500/50 text-cyan-300'
                            : 'border-purple-400/80 bg-slate-950 shadow-md shadow-purple-500/30 text-purple-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      {act.active && (
                        <span className="absolute -inset-1 rounded-full border border-cyan-400 animate-ping opacity-75" />
                      )}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-14 sm:ml-0 sm:w-1/2 ${
                      isEven ? 'sm:pr-10' : 'sm:pl-10'
                    }`}
                  >
                    <div
                      className={`p-6 rounded-2xl border transition-all duration-300 relative group ${
                        isLight
                          ? act.active
                            ? 'bg-white/95 border-cyan-400 shadow-xl shadow-cyan-900/10'
                            : 'bg-white/95 border-slate-200/90 hover:border-cyan-400 shadow-md shadow-slate-200/50'
                          : act.active
                          ? 'bg-[#081024]/90 border-cyan-500/40 hover:border-cyan-400 shadow-xl'
                          : 'bg-[#081024]/90 border-slate-800 hover:border-cyan-400 shadow-xl'
                      }`}
                    >
                      {/* Active / Milestone Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${
                            isLight
                              ? 'bg-cyan-100 text-cyan-800 border-cyan-300 font-semibold'
                              : 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                          }`}
                        >
                          {act.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {act.period}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-lg sm:text-xl font-tech font-bold transition-colors mb-1 ${
                          isLight ? 'text-slate-900 group-hover:text-cyan-700' : 'text-white group-hover:text-cyan-300'
                        }`}
                      >
                        {act.title}
                      </h3>

                      {/* Organization / Role */}
                      <div className={`text-xs font-mono mb-3 ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-400'}`}>
                        {act.organization}
                      </div>

                      {/* Description */}
                      <p className={`text-sm font-sans leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                        {act.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
