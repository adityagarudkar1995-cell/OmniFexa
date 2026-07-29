import type { ProcessingMode, ResultAdapter, ImplementationStatus } from '@/lib/tools/types';
import IMPLEMENTATION_REGISTRY_JSON from '@/data/tool-implementation-registry.json';

export interface ToolImplementationEntry {
  slug: string;
  implementationKey: string;
  componentFile: string;
  resultAdapter: ResultAdapter;
  processingMode: ProcessingMode;
  releasedStatus: ImplementationStatus;
  releasedAt: string;
}

export const TOOL_IMPLEMENTATION_REGISTRY: Record<string, ToolImplementationEntry> =
  IMPLEMENTATION_REGISTRY_JSON as Record<string, ToolImplementationEntry>;

/**
 * Checks if a given tool slug has a registered implementation (rejects prototype properties).
 */
export function isToolImplemented(slug: string): boolean {
  return (
    typeof slug === 'string' &&
    Object.prototype.hasOwnProperty.call(TOOL_IMPLEMENTATION_REGISTRY, slug)
  );
}

/**
 * Retrieves the implementation entry for a given tool slug.
 */
export function getToolImplementation(slug: string): ToolImplementationEntry | null {
  if (!isToolImplemented(slug)) {
    return null;
  }
  return TOOL_IMPLEMENTATION_REGISTRY[slug];
}
