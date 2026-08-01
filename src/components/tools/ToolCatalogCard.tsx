import React from 'react';
import Badge from '@/components/ui/Badge';
import { getCategoryMeta } from '@/lib/categories';
import { CATEGORY_ICONS } from '@/components/ui/category-icons';
import type { ToolCatalogProjectionEntry } from '@/lib/tools/projection';

interface ToolCatalogCardProps {
  tool: ToolCatalogProjectionEntry;
}

export function ToolCatalogCard({ tool }: ToolCatalogCardProps) {
  const categoryMeta = getCategoryMeta(tool.category);
  const IconComponent =
    categoryMeta?.iconName && CATEGORY_ICONS[categoryMeta.iconName]
      ? CATEGORY_ICONS[categoryMeta.iconName]
      : CATEGORY_ICONS.Wand2;

  const isAvailable = tool.implementationStatus === 'production';

  const maxVisibleFormats = 2;
  const inputDisplay = tool.inputFormats.slice(0, maxVisibleFormats).join(', ');
  const outputDisplay = tool.outputFormats.slice(0, maxVisibleFormats).join(', ');

  return (
    <div
      className={`relative rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between h-full border ${
        isAvailable
          ? 'bg-surface-0 border-primary-300 dark:border-primary-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 ring-1 ring-primary-500/10'
          : 'bg-surface-0 border-border-default hover:border-border-strong hover:bg-surface-50/50'
      }`}
    >
      <div>
        {/* Card Header: Icon & Status Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${
              isAvailable
                ? 'bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400'
                : 'bg-surface-100 dark:bg-surface-200 text-text-tertiary'
            }`}
          >
            <IconComponent className="w-4 h-4" />
          </div>

          <div>
            {isAvailable ? (
              <Badge variant="status">Available</Badge>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-surface-100 dark:bg-surface-200 text-text-tertiary border border-border-default">
                Coming Soon
              </span>
            )}
          </div>
        </div>

        {/* Title & Short Description */}
        <h3 className="font-semibold text-text-primary text-base leading-snug">
          {tool.name}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 mt-1.5 leading-relaxed">
          {tool.shortDescription}
        </p>
      </div>

      {/* Card Footer */}
      <div className="mt-5 pt-3 border-t border-border-subtle space-y-3 text-xs">
        {/* Category & Privacy / Format badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-medium text-text-tertiary bg-surface-100 dark:bg-surface-200 px-2 py-0.5 rounded-md">
            {categoryMeta.label}
          </span>

          {isAvailable ? (
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Browser-based
            </span>
          ) : (
            (inputDisplay || outputDisplay) && (
              <span className="text-[11px] font-mono text-text-tertiary uppercase">
                {inputDisplay} → {outputDisplay}
              </span>
            )
          )}
        </div>

        {/* Primary Action Button / Link text */}
        <div className="pt-1 flex items-center justify-between text-xs font-semibold">
          {isAvailable ? (
            <span className="text-primary-600 dark:text-primary-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              Open Tool <span aria-hidden="true">→</span>
            </span>
          ) : (
            <span className="text-text-tertiary group-hover:text-text-secondary transition-colors flex items-center gap-1">
              View Roadmap Details <span aria-hidden="true">→</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
