import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Cpu,
  User,
  Send,
  Bot,
  Trophy,
  Film,
  Crown,
  Rocket,
  Code,
  FolderKanban,
  Check,
} from 'lucide-react';
import {
  projects,
  interestsSkills,
  journeyActivities,
  competitions,
  hobbies,
  favoritesData,
  visionStages,
} from '../data/portfolioData';
import { getSavedCustomProjects } from '../utils/projectStorage';
import { sfx } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

export interface SearchResult {
  id: string;
  title: string;
  category: 'Section' | 'Project' | 'Skill' | 'Activity' | 'Competition' | 'Hobby' | 'Media' | 'Vision' | 'AI Tool';
  snippet: string;
  elementId: string;
  iconType: 'section' | 'project' | 'skill' | 'activity' | 'competition' | 'hobby' | 'media' | 'vision' | 'ai';
}

export interface SectionItem {
  id: string;
  title: string;
  label: string;
  tag: string;
  description: string;
  elementId: string;
  icon: React.ElementType;
  gradient: string;
  badgeColor: string;
  borderColor: string;
  glowColor: string;
}

interface SearchBarProps {
  onSearchChange?: (query: string) => void;
  className?: string;
  compact?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearchChange,
  className = '',
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Definitive List of Portfolio Sections for Smooth Scroll Navigation
  const portfolioSections: SectionItem[] = useMemo(
    () => [
      {
        id: 'sec-projects',
        title: 'Projects',
        label: 'Projects I Have Built',
        tag: 'HARDWARE & CODE',
        description: 'Fire Fighting Robot, ECG Machine, Home Automation, Human Following Robot',
        elementId: 'projects',
        icon: Cpu,
        gradient: isLight
          ? 'from-cyan-500 to-blue-600 text-white'
          : 'from-cyan-500 to-blue-600 text-white',
        badgeColor: isLight ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
        borderColor: isLight ? 'border-cyan-200 hover:border-cyan-400' : 'border-cyan-500/30 hover:border-cyan-400',
        glowColor: 'shadow-cyan-500/25',
      },
      {
        id: 'sec-about',
        title: 'About',
        label: 'About Me & Credentials',
        tag: 'BIO & PROFILE',
        description: 'Student ID 24010608, JSTU EEE Department, Jamalpur, Chandpur roots',
        elementId: 'about',
        icon: User,
        gradient: isLight
          ? 'from-purple-500 to-indigo-600 text-white'
          : 'from-purple-500 to-indigo-600 text-white',
        badgeColor: isLight ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-purple-950/80 text-purple-300 border-purple-500/40',
        borderColor: isLight ? 'border-purple-200 hover:border-purple-400' : 'border-purple-500/30 hover:border-purple-400',
        glowColor: 'shadow-purple-500/25',
      },
      {
        id: 'sec-contact',
        title: 'Contact',
        label: 'Contact & Direct Dispatch',
        tag: 'COMMUNICATIONS',
        description: 'Direct email client dispatch, GitHub, LinkedIn, Facebook, Instagram',
        elementId: 'contact',
        icon: Send,
        gradient: isLight
          ? 'from-sky-500 to-cyan-600 text-white'
          : 'from-sky-500 to-cyan-600 text-white',
        badgeColor: isLight ? 'bg-sky-100 text-sky-800 border-sky-300' : 'bg-sky-950/80 text-sky-300 border-sky-500/40',
        borderColor: isLight ? 'border-sky-200 hover:border-sky-400' : 'border-sky-500/30 hover:border-sky-400',
        glowColor: 'shadow-sky-500/25',
      },
      {
        id: 'sec-skills',
        title: 'Skills',
        label: 'Interests & Skills',
        tag: 'CURIOSITY ENGINE',
        description: 'Robotics, Machine Learning, Video Editing, LaTeX, Management, Programming',
        elementId: 'skills',
        icon: Bot,
        gradient: isLight
          ? 'from-teal-500 to-emerald-600 text-white'
          : 'from-teal-500 to-emerald-600 text-white',
        badgeColor: isLight ? 'bg-teal-100 text-teal-800 border-teal-300' : 'bg-teal-950/80 text-teal-300 border-teal-500/40',
        borderColor: isLight ? 'border-teal-200 hover:border-teal-400' : 'border-teal-500/30 hover:border-teal-400',
        glowColor: 'shadow-teal-500/25',
      },
      {
        id: 'sec-journey',
        title: 'Journey',
        label: 'Journey & Activities Timeline',
        tag: 'LEADERSHIP & SERVICE',
        description: 'Class Representative EEE-05, Robotics Club Assistant Organizing Secretary, Clever Sapiens',
        elementId: 'journey',
        icon: Trophy,
        gradient: isLight
          ? 'from-amber-500 to-orange-600 text-white'
          : 'from-amber-500 to-orange-600 text-white',
        badgeColor: isLight ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-amber-950/80 text-amber-300 border-amber-500/40',
        borderColor: isLight ? 'border-amber-200 hover:border-amber-400' : 'border-amber-500/30 hover:border-amber-400',
        glowColor: 'shadow-amber-500/25',
      },
      {
        id: 'sec-competitions',
        title: 'Competitions',
        label: 'Competitions & Events',
        tag: 'ARENA & EXHIBITION',
        description: 'Robofusion UFTB, Project Showcasing, Competitive Engineering',
        elementId: 'competitions',
        icon: Trophy,
        gradient: isLight
          ? 'from-yellow-500 to-amber-600 text-white'
          : 'from-yellow-500 to-amber-600 text-white',
        badgeColor: isLight ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'bg-yellow-950/80 text-yellow-300 border-yellow-500/40',
        borderColor: isLight ? 'border-yellow-200 hover:border-yellow-400' : 'border-yellow-500/30 hover:border-yellow-400',
        glowColor: 'shadow-yellow-500/25',
      },
      {
        id: 'sec-vision',
        title: 'Vision',
        label: 'The Future I Envision',
        tag: 'ROADMAP & HORIZON',
        description: 'Student → Creator → Entrepreneur three-stage evolutionary pathway',
        elementId: 'vision',
        icon: Rocket,
        gradient: isLight
          ? 'from-violet-600 to-fuchsia-600 text-white'
          : 'from-violet-600 to-fuchsia-600 text-white',
        badgeColor: isLight ? 'bg-violet-100 text-violet-800 border-violet-300' : 'bg-violet-950/80 text-violet-300 border-violet-500/40',
        borderColor: isLight ? 'border-violet-200 hover:border-violet-400' : 'border-violet-500/30 hover:border-violet-400',
        glowColor: 'shadow-violet-500/25',
      },
      {
        id: 'sec-favorites',
        title: 'Media',
        label: 'Media & Inspiration',
        tag: 'CREATIVE FUEL',
        description: 'Anime, Web Series, Movies, Cartoons that inspire imagination and tenacity',
        elementId: 'favorites',
        icon: Film,
        gradient: isLight
          ? 'from-rose-500 to-pink-600 text-white'
          : 'from-rose-500 to-pink-600 text-white',
        badgeColor: isLight ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-rose-950/80 text-rose-300 border-rose-500/40',
        borderColor: isLight ? 'border-rose-200 hover:border-rose-400' : 'border-rose-500/30 hover:border-rose-400',
        glowColor: 'shadow-rose-500/25',
      },
      {
        id: 'sec-hobbies',
        title: 'Hobbies',
        label: 'Hobbies & Recreation',
        tag: 'LEISURE & FOCUS',
        description: 'Chess, Badminton, 29 Card Game, Video Editing, Tech Exploring',
        elementId: 'hobbies',
        icon: Crown,
        gradient: isLight
          ? 'from-emerald-500 to-teal-600 text-white'
          : 'from-emerald-500 to-teal-600 text-white',
        badgeColor: isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
        borderColor: isLight ? 'border-emerald-200 hover:border-emerald-400' : 'border-emerald-500/30 hover:border-emerald-400',
        glowColor: 'shadow-emerald-500/25',
      },
      {
        id: 'sec-home',
        title: 'Home',
        label: 'Hero Telemetry & Overview',
        tag: 'OVERVIEW',
        description: 'Dhruba.exe, system telemetry, status overview, quick bio HUD',
        elementId: 'home',
        icon: Sparkles,
        gradient: isLight
          ? 'from-cyan-600 to-indigo-600 text-white'
          : 'from-cyan-500 to-indigo-500 text-white',
        badgeColor: isLight ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
        borderColor: isLight ? 'border-cyan-200 hover:border-cyan-400' : 'border-cyan-500/30 hover:border-cyan-400',
        glowColor: 'shadow-cyan-500/25',
      },
    ],
    [isLight]
  );

