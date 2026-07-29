import React from 'react';
import { LiveResultWorkspaceHeader } from './LiveResultWorkspaceHeader';

interface LiveResultWorkspaceShellProps {
  toolName: string;
  adapterName: string;
  description: string;
  children: React.ReactNode;
}

export function LiveResultWorkspaceShell({
  toolName,
  adapterName,
  description,
  children,
}: LiveResultWorkspaceShellProps) {
  return (
    <div className="w-full bg-surface-0 border border-border-default rounded-2xl shadow-lg overflow-hidden my-8">
      <LiveResultWorkspaceHeader
        toolName={toolName}
        adapterName={adapterName}
        description={description}
      />
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}
