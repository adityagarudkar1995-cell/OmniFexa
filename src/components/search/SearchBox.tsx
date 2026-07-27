'use client';

import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { searchTools } from '@/lib/search';
import { toolCatalog } from '@/lib/tools/catalog';
import { SearchSuggestions } from './SearchSuggestions';
import { EmptySearchState } from './EmptySearchState';
import type { ToolEntry } from '@/lib/tools/types';

interface SearchBoxProps {
  size?: 'hero' | 'compact';
  autoFocus?: boolean;
}

export function SearchBox({ size = 'hero', autoFocus = false }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ToolEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isHero = size === 'hero';

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 0) {
      setResults(searchTools(val, toolCatalog));
      setIsOpen(true);
      setSelectedIndex(0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (_tool?: ToolEntry) => {
    void _tool;
    setToast(true);
    setTimeout(() => setToast(false), 2000);
    setIsOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setQuery('');
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative w-full mx-auto max-w-2xl">
      <div className={`relative flex items-center w-full bg-surface-0 border border-border-default shadow-md focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all ${isHero ? 'h-14 sm:h-16 rounded-2xl pl-12 pr-4' : 'h-12 rounded-xl pl-10 pr-4'}`}>
        <Search className={`absolute left-4 text-text-tertiary ${isHero ? 'w-6 h-6' : 'w-5 h-5'}`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search 187 tools..."
          className={`w-full bg-transparent outline-none placeholder:text-text-tertiary ${isHero ? 'text-base sm:text-lg' : 'text-sm'}`}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="search-results"
          aria-activedescendant={isOpen && results[selectedIndex] ? `search-result-${selectedIndex}` : undefined}
        />
      </div>

      {isOpen && query.length >= 2 && results.length === 0 && (
        <EmptySearchState query={query} />
      )}

      {isOpen && results.length > 0 && (
        <SearchSuggestions
          results={results}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
          query={query}
        />
      )}

      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-surface-900 text-surface-0 px-4 py-2 rounded-lg text-sm shadow-lg animate-in fade-in duration-300 z-50">
          Coming soon — in development
        </div>
      )}
    </div>
  );
}
