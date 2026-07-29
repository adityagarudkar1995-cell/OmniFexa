import type { ResultAdapter } from '@/lib/tools/types';

/** The 7 result workspace adapter types */
export type ResultAdapterType = ResultAdapter;

/** Life cycle states of the Universal Result Workspace */
export type WorkspaceLifecycle =
  | 'idle'
  | 'input-ready'
  | 'processing'
  | 'ready'
  | 'error'
  | 'cancelled';

/** Input data supplied to the workspace */
export interface WorkspaceInput {
  id: string;
  name: string;
  size: number;
  type: string;
  file?: File;
  rawText?: string;
  url?: string;
  timestamp: number;
}

/** Processing progress tracking */
export interface ProcessingProgress {
  percentage: number;
  message: string;
  stage?: string;
}

/** Error details if processing or rendering fails */
export interface WorkspaceError {
  code: string;
  message: string;
  details?: string;
  recoverable: boolean;
}

/** Export format option available in the workspace */
export interface ExportOption {
  id: string;
  label: string;
  extension: string;
  mimeType: string;
  isPrimary?: boolean;
}

/** Action button available in the workspace header or toolbar */
export interface WorkspaceAction {
  id: string;
  label: string;
  iconName: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  disabled?: boolean;
  tooltip?: string;
}

/** Capabilities supported by a specific workspace adapter */
export interface AdapterCapabilities {
  supportsZoomPan: boolean;
  supportsPageReorder: boolean;
  supportsAnnotations: boolean;
  supportsCropping: boolean;
  supportsRedaction: boolean;
  supportsTextEdit: boolean;
  supportsSyntaxHighlighting: boolean;
  supportsTimelineTrim: boolean;
  supportsCanvasExport: boolean;
  exportFormats: ExportOption[];
}

/** Adapter contract definition */
export interface AdapterContract {
  id: ResultAdapterType;
  name: string;
  description: string;
  iconName: string;
  capabilities: AdapterCapabilities;
  defaultActions: WorkspaceAction[];
}

/** Processed result payload stored in state */
export interface WorkspaceResult {
  id: string;
  adapterType: ResultAdapterType;
  title: string;
  data: unknown;
  metadata: Record<string, unknown>;
  createdAt: number;
}

/** Main state model for the Universal Result Workspace */
export interface ResultWorkspaceState {
  lifecycle: WorkspaceLifecycle;
  adapterType: ResultAdapterType;
  toolId: string;
  toolSlug: string;
  toolName: string;
  input: WorkspaceInput | null;
  result: WorkspaceResult | null;
  progress: ProcessingProgress | null;
  error: WorkspaceError | null;
  selectedFormat: ExportOption | null;
  isPreview: boolean;
}
