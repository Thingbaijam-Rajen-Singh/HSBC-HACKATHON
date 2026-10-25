import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { availableSkills } from '../data/skillsData';
import { SkillDefinition, RoadmapMode } from '../types';
import { RoadmapFlowchart } from './RoadmapFlowchart';
import { GitBranch, Compass, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  onNavigateToLevelUp: () => void;
  onNavigateToLearn: () => void;
}

export const RoadmapFlowchartView: React.FC<Props> = ({
  onNavigateToLevelUp,
  onNavigateToLearn,
}) => {
  const { userProfile, setActiveSkillAndRoadmap, setSelectedSkill: setSelectedSkillContext } = useAuth();

  const [selectedSkill, setSelectedSkill] = useState<SkillDefinition>(() => {
    return availableSkills.find((s) => s.id === userProfile?.selectedSkill) || availableSkills[0];
  });

  const [flowchartMode, setFlowchartMode] = useState<RoadmapMode>(() => {
    return (userProfile?.roadmapMode as RoadmapMode) || 'normal';
  });

  useEffect(() => {
    if (userProfile?.selectedSkill) {
      const matched = availableSkills.find((s) => s.id === userProfile.selectedSkill);
      if (matched) setSelectedSkill(matched);
    }
  }, [userProfile?.selectedSkill]);

  useEffect(() => {
    if (userProfile?.roadmapMode) {
      setFlowchartMode(userProfile.roadmapMode);
    }
  }, [userProfile?.roadmapMode]);

  const handleSelectSkill = async (skill: SkillDefinition) => {
    setSelectedSkill(skill);
    await setSelectedSkillContext(skill.id);
  };

  const handleActivateRoadmap = async (skillId: string, mode: RoadmapMode) => {
    await setActiveSkillAndRoadmap(skillId, mode);
    onNavigateToLevelUp();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFEAFF] text-[#5534DA] border border-[#DDD1FE] text-xs font-bold mb-3">
            <GitBranch className="w-3.5 h-3.5 text-[#5534DA]" />
            <span>Interactive Curriculum Diagram</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display text-neutral-900 tracking-tight">
            Roadmap <span className="text-[#FF5C38]">Flowchart</span>
          </h1>
          <p className="text-sm md:text-base text-neutral-600 mt-2 max-w-2xl leading-relaxed font-medium">
            Visual topic-by-topic learning paths tailored for every skill and roadmap type. Switch skills and roadmap modes to immediately see the flowchart adapt its stages, prerequisites, and milestone deliverables.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToLearn}
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-neutral-50 text-neutral-700 border-2 border-neutral-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Compass className="w-3.5 h-3.5 text-[#5534DA]" />
            <span>Browse Skill Catalog</span>
          </button>
          <button
            onClick={onNavigateToLevelUp}
            className="px-5 py-2.5 rounded-2xl bg-[#FF5C38] hover:bg-[#E84D2B] text-white text-xs font-bold transition-all shadow-md shadow-[#FF5C38]/25 flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Level-Up Adventure Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Flowchart Component */}
      <RoadmapFlowchart
        selectedSkill={selectedSkill}
        availableSkills={availableSkills}
        onSelectSkill={handleSelectSkill}
        activeMode={flowchartMode}
        onSelectMode={(mode) => setFlowchartMode(mode)}
        onActivateRoadmap={handleActivateRoadmap}
      />
    </div>
  );
};
