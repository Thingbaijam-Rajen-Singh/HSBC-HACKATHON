import React, { useState } from 'react';
import { BuildChallengeActivityData } from '../../types';
import { Hammer, CheckCircle, AlertCircle, RotateCcw, Check } from 'lucide-react';

interface Props {
  data: BuildChallengeActivityData;
  onSuccess: () => void;
}

export const BuildChallengeActivity: React.FC<Props> = ({ data, onSuccess }) => {
  const [code, setCode] = useState(data.starterCode);
  const [tested, setTested] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passedRequirements, setPassedRequirements] = useState<boolean[]>([]);

  const handleTestChallenge = () => {
    const checks = data.testAssertions.map((assertionStr) => {
      try {
        const fn = new Function('code', `return ${assertionStr};`);
        return Boolean(fn(code));
      } catch {
        return false;
      }
    });

    const allPassed = checks.length > 0 && checks.every(Boolean);
    setPassedRequirements(checks);
    setTested(true);
    setIsSuccess(allPassed);

    if (allPassed) {
      onSuccess();
    }
  };

  const handleReset = () => {
    setCode(data.starterCode);
    setTested(false);
    setIsSuccess(false);
    setPassedRequirements([]);
  };

  return (
    <div className="space-y-4">
      {/* Challenge Brief */}
      <div className="bg-indigo-950/30 border border-indigo-900/60 rounded-xl p-4">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-1">
          <Hammer className="w-4 h-4" />
          <span>Challenge Prompt</span>
        </div>
        <p className="text-neutral-200 text-xs md:text-sm">{data.challengePrompt}</p>

        {/* Requirements Checklist */}
        <div className="mt-3 space-y-1.5 pt-3 border-t border-indigo-900/40">
          <div className="text-xs font-semibold text-indigo-300">Requirements:</div>
          {data.requirements.map((req, idx) => {
            const hasChecked = tested && passedRequirements[idx];
            return (
              <div
                key={idx}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  tested
                    ? hasChecked
                      ? 'text-emerald-400 font-medium'
                      : 'text-neutral-400'
                    : 'text-neutral-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                    tested
                      ? hasChecked
                        ? 'bg-emerald-500 border-emerald-400 text-black'
                        : 'border-neutral-600'
                      : 'border-neutral-600'
                  }`}
                >
                  {hasChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span>{req}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editor & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-neutral-950 border-b border-neutral-800 text-xs font-mono text-neutral-400">
            <span>Editor (Write Implementation)</span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 hover:text-neutral-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={12}
            className="w-full p-4 bg-neutral-900 text-neutral-200 font-mono text-xs md:text-sm resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
            placeholder="Write code here..."
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-neutral-950 border-b border-neutral-800 text-xs font-mono text-neutral-400">
            <span>Live Result Sandbox</span>
          </div>
          <div className="flex-1 min-h-[220px] bg-white rounded-b-xl overflow-hidden">
            <iframe
              title="Build Challenge Sandbox"
              sandbox="allow-scripts"
              srcDoc={code}
              className="w-full h-full min-h-[220px] border-0"
            />
          </div>
        </div>
      </div>

      {/* Action & Result */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex-1">
          {tested && (
            <div
              className={`p-3 rounded-xl text-xs md:text-sm flex items-center gap-2 ${
                isSuccess
                  ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                  : 'bg-amber-950/60 border border-amber-800 text-amber-300'
              }`}
            >
              {isSuccess ? (
                <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />
              )}
              <span>
                {isSuccess
                  ? 'Challenge Complete! All requirements passed successfully.'
                  : 'Check the requirements checklist above to see what is missing.'}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={handleTestChallenge}
          className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Hammer className="w-4 h-4" />
          Validate Implementation
        </button>
      </div>
    </div>
  );
};
