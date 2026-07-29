import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Dynamic sitemap generator for OmniFexa.
 * Currently includes only public, indexable pages (Homepage and /tools catalog index).
 * Planned individual tool routes (/tools/[slug]) are strictly EXCLUDED until released.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.production;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];
}
