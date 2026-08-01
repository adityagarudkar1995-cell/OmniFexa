import type { ToolCategory, ImplementationStatus } from '@/lib/tools/types';

export interface CategoryDisplay {
  key: ToolCategory;
  label: string;
  description: string;
  iconName: string;
  count: number;
  totalCount: number;
  availableCount: number;
}

/** Complete human-readable metadata for all 15 tool categories */
const CATEGORY_META: Record<ToolCategory, { label: string; description: string; iconName: string }> = {
  'pdf-compress-core': {
    label: 'PDF Essentials',
    description: 'Compress, merge, split, and organize PDF documents',
    iconName: 'FileText',
  },
  'pdf-edit-view': {
    label: 'PDF Editing',
    description: 'Edit text, annotate, rotate, and view PDF files',
    iconName: 'PenTool',
  },
  'pdf-security-scan': {
    label: 'PDF Security',
    description: 'Protect, unlock, sign, and sanitize PDF files',
    iconName: 'ShieldCheck',
  },
  'convert-from-pdf': {
    label: 'Convert from PDF',
    description: 'Convert PDFs to Word, Excel, PowerPoint, and images',
    iconName: 'FileOutput',
  },
  'convert-to-pdf': {
    label: 'Convert to PDF',
    description: 'Convert Office docs, HTML, and images into PDF format',
    iconName: 'FileInput',
  },
  'ai-pdf': {
    label: 'AI PDF Tools',
    description: 'Summarize, analyze, and query PDF documents with AI',
    iconName: 'Sparkles',
  },
  'image': {
    label: 'Image Tools',
    description: 'Compress, resize, convert, crop, and edit images',
    iconName: 'Image',
  },
  'screenshot-editor': {
    label: 'Screenshot Editor',
    description: 'Annotate, blur, and frame screenshots professionally',
    iconName: 'Monitor',
  },
  'ocr-handwriting': {
    label: 'OCR & Handwriting',
    description: 'Extract text from scanned documents and handwriting',
    iconName: 'ScanText',
  },
  'whiteboard-design': {
    label: 'Whiteboard',
    description: 'Infinite canvas for diagrams, sketches, and flowcharts',
    iconName: 'PenLine',
  },
  'text-writing': {
    label: 'Text Tools',
    description: 'Word counters, case converters, and text utilities',
    iconName: 'Type',
  },
  'converters-generators': {
    label: 'Generators & Converters',
    description: 'QR codes, passwords, hashes, and unit converters',
    iconName: 'Wand2',
  },
  'developer': {
    label: 'Developer Tools',
    description: 'JSON, regex, JWT, Base64, and code formatters',
    iconName: 'Code2',
  },
  'calculators': {
    label: 'Calculators',
    description: 'EMI, GST, SIP, age, and financial calculators',
    iconName: 'Calculator',
  },
  'audio-video': {
    label: 'Audio & Video',
    description: 'Compress, trim, extract, and convert media files',
    iconName: 'Video',
  },
};

/** All 15 tool categories in canonical display order */
export const ALL_CATEGORIES: ToolCategory[] = [
  'pdf-compress-core',
  'pdf-edit-view',
  'pdf-security-scan',
  'convert-from-pdf',
  'convert-to-pdf',
  'ai-pdf',
  'image',
  'screenshot-editor',
  'ocr-handwriting',
  'whiteboard-design',
  'text-writing',
  'converters-generators',
  'developer',
  'calculators',
  'audio-video',
];

export function getCategoryMeta(category: ToolCategory) {
  return CATEGORY_META[category] || {
    label: category,
    description: 'Tools and utilities',
    iconName: 'Wand2',
  };
}

export function getDetailedCategoryDisplays(
  catalog: Array<{ category: ToolCategory; implementationStatus: ImplementationStatus }>
): CategoryDisplay[] {
  const totalMap = new Map<ToolCategory, number>();
  const availableMap = new Map<ToolCategory, number>();

  for (const tool of catalog) {
    totalMap.set(tool.category, (totalMap.get(tool.category) ?? 0) + 1);
    if (tool.implementationStatus === 'production') {
      availableMap.set(tool.category, (availableMap.get(tool.category) ?? 0) + 1);
    }
  }

  return ALL_CATEGORIES.map((key) => {
    const total = totalMap.get(key) ?? 0;
    return {
      key,
      ...getCategoryMeta(key),
      count: total,
      totalCount: total,
      availableCount: availableMap.get(key) ?? 0,
    };
  });
}

export function getCategoryCounts(
  catalog: Array<{ category: ToolCategory; implementationStatus?: ImplementationStatus }>
): CategoryDisplay[] {
  return getDetailedCategoryDisplays(catalog as Array<{ category: ToolCategory; implementationStatus: ImplementationStatus }>);
}
