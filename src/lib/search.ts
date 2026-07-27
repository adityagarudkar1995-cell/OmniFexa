import type { ToolEntry } from '@/lib/tools/types';

/**
 * Lightweight tool search — no external dependencies.
 * Matches against name, shortDescription, keywords, and hinglishKeywords.
 * Returns top results sorted by relevance score.
 */

interface ScoredResult {
  tool: ToolEntry;
  score: number;
}

function normalise(text: string): string {
  return text.toLowerCase().trim();
}

function scoreMatch(query: string, tool: ToolEntry): number {
  const q = normalise(query);
  if (!q) return 0;

  const name = normalise(tool.name);
  const desc = normalise(tool.shortDescription);

  let score = 0;

  // Exact name match — highest priority
  if (name === q) {
    score += 100;
  }
  // Name starts with query
  else if (name.startsWith(q)) {
    score += 80;
  }
  // Name contains query as a word boundary
  else if (name.includes(q)) {
    score += 60;
  }

  // Description match
  if (desc.includes(q)) {
    score += 20;
  }

  // Keyword matches
  for (const kw of tool.keywords) {
    const normKw = normalise(kw);
    if (normKw === q) {
      score += 50;
      break;
    }
    if (normKw.includes(q)) {
      score += 25;
      break;
    }
  }

  // Hinglish keyword matches
  for (const kw of tool.hinglishKeywords) {
    const normKw = normalise(kw);
    if (normKw.includes(q)) {
      score += 15;
      break;
    }
  }

  // Boost featured tools slightly
  if (score > 0 && tool.featured) {
    score += 5;
  }

  return score;
}

const MAX_RESULTS = 8;

export function searchTools(query: string, catalog: ToolEntry[]): ToolEntry[] {
  const q = normalise(query);
  if (q.length < 2) return [];

  const scored: ScoredResult[] = [];

  for (const tool of catalog) {
    const s = scoreMatch(q, tool);
    if (s > 0) {
      scored.push({ tool, score: s });
    }
  }

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, MAX_RESULTS).map((r) => r.tool);
}
