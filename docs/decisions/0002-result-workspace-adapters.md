# ADR 0002: Result Workspace Adapters

**Status:** Accepted

## Context
OmniFexa outputs different result types (PDFs, images, text, code, simple strings). We need a unified but type-specific review and edit experience before the user downloads the result.

## Decision
Implement the "Result Workspace" using the adapter pattern. We will have 7 primary adapters: `pdf`, `image`, `text`, `code`, `simple`, `media`, and `whiteboard`. Each adapter provides its own type-specific UI within the shared workspace shell.

## Consequences
- **Positive**: Consistent UX across all tools. Each adapter can be developed and optimized independently. New result types can be added easily in the future.
- **Negative**: Adds architectural complexity upfront.

## Risks
Adapter interfaces could become overly complex if not clearly defined early on. We must maintain a strict boundary between the shared workspace controls (download, share) and the adapter-specific controls.
