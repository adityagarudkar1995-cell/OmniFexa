import React from 'react';
import type { AdapterContract } from '@/lib/result-workspace/types';
import Button from '@/components/ui/Button';

interface ResultWorkspaceToolbarProps {
  contract: AdapterContract;
  isPreview?: boolean;
}

export function ResultWorkspaceToolbar({
  contract,
  isPreview = true,
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
            disabled={isPreview}
            aria-disabled={isPreview}
            title={isPreview ? 'Interface preview — processing and editing controls are not connected yet.' : undefined}
            onClick={undefined}
            className="text-xs font-medium opacity-60 cursor-not-allowed"
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
