import React, { useState } from 'react';
import { CyberBackground } from './components/CyberBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { InterestsSection } from './components/InterestsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { JourneySection } from './components/JourneySection';
import { CompetitionsSection } from './components/CompetitionsSection';
import { FavoritesSection } from './components/FavoritesSection';
import { HobbiesSection } from './components/HobbiesSection';
import { FutureVisionSection } from './components/FutureVisionSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { AIAssistant } from './components/AIAssistant';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 ${
        isLight
          ? 'bg-[#f8fafc] text-slate-800 selection:bg-cyan-200 selection:text-cyan-900'
          : 'bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200'
      }`}
    >
      {/* Dynamic Futuristic Canvas & Circuit Grid Background */}
      <CyberBackground />

      {/* Sticky Glassmorphic Cyber Navbar with Search & Theme Switch */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Main Sections Hierarchy */}
      <main className="relative z-10">
        {/* 1. Home / Hero */}
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />

        {/* 2. About Me */}
        <AboutSection />

        {/* 3. Interests & Skills */}
        <InterestsSection />

        {/* 4. Projects I Have Built */}
        <ProjectsSection />

        {/* 5. Journey / Activities Timeline */}
        <JourneySection />

        {/* 6. Competitions & Events */}
        <CompetitionsSection />

        {/* 7. Favorites & Media */}
        <FavoritesSection />

        {/* 8. Hobbies */}
        <HobbiesSection />

        {/* 9. Future Vision (Student → Creator → Entrepreneur) */}
        <FutureVisionSection />

        {/* Personal Philosophy Quote */}
        <PhilosophySection />

        {/* 10. Contact */}
        <ContactSection />
      </main>

      {/* Cyberpunk Footer */}
      <Footer />

      {/* Interactive CLI Easter Egg Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Floating Gemini AI Portfolio Assistant */}
      <AIAssistant />
    </div>
  );
}
