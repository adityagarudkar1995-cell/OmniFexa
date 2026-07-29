# Result Workspace Design

## Purpose
The Result Workspace is OmniFexa's core differentiator. Instead of immediately downloading a processed file, users get a unified review, edit, and export experience for all tool outputs.

## Canonical JSON Adapter Registry
All 7 result workspace adapter contracts are defined in a single canonical JSON file at `src/data/result-adapter-registry.json`:
- **`pdf`**: PDF viewer with page reordering, rotation, page deletion, and annotation overlays.
- **`image`**: Canvas-based editor for crop, resize, annotation, blur, and format export.
- **`text`**: Rich text editor with copy to clipboard, diff view, and text cleanup.
- **`code`**: Syntax-highlighted code editor for JSON, XML, YAML, HTML, CSS, JS, and SQL.
- **`simple`**: Formatted display card for calculator outputs, password generators, QR codes, and unit conversions.
- **`media`**: Audio/video player with timeline preview, waveform, trimming, and media compression options.
- **`whiteboard`**: Infinite canvas workspace for diagrams, sketches, flowcharts, and mind maps.

## Preview Control Hardening
During Phase 1, the Result Workspace operates in **interface preview mode**. All action buttons, selectors, and controls are natively disabled (`disabled={true}`, `aria-disabled="true"`) to prevent misleading users before functional processing engines are connected.

A prominent notice banner explicitly states:
`"Interface preview — processing and editing controls are not connected yet."`

## Implementation Status
Universal Result Workspace contracts, JSON registry, validator script (`npm run validate:adapters`), and Server Component preview components (`ResultWorkspaceShell`) are fully established.
