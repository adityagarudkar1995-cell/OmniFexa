import React from 'react';

interface EmptySearchStateProps {
  query: string;
}

export function EmptySearchState({ query }: EmptySearchStateProps) {
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-surface-0 border border-border-default rounded-2xl shadow-xl p-6 text-center z-40">
      <p className="text-text-primary font-medium text-sm sm:text-base">
        No tools found matching &quot;<span className="font-semibold text-primary-600">{query}</span>&quot;
      </p>
      <p className="text-text-tertiary text-xs sm:text-sm mt-1.5">
        Try searching for terms like &quot;PDF&quot;, &quot;compress&quot;, &quot;image&quot;, or &quot;converter&quot;
      </p>
    </div>
  );
}
