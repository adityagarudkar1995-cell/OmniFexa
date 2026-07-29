import React from 'react';
import type { ToolEntry } from '@/lib/tools/types';

interface ToolMetadataPanelProps {
  tool: ToolEntry;
}

export function ToolMetadataPanel({ tool }: ToolMetadataPanelProps) {
  const metadataItems = [
    { label: 'Development Phase', value: tool.phase.replace('phase-', 'Phase ').replace('-', ': ') },
    { label: 'Implementation Status', value: tool.implementationStatus },
    { label: 'Processing Mode', value: tool.processingMode },
    { label: 'Result Adapter', value: tool.resultAdapter },
    { label: 'Requires Server', value: tool.requiresBackend ? 'Yes' : 'No' },
    { label: 'Requires AI Model', value: tool.requiresAI ? 'Yes' : 'No' },
    { label: 'Licensing Review', value: tool.licensingReviewRequired ? 'Pending Review' : 'Passed' },
  ];

  return (
    <div className="bg-surface-0 border border-border-default rounded-2xl p-6 space-y-4">
      <h3 className="font-semibold text-text-primary text-base">
        Tool Specifications & Architecture
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
        {metadataItems.map((item) => (
          <div key={item.label} className="space-y-1">
            <span className="text-text-tertiary font-medium block">{item.label}</span>
            <span className="text-text-primary font-semibold capitalize">{item.value}</span>
          </div>
        ))}
      </div>

      {tool.notes && (
        <div className="pt-3 border-t border-border-subtle text-xs text-amber-700 dark:text-amber-300 font-medium">
          <span className="font-bold">Engineering Note:</span> {tool.notes}
        </div>
      )}
    </div>
  );
}
