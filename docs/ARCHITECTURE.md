# Technical Architecture

## Structure
Built on **Next.js App Router**.

## Route Design
- `/tools`: Listing page of all tools and categories.
- `/tools/[category]/[slug]`: Individual tool pages (e.g., `/tools/pdf/merge-pdf`).

## Client/Server Boundary
- Explicit split between client and server processing.
- **Client-Side**: Preferred default for privacy and speed. Utilizes Web APIs, Canvas, WebAssembly.
- **Server-Side**: API routes handle operations that need large models (AI), proprietary libraries (PDF to Office), or heavy compute.

## Result Workspace Architecture
- Follows the **Adapter Pattern**.
- Outputs from processors are routed to specific UI adapters (e.g., PDF viewer with annotation tools, canvas-based image editor).
- Decouples processing from result presentation and export.

## Data Flow
1. **Upload**: User selects file(s).
2. **Processor**: Handled either entirely in browser (Client) or sent to Next.js API route/Backend (Server).
3. **Result Workspace**: Opens with the generated output using the appropriate adapter.
4. **Export**: User applies final tweaks (if any) and downloads/shares.

## State Management
- React context/hooks for local state.
- No external state library (like Redux or Zustand) yet, keeping it lightweight.

## File Handling
- Client-side: via HTML5 File API and object URLs.
- Server-side: temporary memory buffers via API routes. Files are strictly short-lived.

## Key Decisions
- Standardizing the "Result Workspace" enables adding new tools rapidly without rebuilding the export UI every time.
