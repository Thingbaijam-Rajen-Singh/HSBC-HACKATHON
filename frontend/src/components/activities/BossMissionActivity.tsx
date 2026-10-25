import React, { useState } from 'react';
import { BossMissionActivityData } from '../../types';
import { ShieldAlert, Award, CheckCircle2, RotateCcw, Swords, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  data: BossMissionActivityData;
  onSuccess: () => void;
}

export const BossMissionActivity: React.FC<Props> = ({ data, onSuccess }) => {
  const [code, setCode] = useState(data.starterCode);
  const [bossHp, setBossHp] = useState(data.bossHealth);
  const [objectivesState, setObjectivesState] = useState<boolean[]>(
    data.objectives.map(() => false)
  );
  const [defeated, setDefeated] = useState(false);
  const [hasEvaluated, setHasEvaluated] = useState(false);

  const handleFightBoss = () => {
    setHasEvaluated(true);

    // Evaluate each objective against code
    const results = data.objectives.map((obj) => {
      if (obj.id === 'obj-1') {
        return /<button[^>]*id=["']boss-submit["'][^>]*>/i.test(code);
      }
      if (obj.id === 'obj-2') {
        return /color:\s*#10b981/i.test(code);
      }
      if (obj.id === 'obj-3') {
        return /e\.preventDefault\(\)/i.test(code) || /event\.preventDefault\(\)/i.test(code);
      }
      return true;
    });

    setObjectivesState(results);

    const completedCount = results.filter(Boolean).length;
    const remainingHpPercent = Math.max(
      0,
      Math.round(((data.objectives.length - completedCount) / data.objectives.length) * 100)
    );
    setBossHp(remainingHpPercent);

    if (completedCount === data.objectives.length) {
      setDefeated(true);
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#ef4444', '#f59e0b', '#10b981', '#6366f1'],
        });
      } catch {
        // Safe fallback
      }
      onSuccess();
    }
  };

  const handleReset = () => {
    setCode(data.starterCode);
    setBossHp(data.bossHealth);
    setObjectivesState(data.objectives.map(() => false));
    setDefeated(false);
    setHasEvaluated(false);
  };

  return (
    <div className="space-y-5">
      {/* Boss Health Bar & Stage Banner */}
      <div className="bg-gradient-to-r from-red-950/80 via-neutral-900 to-purple-950/80 border border-red-800/60 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400 shrink-0">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{data.bossName}</h3>
                <span className="px-2 py-0.5 rounded-full bg-red-600/30 border border-red-500/50 text-red-300 text-[10px] uppercase font-bold tracking-wider">
                  World Boss
                </span>
              </div>
              <p className="text-xs text-red-300/80">{data.bossTitle}</p>
            </div>
          </div>

          {/* Boss HP Gauge */}
          <div className="w-full sm:w-64 space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-red-400 flex items-center gap-1 font-bold">
                <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                BOSS HP:
              </span>
              <span className="text-white font-bold">{bossHp}%</span>
            </div>
            <div className="w-full h-3 bg-neutral-950 rounded-full border border-neutral-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ${
                  bossHp > 50
                    ? 'bg-red-500'
                    : bossHp > 20
                    ? 'bg-amber-500'
                    : bossHp > 0
                    ? 'bg-orange-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${bossHp}%` }}
              />
            </div>
          </div>
        </div>

        {/* Victory Celebration when defeated */}
        {defeated && (
          <div className="mt-4 p-4 bg-emerald-950/80 border border-emerald-500 rounded-xl flex items-center justify-between text-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <Award className="w-7 h-7 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold text-white text-base">VICTORY! Boss Defeated!</div>
                <div className="text-emerald-300 text-xs">
                  Unlocked Special Badge: <span className="text-amber-300 font-semibold">{data.badgeName}</span> (+150 XP)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Objectives Mission Checklist */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
          Boss Battle Objectives (Fulfill all 3 to defeat):
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {data.objectives.map((obj, idx) => {
            const isCompleted = objectivesState[idx];
            return (
              <div
                key={obj.id}
                className={`p-3 rounded-xl border text-xs transition-all flex flex-col justify-between ${
                  hasEvaluated
                    ? isCompleted
                      ? 'border-emerald-600 bg-emerald-950/30 text-emerald-200'
                      : 'border-red-800/80 bg-red-950/20 text-red-300'
                    : 'border-neutral-800 bg-neutral-950/60 text-neutral-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5 font-semibold">
                    <span>Objective {idx + 1}</span>
                    {hasEvaluated && isCompleted && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-neutral-200">{obj.description}</div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800/60 text-[11px] text-neutral-400">
                  Hint: {obj.checkHint}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Code Workspace & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-neutral-950 border-b border-neutral-800 text-xs font-mono text-neutral-400">
            <span className="text-red-400 font-semibold flex items-center gap-1.5">
              <Swords className="w-3.5 h-3.5" />
              Boss Arena Workspace
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 hover:text-neutral-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Code
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={13}
            className="w-full p-4 bg-neutral-900 text-neutral-200 font-mono text-xs md:text-sm resize-none focus:outline-none focus:ring-1 focus:ring-red-500 leading-relaxed"
            placeholder="Repair code to conquer the Boss..."
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-neutral-950 border-b border-neutral-800 text-xs font-mono text-neutral-400">
            <span>Terminal Preview</span>
          </div>
          <div className="flex-1 min-h-[240px] bg-white rounded-b-xl overflow-hidden">
            <iframe
              title="Boss Mission Preview"
              sandbox="allow-scripts"
              srcDoc={code}
              className="w-full h-full min-h-[240px] border-0"
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleFightBoss}
          disabled={defeated}
          className={`px-7 py-3 rounded-xl font-bold text-sm flex items-center gap-2.5 transition-all shadow-xl cursor-pointer ${
            defeated
              ? 'bg-emerald-600 text-white cursor-default'
              : 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-red-600/30'
          }`}
        >
          <Swords className="w-4 h-4" />
          {defeated ? 'Boss Defeated! (+150 XP)' : 'Launch Attack & Verify Code'}
        </button>
      </div>
    </div>
  );
};
