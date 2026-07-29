import React from 'react';
import type { AdapterContract, WorkspaceInput } from '@/lib/result-workspace/types';
import Badge from '@/components/ui/Badge';

interface ResultWorkspaceHeaderProps {
  contract: AdapterContract;
  toolName: string;
  input: WorkspaceInput | null;
  isPreview?: boolean;
}

export function ResultWorkspaceHeader({
  contract,
  toolName,
  input,
  isPreview = true,
}: ResultWorkspaceHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:px-6 border-b border-border-default bg-surface-50">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-sm">
          {contract.id.substring(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-text-primary text-base sm:text-lg">
              {toolName} — Result Workspace
            </h2>
            {isPreview && <Badge variant="status">Interface Preview</Badge>}
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            {contract.name} • {contract.description}
          </p>
        </div>
      </div>

      {input && (
        <div className="text-xs text-text-tertiary font-mono bg-surface-100 dark:bg-surface-200 px-3 py-1.5 rounded-lg border border-border-subtle flex items-center gap-2">
          <span>📄 {input.name}</span>
          <span>({(input.size / 1024).toFixed(1)} KB)</span>
        </div>
      )}
    </div>
  );
}
