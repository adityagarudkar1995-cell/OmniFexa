import React from 'react';
import Link from 'next/link';
import type { ToolEntry } from '@/lib/tools/types';
import { toolCatalog } from '@/lib/tools/catalog';
import { ToolCard } from '@/components/ui/ToolCard';

interface RelatedToolsProps {
  currentTool: ToolEntry;
  maxCount?: number;
}

function normalize(val: string): string {
  return val.trim().toLowerCase();
}

/**
 * Deterministic scoring function using Set-based unique signal comparisons.
 */
function calculateRelevanceScore(current: ToolEntry, target: ToolEntry): number {
  if (current.id === target.id) return -1;

  let score = 0;

  // Signal 1: Same category (+40)
  if (current.category === target.category) {
    score += 40;
  }

  // Signal 2: Current tool output matches candidate tool input (compatible next-step workflow) (+25)
  const currentOutputs = new Set(current.outputFormats.map(normalize));
  const targetInputs = new Set(target.inputFormats.map(normalize));
  let isNextStepWorkflow = false;
  for (const fmt of currentOutputs) {
    if (targetInputs.has(fmt)) {
      isNextStepWorkflow = true;
      break;
    }
  }
  if (isNextStepWorkflow) {
    score += 25;
  }

  // Signal 3: Same result adapter (+15)
  if (current.resultAdapter === target.resultAdapter) {
    score += 15;
  }

  // Signal 4: Unique exact shared keywords (+10 each, capped at +30)
  const currentKw = new Set(current.keywords.map(normalize));
  const targetKw = new Set(target.keywords.map(normalize));
  let kwCount = 0;
  for (const kw of targetKw) {
    if (currentKw.has(kw)) {
      kwCount++;
    }
  }
  score += Math.min(kwCount * 10, 30);

  // Signal 5: Unique input format overlap (+5 each, capped at +15)
  const currentInputs = new Set(current.inputFormats.map(normalize));
  let inputOverlapCount = 0;
  for (const fmt of targetInputs) {
    if (currentInputs.has(fmt)) {
      inputOverlapCount++;
    }
  }
  score += Math.min(inputOverlapCount * 5, 15);

  // Signal 6: Unique output format overlap (+5 each, capped at +15)
  let outputOverlapCount = 0;
  const targetOutputs = new Set(target.outputFormats.map(normalize));
  for (const fmt of targetOutputs) {
    if (currentOutputs.has(fmt)) {
      outputOverlapCount++;
    }
  }
  score += Math.min(outputOverlapCount * 5, 15);

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
