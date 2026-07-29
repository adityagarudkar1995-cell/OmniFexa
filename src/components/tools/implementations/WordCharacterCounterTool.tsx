'use client';

import React, { useState, useMemo } from 'react';
import { calculateTextMetrics } from '@/lib/text-tools/metrics';
import { LiveResultWorkspaceShell } from '@/components/result-workspace/live/LiveResultWorkspaceShell';
import Button from '@/components/ui/Button';

export function WordCharacterCounterTool() {
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const metrics = useMemo(() => calculateTextMetrics(text), [text]);

  const handleCopyText = async () => {
    if (!text) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setFeedback('Text copied to clipboard!');
      } else {
        setFeedback('Clipboard access unavailable.');
      }
    } catch {
      setFeedback('Failed to copy text.');
    }

    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDownloadText = () => {
    if (!text) return;

    try {
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'omnifexa-word-counter-text.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setFeedback('File downloaded successfully!');
    } catch {
      setFeedback('Failed to download file.');
    }

    setTimeout(() => setFeedback(null), 3000);
  };

  const handleReset = () => {
    setText('');
    setFeedback('Text reset.');
    setTimeout(() => setFeedback(null), 2000);
  };

  return (
    <LiveResultWorkspaceShell
      toolName="Word and Character Counter"
      adapterName="Simple Workspace Adapter"
      description="Live character, word, sentence, line, and time estimates."
    >
      <div className="space-y-6">
        {/* Live Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-surface-50 border border-border-default rounded-xl p-4 text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-primary-600 dark:text-primary-400">
              {metrics.words.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mt-1 block">
              Words
            </span>
          </div>

          <div className="bg-surface-50 border border-border-default rounded-xl p-4 text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-text-primary">
              {metrics.charactersWithSpaces.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mt-1 block">
              Characters
            </span>
          </div>

          <div className="bg-surface-50 border border-border-default rounded-xl p-4 text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-text-primary">
              {metrics.charactersWithoutSpaces.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mt-1 block">
              No Spaces
            </span>
          </div>

          <div className="bg-surface-50 border border-border-default rounded-xl p-4 text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-text-primary">
              {metrics.sentences.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mt-1 block">
              Sentences
            </span>
          </div>

          <div className="bg-surface-50 border border-border-default rounded-xl p-4 text-center">
            <span className="block text-xl sm:text-2xl font-bold text-text-secondary">
              {metrics.paragraphs.toLocaleString()}
            </span>
            <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mt-0.5 block">
              Paragraphs
            </span>
          </div>

          <div className="bg-surface-50 border border-border-default rounded-xl p-4 text-center">
            <span className="block text-xl sm:text-2xl font-bold text-text-secondary">
              {metrics.lines.toLocaleString()}
            </span>
            <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mt-0.5 block">
              Lines
            </span>
          </div>

          <div className="bg-surface-50 border border-border-default rounded-xl p-4 text-center">
            <span className="block text-xl sm:text-2xl font-bold text-text-secondary">
              {metrics.readingTimeFormatted}
            </span>
            <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mt-0.5 block">
              Reading Time
            </span>
          </div>

          <div className="bg-surface-50 border border-border-default rounded-xl p-4 text-center">
            <span className="block text-xl sm:text-2xl font-bold text-text-secondary">
              {metrics.speakingTimeFormatted}
            </span>
            <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mt-0.5 block">
              Speaking Time
            </span>
          </div>
        </div>

        {/* Input Textarea */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="word-counter-textarea" className="font-semibold text-text-primary text-sm">
              Input Text
            </label>
            <span className="text-xs text-text-tertiary">
              Privacy Guaranteed: Your text stays in this browser and is not uploaded.
            </span>
          </div>

          <textarea
            id="word-counter-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here to analyze words, characters, sentences, and time estimates in real-time..."
            rows={8}
            className="w-full bg-surface-50 border border-border-default rounded-xl p-4 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all font-mono leading-relaxed"
          />
        </div>

        {/* Action Controls & Feedback */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border-subtle">
          {/* Accessible Feedback Notice */}
          <div aria-live="polite" className="text-xs font-medium text-primary-600 dark:text-primary-400 min-h-[20px]">
            {feedback && <span>{feedback}</span>}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              disabled={!text}
              className="w-1/3 sm:w-auto text-xs"
            >
              Clear
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyText}
              disabled={!text}
              className="w-1/3 sm:w-auto text-xs"
            >
              Copy Text
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownloadText}
              disabled={!text}
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
