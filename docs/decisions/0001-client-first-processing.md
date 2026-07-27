# ADR 0001: Client-First Processing

**Status:** Accepted

## Context
OmniFexa processes files (documents, images). We need to decide where this processing happens (client vs. server).

## Decision
Default to client-side processing in the browser. Use server processing *only* when technically required (e.g., PDF-to-Office conversion, AI inference, OCR with large models, complex audio/video processing).

## Consequences
- **Positive**: Better privacy for users, significantly lower server costs, enables offline capability for some tools.
- **Negative**: Limited by browser capabilities and memory limits on low-end devices.

## Risks
Some operations may be too slow or simply impossible in the browser (e.g., heavy PDF generation). We need a fallback path to the server for these cases.
