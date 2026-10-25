import React, { useState, useEffect } from 'react';
import { availableSkills } from '../data/skillsData';
import { getPlacementQuestionsForSkill } from '../data/curriculumData';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { SkillDefinition, RoadmapMode } from '../types';
import {
  Compass,
  ArrowRight,
  Zap,
  Brain,
  Rocket,
  Layers,
  CheckCircle,
  Sparkles,
  Code,
  Globe,
  BarChart3,
  Palette,
  Cloud,
} from 'lucide-react';
import { LearnedSkillsModal } from './LearnedSkillsModal';

interface Props {
  onNavigateToLevelUp: () => void;
}

export const LearnSkillView: React.FC<Props> = ({ onNavigateToLevelUp }) => {
  const { userProfile, setActiveSkillAndRoadmap, setSelectedSkill: setSelectedSkillContext } = useAuth();
  const {
    setSmartDemonstratedTopics,
    setQuickBuildGoal,
  } = useProgress();

  const [selectedSkill, setSelectedSkill] = useState<SkillDefinition>(() => {
    return availableSkills.find((s) => s.id === userProfile?.selectedSkill) || availableSkills[0];
  });
  const [activeModal, setActiveModal] = useState<RoadmapMode | null>(null);
  const [isLearnedModalOpen, setIsLearnedModalOpen] = useState(false);

  useEffect(() => {
    if (userProfile?.selectedSkill) {
      const matched = availableSkills.find((s) => s.id === userProfile.selectedSkill);
      if (matched) setSelectedSkill(matched);
    }
  }, [userProfile?.selectedSkill]);

  const currentPlacementQuestions = getPlacementQuestionsForSkill(selectedSkill.id);

  const handleCardClick = async (skill: SkillDefinition) => {
    setSelectedSkill(skill);
    await setSelectedSkillContext(skill.id);
    setIsLearnedModalOpen(true);
  };

  const [placementAnswers, setPlacementAnswers] = useState<Record<string, number>>({});
  const [placementSubmitted, setPlacementSubmitted] = useState(false);
  const [placementScore, setPlacementScore] = useState<number | null>(null);
  const [demonstratedTopicsList, setDemonstratedTopicsList] = useState<string[]>([]);

  const getQuickBuildGoalsForSkill = (skillId: string) => {
    switch (skillId) {
      case 'ui-ux-design':
        return [
          {
            id: 'qb-figma-kit',
            title: 'Design System & Component Library',
            targetSequence: ['Visual Hierarchy & 8pt Grid', 'Typography Scale', 'Accessible Color Contrast', 'Design Tokens'],
            desc: 'The essential foundation for crafting consistent, scalable digital products.',
          },
          {
            id: 'qb-mobile-app',
            title: 'Fintech Mobile App Interactive Prototype',
            targetSequence: ['User Personas & POV', 'Wireframing Micro-flows', 'Fitts Law & Touch Targets', 'Usability Testing'],
            desc: 'High-converting mobile product prototype with tested user feedback.',
          },
          {
            id: 'qb-saas-audit',
            title: 'SaaS Analytics Dashboard UI Kit',
            targetSequence: ['Information Architecture', 'Data Tables & Card Patterns', 'Ethical UX & Dark Pattern Prevention', 'Design Specs Handoff'],
            desc: 'Clean, modern dashboard UI ready for engineering handoff.',
          },
        ];
      case 'python-dev':
        return [
          {
            id: 'qb-py-automation',
            title: 'Automated Web Scraper & Report Generator',
            targetSequence: ['Python Syntax', 'Lists & Dictionaries', 'Requests & File I/O', 'CSV & Email Automation'],
            desc: 'Automate tedious online workflows with robust Python scripts.',
          },
          {
            id: 'qb-py-api',
            title: 'RESTful Backend API Service',
            targetSequence: ['Functions & Modules', 'Object-Oriented Programming', 'API Route Handlers', 'Cloud Server Hosting'],
            desc: 'Build scalable server endpoints to power mobile and web clients.',
          },
        ];
      default:
        return [
          {
            id: 'qb-portfolio',
            title: 'Interactive Developer Portfolio',
            targetSequence: ['HTML5 & Modern Layouts', 'Responsive CSS Grid & Flex', 'DOM Interactivity', 'Vercel Deployment'],
            desc: 'Build and deploy a responsive high-impact portfolio with modern CSS and dynamic projects.',
          },
          {
            id: 'qb-saas',
            title: 'Full-Stack Cloud Notes & Auth SaaS',
            targetSequence: ['JavaScript ES6+', 'React State & Components', 'Firebase Auth & Security', 'Cloud Deployment'],
            desc: 'Direct path to React components, Firebase authentication, and real-time cloud data.',
          },
          {
            id: 'qb-dashboard',
            title: 'Real-time Analytical Dashboard',
            targetSequence: ['JavaScript ES6+', 'React State & Hooks', 'REST API Integration', 'Cloud Deployment'],
            desc: 'Focused pipeline for REST API data consumption, chart rendering, and state management.',
          },
        ];
    }
  };

  const getRoadmapSequencePreview = (skillId: string, mode: 'normal' | 'advanced' | 'smart' | 'quick_build') => {
    if (skillId === 'ui-ux-design') {
      if (mode === 'normal') return ['User Personas', 'Wireframing', 'Color & Contrast', '8pt Grid Systems', 'Design Tokens', 'Ethical UX Boss Mission'];
      if (mode === 'advanced') return ['Design System Architecture', 'Micro-Interactions', 'Heuristic Evaluation', 'A/B Usability Testing'];
      if (mode === 'smart') return ['Diagnostic Mapping', 'Design Tokens', 'Micro-interactions', 'Developer Handoff Specs'];
      return ['Visual Hierarchy & Grid', 'Typography Scale', 'Accessible Contrast', 'Design Tokens'];
    }
    if (skillId === 'python-dev') {
      if (mode === 'normal') return ['Syntax & Types', 'Lists & Dicts', 'OOP & Classes', 'File I/O', 'APIs & Web Scraping'];
      if (mode === 'advanced') return ['Generators & Decorators', 'AsyncIO Concurrency', 'FastAPI Microservices', 'Database ORM'];
      if (mode === 'smart') return ['Placement Audit', 'FastAPI Microservices', 'Async APIs', 'Cloud Microservices'];
      return ['Python Syntax', 'Requests & File I/O', 'CSV & Email Automation'];
    }
    if (skillId === 'data-analysis') {
      if (mode === 'normal') return ['Data Cleaning', 'Pandas & Numpy', 'Exploratory EDA', 'Data Visualization', 'Insights Storytelling'];
      if (mode === 'advanced') return ['Statistical Testing', 'Machine Learning Models', 'Feature Pipelines'];
      if (mode === 'smart') return ['Skill Verification', 'Pandas Wrangling', 'SQL Query Optimization', 'Interactive BI Dashboards'];
      return ['Pandas & Numpy', 'Exploratory EDA', 'Data Visualization'];
    }
    // web-dev (default)
    if (mode === 'normal') return ['HTML Semantics', 'CSS Flex/Grid', 'JavaScript ES6+', 'React Components', 'APIs', 'Cloud Deployment'];
    if (mode === 'advanced') return ['TS Architecture', 'State Machines', 'Security Rules', 'CI/CD Pipelines'];
    if (mode === 'smart') return ['Placement Diagnostic', 'JavaScript ES6+', 'React State & Hooks', 'Full-Stack Architecture'];
    return ['JavaScript Core', 'React Components', 'Firebase Auth', 'Cloud Deployment'];
  };

  const quickBuildGoals = getQuickBuildGoalsForSkill(selectedSkill.id);
  const [chosenQuickGoal, setChosenQuickGoal] = useState<string>(() => quickBuildGoals[0].title);

  useEffect(() => {
    const goals = getQuickBuildGoalsForSkill(selectedSkill.id);
    if (!goals.some(g => g.title === chosenQuickGoal)) {
      setChosenQuickGoal(goals[0].title);
    }
  }, [selectedSkill.id]);

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'Code': return <Code className="w-6 h-6" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6" />;
      case 'Palette': return <Palette className="w-6 h-6" />;
      case 'Cloud': return <Cloud className="w-6 h-6" />;
      default: return <Code className="w-6 h-6" />;
    }
  };

  const handleSelectRoadmap = async (mode: RoadmapMode, customSkillId?: string) => {
    const targetSkillId = customSkillId || selectedSkill.id;
    if (mode === 'smart') {
      setActiveModal('smart');
      setPlacementSubmitted(false);
      setPlacementAnswers({});
      return;
    }
    if (mode === 'quick_build') {
      setActiveModal('quick_build');
      return;
    }

    await setActiveSkillAndRoadmap(targetSkillId, mode);
    onNavigateToLevelUp();
  };

  const handleSmartAssessmentSubmit = async () => {
    let score = 0;
    const demonstrated: string[] = [];

    currentPlacementQuestions.forEach((q) => {
      if (placementAnswers[q.id] === q.correctIndex) {
        score++;
        demonstrated.push(q.topic);
      }
    });

    setPlacementScore(score);
    setDemonstratedTopicsList(demonstrated);
    setPlacementSubmitted(true);
    setSmartDemonstratedTopics(demonstrated);

    await setActiveSkillAndRoadmap(selectedSkill.id, 'smart');
  };

  const handleConfirmQuickBuild = async () => {
    setQuickBuildGoal(chosenQuickGoal);
    await setActiveSkillAndRoadmap(selectedSkill.id, 'quick_build');
    setActiveModal(null);
    onNavigateToLevelUp();
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFEAFF] text-[#5534DA] border border-[#DDD1FE] text-xs font-bold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Skill Exploration & Curriculum</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-display text-neutral-900 tracking-tight">
          Learn a <span className="text-[#FF5C38]">Skill</span>
        </h1>
        <p className="text-sm md:text-base text-neutral-600 mt-2 max-w-2xl leading-relaxed font-medium">
          Choose a domain to unlock structured learning roadmaps. SkillMate adapts your route whether you prefer steady foundational steps, smart diagnostic acceleration, or building a target project right away.
        </p>
      </div>

      {/* Available Skills Catalog */}
      <div className="space-y-4">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500">
          1. Choose Your Target Track
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {availableSkills.map((skill) => {
            const isSelected = selectedSkill.id === skill.id;
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => handleCardClick(skill)}
                className={`p-6 rounded-3xl border-2 text-left transition-all relative overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'border-[#FF5C38] bg-white shadow-md ring-2 ring-[#FF5C38]/20'
                    : 'border-neutral-200/90 bg-[#FAF9FD] hover:bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white shadow-xs`}
                  >
                    {getSkillIcon(skill.iconName)}
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        skill.difficulty === 'Beginner'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : skill.difficulty === 'Intermediate'
                          ? 'border-amber-200 bg-amber-50 text-amber-800'
                          : 'border-rose-200 bg-rose-50 text-rose-700'
                      }`}
                    >
                      {skill.difficulty}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] bg-[#FF5C38] text-white px-2.5 py-0.5 rounded-full font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-neutral-900 mb-1 font-display">{skill.title}</h3>
                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                  {skill.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-200/80 text-[11px] text-neutral-500 font-mono">
                  <span>{skill.worldsCount} Worlds</span>
                  {isSelected ? (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToLevelUp();
                      }}
                      className="text-[#FF5C38] font-sans font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open Map</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  ) : (
                    <span>~{skill.estimatedHours} Hours</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Skill Banner */}
        <div className="p-6 rounded-3xl bg-[#FAF9FE] border-2 border-neutral-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xs">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedSkill.color} flex items-center justify-center text-white shrink-0 shadow-sm`}>
              {getSkillIcon(selectedSkill.iconName)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF5C38]">
                  Active Selected Skill
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#EFEAFF] text-[#5534DA] font-mono font-bold">
                  {selectedSkill.worldsCount} Worlds • ~{selectedSkill.estimatedHours}h
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black font-display text-neutral-900 mt-0.5">
                {selectedSkill.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
                Ready to level up? Jump directly into the interactive candy crush-style map for this track.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => setIsLearnedModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-neutral-50 text-neutral-800 border-2 border-neutral-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <CheckCircle className="w-3.5 h-3.5 text-[#5534DA]" />
              <span>Mark Prior Knowledge</span>
            </button>

            <button
              onClick={() => onNavigateToLevelUp()}
              className="px-6 py-3 rounded-2xl bg-[#FF5C38] hover:bg-[#E84D2B] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-[#FF5C38]/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Open Level-Up Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Select Your Learning Mode */}
      <div className="space-y-4 pt-4 border-t border-neutral-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500">
              2. Select Your Learning Mode for {selectedSkill.title}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Choose the roadmap structure that best matches your timeline and prior knowledge.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#FF5C38]">
            Active: {userProfile?.roadmapMode?.toUpperCase() || 'NORMAL'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* A. Normal Roadmap */}
          <div className="p-6 rounded-3xl border-2 border-neutral-200 bg-white hover:border-neutral-900/40 transition-all flex flex-col justify-between space-y-4 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2 text-[#5534DA] font-extrabold text-sm font-display">
                  <Layers className="w-4 h-4" />
                  Mode A: Normal Roadmap
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EFEAFF] text-[#5534DA]">
                  Foundations First
                </span>
              </div>
              <h3 className="text-lg font-black font-display text-neutral-900">Full Structured Sequence</h3>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Step-by-step path starting from zero fundamentals through advanced production mastery in {selectedSkill.title}.
              </p>
              <div className="mt-3 p-3.5 rounded-2xl bg-[#FAF9FD] border border-neutral-200 text-xs font-mono text-neutral-600 flex flex-wrap gap-1.5 items-center">
                {getRoadmapSequencePreview(selectedSkill.id, 'normal').map((step, sIdx, arr) => (
                  <React.Fragment key={sIdx}>
                    <span className="text-neutral-800 font-medium">{step}</span>
                    {sIdx < arr.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-neutral-400 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {userProfile?.roadmapMode === 'normal' ? (
              <div className="w-full py-3 rounded-2xl bg-[#EFEAFF] text-[#5534DA] text-xs font-bold flex items-center justify-center gap-2 border border-[#DDD1FE]">
                <CheckCircle className="w-3.5 h-3.5 text-[#5534DA]" />
                <span>Currently Active Track</span>
              </div>
            ) : (
              <button
                onClick={() => handleSelectRoadmap('normal')}
                className="w-full py-3 rounded-2xl bg-[#FAF9FD] hover:bg-[#5534DA] hover:text-white text-neutral-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-neutral-200/90"
              >
                <span>Switch to Normal Track</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* B. Advanced Roadmap */}
          <div className="p-6 rounded-3xl border-2 border-neutral-200 bg-white hover:border-neutral-900/40 transition-all flex flex-col justify-between space-y-4 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2 text-[#FF5C38] font-extrabold text-sm font-display">
                  <Zap className="w-4 h-4" />
                  Mode B: Advanced Roadmap
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFF2ED] text-[#FF5C38]">
                  Skip Basics
                </span>
              </div>
              <h3 className="text-lg font-black font-display text-neutral-900">Experienced Fast-Track</h3>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Designed for practitioners who know the basics and want to dive straight into architecture, system scaling, and complex challenges in {selectedSkill.title}.
              </p>
              <div className="mt-3 p-3.5 rounded-2xl bg-[#FAF9FD] border border-neutral-200 text-xs font-mono text-neutral-600 flex flex-wrap gap-1.5 items-center">
                {getRoadmapSequencePreview(selectedSkill.id, 'advanced').map((step, sIdx, arr) => (
                  <React.Fragment key={sIdx}>
                    <span className="text-neutral-800 font-medium">{step}</span>
                    {sIdx < arr.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-neutral-400 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {userProfile?.roadmapMode === 'advanced' ? (
              <div className="w-full py-3 rounded-2xl bg-[#FFF2ED] text-[#FF5C38] text-xs font-bold flex items-center justify-center gap-2 border border-[#FFD9CC]">
                <CheckCircle className="w-3.5 h-3.5 text-[#FF5C38]" />
                <span>Currently Active Track</span>
              </div>
            ) : (
              <button
                onClick={() => handleSelectRoadmap('advanced')}
                className="w-full py-3 rounded-2xl bg-[#FAF9FD] hover:bg-[#FF5C38] hover:text-white text-neutral-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-neutral-200/90"
              >
                <span>Switch to Advanced Track</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* C. Smart Roadmap (Placement Diagnostic) */}
          <div className="p-6 rounded-3xl border-2 border-neutral-200 bg-white hover:border-neutral-900/40 transition-all flex flex-col justify-between space-y-4 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm font-display">
                  <Brain className="w-4 h-4" />
                  Mode C: Smart Roadmap
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  Placement Diagnostic
                </span>
              </div>
              <h3 className="text-lg font-black font-display text-neutral-900">Personalized Knowledge Mapping</h3>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Take a quick 4–question diagnostic quiz. Demonstrated topics are credited immediately; your roadmap focuses solely on what is missing.
              </p>
              <div className="mt-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Explains why each topic appears based on placement evidence.</span>
              </div>
              <div className="mt-3 p-3.5 rounded-2xl bg-[#FAF9FD] border border-neutral-200 text-xs font-mono text-neutral-600 flex flex-wrap gap-1.5 items-center">
                {getRoadmapSequencePreview(selectedSkill.id, 'smart').map((step, sIdx, arr) => (
                  <React.Fragment key={sIdx}>
                    <span className="text-neutral-800 font-medium">{step}</span>
                    {sIdx < arr.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {userProfile?.roadmapMode === 'smart' ? (
              <div className="w-full py-3 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center gap-2 border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Currently Active Track</span>
              </div>
            ) : (
              <button
                onClick={() => handleSelectRoadmap('smart')}
                className="w-full py-3 rounded-2xl bg-[#FAF9FD] hover:bg-emerald-600 hover:text-white text-neutral-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-neutral-200/90"
              >
                <span>Run Diagnostic Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* D. Quick Build Roadmap (Goal-Driven) */}
          <div className="p-6 rounded-3xl border-2 border-neutral-200 bg-white hover:border-neutral-900/40 transition-all flex flex-col justify-between space-y-4 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2 text-amber-700 font-extrabold text-sm font-display">
                  <Rocket className="w-4 h-4" />
                  Mode D: Quick Build Roadmap
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800">
                  Goal-Driven
                </span>
              </div>
              <h3 className="text-lg font-black font-display text-neutral-900">Project-Centered Acceleration</h3>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Tell us what you want to build. We formulate the smallest practical learning sequence required to build and deploy that target project.
              </p>
              <div className="mt-3 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-center gap-2">
                <Zap className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Teaches only the essential concepts required for your target app.</span>
              </div>
              <div className="mt-3 p-3.5 rounded-2xl bg-[#FAF9FD] border border-neutral-200 text-xs font-mono text-neutral-600 flex flex-wrap gap-1.5 items-center">
                {getRoadmapSequencePreview(selectedSkill.id, 'quick_build').map((step, sIdx, arr) => (
                  <React.Fragment key={sIdx}>
                    <span className="text-neutral-800 font-medium">{step}</span>
                    {sIdx < arr.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {userProfile?.roadmapMode === 'quick_build' ? (
              <div className="w-full py-3 rounded-2xl bg-amber-50 text-amber-800 text-xs font-bold flex items-center justify-center gap-2 border border-amber-200">
                <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Currently Active Track</span>
              </div>
            ) : (
              <button
                onClick={() => handleSelectRoadmap('quick_build')}
                className="w-full py-3 rounded-2xl bg-[#FAF9FD] hover:bg-amber-600 hover:text-white text-neutral-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-neutral-200/90"
              >
                <span>Select Project Goal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal: Smart Roadmap Diagnostic Quiz */}
      {activeModal === 'smart' && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-neutral-900/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div>
              <div className="text-xs font-mono text-emerald-600 uppercase font-bold flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" />
                Placement Diagnostic • Mode C
              </div>
              <h3 className="text-2xl font-black font-display text-neutral-900 mt-1">
                {selectedSkill.title} Diagnostic Placement Quiz
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Answer these 4 conceptual questions. Any topic you answer correctly will be credited as mastered so your smart roadmap skips redundant practice and focuses solely on what you need.
              </p>
            </div>

            {!placementSubmitted ? (
              <div className="space-y-5">
                {currentPlacementQuestions.map((q, qIdx) => (
                  <div key={q.id} className="p-4 rounded-2xl bg-[#FAF9FD] border border-neutral-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-neutral-500 font-bold">Question {qIdx + 1} of {currentPlacementQuestions.length}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">Topic: {q.topic}</span>
                    </div>
                    <p className="text-sm font-bold text-neutral-900">{q.question}</p>
                    <div className="space-y-1.5 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = placementAnswers[q.id] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => setPlacementAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                            className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center gap-3 cursor-pointer ${
                              isChosen
                                ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                                : 'bg-white text-neutral-800 border-neutral-200 hover:border-emerald-300'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isChosen ? 'bg-white text-emerald-600' : 'bg-neutral-100 text-neutral-600'
                            }`}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="flex-1">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="text-xs font-bold text-neutral-500 hover:text-neutral-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSmartAssessmentSubmit}
                    disabled={Object.keys(placementAnswers).length < currentPlacementQuestions.length}
                    className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Submit Diagnostic Assessment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-black font-display text-neutral-900">
                    Diagnostic Complete!
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1">
                    You demonstrated mastery in <strong className="text-emerald-700">{placementScore} / {currentPlacementQuestions.length}</strong> core competency areas.
                  </p>
                </div>

                {demonstratedTopicsList.length > 0 ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-2">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide block">
                      Credited Topics (Skipped on your roadmap):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {demonstratedTopicsList.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-full bg-white text-emerald-800 border border-emerald-300 text-xs font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200 text-xs text-neutral-700">
                    No preliminary credits detected. Your Smart Roadmap will provide full step-by-step guidance!
                  </div>
                )}

                <div className="pt-4 border-t border-neutral-200 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      onNavigateToLevelUp();
                    }}
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Launch My Smart Roadmap</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Quick Build Roadmap Goal Selector */}
      {activeModal === 'quick_build' && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-neutral-900/10 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <div className="text-xs font-mono text-amber-700 uppercase font-bold flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5" />
                Goal-Driven Acceleration • Mode D
              </div>
              <h3 className="text-2xl font-black font-display text-neutral-900 mt-1">
                Select Your Target Project Goal
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Tell us what you want to build. We formulate the smallest practical learning sequence required to build and deploy that target project.
              </p>
            </div>

            <div className="space-y-3">
              {quickBuildGoals.map((g) => {
                const isSelected = chosenQuickGoal === g.title;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setChosenQuickGoal(g.title)}
                    className={`w-full p-5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/70 text-neutral-900 shadow-sm'
                        : 'border-neutral-200 bg-[#FAF9FD] text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    <div className="font-extrabold text-sm text-neutral-900 flex items-center justify-between font-display">
                      <span>{g.title}</span>
                      {isSelected && <Sparkles className="w-4 h-4 text-amber-600" />}
                    </div>
                    <p className="text-xs text-neutral-600 mt-1">{g.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-mono text-neutral-600">
                      {g.targetSequence.map((step, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full bg-white border border-neutral-200 text-neutral-800 font-semibold"
                        >
                          {step}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
              <button
                onClick={() => setActiveModal(null)}
                className="text-xs font-bold text-neutral-500 hover:text-neutral-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmQuickBuild}
                className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/25 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Activate Quick Build Path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prior Knowledge Modal */}
      <LearnedSkillsModal
        isOpen={isLearnedModalOpen}
        onClose={() => setIsLearnedModalOpen(false)}
        skill={selectedSkill}
      />
    </div>
  );
};
