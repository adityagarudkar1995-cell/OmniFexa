'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

import type { ToolCategory } from '@/lib/tools/types';
import type { ToolCatalogProjectionEntry } from '@/lib/tools/projection';
import {
  filterAndSortDirectoryTools,
  getDirectoryStatusFilter,
  getDirectoryStatusLabel,
  isDirectorySearchUpdateCurrent,
  synchronizeDirectoryQueryFromUrl,
  updateDirectorySearchParams,
} from '@/lib/tools/directory';
import { getDetailedCategoryDisplays, getCategoryMeta, ALL_CATEGORIES } from '@/lib/categories';
import { ToolCatalogCard } from './ToolCatalogCard';
import { ToolsDirectoryHero } from './directory/ToolsDirectoryHero';
import { AvailableNowSection } from './directory/AvailableNowSection';
import { CategoryGridSection } from './directory/CategoryGridSection';
import { RoadmapContextSection } from './directory/RoadmapContextSection';
import Button from '@/components/ui/Button';

interface ToolCatalogViewProps {
  catalog: ToolCatalogProjectionEntry[];
}

export function ToolCatalogView({ catalog }: ToolCatalogViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearch = searchParams.toString();

  // Single source of truth from URL searchParams
  const urlQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || '';
  const selectedPhase = searchParams.get('phase') || '';
  const selectedStatus = getDirectoryStatusFilter(searchParams.get('status'));
  const selectedMode = searchParams.get('mode') || '';

  // Local state for search input
  const [localQueryState, setLocalQueryState] = useState(urlQuery);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(
    Boolean(selectedPhase || selectedMode)
  );
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observedUrlSearchRef = useRef(urlSearch);
  const latestUrlSearchRef = useRef(urlSearch);
  const searchRevisionRef = useRef(0);

  const clearPendingSearchTimer = useCallback(() => {
    if (searchTimerRef.current !== null) {
      clearTimeout(searchTimerRef.current);
      searchTimerRef.current = null;
    }
  }, []);

  const invalidatePendingSearchUpdate = useCallback(() => {
    searchRevisionRef.current += 1;
    clearPendingSearchTimer();
  }, [clearPendingSearchTimer]);

  const navigateWithParams = useCallback(
    (
      updates: Record<string, string | null | undefined>,
      historyMode: 'push' | 'replace' = 'push'
    ) => {
      invalidatePendingSearchUpdate();

      const currentSearch = latestUrlSearchRef.current;
      const nextSearch = updateDirectorySearchParams(currentSearch, updates);

      if (nextSearch === currentSearch) {
        return false;
      }

      latestUrlSearchRef.current = nextSearch;
      const targetPath = nextSearch ? `${pathname}?${nextSearch}` : pathname;

      if (historyMode === 'replace') {
        router.replace(targetPath, { scroll: false });
      } else {
        router.push(targetPath, { scroll: false });
      }

      return true;
    },
    [invalidatePendingSearchUpdate, pathname, router]
  );

  // URL navigation is authoritative. A single effect either synchronizes local
  // input from the new URL or schedules the current local draft for commit.
  useEffect(() => {
    clearPendingSearchTimer();

    const previousUrlSearch = observedUrlSearchRef.current;
    if (previousUrlSearch !== urlSearch) {
      observedUrlSearchRef.current = urlSearch;
      latestUrlSearchRef.current = urlSearch;
      searchRevisionRef.current += 1;
      setLocalQueryState((currentQuery) =>
        synchronizeDirectoryQueryFromUrl(currentQuery, previousUrlSearch, urlSearch)
      );
      return;
    }

    if (localQueryState.trim() === urlQuery.trim()) {
      return;
    }

    const scheduledRevision = searchRevisionRef.current;
    const scheduledUrlSearch = urlSearch;
    const timer = setTimeout(() => {
      if (
        !isDirectorySearchUpdateCurrent(
          scheduledUrlSearch,
          latestUrlSearchRef.current,
          scheduledRevision,
          searchRevisionRef.current
        )
      ) {
        return;
      }

      searchTimerRef.current = null;
      navigateWithParams({ q: localQueryState }, 'replace');
    }, 300);

    searchTimerRef.current = timer;

    return () => {
      clearTimeout(timer);
      if (searchTimerRef.current === timer) {
        searchTimerRef.current = null;
      }
    };
  }, [
    clearPendingSearchTimer,
    localQueryState,
    navigateWithParams,
    urlQuery,
    urlSearch,
  ]);

  // Popstate fires before the Next.js search-param snapshot updates, so pending
  // timers are invalidated synchronously and cannot overwrite Back/Forward.
  useEffect(() => {
    const handlePopState = () => {
      latestUrlSearchRef.current = window.location.search.replace(/^\?/, '');
      invalidatePendingSearchUpdate();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      clearPendingSearchTimer();
    };
  }, [clearPendingSearchTimer, invalidatePendingSearchUpdate]);

  const localQuery = localQueryState;

  // Derived counts
  const totalCount = catalog.length;
  const productionTools = useMemo(
    () => catalog.filter((t) => t.implementationStatus === 'production'),
    [catalog]
  );
  const availableCount = productionTools.length;
  const plannedCount = totalCount - availableCount;

  const categoryDisplays = useMemo(
    () => getDetailedCategoryDisplays(catalog),
    [catalog]
  );

  const focusDirectory = useCallback(() => {
    const directoryEl = document.getElementById('all-tools');
    if (directoryEl) {
      directoryEl.focus({ preventScroll: true });
      directoryEl.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, []);

  const navigateAndFocusDirectory = useCallback(
    (updates: Record<string, string | null | undefined>) => {
      const didNavigate = navigateWithParams(updates);

      if (!didNavigate) {
        focusDirectory();
        return;
      }

      window.setTimeout(focusDirectory, 100);
    },
    [focusDirectory, navigateWithParams]
  );

  // Discrete filter actions create restorable history entries.
  const handleCategorySelect = (catKey: string) => {
    navigateAndFocusDirectory({ category: catKey });
  };

  const handleStatusTabSelect = (statusValue: string) => {
    navigateWithParams({ status: statusValue });
  };

  const handleClearQuery = () => {
    invalidatePendingSearchUpdate();
    setLocalQueryState('');
    navigateWithParams({ q: '' });
  };

  const resetAllFilters = () => {
    invalidatePendingSearchUpdate();
    setLocalQueryState('');
    navigateWithParams({
      q: null,
      category: null,
      phase: null,
      status: null,
      mode: null,
    });
  };

  const handleExampleClick = (ex: { type: 'route' | 'query'; value: string }) => {
    if (ex.type === 'query') {
      invalidatePendingSearchUpdate();
      setLocalQueryState(ex.value);
      navigateAndFocusDirectory({ q: ex.value });
    }
  };

  // Filtered and Sorted catalog tools
  const filteredTools = useMemo(
    () =>
      filterAndSortDirectoryTools(catalog, {
        query: localQuery,
        category: selectedCategory,
        phase: selectedPhase,
        status: selectedStatus,
        mode: selectedMode,
      }),
    [catalog, localQuery, selectedCategory, selectedMode, selectedPhase, selectedStatus]
  );

  const hasActiveFilters = Boolean(
    localQuery || selectedCategory || selectedPhase || selectedStatus || selectedMode
  );

  // Grouped tools by category when NO filter/search/category is active
  const groupedCategorySections = useMemo(() => {
    if (hasActiveFilters) return [];

    return ALL_CATEGORIES.map((catKey) => {
      const catMeta = getCategoryMeta(catKey);
      const toolsInCat = catalog.filter((t) => t.category === catKey);
      return {
        key: catKey,
        label: catMeta.label,
        description: catMeta.description,
        tools: toolsInCat,
      };
    }).filter((group) => group.tools.length > 0);
  }, [catalog, hasActiveFilters]);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* SECTION A: TOOLS HERO */}
      <ToolsDirectoryHero
        totalCount={totalCount}
        availableCount={availableCount}
        plannedCount={plannedCount}
        categoryCount={categoryDisplays.length}
        searchQuery={localQuery}
        onSearchChange={(val) => setLocalQueryState(val)}
        onSearchClear={handleClearQuery}
        onExampleClick={handleExampleClick}
      />

      {/* SECTION B: AVAILABLE NOW (Visible when no specific planned-only status filter is active) */}
      {selectedStatus !== 'planned' && !localQuery && !selectedCategory && (
        <AvailableNowSection tools={productionTools} />
      )}

      {/* SECTION C: BROWSE BY CATEGORY */}
      <CategoryGridSection
        categories={categoryDisplays}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {/* SECTION D: ALL TOOLS DIRECTORY */}
      <section
        id="all-tools"
        aria-labelledby="all-tools-heading"
        tabIndex={-1}
        className="space-y-6 pt-4 scroll-mt-24 outline-none"
      >
        {/* Header & Derived Counter Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2
              id="all-tools-heading"
              className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight"
            >
              All tools
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Browse {totalCount} tools: {availableCount} available now and {plannedCount} currently on the roadmap.
            </p>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetAllFilters}
              className="text-xs self-start sm:self-auto min-h-[44px]"
            >
              Reset All Filters
            </Button>
          )}
        </div>

        {/* Status Filter Tabs & Advanced Filters Disclosure Row */}
        <div className="bg-surface-0 border border-border-default rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Primary Status Tabs */}
            <div className="grid w-full grid-cols-3 gap-1.5 p-1 bg-surface-100 dark:bg-surface-200 rounded-xl sm:w-auto">
              <button
                type="button"
                onClick={() => handleStatusTabSelect('')}
                aria-pressed={!selectedStatus}
                className={`px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold leading-tight transition-all min-h-[44px] ${
                  !selectedStatus
                    ? 'bg-surface-0 text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                All ({totalCount})
              </button>

              <button
                type="button"
                onClick={() => handleStatusTabSelect('production')}
                aria-pressed={selectedStatus === 'production'}
                className={`px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold leading-tight transition-all min-h-[44px] flex items-center justify-center gap-1.5 ${
                  selectedStatus === 'production'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Available ({availableCount})
              </button>

              <button
                type="button"
                onClick={() => handleStatusTabSelect('planned')}
                aria-pressed={selectedStatus === 'planned'}
                className={`px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold leading-tight transition-all min-h-[44px] ${
                  selectedStatus === 'planned'
                    ? 'bg-surface-0 text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Coming Soon ({plannedCount})
              </button>
            </div>

            {/* Advanced Filters Toggle Button */}
            <button
              type="button"
              onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
              aria-expanded={isAdvancedFiltersOpen}
              aria-controls="advanced-tools-filters"
              className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-text-primary px-3 py-2 rounded-xl bg-surface-50 border border-border-default transition-colors min-h-[44px] self-start sm:self-auto"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Advanced Filters
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isAdvancedFiltersOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Advanced Filters Panel */}
          {isAdvancedFiltersOpen && (
            <div
              id="advanced-tools-filters"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle text-xs"
            >
              {/* Phase Filter */}
              <div>
                <label htmlFor="phase-select" className="block text-[11px] font-medium text-text-tertiary mb-1">
                  Development Phase
                </label>
                <select
                  id="phase-select"
                  value={selectedPhase}
                  onChange={(e) => navigateWithParams({ phase: e.target.value })}
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

              {/* Processing Mode Filter */}
              <div>
                <label htmlFor="mode-select" className="block text-[11px] font-medium text-text-tertiary mb-1">
                  Processing Mode
                </label>
                <select
                  id="mode-select"
                  value={selectedMode}
                  onChange={(e) => navigateWithParams({ mode: e.target.value })}
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
          )}

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="pt-3 border-t border-border-subtle flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-text-tertiary mr-1">Active filters:</span>

              {localQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-200 font-medium text-text-primary border border-border-default">
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
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-200 font-medium text-text-primary border border-border-default">
                  Category: {getCategoryMeta(selectedCategory as ToolCategory)?.label || selectedCategory}
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

              {selectedStatus && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-200 font-medium text-text-primary border border-border-default">
                  Status: {getDirectoryStatusLabel(selectedStatus)}
                  <button
                    type="button"
                    onClick={() => handleStatusTabSelect('')}
                    aria-label="Remove status filter"
                    className="hover:text-rose-600 font-bold ml-0.5 p-0.5"
                  >
                    ✕
                  </button>
                </span>
              )}

              {selectedPhase && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-200 font-medium text-text-primary border border-border-default">
                  Phase: {selectedPhase.replace('phase-', 'Phase ').replace('-', ': ')}
                  <button
                    type="button"
                    onClick={() => navigateWithParams({ phase: '' })}
                    aria-label="Remove phase filter"
                    className="hover:text-rose-600 font-bold ml-0.5 p-0.5"
                  >
                    ✕
                  </button>
                </span>
              )}

              {selectedMode && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-200 font-medium text-text-primary border border-border-default">
                  Mode: {selectedMode}
                  <button
                    type="button"
                    onClick={() => navigateWithParams({ mode: '' })}
                    aria-label="Remove mode filter"
                    className="hover:text-rose-600 font-bold ml-0.5 p-0.5"
                  >
                    ✕
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Directory Results Header */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-text-secondary">
          <span>
            Showing <strong className="text-text-primary">{filteredTools.length}</strong> of{' '}
            <strong className="text-text-primary">{totalCount}</strong> tools
          </span>
          {hasActiveFilters && (
            <span className="text-xs font-medium text-text-tertiary">Filtered Directory View</span>
          )}
        </div>

        {/* Accessible Empty State */}
        {filteredTools.length === 0 && (
          <div className="bg-surface-0 border border-border-default rounded-3xl p-10 sm:p-14 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-surface-100 dark:bg-surface-200 flex items-center justify-center mx-auto text-xl text-text-tertiary">
              🔍
            </div>
            <h3 className="font-semibold text-text-primary text-lg">No matching tools found</h3>
            <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
              We couldn&apos;t find any tools matching your search query or active filter parameters. Try clearing filters or searching for terms like &quot;word&quot;, &quot;case&quot;, or &quot;PDF&quot;.
            </p>
            <Button variant="secondary" size="md" onClick={resetAllFilters}>
              Reset All Filters
            </Button>
          </div>
        )}

        {/* Unified Tool Grid (When search or filters are active) */}
        {hasActiveFilters && filteredTools.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredTools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.slug}`} className="block group">
                <ToolCatalogCard tool={tool} />
              </Link>
            ))}
          </div>
        )}

        {/* Sectioned Category Results (When NO search/filters/category active) */}
        {!hasActiveFilters && groupedCategorySections.length > 0 && (
          <div className="space-y-10 pt-4">
            {groupedCategorySections.map((group) => (
              <div key={group.key} className="space-y-4">
                <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">{group.label}</h3>
                    <p className="text-xs text-text-tertiary">{group.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect(group.key)}
                    className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    View all {group.tools.length} →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {group.tools.slice(0, 8).map((tool) => (
                    <Link key={tool.id} href={`/tools/${tool.slug}`} className="block group">
                      <ToolCatalogCard tool={tool} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION E: ROADMAP CONTEXT */}
      <RoadmapContextSection />
    </div>
  );
}
