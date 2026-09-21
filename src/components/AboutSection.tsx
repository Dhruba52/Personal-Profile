import React from 'react';
import { User, MapPin, GraduationCap, Calendar, IdCard, Globe, Award, Sparkles, Cpu, Layers } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sfx } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

export const AboutSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const infoCards = [
    {
      id: 'info-name',
      label: 'Full Name',
      value: personalInfo.name,
      subValue: 'Alias: Dhruba.exe',
      icon: User,
      color: isLight ? 'text-cyan-600' : 'text-cyan-400',
      borderColor: isLight ? 'border-cyan-200' : 'border-cyan-500/30',
      iconBg: isLight ? 'bg-cyan-50' : 'bg-slate-900/80',
    },
    {
      id: 'info-id',
      label: 'Student ID',
      value: personalInfo.studentId,
      subValue: 'JSTU Academic Record',
      icon: IdCard,
      color: isLight ? 'text-purple-600' : 'text-purple-400',
      borderColor: isLight ? 'border-purple-200' : 'border-purple-500/30',
      iconBg: isLight ? 'bg-purple-50' : 'bg-slate-900/80',
    },
    {
      id: 'info-dept',
      label: 'Department',
      value: personalInfo.department,
      subValue: 'Electrical & Electronic Engineering',
      icon: Cpu,
      color: isLight ? 'text-blue-600' : 'text-blue-400',
      borderColor: isLight ? 'border-blue-200' : 'border-blue-500/30',
      iconBg: isLight ? 'bg-blue-50' : 'bg-slate-900/80',
    },
    {
      id: 'info-semester',
      label: 'Current Academic Term',
      value: personalInfo.semester,
      subValue: 'Undergraduate Program',
      icon: Layers,
      color: isLight ? 'text-emerald-600' : 'text-emerald-400',
      borderColor: isLight ? 'border-emerald-200' : 'border-emerald-500/30',
      iconBg: isLight ? 'bg-emerald-50' : 'bg-slate-900/80',
    },
    {
      id: 'info-university',
      label: 'University',
      value: personalInfo.university,
      subValue: 'Jamalpur, Bangladesh',
      icon: GraduationCap,
      color: isLight ? 'text-amber-600' : 'text-amber-400',
      borderColor: isLight ? 'border-amber-200' : 'border-amber-500/30',
      iconBg: isLight ? 'bg-amber-50' : 'bg-slate-900/80',
    },
    {
      id: 'info-age',
      label: 'Age & Nationality',
      value: `${personalInfo.age} Years Old`,
      subValue: personalInfo.nationality,
      icon: Calendar,
      color: isLight ? 'text-pink-600' : 'text-pink-400',
      borderColor: isLight ? 'border-pink-200' : 'border-pink-500/30',
      iconBg: isLight ? 'bg-pink-50' : 'bg-slate-900/80',
    },
    {
      id: 'info-present-address',
      label: 'Present Address',
      value: personalInfo.presentAddress,
      subValue: 'Current Campus Residence',
      icon: MapPin,
      color: isLight ? 'text-cyan-600' : 'text-cyan-400',
      borderColor: isLight ? 'border-cyan-200' : 'border-cyan-500/30',
      iconBg: isLight ? 'bg-cyan-50' : 'bg-slate-900/80',
    },
    {
      id: 'info-permanent-address',
      label: 'Permanent Address',
      value: personalInfo.permanentAddress,
      subValue: 'Hometown, Bangladesh',
      icon: Globe,
      color: isLight ? 'text-indigo-600' : 'text-indigo-400',
      borderColor: isLight ? 'border-indigo-200' : 'border-indigo-500/30',
      iconBg: isLight ? 'bg-indigo-50' : 'bg-slate-900/80',
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border transition-colors ${
              isLight
                ? 'bg-cyan-100 text-cyan-800 border-cyan-300'
                : 'bg-cyan-950/60 border-cyan-500/30 text-cyan-400'
            }`}
          >
            <span>&lt;MODULE_01: IDENTITY&gt;</span>
          </div>
          <h2
            className={`font-tech text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase transition-colors ${
              isLight ? 'text-slate-900' : 'text-white text-glow-cyan'
            }`}
          >
            ABOUT DHRUBA
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent my-3" />
          <p className={`font-mono text-xs sm:text-sm max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Biographical record, institutional credentials, and engineering foundation.
          </p>
        </div>

        {/* Main Grid: Avatar HUD + Intro Text + Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Futuristic Avatar / Hologram Box */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div
              className={`relative w-full max-w-sm rounded-2xl p-1 border shadow-2xl transition-all ${
                isLight
                  ? 'bg-gradient-to-b from-cyan-300/40 via-sky-100 to-white border-cyan-300 shadow-slate-300/70'
                  : 'bg-gradient-to-b from-cyan-500/30 via-purple-500/20 to-slate-900 border-cyan-500/40 shadow-cyan-950/50'
              }`}
            >
              {/* Corner Tech Brackets */}
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-cyan-500 z-20" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-cyan-500 z-20" />
              <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-cyan-500 z-20" />
              <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-cyan-500 z-20" />

              <div
                className={`relative rounded-xl overflow-hidden aspect-[4/5] flex items-center justify-center ${
                  isLight ? 'bg-slate-100' : 'bg-slate-950/90'
                }`}
              >
                {/* Profile Image */}
                <img
                  src={personalInfo.avatarUrl}
                  alt="Dhruba Acharjee — Portrait"
                  className="w-full h-full object-cover object-top filter contrast-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />

                {/* Cyber Scanline Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t opacity-80 ${
                    isLight ? 'from-white/60 via-transparent to-transparent' : 'from-[#030712] via-transparent to-transparent'
                  }`}
                />
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-cyan-500/50 animate-pulse" />

                {/* HUD Biometric Overlay */}
                <div
                  className={`absolute bottom-3 left-3 right-3 p-3 rounded-xl backdrop-blur-md border font-mono text-xs ${
                    isLight
                      ? 'bg-white/90 border-cyan-200 text-slate-800 shadow-md'
                      : 'bg-slate-950/85 border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className={isLight ? 'text-slate-900' : 'text-cyan-300'}>{personalInfo.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        isLight ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-cyan-950 text-cyan-400 border-cyan-500/30'
                      }`}
                    >
                      ID: {personalInfo.studentId}
                    </span>
                  </div>
                  <div className="text-[11px] flex items-center justify-between text-slate-500">
                    <span>Dept: EEE (2nd Yr / 2nd Sem)</span>
                    <span className="text-emerald-600 font-semibold">STATUS: ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Summary Badge */}
            <div
              className={`mt-4 w-full max-w-sm p-3 rounded-xl border font-mono text-xs text-center transition-all ${
                isLight
                  ? 'bg-white/95 border-slate-200/90 text-slate-700 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <span className="text-cyan-600 font-bold">&gt; CORE OBJECTIVE:</span> Transform engineering insights into real-world ventures.
            </div>
          </div>

          {/* Right Column: Narrative Introduction & Futuristic Cards */}
          <div className="lg:col-span-8 space-y-6">
            {/* Introductions */}
            <div
              className={`p-6 sm:p-7 rounded-2xl border backdrop-blur-md relative overflow-hidden transition-all ${
                isLight
                  ? 'bg-white/95 border-sky-200/90 shadow-xl shadow-slate-200/60'
                  : 'bg-[#091124]/90 border-cyan-500/20 shadow-xl'
              }`}
            >
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl" />
              <div
                className={`flex items-center space-x-2 font-mono text-xs mb-3 ${
                  isLight ? 'text-cyan-700 font-bold' : 'text-cyan-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>BIOGRAPHICAL TRANSMISSION</span>
              </div>
              <p className={`text-base sm:text-lg leading-relaxed font-sans mb-4 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                &ldquo;{personalInfo.bioParagraph1}&rdquo;
              </p>
              <p className={`text-sm sm:text-base leading-relaxed font-sans ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                &ldquo;{personalInfo.bioParagraph2}&rdquo;
              </p>
            </div>

            {/* Futuristic Information Cards Grid */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider mb-3 flex items-center space-x-2 text-slate-500">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span>SYSTEM SPECIFICATIONS & PERSONAL TELEMETRY</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {infoCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.id}
                      id={card.id}
                      onMouseEnter={() => sfx.playHover()}
                      className={`p-4 rounded-xl border transition-all duration-200 group relative overflow-hidden ${
                        isLight
                          ? 'bg-white/95 border-slate-200/90 hover:border-cyan-400 hover:bg-cyan-50/30 shadow-sm hover:shadow-md'
                          : `bg-[#070e1f]/80 ${card.borderColor} hover:bg-[#0d1b3a]/90 shadow-sm`
                      }`}
                    >
                      <div className="flex items-start space-x-3.5">
                        <div
                          className={`p-2.5 rounded-lg border ${card.iconBg} ${card.color} group-hover:scale-105 transition-transform ${
                            isLight ? 'border-slate-200' : 'border-white/5'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                            {card.label}
                          </div>
                          <div
                            className={`text-sm sm:text-base font-semibold tracking-wide truncate transition-colors ${
                              isLight ? 'text-slate-900 group-hover:text-cyan-700' : 'text-white group-hover:text-cyan-300'
                            }`}
                          >
                            {card.value}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 truncate mt-0.5">
                            {card.subValue}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
