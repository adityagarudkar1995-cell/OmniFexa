'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import type { ToolCategory, Phase, ProcessingMode, ToolEntry } from '@/lib/tools/types';
import { getCategoryCounts } from '@/lib/categories';
import { ToolCard } from '@/components/ui/ToolCard';
import Button from '@/components/ui/Button';

export interface ToolCatalogProjectionEntry {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: ToolCategory;
  subcategory: string;
  keywords: string[];
  hinglishKeywords: string[];
  phase: Phase;
  implementationStatus: 'planned' | 'in-progress' | 'alpha' | 'beta' | 'production';
  processingMode: ProcessingMode;
  resultAdapter: 'pdf' | 'image' | 'text' | 'code' | 'simple' | 'media' | 'whiteboard';
  inputFormats: string[];
  outputFormats: string[];
  featured: boolean;
}

interface ToolCatalogViewProps {
  catalog: ToolCatalogProjectionEntry[];
  initialCategory?: string;
  initialQuery?: string;
  initialPhase?: string;
}

export function ToolCatalogView({
  catalog,
  initialCategory = '',
  initialQuery = '',
  initialPhase = '',
}: ToolCatalogViewProps) {
  const [query, setQuery] = useState(() => initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(() => initialCategory);
  const [selectedPhase, setSelectedPhase] = useState(() => initialPhase);
  const [selectedMode, setSelectedMode] = useState('');

  const categories = useMemo(() => getCategoryCounts(catalog), [catalog]);

  const filteredTools = useMemo(() => {
    const q = query.toLowerCase().trim();

    return catalog.filter((tool) => {
      // Category filter
      if (selectedCategory && tool.category !== selectedCategory) {
        return false;
      }

      // Phase filter
      if (selectedPhase && tool.phase !== selectedPhase) {
        return false;
      }

      // Mode filter
      if (selectedMode && tool.processingMode !== selectedMode) {
        return false;
      }

      // Search query filter
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
  }, [catalog, query, selectedCategory, selectedPhase, selectedMode]);

  const hasActiveFilters = Boolean(
    query || selectedCategory || selectedPhase || selectedMode
  );

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedPhase('');
    setSelectedMode('');
  };

  return (
    <div className="space-y-8">
      {/* Search & Filters Controls */}
      <div className="bg-surface-0 border border-border-default rounded-2xl p-6 shadow-sm space-y-4">
        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 187 tools by name, keywords, or Hinglish phrases..."
            className="w-full h-12 bg-surface-50 border border-border-default rounded-xl pl-11 pr-4 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary text-lg">
            🔍
          </span>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary text-xs font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills / Dropdowns */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Select Category */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
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
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
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

        {/* Phase & Processing Mode Secondary Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border-subtle text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Phase Dropdown */}
            <select
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
              className="bg-surface-50 border border-border-default rounded-lg px-2.5 py-1.5 text-text-secondary focus:outline-none focus:border-primary-500"
            >
              <option value="">All Roadmap Phases</option>
              <option value="phase-2-core-launch">Phase 2: Core Launch</option>
              <option value="phase-3-document-workflows">Phase 3: Document Workflows</option>
              <option value="phase-4-advanced-conversion">Phase 4: Advanced Conversion</option>
              <option value="phase-5-ai-tools">Phase 5: AI Tools</option>
              <option value="phase-6-media-and-growth">Phase 6: Media & Growth</option>
            </select>

            {/* Mode Dropdown */}
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="bg-surface-50 border border-border-default rounded-lg px-2.5 py-1.5 text-text-secondary focus:outline-none focus:border-primary-500"
            >
              <option value="">All Processing Modes</option>
              <option value="client">Client (Browser On-Device)</option>
              <option value="server">Server Processing</option>
              <option value="hybrid">Hybrid</option>
              <option value="research-required">Research Required</option>
            </select>
          </div>

          {/* Reset Filters Action */}
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs">
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <span>
          Showing <strong className="text-text-primary">{filteredTools.length}</strong> of{' '}
          <strong className="text-text-primary">{catalog.length}</strong> tools
        </span>
        {hasActiveFilters && (
          <span className="text-xs text-text-tertiary">Filtered catalog view</span>
        )}
      </div>

      {/* Empty State */}
      {filteredTools.length === 0 && (
        <div className="bg-surface-0 border border-border-default rounded-2xl p-12 text-center space-y-4">
          <div className="text-3xl">🔍</div>
          <h3 className="font-semibold text-text-primary text-lg">No matching tools found</h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            We couldn&apos;t find any tools matching your active search or filter selection. Try resetting filters or searching for alternative terms like &quot;PDF&quot;, &quot;image&quot;, or &quot;converter&quot;.
          </p>
          <Button variant="secondary" size="md" onClick={resetFilters}>
            Reset All Filters
          </Button>
        </div>
      )}

      {/* Tool Grid */}
      {filteredTools.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredTools.map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.slug}`} className="block group">
              <ToolCard tool={tool as unknown as ToolEntry} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
