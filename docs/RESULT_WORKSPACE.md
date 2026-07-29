# Result Workspace Design

## Purpose
The Result Workspace is OmniFexa's core differentiator. Instead of immediately downloading a processed file, users get a unified review, edit, and export experience for all tool outputs.

## Adapter System & Registry
Each result type maps to one of 7 dedicated adapter contracts defined in `src/lib/result-workspace/registry.ts`:
- **`pdf`**: PDF viewer with page reordering, rotation, page deletion, and annotation overlays.
- **`image`**: Canvas-based editor for crop, resize, annotation, blur, and format export.
- **`text`**: Rich text editor with copy to clipboard, diff view, and text cleanup.
- **`code`**: Syntax-highlighted code editor for JSON, XML, YAML, HTML, CSS, JS, and SQL.
- **`simple`**: Formatted display card for calculator outputs, password generators, QR codes, and unit conversions.
- **`media`**: Audio/video player with timeline preview, waveform, trimming, and media compression options.
- **`whiteboard`**: Infinite canvas workspace for diagrams, sketches, flowcharts, and mind maps.

## Lifecycle
1. **`idle`**: Waiting for file upload or user input.
2. **`input-ready`**: Input data loaded and validated.
3. **`processing`**: Processing engine executing task.
4. **`ready`**: Output ready in workspace canvas.
5. **`error`**: Processing or rendering failure encountered.
6. **`cancelled`**: Operation aborted by user.

## Shared Controls
Consistent across all adapters:
- Format selector (primary format + alternative export extensions)
- Copy Output
- Download File
- Interface Preview banner when processing is disconnected

## Per-Adapter Capabilities
- **PDF**: Zoom/pan, page reordering, annotations, redaction.
- **Image**: Zoom/pan, cropping, annotations, blur/redaction, canvas export.
- **Text**: Text editing.
- **Code**: Syntax highlighting, code formatting.
- **Simple**: Copy result, calculator reset.
- **Media**: Timeline trimming, playback.
- **Whiteboard**: Canvas drawing, vector/raster export.

## Mobile Considerations
- Touch-friendly sizing for all controls (min 44px targets).
- Responsive, stackable layouts ensuring toolbars don't obscure content.

## Implementation Status
Universal Result Workspace contracts, TypeScript models, capability registry, and visual shell preview components (`ResultWorkspaceShell`) are fully established. Processing engines will be connected in Phase 2 feature implementations.
