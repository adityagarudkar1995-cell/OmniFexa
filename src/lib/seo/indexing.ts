import type { Metadata } from 'next';
import type { ToolEntry } from '@/lib/tools/types';
import { siteConfig } from '@/config/site';

/**
 * Returns whether a tool is eligible for search engine indexing.
 * Currently, only tools with status 'alpha', 'beta', or 'production' are indexable.
 * Planned tools MUST remain non-indexable to avoid thin/empty SEO pages.
 */
export function isToolIndexable(tool: ToolEntry): boolean {
  return (
    tool.implementationStatus === 'alpha' ||
    tool.implementationStatus === 'beta' ||
    tool.implementationStatus === 'production'
  );
}

/**
 * Returns Robots metadata for a tool page based on its indexing status.
 */
export function getToolRobotsMetadata(tool: ToolEntry): Metadata['robots'] {
  if (!isToolIndexable(tool)) {
    return {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    index: true,
    follow: true,
  };
}

/**
 * Returns the canonical URL path for a tool.
 */
export function getToolCanonicalPath(tool: ToolEntry): string {
  return `/tools/${tool.slug}`;
}

/**
 * Returns the absolute canonical URL for a tool.
 */
export function getToolCanonicalUrl(tool: ToolEntry): string {
  return `${siteConfig.url.production}/tools/${tool.slug}`;
}
