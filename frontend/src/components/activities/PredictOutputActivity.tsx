import React, { useState } from 'react';
import { PredictOutputActivityData } from '../../types';
import { HelpCircle, CheckCircle, XCircle, Terminal, Play } from 'lucide-react';

interface Props {
  data: PredictOutputActivityData;
  onSuccess: () => void;
}

export const PredictOutputActivity: React.FC<Props> = ({ data, onSuccess }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  const handlePredict = () => {
    if (selectedOption === null) return;
    setHasRevealed(true);
    if (selectedOption === data.correctOptionIndex) {
      onSuccess();
    }
  };

  const isCorrect = selectedOption === data.correctOptionIndex;

  return (
    <div className="space-y-4">
      {/* Code Snippet */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="px-4 py-2 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            Execution Snippet (Analyze Without Running)
          </span>
          <span className="text-amber-500 font-medium">Predict the Console Output</span>
        </div>
        <pre className="p-4 md:p-6 bg-neutral-900 font-mono text-xs md:text-sm text-neutral-200 leading-relaxed overflow-x-auto whitespace-pre-wrap">
          {data.codeSnippet}
        </pre>
      </div>

      {/* Prediction Options */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
          Select Your Prediction:
        </div>
        {data.options.map((optionText, idx) => {
          const isSelected = selectedOption === idx;
          const isAnswer = idx === data.correctOptionIndex;

          let btnStyle = 'border-neutral-800 bg-neutral-900 hover:border-neutral-700 text-neutral-300';
          if (isSelected) {
            btnStyle = 'border-amber-500 bg-amber-950/40 text-amber-200 font-medium';
          }
          if (hasRevealed) {
            if (isAnswer) {
              btnStyle = 'border-emerald-600 bg-emerald-950/50 text-emerald-200 font-semibold';
            } else if (isSelected && !isAnswer) {
              btnStyle = 'border-red-600 bg-red-950/40 text-red-300';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={hasRevealed}
              onClick={() => setSelectedOption(idx)}
              className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm font-mono transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full border border-neutral-700 bg-neutral-950 flex items-center justify-center text-xs text-neutral-400">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{optionText}</span>
              </div>
              {hasRevealed && isAnswer && <CheckCircle className="w-4 h-4 text-emerald-400" />}
              {hasRevealed && isSelected && !isAnswer && <XCircle className="w-4 h-4 text-red-400" />}
            </button>
          );
        })}
      </div>

      {/* Post-execution Explanation & Terminal Simulation */}
      {hasRevealed && (
        <div className="space-y-3 pt-2">
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Actual Runtime Output:
            </div>
            <div className="font-mono text-sm text-neutral-100 bg-black/60 p-2.5 rounded-lg border border-neutral-800">
              {data.options[data.correctOptionIndex]}
            </div>
            <div className="mt-3 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/80 pt-2.5">
              <span className="font-semibold text-neutral-100">Step-by-Step Reason: </span>
              {data.executionExplanation}
            </div>
          </div>
        </div>
      )}

      {/* Action */}
      {!hasRevealed && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handlePredict}
            disabled={selectedOption === null}
            className={`px-6 py-2.5 rounded-xl text-white font-medium text-sm flex items-center gap-2 transition-all cursor-pointer ${
              selectedOption !== null
                ? 'bg-amber-600 hover:bg-amber-500 shadow-lg shadow-amber-600/20'
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            Lock In Prediction & Execute
          </button>
        </div>
      )}
    </div>
  );
};