  // Detailed search index for query matching
  const searchIndex: SearchResult[] = useMemo(() => {
    const items: SearchResult[] = [];

    // 1. Projects (defaults + user uploaded/synced)
    const customProjs = getSavedCustomProjects();
    const customIds = new Set(customProjs.map((cp) => cp.id));
    const combinedProjects = [...customProjs, ...projects.filter((p) => !customIds.has(p.id))];

    combinedProjects.forEach((p) => {
      items.push({
        id: `project-${p.id}`,
        title: `${p.number} — ${p.title}`,
        category: 'Project',
        snippet: `${p.category}: ${p.description} (${p.technologies.join(', ')})`,
        elementId: `project-card-${p.id}`,
        iconType: 'project',
      });
    });

    // 2. Skills
    interestsSkills.forEach((s) => {
      items.push({
        id: `skill-${s.id}`,
        title: s.name,
        category: 'Skill',
        snippet: `[${s.status}] ${s.description} • Focus: ${s.focusAreas.join(', ')}`,
        elementId: `interest-card-${s.id}`,
        iconType: 'skill',
      });
    });

    // 3. Journey Activities
    journeyActivities.forEach((act) => {
      items.push({
        id: `act-${act.id}`,
        title: act.title,
        category: 'Activity',
        snippet: `${act.organization} (${act.period}) — ${act.description}`,
        elementId: `journey-node-${act.id}`,
        iconType: 'activity',
      });
    });

    // 4. Competitions
    competitions.forEach((comp) => {
      items.push({
        id: `comp-${comp.id}`,
        title: comp.name,
        category: 'Competition',
        snippet: `${comp.type}: ${comp.description}`,
        elementId: `comp-card-${comp.id}`,
        iconType: 'competition',
      });
    });

    // 5. Hobbies
    hobbies.forEach((h) => {
      items.push({
        id: `hobby-${h.id}`,
        title: h.name,
        category: 'Hobby',
        snippet: `${h.tagline} — ${h.description}`,
        elementId: `hobby-card-${h.id}`,
        iconType: 'hobby',
      });
    });

    // 6. Favorites
    favoritesData.forEach((cat) => {
      cat.items.forEach((item) => {
        items.push({
          id: `fav-${item.id}`,
          title: item.title,
          category: 'Media',
          snippet: `${cat.label}: ${item.note || ''}`,
          elementId: `fav-item-${item.id}`,
          iconType: 'media',
        });
      });
    });

    // 7. Vision Stages
    visionStages.forEach((v) => {
      items.push({
        id: `vision-${v.step}`,
        title: `Stage 0${v.step}: ${v.stage}`,
        category: 'Vision',
        snippet: `${v.summary} — ${v.detail}`,
        elementId: `vision-stage-${v.step}`,
        iconType: 'vision',
      });
    });

    // 8. AI Assistant Tool
    items.push({
      id: 'tool-ai-assistant',
      title: 'Dhruba.ai Assistant (Gemini 3.8 Flash)',
      category: 'AI Tool',
      snippet: 'Chat live with Dhruba’s AI co-pilot about robotics, EEE studies, JSTU projects, and background.',
      elementId: 'ai-assistant-toggle-button',
      iconType: 'ai',
    });

    return items;
  }, []);

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return portfolioSections;

