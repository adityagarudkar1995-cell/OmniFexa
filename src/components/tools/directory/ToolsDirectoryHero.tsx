'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface ToolsDirectoryHeroProps {
  totalCount: number;
  availableCount: number;
  plannedCount: number;
  categoryCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchClear: () => void;
  onExampleClick: (target: { type: 'route' | 'query'; value: string }) => void;
}

export function ToolsDirectoryHero({
  availableCount,
  plannedCount,
  categoryCount,
  searchQuery,
  onSearchChange,
  onSearchClear,
  onExampleClick,
}: ToolsDirectoryHeroProps) {
  const exampleSearches = [
    { label: 'Count words', type: 'query' as const, value: 'word' },
    { label: 'Convert text case', type: 'query' as const, value: 'case' },
    { label: 'Compress PDF', type: 'query' as const, value: 'compress pdf' },
    { label: 'Edit screenshot', type: 'query' as const, value: 'screenshot' },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-surface-0 border border-border-default p-6 sm:p-10 shadow-sm">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-xs font-semibold text-primary-700 dark:text-primary-300">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
          Every Tool. One Workspace.
        </div>

        {/* H1 Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
          Find the right tool for the job
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Use available browser-based utilities now and explore OmniFexa’s growing roadmap across PDF, image, text, screenshot, developer and media workflows.
        </p>

        {/* Derived Summary Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-surface-50 border border-border-default rounded-xl p-3 text-center">
            <span className="block font-bold text-lg text-emerald-600 dark:text-emerald-400">
              {availableCount}
            </span>
            <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">
              Available Now
            </span>
          </div>

          <div className="bg-surface-50 border border-border-default rounded-xl p-3 text-center">
            <span className="block font-bold text-lg text-text-primary">
              {plannedCount}
            </span>
            <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">
              On Roadmap
            </span>
          </div>

          <div className="bg-surface-50 border border-border-default rounded-xl p-3 text-center">
            <span className="block font-bold text-lg text-text-primary">
              {categoryCount}
            </span>
            <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">
              Categories
            </span>
          </div>

          <div className="bg-surface-50 border border-border-default rounded-xl p-3 text-center">
            <span className="block font-bold text-sm sm:text-base text-primary-600 dark:text-primary-400">
              Privacy-First
            </span>
            <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">
              Design Principle
            </span>
          </div>
        </div>

        {/* Search Field */}
        <div id="hero-search" className="pt-2 max-w-xl mx-auto">
          <label htmlFor="hero-search-input" className="sr-only">
            Search tools by name or task
          </label>
          <div className="relative">
            <input
              id="hero-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tools by name or task…"
              className="w-full h-13 bg-surface-50 border border-border-default rounded-2xl pl-12 pr-10 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={onSearchClear}
                aria-label="Clear search input"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary text-xs font-semibold p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Example Links */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-xs text-text-tertiary">
            <span className="font-medium">Try searching:</span>
            {exampleSearches.map((ex) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => onExampleClick(ex)}
                className="px-2.5 py-1 rounded-full bg-surface-100 dark:bg-surface-200 text-text-secondary hover:text-primary-600 dark:hover:text-primary-400 hover:bg-surface-200 transition-colors"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
