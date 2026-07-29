import React from 'react';
import type { WorkspaceLifecycle } from '@/lib/result-workspace/types';
import Badge from '@/components/ui/Badge';

interface ResultWorkspaceStatusProps {
  lifecycle: WorkspaceLifecycle;
}

export function ResultWorkspaceStatus({ lifecycle }: ResultWorkspaceStatusProps) {
  const getBadgeVariant = () => {
    switch (lifecycle) {
      case 'ready':
        return 'primary';
      case 'error':
      case 'cancelled':
        return 'default';
      case 'processing':
      case 'input-ready':
      case 'idle':
      default:
        return 'status';
    }
  };

  const getLabel = () => {
    switch (lifecycle) {
      case 'idle':
        return 'Ready for Input';
      case 'input-ready':
        return 'Input Selected';
      case 'processing':
        return 'Processing...';
      case 'ready':
        return 'Output Ready';
      case 'error':
        return 'Error Occurred';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'In Development';
    }
  };

  return (
    <div className="inline-flex items-center gap-2">
      <Badge variant={getBadgeVariant()}>{getLabel()}</Badge>
    </div>
  );
}
