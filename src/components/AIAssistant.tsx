import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  X,
  Minimize2,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Cpu,
  CornerDownLeft,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sfx } from '../utils/soundEffects';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'init-msg',
  role: 'assistant',
  text: `Hello! I am **Dhruba's AI Engineering Assistant**, powered by **Gemini 3.8 Flash**.\n\nI can tell you all about Dhruba Acharjee's engineering work at **JSTU EEE**, his robotics prototypes (like the **#projects Fire Fighting Robot** and **ECG Machine**), his leadership roles, and technical skills. \n\nFeel free to ask a question or pick one of the quick topics below!`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const SUGGESTIONS = [
  "Tell me about Dhruba's engineering background",
  "Explain the Fire Fighting Robot project",
  "What is his leadership role at JSTURC & EEE-05?",
  "What are Dhruba's core technical skills?",
  "How can I contact or collaborate with him?",
];

export const AIAssistant: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hasNewBadge, setHasNewBadge] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for global open-ai-assistant events
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
      sfx.playClick();
    };
    window.addEventListener('open-ai-assistant', handleOpenEvent);
    return () => window.removeEventListener('open-ai-assistant', handleOpenEvent);
  }, []);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setHasNewBadge(false);
    }
  }, [isOpen]);

  const handleToggleOpen = () => {
    sfx.playClick();
    setIsOpen((prev) => !prev);
  };

  const handleClearHistory = () => {
    sfx.playClick();
    setMessages([INITIAL_MESSAGE]);
  };

  const handleCopyText = (id: string, text: string) => {
    sfx.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = (overrideText || input).trim();
    if (!textToSend || isLoading) return;

    sfx.playClick();

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history format for server
      const history = newMessages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || "I'm ready to answer any questions about Dhruba's engineering work!";

      sfx.playSuccess();
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          text: `I had trouble connecting to the Gemini server. Please check your network or try again in a moment.\n\nIn the meantime, you can explore Dhruba's projects in the **#projects** section or reach out at **dhruboacharjee52@gmail.com**.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Helper to render message text with hashtag section jumps and bold formatting
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');

    return lines.map((line, lineIdx) => {
      // Tokenize by spaces and markdown bold markers
      const tokens = line.split(/(\*\*[^*]+\*\*|#\w+)/g);

      return (
        <p key={lineIdx} className={line.trim() === '' ? 'h-2' : 'min-h-[1.25rem]'}>
          {tokens.map((token, tIdx) => {
            if (token.startsWith('**') && token.endsWith('**')) {
              return (
                <strong key={tIdx} className="font-semibold text-cyan-600 dark:text-cyan-300">
                  {token.slice(2, -2)}
                </strong>
              );
            }
            if (token.startsWith('#')) {
              const sectionId = token.substring(1).toLowerCase();
              return (
                <button
                  key={tIdx}
                  type="button"
                  onClick={() => {
                    sfx.playClick();
                    const el = document.getElementById(sectionId);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded text-[11px] font-mono font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700 hover:bg-cyan-200 hover:underline cursor-pointer"
                  title={`Jump to section ${token}`}
                >
                  <span>{token}</span>
                </button>
              );
            }
            return <span key={tIdx}>{token}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-3">
        {/* Floating Tooltip / Teaser when collapsed */}
        {!isOpen && hasNewBadge && (
          <div
            onClick={handleToggleOpen}
            className={`hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-2xl shadow-xl border backdrop-blur-md cursor-pointer transition-transform hover:scale-105 active:scale-95 animate-bounce ${
              isLight
                ? 'bg-white/95 text-slate-800 border-cyan-300 shadow-cyan-900/10'
                : 'bg-slate-900/90 text-slate-200 border-cyan-500/40 shadow-cyan-950/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
            <div className="text-xs font-mono font-semibold">
              <span>Ask Dhruba's AI Co-Pilot</span>
            </div>
          </div>
        )}

        <button
          id="ai-assistant-toggle-button"
          onClick={handleToggleOpen}
          aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
          className={`relative p-3.5 sm:p-4 rounded-2xl shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer group active:scale-95 ${
            isOpen
              ? isLight
                ? 'bg-slate-800 text-white shadow-slate-900/30 rotate-90'
                : 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 rotate-90'
              : 'bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 text-white hover:from-cyan-500 hover:to-indigo-500 shadow-cyan-600/35 hover:shadow-cyan-500/50'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {/* Pulsing online status indicator dot */}
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-950" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Modal Panel */}
      {isOpen && (
        <div
          id="ai-assistant-chat-window"
          className={`fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[82vh] h-[600px] flex flex-col rounded-3xl border shadow-2xl backdrop-blur-xl overflow-hidden animate-scale-up transition-all ${
            isLight
              ? 'bg-white/95 border-cyan-200 text-slate-800 shadow-slate-900/20'
              : 'bg-[#081026]/95 border-cyan-500/40 text-slate-100 shadow-cyan-950/60'
          }`}
        >
          {/* Header */}
          <div
            className={`p-4 border-b flex items-center justify-between shrink-0 ${
              isLight
                ? 'bg-gradient-to-r from-cyan-50 via-sky-50 to-blue-50 border-slate-200'
                : 'bg-gradient-to-r from-[#0a1638] via-[#081026] to-[#0a1638] border-cyan-500/30'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-600/30 shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="font-tech font-bold text-sm sm:text-base flex items-center space-x-2">
                  <span>Dhruba.ai Assistant</span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Gemini 3.8</span>
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  EEE • Robotics • JSTU Portfolio Co-Pilot
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={handleClearHistory}
                className={`p-2 rounded-xl transition-colors ${
                  isLight
                    ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
                title="Reset conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleToggleOpen}
                className={`p-2 rounded-xl transition-colors ${
                  isLight
                    ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
                title="Minimize chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversation Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end space-x-2 max-w-[88%]">
                    {!isUser && (
                      <div className="w-6 h-6 rounded-lg bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`p-3.5 rounded-2xl leading-relaxed transition-all shadow-sm ${
                        isUser
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-xs font-sans'
                          : isLight
                          ? 'bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-xs'
                          : 'bg-[#0e1a3b]/90 text-slate-200 border border-cyan-500/20 rounded-bl-xs'
                      }`}
                    >
                      {renderFormattedText(msg.text)}
                    </div>
                  </div>

                  {/* Message Footer (Timestamp & Action) */}
                  <div className="flex items-center space-x-2 mt-1 px-1 text-[10px] font-mono text-slate-400">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        type="button"
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="hover:text-cyan-500 flex items-center space-x-0.5"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading / Typing Indicator */}
            {isLoading && (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-lg bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl rounded-bl-xs text-xs font-mono flex items-center space-x-1.5 border ${
                    isLight
                      ? 'bg-slate-100 text-slate-500 border-slate-200'
                      : 'bg-[#0e1a3b]/90 text-cyan-400 border-cyan-500/20'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px] text-slate-400">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestions Carousel */}
          {messages.length <= 3 && !isLoading && (
            <div className={`p-2.5 border-t border-b overflow-x-auto scrollbar-none flex gap-2 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#050b1d] border-cyan-500/20'
            }`}>
              {SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(s)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap border transition-all text-left flex items-center space-x-1 active:scale-95 cursor-pointer ${
                    isLight
                      ? 'bg-white hover:bg-cyan-50 border-slate-200 hover:border-cyan-300 text-slate-700 shadow-xs'
                      : 'bg-slate-900/80 hover:bg-cyan-950/80 border-cyan-500/20 hover:border-cyan-400/50 text-slate-300'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-cyan-500 shrink-0" />
                  <span className="truncate max-w-[200px]">{s}</span>
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div
            className={`p-3 border-t shrink-0 ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0a142e] border-cyan-500/20'
            }`}
          >
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Dhruba's projects, JSTU, skills..."
                disabled={isLoading}
                className={`flex-1 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-sans focus:outline-none transition-all border ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 focus:border-cyan-500 focus:bg-white text-slate-800 placeholder:text-slate-400'
                    : 'bg-slate-900/90 border-slate-700 focus:border-cyan-400 focus:bg-[#080e22] text-slate-100 placeholder:text-slate-500'
                }`}
              />

              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className={`p-2.5 rounded-2xl font-bold flex items-center justify-center transition-all cursor-pointer ${
                  !input.trim() || isLoading
                    ? 'opacity-40 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30 hover:from-cyan-500 hover:to-blue-500 active:scale-95'
                }`}
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-2 px-1 text-[10px] font-mono text-slate-400">
              <span>Press Enter to send</span>
              <span className="flex items-center space-x-1">
                <Cpu className="w-3 h-3 text-cyan-500" />
                <span>Gemini API Connected</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
