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

  const maxVisibleFormats = 3;
  const inputDisplay = tool.inputFormats.slice(0, maxVisibleFormats);
  const remainingInputs = tool.inputFormats.length - maxVisibleFormats;

  const outputDisplay = tool.outputFormats.slice(0, maxVisibleFormats);
  const remainingOutputs = tool.outputFormats.length - maxVisibleFormats;

  const isAvailable = tool.implementationStatus === 'production';

  return (
    <div className="relative bg-surface-0 border border-border-default rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between h-full">
      <div>
        {/* Top Status & Adapter Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600">
            <IconComponent className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1.5">
            {isAvailable ? (
              <Badge variant="status">Available</Badge>
            ) : (
              <Badge variant="status">Coming Soon</Badge>
            )}
          </div>
        </div>

        {/* Name and Short Description */}
        <h3 className="font-semibold text-text-primary text-base leading-snug">
          {tool.name}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2 mt-1.5 leading-relaxed">
          {tool.shortDescription}
        </p>
      </div>

      {/* Footer Specifications & Formats */}
      <div className="mt-5 pt-3 border-t border-border-subtle space-y-2.5 text-xs">
        {/* Category & Mode Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="px-2 py-0.5 rounded bg-surface-100 dark:bg-surface-200 text-text-secondary font-medium">
            {categoryMeta?.label || tool.category}
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-100 dark:bg-surface-200 text-text-tertiary capitalize">
            {tool.processingMode}
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-100 dark:bg-surface-200 text-text-tertiary uppercase font-mono">
            {tool.resultAdapter}
          </span>
        </div>

        {/* Input / Output Format Badges */}
        {(tool.inputFormats.length > 0 || tool.outputFormats.length > 0) && (
          <div className="flex items-center justify-between text-[11px] font-mono text-text-tertiary">
            <div className="flex items-center gap-1">
              <span className="font-sans font-medium text-text-secondary">In:</span>
              {inputDisplay.map((fmt) => (
                <span key={fmt} className="uppercase">
                  .{fmt}
                </span>
              ))}
              {remainingInputs > 0 && <span>+{remainingInputs}</span>}
            </div>

            <div className="flex items-center gap-1">
              <span className="font-sans font-medium text-text-secondary">Out:</span>
              {outputDisplay.map((fmt) => (
                <span key={fmt} className="uppercase text-primary-600 dark:text-primary-400">
                  .{fmt}
                </span>
              ))}
              {remainingOutputs > 0 && <span>+{remainingOutputs}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
