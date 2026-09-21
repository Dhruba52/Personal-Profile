import React, { useState } from 'react';
import { Mail, Github, Linkedin, Facebook, Instagram, Copy, Check, ExternalLink, Send, MessageSquare, Terminal } from 'lucide-react';
import { socialLinks, personalInfo } from '../data/portfolioData';
import { sfx } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

export const ContactSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Client-side quick email draft composer (no backend required)
  const [draftSubject, setDraftSubject] = useState('');
  const [draftMessage, setDraftMessage] = useState('');

  const getSocialIcon = (id: string) => {
    switch (id) {
      case 'email':
        return Mail;
      case 'github':
        return Github;
      case 'linkedin':
        return Linkedin;
      case 'facebook':
        return Facebook;
      case 'instagram':
      default:
        return Instagram;
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    sfx.playSuccess();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLaunchEmailClient = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClick();
    const emailLink = socialLinks.find((s) => s.id === 'email');
    const recipient = emailLink ? emailLink.handlePlaceholder : 'dhruboacharjee52@gmail.com';
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
      draftSubject || 'Hello Dhruba — Engineering Inquiry'
    )}&body=${encodeURIComponent(draftMessage)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
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
            <span>&lt;MODULE_09: COMMUNICATIONS_NODE&gt;</span>
          </div>
          <h2
            className={`font-tech text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase transition-colors ${
              isLight ? 'text-slate-900' : 'text-white text-glow-cyan'
            }`}
          >
            LET'S CONNECT
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent my-3" />
          <p className={`font-mono text-xs sm:text-sm max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Direct channels for collaboration, academic dialogue, and robotics discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Social Channels & Contact Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className={`text-xs font-mono uppercase tracking-wider mb-2 flex items-center space-x-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>OFFICIAL NETWORK PORTS</span>
            </div>

            <div className="space-y-3">
              {socialLinks.map((link) => {
                const Icon = getSocialIcon(link.id);
                const isCopied = copiedId === link.id;

                return (
                  <div
                    key={link.id}
                    id={`contact-card-${link.id}`}
                    onMouseEnter={() => sfx.playHover()}
                    className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group shadow-sm ${
                      isLight
                        ? 'bg-white/95 border-slate-200/90 hover:border-cyan-400 hover:bg-cyan-50/20 shadow-slate-200/50'
                        : 'bg-[#081124]/90 border-cyan-500/20 hover:border-cyan-400 hover:bg-[#0c1836] shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isLight
                            ? 'bg-cyan-50 border-cyan-200 text-cyan-700 group-hover:bg-cyan-100'
                            : 'bg-slate-900 border-slate-800 text-cyan-400 group-hover:text-cyan-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{link.platform}</div>
                        <div
                          className={`text-sm font-semibold font-mono truncate ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}
                        >
                          {link.handlePlaceholder}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => copyToClipboard(link.handlePlaceholder, link.id)}
                        title="Copy to clipboard"
                        className={`p-2 rounded-xl border transition-colors ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Open ${link.platform}`}
                        className={`p-2 rounded-xl border transition-colors ${
                          isLight
                            ? 'bg-cyan-50 border-cyan-300 text-cyan-700 hover:bg-cyan-100'
                            : 'bg-cyan-950 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900'
                        }`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* GitHub Pages Notice */}
            <div
              className={`p-4 rounded-2xl border font-mono text-xs ${
                isLight
                  ? 'bg-slate-50/80 border-slate-200 text-slate-600'
                  : 'bg-slate-950/80 border-slate-800/80 text-slate-400'
              }`}
            >
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">[CONFIG_GUIDE]</span> To connect your real accounts, update the URLs and handles in{' '}
              <code className={`px-1.5 py-0.5 rounded border ${isLight ? 'bg-white text-slate-800 border-slate-200' : 'bg-slate-900 text-slate-300 border-slate-800'}`}>
                src/data/portfolioData.ts
              </code>.
            </div>
          </div>

          {/* Quick Client-side Mailto Dispatcher */}
          <div className="lg:col-span-6">
            <div
              className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl shadow-xl relative transition-all ${
                isLight
                  ? 'bg-white/95 border-sky-200/90 shadow-slate-200/60'
                  : 'bg-[#081229]/95 border-cyan-500/30 shadow-2xl'
              }`}
            >
              <div className={`flex items-center space-x-2 font-mono text-xs mb-4 ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`}>
                <MessageSquare className="w-4 h-4" />
                <span>COMPOSE DIRECT DISPATCH (MAILTO)</span>
              </div>

              <h3 className={`text-xl font-tech font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Send a Message to Dhruba
              </h3>
              <p className={`text-xs font-mono mb-6 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Client-side native dispatch. Opens your default email client with your message pre-filled. No external backend required.
              </p>

              <form onSubmit={handleLaunchEmailClient} className="space-y-4">
                <div>
                  <label className={`block text-xs font-mono mb-1.5 uppercase ${isLight ? 'text-slate-700 font-medium' : 'text-slate-300'}`}>
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={draftSubject}
                    onChange={(e) => setDraftSubject(e.target.value)}
                    placeholder="e.g., Robotics Collaboration / EEE Project Inquiry"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-colors ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-500'
                        : 'bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus:border-cyan-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-mono mb-1.5 uppercase ${isLight ? 'text-slate-700 font-medium' : 'text-slate-300'}`}>
                    Message Body
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={draftMessage}
                    onChange={(e) => setDraftMessage(e.target.value)}
                    placeholder="Write your note, idea or question here..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-colors resize-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-500'
                        : 'bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus:border-cyan-400'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => sfx.playHover()}
                  className="w-full py-3 rounded-xl font-mono text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/30 border border-cyan-400/30 flex items-center justify-center space-x-2 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Launch Email Dispatch</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
