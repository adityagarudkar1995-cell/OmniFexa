'use client';

import React from 'react';
import { CATEGORY_ICONS } from '@/components/ui/category-icons';
import type { CategoryDisplay } from '@/lib/categories';

interface CategoryGridSectionProps {
  categories: CategoryDisplay[];
  selectedCategory: string;
  onCategorySelect: (key: string) => void;
}

export function CategoryGridSection({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryGridSectionProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
          Browse by category
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          Select a workflow area to focus your tool exploration.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {categories.map((cat) => {
          const IconComponent = CATEGORY_ICONS[cat.iconName] || CATEGORY_ICONS.Wand2;
          const isSelected = selectedCategory === cat.key;

          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => onCategorySelect(isSelected ? '' : cat.key)}
              aria-pressed={isSelected}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group min-h-[120px] ${
                isSelected
                  ? 'bg-primary-50 dark:bg-primary-950/60 border-primary-500 ring-2 ring-primary-500/20 text-primary-900 dark:text-primary-100 shadow-sm'
                  : 'bg-surface-0 border-border-default hover:border-border-strong hover:bg-surface-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? 'bg-primary-600 text-white'
                        : 'bg-surface-100 dark:bg-surface-200 text-text-secondary group-hover:text-primary-600 dark:group-hover:text-primary-400'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  <div className="flex items-center gap-1">
                    {cat.availableCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                        {cat.availableCount} Live
                      </span>
                    )}
                    <span className="text-xs font-semibold text-text-tertiary">
                      {cat.totalCount}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-sm text-text-primary line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-[11px] text-text-tertiary line-clamp-2 mt-1 leading-snug">
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] font-semibold text-text-tertiary group-hover:text-text-primary">
                <span>Explore</span>
                <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
