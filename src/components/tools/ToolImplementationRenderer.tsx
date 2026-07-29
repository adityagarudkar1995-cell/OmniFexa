import React from 'react';
import type { ToolEntry } from '@/lib/tools/types';
import { getToolImplementation } from '@/lib/tools/implementation-registry';
import { WordCharacterCounterTool } from './implementations/WordCharacterCounterTool';
import { CaseConverterTool } from './implementations/CaseConverterTool';

interface ToolImplementationRendererProps {
  tool: ToolEntry;
}

export function ToolImplementationRenderer({ tool }: ToolImplementationRendererProps) {
  const impl = getToolImplementation(tool.slug);

  if (!impl) {
    throw new Error(
      `ToolImplementationRenderer: Released tool "${tool.slug}" has no registered entry in tool-implementation-registry.json.`
    );
  }

  switch (impl.implementationKey) {
    case 'word-character-counter':
      return <WordCharacterCounterTool />;

    case 'case-converter':
      return <CaseConverterTool />;

    default:
      throw new Error(
        `ToolImplementationRenderer: Unsupported implementationKey "${impl.implementationKey}" for slug "${tool.slug}".`
      );
  }
}
