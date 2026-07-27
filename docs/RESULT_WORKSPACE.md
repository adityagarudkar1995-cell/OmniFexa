# Result Workspace Design

## Purpose
The Result Workspace is OmniFexa's core differentiator. Instead of immediately downloading a processed file, users get a unified review, edit, and export experience for all tool outputs.

## Adapter System
Each result type maps to a dedicated adapter, providing a specialized environment:
- **`pdf`**: PDF viewer with annotation overlays.
- **`image`**: Canvas-based editor for tweaks.
- **`text`**: Rich text editor for final polish.
- **`code`**: Syntax-highlighted editor for developer outputs.
- **`simple`**: Formatted display for calculator or generator results.
- **`media`**: Audio/video player and trimmer interface.
- **`whiteboard`**: Infinite canvas for diagram outputs.

## Lifecycle
1. **Tool processes input**: Input data is parsed and processed.
2. **Result created**: An abstract Result object is generated.
3. **Workspace opens**: The system matches the Result type to its adapter and mounts the UI.
4. **User reviews/edits**: User can make final modifications natively.
5. **Export**: User exports in their desired format (download, copy to clipboard, share link).

## Shared Controls
Consistent across all adapters:
- Download
- Copy
- Share
- Format selection (where applicable)

## Per-Adapter Controls
Specific to the result type (e.g., zoom/pan for images, syntax themes for code).

## Mobile Considerations
- Touch-friendly sizing for all controls.
- Responsive, stackable layouts ensuring toolbars don't obscure content.

## Future Extensibility
New adapters can be created seamlessly as new output types (like 3D models) are introduced.
