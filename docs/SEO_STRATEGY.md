# SEO Strategy

## Routing
- Dedicated tool routes for all catalog entries: `/tools/[slug]`
- Catalog listing & discovery page: `/tools`
- Dynamic category filter URLs: `/tools?category=[category]`

## Metadata & Indexing Guardrails
- **Per-tool SEO metadata**: Unique title, detailed description, and targeted keywords (including Hinglish phrases) for every tool.
- **Page-Level Noindex Guardrail**: Planned individual tool routes (`implementationStatus: "planned"`) emit `robots: { index: false, follow: false }` metadata. Search engines are permitted to crawl the routes to read this header.
- **Sitemap Exclusion**: `sitemap.xml` strictly includes only released indexable pages (`/` and `/tools`). All 187 planned tool routes are excluded until their status transitions to `alpha`, `beta`, or `production`.

## Best Practices
- **No thin pages**: Tools must have substantial accompanying content, metadata panels, format specifications, and privacy guarantees.
- **No keyword stuffing**: Content is natural, helpful, and user-focused.
- **Honesty**: No fabricated ratings, reviews, download counts, or fake availability claims.
- **Performance**: Strict optimization for Core Web Vitals using Next.js static page pre-rendering (`generateStaticParams`).

## Market Focus
- Incorporate Hinglish keywords (`pdf compress kaise kare`, `photo se text nikale`, etc.) to effectively serve the Indian market.
