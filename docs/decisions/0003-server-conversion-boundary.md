# ADR 0003: Server Conversion Boundary

**Status:** Accepted

## Context
While our default is client-side processing (ADR 0001), some conversions and operations simply cannot run reliably or at all in the browser.

## Decision
Server processing is explicitly required and permitted for:
- PDF ↔ Office document conversions (requires proprietary or heavy libraries).
- AI-powered tools (summarization, translation, chat).
- Advanced OCR (handwriting, multilingual requiring large models).
- Audio/video processing (ffmpeg-based tools).
- PDF rendering for highly complex layouts.

## Consequences
- **Positive**: Clear boundary helps in planning server infrastructure and managing expectations for client-side tool capabilities.
- **Negative**: Requires robust backend infrastructure and scaling strategies.

## Risks
Server costs could scale rapidly with usage. Latency and privacy concerns arise for files that must be sent to the server. Clear communication to the user about privacy is required for these tools.
