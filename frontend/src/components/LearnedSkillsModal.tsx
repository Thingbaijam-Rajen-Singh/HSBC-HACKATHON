import React, { useState, useEffect, useMemo } from 'react';
import { SkillDefinition, World, Sublevel } from '../types';
import { getCurriculumForSkill } from '../data/curriculumData';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import {
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  Check,
  Search,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  skill: SkillDefinition;
  onSkillsSaved?: (learnedSublevelIds: string[]) => void;
}

export const LearnedSkillsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  skill,
  onSkillsSaved,
}) => {
  const { progressMap, markSublevelsLearned } = useProgress();
  const { setSelectedSkill } = useAuth();

  const worlds: World[] = useMemo(() => getCurriculumForSkill(skill.id), [skill.id]);

  const allSublevels = useMemo(() => {
    const list: { sublevel: Sublevel; world: World; levelTitle: string }[] = [];
    worlds.forEach((w) => {
      w.levels.forEach((lvl) => {
        lvl.sublevels.forEach((sub) => {
          list.push({ sublevel: sub, world: w, levelTitle: lvl.title });
        });
      });
    });
    return list;
  }, [worlds]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const alreadyCompleted = allSublevels
        .map((item) => item.sublevel.id)
        .filter((id) => Boolean(progressMap[id]?.completed));
      setSelectedIds(alreadyCompleted);
      setSavedSuccess(false);
      setSearchQuery('');
    }
  }, [isOpen, skill.id, allSublevels, progressMap]);

  if (!isOpen) return null;

  const toggleSublevel = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(allSublevels.map((item) => item.sublevel.id));
  };

  const handleSelectNone = () => {
    setSelectedIds([]);
  };

  const handleConfirm = async (overrideIds?: string[]) => {
    const finalIds = overrideIds !== undefined ? overrideIds : selectedIds;
    setIsSaving(true);
    try {
      await setSelectedSkill(skill.id);
      await markSublevelsLearned(finalIds, skill.id);

      setSavedSuccess(true);
      if (onSkillsSaved) {
        onSkillsSaved(finalIds);
      }

      setTimeout(() => {
        setIsSaving(false);
        onClose();
      }, 700);
    } catch (err) {
      console.error('Error saving learned skills:', err);
      setIsSaving(false);
      onClose();
    }
  };

  const filteredSublevels = allSublevels.filter(
    (item) =>
      item.sublevel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sublevel.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.world.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const remainingCount = allSublevels.length - selectedIds.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white border-2 border-neutral-900/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 bg-[#FAF9FD] relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-3 py-0.5 rounded-full bg-[#EFEAFF] text-[#5534DA] border border-[#DDD1FE] text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Prior Knowledge Calibration
            </span>
            <span className="text-xs text-neutral-500 font-mono font-bold">
              Track: {skill.title}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-display text-neutral-900 tracking-tight">
            Which skills have you already learned?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed font-medium">
            Select any topics or competencies you already know in <strong className="text-neutral-900">{skill.title}</strong>. We will credit your starting XP, skip what you have mastered, and highlight the remaining required skills for your roadmap.
          </p>

          {/* Quick Selection & Search Toolbar */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSelectNone}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              >
                None (Start Fresh)
              </button>
              <button
                type="button"
                onClick={handleSelectAll}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              >
                Select All
              </button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-48 pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#FF5C38]"
              />
            </div>
          </div>
        </div>

        {/* Scrollable Curriculum Sublevels Checklist */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 divide-y divide-neutral-200">
          {worlds.map((world) => {
            const worldSublevels = filteredSublevels.filter(
              (item) => item.world.id === world.id
            );

            if (worldSublevels.length === 0) return null;

            const worldTotal = allSublevels.filter((item) => item.world.id === world.id).length;
            const worldLearned = allSublevels.filter(
              (item) => item.world.id === world.id && selectedIds.includes(item.sublevel.id)
            ).length;

            return (
              <div key={world.id} className="pt-4 first:pt-0 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#EFEAFF] text-[#5534DA] font-mono text-xs flex items-center justify-center font-bold">
                      {world.number}
                    </span>
                    <h3 className="text-sm font-black font-display text-neutral-900">{world.title}</h3>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 font-bold">
                    {worldLearned}/{worldTotal} Learned
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {worldSublevels.map(({ sublevel, levelTitle }) => {
                    const isChecked = selectedIds.includes(sublevel.id);
                    const xpVal = sublevel.activities?.[0]?.xpReward || 40;

                    return (
                      <div
                        key={sublevel.id}
                        onClick={() => toggleSublevel(sublevel.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isChecked
                            ? 'bg-[#EFEAFF]/50 border-2 border-[#5534DA] shadow-xs'
                            : 'bg-[#FAF9FD] border border-neutral-200 hover:border-neutral-300 hover:bg-white'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isChecked ? (
                            <div className="w-5 h-5 rounded-md bg-[#5534DA] text-white flex items-center justify-center shadow-xs">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-md border-2 border-neutral-300 bg-white hover:border-neutral-400 transition-colors" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-neutral-900 truncate">
                              {sublevel.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-neutral-700 border border-neutral-200 shrink-0 font-bold">
                              +{xpVal} XP
                            </span>
                          </div>

                          <div className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                            {sublevel.summary}
                          </div>

                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] text-neutral-400 font-mono">
                              {levelTitle}
                            </span>
                            {isChecked && (
                              <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
                                <CheckCircle2 className="w-3 h-3" />
                                Marked as Learned
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Summary & Action Bar */}
        <div className="p-4 sm:p-5 border-t border-neutral-200 bg-[#FAF9FD] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs">
            <div className="text-neutral-900 font-bold flex items-center gap-2">
              <span>{selectedIds.length} of {allSublevels.length} skills learned</span>
              <span className="text-neutral-400">•</span>
              <span className="text-[#FF5C38] font-bold">{remainingCount} remaining</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-0.5">
              {selectedIds.length > 0
                ? `You will begin directly at the first remaining required topic.`
                : `You will start from the introductory foundations.`}
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => handleConfirm([])}
              disabled={isSaving}
              className="px-4 py-2.5 rounded-2xl bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Start From Scratch
            </button>

            <button
              type="button"
              onClick={() => handleConfirm()}
              disabled={isSaving}
              className={`px-6 py-2.5 rounded-2xl text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer ${
                savedSuccess
                  ? 'bg-emerald-600 shadow-emerald-600/30'
                  : 'bg-[#FF5C38] hover:bg-[#E84D2B] shadow-[#FF5C38]/25'
              }`}
            >
              {isSaving ? (
                <span>Saving...</span>
              ) : savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Roadmap Updated!</span>
                </>
              ) : (
                <>
                  <span>Save ({selectedIds.length} Learned)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
