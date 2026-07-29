'use client';

import { CATEGORY_ICONS } from './category-icons';
import Badge from './Badge';
import type { ToolEntry } from '@/lib/tools/types';
import { getCategoryMeta } from '@/lib/categories';

interface ToolCardProps {
  tool: ToolEntry;
}

export function ToolCard({ tool }: ToolCardProps) {
  const categoryMeta = getCategoryMeta(tool.category);
  const IconComponent = categoryMeta?.iconName && CATEGORY_ICONS[categoryMeta.iconName]
    ? CATEGORY_ICONS[categoryMeta.iconName]
    : CATEGORY_ICONS.Wand2;

  const isAvailable = tool.implementationStatus === 'production';

  return (
    <div className="relative bg-surface-0 border border-border-default rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="absolute top-4 right-4">
        {isAvailable ? (
          <Badge variant="status">Available</Badge>
        ) : (
          <Badge variant="status">Coming Soon</Badge>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          <IconComponent className="w-5 h-5" />
        </div>

        <div>
          <h3 className="font-semibold text-text-primary text-base">{tool.name}</h3>
          <p className="text-sm text-text-secondary line-clamp-2 mt-1">{tool.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
