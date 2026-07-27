import type { ToolCatalog, ToolEntry } from './types';
import catalogData from '@/data/tool-catalog.json';

/**
 * The complete tool catalog, loaded from the canonical JSON source.
 */
export const toolCatalog: ToolCatalog = catalogData as ToolCatalog;

/** Get a tool by its unique slug */
export function getToolBySlug(slug: string): ToolEntry | undefined {
  return toolCatalog.find((tool) => tool.slug === slug);
}

/** Get a tool by its unique id */
export function getToolById(id: string): ToolEntry | undefined {
  return toolCatalog.find((tool) => tool.id === id);
}

/** Get all tools in a category */
export function getToolsByCategory(category: string): ToolEntry[] {
  return toolCatalog.filter((tool) => tool.category === category);
}

/** Get all tools in a specific phase */
export function getToolsByPhase(phase: string): ToolEntry[] {
  return toolCatalog.filter((tool) => tool.phase === phase);
}

/** Get all featured tools */
export function getFeaturedTools(): ToolEntry[] {
  return toolCatalog.filter((tool) => tool.featured);
}
