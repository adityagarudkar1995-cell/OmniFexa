'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import type { ToolCatalogProjectionEntry } from '@/lib/tools/projection';
import { getCategoryCounts } from '@/lib/categories';
import { ToolCatalogCard } from './ToolCatalogCard';
import Button from '@/components/ui/Button';

interface ToolCatalogViewProps {
  catalog: ToolCatalogProjectionEntry[];
}

export function ToolCatalogView({ catalog }: ToolCatalogViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL searchParams are the single source of truth for committed filters
  const urlQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || '';
  const selectedPhase = searchParams.get('phase') || '';
  const selectedStatus = searchParams.get('status') || '';
  const selectedMode = searchParams.get('mode') || '';

  // Local state for free-text search input
  const [localQueryState, setLocalQueryState] = useState(urlQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);

  // Sync local typing state during render if URL search query changes externally (e.g. Back/Forward navigation)
  if (prevUrlQuery !== urlQuery) {
    setPrevUrlQuery(urlQuery);
    setLocalQueryState(urlQuery);
  }

  const localQuery = localQueryState;

  // Helper to update a single URL query parameter while preserving all other current URL searchParams
  const setSingleParam = useCallback(
    (key: string, val: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = val.trim();

      if (trimmed) {
        params.set(key, trimmed);
      } else {
        params.delete(key);
      }

      const queryString = params.toString();
      const targetPath = queryString ? `${pathname}?${queryString}` : pathname;
      const currentPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

      if (targetPath !== currentPath) {
        router.replace(targetPath, { scroll: false });
      }
    },
    [pathname, router, searchParams]
  );

  // Effect-based debounced update for free-text search query (~300ms)
  // Automatically cancels pending timers when localQuery, urlQuery, or searchParams change
  useEffect(() => {
    if (localQuery.trim() === urlQuery.trim()) {
      return;
    }

    const timer = setTimeout(() => {
      setSingleParam('q', localQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, urlQuery, setSingleParam]);

  // Derived unique status options from catalog projection
  const availableStatuses = useMemo(() => {
    const set = new Set(catalog.map((t) => t.implementationStatus));
    return Array.from(set);
  }, [catalog]);

  const categories = useMemo(() => getCategoryCounts(catalog), [catalog]);

  const handleCategorySelect = (catKey: string) => {
    setSingleParam('category', catKey);
  };

  const handlePhaseSelect = (phaseVal: string) => {
    setSingleParam('phase', phaseVal);
  };

  const handleStatusSelect = (statusVal: string) => {
    setSingleParam('status', statusVal);
  };

  const handleModeSelect = (modeVal: string) => {
    setSingleParam('mode', modeVal);
  };

  const handleClearQuery = () => {
    setLocalQueryState('');
    setSingleParam('q', '');
  };

  const resetAllFilters = () => {
    setLocalQueryState('');

    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    params.delete('category');
    params.delete('phase');
    params.delete('status');
    params.delete('mode');

    const queryString = params.toString();
    const targetPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(targetPath, { scroll: false });
  };

  const filteredTools = useMemo(() => {
    const q = localQuery.toLowerCase().trim();

    return catalog.filter((tool) => {
      if (selectedCategory && tool.category !== selectedCategory) return false;
      if (selectedPhase && tool.phase !== selectedPhase) return false;
      if (selectedStatus && tool.implementationStatus !== selectedStatus) return false;
      if (selectedMode && tool.processingMode !== selectedMode) return false;

      if (q) {
        const name = tool.name.toLowerCase();
        const desc = tool.shortDescription.toLowerCase();
        const kwMatch = tool.keywords.some((k) => k.toLowerCase().includes(q));
        const hinglishMatch = tool.hinglishKeywords.some((k) => k.toLowerCase().includes(q));

        if (!name.includes(q) && !desc.includes(q) && !kwMatch && !hinglishMatch) {
          return false;
        }
      }

      return true;
    });
  }, [catalog, localQuery, selectedCategory, selectedPhase, selectedStatus, selectedMode]);

  const hasActiveFilters = Boolean(
    localQuery || selectedCategory || selectedPhase || selectedStatus || selectedMode
  );

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls */}
      <div className="bg-surface-0 border border-border-default rounded-2xl p-6 shadow-sm space-y-5">
        {/* Search bar */}
        <div>
          <label htmlFor="tool-search-input" className="sr-only">
            Search catalog tools
          </label>
          <div className="relative">
            <input
              id="tool-search-input"
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQueryState(e.target.value)}
              placeholder="Search 187 tools by name, keywords, or Hinglish phrases..."
              className="w-full h-12 bg-surface-50 border border-border-default rounded-xl pl-11 pr-10 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all min-h-[44px]"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary pointer-events-none" />
            {localQuery && (
              <button
                type="button"
                onClick={handleClearQuery}
                aria-label="Clear search input"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary text-xs font-semibold p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div>
          <label className="block text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">
            Category
          </label>
          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
            <button
              type="button"
              onClick={() => handleCategorySelect('')}
              aria-pressed={!selectedCategory}
              className={`px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors min-h-[44px] ${
                !selectedCategory
                  ? 'bg-primary-600 text-white'
                  : 'bg-surface-100 text-text-secondary hover:bg-surface-200'
              }`}
            >
              All Categories ({catalog.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleCategorySelect(cat.key)}
                aria-pressed={selectedCategory === cat.key}
                className={`px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors min-h-[44px] ${
                  selectedCategory === cat.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-surface-100 text-text-secondary hover:bg-surface-200'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border-subtle text-xs">
          {/* Phase Filter */}
          <div>
            <label htmlFor="phase-select" className="block text-[11px] font-medium text-text-tertiary mb-1">
              Development Phase
            </label>
            <select
              id="phase-select"
              value={selectedPhase}
              onChange={(e) => handlePhaseSelect(e.target.value)}
              className="w-full bg-surface-50 border border-border-default rounded-xl px-3 py-2 text-text-secondary focus:outline-none focus:border-primary-500 min-h-[44px]"
            >
              <option value="">All Roadmap Phases</option>
              <option value="phase-2-core-launch">Phase 2: Core Launch</option>
              <option value="phase-3-document-workflows">Phase 3: Document Workflows</option>
              <option value="phase-4-advanced-conversion">Phase 4: Advanced Conversion</option>
              <option value="phase-5-ai-tools">Phase 5: AI Tools</option>
              <option value="phase-6-media-and-growth">Phase 6: Media & Growth</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="status-select" className="block text-[11px] font-medium text-text-tertiary mb-1">
              Implementation Status
            </label>
            <select
              id="status-select"
              value={selectedStatus}
              onChange={(e) => handleStatusSelect(e.target.value)}
              className="w-full bg-surface-50 border border-border-default rounded-xl px-3 py-2 text-text-secondary focus:outline-none focus:border-primary-500 min-h-[44px]"
            >
              <option value="">All Statuses</option>
              {availableStatuses.map((st) => (
                <option key={st} value={st}>
                  {st.charAt(0).toUpperCase() + st.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Mode Filter */}
          <div>
            <label htmlFor="mode-select" className="block text-[11px] font-medium text-text-tertiary mb-1">
              Processing Mode
            </label>
            <select
              id="mode-select"
              value={selectedMode}
              onChange={(e) => handleModeSelect(e.target.value)}
              className="w-full bg-surface-50 border border-border-default rounded-xl px-3 py-2 text-text-secondary focus:outline-none focus:border-primary-500 min-h-[44px]"
            >
              <option value="">All Processing Modes</option>
              <option value="client">Client (Browser On-Device)</option>
              <option value="server">Server Processing</option>
              <option value="hybrid">Hybrid</option>
              <option value="research-required">Research Required</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="pt-3 border-t border-border-subtle flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-text-tertiary mr-1">Active filters:</span>

            {localQuery && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-200 text-xs font-medium text-text-primary border border-border-default">
                Search: &quot;{localQuery}&quot;
                <button
                  type="button"
                  onClick={handleClearQuery}
                  aria-label="Remove search query filter"
                  className="hover:text-rose-600 font-bold ml-0.5 p-0.5"
                >
                  ✕
                </button>
              </span>
            )}

            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-200 text-xs font-medium text-text-primary border border-border-default">
                Category: {categories.find((c) => c.key === selectedCategory)?.label || selectedCategory}
                <button
                  type="button"
                  onClick={() => handleCategorySelect('')}
                  aria-label="Remove category filter"
                  className="hover:text-rose-600 font-bold ml-0.5 p-0.5"
                >
                  ✕
                </button>
              </span>
            )}

            {selectedPhase && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-200 text-xs font-medium text-text-primary border border-border-default">
                Phase: {selectedPhase.replace('phase-', 'Phase ').replace('-', ': ')}
                <button
                  type="button"
                  onClick={() => handlePhaseSelect('')}
                  aria-label="Remove phase filter"
                  className="hover:text-rose-600 font-bold ml-0.5 p-0.5"
                >
                  ✕
                </button>
              </span>
            )}

            {selectedStatus && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-200 text-xs font-medium text-text-primary border border-border-default">
                Status: {selectedStatus}
                <button
                  type="button"
                  onClick={() => handleStatusSelect('')}
                  aria-label="Remove status filter"
                  className="hover:text-rose-600 font-bold ml-0.5 p-0.5"
                >
                  ✕
                </button>
              </span>
            )}

            {selectedMode && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-200 text-xs font-medium text-text-primary border border-border-default">
                Mode: {selectedMode}
                <button
                  type="button"
                  onClick={() => handleModeSelect('')}
                  aria-label="Remove mode filter"
                  className="hover:text-rose-600 font-bold ml-0.5 p-0.5"
                >
                  ✕
                </button>
              </span>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={resetAllFilters}
              className="text-xs ml-auto min-h-[44px]"
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <span>
          Showing <strong className="text-text-primary">{filteredTools.length}</strong> of{' '}
          <strong className="text-text-primary">{catalog.length}</strong> planned tools
        </span>
        {hasActiveFilters && (
          <span className="text-xs text-text-tertiary">Filtered catalog view</span>
        )}
      </div>

      {/* Empty State */}
      {filteredTools.length === 0 && (
        <div className="bg-surface-0 border border-border-default rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-surface-100 flex items-center justify-center mx-auto text-xl text-text-tertiary">
            🔍
          </div>
          <h3 className="font-semibold text-text-primary text-lg">No matching tools found</h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            We couldn&apos;t find any tools matching your active search or filter selection. Try resetting filters or searching for alternative terms like &quot;PDF&quot;, &quot;image&quot;, or &quot;converter&quot;.
          </p>
          <Button variant="secondary" size="md" onClick={resetAllFilters}>
            Reset All Filters
          </Button>
        </div>
      )}

      {/* Tool Grid using dedicated ToolCatalogCard */}
      {filteredTools.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredTools.map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.slug}`} className="block group">
              <ToolCatalogCard tool={tool} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
