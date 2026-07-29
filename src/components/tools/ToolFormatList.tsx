import React from 'react';

interface ToolFormatListProps {
  inputFormats: string[];
  outputFormats: string[];
}

export function ToolFormatList({ inputFormats, outputFormats }: ToolFormatListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Input Formats */}
      <div className="bg-surface-0 border border-border-default rounded-xl p-4">
        <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block mb-2">
          Supported Inputs
        </span>
        <div className="flex flex-wrap gap-1.5">
          {inputFormats.map((fmt) => (
            <span
              key={fmt}
              className="px-2 py-0.5 rounded bg-surface-100 dark:bg-surface-200 text-xs font-mono font-medium text-text-primary"
            >
              .{fmt.toLowerCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Output Formats */}
      <div className="bg-surface-0 border border-border-default rounded-xl p-4">
        <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block mb-2">
          Output Formats
        </span>
        <div className="flex flex-wrap gap-1.5">
          {outputFormats.map((fmt) => (
            <span
              key={fmt}
              className="px-2 py-0.5 rounded bg-primary-50 dark:bg-primary-900/30 text-xs font-mono font-medium text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800"
            >
              .{fmt.toLowerCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
