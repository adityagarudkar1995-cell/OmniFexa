import type { ToolCatalogProjectionEntry } from './projection';

export const DIRECTORY_STATUS_LABELS = {
  production: 'Available',
  planned: 'Coming Soon',
} as const;

export type DirectoryStatus = keyof typeof DIRECTORY_STATUS_LABELS;

export interface DirectoryFilters {
  query?: string;
  category?: string;
  phase?: string;
  status?: string;
  mode?: string;
}

type DirectoryTool = Pick<
  ToolCatalogProjectionEntry,
  | 'name'
  | 'shortDescription'
  | 'keywords'
  | 'hinglishKeywords'
  | 'category'
  | 'phase'
  | 'implementationStatus'
  | 'processingMode'
  | 'featured'
>;

type SearchParamUpdate = string | null | undefined;

export function getDirectoryStatusFilter(value: string | null): DirectoryStatus | '' {
  return value === 'production' || value === 'planned' ? value : '';
}

export function getDirectoryStatusLabel(status: DirectoryStatus): string {
  return DIRECTORY_STATUS_LABELS[status];
}

export function updateDirectorySearchParams(
  currentSearch: string,
  updates: Record<string, SearchParamUpdate>
): string {
  const normalizedSearch = currentSearch.startsWith('?')
    ? currentSearch.slice(1)
    : currentSearch;
  const params = new URLSearchParams(normalizedSearch);

  for (const [key, value] of Object.entries(updates)) {
    const trimmedValue = value?.trim() ?? '';

    if (trimmedValue) {
      params.set(key, trimmedValue);
    } else {
      params.delete(key);
    }
  }

  return params.toString();
}

export function getDirectoryQueryFromSearch(search: string): string {
  const normalizedSearch = search.startsWith('?') ? search.slice(1) : search;
  return new URLSearchParams(normalizedSearch).get('q') ?? '';
}

/**
 * URL changes represent committed navigation state. When the URL snapshot changes,
 * its query replaces any uncommitted local draft; otherwise the draft is retained.
 */
export function synchronizeDirectoryQueryFromUrl(
  localQuery: string,
  previousUrlSearch: string,
  nextUrlSearch: string
): string {
  if (previousUrlSearch === nextUrlSearch) {
    return localQuery;
  }

  return getDirectoryQueryFromSearch(nextUrlSearch);
}

export function isDirectorySearchUpdateCurrent(
  scheduledUrlSearch: string,
  currentUrlSearch: string,
  scheduledRevision: number,
  currentRevision: number
): boolean {
  return (
    scheduledUrlSearch === currentUrlSearch &&
    scheduledRevision === currentRevision
  );
}

export function sortDirectoryTools<T extends DirectoryTool>(tools: readonly T[]): T[] {
  return [...tools].sort((a, b) => {
    const aProduction = a.implementationStatus === 'production';
    const bProduction = b.implementationStatus === 'production';

    if (aProduction && !bProduction) return -1;
    if (!aProduction && bProduction) return 1;

    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    return a.name.localeCompare(b.name);
  });
}

export function filterAndSortDirectoryTools<T extends DirectoryTool>(
  catalog: readonly T[],
  filters: DirectoryFilters
): T[] {
  const query = filters.query?.toLowerCase().trim() ?? '';

  const filtered = catalog.filter((tool) => {
    if (filters.category && tool.category !== filters.category) return false;
    if (filters.phase && tool.phase !== filters.phase) return false;
    if (filters.status && tool.implementationStatus !== filters.status) return false;
    if (filters.mode && tool.processingMode !== filters.mode) return false;

    if (!query) return true;

    const nameMatches = tool.name.toLowerCase().includes(query);
    const descriptionMatches = tool.shortDescription.toLowerCase().includes(query);
    const keywordMatches = tool.keywords.some((keyword) =>
      keyword.toLowerCase().includes(query)
    );
    const hinglishMatches = tool.hinglishKeywords.some((keyword) =>
      keyword.toLowerCase().includes(query)
    );

    return nameMatches || descriptionMatches || keywordMatches || hinglishMatches;
  });

  return sortDirectoryTools(filtered);
}
