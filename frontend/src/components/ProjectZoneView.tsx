import React, { useState } from 'react';
import { availableProjects } from '../data/projectsData';
import { ProjectDefinition } from '../types';
import { useProgress } from '../context/ProgressContext';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  Circle,
  Search,
  ArrowRight,
  Code2,
  Github,
  Globe,
  Sparkles,
  X,
  FileText,
} from 'lucide-react';

export const ProjectZoneView: React.FC = () => {
  const { projectSubmissions, saveProjectSubmission } = useProgress();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectDefinition | null>(null);

  // Form submission state inside modal
  const [statusInput, setStatusInput] = useState<'not_started' | 'in_progress' | 'completed'>('not_started');
  const [githubUrlInput, setGithubUrlInput] = useState('');
  const [liveUrlInput, setLiveUrlInput] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  const categories = [
    'All',
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Backend & Database',
    'Integrated Web Development',
  ];

  const filteredProjects = availableProjects.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesQuery =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.suggestedStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleOpenProject = (project: ProjectDefinition) => {
    setSelectedProject(project);
    const existing = projectSubmissions[project.id];
    setStatusInput(existing?.status || 'not_started');
    setGithubUrlInput(existing?.githubUrl || '');
    setLiveUrlInput(existing?.liveUrl || '');
    setNotesInput(existing?.notes || '');
    setSaveSuccessMsg(false);
  };

  const handleSaveSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    await saveProjectSubmission(
      selectedProject.id,
      selectedProject.title,
      selectedProject.category,
      statusInput,
      githubUrlInput,
      liveUrlInput,
      notesInput
    );

    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-[#FAF9FE] border-2 border-neutral-900/10 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-[#EFEAFF] text-[#5534DA] border border-[#DDD1FE] text-xs font-bold">
                Autonomous Project Zone
              </span>
              <span className="text-xs text-neutral-500 font-semibold font-mono">
                Independent Portfolio Building
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-display text-neutral-900 tracking-tight">
              Project <span className="text-[#FF5C38]">Zone</span>
            </h1>
            <p className="text-xs md:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed font-medium">
              Transition from learning skills to proving skills. Build complete production web applications independently, record your submissions, and automatically showcase them in your Skill Passport.
            </p>
          </div>

          <div className="bg-white border border-neutral-200 px-5 py-3 rounded-2xl flex items-center gap-3.5 shrink-0 shadow-xs">
            <FolderGit2 className="w-5 h-5 text-[#5534DA]" />
            <div>
              <div className="text-[10px] text-neutral-500 uppercase font-extrabold tracking-wider">Recorded Submissions</div>
              <div className="text-neutral-900 font-black text-sm sm:text-base font-display">
                {Object.values(projectSubmissions).filter(p => p.status === 'completed').length} Completed / {Object.keys(projectSubmissions).length} Tracked
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#FF5C38] text-white shadow-xs'
                  : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or stacks..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-2xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#FF5C38]"
          />
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const submission = projectSubmissions[project.id];
          const status = submission?.status || 'not_started';

          return (
            <div
              key={project.id}
              className="bg-white border-2 border-neutral-900/10 rounded-3xl p-6 hover:border-neutral-900/30 transition-all flex flex-col justify-between space-y-4 shadow-xs group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold uppercase px-3 py-0.5 rounded-full bg-[#EFEAFF] text-[#5534DA]">
                    {project.category}
                  </span>

                  {/* Submission Status Pill */}
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      status === 'completed'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : status === 'in_progress'
                        ? 'border-amber-200 bg-amber-50 text-amber-800'
                        : 'border-neutral-200 bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {status === 'completed' ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    ) : status === 'in_progress' ? (
                      <Clock className="w-3 h-3 text-amber-600" />
                    ) : (
                      <Circle className="w-3 h-3 text-neutral-400" />
                    )}
                    {status === 'completed'
                      ? 'Completed'
                      : status === 'in_progress'
                      ? 'In Progress'
                      : 'Not Started'}
                  </span>
                </div>

                <h3 className="text-base font-black font-display text-neutral-900 group-hover:text-[#FF5C38] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                  {project.shortDesc}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.suggestedStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-[#FAF9FD] border border-neutral-200 text-neutral-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 font-bold">
                  {project.difficulty} Level
                </span>

                <button
                  type="button"
                  onClick={() => handleOpenProject(project)}
                  className="px-4 py-2 rounded-2xl bg-[#EFEAFF] hover:bg-[#FF5C38] hover:text-white text-[#5534DA] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Detail & Submission Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white border-2 border-neutral-900/10 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 bg-[#FAF9FD] border-b border-neutral-200 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-[#5534DA] font-bold uppercase">
                    {selectedProject.category} Project Specification
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white text-neutral-700 border border-neutral-200 font-bold">
                    {selectedProject.difficulty}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black font-display text-neutral-900">
                  {selectedProject.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
              {/* Problem & Overview */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 mb-1.5">
                  1. The Real-World Problem to Solve
                </h4>
                <p className="text-xs md:text-sm text-neutral-800 leading-relaxed bg-[#FAF9FD] p-4 rounded-2xl border border-neutral-200">
                  {selectedProject.problem}
                </p>
              </div>

              {/* Required Functionality */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 mb-2">
                  2. Required Functionality & Acceptance Criteria
                </h4>
                <ul className="space-y-2">
                  {selectedProject.requiredFeatures.map((feat, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-neutral-700 flex items-start gap-2 bg-[#FAF9FD] p-3 rounded-xl border border-neutral-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#5534DA] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggested Stack & Deliverables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#FAF9FD] p-4 rounded-2xl border border-neutral-200">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-[#FF5C38]" />
                    Suggested Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.suggestedStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-800 font-mono font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FAF9FD] p-4 rounded-2xl border border-neutral-200">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Expected Deliverables
                  </h4>
                  <ul className="space-y-1 text-xs text-neutral-700 list-disc list-inside">
                    {selectedProject.expectedDeliverables.map((deliv, idx) => (
                      <li key={idx}>{deliv}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Submission Form */}
              <form onSubmit={handleSaveSubmission} className="space-y-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#FF5C38] flex items-center gap-1.5">
                    <FolderGit2 className="w-4 h-4" />
                    Student Submission Record
                  </h4>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    Self-attested student work
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Project Status
                    </label>
                    <select
                      value={statusInput}
                      onChange={(e) => setStatusInput(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9FD] border border-neutral-200 rounded-2xl text-xs text-neutral-900 font-semibold focus:outline-none focus:border-[#FF5C38] cursor-pointer"
                    >
                      <option value="not_started">Not Started</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed & Ready</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1">
                      <Github className="w-3.5 h-3.5" />
                      GitHub Repo URL
                    </label>
                    <input
                      type="url"
                      value={githubUrlInput}
                      onChange={(e) => setGithubUrlInput(e.target.value)}
                      placeholder="https://github.com/you/repo"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9FD] border border-neutral-200 rounded-2xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#FF5C38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" />
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={liveUrlInput}
                      onChange={(e) => setLiveUrlInput(e.target.value)}
                      placeholder="https://your-app.web.app"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9FD] border border-neutral-200 rounded-2xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#FF5C38]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Implementation Notes & Architecture Reflections
                  </label>
                  <textarea
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    rows={3}
                    placeholder="Describe how you architected this solution, libraries chosen, and what you learned..."
                    className="w-full p-3.5 bg-[#FAF9FD] border border-neutral-200 rounded-2xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#FF5C38] resize-none"
                  />
                </div>

                {saveSuccessMsg && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Project submission saved to Cloud Firestore and synced to your Skill Passport!
                    </span>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-2xl bg-[#FF5C38] hover:bg-[#E84D2B] text-white font-bold text-xs md:text-sm shadow-md shadow-[#FF5C38]/25 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Sparkles className="w-4 h-4" />
                    Save Project Submission
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
