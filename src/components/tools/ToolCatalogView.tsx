'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

import type { ToolCategory } from '@/lib/tools/types';
import type { ToolCatalogProjectionEntry } from '@/lib/tools/projection';
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

  // Single source of truth from URL searchParams
  const urlQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || '';
  const selectedPhase = searchParams.get('phase') || '';
  const selectedStatus = searchParams.get('status') || '';
  const selectedMode = searchParams.get('mode') || '';

  // Local state for search input
  const [localQueryState, setLocalQueryState] = useState(urlQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(
    Boolean(selectedPhase || selectedMode)
  );

  // Sync local typing state during render if URL query changes externally (Back/Forward)
  if (prevUrlQuery !== urlQuery) {
    setPrevUrlQuery(urlQuery);
    setLocalQueryState(urlQuery);
  }

  const localQuery = localQueryState;

  // Single parameter updater maintaining other searchParams
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

  // 300ms debounced free-text search update
  useEffect(() => {
    if (localQuery.trim() === urlQuery.trim()) {
      return;
    }

    const timer = setTimeout(() => {
      setSingleParam('q', localQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, urlQuery, setSingleParam]);

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

  // Category selection handler with smooth scroll to directory section
  const handleCategorySelect = (catKey: string) => {
    setSingleParam('category', catKey);
    const directoryEl = document.getElementById('all-tools');
    if (directoryEl) {
      directoryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStatusTabSelect = (statusValue: string) => {
    setSingleParam('status', statusValue);
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

  const handleExampleClick = (ex: { type: 'route' | 'query'; value: string }) => {
    if (ex.type === 'query') {
      setLocalQueryState(ex.value);
      setSingleParam('q', ex.value);
      const searchEl = document.getElementById('all-tools');
      if (searchEl) {
        searchEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Filtered and Sorted catalog tools
  const filteredTools = useMemo(() => {
    const q = localQuery.toLowerCase().trim();

    const filtered = catalog.filter((tool) => {
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

    // Default sorting: Production tools first -> Featured planned tools next -> Alphabetical fallback
    return [...filtered].sort((a, b) => {
      const aProd = a.implementationStatus === 'production';
      const bProd = b.implementationStatus === 'production';
      if (aProd && !bProd) return -1;
      if (!aProd && bProd) return 1;

      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      return a.name.localeCompare(b.name);
    });
  }, [catalog, localQuery, selectedCategory, selectedPhase, selectedStatus, selectedMode]);

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
      <section id="all-tools" className="space-y-6 pt-4 scroll-mt-24">
        {/* Header & Derived Counter Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
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
            <div className="flex items-center gap-1.5 p-1 bg-surface-100 dark:bg-surface-200 rounded-xl overflow-x-auto">
              <button
                type="button"
                onClick={() => handleStatusTabSelect('')}
                aria-pressed={!selectedStatus}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all min-h-[40px] ${
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all min-h-[40px] flex items-center gap-1.5 ${
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all min-h-[40px] ${
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle text-xs">
              {/* Phase Filter */}
              <div>
                <label htmlFor="phase-select" className="block text-[11px] font-medium text-text-tertiary mb-1">
                  Development Phase
                </label>
                <select
                  id="phase-select"
                  value={selectedPhase}
                  onChange={(e) => setSingleParam('phase', e.target.value)}
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
                  onChange={(e) => setSingleParam('mode', e.target.value)}
                  className="w-full bg-surface-50 border border-border-default rounded-xl px-3 py-2 text-text-secondary focus:outline-none focus:border-primary-500 min-h-[44px]"
                >
                  <option value="">All Processing Modes</option>
                  <option value="client">Client (Browser On-Device)</option>
                  <option value="server">Server Processing</option>
                  <option value="hybrid">Hybrid</option>
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
                  Status: {selectedStatus === 'production' ? 'Available' : 'Coming Soon'}
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
                    onClick={() => setSingleParam('phase', '')}
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
                    onClick={() => setSingleParam('mode', '')}
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
