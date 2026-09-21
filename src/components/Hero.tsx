import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Terminal,
  Cpu,
  Award,
  GraduationCap,
  MapPin,
  Mail,
  Copy,
  Check,
  FolderGit2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Bot,
  Activity,
  Zap,
} from 'lucide-react';
import { personalInfo, projects, socialLinks } from '../data/portfolioData';
import { getSavedCustomProjects } from '../utils/projectStorage';
import { sfx } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects'>('profile');
  const [totalProjects, setTotalProjects] = useState<number>(projects.length);

  React.useEffect(() => {
    const saved = getSavedCustomProjects();
    const customIds = new Set(saved.map((p) => p.id));
    const merged = [...saved, ...projects.filter((p) => !customIds.has(p.id))];
    setTotalProjects(merged.length);
  }, []);

  const scrollToSection = (id: string) => {
    sfx.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.classList.add('highlight-spotlight');
      setTimeout(() => el.classList.remove('highlight-spotlight'), 2200);
    }
  };

  const copyEmail = () => {
    sfx.playClick();
    navigator.clipboard.writeText('dhruboacharjee52@gmail.com');
    setCopiedEmail(true);
    sfx.playSuccess();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const coreFocusTags = [
    { label: 'Robotics & Hardware', icon: Bot },
    { label: 'Embedded Automation', icon: Cpu },
    { label: 'Circuit Design', icon: Zap },
    { label: 'Biomedical & IoT', icon: Activity },
    { label: 'Leadership (CR EEE-05)', icon: Award },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Professional Engineering Profile & Pitch (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Badge */}
            <div
              id="hero-status-badge"
              className={`inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border text-xs font-mono mb-5 backdrop-blur-md transition-all ${
                isLight
                  ? 'border-cyan-300 bg-white/95 text-cyan-900 shadow-sm shadow-cyan-600/10'
                  : 'border-cyan-500/30 bg-[#061026]/90 text-cyan-300 shadow-sm shadow-cyan-900/30'
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-semibold tracking-wide">
                JSTU EEE • BATCH-05
              </span>
              <span className="text-slate-400">|</span>
              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                Open for Collaborations & Research
              </span>
            </div>

            {/* Engineer Name & Title */}
            <h1
              id="hero-primary-name"
              className={`font-tech text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3 transition-colors ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {personalInfo.name}
            </h1>

            {/* Professional Role & Specialization */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`font-mono text-sm sm:text-base font-bold px-3 py-1 rounded-lg border ${
                  isLight
                    ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                    : 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40'
                }`}
              >
                Electrical & Electronic Engineering Undergrad
              </span>
              <span
                className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${
                  isLight
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : 'bg-purple-950/60 text-purple-300 border-purple-500/30'
                }`}
              >
                Robotics & IoT Prototyper
              </span>
            </div>

            {/* Executive Bio */}
            <p
              id="hero-executive-bio"
              className={`text-base sm:text-lg font-sans leading-relaxed max-w-2xl mb-6 font-normal transition-colors ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              Studying at <strong className={isLight ? 'text-slate-900 font-semibold' : 'text-white font-semibold'}>Jamalpur Science & Technology University</strong>.
              Serving as <span className="font-semibold text-cyan-600 dark:text-cyan-400">Class Representative (EEE-05)</span> and{' '}
              <span className="font-semibold text-purple-600 dark:text-purple-400">Assistant Organizing Secretary</span> at JSTU Robotics Club.
              Passionate about bridging circuit theory and code into functional autonomous machines.
            </p>

            {/* Focus / Skills Chips */}
            <div className="flex flex-wrap gap-2 mb-8 max-w-2xl">
              {coreFocusTags.map((tag) => {
                const IconComponent = tag.icon;
                return (
                  <div
                    key={tag.label}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-700 hover:border-cyan-400 hover:text-cyan-800 shadow-xs'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{tag.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-8">
              {/* Primary: Explore Projects */}
              <button
                id="hero-explore-projects-cta"
                onClick={() => scrollToSection('projects')}
                onMouseEnter={() => sfx.playHover()}
                className="px-6 py-3 rounded-full font-mono text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg shadow-cyan-600/25 hover:shadow-cyan-500/40 transition-all flex items-center space-x-2 border border-white/20 active:scale-95 cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-cyan-100" />
                <span>View Engineered Projects</span>
                <ChevronRight className="w-4 h-4 text-cyan-200" />
              </button>

              {/* Secondary: Academic & Leadership Journey */}
              <button
                id="hero-view-journey-cta"
                onClick={() => scrollToSection('journey')}
                onMouseEnter={() => sfx.playHover()}
                className={`px-6 py-3 rounded-full font-mono text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 active:scale-95 border cursor-pointer ${
                  isLight
                    ? 'text-slate-800 bg-white hover:bg-slate-50 border-slate-300 hover:border-cyan-400 shadow-xs'
                    : 'text-slate-200 bg-[#091430] hover:bg-[#0e1d44] border-cyan-500/30 hover:border-cyan-400'
                }`}
              >
                <Award className="w-4 h-4 text-cyan-500" />
                <span>Experience & Roles</span>
              </button>

              {/* Direct Contact Button */}
              <button
                id="hero-contact-cta"
                onClick={() => scrollToSection('contact')}
                onMouseEnter={() => sfx.playHover()}
                className={`px-5 py-3 rounded-full font-mono text-xs sm:text-sm font-medium transition-all flex items-center space-x-2 border cursor-pointer ${
                  isLight
                    ? 'text-cyan-700 bg-cyan-50/80 hover:bg-cyan-100/80 border-cyan-200'
                    : 'text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/80 border-cyan-500/30'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </button>

              {/* Ask AI Assistant Button */}
              <button
                id="hero-ask-ai-cta"
                onClick={() => {
                  sfx.playClick();
                  window.dispatchEvent(new CustomEvent('open-ai-assistant'));
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-5 py-3 rounded-full font-mono text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 border cursor-pointer active:scale-95 ${
                  isLight
                    ? 'text-cyan-800 bg-cyan-100/90 hover:bg-cyan-200/80 border-cyan-300 shadow-xs'
                    : 'text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900/80 border-cyan-500/50 shadow-sm shadow-cyan-950/40'
                }`}
              >
                <Bot className="w-4 h-4 text-cyan-500 animate-pulse" />
                <span>Ask AI Assistant</span>
              </button>
            </div>

            {/* Quick Contact & Verified Identity Bar */}
            <div
              className={`pt-5 border-t w-full flex flex-wrap items-center justify-between gap-4 text-xs font-mono ${
                isLight ? 'border-slate-200 text-slate-600' : 'border-slate-800/90 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-slate-400">EMAIL:</span>
                <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                  dhruboacharjee52@gmail.com
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className={`p-1.5 rounded-full border transition-all ${
                    copiedEmail
                      ? 'bg-emerald-500 text-white border-emerald-400'
                      : isLight
                      ? 'bg-slate-100 text-slate-600 hover:bg-cyan-100 hover:text-cyan-800 border-slate-200'
                      : 'bg-slate-800 text-slate-300 hover:bg-cyan-950 hover:text-cyan-300 border-slate-700'
                  }`}
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Jamalpur & Chandpur, Bangladesh</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Engineering Dossier Card (5 cols) */}
          <div className="lg:col-span-5">
            <div
              id="hero-dossier-card"
              className={`rounded-3xl border p-6 backdrop-blur-xl shadow-2xl transition-all relative overflow-hidden ${
                isLight
                  ? 'bg-white/95 border-slate-200/90 shadow-xl shadow-slate-200/80 text-slate-800'
                  : 'bg-[#060e22]/95 border-cyan-500/30 shadow-2xl shadow-cyan-950/60 text-slate-100'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200 dark:border-cyan-500/20">
                <div className="flex items-center space-x-2 font-mono text-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="font-bold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
                    ACADEMIC & RESEARCH PROFILE
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase ${
                    isLight
                      ? 'bg-slate-100 text-slate-700 border-slate-300'
                      : 'bg-slate-900 text-cyan-300 border-cyan-500/30'
                  }`}
                >
                  ID: {personalInfo.studentId}
                </span>
              </div>

              {/* Profile Identity Presentation */}
              <div className="flex items-center space-x-4 mb-6">
                {/* Circular Monogram / Avatar with Orbital Ring */}
                <div className="relative shrink-0">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center font-tech font-bold text-2xl tracking-wider text-white shadow-lg bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 border-2 border-white dark:border-cyan-400`}
                  >
                    DA
                  </div>
                  {/* Verified Shield Badge */}
                  <div
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-white"
                    title="Verified Student at JSTU"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <h3 className={`font-tech font-bold text-xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {personalInfo.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">
                    {personalInfo.department}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center space-x-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{personalInfo.university}</span>
                  </p>
                </div>
              </div>

              {/* Verified Credentials Grid */}
              <div className="grid grid-cols-2 gap-2.5 font-mono text-xs mb-6">
                <div
                  className={`p-3 rounded-2xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 uppercase">ACADEMIC STANDING</div>
                  <div className={`font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                    {personalInfo.semester}
                  </div>
                  <div className="text-[11px] text-cyan-600 dark:text-cyan-400">Batch 05</div>
                </div>

                <div
                  className={`p-3 rounded-2xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 uppercase">LEADERSHIP ROLE</div>
                  <div className={`font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                    Class Representative
                  </div>
                  <div className="text-[11px] text-purple-600 dark:text-purple-400">EEE Department</div>
                </div>

                <div
                  className={`p-3 rounded-2xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 uppercase">CLUB RESPONSIBILITY</div>
                  <div className={`font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                    Asst. Org. Secretary
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400">JSTU Robotics Club</div>
                </div>

                <div
                  className={`p-3 rounded-2xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 uppercase">HARDWARE & LABS</div>
                  <div className={`font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                    {totalProjects} Featured Projects
                  </div>
                  <div className="text-[11px] text-amber-600 dark:text-amber-400">Robotics & IoT</div>
                </div>
              </div>

              {/* Featured Project Quick-Card */}
              <div
                className={`p-4 rounded-2xl border mb-5 transition-all ${
                  isLight
                    ? 'bg-gradient-to-br from-cyan-50/80 to-blue-50/50 border-cyan-200'
                    : 'bg-gradient-to-br from-[#091535] to-[#040a1c] border-cyan-500/30'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[10px] uppercase font-bold text-cyan-700 dark:text-cyan-300 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>FEATURED LAB PROTOTYPE</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-200/60 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-bold">
                    ACTIVE
                  </span>
                </div>
                <div className="font-tech font-bold text-base text-slate-900 dark:text-white">
                  Fire Fighting Autonomous Robot
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                  Triple-flame sensor navigation, high-pressure pump actuation, and dual motor driver logic.
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    Arduino • Flame Sensors • Drivers
                  </span>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold hover:underline flex items-center space-x-1"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Card Bottom Actions: Terminal Developer CLI & About Link */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    sfx.playClick();
                    onOpenTerminal();
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium border flex items-center space-x-1.5 transition-all ${
                    isLight
                      ? 'bg-slate-100 hover:bg-cyan-100 text-slate-700 hover:text-cyan-900 border-slate-300'
                      : 'bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border-slate-700'
                  }`}
                  title="Launch Interactive Terminal Modal"
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Developer CLI</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('about')}
                  className="text-xs font-mono text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center space-x-1 transition-colors"
                >
                  <span>Full Biography</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM METRICS & STATS STRIP */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="text-[11px] font-mono text-slate-400 uppercase">ENGINEERED PROTOTYPES</div>
            <div className="text-2xl font-tech font-bold text-cyan-600 dark:text-cyan-400 mt-1">
              {totalProjects}+ Major Builds
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Robotics, Biomedical & Automation
            </p>
          </div>

          <div
            className={`p-4 rounded-2xl border transition-all ${
              isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="text-[11px] font-mono text-slate-400 uppercase">ACADEMIC EXCELLENCE</div>
            <div className="text-2xl font-tech font-bold text-purple-600 dark:text-purple-400 mt-1">
              JSTU EEE
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              2nd Year, 2nd Semester
            </p>
          </div>

          <div
            className={`p-4 rounded-2xl border transition-all ${
              isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="text-[11px] font-mono text-slate-400 uppercase">LEADERSHIP & SERVICE</div>
            <div className="text-2xl font-tech font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              CR & JSTURC
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Organizing Secretary & CR
            </p>
          </div>

          <div
            className={`p-4 rounded-2xl border transition-all ${
              isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="text-[11px] font-mono text-slate-400 uppercase">LONG-TERM VISION</div>
            <div className="text-2xl font-tech font-bold text-amber-600 dark:text-amber-400 mt-1">
              Student → Creator → Founder
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Building impactful tech ventures
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
