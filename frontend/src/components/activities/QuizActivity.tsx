import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react';

interface Props {
  questions: QuizQuestion[];
  onSuccess: () => void;
}

export const QuizActivity: React.FC<Props> = ({ questions, onSuccess }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const toggleOption = (qId: string, optIndex: number, type: 'single' | 'multiple' | 'true_false') => {
    if (submitted) return;

    if (type === 'multiple') {
      const current = selectedAnswers[qId] || [];
      const updated = current.includes(optIndex)
        ? current.filter((i) => i !== optIndex)
        : [...current, optIndex];
      setSelectedAnswers({ ...selectedAnswers, [qId]: updated });
    } else {
      setSelectedAnswers({ ...selectedAnswers, [qId]: [optIndex] });
    }
  };

  const handleEvaluate = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      const userChoices = (selectedAnswers[q.id] || []).sort();
      const expected = [...q.correctAnswerIndices].sort();
      const isMatch =
        userChoices.length === expected.length &&
        userChoices.every((val, idx) => val === expected[idx]);
      if (isMatch) correctCount++;
    });

    setScore(correctCount);
    setSubmitted(true);

    if (correctCount === questions.length) {
      onSuccess();
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  const isAllAnswered = questions.every(
    (q) => selectedAnswers[q.id] && selectedAnswers[q.id].length > 0
  );

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const chosen = selectedAnswers[q.id] || [];
          const isCorrectQuestion =
            submitted &&
            chosen.length === q.correctAnswerIndices.length &&
            chosen.every((val, idx) => val === q.correctAnswerIndices.sort()[idx]);

          return (
            <div
              key={q.id}
              className={`p-6 rounded-3xl border-2 transition-all ${
                submitted
                  ? isCorrectQuestion
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-rose-50/70 border-rose-300'
                  : 'bg-[#FAF9FD] border-neutral-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="text-sm md:text-base font-bold text-neutral-900 leading-snug font-display">
                  <span className="text-[#FF5C38] font-bold mr-1.5">Q{qIndex + 1}.</span>
                  {q.question}
                </h4>
                {submitted && (
                  <span className="shrink-0">
                    {isCorrectQuestion ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500" />
                    )}
                  </span>
                )}
              </div>

              <div className="text-xs text-neutral-500 mb-4 flex items-center gap-1.5 font-medium">
                <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
                {q.type === 'multiple'
                  ? 'Select all options that apply'
                  : q.type === 'true_false'
                  ? 'Select True or False'
                  : 'Select one option'}
              </div>

              <div className="space-y-2.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = chosen.includes(optIdx);
                  const isAnswerOption = q.correctAnswerIndices.includes(optIdx);

                  let optionStyle =
                    'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800';
                  if (isSelected) {
                    optionStyle = 'border-2 border-[#FF5C38] bg-[#FFF2ED] text-[#FF5C38] font-bold';
                  }
                  if (submitted) {
                    if (isAnswerOption) {
                      optionStyle = 'border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                    } else if (isSelected && !isAnswerOption) {
                      optionStyle = 'border-2 border-rose-500 bg-rose-50 text-rose-800 font-bold';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => toggleOption(q.id, optIdx, q.type)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs md:text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-${
                            q.type === 'multiple' ? 'md' : 'full'
                          } border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#FF5C38] bg-[#FF5C38] text-white'
                              : 'border-neutral-300'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                        </div>
                        <span>{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-4 pt-3 border-t border-neutral-200 text-xs text-neutral-700 bg-white p-3.5 rounded-2xl">
                  <span className="font-bold text-neutral-900">Explanation: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="text-sm font-bold font-display">
          {score !== null && (
            <span
              className={
                score === questions.length ? 'text-emerald-700' : 'text-amber-800'
              }
            >
              Score: {score} / {questions.length} correct
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {submitted && score !== questions.length && (
            <button
              onClick={handleRetry}
              className="px-5 py-2.5 rounded-2xl border border-neutral-200 hover:bg-neutral-100 text-neutral-800 text-sm font-bold transition-colors cursor-pointer"
            >
              Try Again
            </button>
          )}

          {!submitted ? (
            <button
              onClick={handleEvaluate}
              disabled={!isAllAnswered}
              className={`w-full sm:w-auto px-7 py-3 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                isAllAnswered
                  ? 'bg-[#FF5C38] hover:bg-[#E84D2B] shadow-[#FF5C38]/25 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed shadow-none'
              }`}
            >
              <span>Submit Answers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
