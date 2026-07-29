# Technical Architecture

## Structure
Built on **Next.js App Router**.

## Route Design
- `/`: Homepage with hero search, popular tools, category explorer, screenshot editor showcase, and trust features.
- `/tools`: Catalog index listing all 187 tools with interactive category, phase, status, mode, and search filtering.
- `/tools/[slug]`: Individual pre-rendered static tool pages (e.g., `/tools/compress-pdf`, `/tools/screenshot-editor`).

## Client/Server Boundary
- Explicit split between client and server processing.
- **Server Components**: Used by default for static pages, layouts, catalog indexing, breadcrumbs, metadata panels, catalog cards (`ToolCatalogCard`), result workspace preview shell components (`ResultWorkspaceShell`, `Header`, `Toolbar`, `Actions`, `Canvas`), and SEO metadata generation.
- **Client Components**: Used strictly for interactive islands:
  - Catalog browsing and URL query synchronization island (`ToolCatalogView`).
  - Search input and suggestions dropdown (`SearchBox`, `SearchSuggestions`).
  - Theme toggling (`ThemeToggle`, `ThemeProvider`).
  - Mobile drawer navigation (`MobileNav`).

## Result Workspace Architecture
- Follows the **Adapter Pattern**.
- Single canonical JSON registry defined in `src/data/result-adapter-registry.json`.
- 7 canonical workspace adapters registered: `pdf`, `image`, `text`, `code`, `simple`, `media`, `whiteboard`.
- Preview controls are natively disabled until functional engines are connected in Phase 2.

## SEO Indexing Guardrails
- **Page-level Noindex**: All 187 planned tool routes emit `robots: { index: false, follow: false }` metadata.
- **Sitemap Exclusion**: Planned tool routes are excluded from `sitemap.xml` until released in production status (`alpha`, `beta`, or `production`).
- **Robots.txt**: Crawlers are allowed access to `/tools` and `/tools/[slug]` to read page-level `noindex` headers.
