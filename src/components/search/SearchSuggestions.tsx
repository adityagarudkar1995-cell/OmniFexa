'use client';

import React from 'react';
import type { ToolEntry } from '@/lib/tools/types';
import { getCategoryMeta } from '@/lib/categories';
import Badge from '@/components/ui/Badge';

interface SearchSuggestionsProps {
  results: ToolEntry[];
  selectedIndex: number;
  onSelect: (tool: ToolEntry) => void;
  query: string;
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="bg-primary-100 dark:bg-primary-900/40 text-primary-900 dark:text-primary-200 rounded px-0.5 font-semibold">
            {part}
          </mark>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

export function SearchSuggestions({
  results,
  selectedIndex,
  onSelect,
  query,
}: SearchSuggestionsProps) {
  return (
    <div
      id="search-results"
      role="listbox"
      className="absolute top-full left-0 right-0 mt-2 bg-surface-0 border border-border-default rounded-2xl shadow-xl overflow-hidden z-40 max-h-[420px] overflow-y-auto divide-y divide-border-subtle"
    >
      {results.map((tool, index) => {
        const categoryMeta = getCategoryMeta(tool.category);
        const isSelected = index === selectedIndex;

        return (
          <div
            key={tool.id}
            id={`search-result-${index}`}
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelect(tool)}
            className={`px-4 py-3 flex items-center justify-between gap-4 cursor-pointer transition-colors duration-150 ${
              isSelected ? 'bg-surface-100 dark:bg-surface-200' : 'hover:bg-surface-50'
            }`}
          >
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-text-primary text-sm sm:text-base truncate">
                <HighlightMatch text={tool.name} query={query} />
              </span>
              <span className="text-xs text-text-secondary line-clamp-1 mt-0.5">
                {tool.shortDescription}
              </span>
            </div>

            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="text-xs font-medium text-text-tertiary hidden sm:inline-block">
                {categoryMeta?.label ?? tool.category}
              </span>
              <Badge variant="status">Coming Soon</Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
