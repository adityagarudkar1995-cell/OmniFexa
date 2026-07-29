import React from 'react';
import type { ResultAdapterType } from '@/lib/result-workspace/types';

interface ResultWorkspaceCanvasProps {
  adapterType: ResultAdapterType;
  toolName: string;
}

export function ResultWorkspaceCanvas({
  adapterType,
  toolName,
}: ResultWorkspaceCanvasProps) {
  return (
    <div className="min-h-[320px] sm:min-h-[400px] bg-surface-100 dark:bg-surface-200/50 p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Notice Banner */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs px-3 py-1 rounded-full font-medium z-10 pointer-events-none">
        Interface preview — processing engine not connected
      </div>

      {/* PDF Adapter Preview */}
      {adapterType === 'pdf' && (
        <div className="w-full max-w-lg bg-surface-0 border border-border-default rounded-xl shadow-lg p-8 relative flex flex-col justify-between aspect-[1/1.3] text-center my-6">
          <div className="border-b border-border-subtle pb-4 flex justify-between items-center text-xs text-text-tertiary">
            <span>[PDF Document Preview]</span>
            <span>Page 1 of 1</span>
          </div>
          <div className="space-y-4 my-8">
            <div className="h-4 bg-surface-200 rounded w-3/4 mx-auto" />
            <div className="h-3 bg-surface-100 rounded w-5/6 mx-auto" />
            <div className="h-3 bg-surface-100 rounded w-2/3 mx-auto" />
            <div className="h-3 bg-surface-100 rounded w-4/5 mx-auto" />
          </div>
          <div className="text-xs text-text-tertiary font-mono pt-4 border-t border-border-subtle">
            OmniFexa PDF Adapter • {toolName}
          </div>
        </div>
      )}

      {/* Image Adapter Preview */}
      {adapterType === 'image' && (
        <div className="w-full max-w-md aspect-video bg-surface-0 border border-border-default rounded-xl shadow-lg p-6 relative flex flex-col justify-between overflow-hidden my-6">
          <div className="flex items-center justify-between text-xs text-text-tertiary border-b border-border-subtle pb-2">
            <span>[Canvas Image Editor]</span>
            <span>1200 × 800 px</span>
          </div>
          <div className="my-auto flex flex-col items-center justify-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 flex items-center justify-center font-bold text-lg">
              IMG
            </div>
            <span className="text-xs text-text-secondary font-medium">Interactive Canvas Area</span>
          </div>
          <div className="text-[11px] text-text-tertiary font-mono text-right">
            Crop • Resize • Annotate • Blur
          </div>
        </div>
      )}

      {/* Text Adapter Preview */}
      {adapterType === 'text' && (
        <div className="w-full max-w-lg bg-surface-0 border border-border-default rounded-xl shadow-lg p-6 font-mono text-xs text-text-secondary space-y-3 my-6">
          <div className="text-text-tertiary border-b border-border-subtle pb-2 font-sans flex justify-between">
            <span>[Rich Text Editor]</span>
            <span>0 words</span>
          </div>
          <p className="text-text-tertiary italic">
            Sample extracted/formatted text output will appear here in the live tool...
          </p>
        </div>
      )}

      {/* Code Adapter Preview */}
      {adapterType === 'code' && (
        <div className="w-full max-w-lg bg-slate-900 text-slate-200 border border-slate-800 rounded-xl shadow-lg p-5 font-mono text-xs space-y-2 my-6">
          <div className="text-slate-500 border-b border-slate-800 pb-2 flex justify-between font-sans">
            <span>[Syntax Highlighted Code Editor]</span>
            <span>UTF-8</span>
          </div>
          <pre className="text-emerald-400 font-mono text-xs overflow-x-auto">
{`{
  "tool": "${toolName}",
  "status": "planned",
  "workspaceAdapter": "code"
}`}
          </pre>
        </div>
      )}

      {/* Simple Result Adapter Preview */}
      {adapterType === 'simple' && (
        <div className="w-full max-w-md bg-surface-0 border border-border-default rounded-2xl shadow-lg p-8 text-center space-y-3 my-6">
          <span className="text-xs font-semibold text-primary-600 tracking-wide uppercase">
            Output Result
          </span>
          <div className="text-3xl sm:text-4xl font-bold font-mono text-text-primary">
            ---
          </div>
          <p className="text-xs text-text-tertiary">
            Formatted display card for calculator or generator output
          </p>
        </div>
      )}

      {/* Media Adapter Preview */}
      {adapterType === 'media' && (
        <div className="w-full max-w-md bg-slate-900 text-slate-200 border border-slate-800 rounded-xl shadow-lg p-6 text-center space-y-4 my-6">
          <div className="text-xs text-slate-400 border-b border-slate-800 pb-2 flex justify-between">
            <span>[Media Player & Timeline]</span>
            <span>00:00 / 00:00</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center mx-auto text-xl">
            ▶
          </div>
          <div className="h-2 bg-slate-800 rounded-full w-full overflow-hidden">
            <div className="h-full bg-primary-500 w-1/3" />
          </div>
        </div>
      )}

      {/* Whiteboard Adapter Preview */}
      {adapterType === 'whiteboard' && (
        <div className="w-full max-w-lg aspect-[16/9] bg-surface-0 border border-border-default rounded-xl shadow-lg p-6 relative flex flex-col justify-between my-6">
          <div className="text-xs text-text-tertiary border-b border-border-subtle pb-2 flex justify-between">
            <span>[Infinite Canvas Whiteboard]</span>
            <span>Excalidraw Mode</span>
          </div>
          <div className="my-auto text-center space-y-1">
            <span className="text-2xl">🎨</span>
            <p className="text-xs text-text-secondary font-medium">Diagram & Sketch Surface</p>
          </div>
        </div>
      )}
    </div>
  );
}
