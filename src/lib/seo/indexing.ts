import type { Metadata } from 'next';
import type { ToolEntry } from '@/lib/tools/types';
import { siteConfig } from '@/config/site';

/**
 * Checks if a tool should be indexed by search engines.
 * Only tools with released status ('production', 'beta', or 'alpha') are indexable.
 * Planned tools are strictly noindex.
 */
export function isToolIndexable(tool: ToolEntry): boolean {
  return (
    tool.implementationStatus === 'production' ||
    tool.implementationStatus === 'beta' ||
    tool.implementationStatus === 'alpha'
  );
}

/**
 * Generates appropriate robots metadata object for a tool page.
 */
export function getToolRobotsMetadata(tool: ToolEntry): Metadata['robots'] {
  if (isToolIndexable(tool)) {
    return {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    };
  }

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

/**
 * Gets the canonical path for a tool page.
 */
export function getToolCanonicalPath(tool: ToolEntry): string {
  return `/tools/${tool.slug}`;
}

/**
 * Gets the absolute canonical URL for a tool page.
 */
export function getToolCanonicalUrl(tool: ToolEntry): string {
  return `${siteConfig.url}/tools/${tool.slug}`;
}
