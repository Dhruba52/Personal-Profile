import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Volume2,
  VolumeX,
  Menu,
  X,
  Cpu,
  Sun,
  Moon,
  Search,
  Sparkles,
  User,
  Bot,
  Award,
  Trophy,
  Film,
  Rocket,
  Send,
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';
import { SearchBar } from './SearchBar';

interface NavbarProps {
  onOpenTerminal: () => void;
  onSearchChange?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onSearchChange }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', href: '#home', icon: Sparkles },
    { label: 'About', href: '#about', icon: User },
    { label: 'Skills', href: '#skills', icon: Bot },
    { label: 'Projects', href: '#projects', icon: Cpu },
    { label: 'Journey', href: '#journey', icon: Award },
    { label: 'Competitions', href: '#competitions', icon: Trophy },
    { label: 'Favorites', href: '#favorites', icon: Film },
    { label: 'Vision', href: '#vision', icon: Rocket },
    { label: 'Contact', href: '#contact', icon: Send },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Track active section
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
  };

  const handleNavClick = (href: string) => {
    sfx.playClick();
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleThemeToggle = () => {
    sfx.playClick();
    toggleTheme();
  };

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isLight
            ? 'bg-white/90 backdrop-blur-md border-b border-sky-200/80 shadow-md shadow-sky-950/5 py-2.5'
            : 'bg-[#030712]/90 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-cyan-950/20 py-2.5'
          : isLight
          ? 'bg-white/70 backdrop-blur-sm py-3.5 border-b border-sky-100'
          : 'bg-transparent py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Logo */}
        <a
          href="#home"
          id="brand-logo"
          onClick={() => sfx.playClick()}
          className="flex items-center space-x-2.5 sm:space-x-3 group shrink-0"
        >
          <div
            className={`relative w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-md ${
              isLight
                ? 'border-cyan-500/60 bg-gradient-to-tr from-cyan-100 via-white to-blue-50 text-cyan-700 shadow-cyan-500/20 group-hover:border-cyan-600 group-hover:shadow-cyan-500/35'
                : 'border-cyan-400/60 bg-gradient-to-tr from-[#041029] via-[#0a183d] to-cyan-950 text-cyan-400 shadow-cyan-500/30 group-hover:border-cyan-300 group-hover:shadow-cyan-400/50'
            }`}
          >
            {/* Outer dashed spinning cyber orbital ring */}
            <div className="absolute -inset-1 rounded-full border border-cyan-400/40 border-dashed animate-spin-slow pointer-events-none" />
            <Cpu className="w-4 h-4 animate-pulse drop-shadow-sm" />
            {/* Central glowing reactor core */}
            <span className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-60 pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span
                className={`font-mono text-sm sm:text-base font-bold tracking-wider transition-colors ${
                  isLight
                    ? 'text-slate-900 group-hover:text-cyan-600'
                    : 'text-white group-hover:text-cyan-400'
                }`}
              >
                DHRUBA<span className={isLight ? 'text-cyan-600' : 'text-cyan-400'}>.EXE</span>
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold border ${
                  isLight
                    ? 'bg-cyan-50 text-cyan-700 border-cyan-300'
                    : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'
                }`}
              >
                v2.4
              </span>
            </div>
            <div className="flex items-center space-x-1.5 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>SYS_ONLINE</span>
            </div>
          </div>
        </a>

        {/* Integrated Search & Section Dropdown (Desktop / Tablet) */}
        <div className="hidden md:block flex-1 max-w-sm lg:max-w-md mx-2">
          <SearchBar onSearchChange={onSearchChange} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden 2xl:flex items-center space-x-1 font-mono text-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <button
                key={item.label}
                id={`nav-link-${item.label.toLowerCase()}`}
                onClick={() => handleNavClick(item.href)}
                onMouseEnter={() => sfx.playHover()}
                className={`px-2.5 py-1.5 rounded-full transition-all duration-150 relative ${
                  isActive
                    ? isLight
                      ? 'text-cyan-800 bg-cyan-100/80 border border-cyan-300 shadow-xs font-bold'
                      : 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/50 shadow-sm shadow-cyan-500/20 font-bold'
                    : isLight
                    ? 'text-slate-700 hover:text-cyan-700 hover:bg-slate-100/80'
                    : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/40'
                }`}
              >
                {isActive && (
                  <span
                    className={`absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full ${
                      isLight ? 'bg-cyan-600' : 'bg-cyan-400'
                    }`}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Circular Shaped Buttons with Logo Badges */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Mobile Search Toggle Button - Circular Shape */}
          <button
            id="mobile-search-toggle-btn"
            onClick={() => {
              sfx.playClick();
              setMobileSearchOpen(!mobileSearchOpen);
            }}
            className={`md:hidden w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
              mobileSearchOpen
                ? isLight
                  ? 'border-cyan-500 bg-cyan-50 text-cyan-700 shadow-sm'
                  : 'border-cyan-400 bg-cyan-950 text-cyan-300 shadow-sm shadow-cyan-500/30'
                : isLight
                ? 'border-slate-300 bg-white text-slate-700 hover:text-cyan-700 hover:border-cyan-400 shadow-xs'
                : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white hover:border-cyan-500/40'
            }`}
            title="Search sections & keywords"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Mode Toggle - Circular Pill Shape with Circular Emblem */}
          <button
            id="theme-toggle-btn"
            onClick={handleThemeToggle}
            onMouseEnter={() => sfx.playHover()}
            title={isLight ? 'Switch to Dark Cyber Mode' : 'Switch to Light Lab Mode'}
            className={`flex items-center space-x-1.5 pl-1.5 pr-3 py-1 rounded-full border text-xs font-mono transition-all duration-200 ${
              isLight
                ? 'border-amber-300 bg-amber-50/90 text-amber-800 hover:bg-amber-100 hover:border-amber-400 shadow-xs'
                : 'border-cyan-500/40 bg-[#061026] text-cyan-300 hover:bg-cyan-950 hover:border-cyan-400 shadow-sm shadow-cyan-950/40'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isLight ? 'bg-amber-200/80 text-amber-700' : 'bg-cyan-500/20 text-cyan-300'
              }`}
            >
              {isLight ? (
                <Sun className="w-3.5 h-3.5 animate-spin-slow" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
            </div>
            <span className="hidden sm:inline font-bold">{isLight ? 'LIGHT' : 'DARK'}</span>
          </button>

          {/* AI Assistant Launcher Button */}
          <button
            id="nav-ai-assistant-btn"
            onClick={() => {
              sfx.playClick();
              window.dispatchEvent(new CustomEvent('open-ai-assistant'));
            }}
            onMouseEnter={() => sfx.playHover()}
            title="Ask Dhruba's Gemini AI Assistant"
            className={`flex items-center space-x-1.5 pl-1.5 pr-3 py-1 rounded-full border text-xs font-mono transition-all ${
              isLight
                ? 'border-cyan-300 bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-cyan-100 text-cyan-800 shadow-xs'
                : 'border-cyan-500/50 bg-gradient-to-r from-[#071330] to-[#0d1f4a] hover:border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-950/40'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isLight ? 'bg-cyan-200/80 text-cyan-800' : 'bg-cyan-500/20 text-cyan-300'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold flex items-center space-x-1">
              <span>AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </span>
          </button>

          {/* Terminal Launcher - Circular Pill Shape with Circular Terminal Icon */}
          <button
            id="open-terminal-btn"
            onClick={() => {
              sfx.playClick();
              onOpenTerminal();
            }}
            onMouseEnter={() => sfx.playHover()}
            title="Open Interactive Cyberpunk Terminal (CLI)"
            className={`flex items-center space-x-1.5 pl-1.5 pr-3 py-1 rounded-full border text-xs font-mono transition-all ${
              isLight
                ? 'border-cyan-300 bg-cyan-50 hover:bg-cyan-100 hover:border-cyan-400 text-cyan-800 shadow-xs'
                : 'border-cyan-500/40 bg-[#061026] hover:bg-cyan-950 hover:border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-950/40'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isLight ? 'bg-cyan-200/70 text-cyan-800' : 'bg-cyan-500/20 text-cyan-300'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline font-bold">CLI</span>
          </button>

          {/* Sound FX Toggle - Circular Shape */}
          <button
            id="sound-toggle-btn"
            onClick={toggleSound}
            onMouseEnter={() => sfx.playHover()}
            title={isMuted ? 'Turn on Audio Feedback' : 'Mute Audio'}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
              !isMuted
                ? isLight
                  ? 'border-cyan-400 bg-cyan-100 text-cyan-800 shadow-xs'
                  : 'border-cyan-400 bg-cyan-500/25 text-cyan-300 shadow-sm shadow-cyan-500/30'
                : isLight
                ? 'border-slate-300 bg-white text-slate-500 hover:text-slate-800 hover:border-slate-400 shadow-xs'
                : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mobile Hamburger Button - Circular Shape */}
          <button
            id="mobile-menu-btn"
            onClick={() => {
              sfx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className={`2xl:hidden w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
              isLight
                ? 'border-slate-300 bg-white text-slate-700 hover:text-cyan-700 shadow-xs'
                : 'border-slate-700 bg-slate-900/80 text-slate-300 hover:text-cyan-400'
            }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      {mobileSearchOpen && (
        <div
          className={`md:hidden px-4 py-3 border-b transition-all ${
            isLight
              ? 'bg-white/95 border-sky-200 shadow-lg'
              : 'bg-[#070e24]/95 border-cyan-500/30 shadow-2xl'
          }`}
        >
          <SearchBar onSearchChange={onSearchChange} />
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className={`2xl:hidden border-b px-4 pt-3 pb-5 space-y-2 shadow-2xl transition-all ${
            isLight
              ? 'bg-white/98 border-sky-200 text-slate-800'
              : 'bg-[#070d1e]/98 border-cyan-500/20 text-slate-200'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-2 mb-2 border-b text-[11px] font-mono ${
              isLight ? 'border-slate-200 text-cyan-700' : 'border-slate-800 text-cyan-400'
            }`}
          >
            <span>&gt; NAVIGATION_SYSTEM_ACTIVE</span>
            <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>MODE: {theme.toUpperCase()}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 font-mono text-xs">
            {navItems.map((item) => {
              const ItemIcon = item.icon;
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
                    isActive
                      ? isLight
                        ? 'text-cyan-800 bg-cyan-100/90 border border-cyan-300 font-bold shadow-xs'
                        : 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/50 font-bold shadow-sm shadow-cyan-950/50'
                      : isLight
                      ? 'text-slate-700 hover:bg-slate-100 hover:text-cyan-800 border border-transparent'
                      : 'text-slate-300 hover:bg-slate-900/60 hover:text-cyan-400 border border-transparent'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      isActive
                        ? isLight
                          ? 'bg-cyan-600 text-white'
                          : 'bg-cyan-500 text-slate-950'
                        : isLight
                        ? 'bg-slate-200 text-slate-600'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <ItemIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
