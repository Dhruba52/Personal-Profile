import React, { useState } from 'react';
import { Sparkles, Tv, Clapperboard, Smile, Film, Star, Flame, Zap } from 'lucide-react';
import { favoritesData } from '../data/portfolioData';
import { sfx } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

export const FavoritesSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState<'anime' | 'webSeries' | 'movies' | 'cartoons'>('anime');

  const currentCategory = favoritesData.find((cat) => cat.category === activeTab);

  const getTabIcon = (category: string) => {
    switch (category) {
      case 'anime':
        return Sparkles;
      case 'webSeries':
        return Tv;
      case 'movies':
        return Clapperboard;
      case 'cartoons':
      default:
        return Smile;
    }
  };

  const handleTabChange = (cat: 'anime' | 'webSeries' | 'movies' | 'cartoons') => {
    sfx.playClick();
    setActiveTab(cat);
  };

  return (
    <section id="favorites" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border transition-colors ${
              isLight
                ? 'bg-cyan-100 text-cyan-800 border-cyan-300'
                : 'bg-cyan-950/60 border-cyan-500/30 text-cyan-400'
            }`}
          >
            <span>&lt;MODULE_06: INSPIRATION_&_MEDIA&gt;</span>
          </div>
          <h2
            className={`font-tech text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase transition-colors ${
              isLight ? 'text-slate-900' : 'text-white text-glow-cyan'
            }`}
          >
            MEDIA & INSPIRATION
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent my-3" />
          <p className={`font-mono text-xs sm:text-sm max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Narratives, worldbuilding, and cinematic creativity that stimulate imagination and grit.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center mb-10">
          <div
            className={`inline-flex p-1.5 rounded-2xl border backdrop-blur-md shadow-lg flex-wrap justify-center gap-1.5 transition-colors ${
              isLight ? 'bg-white/95 border-slate-200 shadow-slate-200/50' : 'bg-slate-950/90 border-cyan-500/30 shadow-2xl'
            }`}
          >
            {favoritesData.map((tab) => {
              const Icon = getTabIcon(tab.category);
              const isActive = activeTab === tab.category;

              return (
                <button
                  key={tab.category}
                  id={`tab-btn-${tab.category}`}
                  onClick={() => handleTabChange(tab.category)}
                  onMouseEnter={() => sfx.playHover()}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-md shadow-cyan-600/30 border border-cyan-300/40'
                      : isLight
                      ? 'text-slate-600 hover:text-cyan-700 hover:bg-slate-100'
                      : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentCategory?.items.map((item, index) => (
            <div
              key={item.id}
              id={`fav-item-${item.id}`}
              onMouseEnter={() => sfx.playHover()}
              className={`p-5 rounded-2xl border transition-all duration-300 relative group overflow-hidden flex flex-col justify-between ${
                isLight
                  ? 'bg-white/95 border-slate-200/90 hover:border-cyan-400 hover:shadow-xl shadow-sm shadow-slate-200/40'
                  : 'bg-[#070e1f]/85 border-cyan-500/20 hover:border-cyan-400/60 hover:bg-[#0c1836] shadow-lg'
              }`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 group-hover:bg-cyan-500/10 rounded-full blur-xl transition-all" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded-lg border ${
                      isLight
                        ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                        : 'bg-cyan-950/80 text-cyan-400 border-cyan-500/30'
                    }`}
                  >
                    #0{index + 1}
                  </span>
                  <span className={`${isLight ? 'text-slate-400 group-hover:text-purple-600' : 'text-slate-500 group-hover:text-purple-400'} transition-colors`}>
                    {activeTab === 'anime' ? (
                      <Flame className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Star className="w-4 h-4 text-amber-400" />
                    )}
                  </span>
                </div>

                <h3
                  className={`text-lg font-tech font-bold transition-colors mb-1.5 ${
                    isLight ? 'text-slate-900 group-hover:text-cyan-700' : 'text-white group-hover:text-cyan-300'
                  }`}
                >
                  {item.title}
                </h3>

                {item.note && (
                  <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {item.note}
                  </p>
                )}
              </div>

              <div className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-mono ${isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800/80 text-slate-400'}`}>
                <span className="capitalize">{activeTab} Entry</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform inline-block">
                  Favorite ★
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
