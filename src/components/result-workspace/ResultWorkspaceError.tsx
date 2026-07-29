import React from 'react';
import type { WorkspaceError } from '@/lib/result-workspace/types';
import Button from '@/components/ui/Button';

interface ResultWorkspaceErrorProps {
  error: WorkspaceError;
  onRetry?: () => void;
}

export function ResultWorkspaceError({ error, onRetry }: ResultWorkspaceErrorProps) {
  return (
    <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-2xl p-6 text-center space-y-3">
      <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto text-lg font-bold">
        !
      </div>
      <div>
        <h3 className="font-semibold text-rose-900 dark:text-rose-200 text-base">
          {error.message}
        </h3>
        {error.details && (
          <p className="text-xs text-rose-700 dark:text-rose-300 mt-1 font-mono">
            {error.details}
          </p>
        )}
      </div>

      {error.recoverable && onRetry && (
        <div className="pt-2">
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
