import type { ToolCategory, ToolEntry } from '@/lib/tools/types';

export interface CategoryDisplay {
  key: ToolCategory;
  label: string;
  description: string;
  iconName: string;
  count: number;
}

/** Human-readable metadata for each tool category */
const CATEGORY_META: Record<ToolCategory, { label: string; description: string; iconName: string }> = {
  'pdf-compress-core': {
    label: 'PDF Tools',
    description: 'Compress, merge, split and manage PDFs',
    iconName: 'FileText',
  },
  'pdf-edit-view': {
    label: 'PDF Editing',
    description: 'Edit, annotate and view PDF documents',
    iconName: 'PenTool',
  },
  'pdf-security-scan': {
    label: 'PDF Security',
    description: 'Protect, unlock and scan PDFs',
    iconName: 'ShieldCheck',
  },
  'convert-from-pdf': {
    label: 'Convert from PDF',
    description: 'Convert PDFs to Word, Excel, images and more',
    iconName: 'FileOutput',
  },
  'convert-to-pdf': {
    label: 'Convert to PDF',
    description: 'Convert documents and images to PDF',
    iconName: 'FileInput',
  },
  'ai-pdf': {
    label: 'AI PDF Tools',
    description: 'AI-powered PDF analysis and extraction',
    iconName: 'Sparkles',
  },
  'image': {
    label: 'Image Tools',
    description: 'Compress, resize, convert and edit images',
    iconName: 'Image',
  },
  'screenshot-editor': {
    label: 'Screenshot Editor',
    description: 'Annotate and edit screenshots professionally',
    iconName: 'Monitor',
  },
  'ocr-handwriting': {
    label: 'OCR & Handwriting',
    description: 'Extract text from images and handwriting',
    iconName: 'ScanText',
  },
  'whiteboard-design': {
    label: 'Whiteboard',
    description: 'Infinite canvas for diagrams and sketches',
    iconName: 'PenLine',
  },
  'text-writing': {
    label: 'Text Tools',
    description: 'Word counters, converters and text utilities',
    iconName: 'Type',
  },
  'converters-generators': {
    label: 'Generators',
    description: 'QR codes, passwords, hashes and converters',
    iconName: 'Wand2',
  },
  'developer': {
    label: 'Developer Tools',
    description: 'JSON, regex, JWT and code formatters',
    iconName: 'Code2',
  },
  'calculators': {
    label: 'Calculators',
    description: 'EMI, GST, SIP, age and percentage calculators',
    iconName: 'Calculator',
  },
  'audio-video': {
    label: 'Audio & Video',
    description: 'Compress, trim and convert media files',
    iconName: 'Video',
  },
};

/** Grouped categories for homepage display (excludes subcategories that merge with parent) */
const HOMEPAGE_CATEGORIES: ToolCategory[] = [
  'pdf-compress-core',
  'image',
  'screenshot-editor',
  'ocr-handwriting',
  'convert-from-pdf',
  'convert-to-pdf',
  'text-writing',
  'developer',
  'calculators',
  'converters-generators',
  'whiteboard-design',
  'audio-video',
];

export function getCategoryMeta(category: ToolCategory) {
  return CATEGORY_META[category];
}

export function getCategoryCounts(catalog: ToolEntry[]): CategoryDisplay[] {
  const countMap = new Map<ToolCategory, number>();

  for (const tool of catalog) {
    countMap.set(tool.category, (countMap.get(tool.category) ?? 0) + 1);
  }

  return HOMEPAGE_CATEGORIES.map((key) => ({
    key,
    ...CATEGORY_META[key],
    count: countMap.get(key) ?? 0,
  }));
}
