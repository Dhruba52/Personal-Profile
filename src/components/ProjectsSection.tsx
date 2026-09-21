import React, { useState, useEffect, useMemo } from 'react';
import {
  ExternalLink,
  Github,
  Eye,
  Cpu,
  X,
  CheckCircle2,
  AlertCircle,
  Plus,
  FileCode,
  Sparkles,
  Edit2,
  Trash2,
  FileText,
  Download,
  FolderArchive,
  Filter,
} from 'lucide-react';
import { projects as initialProjects } from '../data/portfolioData';
import { Project } from '../types';
import { getSavedCustomProjects, deleteCustomProject } from '../utils/projectStorage';
import { AddProjectModal } from './AddProjectModal';
import { ExportProjectsModal } from './ExportProjectsModal';
import { sfx } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

export const ProjectsSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Projects list (default + custom from localStorage)
  const [customProjects, setCustomProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Filter category
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Load custom projects from localStorage on mount
  useEffect(() => {
    const saved = getSavedCustomProjects();
    setCustomProjects(saved);
  }, []);

  // Combined project list
  const allProjects = useMemo(() => {
    // Custom projects take precedence if IDs match, otherwise prepend
    const customIds = new Set(customProjects.map((p) => p.id));
    const defaults = initialProjects.filter((p) => !customIds.has(p.id));
    return [...customProjects, ...defaults];
  }, [customProjects]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('All');
    allProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [allProjects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return allProjects;
    return allProjects.filter((p) => p.category === selectedCategory);
  }, [allProjects, selectedCategory]);

  const handleOpenModal = (proj: Project) => {
    sfx.playClick();
    setSelectedProject(proj);
  };

  const handleCloseModal = () => {
    sfx.playClick();
    setSelectedProject(null);
  };

  const handleProjectSaved = (savedProj: Project) => {
    setCustomProjects(getSavedCustomProjects());
    // Also update selectedProject if currently viewing
    if (selectedProject && selectedProject.id === savedProj.id) {
      setSelectedProject(savedProj);
    }
  };

  const handleDeleteCustomProject = (projId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this project from your portfolio?')) {
      sfx.playClick();
      const updated = deleteCustomProject(projId);
      setCustomProjects(updated);
      if (selectedProject?.id === projId) {
        setSelectedProject(null);
      }
    }
  };

  const handleEditProject = (proj: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playClick();
    setEditingProject(proj);
    setIsAddModalOpen(true);
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border transition-colors ${
              isLight
                ? 'bg-cyan-100 text-cyan-800 border-cyan-300'
                : 'bg-cyan-950/60 border-cyan-500/30 text-cyan-400'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>&lt;MODULE_03: HARDWARE_&_CODE&gt;</span>
          </div>
          <h2
            className={`font-tech text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase transition-colors ${
              isLight ? 'text-slate-900' : 'text-white text-glow-cyan'
            }`}
          >
            PROJECTS I HAVE BUILT
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent my-3" />
          <p className={`font-mono text-xs sm:text-sm max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Practical hardware prototypes, biomedical investigations, and embedded automation simulations.
          </p>
        </div>

        {/* GITHUB & PROJECT UPLOAD ACTION BAR */}
        <div
          className={`mb-8 p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md transition-all ${
            isLight
              ? 'bg-gradient-to-r from-cyan-50/90 via-sky-50/70 to-blue-50/80 border-cyan-200 shadow-sm'
              : 'bg-gradient-to-r from-[#07132e]/90 via-[#0a183d]/80 to-[#07132e]/90 border-cyan-500/30 shadow-lg shadow-cyan-950/40'
          }`}
        >
          <div className="flex items-center space-x-3 text-left w-full md:w-auto">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md shrink-0">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="font-tech font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center space-x-2">
                <span>GitHub Repository & Project Uploader</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-200 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 font-bold">
                  {allProjects.length} Projects Total
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Pushed a new project to GitHub? Sync its repo or upload project files and schematics in seconds.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={() => {
                sfx.playClick();
                setIsExportModalOpen(true);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold border flex items-center space-x-1.5 transition-all ${
                isLight
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
              title="Export updated code to commit permanently to GitHub"
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-500" />
              <span>Export Code for GitHub</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sfx.playClick();
                setEditingProject(null);
                setIsAddModalOpen(true);
              }}
              className="px-5 py-2 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/30 flex items-center space-x-2 transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Upload / Sync from GitHub</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <span className="text-xs font-mono text-slate-400 flex items-center space-x-1 mr-1 shrink-0">
            <Filter className="w-3 h-3" />
            <span>Filter:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                sfx.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : isLight
                  ? 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className={`rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col group ${
                isLight
                  ? 'bg-white/95 border-slate-200/90 hover:border-cyan-400 hover:shadow-2xl shadow-md shadow-slate-200/60'
                  : 'bg-[#070e1f]/90 border-cyan-500/20 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-950/40'
              }`}
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80';
                  }}
                />

                {/* Cyber Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    isLight
                      ? 'from-white/80 via-transparent to-black/20'
                      : 'from-[#070e1f] via-transparent to-black/40'
                  }`}
                />

                {/* Project Number HUD Tag */}
                <div
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg backdrop-blur-md font-mono text-xs font-bold border ${
                    project.isUserAdded
                      ? 'bg-purple-600 text-white border-purple-400 shadow-sm'
                      : isLight
                      ? 'bg-white/90 text-cyan-800 border-cyan-300 shadow-sm'
                      : 'bg-slate-950/80 text-cyan-300 border-cyan-500/40'
                  }`}
                >
                  {project.isUserAdded ? 'GITHUB SYNCED' : project.number}
                </div>

                {/* Category Badge & User Edit controls */}
                <div className="absolute top-3 right-3 flex items-center space-x-1.5">
                  {project.isUserAdded && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => handleEditProject(project, e)}
                        className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-cyan-600 text-white border border-slate-700 transition-colors"
                        title="Edit Project / Files"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteCustomProject(project.id, e)}
                        className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-rose-600 text-white border border-slate-700 transition-colors"
                        title="Delete custom project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                  <div
                    className={`px-2.5 py-1 rounded-lg backdrop-blur-md font-mono text-xs border ${
                      isLight
                        ? 'bg-white/90 text-slate-700 border-slate-200 shadow-sm'
                        : 'bg-slate-950/80 text-slate-300 border-slate-700'
                    }`}
                  >
                    {project.category}
                  </div>
                </div>

                {/* Attached Files Indicator if files exist */}
                {project.attachedFiles && project.attachedFiles.length > 0 && (
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-purple-950/90 border border-purple-400 text-purple-200 text-xs font-mono flex items-center space-x-1.5">
                    <FolderArchive className="w-3 h-3 text-purple-300" />
                    <span>{project.attachedFiles.length} Attached Files</span>
                  </div>
                )}

                {/* Simulation Banner */}
                {project.isSimulation && (
                  <div
                    id="tinkercad-banner"
                    className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-amber-500/90 border border-amber-300 backdrop-blur-md text-amber-950 font-mono text-xs font-bold flex items-center justify-between shadow-lg"
                  >
                    <span className="flex items-center space-x-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-950" />
                      <span>Simulation Project — {project.simulationPlatform || 'Tinkercad'}</span>
                    </span>
                    <span className="text-[10px] uppercase bg-amber-950 text-amber-200 px-1.5 py-0.5 rounded">
                      Verified Circuit
                    </span>
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className={`text-2xl font-tech font-bold transition-colors mb-2 ${
                      isLight ? 'text-slate-900 group-hover:text-cyan-700' : 'text-white group-hover:text-cyan-300'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className={`text-sm font-sans leading-relaxed mb-5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">
                      Core Technologies:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
                            isLight
                              ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                              : 'bg-cyan-950/40 text-cyan-200 border border-cyan-500/20'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className={`pt-4 border-t flex items-center justify-between gap-2 ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                  <button
                    onClick={() => handleOpenModal(project)}
                    onMouseEnter={() => sfx.playHover()}
                    className={`px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center space-x-1.5 transition-all ${
                      isLight
                        ? 'bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-300 shadow-sm'
                        : 'bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details & Files</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub Repository"
                      className={`p-2 rounded-xl border transition-colors ${
                        isLight
                          ? 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Github className="w-4 h-4" />
                    </a>

                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Demo / Simulation link"
                        className={`p-2 rounded-xl border transition-colors ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-slate-600 hover:text-cyan-700 hover:bg-cyan-50'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-cyan-400'
                        }`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal Window */}
      {selectedProject && (
        <div
          id="project-modal-backdrop"
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in overflow-y-auto"
        >
          <div
            id="project-modal-container"
            onClick={(e) => e.stopPropagation()}
            className={`max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 shadow-2xl relative animate-scale-up ${
              isLight
                ? 'bg-white border-cyan-300 text-slate-900'
                : 'bg-[#0a1226] border-cyan-500/40 text-slate-100'
            }`}
          >
            {/* Modal Header */}
            <div className={`flex items-start justify-between pb-4 mb-4 border-b ${isLight ? 'border-slate-100' : 'border-cyan-500/20'}`}>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 border border-cyan-300 font-bold">
                    {selectedProject.isUserAdded ? 'GITHUB SYNCED' : selectedProject.number}
                  </span>
                  <span className="font-mono text-xs text-slate-400 uppercase">
                    {selectedProject.category}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-tech font-bold mt-1">
                  {selectedProject.title}
                </h3>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Simulation Platform Notice */}
            {selectedProject.isSimulation && (
              <div className="mb-4 p-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-medium flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Simulation Environment:</strong> Developed and verified using {selectedProject.simulationPlatform || 'Tinkercad Circuits'}.
                </span>
              </div>
            )}

            {/* Project Image Preview */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 mb-6 border border-slate-200 dark:border-slate-800">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80';
                }}
              />
            </div>

            {/* In-depth description */}
            <div className={`space-y-4 mb-6 text-sm font-sans leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              <p>{selectedProject.longDescription || selectedProject.description}</p>
            </div>

            {/* ATTACHED FILES DOWNLOAD SECTION */}
            {selectedProject.attachedFiles && selectedProject.attachedFiles.length > 0 && (
              <div className="mb-6 p-4 rounded-2xl border border-purple-500/30 bg-purple-950/20">
                <h4 className="text-xs font-mono uppercase text-purple-400 tracking-wider mb-3 font-bold flex items-center space-x-1.5">
                  <FolderArchive className="w-4 h-4" />
                  <span>Attached Project Files & Schematics ({selectedProject.attachedFiles.length}):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.attachedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl border border-purple-500/20 bg-purple-950/40 flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className="truncate font-medium text-purple-200">{file.name}</span>
                        <span className="text-[10px] text-slate-400">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      {file.dataUrl && (
                        <a
                          href={file.dataUrl}
                          download={file.name}
                          className="p-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white shrink-0 ml-2"
                          title="Download file"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features */}
            {selectedProject.features && selectedProject.features.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-cyan-700 dark:text-cyan-400 tracking-wider mb-3 font-bold">
                  Technical Specifications & Architecture:
                </h4>
                <div className="space-y-2">
                  {selectedProject.features.map((feat, idx) => (
                    <div key={idx} className={`flex items-start space-x-2 text-xs sm:text-sm font-mono ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Stack */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
                Hardware / Components / Tools:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((t, i) => (
                  <span
                    key={i}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${
                      isLight
                        ? 'bg-slate-100 text-slate-800 border-slate-200'
                        : 'bg-slate-900 text-cyan-300 border-cyan-500/30'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
              <div className="flex items-center space-x-3">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-xl font-mono text-xs font-medium flex items-center space-x-2 border transition-colors ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center space-x-2 border transition-colors ${
                      isLight
                        ? 'bg-cyan-50 hover:bg-cyan-100 border-cyan-300 text-cyan-800'
                        : 'bg-cyan-950 hover:bg-cyan-900 border-cyan-500/40 text-cyan-300'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Demo / Schematic</span>
                  </a>
                )}
              </div>

              <button
                onClick={handleCloseModal}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-medium border ${
                  isLight
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                    : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                }`}
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload / Sync Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProject(null);
        }}
        onProjectSaved={handleProjectSaved}
        existingProject={editingProject}
      />

      {/* Export Code for GitHub Modal */}
      <ExportProjectsModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        allProjects={allProjects}
      />
    </section>
  );
};
