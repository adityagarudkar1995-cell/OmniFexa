'use client';

import React from 'react';
import type { ExportOption } from '@/lib/result-workspace/types';
import Button from '@/components/ui/Button';

interface ResultWorkspaceActionsProps {
  exportFormats: ExportOption[];
  disabled?: boolean;
}

export function ResultWorkspaceActions({
  exportFormats,
  disabled = true,
}: ResultWorkspaceActionsProps) {
  const primaryFormat = exportFormats.find((f) => f.isPrimary) || exportFormats[0];

  return (
    <div className="p-4 sm:px-6 bg-surface-0 border-t border-border-default flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-xs text-text-tertiary">
        <span>Export Format:</span>
        <select
          disabled={disabled}
          className="bg-surface-50 border border-border-default rounded-lg px-2.5 py-1 text-xs text-text-secondary focus:outline-none disabled:opacity-60 cursor-pointer"
        >
          {exportFormats.map((fmt) => (
            <option key={fmt.id} value={fmt.id}>
              {fmt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Button variant="secondary" size="sm" disabled={disabled} className="w-1/2 sm:w-auto">
          Copy Output
        </Button>
        <Button variant="primary" size="sm" disabled={disabled} className="w-1/2 sm:w-auto">
          Download ({primaryFormat?.extension.toUpperCase() || 'FILE'})
        </Button>
      </div>
    </div>
  );
}
