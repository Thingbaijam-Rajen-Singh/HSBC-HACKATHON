import React, { useState } from 'react';
import { InteractiveActivityData } from '../../types';
import { Play, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  data: InteractiveActivityData;
  onSuccess: () => void;
}

export const InteractiveLearning: React.FC<Props> = ({ data, onSuccess }) => {
  const [code, setCode] = useState(data.initialCode);
  const [feedback, setFeedback] = useState<{ isSuccess: boolean; message: string } | null>(null);

  const handleRunAndValidate = () => {
    let passed = false;
    if (data.validationRegex) {
      const reg = new RegExp(data.validationRegex, 'i');
      passed = reg.test(code);
    } else {
      passed = code.trim().length > 20 && code !== data.initialCode;
    }

    if (passed) {
      setFeedback({
        isSuccess: true,
        message: 'Excellent! Your code changes satisfy the target requirements and the preview rendered successfully.',
      });
      onSuccess();
    } else {
      setFeedback({
        isSuccess: false,
        message: data.solutionHint || 'Requirements not yet met. Check the instructions and try adjusting the code.',
      });
    }
  };

  const handleReset = () => {
    setCode(data.initialCode);
    setFeedback(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-950/40 border border-blue-800/60 rounded-xl p-4 text-blue-200 text-sm">
        <span className="font-semibold text-blue-300">Goal: </span>
        {data.targetInstruction}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor */}
        <div className="flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-950 border-b border-neutral-800 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
              Live Editor ({data.language.toUpperCase()})
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Code
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={12}
            className="w-full p-4 bg-neutral-900 text-neutral-200 font-mono text-xs md:text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
            placeholder="Write code here..."
            spellCheck={false}
          />
        </div>

        {/* Live Preview Sandbox */}
        <div className="flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-950 border-b border-neutral-800 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              Sandboxed Browser Preview
            </span>
          </div>
          <div className="flex-1 min-h-[220px] bg-white rounded-b-xl overflow-hidden">
            <iframe
              title="Interactive Live Preview"
              sandbox="allow-scripts"
              srcDoc={code}
              className="w-full h-full min-h-[220px] border-0"
            />
          </div>
        </div>
      </div>

      {/* Action and Feedback */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex-1 w-full">
          {feedback && (
            <div
              className={`flex items-center gap-2 p-3 rounded-xl text-sm ${
                feedback.isSuccess
                  ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                  : 'bg-amber-950/60 border border-amber-800 text-amber-300'
              }`}
            >
              {feedback.isSuccess ? (
                <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}
        </div>
        <button
          onClick={handleRunAndValidate}
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          Verify & Run Code
        </button>
      </div>
    </div>
  );
};
