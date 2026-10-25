import React, { useState } from 'react';
import { FillCodeActivityData } from '../../types';
import { CheckCircle, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface Props {
  data: FillCodeActivityData;
  onSuccess: () => void;
}

export const FillCodeActivity: React.FC<Props> = ({ data, onSuccess }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleInputChange = (blankId: string, val: string) => {
    setAnswers({ ...answers, [blankId]: val });
    if (submitted) setSubmitted(false);
  };

  const handleCheck = () => {
    let allCorrect = true;
    const errors: string[] = [];

    data.blanks.forEach((blank) => {
      const userVal = (answers[blank.id] || '').trim();
      const expected = blank.correctAnswer.trim();
      const match = blank.caseSensitive
        ? userVal === expected
        : userVal.toLowerCase() === expected.toLowerCase();

      if (!match) {
        allCorrect = false;
        errors.push(`"${blank.id.replace('_', ' ')}" should be "${blank.correctAnswer}"`);
      }
    });

    setSubmitted(true);
    setIsSuccess(allCorrect);

    if (allCorrect) {
      setFeedback('Terrific! All code blanks filled with correct syntax.');
      onSuccess();
    } else {
      setFeedback(`Some entries need correction: ${errors.join('; ')}`);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setIsSuccess(false);
    setFeedback(null);
  };

  // Render snippet with interactive inputs where {{blank_x}} occurs
  const renderSnippetWithInputs = () => {
    const parts = data.codeSnippet.split(/({{[a-zA-Z0-9_]+}})/g);

    return parts.map((part, index) => {
      const match = part.match(/{{([a-zA-Z0-9_]+)}}/);
      if (match) {
        const blankId = match[1];
        const blankConfig = data.blanks.find((b) => b.id === blankId);
        const val = answers[blankId] || '';
        const isBlankCorrect =
          submitted &&
          blankConfig &&
          (blankConfig.caseSensitive
            ? val.trim() === blankConfig.correctAnswer.trim()
            : val.trim().toLowerCase() === blankConfig.correctAnswer.trim().toLowerCase());

        return (
          <span key={index} className="inline-block mx-1">
            <input
              type="text"
              value={val}
              onChange={(e) => handleInputChange(blankId, e.target.value)}
              placeholder={blankConfig?.placeholder || 'fill code'}
              className={`px-2.5 py-1 text-xs md:text-sm font-mono rounded-md border focus:outline-none transition-all ${
                submitted
                  ? isBlankCorrect
                    ? 'border-emerald-500 bg-emerald-950/50 text-emerald-300'
                    : 'border-red-500 bg-red-950/50 text-red-300'
                  : 'border-blue-500/70 bg-neutral-950 text-blue-300 focus:ring-1 focus:ring-blue-400'
              }`}
              style={{ width: `${Math.max(10, (blankConfig?.placeholder.length || 8) * 9)}px` }}
              disabled={submitted && isSuccess}
            />
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const allFilled = data.blanks.every((b) => (answers[b.id] || '').trim().length > 0);

  return (
    <div className="space-y-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-lg">
        <div className="px-4 py-2.5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
          <span>Complete the Code Snippet</span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 hover:text-neutral-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
        <div className="p-4 md:p-6 bg-neutral-900/90 font-mono text-xs md:text-sm text-neutral-200 leading-loose overflow-x-auto whitespace-pre-wrap">
          {renderSnippetWithInputs()}
        </div>
      </div>

      {feedback && (
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
            <div className="font-semibold">{feedback}</div>
            {isSuccess && (
              <div className="mt-1 text-emerald-400/90">{data.explanation}</div>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          onClick={handleCheck}
          disabled={!allFilled}
          className={`px-6 py-2.5 rounded-xl text-white font-medium text-sm flex items-center gap-2 transition-all cursor-pointer ${
            allFilled
              ? 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20'
              : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
          }`}
        >
          Check Code Answers
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
