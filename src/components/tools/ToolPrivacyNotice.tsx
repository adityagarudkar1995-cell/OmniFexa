import React from 'react';
import type { ProcessingMode } from '@/lib/tools/types';

interface ToolPrivacyNoticeProps {
  processingMode: ProcessingMode;
}

export function ToolPrivacyNotice({ processingMode }: ToolPrivacyNoticeProps) {
  const isClient = processingMode === 'client';

  return (
    <div className="bg-surface-50 border border-border-default rounded-2xl p-5 text-xs text-text-secondary flex items-start gap-3.5">
      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold text-sm">
        🛡️
      </div>
      <div className="space-y-1">
        <h4 className="font-semibold text-text-primary text-sm">
          Privacy Guarantee
        </h4>
        <p className="leading-relaxed">
          {isClient
            ? 'This tool is engineered for 100% on-device client-side processing using modern browser APIs. Your files never leave your device or touch an external server.'
            : 'When active, file processing will be handled strictly in short-lived temporary memory buffers with zero permanent cloud storage and auto-deletion after processing.'}
        </p>
      </div>
    </div>
  );
}
