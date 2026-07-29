import React from 'react';
import Link from 'next/link';
import type { ToolEntry } from '@/lib/tools/types';
import { toolCatalog } from '@/lib/tools/catalog';
import { ToolCard } from '@/components/ui/ToolCard';

interface RelatedToolsProps {
  currentTool: ToolEntry;
  maxCount?: number;
}

function calculateRelevanceScore(current: ToolEntry, target: ToolEntry): number {
  if (current.id === target.id) return -1;

  let score = 0;

  // Same category
  if (current.category === target.category) {
    score += 40;
  }

  // Same result adapter
  if (current.resultAdapter === target.resultAdapter) {
    score += 20;
  }

  // Shared keywords overlap
  const currentKw = new Set(current.keywords.map((k) => k.toLowerCase()));
  for (const kw of target.keywords) {
    if (currentKw.has(kw.toLowerCase())) {
      score += 10;
    }
  }

  // Format overlap (input or output)
  const currentInputs = new Set(current.inputFormats);
  for (const fmt of target.inputFormats) {
    if (currentInputs.has(fmt)) {
      score += 5;
    }
  }

  return score;
}

export function RelatedTools({ currentTool, maxCount = 4 }: RelatedToolsProps) {
  const related = toolCatalog
    .map((tool) => ({ tool, score: calculateRelevanceScore(currentTool, tool) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name))
    .slice(0, maxCount)
    .map((item) => item.tool);

  if (related.length === 0) return null;

  return (
    <div className="space-y-6 pt-8 border-t border-border-default">
      <h3 className="font-bold text-text-primary text-xl sm:text-2xl">
        Related Tools in Catalog
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((tool) => (
          <Link key={tool.id} href={`/tools/${tool.slug}`} className="block group">
            <ToolCard tool={tool} />
          </Link>
        ))}
      </div>
    </div>
  );
}
