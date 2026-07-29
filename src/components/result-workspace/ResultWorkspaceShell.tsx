'use client';

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
      {/* Header */}
      <ResultWorkspaceHeader
        contract={contract}
        toolName={toolName}
        input={input}
        isPreview={isPreview}
      />

      {/* Toolbar */}
      <ResultWorkspaceToolbar contract={contract} />

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
