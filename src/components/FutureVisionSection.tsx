import React from 'react';
import { GraduationCap, Wrench, Briefcase, ArrowRight, Sparkles, Target, Rocket } from 'lucide-react';
import { visionStages, personalPhilosophy } from '../data/portfolioData';
import { sfx } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

export const FutureVisionSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const stageIcons = [GraduationCap, Wrench, Briefcase];
  const stageColors = isLight
    ? [
        {
          border: 'border-cyan-300',
          glow: 'shadow-cyan-500/20',
          bg: 'bg-cyan-50',
          badge: 'bg-cyan-100 text-cyan-800 border-cyan-300',
          titleColor: 'text-cyan-700',
          iconColor: 'text-cyan-700',
        },
        {
          border: 'border-purple-300',
          glow: 'shadow-purple-500/20',
          bg: 'bg-purple-50',
          badge: 'bg-purple-100 text-purple-800 border-purple-300',
          titleColor: 'text-purple-700',
          iconColor: 'text-purple-700',
        },
        {
          border: 'border-emerald-300',
          glow: 'shadow-emerald-500/20',
          bg: 'bg-emerald-50',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          titleColor: 'text-emerald-700',
          iconColor: 'text-emerald-700',
        },
      ]
    : [
        {
          border: 'border-cyan-500/40',
          glow: 'shadow-cyan-500/30',
          bg: 'bg-cyan-950/40',
          badge: 'bg-cyan-950 text-cyan-300 border-cyan-500/40',
          titleColor: 'text-cyan-300',
          iconColor: 'text-white',
        },
        {
          border: 'border-purple-500/40',
          glow: 'shadow-purple-500/30',
          bg: 'bg-purple-950/40',
          badge: 'bg-purple-950 text-purple-300 border-purple-500/40',
          titleColor: 'text-purple-300',
          iconColor: 'text-white',
        },
        {
          border: 'border-emerald-500/40',
          glow: 'shadow-emerald-500/30',
          bg: 'bg-emerald-950/40',
          badge: 'bg-emerald-950 text-emerald-300 border-emerald-500/40',
          titleColor: 'text-emerald-300',
          iconColor: 'text-white',
        },
      ];

  return (
    <section id="vision" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-opacity ${
          isLight
            ? 'bg-gradient-to-r from-sky-300/20 via-purple-300/15 to-emerald-300/20 opacity-60'
            : 'bg-gradient-to-r from-cyan-600/10 via-purple-600/10 to-emerald-600/10 opacity-100'
        }`}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-mono mb-4 border transition-colors ${
              isLight
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-sm'
                : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 shadow-sm shadow-emerald-950'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>&lt;MODULE_08: TRAJECTORY_&_AMBITION&gt;</span>
          </div>
          <h2
            className={`font-tech text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase transition-colors ${
              isLight ? 'text-slate-900' : 'text-white text-glow-cyan'
            }`}
          >
            THE FUTURE I ENVISION
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 my-4" />
          <p className={`font-mono text-sm sm:text-base max-w-2xl ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            A defined evolutionary pathway: bridging engineering rigor into entrepreneurial leadership.
          </p>
        </div>

        {/* Central Vision Statement Quote Box */}
        <div
          className={`mb-16 p-8 rounded-3xl border backdrop-blur-xl text-center shadow-xl relative overflow-hidden group transition-all ${
            isLight
              ? 'bg-white/95 border-sky-200/90 shadow-slate-200/60 text-slate-900'
              : 'bg-[#091530]/90 border-cyan-500/30 text-white shadow-2xl'
          }`}
        >
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl" />
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl" />

          <span className={`text-xs font-mono uppercase tracking-widest block mb-2 font-bold ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`}>
            // GUIDING MANIFESTO
          </span>
          <blockquote className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide leading-snug ${isLight ? 'text-slate-900' : 'text-white text-glow-cyan'}`}>
            &ldquo;{personalPhilosophy.subtext}&rdquo;
          </blockquote>
        </div>

        {/* Animated Pathway: 3 Connected Nodes (Student → Creator → Entrepreneur) */}
        <div className="relative">
          {/* Connecting line for large screens */}
          <div
            className={`hidden lg:block absolute top-1/2 left-12 right-12 h-1 -translate-y-1/2 z-0 ${
              isLight
                ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 shadow-sm'
                : 'bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 shadow-md shadow-cyan-500/30'
            }`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {visionStages.map((stage, idx) => {
              const Icon = stageIcons[idx];
              const color = stageColors[idx];

              return (
                <div
                  key={stage.step}
                  id={`vision-stage-${stage.step}`}
                  onMouseEnter={() => sfx.playHover()}
                  className={`p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative group ${
                    isLight
                      ? `bg-white/95 ${color.border} shadow-lg hover:shadow-2xl shadow-slate-200/50`
                      : `bg-[#081126]/95 ${color.border} hover:shadow-2xl ${color.glow}`
                  }`}
                >
                  {/* Step Indicator Header */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-4 rounded-2xl ${color.bg} border ${color.border} ${color.iconColor} group-hover:scale-110 transition-transform shadow-sm`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${color.badge}`}>
                        STAGE 0{stage.step}
                      </span>
                    </div>

                    <h3 className={`text-3xl font-tech font-bold ${color.titleColor} mb-2`}>
                      {stage.stage}
                    </h3>

                    <div className={`text-sm font-mono font-bold mb-4 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                      {stage.summary}
                    </div>

                    <p className={`text-sm font-sans leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      {stage.detail}
                    </p>
                  </div>

                  {/* Visual Node connector on card footer */}
                  <div className={`mt-8 pt-4 border-t flex items-center justify-between text-xs font-mono ${isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800 text-slate-400'}`}>
                    <span>STATUS:</span>
                    <span className={`font-bold ${color.titleColor}`}>
                      {idx === 0 ? 'ACTIVE IN PROGRESS' : idx === 1 ? 'BUILDING & EXPERIMENTING' : 'LONG-TERM HORIZON'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Future Ambition Boundary Note */}
        <div className="mt-12 text-center">
          <p className="font-mono text-xs text-slate-400">
            * Note: Stated entrepreneurial aspirations represent forward-looking milestones and lifelong targets.
          </p>
        </div>
      </div>
    </section>
  );
};
