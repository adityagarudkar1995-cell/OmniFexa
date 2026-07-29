'use client';

import React, { useState, useMemo } from 'react';
import { convertCase } from '@/lib/text-tools/case-conversion';
import { CASE_CONVERSION_OPTIONS, type CaseConversionMode } from '@/lib/text-tools/types';
import { LiveResultWorkspaceShell } from '@/components/result-workspace/live/LiveResultWorkspaceShell';
import Button from '@/components/ui/Button';

export function CaseConverterTool() {
  const [inputText, setInputText] = useState('');
  const [selectedMode, setSelectedMode] = useState<CaseConversionMode>('uppercase');
  const [feedback, setFeedback] = useState<string | null>(null);

  const outputText = useMemo(
    () => convertCase(inputText, selectedMode),
    [inputText, selectedMode]
  );

  const handleCopyOutput = async () => {
    if (!outputText) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(outputText);
        setFeedback('Converted output copied to clipboard!');
      } else {
        setFeedback('Clipboard access unavailable.');
      }
    } catch {
      setFeedback('Failed to copy output.');
    }

    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDownloadOutput = () => {
    if (!outputText) return;

    try {
      const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'omnifexa-case-converted.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setFeedback('Converted file downloaded!');
    } catch {
      setFeedback('Failed to download file.');
    }

    setTimeout(() => setFeedback(null), 3000);
  };

  const handleUseOutputAsInput = () => {
    if (!outputText) return;
    setInputText(outputText);
    setFeedback('Output loaded into input!');
    setTimeout(() => setFeedback(null), 2000);
  };

  const handleReset = () => {
    setInputText('');
    setSelectedMode('uppercase');
    setFeedback('Reset to default state.');
    setTimeout(() => setFeedback(null), 2000);
  };

  return (
    <LiveResultWorkspaceShell
      toolName="Case Converter"
      adapterName="Text Workspace Adapter"
      description="Convert text into 9 casing formats instantly in your browser."
    >
      <div className="space-y-6">
        {/* Conversion Mode Controls Grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-semibold text-text-primary text-sm">
              Conversion Casing Mode
            </label>
            <span className="text-xs text-text-tertiary">
              Identifier formats replace punctuation with separators.
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2">
            {CASE_CONVERSION_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedMode(opt.id)}
                aria-pressed={selectedMode === opt.id}
                className={`p-3 rounded-xl border text-left transition-all min-h-[44px] ${
                  selectedMode === opt.id
                    ? 'bg-primary-50 dark:bg-primary-950/40 border-primary-500 text-primary-700 dark:text-primary-300 shadow-sm'
                    : 'bg-surface-50 border-border-default text-text-secondary hover:bg-surface-100'
                }`}
              >
                <span className="block font-bold text-xs font-mono">{opt.label}</span>
                <span className="block text-[11px] text-text-tertiary mt-0.5 line-clamp-1">
                  {opt.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Input & Output Textareas Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input Textarea */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="case-input-textarea" className="font-semibold text-text-primary text-sm">
                Input Text
              </label>
              <button
                type="button"
                onClick={() => setInputText('')}
                disabled={!inputText}
                className="text-xs text-text-tertiary hover:text-text-primary disabled:opacity-50"
              >
                Clear Input
              </button>
            </div>
            <textarea
              id="case-input-textarea"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter or paste text here to convert casing format..."
              rows={8}
              className="w-full bg-surface-50 border border-border-default rounded-xl p-4 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all font-mono leading-relaxed"
            />
          </div>

          {/* Output Textarea */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="case-output-textarea" className="font-semibold text-text-primary text-sm">
                Converted Output ({CASE_CONVERSION_OPTIONS.find((o) => o.id === selectedMode)?.label})
              </label>
              {outputText && (
                <button
                  type="button"
                  onClick={handleUseOutputAsInput}
                  className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Use Output as Input
                </button>
              )}
            </div>
            <textarea
              id="case-output-textarea"
              value={outputText}
              readOnly
              placeholder="Converted text will appear here automatically..."
              rows={8}
              className="w-full bg-surface-100 dark:bg-surface-200/50 border border-border-default rounded-xl p-4 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none font-mono leading-relaxed cursor-text"
            />
          </div>
        </div>

        {/* Action Controls & Privacy Guarantee */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border-subtle">
          <div aria-live="polite" className="text-xs font-medium text-primary-600 dark:text-primary-400 min-h-[20px]">
            {feedback ? (
              <span>{feedback}</span>
            ) : (
              <span className="text-text-tertiary">Conversion happens locally in your browser.</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              disabled={!inputText && selectedMode === 'uppercase'}
              className="w-1/3 sm:w-auto text-xs"
            >
              Reset
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyOutput}
              disabled={!outputText}
              className="w-1/3 sm:w-auto text-xs"
            >
              Copy Output
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownloadOutput}
              disabled={!outputText}
              className="w-1/3 sm:w-auto text-xs"
            >
              Download TXT
            </Button>
          </div>
        </div>
      </div>
    </LiveResultWorkspaceShell>
  );
}
