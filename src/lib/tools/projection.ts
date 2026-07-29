import type {
  ToolCategory,
  Phase,
  ProcessingMode,
  ResultAdapter,
  ImplementationStatus,
  ToolEntry,
} from '@/lib/tools/types';

/**
 * Shared, serializable catalog projection model for catalog browsing and filter rendering.
 * Prevents passing full tool catalog objects across server/client boundaries.
 */
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
  implementationStatus: ImplementationStatus;
  processingMode: ProcessingMode;
  resultAdapter: ResultAdapter;
  inputFormats: string[];
  outputFormats: string[];
  featured: boolean;
}

/**
 * Transforms an array of canonical ToolEntry objects into a lightweight projection array.
 */
export function createCatalogProjection(catalog: ToolEntry[]): ToolCatalogProjectionEntry[] {
  return catalog.map((tool) => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    shortDescription: tool.shortDescription,
    category: tool.category,
    subcategory: tool.subcategory,
    keywords: tool.keywords,
    hinglishKeywords: tool.hinglishKeywords,
    phase: tool.phase,
    implementationStatus: tool.implementationStatus,
    processingMode: tool.processingMode,
    resultAdapter: tool.resultAdapter,
    inputFormats: tool.inputFormats,
    outputFormats: tool.outputFormats,
    featured: tool.featured,
  }));
}
