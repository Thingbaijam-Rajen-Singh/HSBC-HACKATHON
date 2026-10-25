import React, { useState } from 'react';
import { CodePuzzleActivityData, CodePuzzlePiece } from '../../types';
import { ArrowUp, ArrowDown, CheckCircle, AlertCircle, RotateCcw, Puzzle } from 'lucide-react';

interface Props {
  data: CodePuzzleActivityData;
  onSuccess: () => void;
}

export const CodePuzzleActivity: React.FC<Props> = ({ data, onSuccess }) => {
  // Scramble pieces initially
  const [pieces, setPieces] = useState<CodePuzzlePiece[]>(() => {
    return [...data.pieces].sort(() => Math.random() - 0.5);
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const movePiece = (index: number, direction: 'up' | 'down') => {
    if (submitted && isSuccess) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pieces.length) return;

    const updated = [...pieces];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setPieces(updated);
    if (submitted) setSubmitted(false);
  };

  const handleVerify = () => {
    const currentOrder = pieces.map((p) => p.id);
    const isMatch =
      currentOrder.length === data.correctOrder.length &&
      currentOrder.every((id, idx) => id === data.correctOrder[idx]);

    setSubmitted(true);
    setIsSuccess(isMatch);

    if (isMatch) {
      onSuccess();
    }
  };

  const handleReset = () => {
    setPieces([...data.pieces].sort(() => Math.random() - 0.5));
    setSubmitted(false);
    setIsSuccess(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <span className="flex items-center gap-1.5 font-medium text-neutral-300">
          <Puzzle className="w-4 h-4 text-violet-400" />
          {data.instructions}
        </span>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-neutral-400 hover:text-neutral-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Shuffle
        </button>
      </div>

      <div className="space-y-2 bg-neutral-950/60 p-4 rounded-xl border border-neutral-800">
        {pieces.map((piece, index) => {
          const isAtCorrectPosition =
            submitted && piece.id === data.correctOrder[index];

          return (
            <div
              key={piece.id}
              className={`flex items-center justify-between p-3 rounded-lg border font-mono text-xs md:text-sm transition-all ${
                submitted
                  ? isAtCorrectPosition
                    ? 'border-emerald-600 bg-emerald-950/40 text-emerald-200'
                    : 'border-red-600 bg-red-950/30 text-red-300'
                  : 'border-neutral-800 bg-neutral-900 text-neutral-200 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center gap-3 overflow-x-auto">
                <span className="text-neutral-500 text-xs w-4 shrink-0 font-sans">
                  {index + 1}.
                </span>
                <span className="whitespace-pre">{piece.text}</span>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-3">
                <button
                  type="button"
                  onClick={() => movePiece(index, 'up')}
                  disabled={index === 0 || (submitted && isSuccess)}
                  className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 disabled:opacity-20 text-neutral-300 transition-colors cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => movePiece(index, 'down')}
                  disabled={index === pieces.length - 1 || (submitted && isSuccess)}
                  className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 disabled:opacity-20 text-neutral-300 transition-colors cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {submitted && (
        <div
          className={`p-4 rounded-xl text-xs md:text-sm flex items-start gap-3 ${
            isSuccess
              ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
              : 'bg-amber-950/60 border border-amber-800 text-amber-300'
          }`}
        >
          {isSuccess ? (
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
          )}
          <div>
            <div className="font-semibold">
              {isSuccess
                ? 'Great logic! Code puzzle solved in the exact structural order.'
                : 'Not quite in the right order yet. Observe HTML nesting tags carefully.'}
            </div>
            {isSuccess && (
              <div className="mt-1 text-emerald-400/90">{data.explanation}</div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-2">
        <button
          onClick={handleVerify}
          className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-violet-600/20 transition-all cursor-pointer"
        >
          <CheckCircle className="w-4 h-4" />
          Verify Code Sequence
        </button>
      </div>
    </div>
  );
};
