import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, Github, Terminal } from 'lucide-react';
import { Project } from '../types';
import { generateProjectsExportCode } from '../utils/projectStorage';
import { sfx } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

interface ExportProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  allProjects: Project[];
}

export const ExportProjectsModal: React.FC<ExportProjectsModalProps> = ({
  isOpen,
  onClose,
  allProjects,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const exportCode = generateProjectsExportCode(allProjects);

  const handleCopy = () => {
    sfx.playClick();
    navigator.clipboard.writeText(exportCode);
    setCopied(true);
    sfx.playSuccess();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    sfx.playClick();
    const blob = new Blob([exportCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects-export.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    sfx.playSuccess();
  };

  return (
    <div
      id="export-projects-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
    >
      <div
        id="export-projects-modal-container"
        onClick={(e) => e.stopPropagation()}
        className={`max-w-2xl w-full rounded-3xl border p-6 sm:p-8 shadow-2xl relative animate-scale-up ${
          isLight
            ? 'bg-white border-cyan-300 text-slate-900'
            : 'bg-[#060e22] border-cyan-500/40 text-slate-100 shadow-cyan-950/50'
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 mb-4 border-b border-slate-200 dark:border-cyan-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-tech font-bold">
                Export Projects for GitHub Deployment
              </h2>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Permanently commit your uploaded/synced projects into your GitHub repository code.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Instructions */}
        <div className={`p-4 rounded-2xl border text-xs font-mono mb-4 space-y-2 ${
          isLight ? 'bg-cyan-50/60 border-cyan-200 text-cyan-950' : 'bg-cyan-950/20 border-cyan-500/30 text-cyan-200'
        }`}>
          <div className="font-bold flex items-center space-x-1.5 text-cyan-800 dark:text-cyan-300">
            <Github className="w-4 h-4" />
            <span>How to commit to GitHub permanently:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-300">
            <li>Click <strong>Copy Code</strong> below.</li>
            <li>Open <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400">src/data/portfolioData.ts</code> in your project repository.</li>
            <li>Replace the <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400">export const projects = [...]</code> array with this snippet.</li>
            <li>Run <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800">git add . && git commit -m "Add new project from GitHub" && git push</code>.</li>
          </ol>
        </div>

        {/* Code Snippet Box */}
        <div className="relative mb-6">
          <pre
            className={`p-4 rounded-2xl border text-xs font-mono max-h-60 overflow-y-auto ${
              isLight
                ? 'bg-slate-900 text-cyan-300 border-slate-700'
                : 'bg-black/90 text-cyan-300 border-cyan-500/30'
            }`}
          >
            {exportCode}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-mono text-xs font-semibold flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download .ts File</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-5 py-2 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md flex items-center space-x-2 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Code Snippet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
