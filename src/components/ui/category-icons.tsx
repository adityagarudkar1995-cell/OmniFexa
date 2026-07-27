import { 
  FileText, 
  PenTool, 
  ShieldCheck, 
  FileOutput, 
  FileInput, 
  Sparkles, 
  ImageIcon, 
  Monitor, 
  ScanText, 
  PenLine, 
  Type, 
  Wand2, 
  Code2, 
  Calculator, 
  Video 
} from 'lucide-react';
import React from 'react';

export const CATEGORY_ICONS: Record<string, React.ComponentType<{className?: string}>> = {
  FileText, 
  PenTool, 
  ShieldCheck, 
  FileOutput, 
  FileInput, 
  Sparkles, 
  Image: ImageIcon, 
  Monitor, 
  ScanText, 
  PenLine, 
  Type, 
  Wand2, 
  Code2, 
  Calculator, 
  Video,
};
