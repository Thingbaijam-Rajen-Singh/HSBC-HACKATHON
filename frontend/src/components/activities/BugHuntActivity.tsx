import React, { useState } from 'react';
import { BugHuntActivityData } from '../../types';
import { Bug, CheckCircle, AlertTriangle, RotateCcw, Lightbulb } from 'lucide-react';

interface Props {
  data: BugHuntActivityData;
  onSuccess: () => void;
}

export const BugHuntActivity: React.FC<Props> = ({ data, onSuccess }) => {
  const [code, setCode] = useState(data.starterCode);
  const [feedback, setFeedback] = useState<{ isSuccess: boolean; message: string } | null>(null);
  const [showHintIndex, setShowHintIndex] = useState(0);

  const handleTestAndFix = () => {
    try {
      // Evaluate test function safely in browser context
      const testFn = new Function('code', `return (${data.testFunction})(code);`);
      const result = testFn(code);

      if (result === true) {
        setFeedback({
          isSuccess: true,
          message: 'Bug Exterminated! All test assertions and behaviors verified.',
        });
        onSuccess();
      } else {
        setFeedback({
          isSuccess: false,
          message: typeof result === 'string' ? result : 'Tests failed. Check hints and repair the remaining bugs.',
        });
      }
    } catch (err: any) {
      setFeedback({
        isSuccess: false,
        message: 'Syntax error or test failure: ' + (err?.message || 'Check code syntax'),
      });
    }
  };

  const handleReset = () => {
    setCode(data.starterCode);
    setFeedback(null);
  };

  return (
    <div className="space-y-4">
      {/* Bug Report Banner */}
      <div className="bg-red-950/30 border border-red-900/60 rounded-xl p-4 text-xs md:text-sm">
        <div className="flex items-center gap-2 text-red-400 font-semibold mb-1">
          <Bug className="w-4 h-4" />
          <span>Incident Report: Broken Behavior</span>
        </div>
        <p className="text-red-200/90">{data.brokenDescription}</p>
        <div className="mt-2 text-neutral-300 font-mono text-xs">
          <span className="text-emerald-400 font-semibold font-sans">Target Behavior: </span>
          {data.expectedBehavior}
        </div>
      </div>

      {/* Editor & Preview Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor */}
        <div className="flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-neutral-950 border-b border-neutral-800 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 text-red-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
              Workspace (Find & Fix Bugs)
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 hover:text-neutral-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Starter
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={12}
            className="w-full p-4 bg-neutral-900 text-neutral-200 font-mono text-xs md:text-sm resize-none focus:outline-none focus:ring-1 focus:ring-red-500 leading-relaxed"
            placeholder="Debug code here..."
            spellCheck={false}
          />
        </div>

        {/* Live Preview */}
        <div className="flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-neutral-950 border-b border-neutral-800 text-xs font-mono text-neutral-400">
            <span>Sandboxed Output</span>
          </div>
          <div className="flex-1 min-h-[220px] bg-white rounded-b-xl overflow-hidden">
            <iframe
              title="Bug Hunt Sandbox"
              sandbox="allow-scripts"
              srcDoc={code}
              className="w-full h-full min-h-[220px] border-0"
            />
          </div>
        </div>
      </div>

      {/* Hints toggle */}
      {data.hints && data.hints.length > 0 && (
        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-neutral-300">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <span className="text-amber-400 font-medium">Bug Hint: </span>
              {data.hints[showHintIndex]}
            </span>
          </div>
          {data.hints.length > 1 && (
            <button
              onClick={() => setShowHintIndex((prev) => (prev + 1) % data.hints.length)}
              className="text-neutral-400 hover:text-neutral-200 text-xs underline shrink-0 ml-2"
            >
              Next hint ({showHintIndex + 1}/{data.hints.length})
            </button>
          )}
        </div>
      )}

      {/* Feedback & Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex-1 w-full">
          {feedback && (
            <div
              className={`p-3 rounded-xl text-xs md:text-sm flex items-center gap-2 ${
                feedback.isSuccess
                  ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                  : 'bg-red-950/50 border border-red-900 text-red-300'
              }`}
            >
              {feedback.isSuccess ? (
                <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}
        </div>

        <button
          onClick={handleTestAndFix}
          className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition-all cursor-pointer"
        >
          <Bug className="w-4 h-4" />
          Test Bug Fix
        </button>
      </div>
    </div>
  );
};
