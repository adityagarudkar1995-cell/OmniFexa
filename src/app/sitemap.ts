import type { MetadataRoute } from 'next';
import { toolCatalog } from '@/lib/tools/catalog';
import { isToolIndexable } from '@/lib/seo/indexing';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? siteConfig.url.production
      : siteConfig.url.development;

  // Base indexable platform routes
  const routes: MetadataRoute.Sitemap = [
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

  // Dynamically include only released indexable tools (production / beta / alpha)
  const indexableTools = toolCatalog.filter(isToolIndexable);

  for (const tool of indexableTools) {
    routes.push({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  return routes;
}
