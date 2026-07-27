# Tool Catalog

Organized by category, listing every tool, its processing mode, and notes on difficulty or licensing.

**Processing Modes:** 
- **Client**: Runs entirely in the browser.
- **Server**: Requires server processing.
- **Hybrid**: Mix of both, or falls back to server if client fails.
- **Research-required**: Needs further investigation.

## A. PDF Compress & Core Operations (17 tools)
1. Compress PDF - Hybrid (Client feasible via WebAssembly, Server fallback)
2. Compress PDF to target size - Hybrid
3. Merge PDF - Client (pdf-lib)
4. Split PDF - Client (pdf-lib)
5. Rotate PDF - Client
6. Delete PDF pages - Client
7. Extract PDF pages - Client
8. Organize and reorder PDF - Client
9. Duplicate PDF pages - Client
10. Crop PDF - Client
11. Add blank PDF pages - Client
12. Repair PDF - Server (ghostscript or similar)
13. Compare PDFs - Hybrid
14. Flatten PDF - Client
15. PDF/A conversion - Server
16. Optimize PDF for web - Server/Hybrid
17. Remove PDF metadata - Client

## B. PDF Viewing & Editing (20 tools)
1. Edit PDF - Server (True PDF text editing is VERY difficult, requires understanding PDF structure)
2. PDF annotator - Client (pdf.js + canvas)
3. PDF reader - Client
4. Add page numbers - Client
5. Add text - Client
6. Add images and logos - Client
7. Highlight/underline/strike-through - Client
8. Freehand drawing - Client
9. Arrows/shapes/callouts - Client
10. Whiteout and redaction - Client
11. Watermark PDF - Client
12. Header and footer - Client
13. PDF form filler - Client
14. Create fillable fields - Client
15. Comments and notes - Client
16. Search inside PDF - Client
17. Replace pages - Client
18. Share PDF - Server (storage required)
19. Sign PDF - Client
20. Request signatures - Server

## C. PDF Security & Scanning (9 tools)
1. Protect PDF - Client
2. Unlock PDF - Client (if password known) / Server (removal if permitted)
3. Set PDF permissions - Client
4. Redact confidential info - Client
5. Flatten forms and annotations - Client
6. PDF scanner - Client (camera API)
7. Image to scanned PDF - Client
8. PDF OCR - Server (AI/ML required)
9. Searchable PDF - Server

## D. Convert from PDF (10 tools)
1. PDF to Word - Server (requires server-side conversion libraries)
2. PDF to Excel - Server
3. PDF to PowerPoint - Server
4. PDF to JPG - Client (pdf.js)
5. PDF to PNG - Client (pdf.js)
6. PDF to WebP - Client (pdf.js)
7. PDF to TXT - Client/Hybrid
8. PDF to HTML - Server
9. PDF to EPUB - Server
10. Extract images from PDF - Client

## E. Convert to PDF (17 tools)
Word, Excel, PowerPoint, JPG, PNG, WebP, HEIC, TXT, RTF, HTML, Webpage, ODT, ODS, ODP, HWP, EPUB, ZIP to PDF.
*Note: Office formats generally require Server. Image/Text/HTML might be Client/Hybrid.*

## F. AI PDF Tools (12 tools)
*All require Server for AI inference.*
1. AI PDF Assistant
2. Chat with PDF
3. PDF summarizer
4. Translate PDF
5. AI question generator
6. Notes generator
7. Key-point extractor
8. Table extractor
9. Invoice/receipt data extractor
10. Explain difficult PDF
11. Compare document meaning
12. Handwritten PDF to text

## G. Image Tools (~34 tools)
*Mostly Client-side feasible via Canvas/WebAssembly. Advanced AI needs Server.*
1. Image compressor
2. Target-size image compressor
3. Resize, Crop, Rotate/flip
4. Background remover - Server (AI)
5. Image to PDF
6. Combine images, Image stitcher
7. Image OCR - Server
8. Image upscaler - Server (AI)
9. Object eraser - Server (AI)
10. Watermark removal - Server (AI)
11. Metadata remover - Client
12. Color picker, Palette extractor - Client
13. Favicon generator - Client
14. Social-media image resizer - Client
15. Meme generator - Client
16. Passport photo maker, Signature resize/cleanup - Client
17. Government-form image presets - Client
18. Multiple passport photos on printable sheet - Client
19. Format conversions (JPG↔PNG, JPG↔WebP, PNG↔WebP, HEIC→JPG, HEIC→PNG, SVG→PNG, AVIF→JPG, AVIF→PNG, JPG→AVIF, PNG→AVIF) - Client/Hybrid

## H. Screenshot Editor (1 flagship tool)
Upload, clipboard paste, camera import, crop/rotate/flip/resize, perspective correction, brightness/contrast/saturation/sharpen, arrows/lines/shapes, freehand/highlighter, text/callouts, numbered steps, blur/pixelate/redaction, magnifier/spotlight, layers, undo/redo, zoom, export multi-format, combine screenshots, borders/shadows/device frames.
*Mostly Client-side.*

## I. OCR & Handwriting (6 tools)
Printed text OCR, Handwriting to text, Multilingual OCR, Hindi OCR, Marathi OCR, English OCR.
*Server-side (Handwriting and multilingual OCR need AI/ML models).*

## J. Whiteboard & Design (1 tool)
Excalidraw-style whiteboard with infinite canvas, shapes, arrows, text, sticky notes, mind maps, diagram export.
*Client-side.*

## K. Text & Writing Tools (12 tools)
Word/character counter, Case converter, Remove duplicate lines, Text diff checker, Find and replace, Markdown editor/preview, Text-to-handwriting image, Lorem ipsum generator.
*Client-side.*
Grammar cleanup, Speech to text, Text to speech, Subtitle generator.
*Server-side (AI/ML).*

## L. Converters & Generators (13 tools)
QR generator, Barcode generator, Password generator, UUID generator, Hash generator, Base64 encode/decode, URL encode/decode, Unit converter, Time-zone converter, Timestamp converter, Color converter, CSS gradient generator, CSS box-shadow generator.
*Client-side.*

## M. Developer Tools (12 tools)
JSON formatter/validator, XML formatter, YAML converter, Regex tester, JWT decoder, HTML formatter/minifier, CSS formatter/minifier, JavaScript formatter/minifier, SQL formatter, Cron expression generator, Image to Base64, Markdown previewer.
*Client-side.*

## N. Calculators (12 tools)
Percentage, Age, BMI, EMI, GST, SIP, Compound-interest, Discount, CGPA/percentage, Date-difference, Salary/hourly-rate, Loan comparison.
*Client-side.*

## O. Audio & Video — Later Phase (9 tools)
Video compressor, Video trimmer, Video to GIF, Audio compressor, Audio cutter, Audio format converter, Subtitle extractor, Video thumbnail extractor, Voice/vocal separation.
*Typically Server-side, though some WebAssembly solutions exist.*
