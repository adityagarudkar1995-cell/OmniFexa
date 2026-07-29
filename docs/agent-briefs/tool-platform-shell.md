# Agent Brief — Tool Platform Shell & Universal Result Workspace

**Feature:** Tool Catalog, Dynamic Tool Routes, SEO Indexing Guardrails, and Universal Result Workspace Shell  
**Phase:** Phase 1 Foundation / Phase 2 Infrastructure  
**Status:** Implemented & Hardened

---

## Scope & Purpose
Establishes the core tool routing architecture, tool metadata display, SEO indexing safety controls, and the Universal Result Workspace adapter foundation for OmniFexa.

---

## Owned Files & Modules

### Routes
- `src/app/tools/page.tsx` — Tool catalog index page with honest metadata and Suspense-wrapped `ToolCatalogView`.
- `src/app/tools/[slug]/page.tsx` — Static pre-rendered individual tool page (`generateStaticParams`) with metadata, breadcrumbs, planned status banner, format list, metadata panel, workspace interface preview, and related tools.
- `src/app/robots.ts` — Crawling rules allowing `/tools` and `/tools/[slug]`.
- `src/app/sitemap.ts` — Dynamic sitemap containing `/` and `/tools`. Strictly excludes non-released planned tools.

### Core Data & Libraries
- `src/data/result-adapter-registry.json` — Single canonical JSON registry defining all 7 workspace adapter contracts.
- `src/lib/tools/projection.ts` — Shared serializable catalog projection type (`ToolCatalogProjectionEntry`) and creator (`createCatalogProjection`).
- `src/lib/seo/indexing.ts` — `isToolIndexable(tool)`, `getToolRobotsMetadata(tool)` (enforces `noindex, nofollow` for all 187 planned tools), `getToolCanonicalPath(tool)`.
- `src/lib/result-workspace/types.ts` & `registry.ts` — Workspace contracts and registry loader consuming `result-adapter-registry.json`.

### Components
- `src/components/tools/ToolCatalogView.tsx` — Interactive catalog filtering UI island (only component with `'use client'`) supporting 5 URL-synced filters (`q`, `category`, `phase`, `status`, `mode`) via `router.replace`.
- `src/components/tools/ToolCatalogCard.tsx` — Dedicated Server Component catalog card consuming `ToolCatalogProjectionEntry`.
- `src/components/tools/ToolBreadcrumbs.tsx`, `ToolHeader.tsx`, `ToolMetadataPanel.tsx`, `ToolFormatList.tsx`, `ToolPrivacyNotice.tsx`, `PlannedToolState.tsx`, `RelatedTools.tsx`.
- `src/components/result-workspace/ResultWorkspaceShell.tsx`, `ResultWorkspaceHeader.tsx`, `ResultWorkspaceToolbar.tsx`, `ResultWorkspaceCanvas.tsx`, `ResultWorkspaceStatus.tsx`, `ResultWorkspaceActions.tsx`, `ResultWorkspaceError.tsx` — Server Components with natively disabled preview controls.

---

## Validation Commands
```bash
npm run validate:catalog
npm run validate:adapters
npm run lint
npm run typecheck
npm run build
npm run check
```
