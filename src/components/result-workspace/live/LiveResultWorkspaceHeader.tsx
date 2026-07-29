import React from 'react';
import Badge from '@/components/ui/Badge';

interface LiveResultWorkspaceHeaderProps {
  toolName: string;
  adapterName: string;
  description: string;
}

export function LiveResultWorkspaceHeader({
  toolName,
  adapterName,
  description,
}: LiveResultWorkspaceHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:px-6 border-b border-border-default bg-surface-50">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
          ✓
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-text-primary text-base sm:text-lg">
              {toolName}
            </h2>
            <Badge variant="status">Available</Badge>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            {adapterName} • {description}
          </p>
        </div>
      </div>
    </div>
  );
}
