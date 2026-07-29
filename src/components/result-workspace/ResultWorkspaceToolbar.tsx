'use client';

import React from 'react';
import type { AdapterContract } from '@/lib/result-workspace/types';
import Button from '@/components/ui/Button';

interface ResultWorkspaceToolbarProps {
  contract: AdapterContract;
  onActionClick?: (actionId: string) => void;
}

export function ResultWorkspaceToolbar({
  contract,
  onActionClick,
}: ResultWorkspaceToolbarProps) {
  return (
    <div className="h-12 px-4 sm:px-6 bg-surface-0 border-b border-border-default flex items-center justify-between gap-2 overflow-x-auto text-xs">
      <div className="flex items-center gap-1.5 min-w-max">
        <span className="font-semibold text-text-tertiary uppercase tracking-wider text-[11px] mr-2">
          Tools:
        </span>
        {contract.defaultActions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant === 'danger' ? 'ghost' : action.variant || 'ghost'}
            size="sm"
            onClick={() => onActionClick?.(action.id)}
            disabled={action.disabled}
            className="text-xs font-medium"
          >
            {action.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-3 text-text-tertiary font-mono text-[11px] min-w-max">
        {contract.capabilities.supportsZoomPan && <span>Zoom: 100%</span>}
        {contract.capabilities.supportsPageReorder && <span>Pages: 1</span>}
        {contract.capabilities.supportsSyntaxHighlighting && <span>Syntax: Enabled</span>}
      </div>
    </div>
  );
}
