import React from 'react';
import type { ToolEntry } from '@/lib/tools/types';
import { getCategoryMeta } from '@/lib/categories';
import Badge from '@/components/ui/Badge';

interface ToolHeaderProps {
  tool: ToolEntry;
}

export function ToolHeader({ tool }: ToolHeaderProps) {
  const categoryMeta = getCategoryMeta(tool.category);

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case 'client':
        return 'Browser Processing (On-Device)';
      case 'server':
        return 'Server Processing Required';
      case 'hybrid':
        return 'Hybrid (Client + Server)';
      case 'research-required':
        return 'R&D Phase';
      default:
        return mode;
    }
  };

  return (
    <div className="space-y-4">
      {/* Badges row */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="primary">{categoryMeta?.label || tool.category}</Badge>
        <Badge variant="default">{getModeLabel(tool.processingMode)}</Badge>
        <Badge variant="status">Currently in Development</Badge>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
        {tool.name}
      </h1>

      {/* Description */}
      <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-3xl">
        {tool.shortDescription}
      </p>
    </div>
  );
}
