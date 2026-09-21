import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { personalInfo, projects, interestsSkills, visionStages, socialLinks } from '../data/portfolioData';
import { sfx } from '../utils/soundEffects';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'sysinfo',
      output: (
        <div className="space-y-1 text-slate-300">
          <div className="text-cyan-300 font-bold">DHRUBA.EXE [Version 2.4.0 — Robotics OS]</div>
          <div>User: {personalInfo.name} ({personalInfo.studentId})</div>
          <div>Dept: {personalInfo.department} (2nd Year, 2nd Semester)</div>
          <div>University: {personalInfo.university}</div>
          <div className="text-emerald-400">Type <span className="text-cyan-300 font-bold">'help'</span> to inspect available executable commands.</div>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    sfx.playClick();

    let resultOutput: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        resultOutput = (
          <div className="space-y-1 text-slate-300">
            <div className="text-cyan-400 font-bold mb-1">AVAILABLE COMMANDS:</div>
            <div><span className="text-cyan-300 font-semibold">about</span> : Display personal biographical record</div>
            <div><span className="text-cyan-300 font-semibold">skills</span> : List technical exploration domains</div>
            <div><span className="text-cyan-300 font-semibold">projects</span> : List all built robotics & electronics projects</div>
            <div><span className="text-cyan-300 font-semibold">vision</span> : Display future pathway (Student → Creator → Entrepreneur)</div>
            <div><span className="text-cyan-300 font-semibold">contact</span> : Show official connection ports & links</div>
            <div><span className="text-cyan-300 font-semibold">clear</span> : Clear terminal console output</div>
            <div><span className="text-cyan-300 font-semibold">exit</span> : Close terminal window</div>
          </div>
        );
        break;

      case 'about':
        resultOutput = (
          <div className="space-y-1 text-slate-300">
            <div className="text-cyan-400 font-bold">{personalInfo.name} (Age: {personalInfo.age})</div>
            <div>{personalInfo.bioParagraph1}</div>
            <div className="text-slate-400 mt-1">Hometown: {personalInfo.permanentAddress}</div>
            <div className="text-slate-400">Campus: {personalInfo.presentAddress}</div>
          </div>
        );
        break;

      case 'skills':
        resultOutput = (
          <div className="space-y-1.5 text-slate-300">
            <div className="text-purple-400 font-bold">CURIOSITY & EXPLORATION DOMAINS:</div>
            {interestsSkills.map((s) => (
              <div key={s.id} className="flex items-center space-x-2">
                <span className="text-cyan-400">• {s.name}</span>
                <span className="text-xs text-slate-400">[{s.status}]</span>
                <span className="text-xs text-slate-500">— {s.description}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        resultOutput = (
          <div className="space-y-2 text-slate-300">
            <div className="text-cyan-400 font-bold">BUILT PROJECTS ARCHIVE:</div>
            {projects.map((p) => (
              <div key={p.id} className="border-l-2 border-cyan-500/40 pl-3">
                <div className="text-white font-bold">{p.number} — {p.title} <span className="text-xs text-slate-400">({p.category})</span></div>
                <div className="text-xs text-slate-300">{p.description}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'vision':
        resultOutput = (
          <div className="space-y-2 text-slate-300">
            <div className="text-emerald-400 font-bold">PATHWAY: Student → Creator → Entrepreneur</div>
            {visionStages.map((v) => (
              <div key={v.step} className="text-xs">
                <span className="text-cyan-300 font-bold">[{v.stage}]:</span> {v.detail}
              </div>
            ))}
            <div className="text-xs italic text-slate-400 mt-1">
              "I don't just want to learn technology. I want to use it to build something meaningful."
            </div>
          </div>
        );
        break;

      case 'contact':
        resultOutput = (
          <div className="space-y-1 text-slate-300">
            <div className="text-cyan-400 font-bold">CONTACT CHANNELS:</div>
            {socialLinks.map((s) => (
              <div key={s.id} className="text-xs">
                <span className="text-slate-400">{s.platform}:</span>{' '}
                <span className="text-cyan-300">{s.handlePlaceholder}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        setInputVal('');
        return;

      default:
        resultOutput = (
          <div className="text-rose-400">
            Command not recognized: <span className="font-mono underline">{cmd}</span>. Type <span className="text-cyan-300">'help'</span> for list of commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: inputVal, output: resultOutput }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl h-[520px] rounded-xl bg-[#060c1d] border border-cyan-500/50 shadow-2xl flex flex-col overflow-hidden font-mono text-xs sm:text-sm">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0a142c] border-b border-cyan-500/30 text-slate-300 select-none">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white tracking-wider text-xs">
              dhruba@cyberlab:~$ [Interactive Terminal CLI]
            </span>
          </div>
          <button
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-left">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold">
                <span>&gt;</span>
                <span className="text-white">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Bar */}
        <form
          onSubmit={handleCommand}
          className="px-4 py-3 bg-[#070e22] border-t border-cyan-500/20 flex items-center space-x-2"
        >
          <span className="text-cyan-400 font-bold text-sm">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'projects', 'about'..."
            className="flex-1 bg-transparent text-cyan-300 placeholder-slate-600 focus:outline-none font-mono text-sm"
          />
          <button
            type="submit"
            className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
