import React, { useState, useMemo } from 'react';
import {
  RoadmapMode,
  SkillDefinition,
} from '../types';
import {
  getRoadmapFlowchart,
  quickBuildGoalsMap,
  FlowchartNode,
  FlowchartPhase,
} from '../data/roadmapFlowchartData';
import {
  Layers,
  Zap,
  Brain,
  Rocket,
  Clock,
  ArrowRight,
  Sparkles,
  Trophy,
  Search,
  ChevronRight,
  X,
  Target,
  BookOpen,
  Lightbulb,
  Compass,
  FileText,
  Code2,
  Terminal,
} from 'lucide-react';

interface Props {
  selectedSkill: SkillDefinition;
  availableSkills: SkillDefinition[];
  onSelectSkill: (skill: SkillDefinition) => void;
  activeMode: RoadmapMode;
  onSelectMode: (mode: RoadmapMode) => void;
  onActivateRoadmap: (skillId: string, mode: RoadmapMode) => void;
}

// Color palettes matching the 5-step infographic in reference image 2
const stagePalette = [
  {
    // Stage 1 (01) - Deep Indigo / Royal Violet
    discBg: 'from-[#412FA9] via-[#4F39BC] to-[#6042DA]',
    ringColor: 'ring-[#4F39BC]/30',
    accentText: 'text-[#4F39BC]',
    badgeBg: 'bg-[#EFEAFF] text-[#4F39BC] border-[#DDD1FE]',
    subtleBorder: 'hover:border-[#4F39BC]/40',
    icon: Compass,
    accentHex: '#4F39BC',
  },
  {
    // Stage 2 (02) - Vibrant Royal Purple
    discBg: 'from-[#6035D4] via-[#6F40E4] to-[#804FF0]',
    ringColor: 'ring-[#6F40E4]/30',
    accentText: 'text-[#6F40E4]',
    badgeBg: 'bg-[#F2EDFF] text-[#6F40E4] border-[#E0D5FE]',
    subtleBorder: 'hover:border-[#6F40E4]/40',
    icon: Lightbulb,
    accentHex: '#6F40E4',
  },
  {
    // Stage 3 (03) - Orchid Purple / Medium Violet
    discBg: 'from-[#8A3DB8] via-[#9E49CE] to-[#B358E2]',
    ringColor: 'ring-[#9E49CE]/30',
    accentText: 'text-[#9E49CE]',
    badgeBg: 'bg-[#F9EEFF] text-[#9E49CE] border-[#F0D5FE]',
    subtleBorder: 'hover:border-[#9E49CE]/40',
    icon: FileText,
    accentHex: '#9E49CE',
  },
  {
    // Stage 4 (04) - Magenta Pink
    discBg: 'from-[#C43E88] via-[#D84C98] to-[#EA5AA8]',
    ringColor: 'ring-[#D84C98]/30',
    accentText: 'text-[#D84C98]',
    badgeBg: 'bg-[#FDF0F6] text-[#D84C98] border-[#F9D4E7]',
    subtleBorder: 'hover:border-[#D84C98]/40',
    icon: Clock,
    accentHex: '#D84C98',
  },
  {
    // Stage 5 (05) - Warm Coral Orange
    discBg: 'from-[#E4562B] via-[#F46B38] to-[#FF8048]',
    ringColor: 'ring-[#F46B38]/30',
    accentText: 'text-[#F46B38]',
    badgeBg: 'bg-[#FFF2ED] text-[#F46B38] border-[#FFDCD0]',
    subtleBorder: 'hover:border-[#F46B38]/40',
    icon: Target,
    accentHex: '#F46B38',
  },
  {
    // Stage 6+ - Emerald
    discBg: 'from-[#059669] via-[#10B981] to-[#34D399]',
    ringColor: 'ring-[#10B981]/30',
    accentText: 'text-[#10B981]',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    subtleBorder: 'hover:border-emerald-500/40',
    icon: Trophy,
    accentHex: '#10B981',
  },
];

