import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { getCurriculumForSkill } from '../data/curriculumData';
import { availableSkills } from '../data/skillsData';
import { Sublevel, ActivityDefinition, LearningResource } from '../types';
import { ActivityContainer } from './activities/ActivityContainer';
import {
  CheckCircle2,
  Lock,
  Star,
  Play,
  BookOpen,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Flame,
  X,
  Compass,
  Bot,
  RefreshCw,
} from 'lucide-react';
import { LearnedSkillsModal } from './LearnedSkillsModal';
import { AdventurePathMap } from './AdventurePathMap';

export const SkillLevelUpView: React.FC<{ onNavigateToProjects?: () => void }> = ({
  onNavigateToProjects,
}) => {
  const { userProfile, setSelectedSkill } = useAuth();
  const {
    progressMap,
    isSublevelCompleted,
    isSublevelUnlocked,
    totalCompletedSublevels,
  } = useProgress();

  const [viewLayout, setViewLayout] = useState<'trail' | 'grid'>('trail');
  const [selectedSublevel, setSelectedSublevel] = useState<Sublevel | null>(null);
  const [activeActivity, setActiveActivity] = useState<ActivityDefinition | null>(null);
  const [resourceTabOpen, setResourceTabOpen] = useState(false);
  const [isLearnedModalOpen, setIsLearnedModalOpen] = useState(false);

  // AI-generated resources state (OpenAI with Gemini/Curated fallback)
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiEngine, setAiEngine] = useState<string>('');
  const [aiNotice, setAiNotice] = useState<string | null>(null);
  const [aiData, setAiData] = useState<{
    curatedSummary?: string;
    keyTakeaways?: string[];
    resources?: LearningResource[];
  } | null>(null);

  // Active skill curriculum with immediate reactivity
  const [activeSkillId, setActiveSkillId] = useState<string>(() => {
    return userProfile?.selectedSkill || localStorage.getItem('skillbridge_selected_skill') || 'ui-ux-design';
  });

  useEffect(() => {
    const handleSkillEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ skillId: string }>;
      if (customEvent.detail?.skillId) {
        setActiveSkillId(customEvent.detail.skillId);
        setSelectedSublevel(null);
        setActiveActivity(null);
      }
    };
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === 'skillbridge_selected_skill' && e.newValue) {
        setActiveSkillId(e.newValue);
        setSelectedSublevel(null);
        setActiveActivity(null);
      }
    };

    window.addEventListener('skillbridge-skill-changed', handleSkillEvent);
    window.addEventListener('storage', handleStorageEvent);

    const desired = userProfile?.selectedSkill || localStorage.getItem('skillbridge_selected_skill');
    if (desired && desired !== activeSkillId) {
      setActiveSkillId(desired);
    }

    return () => {
      window.removeEventListener('skillbridge-skill-changed', handleSkillEvent);
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [userProfile?.selectedSkill]);

  const activeWorlds = getCurriculumForSkill(activeSkillId);
  const activeSkillObj = availableSkills.find((s) => s.id === activeSkillId) || availableSkills[0];

  // Flatten all sublevels for navigation for the active skill
  const allSublevelsList: Sublevel[] = [];
  activeWorlds.forEach((w) => {
    w.levels.forEach((l) => {
      l.sublevels.forEach((s) => {
        allSublevelsList.push(s);
      });
    });
  });

  // Automatically launch target sublevel if navigated from Dashboard
  useEffect(() => {
    const targetSublevelId = localStorage.getItem('skillbridge_target_sublevel');
    if (targetSublevelId && allSublevelsList.length > 0) {
      localStorage.removeItem('skillbridge_target_sublevel');
      const found = allSublevelsList.find((s) => s.id === targetSublevelId);
      if (found) {
        setSelectedSublevel(found);
        setResourceTabOpen(false);
        setAiData(null);
        if (found.activities && found.activities.length > 0) {
          setActiveActivity(found.activities[0]);
        }
      }
    }
  }, [allSublevelsList]);

  const handleOpenSublevel = (sublevel: Sublevel) => {
    if (!isSublevelUnlocked(sublevel.id)) return;
    setSelectedSublevel(sublevel);
    setResourceTabOpen(false);
    setAiData(null);
    setAiNotice(null);
  };

  const handleStartActivity = (sublevel: Sublevel) => {
    if (sublevel.activities.length > 0) {
      setActiveActivity(sublevel.activities[0]);
    }
  };

  const handleNextSublevel = () => {
    if (!selectedSublevel) return;
    const currentIdx = allSublevelsList.findIndex((s) => s.id === selectedSublevel.id);
    if (currentIdx >= 0 && currentIdx < allSublevelsList.length - 1) {
      const nextSub = allSublevelsList[currentIdx + 1];
      if (isSublevelUnlocked(nextSub.id)) {
        setSelectedSublevel(nextSub);
        setAiData(null);
        setAiNotice(null);
        if (nextSub.activities.length > 0) {
          setActiveActivity(nextSub.activities[0]);
        }
      }
    }
  };

  const handleSkillSwitch = async (newSkillId: string) => {
    setActiveSkillId(newSkillId);
    localStorage.setItem('skillbridge_selected_skill', newSkillId);
    await setSelectedSkill(newSkillId);
    setSelectedSublevel(null);
    setActiveActivity(null);
    setIsLearnedModalOpen(true);
  };

  // Call server-side AI API to enrich or fetch resources on demand
  const handleFetchAiResources = async () => {
    if (!selectedSublevel) return;
    try {
      setLoadingAi(true);
      setAiNotice(null);
      const res = await fetch('/api/generate-resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillTitle: activeSkillObj.title,
          sublevelTitle: selectedSublevel.title,
          summary: selectedSublevel.summary,
        }),
      });

      const json = await res.json();
      if (json?.data) {
        setAiData(json.data);
        setAiEngine(json.engine || '');
        setAiNotice(json.openAiNotice || null);
        setResourceTabOpen(true);
      }
    } catch (err) {
      console.error('Error fetching AI resources:', err);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Level-Up Banner */}
      <div className="bg-[#FAF9FE] border-2 border-neutral-900/10 rounded-3xl p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-[#EFEAFF] text-[#5534DA] border border-[#DDD1FE] text-xs font-bold">
                Level-Up Progression Map
              </span>
              <span className="text-xs text-neutral-500 font-semibold font-mono">
                Track: {userProfile?.roadmapMode?.toUpperCase() || 'NORMAL'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-4xl font-black font-display text-neutral-900 tracking-tight">
                {activeSkillObj.title} <span className="text-[#FF5C38]">Map</span>
              </h1>
            </div>

            <p className="text-xs md:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed font-medium">
              Journey through interactive worlds, conquer practical challenges, defeat boss missions, and prove mastery in {activeSkillObj.title}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            {/* Quick Skill Selector */}
            <div className="flex items-center gap-2 bg-white border border-neutral-200 px-3.5 py-2 rounded-2xl text-xs shadow-xs">
              <span className="text-neutral-500 font-bold hidden sm:inline">Track:</span>
              <select
                value={activeSkillId}
                onChange={(e) => handleSkillSwitch(e.target.value)}
                className="bg-transparent text-neutral-900 font-bold focus:outline-none cursor-pointer"
              >
                {availableSkills.map((sk) => (
                  <option key={sk.id} value={sk.id} className="bg-white text-neutral-900">
                    {sk.title}
                  </option>
                ))}
              </select>
            </div>

            {/* What have you learned button */}
            <button
              type="button"
              onClick={() => setIsLearnedModalOpen(true)}
              className="px-4 py-2 rounded-2xl bg-[#EFEAFF] hover:bg-[#E5DEFF] text-[#5534DA] border border-[#DDD1FE] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mark Learned</span>
            </button>

            <div className="flex items-center gap-2 bg-[#FFF8E7] border border-[#FFE194] px-4 py-2 rounded-2xl text-xs shadow-xs">
              <Flame className="w-4 h-4 text-[#FF5C38] fill-[#FF5C38]" />
              <div className="text-amber-900 font-bold">
                {totalCompletedSublevels} / {allSublevelsList.length} Done
              </div>
            </div>
          </div>
        </div>

        {/* Quick Skill Selector Chips */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-neutral-200 overflow-x-auto pb-1">
          <span className="text-[11px] text-neutral-500 font-bold font-mono shrink-0 mr-1">Switch:</span>
          {availableSkills.map((sk) => {
            const isCurrent = sk.id === activeSkillId;
            return (
              <button
                key={sk.id}
                onClick={() => handleSkillSwitch(sk.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-[#FF5C38] text-white shadow-xs'
                    : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200'
                }`}
              >
                <span>{sk.title}</span>
                {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* View Mode Toggle: Adventure Trail (Default) vs Classic Cards */}
      <div className="flex items-center justify-between gap-3 bg-[#FAF9FD] p-2 rounded-2xl border border-neutral-200">
        <div className="flex items-center gap-2 pl-2">
          <span className="text-xs font-bold text-neutral-600">Layout:</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setViewLayout('trail')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
              viewLayout === 'trail'
                ? 'bg-[#FF5C38] text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
            }`}
          >
            <span>🗺️ Adventure Trail</span>
            <span className="px-1.5 py-0.2 bg-white/20 rounded-md text-[10px]">Recommended</span>
          </button>
          <button
            type="button"
            onClick={() => setViewLayout('grid')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewLayout === 'grid'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
            }`}
          >
            <span>📑 Classic Cards</span>
          </button>
        </div>
      </div>

      {/* Render either Adventure Path Map or Grid Cards */}
      {viewLayout === 'trail' ? (
        <AdventurePathMap
          worlds={activeWorlds}
          activeSkillTitle={activeSkillObj.title}
          userProfile={userProfile}
          progressMap={progressMap}
          isSublevelCompleted={isSublevelCompleted}
          isSublevelUnlocked={isSublevelUnlocked}
          onSelectSublevel={handleOpenSublevel}
          onQuickStart={(sub) => {
            handleOpenSublevel(sub);
            handleStartActivity(sub);
          }}
        />
      ) : (
        /* Map Worlds & Grid Nodes */
        <div className="space-y-10">
          {activeWorlds.map((world) => {
            return (
              <div
                key={world.id}
                className="relative bg-white border-2 border-neutral-900/10 rounded-3xl p-6 md:p-8 overflow-hidden shadow-xs"
              >
                {/* World Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-neutral-200">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${world.color} flex items-center justify-center text-white font-black text-lg shadow-sm`}
                    >
                      {world.number}
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-black font-display text-neutral-900">{world.title}</h2>
                      <p className="text-xs text-neutral-500">{world.shortDesc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="text-xs font-mono font-bold text-neutral-600 bg-[#FAF9FD] px-3 py-1 rounded-full border border-neutral-200">
                      {world.levels.length} Levels
                    </span>
                  </div>
                </div>

                {/* Levels & Sublevels visual path */}
                <div className="space-y-10">
                  {world.levels.map((lvl) => (
                    <div key={lvl.id} className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-neutral-800 uppercase tracking-wider font-display">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C38]"></span>
                        {lvl.title}
                      </div>

                      {/* Nodes Row with connecting track line */}
                      <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-8 right-8 h-1 bg-neutral-200 -translate-y-1/2 z-0 hidden sm:block" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
                          {lvl.sublevels.map((sub) => {
                            const isDone = isSublevelCompleted(sub.id);
                            const isUnlocked = isSublevelUnlocked(sub.id);
                            const progress = progressMap[sub.id];
                            const starsCount = progress?.stars || 3;

                            let cardState =
                              'border-neutral-200 bg-[#FAF9FD]/70 text-neutral-400 opacity-60';
                            if (isDone) {
                              cardState =
                                'border-2 border-emerald-400 bg-emerald-50/70 text-neutral-900 hover:border-emerald-500 cursor-pointer shadow-xs';
                            } else if (isUnlocked) {
                              cardState =
                                'border-2 border-[#FF5C38] bg-white text-neutral-900 hover:border-[#E84D2B] cursor-pointer shadow-md ring-2 ring-[#FF5C38]/15';
                            }

                            return (
                              <button
                                key={sub.id}
                                type="button"
                                onClick={() => handleOpenSublevel(sub)}
                                disabled={!isUnlocked}
                                className={`p-5 rounded-3xl border text-left transition-all duration-200 flex flex-col justify-between gap-3 ${cardState}`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2.5">
                                    <div
                                      className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 font-bold text-xs ${
                                        isDone
                                          ? 'bg-emerald-500 text-white shadow-xs'
                                          : isUnlocked
                                          ? 'bg-[#FF5C38] text-white shadow-sm shadow-[#FF5C38]/30'
                                          : 'bg-neutral-200 text-neutral-400'
                                      }`}
                                    >
                                      {isDone ? (
                                        <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                                      ) : isUnlocked ? (
                                        <Play className="w-4 h-4 fill-current ml-0.5" />
                                      ) : (
                                        <Lock className="w-4 h-4" />
                                      )}
                                    </div>
                                    <div>
                                      <h4 className="text-xs md:text-sm font-bold text-neutral-900 line-clamp-1 font-display">
                                        {sub.title}
                                      </h4>
                                      <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 mt-0.5">
                                        <span>{sub.activities.length} Activity</span>
                                        {sub.optionalResources.length > 0 && (
                                          <>
                                            <span>•</span>
                                            <span className="text-[#5534DA] font-semibold">
                                              {sub.optionalResources.length} Res
                                            </span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {isDone ? (
                                    <div className="flex items-center text-amber-500 shrink-0">
                                      {[...Array(starsCount)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                                      ))}
                                    </div>
                                  ) : (
                                    <span
                                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                        isUnlocked
                                          ? 'bg-[#FFF2ED] text-[#FF5C38]'
                                          : 'bg-neutral-100 text-neutral-400'
                                      }`}
                                    >
                                      {isUnlocked ? 'READY' : 'LOCKED'}
                                    </span>
                                  )}
                                </div>

                                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                                  {sub.summary}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sublevel Briefing Drawer / Modal */}
      {selectedSublevel && !activeActivity && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-neutral-900/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl">
            {/* Drawer Header */}
            <div className="p-6 bg-[#FAF9FD] border-b border-neutral-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-[#FF5C38] font-bold uppercase">
                  {activeSkillObj.title} • Sublevel Briefing
                </div>
                <h3 className="text-xl md:text-2xl font-black font-display text-neutral-900 mt-0.5">
                  {selectedSublevel.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSublevel(null)}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 mb-1">
                  Overview & Objectives
                </h4>
                <p className="text-sm text-neutral-700 leading-relaxed font-medium">
                  {selectedSublevel.summary}
                </p>
              </div>

              {/* Activities list in this sublevel */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 mb-2">
                  Interactive Mission
                </h4>
                {selectedSublevel.activities.map((act) => (
                  <div
                    key={act.id}
                    className="p-5 rounded-2xl border border-neutral-200 bg-[#FAF9FD] flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-neutral-900 font-display">{act.title}</span>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#EFEAFF] text-[#5534DA] font-bold uppercase">
                          {act.type.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600">{act.description}</p>
                    </div>
                    <span className="shrink-0 flex items-center gap-1 text-xs font-bold text-amber-800 bg-[#FFF8E7] border border-[#FFE194] px-3 py-1 rounded-full">
                      <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      +{act.xpReward} XP
                    </span>
                  </div>
                ))}
              </div>

              {/* Optional Learning Resources Accordion + Gemini AI Enrichment */}
              <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
                <div className="px-5 py-3.5 flex items-center justify-between border-b border-neutral-200 bg-[#FAF9FE]">
                  <button
                    type="button"
                    onClick={() => setResourceTabOpen(!resourceTabOpen)}
                    className="flex items-center gap-2 text-left text-xs font-bold text-neutral-800 hover:text-[#FF5C38] transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-[#5534DA]" />
                    <span>
                      Learning Resources (
                      {selectedSublevel.optionalResources.length + (aiData?.resources?.length || 0)})
                    </span>
                    <span className="text-[11px] text-neutral-500 font-normal">
                      (Optional)
                    </span>
                  </button>

                  {/* Gemini API Enricher Button */}
                  <button
                    type="button"
                    onClick={handleFetchAiResources}
                    disabled={loadingAi}
                    className="px-3 py-1.5 rounded-xl bg-[#EFEAFF] hover:bg-[#E5DEFF] border border-[#DDD1FE] text-[#5534DA] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loadingAi ? (
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    ) : (
                      <Bot className="w-3 h-3 text-[#5534DA]" />
                    )}
                    <span>{loadingAi ? 'Querying...' : 'Find Resources (AI)'}</span>
                  </button>
                </div>

                {(resourceTabOpen || aiData) && (
                  <div className="p-5 space-y-3">
                    {aiNotice && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2">
                        <span className="font-bold text-amber-800 shrink-0">OpenAI Notice:</span>
                        <span className="leading-relaxed text-[11px]">{aiNotice}</span>
                      </div>
                    )}

                    {aiEngine && (
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <span>Generated by: <strong className="text-neutral-800">{aiEngine}</strong></span>
                      </div>
                    )}

                    {aiData?.keyTakeaways && (
                      <div className="p-4 rounded-2xl bg-[#EFEAFF]/70 border border-[#DDD1FE] text-xs text-neutral-800 space-y-1.5">
                        <div className="font-bold flex items-center gap-1.5 text-[#5534DA]">
                          <Sparkles className="w-3.5 h-3.5" />
                          Curriculum Insights:
                        </div>
                        <p className="text-neutral-700 text-xs leading-relaxed">
                          {aiData.curatedSummary}
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 text-neutral-600 text-xs pt-1">
                          {aiData.keyTakeaways.map((k, idx) => (
                            <li key={idx}>{k}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {[...selectedSublevel.optionalResources, ...(aiData?.resources || [])].map((res) => (
                      <a
                        key={res.id}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 bg-[#FAF9FD] hover:border-[#FF5C38] transition-all text-xs group"
                      >
                        <div>
                          <div className="font-bold text-neutral-900 group-hover:text-[#FF5C38] transition-colors flex items-center gap-1.5">
                            <span>{res.title}</span>
                            <ExternalLink className="w-3 h-3 text-neutral-400" />
                          </div>
                          <div className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-2">
                            <span>{res.provider}</span>
                            <span>•</span>
                            <span className="text-emerald-700 font-semibold">
                              {res.isFree ? 'Free' : res.price || 'Paid'}
                            </span>
                            {res.duration && (
                              <>
                                <span>•</span>
                                <span>{res.duration}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white border border-neutral-200 text-neutral-700 font-bold">
                          {res.type}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-5 bg-[#FAF9FD] border-t border-neutral-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedSublevel(null)}
                className="px-4 py-2 rounded-xl text-neutral-600 hover:text-neutral-900 text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => handleStartActivity(selectedSublevel)}
                className="px-7 py-3 rounded-2xl bg-[#FF5C38] hover:bg-[#E84D2B] text-white text-xs md:text-sm font-bold flex items-center gap-2 shadow-md shadow-[#FF5C38]/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Challenge Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Interactive Activity Modal */}
      {selectedSublevel && activeActivity && (
        <div className="fixed inset-0 z-50 bg-neutral-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6">
          <div className="bg-white border-2 border-neutral-900/10 rounded-3xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Top Bar */}
            <div className="px-6 py-3.5 bg-[#FAF9FD] border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                <Compass className="w-4 h-4 text-[#FF5C38]" />
                <span>
                  {activeSkillObj.title} • {selectedSublevel.title}
                </span>
              </div>
              <button
                onClick={() => setActiveActivity(null)}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
                title="Close Mission"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body with Activity Container */}
            <div className="flex-1 p-4 md:p-6 overflow-hidden bg-white">
              <ActivityContainer
                activity={activeActivity}
                sublevel={selectedSublevel}
                onClose={() => setActiveActivity(null)}
                onNext={handleNextSublevel}
              />
            </div>
          </div>
        </div>
      )}

      {/* Prior Knowledge Modal */}
      <LearnedSkillsModal
        isOpen={isLearnedModalOpen}
        onClose={() => setIsLearnedModalOpen(false)}
        skill={activeSkillObj}
      />
    </div>
  );
};