    return portfolioSections.filter((sec) => {
      return (
        sec.title.toLowerCase().includes(trimmed) ||
        sec.label.toLowerCase().includes(trimmed) ||
        sec.tag.toLowerCase().includes(trimmed) ||
        sec.description.toLowerCase().includes(trimmed)
      );
    });
  }, [query, portfolioSections]);

  // Filter specific items by query
  const filteredDeepItems = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return searchIndex
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(trimmed) ||
          item.snippet.toLowerCase().includes(trimmed) ||
          item.category.toLowerCase().includes(trimmed)
        );
      })
      .slice(0, 6);
  }, [query, searchIndex]);

  // Smooth scroll to a section or element
  const navigateToElement = (elementId: string) => {
    sfx.playClick();
    setIsOpen(false);
    setQuery('');
    if (onSearchChange) onSearchChange('');

    if (elementId === 'ai-assistant-toggle-button') {
      window.dispatchEvent(new CustomEvent('open-ai-assistant'));
      return;
    }

    const target =
      document.getElementById(elementId) ||
      document.getElementById(elementId.replace('project-card-', '').replace('journey-node-', ''));

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Apply futuristic spotlight animation
      target.classList.add('highlight-spotlight');
      setTimeout(() => {
        target.classList.remove('highlight-spotlight');
      }, 2500);
    }
  };

  // Outside click handler to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Global hotkeys: '/' or 'Ctrl+K'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) &&
        document.activeElement !== inputRef.current
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setIsOpen(true);
    setSelectedIndex(-1);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const clearSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuery('');
    if (onSearchChange) onSearchChange('');
    inputRef.current?.focus();
  };

  const toggleDropdown = () => {
    sfx.playClick();
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const quickJumpChips = [
    { title: 'Projects', id: 'projects', icon: Cpu },
    { title: 'About', id: 'about', icon: User },
    { title: 'Contact', id: 'contact', icon: Send },
    { title: 'Skills', id: 'skills', icon: Bot },
    { title: 'Vision', id: 'vision', icon: Rocket },
  ];

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Outer Input Bar - Circular Pill Styling */}
      <div
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
        className={`relative flex items-center transition-all duration-300 cursor-pointer ${
          isLight
            ? 'bg-white/95 border-2 border-slate-300/90 hover:border-cyan-500/80 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 text-slate-800 shadow-sm shadow-slate-200/50'
            : 'bg-[#060c1d]/90 border-2 border-cyan-500/35 hover:border-cyan-400 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/25 text-slate-100 shadow-md shadow-cyan-950/40'
        } rounded-full pl-1.5 pr-2.5 py-1`}
      >
        {/* Attractive Circular Logo Badge for Search */}
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mr-2 transition-all ${
            isLight
              ? 'bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-sm shadow-cyan-500/30'
              : 'bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-md shadow-cyan-500/40'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
        </div>

        {/* Input Element */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Navigate sections (Projects, About, Contact)..."
          className={`w-full bg-transparent text-xs font-mono focus:outline-none placeholder-slate-400 truncate ${
            isLight ? 'text-slate-900' : 'text-slate-100'
          }`}
        />

        {/* Clear Button (if text entered) */}
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mr-1.5 transition-colors ${
              isLight
                ? 'bg-slate-200 text-slate-600 hover:bg-rose-100 hover:text-rose-600'
                : 'bg-slate-800 text-slate-400 hover:bg-rose-950 hover:text-rose-400'
            }`}
            title="Clear search"
          >
            <X className="w-3 h-3" />
          </button>
        )}

        {/* Circular Dropdown Trigger Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
            isOpen
              ? isLight
                ? 'bg-cyan-100 text-cyan-800 rotate-180'
                : 'bg-cyan-950 text-cyan-300 rotate-180 border border-cyan-500/40'
              : isLight
              ? 'text-slate-500 hover:bg-slate-100 hover:text-cyan-700'
              : 'text-slate-400 hover:bg-slate-800 hover:text-cyan-300'
          }`}
          title="Toggle Sections Dropdown List"
        >
          <ChevronDown className="w-4 h-4 transition-transform duration-200" />
        </button>

        {/* Keyboard Shortcut Kbd Tag (Desktop) */}
        {!query && (
          <kbd
            className={`hidden lg:inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-mono border ml-1 shrink-0 ${
              isLight
                ? 'bg-slate-100 text-slate-500 border-slate-300'
                : 'bg-slate-900 text-slate-400 border-slate-700'
            }`}
          >
            /
          </kbd>
        )}
      </div>

      {/* DROPDOWN MENU LIST (SMOOTH SCROLL NAVIGATION) */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 sm:right-auto sm:w-[420px] md:w-[460px] mt-2 rounded-2xl shadow-2xl border z-50 overflow-hidden backdrop-blur-2xl transition-all animate-fade-in ${
            isLight
              ? 'bg-white/98 border-cyan-400/40 text-slate-800 shadow-2xl shadow-slate-400/30'
              : 'bg-[#060d21]/98 border-cyan-500/40 text-slate-100 shadow-2xl shadow-cyan-950/60'
          }`}
        >
          {/* Header Bar */}
          <div
            className={`px-4 py-2.5 border-b flex items-center justify-between font-mono text-[11px] ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#091433] border-cyan-500/20 text-cyan-400'
            }`}
          >
            <div className="flex items-center space-x-1.5 font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>JUMP TO SECTION (SMOOTH SCROLL)</span>
            </div>
            <span className="text-[10px] text-slate-400">ESC to exit</span>
          </div>

          {/* Quick-Jump Circular Chips (Projects, About, Contact, Skills, Vision) */}
          <div
            className={`px-3 py-2 border-b flex items-center gap-1.5 overflow-x-auto ${
              isLight ? 'bg-slate-100/60 border-slate-200' : 'bg-slate-950/60 border-slate-800/80'
            }`}
          >
            <span className="text-[10px] font-mono text-slate-400 uppercase shrink-0 mr-1">
              QUICK:
            </span>
            {quickJumpChips.map((chip) => {
              const ChipIcon = chip.icon;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => navigateToElement(chip.id)}
                  onMouseEnter={() => sfx.playHover()}
                  className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border transition-all shrink-0 ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-700 hover:border-cyan-400 hover:text-cyan-800 hover:bg-cyan-50/80 shadow-xs'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/60'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                    <ChipIcon className="w-2.5 h-2.5" />
                  </div>
                  <span>{chip.title}</span>
                </button>
              );
            })}
          </div>

          {/* Scrollable List Body */}
          <div
            ref={listRef}
            className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 p-1"
          >
            {/* 1. SECTIONS SECTION */}
            {filteredSections.length > 0 && (
              <div>
                <div
                  className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider font-bold ${
                    isLight ? 'text-slate-400 bg-slate-50/50' : 'text-slate-500 bg-slate-950/40'
                  }`}
                >
                  PORTFOLIO MODULES ({filteredSections.length})
                </div>

                {filteredSections.map((sec) => {
                  const IconComponent = sec.icon;

                  return (
                    <button
                      key={sec.id}
                      onClick={() => navigateToElement(sec.elementId)}
                      onMouseEnter={() => sfx.playHover()}
                      className={`w-full text-left p-2.5 rounded-xl flex items-center space-x-3 transition-all group ${
                        isLight
                          ? 'hover:bg-cyan-50/90 hover:shadow-sm'
                          : 'hover:bg-[#0c183b] hover:shadow-md'
                      }`}
                    >
                      {/* Circular Logo Medallion */}
                      <div className="relative shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr ${sec.gradient} shadow-md ${sec.glowColor} group-hover:scale-110 transition-transform duration-200 border-2 border-white/20`}
                        >
                          <IconComponent className="w-5 h-5 drop-shadow-sm" />
                        </div>
                        {/* Tiny live indicator */}
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                      </div>

                      {/* Section Details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`font-tech font-bold text-sm tracking-wide transition-colors ${
                              isLight
                                ? 'text-slate-900 group-hover:text-cyan-700'
                                : 'text-white group-hover:text-cyan-300'
                            }`}
                          >
                            {sec.title}
                          </span>

                          <span
                            className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono font-semibold border uppercase shrink-0 ${sec.badgeColor}`}
                          >
                            {sec.tag}
                          </span>
                        </div>

                        <p className="text-[11px] font-sans text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {sec.description}
                        </p>
                      </div>

                      {/* Circular Jump Action Arrow */}
                      <div
                        className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                          isLight
                            ? 'border-slate-200 bg-white text-slate-400 group-hover:border-cyan-400 group-hover:bg-cyan-600 group-hover:text-white shadow-xs'
                            : 'border-slate-800 bg-slate-900 text-slate-400 group-hover:border-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950'
                        }`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. SPECIFIC SEARCH RESULTS (IF QUERY PROVIDED) */}
            {query.trim() !== '' && filteredDeepItems.length > 0 && (
              <div className="pt-2">
                <div
                  className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider font-bold ${
                    isLight ? 'text-slate-400 bg-slate-50/50' : 'text-slate-500 bg-slate-950/40'
                  }`}
                >
                  DEEP SEARCH MATCHES ({filteredDeepItems.length})
                </div>

                {filteredDeepItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateToElement(item.elementId)}
                    onMouseEnter={() => sfx.playHover()}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center space-x-3 transition-all group ${
                      isLight ? 'hover:bg-purple-50/80' : 'hover:bg-purple-950/40'
                    }`}
                  >
                    {/* Circular Logo Icon for Specific Match */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${
                        item.iconType === 'ai'
                          ? isLight
                            ? 'bg-cyan-100 border-cyan-300 text-cyan-800'
                            : 'bg-cyan-950/90 border-cyan-500/50 text-cyan-300'
                          : isLight
                          ? 'bg-purple-50 border-purple-200 text-purple-700'
                          : 'bg-purple-950/80 border-purple-500/40 text-purple-300'
                      }`}
                    >
                      {item.iconType === 'ai' ? (
                        <Bot className="w-4 h-4 animate-pulse" />
                      ) : (
                        <FolderKanban className="w-4 h-4" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-tech font-bold text-xs sm:text-sm truncate">
                          {item.title}
                        </span>
                        <span
                          className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono uppercase shrink-0 ${
                            isLight
                              ? 'bg-slate-100 text-slate-700 border border-slate-200'
                              : 'bg-slate-900 text-purple-300 border border-purple-500/30'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 font-sans mt-0.5">
                        {item.snippet}
                      </p>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                        isLight
                          ? 'border-slate-200 text-slate-400 group-hover:text-purple-700 group-hover:border-purple-400'
                          : 'border-slate-800 text-slate-500 group-hover:text-purple-300 group-hover:border-purple-400'
                      }`}
                    >
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No matches */}
            {filteredSections.length === 0 && filteredDeepItems.length === 0 && (
              <div className="p-6 text-center">
                <p className="font-mono text-xs text-slate-400">
                  No section or project matching &ldquo;{query}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="mt-2 text-xs font-mono text-cyan-500 hover:underline"
                >
                  Show all sections
                </button>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div
            className={`px-3 py-2 border-t text-[10px] font-mono flex items-center justify-between ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-[#050b18] border-cyan-500/20 text-slate-400'
            }`}
          >
            <span>Click any item to smoothly jump to it</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-bold">10 MODULES AVAILABLE</span>
          </div>
        </div>
      )}
    </div>
  );
};