export const RoadmapFlowchart: React.FC<Props> = ({
  selectedSkill,
  availableSkills,
  onSelectSkill,
  activeMode,
  onSelectMode,
  onActivateRoadmap,
}) => {
  // Goal for Quick Build mode
  const goalOptions = quickBuildGoalsMap[selectedSkill.id] || [];
  const [selectedGoalId, setSelectedGoalId] = useState<string>(
    () => goalOptions[0]?.id || ''
  );

  // When skill changes, reset or sync active goal
  React.useEffect(() => {
    const goals = quickBuildGoalsMap[selectedSkill.id] || [];
    if (goals.length > 0 && !goals.some((g) => g.id === selectedGoalId)) {
      setSelectedGoalId(goals[0].id);
    }
  }, [selectedSkill.id, selectedGoalId]);

  // Selected topic node for detail drawer/modal
  const [inspectedNode, setInspectedNode] = useState<FlowchartNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewStyle, setViewStyle] = useState<'infographic' | 'list'>('infographic');

  const handleInspectNode = (node: FlowchartNode) => {
    setInspectedNode(node);
    setDeepDiveData(null);
    setDeepDiveEngine('');
  };

  // OpenAI Custom Flowchart Generator State
  const [customFlowchartData, setCustomFlowchartData] = useState<any>(null);
  const [customSkillPrompt, setCustomSkillPrompt] = useState('');
  const [isGeneratingFlowchart, setIsGeneratingFlowchart] = useState(false);
  const [flowchartEngineBadge, setFlowchartEngineBadge] = useState<string>('');
  const [generatorOpen, setGeneratorOpen] = useState(false);

  // OpenAI Node Architectural Deep-Dive State
  const [deepDiveData, setDeepDiveData] = useState<any>(null);
  const [loadingDeepDive, setLoadingDeepDive] = useState(false);
  const [deepDiveEngine, setDeepDiveEngine] = useState<string>('');

  // AI Provider Health Info and Diagnostic Notices
  const [aiProviderInfo, setAiProviderInfo] = useState<{
    openaiConfigured: boolean;
    openaiStatus: string;
    openaiMessage: string;
    activePrimaryEngine: string;
  } | null>(null);
  const [apiNotice, setApiNotice] = useState<string | null>(null);

  React.useEffect(() => {
    fetch('/api/ai-provider-status')
      .then((r) => r.json())
      .then((data) => {
        setAiProviderInfo(data);
      })
      .catch(() => {});
  }, []);

  // Compute flowchart data dynamically based on selected skill + roadmap mode + quick build goal, or custom OpenAI-generated flowchart
  const staticFlowchartData = useMemo(() => {
    return getRoadmapFlowchart(selectedSkill.id, activeMode, selectedGoalId);
  }, [selectedSkill.id, activeMode, selectedGoalId]);

  const flowchartData = customFlowchartData || staticFlowchartData;

  const handleGenerateCustomFlowchart = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customSkillPrompt.trim()) return;
    try {
      setIsGeneratingFlowchart(true);
      setApiNotice(null);
      const res = await fetch('/api/openai/generate-flowchart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customSkill: customSkillPrompt.trim(),
          mode: activeMode,
          goal: goalOptions[0]?.title,
        }),
      });
      const json = await res.json();
      if (json?.data) {
        setCustomFlowchartData(json.data);
        setFlowchartEngineBadge(json.engine || 'OpenAI (GPT-4o-mini)');
      }
      if (json?.openAiNotice) {
        setApiNotice(json.openAiNotice);
      }
    } catch (err) {
      console.error('Failed to generate custom flowchart:', err);
    } finally {
      setIsGeneratingFlowchart(false);
    }
  };

  const handleResetToStandard = () => {
    setCustomFlowchartData(null);
    setFlowchartEngineBadge('');
    setCustomSkillPrompt('');
    setApiNotice(null);
  };

  const handleFetchDeepDive = async (node: FlowchartNode) => {
    try {
      setLoadingDeepDive(true);
      setDeepDiveData(null);
      setApiNotice(null);
      const res = await fetch('/api/openai/deep-dive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodeTitle: node.title,
          phaseName: node.phaseName,
          skillTitle: customFlowchartData?.skillTitle || selectedSkill.title,
          keyTopics: node.keyTopics,
        }),
      });
      const json = await res.json();
      if (json?.data) {
        setDeepDiveData(json.data);
        setDeepDiveEngine(json.engine || 'OpenAI (GPT-4o-mini)');
      }
      if (json?.openAiNotice) {
        setApiNotice(json.openAiNotice);
      }
    } catch (err) {
      console.error('Failed to fetch deep dive:', err);
    } finally {
      setLoadingDeepDive(false);
    }
  };

  const activeGoal = goalOptions.find((g) => g.id === selectedGoalId) || goalOptions[0];

  // Filter nodes if search query present
  const filteredNodes = useMemo(() => {
    if (!searchQuery.trim()) return flowchartData.nodes;
    const q = searchQuery.toLowerCase();
    return flowchartData.nodes.filter(
      (n: FlowchartNode) =>
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        n.keyTopics.some((t: string) => t.toLowerCase().includes(q))
    );
  }, [flowchartData.nodes, searchQuery]);

  // Group nodes by phase for structured flowchart rendering
  const nodesByPhase = useMemo(() => {
    const map = new Map<string, FlowchartNode[]>();
    flowchartData.phases.forEach((p: FlowchartPhase) => map.set(p.id, []));
    filteredNodes.forEach((node: FlowchartNode) => {
      const existing = map.get(node.phaseId) || [];
      existing.push(node);
      map.set(node.phaseId, existing);
    });
    return map;
  }, [flowchartData.phases, filteredNodes]);

  // Convert index to letters: 0 -> 'A', 1 -> 'B', 2 -> 'C', 3 -> 'D', etc.
  const getSubStageLetter = (idx: number) => {
    return String.fromCharCode(65 + (idx % 26));
  };

  const getModeColor = (mode: RoadmapMode) => {
    switch (mode) {
      case 'normal':
        return {
          pill: 'bg-[#5534DA] text-white',
          border: 'border-[#5534DA]',
          badge: 'bg-[#EFEAFF] text-[#5534DA]',
          icon: <Layers className="w-4 h-4" />,
        };
      case 'advanced':
        return {
          pill: 'bg-[#FF5C38] text-white',
          border: 'border-[#FF5C38]',
          badge: 'bg-[#FFF2ED] text-[#FF5C38]',
          icon: <Zap className="w-4 h-4" />,
        };
      case 'smart':
        return {
          pill: 'bg-emerald-600 text-white',
          border: 'border-emerald-600',
          badge: 'bg-emerald-50 text-emerald-700',
          icon: <Brain className="w-4 h-4" />,
        };
      case 'quick_build':
        return {
          pill: 'bg-amber-600 text-white',
          border: 'border-amber-600',
          badge: 'bg-amber-50 text-amber-800',
          icon: <Rocket className="w-4 h-4" />,
        };
    }
  };

  const modeTheme = getModeColor(activeMode);

  return (
    <div className="rounded-3xl border-2 border-neutral-900/10 bg-white shadow-sm overflow-hidden">
      {/* Top Header Banner & Skill/Mode Switchers */}
      <div className="p-6 md:p-8 bg-gradient-to-b from-[#FAF9FE] to-white border-b border-neutral-200/90 space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEAFF] text-[#5534DA] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Roadmap Flowchart</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display text-neutral-900 tracking-tight">
            Roadmap Flowchart for <span className="text-[#FF5C38]">{selectedSkill.title}</span>
          </h2>
          <p className="text-xs md:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
            Visual topic-by-topic learning paths tailored for every skill. Main stages (01, 02, 03) and child sub-stages (A, B, C) are displayed in a unified infographic layout.
          </p>
        </div>

        {/* AI Provider Status Diagnostic Banner */}
        {aiProviderInfo?.openaiStatus === 'quota_exceeded' && (
          <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 text-amber-900 text-xs flex items-start gap-3 shadow-xs">
            <div className="w-6 h-6 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0 font-bold text-sm">
              !
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-amber-950 font-display">
                  OpenAI API Key Detected (Account Quota Exceeded • HTTP 429)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[10px] font-mono font-bold">
                  credit_balance_exhausted
                </span>
              </div>
              <p className="text-amber-800 leading-relaxed text-[11px]">
                Your OpenAI key is recognized, but OpenAI returned: <em>"You have no credits remaining"</em>. Add billing credits at{' '}
                <a
                  href="https://platform.openai.com/settings/organization/billing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold text-amber-950 hover:text-black"
                >
                  platform.openai.com/settings/organization/billing
                </a>
                . In the meantime, SkillBridge is automatically powering your roadmaps, flowcharts, and learning activities using the built-in backup engine.
              </p>
            </div>
          </div>
        )}

        {/* 1. Skill Selector Quick Switcher + OpenAI Custom Flowchart Generator */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#FF5C38]" />
              <span>Select Target Skill:</span>
            </label>

            <button
              type="button"
              onClick={() => setGeneratorOpen(!generatorOpen)}
              className="text-xs font-bold text-[#5534DA] hover:text-[#412FA9] flex items-center gap-1.5 bg-[#EFEAFF] hover:bg-[#E5DEFF] px-3 py-1 rounded-xl transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{generatorOpen ? 'Hide Custom Flowchart' : '+ Custom Skill Flowchart (OpenAI)'}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {availableSkills.map((skill) => {
              const isSelected = !customFlowchartData && skill.id === selectedSkill.id;
              return (
                <button
                  key={skill.id}
                  onClick={() => {
                    handleResetToStandard();
                    onSelectSkill(skill);
                  }}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200'
                  }`}
                >
                  <span>{skill.title}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C38]" />}
                </button>
              );
            })}

            {customFlowchartData && (
              <div className="px-3.5 py-1.5 rounded-2xl bg-[#EFEAFF] text-[#5534DA] border border-[#DDD1FE] text-xs font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom: {customFlowchartData.skillTitle}</span>
                <button
                  onClick={handleResetToStandard}
                  className="hover:text-neutral-900 p-0.5 rounded cursor-pointer"
                  title="Reset to default tracks"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* OpenAI Custom Skill Flowchart Input Bar */}
          {generatorOpen && (
            <form onSubmit={handleGenerateCustomFlowchart} className="p-4 rounded-2xl bg-neutral-900 text-white space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-display flex items-center gap-1.5 text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  Generate Custom Skill Flowchart via OpenAI
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                  Model: GPT-4o-mini
                </span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-tight">
                Enter any niche domain, framework, or role (e.g. <em>"DevOps & Kubernetes"</em>, <em>"Solidity Web3 Development"</em>, <em>"Rust Microservices"</em>, <em>"AI & Machine Learning"</em>). OpenAI will formulate an infographic flowchart with stages, lettered sub-stages, and milestones.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="e.g. DevOps & Kubernetes Infrastructure..."
                  value={customSkillPrompt}
                  onChange={(e) => setCustomSkillPrompt(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-neutral-400 focus:outline-hidden focus:border-[#FF5C38]"
                />
                <button
                  type="submit"
                  disabled={isGeneratingFlowchart || !customSkillPrompt.trim()}
                  className="px-5 py-2 rounded-xl bg-[#FF5C38] hover:bg-[#E84D2B] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-all shadow-md shadow-[#FF5C38]/25"
                >
                  {isGeneratingFlowchart ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating with OpenAI...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Flowchart</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 2. Type of Roadmap Selector */}
        <div className="space-y-2 pt-2 border-t border-neutral-200/60">
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#5534DA]" />
            <span>Select Type of Roadmap:</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* Mode A: Normal */}
            <button
              onClick={() => onSelectMode('normal')}
              className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                activeMode === 'normal'
                  ? 'border-[#5534DA] bg-white shadow-xs ring-2 ring-[#5534DA]/15'
                  : 'border-neutral-200 bg-white/70 hover:bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black font-display text-neutral-900 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#5534DA]" />
                  Normal Roadmap
                </span>
                {activeMode === 'normal' && (
                  <span className="w-2 h-2 rounded-full bg-[#5534DA]" />
                )}
              </div>
              <p className="text-[11px] text-neutral-500 leading-tight">
                Full 0-to-100 foundation sequence.
              </p>
            </button>

            {/* Mode B: Advanced */}
            <button
              onClick={() => onSelectMode('advanced')}
              className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                activeMode === 'advanced'
                  ? 'border-[#FF5C38] bg-white shadow-xs ring-2 ring-[#FF5C38]/15'
                  : 'border-neutral-200 bg-white/70 hover:bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black font-display text-neutral-900 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#FF5C38]" />
                  Advanced Fast-Track
                </span>
                {activeMode === 'advanced' && (
                  <span className="w-2 h-2 rounded-full bg-[#FF5C38]" />
                )}
              </div>
              <p className="text-[11px] text-neutral-500 leading-tight">
                Skips basics into high-leverage architecture.
              </p>
            </button>

            {/* Mode C: Smart */}
            <button
              onClick={() => onSelectMode('smart')}
              className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                activeMode === 'smart'
                  ? 'border-emerald-600 bg-white shadow-xs ring-2 ring-emerald-600/15'
                  : 'border-neutral-200 bg-white/70 hover:bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black font-display text-neutral-900 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-emerald-600" />
                  Smart Diagnostic
                </span>
                {activeMode === 'smart' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                )}
              </div>
              <p className="text-[11px] text-neutral-500 leading-tight">
                Diagnostic placement targets known gaps.
              </p>
            </button>

            {/* Mode D: Quick Build */}
            <button
              onClick={() => onSelectMode('quick_build')}
              className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                activeMode === 'quick_build'
                  ? 'border-amber-600 bg-white shadow-xs ring-2 ring-amber-600/15'
                  : 'border-neutral-200 bg-white/70 hover:bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black font-display text-neutral-900 flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5 text-amber-600" />
                  Quick Build Goal
                </span>
                {activeMode === 'quick_build' && (
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                )}
              </div>
              <p className="text-[11px] text-neutral-500 leading-tight">
                Shortest path to ship a practical deliverable.
              </p>
            </button>
          </div>
        </div>

        {/* If Quick Build: Project Goal Selector */}
        {activeMode === 'quick_build' && goalOptions.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-700" />
                Target Project Goal for Flowchart:
              </span>
              <span className="text-[11px] font-mono text-amber-800 font-bold">
                Goal: {activeGoal?.title}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {goalOptions.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoalId(goal.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedGoalId === goal.id
                      ? 'bg-amber-700 text-white shadow-xs'
                      : 'bg-white text-neutral-700 hover:bg-amber-100/50 border border-amber-200'
                  }`}
                >
                  {goal.title}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-amber-800/90 leading-tight">
              Flowchart highlights only the critical topics required to ship: <strong className="font-semibold text-amber-950">{activeGoal?.targetDeliverable}</strong> (~{activeGoal?.estimatedHours}h total).
            </p>
          </div>
        )}

        {/* Summary Metrics Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-neutral-200/80">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${modeTheme.badge}`}>
              {flowchartData.modeTitle}
            </span>
            <span className="flex items-center gap-1 text-neutral-600 font-mono font-medium">
              <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
              <strong>{flowchartData.totalTopicsCount}</strong> Active Topics
            </span>
            <span className="flex items-center gap-1 text-neutral-600 font-mono font-medium">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <strong>~{flowchartData.totalHours}</strong> Hours
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 font-mono text-[11px]">
              {flowchartData.speedRatioBadge}
            </span>
          </div>

          {/* Search & Layout toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-800 placeholder-neutral-400 focus:outline-hidden focus:border-[#FF5C38] w-40 sm:w-52"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex border border-neutral-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setViewStyle('infographic')}
                className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  viewStyle === 'infographic'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                Infographic
              </button>
              <button
                onClick={() => setViewStyle('list')}
                className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  viewStyle === 'list'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INFOGRAPHIC FLOWCHART CANVAS (MATCHING REFERENCE IMAGE 2)                 */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-8 md:p-10 bg-[#ECE8F7] transition-all">
        {viewStyle === 'infographic' ? (
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Infographic Title & 5-Segment Color Bar from Image 2 */}
            <div className="text-center space-y-2 pb-2">
              <div className="flex items-center justify-center gap-1.5 mb-2.5">
                <div className="w-9 h-1 rounded-full bg-[#412FA9]" />
                <div className="w-9 h-1 rounded-full bg-[#6F40E4]" />
                <div className="w-9 h-1 rounded-full bg-[#9E49CE]" />
                <div className="w-9 h-1 rounded-full bg-[#D84C98]" />
                <div className="w-9 h-1 rounded-full bg-[#F46B38]" />
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-neutral-900 tracking-widest uppercase">
                FLOW CHART
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 font-medium tracking-wider uppercase font-sans">
                Infographic Stages (01, 02...) with Modular Sub-Stages (A, B, C...)
              </p>
            </div>

            {/* Stages & Embedded Sub-Stages List */}
            <div className="space-y-10">
              {flowchartData.phases.map((phase: FlowchartPhase, pIdx: number) => {
                const phaseNodes = nodesByPhase.get(phase.id) || [];
                const colorConfig = stagePalette[pIdx % stagePalette.length];
                const PhaseIcon = colorConfig.icon;
                const isEven = pIdx % 2 === 1; // Alternating layout for parent stage
                const formattedNumber = String(phase.number).padStart(2, '0');

                // Extract punchy stage name
                const titleParts = phase.title.split(':');
                const stageCategory = (titleParts[1] || titleParts[0]).trim().toUpperCase();

                return (
                  <div key={phase.id} className="relative space-y-4">
                    {/* ------------------------------------------------------------- */}
                    {/* PARENT STAGE CAPSULE (IMAGE 2 STYLE)                          */}
                    {/* ------------------------------------------------------------- */}
                    <div className="relative bg-white rounded-3xl sm:rounded-full p-4 sm:px-8 sm:py-5 border-2 border-white shadow-[0_12px_32px_-8px_rgba(78,44,142,0.14)] hover:shadow-[0_18px_40px_-6px_rgba(78,44,142,0.2)] transition-all">
                      {/* Desktop Layout (Alternating Discs) */}
                      <div className="hidden sm:flex items-center justify-between gap-6">
                        {!isEven ? (
                          /* ODD STAGE (01, 03, 05): Left icon -> Disc -> Right Title & Desc */
                          <>
                            {/* Far Left: Outline Icon Badge */}
                            <div className="w-12 h-12 rounded-full border-2 border-neutral-200/90 flex items-center justify-center shrink-0 text-neutral-400">
                              <PhaseIcon className="w-5 h-5 stroke-[1.75]" />
                            </div>

                            {/* Left-Center: Large Number Disc (01, 03, 05) */}
                            <div className="relative shrink-0 -my-2">
                              <div className={`p-1.5 rounded-full bg-white shadow-md ring-4 ${colorConfig.ringColor}`}>
                                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${colorConfig.discBg} shadow-lg flex items-center justify-center text-white font-display font-black text-2xl sm:text-3xl tracking-tight`}>
                                  {formattedNumber}
                                </div>
                              </div>
                            </div>

                            {/* Right: Stage Title & Description */}
                            <div className="flex-1 min-w-0 pr-2">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="text-base sm:text-lg font-black font-display text-neutral-900 tracking-wider">
                                  {stageCategory}
                                </h4>
                                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${colorConfig.badgeBg}`}>
                                  {phaseNodes.length} Sub-stages
                                </span>
                              </div>
                              <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                                {phase.shortDesc}
                              </p>
                            </div>
                          </>
                        ) : (
                          /* EVEN STAGE (02, 04): Left Title & Desc -> Disc -> Far Right Icon */
                          <>
                            {/* Left: Stage Title & Description */}
                            <div className="flex-1 min-w-0 pl-2 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${colorConfig.badgeBg}`}>
                                  {phaseNodes.length} Sub-stages
                                </span>
                                <h4 className="text-base sm:text-lg font-black font-display text-neutral-900 tracking-wider">
                                  {stageCategory}
                                </h4>
                              </div>
                              <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                                {phase.shortDesc}
                              </p>
                            </div>

                            {/* Right-Center: Large Number Disc (02, 04) */}
                            <div className="relative shrink-0 -my-2">
                              <div className={`p-1.5 rounded-full bg-white shadow-md ring-4 ${colorConfig.ringColor}`}>
                                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${colorConfig.discBg} shadow-lg flex items-center justify-center text-white font-display font-black text-2xl sm:text-3xl tracking-tight`}>
                                  {formattedNumber}
                                </div>
                              </div>
                            </div>

                            {/* Far Right: Outline Icon Badge */}
                            <div className="w-12 h-12 rounded-full border-2 border-neutral-200/90 flex items-center justify-center shrink-0 text-neutral-400">
                              <PhaseIcon className="w-5 h-5 stroke-[1.75]" />
                            </div>
                          </>
                        )}
                      </div>

                      {/* Mobile Layout */}
                      <div className="flex sm:hidden items-center gap-3">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${colorConfig.discBg} shadow-md flex items-center justify-center text-white font-display font-black text-xl shrink-0 ring-4 ${colorConfig.ringColor}`}>
                          {formattedNumber}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-sm font-black font-display text-neutral-900 tracking-wide truncate">
                              {stageCategory}
                            </h4>
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${colorConfig.badgeBg} shrink-0`}>
                              {phaseNodes.length}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">
                            {phase.shortDesc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ------------------------------------------------------------- */}
                    {/* SUB-STAGES CONTAINER (ALWAYS SHOWN, SMALLER PILL & DISC A,B,C) */}
                    {/* ------------------------------------------------------------- */}
                    <div className="space-y-3 pl-3 sm:pl-10 pr-1 sm:pr-4">
                      {/* Sub-stages connector indicator label */}
                      <div className="flex items-center gap-2 pl-3 text-[11px] font-mono font-bold text-neutral-500">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorConfig.discBg}`} />
                        <span>Sub-stages for Stage {phase.number} ({phaseNodes.length})</span>
                      </div>

                      {/* The Sub-stages rendered with the same pill & disc design as the parent stage */}
                      <div className="space-y-3">
                        {phaseNodes.map((node, subIdx) => {
                          const subLetter = getSubStageLetter(subIdx); // 'A', 'B', 'C', 'D'
                          const isSubEven = subIdx % 2 === 1; // Alternating layout for sub-stages
                          const isSkipped = node.status === 'skipped';
                          const isMilestone = !!node.isMilestone;
                          const isDiagnostic = node.status === 'diagnostic-check';
                          const isFastTrack = node.status === 'fast-track';

                          return (
                            <div
                              key={node.id}
                              onClick={() => handleInspectNode(node)}
                              className={`group/sub relative bg-white/95 rounded-2xl sm:rounded-full p-3 sm:px-6 sm:py-3.5 border-2 transition-all duration-200 cursor-pointer shadow-[0_6px_20px_-4px_rgba(78,44,142,0.08)] hover:shadow-[0_12px_28px_-6px_rgba(78,44,142,0.18)] hover:scale-[1.01] hover:border-neutral-900 ${
                                isSkipped
                                  ? 'border-dashed border-neutral-300 opacity-75'
                                  : isMilestone
                                  ? 'border-amber-300'
                                  : 'border-white'
                              }`}
                            >
                              {/* DESKTOP SUB-STAGE PILL (SAME DESIGN AS STAGE, BUT SMALLER) */}
                              <div className="hidden sm:flex items-center justify-between gap-5">
                                {!isSubEven ? (
                                  /* Sub-stage A / C: Outline Icon on left -> Letter Disc A -> Title & Details on right */
                                  <>
                                    {/* Left: Outline Sub-icon */}
                                    <div className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-400 group-hover/sub:text-neutral-700 transition-colors">
                                      <Code2 className="w-4 h-4 stroke-[1.75]" />
                                    </div>

                                    {/* Left-Center: Smaller Circular Disc showing letter A, B, C */}
                                    <div className="relative shrink-0 -my-1">
                                      <div className={`p-1 rounded-full bg-white shadow-xs ring-2 sm:ring-3 ${colorConfig.ringColor}`}>
                                        <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br ${colorConfig.discBg} shadow-sm flex items-center justify-center text-white font-display font-black text-base sm:text-lg tracking-tight group-hover/sub:scale-105 transition-transform`}>
                                          {subLetter}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Right: Sub-stage Info */}
                                    <div className="flex-1 min-w-0 pr-1">
                                      <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2 truncate">
                                          <h5 className="text-sm font-bold text-neutral-900 group-hover/sub:text-[#FF5C38] transition-colors truncate">
                                            {node.title}
                                          </h5>
                                          <span
                                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 ${
                                              isSkipped
                                                ? 'bg-neutral-100 text-neutral-500'
                                                : isMilestone
                                                ? 'bg-amber-100 text-amber-900'
                                                : isDiagnostic
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : isFastTrack
                                                ? 'bg-[#FFF2ED] text-[#FF5C38]'
                                                : 'bg-[#EFEAFF] text-[#5534DA]'
                                            }`}
                                          >
                                            {node.statusBadge}
                                          </span>
                                        </div>

                                        <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-neutral-500">
                                          <span className="flex items-center gap-1">
                                            <span
                                              className={`w-1.5 h-1.5 rounded-full ${
                                                node.difficulty === 'Beginner'
                                                  ? 'bg-emerald-500'
                                                  : node.difficulty === 'Intermediate'
                                                  ? 'bg-amber-500'
                                                  : 'bg-rose-500'
                                              }`}
                                            />
                                            <span>{node.difficulty}</span>
                                          </span>
                                          <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-neutral-400" />
                                            <span>{node.estimatedHours}h</span>
                                          </span>
                                          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover/sub:translate-x-0.5 group-hover/sub:text-[#FF5C38] transition-all" />
                                        </div>
                                      </div>

                                      {/* Sub-stage details snippet & key chips */}
                                      <div className="flex items-center justify-between gap-2 mt-1">
                                        <p className="text-xs text-neutral-500 line-clamp-1">
                                          {node.description}
                                        </p>
                                        <div className="flex items-center gap-1 shrink-0">
                                          {node.keyTopics.slice(0, 2).map((topic, tIdx) => (
                                            <span
                                              key={tIdx}
                                              className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF9FD] border border-neutral-200 text-neutral-600 font-mono"
                                            >
                                              {topic}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  /* Sub-stage B / D: Title & Details on left -> Letter Disc B -> Outline icon on right */
                                  <>
                                    {/* Left: Sub-stage Info */}
                                    <div className="flex-1 min-w-0 pl-1 text-right">
                                      <div className="flex items-center justify-end gap-2">
                                        <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-neutral-500">
                                          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover/sub:translate-x-0.5 group-hover/sub:text-[#FF5C38] transition-all rotate-180" />
                                          <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-neutral-400" />
                                            <span>{node.estimatedHours}h</span>
                                          </span>
                                          <span className="flex items-center gap-1">
                                            <span
                                              className={`w-1.5 h-1.5 rounded-full ${
                                                node.difficulty === 'Beginner'
                                                  ? 'bg-emerald-500'
                                                  : node.difficulty === 'Intermediate'
                                                  ? 'bg-amber-500'
                                                  : 'bg-rose-500'
                                              }`}
                                            />
                                            <span>{node.difficulty}</span>
                                          </span>
                                        </div>

                                        <div className="flex items-center gap-2 truncate justify-end">
                                          <span
                                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 ${
                                              isSkipped
                                                ? 'bg-neutral-100 text-neutral-500'
                                                : isMilestone
                                                ? 'bg-amber-100 text-amber-900'
                                                : isDiagnostic
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : isFastTrack
                                                ? 'bg-[#FFF2ED] text-[#FF5C38]'
                                                : 'bg-[#EFEAFF] text-[#5534DA]'
                                            }`}
                                          >
                                            {node.statusBadge}
                                          </span>
                                          <h5 className="text-sm font-bold text-neutral-900 group-hover/sub:text-[#FF5C38] transition-colors truncate">
                                            {node.title}
                                          </h5>
                                        </div>
                                      </div>

                                      {/* Sub-stage details snippet & key chips */}
                                      <div className="flex items-center justify-end gap-2 mt-1">
                                        <div className="flex items-center gap-1 shrink-0">
                                          {node.keyTopics.slice(0, 2).map((topic, tIdx) => (
                                            <span
                                              key={tIdx}
                                              className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF9FD] border border-neutral-200 text-neutral-600 font-mono"
                                            >
                                              {topic}
                                            </span>
                                          ))}
                                        </div>
                                        <p className="text-xs text-neutral-500 line-clamp-1">
                                          {node.description}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Right-Center: Smaller Circular Disc showing letter B, D */}
                                    <div className="relative shrink-0 -my-1">
                                      <div className={`p-1 rounded-full bg-white shadow-xs ring-2 sm:ring-3 ${colorConfig.ringColor}`}>
                                        <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br ${colorConfig.discBg} shadow-sm flex items-center justify-center text-white font-display font-black text-base sm:text-lg tracking-tight group-hover/sub:scale-105 transition-transform`}>
                                          {subLetter}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Far Right: Outline Sub-icon */}
                                    <div className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-400 group-hover/sub:text-neutral-700 transition-colors">
                                      <Terminal className="w-4 h-4 stroke-[1.75]" />
                                    </div>
                                  </>
                                )}
                              </div>

                              {/* MOBILE SUB-STAGE PILL */}
                              <div className="flex sm:hidden items-center gap-3">
                                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${colorConfig.discBg} shadow-xs flex items-center justify-center text-white font-display font-black text-sm shrink-0 ring-2 ${colorConfig.ringColor}`}>
                                  {subLetter}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1">
                                    <h5 className="text-xs font-bold text-neutral-900 truncate">
                                      {node.title}
                                    </h5>
                                    <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                                      {node.estimatedHours}h
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5">
                                    {node.statusBadge} • {node.difficulty}
                                  </p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Progression Down Connector between Phases */}
                    {pIdx < flowchartData.phases.length - 1 && (
                      <div className="flex items-center justify-center pt-3 pb-1">
                        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/90 text-neutral-500 text-[11px] font-mono shadow-xs">
                          <span>Progression to Stage {phase.number + 1}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#FF5C38]" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* List View fallback */
          <div className="max-w-4xl mx-auto space-y-3">
            {filteredNodes.map((node: FlowchartNode, idx: number) => (
              <div
                key={node.id}
                onClick={() => handleInspectNode(node)}
                className={`p-4 rounded-2xl border-2 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:border-neutral-900 transition-all ${
                  node.status === 'skipped'
                    ? 'opacity-60 border-dashed border-neutral-300'
                    : 'border-neutral-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-neutral-100 font-mono text-xs font-bold flex items-center justify-center text-neutral-600 shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-bold text-neutral-900">{node.title}</h5>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-mono">
                        {node.statusBadge}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                      {node.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 shrink-0">
                  <span>{node.difficulty}</span>
                  <span>~{node.estimatedHours}h</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Flowchart Visual Legend */}
        <div className="max-w-4xl mx-auto mt-8 pt-5 border-t border-purple-200/60 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-600">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
            <span className="font-bold text-neutral-700 uppercase font-sans">Legend:</span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#4F39BC]" />
              <span>Core Track</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#FF5C38]" />
              <span>Advanced Fast-Track</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-emerald-500" />
              <span>Diagnostic Validated</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-amber-400" />
              <span>Milestone Deliverable</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md border-2 border-dashed border-neutral-400 bg-neutral-100" />
              <span>Bypassed in this Track</span>
            </span>
          </div>

          <div className="text-[11px] text-neutral-500 font-medium">
            Click any sub-stage (A, B, C) to view learning outcomes & exercises
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* NODE INSPECTION MODAL (CURRICULUM TOPIC DRILL-DOWN)                       */}
      {/* ========================================================================= */}
      {inspectedNode && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-neutral-900/10 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto animate-in fade-in duration-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF5C38]">
                  {inspectedNode.phaseName}
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-display text-neutral-900 mt-1">
                  {inspectedNode.title}
                </h3>
              </div>
              <button
                onClick={() => setInspectedNode(null)}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metrics Chips */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 font-bold">
                {inspectedNode.statusBadge}
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                ~{inspectedNode.estimatedHours} Hours
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700">
                Level: {inspectedNode.difficulty}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono">
                Topic Overview
              </h4>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {inspectedNode.description}
              </p>
            </div>

            {/* Core Competencies List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono">
                Core Competencies & Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {inspectedNode.keyTopics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-[#FAF9FD] border border-neutral-200 text-xs font-medium text-neutral-800"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Milestone deliverable if present */}
            {inspectedNode.deliverable && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-950">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span>Phase Milestone Deliverable</span>
                </div>
                <p>{inspectedNode.deliverable}</p>
              </div>
            )}

            {/* OpenAI Deep-Dive Architectural Guide */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 text-white space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-display text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  OpenAI Architectural Deep-Dive
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                  {deepDiveEngine || 'Model: GPT-4o-mini'}
                </span>
              </div>

              {apiNotice && (
                <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-600/40 text-amber-200 text-xs flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">Engine Notice:</span>
                  <span className="leading-relaxed text-[11px]">{apiNotice}</span>
                </div>
              )}

              {!deepDiveData && !loadingDeepDive && (
                <div className="space-y-2">
                  <p className="text-xs text-neutral-300">
                    Consult OpenAI for deep architectural mechanics, real-world production use cases, dangerous pitfalls to avoid, and interview questions.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleFetchDeepDive(inspectedNode)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border border-white/15"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Run Deep-Dive with OpenAI</span>
                  </button>
                </div>
              )}

              {loadingDeepDive && (
                <div className="py-4 text-center space-y-2">
                  <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-neutral-400 font-mono">Querying OpenAI GPT-4o-mini engine...</p>
                </div>
              )}

              {deepDiveData && (
                <div className="space-y-3 text-xs pt-1 animate-in fade-in">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-mono font-bold text-emerald-400">Under The Hood Mechanics</span>
                    <p className="text-neutral-200 leading-relaxed text-[11px]">{deepDiveData.architecturalSummary}</p>
                  </div>

                  {deepDiveData.whyItMatters && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-amber-400">Why Top Engineering Teams Care</span>
                      <p className="text-neutral-200 leading-relaxed text-[11px]">{deepDiveData.whyItMatters}</p>
                    </div>
                  )}

                  {deepDiveData.industryScenarios && deepDiveData.industryScenarios.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-mono font-bold text-neutral-400">Production Industry Patterns</span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {deepDiveData.industryScenarios.map((sc: any, idx: number) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                            <span className="font-bold text-neutral-200 block text-[11px]">{sc.title}</span>
                            <span className="text-[11px] text-neutral-400">{sc.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {deepDiveData.commonTraps && deepDiveData.commonTraps.length > 0 && (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 space-y-1.5">
                      <span className="text-[10px] uppercase font-mono font-bold text-rose-400">Critical Traps to Avoid</span>
                      <ul className="list-disc list-inside space-y-0.5 text-neutral-300 text-[11px]">
                        {deepDiveData.commonTraps.map((trap: string, idx: number) => (
                          <li key={idx}>{trap}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {deepDiveData.interviewTip && (
                    <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/50 space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-purple-300">Interview Talking Point</span>
                      <p className="text-neutral-200 text-[11px]">{deepDiveData.interviewTip}</p>
                    </div>
                  )}

                  {deepDiveData.recommendedHandsOnProject && (
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-emerald-300">Hands-on Mini Exercise</span>
                      <p className="text-neutral-200 text-[11px]">{deepDiveData.recommendedHandsOnProject}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-3 border-t border-neutral-200">
              <button
                onClick={() => setInspectedNode(null)}
                className="px-5 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setInspectedNode(null);
                  onActivateRoadmap(selectedSkill.id, activeMode);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#FF5C38] hover:bg-[#E84D2B] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch Practice Level</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
