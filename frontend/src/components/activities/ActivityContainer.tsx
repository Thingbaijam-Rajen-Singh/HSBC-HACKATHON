import React, { useState } from 'react';
import { ActivityDefinition, Sublevel } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { InteractiveLearning } from './InteractiveLearning';
import { QuizActivity } from './QuizActivity';
import { FillCodeActivity } from './FillCodeActivity';
import { CodePuzzleActivity } from './CodePuzzleActivity';
import { BugHuntActivity } from './BugHuntActivity';
import { BuildChallengeActivity } from './BuildChallengeActivity';
import { PredictOutputActivity } from './PredictOutputActivity';
import { BossMissionActivity } from './BossMissionActivity';
import { Sparkles, Star, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  activity: ActivityDefinition;
  sublevel: Sublevel;
  onClose: () => void;
  onNext?: () => void;
}

export const ActivityContainer: React.FC<Props> = ({
  activity,
  sublevel,
  onClose,
  onNext,
}) => {
  const { recordSublevelComplete } = useProgress();
  const [completedNow, setCompletedNow] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const handleSuccess = async () => {
    setCompletedNow(true);
    await recordSublevelComplete(
      sublevel.id,
      sublevel.worldId,
      sublevel.levelId,
      3,
      activity.xpReward
    );
  };

  const activityTypeLabels: Record<string, { label: string; color: string }> = {
    interactive: { label: 'Interactive Learning', color: 'bg-[#EFEAFF] text-[#5534DA] border-[#DDD1FE]' },
    quiz: { label: 'Knowledge Quiz', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    fill_code: { label: 'Fill in the Code', color: 'bg-purple-50 text-purple-800 border-purple-200' },
    code_puzzle: { label: 'Code Puzzle', color: 'bg-violet-50 text-violet-800 border-violet-200' },
    bug_hunt: { label: 'Bug Hunt Mission', color: 'bg-[#FFF2ED] text-[#FF5C38] border-[#FFD9CC]' },
    build_challenge: { label: 'Build from Scratch', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    predict_output: { label: 'Predict the Output', color: 'bg-[#FFF8E7] text-amber-900 border-[#FFE194]' },
    boss_mission: { label: 'Level Challenge & Boss Mission', color: 'bg-rose-50 text-rose-800 border-rose-200' },
  };

  const typeConfig = activityTypeLabels[activity.type] || {
    label: activity.type,
    color: 'bg-neutral-100 text-neutral-800 border-neutral-200',
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className={`px-3 py-0.5 rounded-full text-xs font-bold border ${typeConfig.color}`}
            >
              {typeConfig.label}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-900 bg-[#FFF8E7] border border-[#FFE194] px-3 py-0.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              +{activity.xpReward} XP
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black font-display text-neutral-900">{activity.title}</h2>
          <p className="text-xs md:text-sm text-neutral-600 font-medium">{activity.description}</p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          {activity.hints && activity.hints.length > 0 && (
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border border-neutral-200 hover:border-neutral-300 bg-[#FAF9FD] text-neutral-700 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              {showHints ? 'Hide Hints' : 'View Hints'}
            </button>
          )}
        </div>
      </div>

      {/* Hints dropdown */}
      {showHints && activity.hints && (
        <div className="p-4 bg-[#FFF8E7] border border-[#FFE194] rounded-2xl text-xs space-y-2">
          <div className="font-bold text-amber-950 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            Instructor Guidance & Hints:
          </div>
          <ul className="list-disc list-inside space-y-1 text-amber-900 font-medium">
            {activity.hints.map((hint, idx) => (
              <li key={idx}>{hint}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Activity Content Body */}
      <div className="flex-1 overflow-y-auto pr-1">
        {activity.type === 'interactive' && activity.interactiveData && (
          <InteractiveLearning
            data={activity.interactiveData}
            onSuccess={handleSuccess}
          />
        )}

        {activity.type === 'quiz' && activity.quizData && (
          <QuizActivity
            questions={activity.quizData}
            onSuccess={handleSuccess}
          />
        )}

        {activity.type === 'fill_code' && activity.fillCodeData && (
          <FillCodeActivity
            data={activity.fillCodeData}
            onSuccess={handleSuccess}
          />
        )}

        {activity.type === 'code_puzzle' && activity.codePuzzleData && (
          <CodePuzzleActivity
            data={activity.codePuzzleData}
            onSuccess={handleSuccess}
          />
        )}

        {activity.type === 'bug_hunt' && activity.bugHuntData && (
          <BugHuntActivity
            data={activity.bugHuntData}
            onSuccess={handleSuccess}
          />
        )}

        {activity.type === 'build_challenge' && activity.buildChallengeData && (
          <BuildChallengeActivity
            data={activity.buildChallengeData}
            onSuccess={handleSuccess}
          />
        )}

        {activity.type === 'predict_output' && activity.predictOutputData && (
          <PredictOutputActivity
            data={activity.predictOutputData}
            onSuccess={handleSuccess}
          />
        )}

        {activity.type === 'boss_mission' && activity.bossMissionData && (
          <BossMissionActivity
            data={activity.bossMissionData}
            onSuccess={handleSuccess}
          />
        )}
      </div>

      {/* Success Banner if activity is passed */}
      {completedNow && (
        <div className="p-4 sm:p-5 bg-emerald-50 border-2 border-emerald-300 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fade-in">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="font-black text-emerald-950 text-base md:text-lg flex items-center gap-2 font-display">
                Sublevel Mastered!
                <span className="flex items-center text-amber-500 text-xs">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </span>
              </div>
              <div className="text-emerald-800 text-xs font-semibold">
                Earned +{activity.xpReward} XP. Progress recorded & synced to your Skill Passport!
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-bold transition-colors cursor-pointer"
            >
              Return to Map
            </button>
            {onNext && (
              <button
                onClick={onNext}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-2xl bg-[#FF5C38] hover:bg-[#E84D2B] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#FF5C38]/25 transition-all cursor-pointer"
              >
                <span>Next Sublevel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
