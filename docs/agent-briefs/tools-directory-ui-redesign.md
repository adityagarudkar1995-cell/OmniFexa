# Tools Directory UI Redesign Agent Brief

## Overview
This brief documents the complete user-focused UI/UX redesign of the public OmniFexa `/tools` directory.

## Problems Addressed
1. **Header Overlap**: Resolved vertical content clipping underneath the sticky header on direct page load across all viewports.
2. **Stale "Everything is Planned" Copy**: Removed outdated copy stating all 187 tools are planned. Accurately reflects 2 available browser tools and 185 roadmap tools.
3. **Category Scrollbar**: Replaced native horizontal pill scrollbars with a responsive 15-category grid.
4. **Card Noise**: Redesigned tool catalog cards to emphasize public utility and availability over raw engineering terminology.

## New Page Information Architecture
1. **Tools Hero**:
   - Eyebrow: *"Every Tool. One Workspace."*
   - H1: *"Find the right tool for the job"*
   - Description & 4 data-driven summary cards (Available Now, On Roadmap, Categories, Privacy-First design principle).
   - Search bar (`id="hero-search"`) with quick example search triggers.
2. **Available Now Section**:
   - Prominently showcases production tools (`word-character-counter`, `case-converter`) with `Available` badges, `Runs in your browser` privacy labels, and direct `Open Tool →` actions.
3. **Browse by Category Grid**:
   - 15 category cards with icons, total tool counts, live tool counts, and one-line descriptions.
4. **All Tools Directory**:
   - Derived count header (*"Browse 187 tools: 2 available now and 185 currently on the roadmap."*).
   - Primary status tabs (`All (187)`, `Available (2)`, `Coming Soon (185)`).
   - Collapsible Advanced Filters (Phase, Mode).
   - Available-first sorting (Production -> Featured Planned -> Alphabetical).
   - Sectioned category view when unfiltered.
5. **Roadmap Context**:
   - Explains phased release strategy, functional availability, local browser processing, and no compulsory registration.

## Product Truth & Compliance
- Production tools: 2 (`word-character-counter`, `case-converter`).
- Planned tools: 185.
- Categories: 15.
- Indexing & Sitemap: 2 production tool routes indexable; 185 planned routes strictly noindex.
