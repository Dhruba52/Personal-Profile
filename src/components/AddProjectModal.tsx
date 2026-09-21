import React, { useState, useRef } from 'react';
import {
  X,
  Github,
  Upload,
  Sparkles,
  Link,
  Cpu,
  FileText,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  Image as ImageIcon,
  FolderArchive,
  RefreshCw,
  Code,
  ExternalLink,
} from 'lucide-react';
import { Project } from '../types';
import { fetchGitHubRepoDetails, saveCustomProject } from '../utils/projectStorage';
import { sfx } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectSaved: (newProject: Project) => void;
  existingProject?: Project | null;
}

const CATEGORY_OPTIONS = [
  'Robotics / Embedded Systems',
  'Biomedical Electronics',
  'IoT & Automation',
  'Automation / Simulation',
  'Machine Learning & AI',
  'Circuit Design & Hardware',
  'Software & Web Systems',
];

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onProjectSaved,
  existingProject,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Active form mode
  const [activeTab, setActiveTab] = useState<'github' | 'manual'>('github');

  // GitHub fetch state
  const [githubInput, setGithubInput] = useState(existingProject?.githubUrl || '');
  const [isFetchingGithub, setIsFetchingGithub] = useState(false);
  const [githubError, setGithubError] = useState<string | null>(null);
  const [githubSuccess, setGithubSuccess] = useState(false);

  // Form Fields
  const [title, setTitle] = useState(existingProject?.title || '');
  const [category, setCategory] = useState(existingProject?.category || CATEGORY_OPTIONS[0]);
  const [description, setDescription] = useState(existingProject?.description || '');
  const [longDescription, setLongDescription] = useState(existingProject?.longDescription || '');
  const [githubUrl, setGithubUrl] = useState(existingProject?.githubUrl || '');
  const [demoUrl, setDemoUrl] = useState(existingProject?.demoUrl || '');
  const [isSimulation, setIsSimulation] = useState(existingProject?.isSimulation || false);
  const [simulationPlatform, setSimulationPlatform] = useState(existingProject?.simulationPlatform || 'Tinkercad');

  // Technologies
  const [techInput, setTechInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>(
    existingProject?.technologies || ['Arduino', 'C++', 'Sensors']
  );

  // Key Features
  const [featureInput, setFeatureInput] = useState('');
  const [features, setFeatures] = useState<string[]>(
    existingProject?.features || [
      'Microcontroller closed-loop control system',
      'Real-time sensor telemetry & automated actuation',
    ]
  );

  // Image Upload State
  const [imagePreview, setImagePreview] = useState<string>(
    existingProject?.image || '/assets/projects/fire-fighting-robot.jpg'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Attached files
  const [attachedFiles, setAttachedFiles] = useState<
    Array<{ name: string; size: number; type: string; dataUrl?: string }>
  >(existingProject?.attachedFiles || []);
  const docInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle GitHub sync fetch
  const handleFetchFromGithub = async () => {
    if (!githubInput.trim()) {
      setGithubError('Please enter a GitHub repository URL or format like "owner/repo"');
      return;
    }

    setIsFetchingGithub(true);
    setGithubError(null);
    setGithubSuccess(false);

    try {
      sfx.playClick();
      const repo = await fetchGitHubRepoDetails(githubInput);
      
      // Auto-populate fields
      setTitle(repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
      setDescription(repo.description || `Engineering project hosted on GitHub: ${repo.name}`);
      setGithubUrl(repo.htmlUrl);
      if (repo.homepage) {
        setDemoUrl(repo.homepage);
      }

      // Populate technologies from topics and language
      const detectedTech = new Set(technologies);
      if (repo.language) detectedTech.add(repo.language);
      repo.topics.forEach((topic) => {
        detectedTech.add(topic.charAt(0).toUpperCase() + topic.slice(1));
      });
      setTechnologies(Array.from(detectedTech));

      setGithubSuccess(true);
      sfx.playSuccess();
    } catch (err: any) {
      setGithubError(err.message || 'Failed to fetch repository from GitHub.');
      sfx.playClick();
    } finally {
      setIsFetchingGithub(false);
    }
  };

  // Handle Image File Upload
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size exceeds 5MB limit. Please upload a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
          sfx.playSuccess();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Attach Project Files (.ino, .py, .cpp, .pdf, .zip, etc.)
  const handleDocFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setAttachedFiles((prev) => [
            ...prev,
            {
              name: file.name,
              size: file.size,
              type: file.type || file.name.split('.').pop() || 'file',
              dataUrl: event.target?.result as string,
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
      sfx.playSuccess();
    }
  };

  // Technology tag management
  const handleAddTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
      sfx.playHover();
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  // Feature item management
  const handleAddFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
      sfx.playHover();
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  // Save Project
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a project title');
      return;
    }

    const projectId =
      existingProject?.id ||
      title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
      `project-${Date.now()}`;

    const newProject: Project = {
      id: projectId,
      number: existingProject?.number || 'NEW',
      title: title.trim(),
      category: category,
      description: description.trim() || 'Engineering project repository and documentation.',
      longDescription: longDescription.trim() || description.trim(),
      image: imagePreview,
      technologies: technologies.length > 0 ? technologies : ['Hardware', 'Code'],
      githubUrl: githubUrl.trim() || 'https://github.com/dhruboacharjee52',
      demoUrl: demoUrl.trim() || '#',
      features: features,
      isSimulation: isSimulation,
      simulationPlatform: isSimulation ? simulationPlatform : undefined,
      isUserAdded: true,
      uploadedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      attachedFiles: attachedFiles,
    };

    saveCustomProject(newProject);
    sfx.playSuccess();
    onProjectSaved(newProject);
    onClose();
  };

  return (
    <div
      id="add-project-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto"
    >
      <div
        id="add-project-modal-container"
        onClick={(e) => e.stopPropagation()}
        className={`max-w-3xl w-full my-8 rounded-3xl border p-6 sm:p-8 shadow-2xl relative animate-scale-up ${
          isLight
            ? 'bg-white border-cyan-300 text-slate-900'
            : 'bg-[#060e22] border-cyan-500/40 text-slate-100 shadow-cyan-950/50'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 mb-6 border-b border-slate-200 dark:border-cyan-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-tech font-bold">
                {existingProject ? 'Edit Project / Files' : 'Upload & Sync Project from GitHub'}
              </h2>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                Import repository metadata, upload schematics/files, and publish to your portfolio.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center space-x-2 mb-6 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              sfx.playClick();
              setActiveTab('github');
            }}
            className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'github'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>1. Sync with GitHub Repository</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sfx.playClick();
              setActiveTab('manual');
            }}
            className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'manual'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>2. Project Details & File Uploads</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* GITHUB SYNC SECTION */}
          {activeTab === 'github' && (
            <div
              className={`p-5 rounded-2xl border space-y-4 ${
                isLight ? 'bg-cyan-50/50 border-cyan-200' : 'bg-cyan-950/20 border-cyan-500/30'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="font-mono text-xs font-bold uppercase text-cyan-800 dark:text-cyan-300">
                  Instant Auto-Fill From GitHub
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Enter your public GitHub repository URL or repository handle. We will automatically fetch the project title, description, topics, programming language, and star count!
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Github className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={githubInput}
                    onChange={(e) => setGithubInput(e.target.value)}
                    placeholder="https://github.com/dhruboacharjee52/your-robot-project"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-900'
                        : 'bg-slate-900 border-slate-700 text-slate-100'
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleFetchFromGithub}
                  disabled={isFetchingGithub}
                  className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer shrink-0"
                >
                  {isFetchingGithub ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Fetching...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Fetch Repository Data</span>
                    </>
                  )}
                </button>
              </div>

              {githubSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center space-x-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Repository synced successfully! You can now adjust files and details below.</span>
                </div>
              )}

              {githubError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-mono flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{githubError}</span>
                </div>
              )}
            </div>
          )}

          {/* PROJECT CORE FIELDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase mb-1">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Autonomous Maze Solver Robot"
                className={`w-full px-3.5 py-2 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900'
                    : 'bg-slate-900 border-slate-700 text-slate-100'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-3.5 py-2 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900'
                    : 'bg-slate-900 border-slate-700 text-slate-100'
                }`}
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">
              Short Description / Abstract *
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="High-level summary of what the project achieves and hardware used..."
              className={`w-full px-3.5 py-2 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900'
                  : 'bg-slate-900 border-slate-700 text-slate-100'
              }`}
            />
          </div>

          {/* Long Description / Methodology */}
          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">
              Detailed Description & Technical Breakdown
            </label>
            <textarea
              rows={3}
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              placeholder="Detailed engineering explanation: sensors utilized, microcontroller logic, closed loop response, calibration steps..."
              className={`w-full px-3.5 py-2 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900'
                  : 'bg-slate-900 border-slate-700 text-slate-100'
              }`}
            />
          </div>

          {/* IMAGE UPLOAD & MEDIA */}
          <div
            className={`p-4 rounded-2xl border space-y-3 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-slate-500 uppercase flex items-center space-x-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-500" />
                <span>Project Showcase Image / Circuit Schematic</span>
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold hover:underline flex items-center space-x-1"
              >
                <Upload className="w-3 h-3" />
                <span>Upload From Computer</span>
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageFileChange}
            />

            <div className="flex items-center gap-4">
              <div className="w-24 h-16 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-900 shrink-0">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={imagePreview}
                  onChange={(e) => setImagePreview(e.target.value)}
                  placeholder="Or paste an image URL here..."
                  className={`w-full px-3 py-1.5 rounded-lg border text-xs font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500 ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900'
                      : 'bg-slate-900 border-slate-700 text-slate-100'
                  }`}
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Upload photos of your hardware prototype, circuit layout, Tinkercad capture, or CAD model.
                </p>
              </div>
            </div>
          </div>

          {/* ATTACH PROJECT FILES (.ino, .cpp, .py, .pdf, .zip) */}
          <div
            className={`p-4 rounded-2xl border space-y-3 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-slate-500 uppercase flex items-center space-x-1.5">
                <FolderArchive className="w-3.5 h-3.5 text-purple-500" />
                <span>Attach Project Files (Code, Schematics, Reports)</span>
              </label>
              <button
                type="button"
                onClick={() => docInputRef.current?.click()}
                className="text-xs font-mono text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center space-x-1"
              >
                <Plus className="w-3 h-3" />
                <span>Attach Files</span>
              </button>
            </div>

            <input
              type="file"
              ref={docInputRef}
              multiple
              className="hidden"
              onChange={handleDocFileChange}
            />

            {attachedFiles.length === 0 ? (
              <p className="text-xs text-slate-400 font-mono italic">
                No files attached yet. You can attach source code files (.ino, .py, .cpp), circuit diagrams, or project reports.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {attachedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-purple-500/30 bg-purple-950/20 text-xs font-mono"
                  >
                    <FileText className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-semibold">{file.name}</span>
                    <span className="text-[10px] text-slate-400">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setAttachedFiles(attachedFiles.filter((_, i) => i !== idx))
                      }
                      className="text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TECHNOLOGIES TAGS INPUT */}
          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">
              Technologies & Components
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                placeholder="Add technology (e.g. ESP32, OpenCV, PID Control)..."
                className={`flex-1 px-3.5 py-1.5 rounded-xl border text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900'
                    : 'bg-slate-900 border-slate-700 text-slate-100'
                }`}
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-4 py-1.5 rounded-xl font-mono text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-cyan-600 hover:text-white transition-colors"
              >
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 flex items-center space-x-1.5"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="text-slate-400 hover:text-rose-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* KEY FEATURES LIST */}
          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">
              Key Features & Innovations
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                placeholder="Add key feature bullet point..."
                className={`flex-1 px-3.5 py-1.5 rounded-xl border text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900'
                    : 'bg-slate-900 border-slate-700 text-slate-100'
                }`}
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-1.5 rounded-xl font-mono text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-cyan-600 hover:text-white transition-colors"
              >
                Add Bullet
              </button>
            </div>
            <div className="space-y-1.5">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-sans"
                >
                  <span className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    <span>{feat}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* REPOSITORY & DEMO LINKS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase mb-1">
                GitHub Repository URL
              </label>
              <div className="relative">
                <Github className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/dhruboacharjee52/repository"
                  className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900'
                      : 'bg-slate-900 border-slate-700 text-slate-100'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase mb-1">
                Live Demo / Video / Simulation URL
              </label>
              <div className="relative">
                <ExternalLink className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://tinkercad.com/... or YouTube link"
                  className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900'
                      : 'bg-slate-900 border-slate-700 text-slate-100'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* SIMULATION TOGGLE */}
          <div className="flex items-center space-x-3 pt-2">
            <input
              type="checkbox"
              id="isSimulationCheckbox"
              checked={isSimulation}
              onChange={(e) => setIsSimulation(e.target.checked)}
              className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
            />
            <label htmlFor="isSimulationCheckbox" className="text-xs font-mono text-slate-600 dark:text-slate-300 cursor-pointer">
              This is a Simulation Project (e.g. Tinkercad / Proteus / Wokwi)
            </label>
          </div>

          {isSimulation && (
            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase mb-1">
                Simulation Platform
              </label>
              <input
                type="text"
                value={simulationPlatform}
                onChange={(e) => setSimulationPlatform(e.target.value)}
                placeholder="Tinkercad, Proteus, MATLAB Simulink, etc."
                className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900'
                    : 'bg-slate-900 border-slate-700 text-slate-100'
                }`}
              />
            </div>
          )}

          {/* MODAL BOTTOM ACTION BUTTONS */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                sfx.playClick();
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/30 transition-all flex items-center space-x-2 cursor-pointer active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Publish Project to Portfolio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
