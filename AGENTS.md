# Antigravity Coding-Agent Instructions for OmniFexa

## Project Overview
OmniFexa is a mobile-first, desktop-ready, privacy-first online tools platform.
**Tagline:** Every Tool. One Workspace.

## Tech Stack
- Next.js 16 App Router
- TypeScript strict
- Tailwind CSS v4
- ESLint
- npm

## Key Architecture Concepts
- **Result Workspace**: Adapters for pdf, image, text, code, simple, media, whiteboard.
- **Client-first Processing**: Processing stays on device whenever possible.
- **SEO per Tool**: Every tool has its own dedicated SEO route.

## Directory Structure Overview
- `src/app`: Routes
- `src/config`: Site config
- `src/data`: Tool catalog JSON
- `src/lib/tools`: Catalog types and loader

## Development Rules
- Inspect before edit
- Plan before implement
- One scoped task per commit
- Lint, typecheck, and build must pass before commit
- Browser and mobile testing required
- No secrets in code

## References
Refer agents to `docs/` for detailed documentation and `.agents/rules/` for enforced rules.
