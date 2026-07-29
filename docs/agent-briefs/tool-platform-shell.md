# Agent Brief — Tool Platform Shell & Universal Result Workspace

**Feature:** Tool Catalog, Dynamic Tool Routes, SEO Indexing Guardrails, and Universal Result Workspace Shell  
**Phase:** Phase 1 Foundation / Phase 2 Infrastructure  
**Status:** Implemented (Platform Shell & Contracts)

---

## Scope & Purpose
Establishes the core tool routing architecture, tool metadata display, SEO indexing safety controls, and the Universal Result Workspace adapter foundation for OmniFexa.

---

## Owned Files & Modules

### Routes
- `src/app/tools/page.tsx` — Tool catalog index page with interactive search, category, phase, and mode filtering.
- `src/app/tools/[slug]/page.tsx` — Static pre-rendered individual tool page (`generateStaticParams`) with metadata, breadcrumbs, planned status banner, format list, metadata panel, workspace interface preview, and related tools.
- `src/app/robots.ts` — Crawling rules allowing `/tools` and `/tools/[slug]`.
- `src/app/sitemap.ts` — Dynamic sitemap containing `/` and `/tools`. Strictly excludes non-released planned tools.

### Core Libraries & Utilities
- `src/lib/seo/indexing.ts` — `isToolIndexable(tool)`, `getToolRobotsMetadata(tool)` (enforces `noindex, nofollow` for all 187 planned tools), `getToolCanonicalPath(tool)`.
- `src/lib/result-workspace/types.ts` — Universal Result Workspace TypeScript contracts (workspace state, lifecycle, input, result, actions, export options, error, adapter capabilities).
- `src/lib/result-workspace/registry.ts` — Adapter registry mapping the 7 canonical result adapters (`pdf`, `image`, `text`, `code`, `simple`, `media`, `whiteboard`) to capability definitions and catalog validation.

### Components
- `src/components/tools/ToolCatalogView.tsx` — Interactive catalog filtering UI receiving a minimal serializable catalog projection.
- `src/components/tools/ToolBreadcrumbs.tsx`, `ToolHeader.tsx`, `ToolMetadataPanel.tsx`, `ToolFormatList.tsx`, `ToolPrivacyNotice.tsx`, `PlannedToolState.tsx`, `RelatedTools.tsx`.
- `src/components/result-workspace/ResultWorkspaceShell.tsx`, `ResultWorkspaceHeader.tsx`, `ResultWorkspaceToolbar.tsx`, `ResultWorkspaceCanvas.tsx`, `ResultWorkspaceStatus.tsx`, `ResultWorkspaceActions.tsx`, `ResultWorkspaceError.tsx`.

---

## Technical Constraints & Guardrails
1. **Noindex for Planned Tools:** All 187 catalog tools have `implementationStatus: "planned"`. Every `/tools/[slug]` page emits `robots: { index: false, follow: false }`.
2. **Sitemap Boundary:** Planned tool pages are strictly excluded from `sitemap.xml`.
3. **No Real Processing:** Processing engines are not connected in this task. Interface previews display a prominent notice: *"Interface preview — processing not connected"*.
4. **Deterministic Related Tools:** `RelatedTools` scores candidates strictly using category match, shared keywords, resultAdapter, and input/output format overlap.
5. **Validation Scripts:** `scripts/validate-tool-catalog.mjs` enforces kebab-case slugs and verifies resultAdapter mappings.

---

## Validation & Verification Commands
```bash
npm run validate:catalog
npm run lint
npm run typecheck
npm run build
npm run check
```
