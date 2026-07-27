# ADR 0005: Mobile and Desktop Parity

**Status:** Accepted

## Context
Many document/image tool platforms are designed primarily for desktop use, offering a degraded or unusable experience on mobile devices.

## Decision
Mobile and desktop are treated as equally important platforms. The application must use mobile-first design principles, responsive layouts, and touch-friendly interactions across all tools.

## Consequences
- **Positive**: Addresses a massive market segment, especially in regions like India where mobile is often the primary computing device.
- **Negative**: Requires significantly more design and development effort to make complex UI (like image editing or PDF annotation) work well on small screens.

## Risks
Highly complex tools (like the screenshot editor or whiteboard) are inherently challenging on small touch screens. We may need to build simplified, mobile-specific UI variants for these features to ensure usability.
