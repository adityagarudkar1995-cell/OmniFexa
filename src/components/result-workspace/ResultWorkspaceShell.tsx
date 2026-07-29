import React from 'react';
import type { ResultAdapterType, WorkspaceInput } from '@/lib/result-workspace/types';
import { getAdapterContract } from '@/lib/result-workspace/registry';
import { ResultWorkspaceHeader } from './ResultWorkspaceHeader';
import { ResultWorkspaceToolbar } from './ResultWorkspaceToolbar';
import { ResultWorkspaceCanvas } from './ResultWorkspaceCanvas';
import { ResultWorkspaceActions } from './ResultWorkspaceActions';

interface ResultWorkspaceShellProps {
  adapterType: ResultAdapterType;
  toolName: string;
  input?: WorkspaceInput | null;
  isPreview?: boolean;
}

export function ResultWorkspaceShell({
  adapterType,
  toolName,
  input = null,
  isPreview = true,
}: ResultWorkspaceShellProps) {
  const contract = getAdapterContract(adapterType);

  return (
    <div className="w-full bg-surface-0 border border-border-default rounded-2xl shadow-lg overflow-hidden my-8">
      {/* Interface Preview Notice Banner */}
      {isPreview && (
        <div
          role="status"
          className="bg-amber-500/10 border-b border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs px-4 py-2 text-center font-medium"
        >
          Interface preview — processing and editing controls are not connected yet.
        </div>
      )}

      {/* Header */}
      <ResultWorkspaceHeader
        contract={contract}
        toolName={toolName}
        input={input}
        isPreview={isPreview}
      />

      {/* Toolbar */}
      <ResultWorkspaceToolbar contract={contract} isPreview={isPreview} />

      {/* Canvas / Workspace Main Area */}
      <ResultWorkspaceCanvas adapterType={adapterType} toolName={toolName} />

      {/* Actions / Export Bar */}
      <ResultWorkspaceActions
        exportFormats={contract.capabilities.exportFormats}
        disabled={isPreview}
      />
    </div>
  );
}
