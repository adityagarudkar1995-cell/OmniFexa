import React from 'react';
import Link from 'next/link';
import type { ToolCatalogProjectionEntry } from '@/lib/tools/projection';
import { ToolCatalogCard } from '@/components/tools/ToolCatalogCard';

interface AvailableNowSectionProps {
  tools: ToolCatalogProjectionEntry[];
}

export function AvailableNowSection({ tools }: AvailableNowSectionProps) {
  if (!tools || tools.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Available now
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            {tools.length} Ready
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Ready-to-use tools that process your content directly in the browser.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {tools.map((tool) => (
          <Link key={tool.id} href={`/tools/${tool.slug}`} className="block group">
            <ToolCatalogCard tool={tool} />
          </Link>
        ))}
      </div>
    </section>
  );
}
