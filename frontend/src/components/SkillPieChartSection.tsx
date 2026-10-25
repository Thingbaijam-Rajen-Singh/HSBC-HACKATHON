import React, { useState } from 'react';
import { Sublevel, World, Level, SkillDefinition } from '../types';
import {
  CheckCircle2,
  Lock,
  Play,
  Star,
  Sparkles,
  ArrowRight,
  ListChecks,
  Check,
  Zap,
  BookOpen,
  PieChart as PieIcon,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface SkillItem {
  sublevel: Sublevel;
  world: World;
  levelTitle: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  orderIndex: number;
}

interface SkillPieChartSectionProps {
  activeSkill: SkillDefinition;
  allSkills: SkillDefinition[];
  onSelectSkill: (skillId: string) => void;
  skillItems: SkillItem[];
  onLaunchSkill: (sublevelId: string) => void;
  onOpenLearnedModal: () => void;
}

export const SkillPieChartSection: React.FC<SkillPieChartSectionProps> = ({
  activeSkill,
  allSkills,
  onSelectSkill,
  skillItems,
  onLaunchSkill,
  onOpenLearnedModal,
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'learned' | 'remaining'>('both');
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  // Categorize skills into learned vs left to learn
  const learnedSkills = skillItems.filter((s) => s.isCompleted);
  const remainingSkills = skillItems.filter((s) => !s.isCompleted);
  const readyToLearnSkills = remainingSkills.filter((s) => s.isUnlocked);
  const lockedSkills = remainingSkills.filter((s) => !s.isUnlocked);

  const total = Math.max(skillItems.length, 1);
  const completedCount = learnedSkills.length;
  const remainingCount = remainingSkills.length;
  const readyCount = readyToLearnSkills.length;
  const lockedCount = lockedSkills.length;

  const completedPct = Math.round((completedCount / total) * 100);
  const readyPct = Math.round((readyCount / total) * 100);
  const lockedPct = Math.max(0, 100 - completedPct - readyPct);

  // SVG Pie/Donut Chart Geometry using stroke-dasharray
  const radius = 72;
  const circumference = 2 * Math.PI * radius; // ~452.39

  const slice1Len = (completedCount / total) * circumference;
  const slice2Len = (readyCount / total) * circumference;
  const slice3Len = (lockedCount / total) * circumference;

  const offset1 = 0;
  const offset2 = -slice1Len;
  const offset3 = -(slice1Len + slice2Len);

  return (
    <div className="bg-white border-2 border-neutral-900/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs transition-all">
      {/* 1. Header with Title & Skill Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="px-3 py-0.5 rounded-full bg-[#EFEAFF] text-[#5534DA] border border-[#DDD1FE] text-xs font-bold flex items-center gap-1.5">
              <PieIcon className="w-3.5 h-3.5" />
              Skill Competency Pie Chart
            </span>
            <span className="text-xs font-mono font-bold text-neutral-500">
              {completedCount} Learned • {remainingCount} Left to Learn
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-display text-neutral-900 tracking-tight">
            Competency Breakdown:{' '}
            <span className="text-[#FF5C38]">{activeSkill.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-medium max-w-2xl">
            Detailed visual audit citing skills you have mastered already and the remaining competencies required to complete this track.
          </p>
        </div>

        {/* Skill Selector & Mark Learned Quick Action */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <select
            value={activeSkill.id}
            onChange={(e) => onSelectSkill(e.target.value)}
            className="px-3.5 py-2 rounded-2xl bg-[#FAF9FD] border border-neutral-300 text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#FF5C38]/20 cursor-pointer shadow-2xs"
          >
            {allSkills.map((sk) => (
              <option key={sk.id} value={sk.id}>
                {sk.title}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={onOpenLearnedModal}
            className="px-4 py-2 rounded-2xl bg-[#EFEAFF] hover:bg-[#E5DEFF] text-[#5534DA] border border-[#DDD1FE] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mark Learned</span>
          </button>
        </div>
      </div>

      {/* 2. Top Metric Bar & Interactive Pie Chart Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#FAF9FE] p-5 sm:p-7 rounded-3xl border border-neutral-200">
        {/* Left: The Pie / Donut Chart */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
            <svg
              viewBox="0 0 190 190"
              className="w-full h-full transform -rotate-90 drop-shadow-sm"
            >
              <defs>
                <linearGradient id="gradCompleted" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="gradReady" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF7A59" />
                  <stop offset="100%" stopColor="#FF5C38" />
                </linearGradient>
                <linearGradient id="gradLocked" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DDD6FE" />
                  <stop offset="100%" stopColor="#C4B5FD" />
                </linearGradient>
              </defs>

              {/* Background Ring */}
              <circle
                cx="95"
                cy="95"
                r={radius}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="24"
              />

              {/* Segment 3: Locked Skills (Left to Learn) */}
              {lockedCount > 0 && (
                <circle
                  cx="95"
                  cy="95"
                  r={radius}
                  fill="none"
                  stroke="url(#gradLocked)"
                  strokeWidth={hoveredSlice === 'locked' ? 28 : 24}
                  strokeDasharray={`${slice3Len} ${circumference}`}
                  strokeDashoffset={offset3}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredSlice('locked')}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
              )}

              {/* Segment 2: Ready to Learn (Left to Learn) */}
              {readyCount > 0 && (
                <circle
                  cx="95"
                  cy="95"
                  r={radius}
                  fill="none"
                  stroke="url(#gradReady)"
                  strokeWidth={hoveredSlice === 'ready' ? 28 : 24}
                  strokeDasharray={`${slice2Len} ${circumference}`}
                  strokeDashoffset={offset2}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredSlice('ready')}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
              )}

              {/* Segment 1: Learned Already (Completed) */}
              {completedCount > 0 && (
                <circle
                  cx="95"
                  cy="95"
                  r={radius}
                  fill="none"
                  stroke="url(#gradCompleted)"
                  strokeWidth={hoveredSlice === 'learned' ? 28 : 24}
                  strokeDasharray={`${slice1Len} ${circumference}`}
                  strokeDashoffset={offset1}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredSlice('learned')}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
              )}
            </svg>

            {/* Donut Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-3xl font-black font-display text-neutral-900 leading-none">
                {completedPct}%
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 mt-1">
                Mastered
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                {completedCount}/{total}
              </span>
            </div>
          </div>

          {/* Interactive Legend beside Pie Chart */}
          <div className="space-y-2.5 text-xs">
            {/* Learned Slice */}
            <div
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                hoveredSlice === 'learned'
                  ? 'border-emerald-400 bg-emerald-50/80 shadow-xs'
                  : 'border-transparent hover:bg-white/80'
              }`}
              onMouseEnter={() => setHoveredSlice('learned')}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-emerald-500 shadow-2xs shrink-0" />
                <span className="font-extrabold text-neutral-900">Learned Already</span>
              </div>
              <div className="text-[11px] text-neutral-500 pl-5 mt-0.5 font-mono">
                {completedCount} competencies ({completedPct}%)
              </div>
            </div>

            {/* Ready to Learn Slice */}
            <div
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                hoveredSlice === 'ready'
                  ? 'border-[#FF5C38] bg-[#FFF2ED] shadow-xs'
                  : 'border-transparent hover:bg-white/80'
              }`}
              onMouseEnter={() => setHoveredSlice('ready')}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-[#FF5C38] shadow-2xs shrink-0" />
                <span className="font-extrabold text-neutral-900">Ready to Learn Next</span>
              </div>
              <div className="text-[11px] text-neutral-500 pl-5 mt-0.5 font-mono">
                {readyCount} unlocked ({readyPct}%)
              </div>
            </div>

            {/* Locked Slice */}
            <div
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                hoveredSlice === 'locked'
                  ? 'border-purple-400 bg-purple-50/80 shadow-xs'
                  : 'border-transparent hover:bg-white/80'
              }`}
              onMouseEnter={() => setHoveredSlice('locked')}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-[#C4B5FD] shadow-2xs shrink-0" />
                <span className="font-extrabold text-neutral-700">Upcoming Milestones</span>
              </div>
              <div className="text-[11px] text-neutral-500 pl-5 mt-0.5 font-mono">
                {lockedCount} queued ({lockedPct}%)
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Highlights & Callout */}
        <div className="lg:col-span-7 space-y-4 lg:border-l lg:border-neutral-200 lg:pl-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs">
              <div className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">
                Skills Conquered
              </div>
              <div className="text-2xl font-black font-display text-neutral-900 mt-0.5">
                {completedCount}
              </div>
              <div className="text-[11px] text-neutral-500 mt-0.5 font-medium">
                {completedPct}% of curriculum
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs">
              <div className="text-[10px] font-black uppercase text-[#FF5C38] tracking-wider">
                Left to Learn
              </div>
              <div className="text-2xl font-black font-display text-neutral-900 mt-0.5">
                {remainingCount}
              </div>
              <div className="text-[11px] text-neutral-500 mt-0.5 font-medium">
                {100 - completedPct}% remaining
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs">
              <div className="text-[10px] font-black uppercase text-amber-700 tracking-wider">
                XP Available
              </div>
              <div className="text-2xl font-black font-display text-amber-600 mt-0.5">
                +{remainingCount * 50}
              </div>
              <div className="text-[11px] text-neutral-500 mt-0.5 font-medium">
                Upon 100% completion
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 text-xs text-neutral-600 space-y-1.5 leading-relaxed font-medium">
            <div className="flex items-center gap-1.5 font-bold text-neutral-900">
              <TrendingUp className="w-4 h-4 text-[#FF5C38]" />
              <span>Track Completion Summary:</span>
            </div>
            <p>
              {completedCount === total ? (
                <span className="text-emerald-700 font-bold">
                  🎉 Outstanding! You have mastered all {total} competencies in {activeSkill.title}. Ready for project certifications!
                </span>
              ) : completedCount > 0 ? (
                <>
                  You have mastered <strong className="text-neutral-900">{completedCount} skills</strong> so far.
                  Conquer the remaining <strong className="text-[#FF5C38]">{remainingCount} competencies</strong> below to reach full mastery.
                </>
              ) : (
                <>
                  You haven&apos;t started this track yet. All <strong className="text-neutral-900">{total} competencies</strong> are cited below. Start with Level 1 to begin leveling up!
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Detailed Side-by-Side Skill Citations (Learned vs Left to Learn) */}
      <div className="space-y-4">
        {/* View Toggle Tabs */}
        <div className="flex items-center justify-between gap-3 border-b border-neutral-200 pb-3 flex-wrap">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-500 font-display">
              Competencies Citing:
            </h3>
          </div>

          <div className="flex items-center gap-1.5 bg-[#FAF9FD] p-1 rounded-xl border border-neutral-200">
            <button
              type="button"
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'both'
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Side-by-Side
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('learned')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'learned'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Learned Already ({completedCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('remaining')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'remaining'
                  ? 'bg-[#FF5C38] text-white shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Left to Learn ({remainingCount})
            </button>
          </div>
        </div>

        {/* The Two Citation Columns */}
        <div
          className={`grid gap-6 ${
            activeTab === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {/* COLUMN A: Skills Learned Already */}
          {(activeTab === 'both' || activeTab === 'learned') && (
            <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/30 p-5 sm:p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-xs">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-black font-display text-sm sm:text-base text-neutral-900">
                        Skills Learned Already
                      </h4>
                      <div className="text-[11px] text-emerald-800 font-medium">
                        {completedCount} competencies mastered
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {completedPct}% of track
                  </span>
                </div>

                {/* List of Learned Skills */}
                <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                  {learnedSkills.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-white border border-emerald-200 text-center space-y-2">
                      <BookOpen className="w-8 h-8 text-neutral-300 mx-auto" />
                      <div className="text-xs font-bold text-neutral-700">
                        No skills mastered yet in this track
                      </div>
                      <p className="text-[11px] text-neutral-500 max-w-xs mx-auto">
                        Complete your first interactive challenge to start building your verified skills record!
                      </p>
                    </div>
                  ) : (
                    learnedSkills.map((item) => (
                      <div
                        key={item.sublevel.id}
                        className="p-3.5 rounded-2xl bg-white border border-emerald-200/90 shadow-2xs hover:border-emerald-400 transition-all flex items-center justify-between gap-3 group"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                              ✓
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-neutral-900 truncate">
                              {item.sublevel.title}
                            </span>
                          </div>

                          <div className="text-[11px] text-neutral-500 font-mono mt-0.5 pl-7">
                            {item.world.title.split(':')[0]} • {item.levelTitle}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center text-amber-500">
                            {[...Array(3)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400" />
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => onLaunchSkill(item.sublevel.id)}
                            className="text-xs font-bold text-neutral-500 hover:text-emerald-700 px-2 py-1 cursor-pointer transition-colors"
                          >
                            Review
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {completedCount > 0 && (
                <div className="pt-3 border-t border-emerald-200 text-[11px] text-emerald-800 font-medium flex items-center justify-between">
                  <span>Certified on your public Skill Passport</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              )}
            </div>
          )}

          {/* COLUMN B: Skills Left to Learn */}
          {(activeTab === 'both' || activeTab === 'remaining') && (
            <div className="rounded-3xl border-2 border-[#FF5C38]/30 bg-[#FFF9F7] p-5 sm:p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#FF5C38]/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#FF5C38] text-white flex items-center justify-center font-bold shadow-xs">
                      <Zap className="w-4 h-4 fill-white" />
                    </div>
                    <div>
                      <h4 className="font-black font-display text-sm sm:text-base text-neutral-900">
                        Skills Left to Learn
                      </h4>
                      <div className="text-[11px] text-neutral-600 font-medium">
                        {remainingCount} competencies required to complete track
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FFF2ED] text-[#FF5C38] border border-[#FFD8CC]">
                    {100 - completedPct}% remaining
                  </span>
                </div>

                {/* List of Remaining Skills */}
                <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                  {remainingSkills.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-white border border-neutral-200 text-center space-y-2">
                      <Sparkles className="w-8 h-8 text-amber-500 fill-amber-400 mx-auto" />
                      <div className="text-xs font-bold text-neutral-900">
                        All competencies conquered!
                      </div>
                      <p className="text-[11px] text-neutral-500 max-w-xs mx-auto">
                        You have finished every level in {activeSkill.title}. Ready to build showcase projects in the Project Zone!
                      </p>
                    </div>
                  ) : (
                    remainingSkills.map((item) => (
                      <div
                        key={item.sublevel.id}
                        className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          item.isUnlocked
                            ? 'bg-white border-2 border-[#FF5C38]/30 hover:border-[#FF5C38] shadow-2xs'
                            : 'bg-white/60 border-neutral-200 opacity-75'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            {item.isUnlocked ? (
                              <span className="w-5 h-5 rounded-full bg-[#FFF2ED] text-[#FF5C38] flex items-center justify-center text-[10px] font-black shrink-0">
                                ▶
                              </span>
                            ) : (
                              <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center text-[10px] shrink-0">
                                <Lock className="w-3 h-3" />
                              </span>
                            )}
                            <span className="font-bold text-xs sm:text-sm text-neutral-900 truncate">
                              {item.sublevel.title}
                            </span>
                          </div>

                          <p className="text-[11px] text-neutral-600 line-clamp-1 mt-0.5 pl-7">
                            {item.sublevel.summary}
                          </p>

                          <div className="text-[10px] text-neutral-400 font-mono pl-7 mt-0.5">
                            {item.world.title.split(':')[0]} • {item.levelTitle}
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#FFF8E7] text-amber-800 border border-[#FFE194]">
                            +{item.sublevel.activities[0]?.xpReward || 50} XP
                          </span>

                          {item.isUnlocked ? (
                            <button
                              type="button"
                              onClick={() => onLaunchSkill(item.sublevel.id)}
                              className="px-3 py-1 rounded-xl bg-[#FF5C38] hover:bg-[#E84D2B] text-white font-black text-xs flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                            >
                              <span>Learn</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <span className="text-[10px] font-mono font-bold text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-xl">
                              Locked
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {remainingCount > 0 && (
                <div className="pt-3 border-t border-[#FF5C38]/20 text-[11px] text-neutral-600 font-medium flex items-center justify-between">
                  <span>Conquer next unlocked level to progress</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF5C38]" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
