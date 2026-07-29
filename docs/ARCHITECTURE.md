# Technical Architecture

## Structure
Built on **Next.js App Router**.

## Route Design
- `/`: Homepage with hero search, popular tools, category explorer, screenshot editor showcase, and trust features.
- `/tools`: Catalog index listing all 187 tools with interactive category, phase, processing mode, and search filtering.
- `/tools/[slug]`: Individual pre-rendered static tool pages (e.g., `/tools/compress-pdf`, `/tools/screenshot-editor`).

## Client/Server Boundary
- Explicit split between client and server processing.
- **Server Components**: Used by default for static pages, layouts, catalog indexing, breadcrumbs, metadata panels, and SEO metadata generation.
- **Client Components**: Used strictly for interactive islands:
  - Tool search input and suggestions dropdown (`SearchBox`, `SearchSuggestions`).
  - Interactive catalog filtering and state controls (`ToolCatalogView`).
  - Theme toggling (`ThemeToggle`, `ThemeProvider`).
  - Mobile drawer navigation (`MobileNav`).
- **Client-Side Processing (Planned)**: Preferred default for privacy and speed. Utilizes Web APIs, Canvas, WebAssembly.
- **Server-Side Processing (Planned)**: API routes handle operations requiring heavy compute, large AI models, or complex document conversions.

## Result Workspace Architecture
- Follows the **Adapter Pattern**.
- 7 canonical workspace adapters registered: `pdf`, `image`, `text`, `code`, `simple`, `media`, `whiteboard`.
- Outputs from processors are routed to specific UI adapters (e.g., PDF viewer with annotation tools, canvas-based image editor, syntax-highlighted code editor).
- Decouples processing logic from result presentation and multi-format export.

## Data Flow
1. **Upload**: User selects file(s) or enters input.
2. **Processor**: Handled either entirely in browser (Client) or sent to Next.js API route/Backend (Server).
3. **Result Workspace**: Opens with the generated output using the appropriate adapter.
4. **Export**: User applies final tweaks (if any) and downloads/shares.

## State Management
- React context/hooks for local state (`ThemeProvider`, search state).
- No external state library (like Redux or Zustand) yet, keeping bundle size minimal.

## SEO Indexing Guardrails
- **Page-level Noindex**: All 187 planned tool routes emit `robots: { index: false, follow: false }` metadata.
- **Sitemap Exclusion**: Planned tool routes are excluded from `sitemap.xml` until released in production status (`alpha`, `beta`, or `production`).
- **Robots.txt**: Crawlers are allowed access to `/tools` and `/tools/[slug]` to read page-level `noindex` headers.
