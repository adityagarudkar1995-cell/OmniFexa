/** Processing mode for a tool */
export type ProcessingMode = 'client' | 'server' | 'hybrid' | 'research-required';

/** Result Workspace adapter type */
export type ResultAdapter = 'pdf' | 'image' | 'text' | 'code' | 'simple' | 'media' | 'whiteboard';

/** Development phase */
export type Phase =
  | 'phase-1-foundation'
  | 'phase-2-core-launch'
  | 'phase-3-document-workflows'
  | 'phase-4-advanced-conversion'
  | 'phase-5-ai-tools'
  | 'phase-6-media-and-growth';

/** Implementation status */
export type ImplementationStatus = 'planned' | 'in-progress' | 'alpha' | 'beta' | 'production';

/** Tool category */
export type ToolCategory =
  | 'pdf-compress-core'
  | 'pdf-edit-view'
  | 'pdf-security-scan'
  | 'convert-from-pdf'
  | 'convert-to-pdf'
  | 'ai-pdf'
  | 'image'
  | 'screenshot-editor'
  | 'ocr-handwriting'
  | 'whiteboard-design'
  | 'text-writing'
  | 'converters-generators'
  | 'developer'
  | 'calculators'
  | 'audio-video';

/** A single tool entry in the catalog */
export interface ToolEntry {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: ToolCategory;
  subcategory: string;
  keywords: string[];
  hinglishKeywords: string[];
  phase: Phase;
  implementationStatus: ImplementationStatus;
  processingMode: ProcessingMode;
  resultAdapter: ResultAdapter;
  inputFormats: string[];
  outputFormats: string[];
  requiresBackend: boolean;
  requiresAI: boolean;
  licensingReviewRequired: boolean;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  notes: string;
}

/** The complete tool catalog */
export type ToolCatalog = ToolEntry[];
