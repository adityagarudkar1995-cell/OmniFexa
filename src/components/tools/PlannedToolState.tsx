import React from 'react';
import type { ToolEntry } from '@/lib/tools/types';
import Badge from '@/components/ui/Badge';

interface PlannedToolStateProps {
  tool: ToolEntry;
}

export function PlannedToolState({ tool }: PlannedToolStateProps) {
  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-4">
      <div className="inline-flex items-center gap-2">
        <Badge variant="status">Under Active Development</Badge>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
        This tool is currently in development.
      </h2>

      <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
        <strong className="text-text-primary">{tool.name}</strong> is scheduled for release in{' '}
        <span className="font-semibold text-primary-600 dark:text-primary-400 capitalize">
          {tool.phase.replace('-', ' ')}
        </span>
        . Our engineering team is currently building the underlying algorithms and Result Workspace integrations.
      </p>

      <div className="pt-2 text-xs text-text-tertiary">
        Check out our available homepage search or explore other planned tools in the catalog while we complete development.
      </div>
    </div>
  );
}
