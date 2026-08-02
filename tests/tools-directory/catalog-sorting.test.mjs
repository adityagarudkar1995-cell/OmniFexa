import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDetailedCategoryDisplays, ALL_CATEGORIES } from '../../src/lib/categories.ts';
import {
  DIRECTORY_STATUS_LABELS,
  filterAndSortDirectoryTools,
  getDirectoryStatusFilter,
  getDirectoryStatusLabel,
  isDirectorySearchUpdateCurrent,
  sortDirectoryTools,
  synchronizeDirectoryQueryFromUrl,
  updateDirectorySearchParams,
} from '../../src/lib/tools/directory.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const catalogPath = resolve(__dirname, '../../src/data/tool-catalog.json');
const catalog = JSON.parse(readFileSync(catalogPath, 'utf-8'));

test('Tools Directory - Derived Catalog & Status Counts', () => {
  assert.equal(catalog.length, 187);

  const productionTools = catalog.filter((tool) => tool.implementationStatus === 'production');
  const plannedTools = catalog.filter((tool) => tool.implementationStatus === 'planned');

  assert.equal(productionTools.length, 2);
  assert.equal(plannedTools.length, 185);

  const slugs = productionTools.map((tool) => tool.slug).sort();
  assert.deepEqual(slugs, ['case-converter', 'word-character-counter']);
});

test('Tools Directory - Category Counts & 15 Category Coverage', () => {
  const expectedCounts = {
    'pdf-compress-core': 17,
    'pdf-edit-view': 20,
    'pdf-security-scan': 9,
    'convert-from-pdf': 10,
    'convert-to-pdf': 17,
    'ai-pdf': 12,
    image: 36,
    'screenshot-editor': 1,
    'ocr-handwriting': 6,
    'whiteboard-design': 1,
    'text-writing': 12,
    'converters-generators': 13,
    developer: 12,
    calculators: 12,
    'audio-video': 9,
  };
  const displays = getDetailedCategoryDisplays(catalog);

  assert.equal(displays.length, 15);
  assert.equal(ALL_CATEGORIES.length, 15);
  assert.deepEqual(
    Object.fromEntries(displays.map((category) => [category.key, category.totalCount])),
    expectedCounts
  );
  assert.equal(
    displays.reduce((sum, category) => sum + category.totalCount, 0),
    187
  );
  assert.equal(
    displays.reduce((sum, category) => sum + category.availableCount, 0),
    2
  );
});

test('Tools Directory - Production-first sorting uses shared implementation', () => {
  const sorted = sortDirectoryTools(catalog);

  assert.deepEqual(
    sorted.slice(0, 2).map((tool) => tool.slug).sort(),
    ['case-converter', 'word-character-counter']
  );
  assert.ok(sorted.slice(2).every((tool) => tool.implementationStatus === 'planned'));
});

test('Tools Directory - Search and filter combinations use shared implementation', () => {
  const productionTextMatches = filterAndSortDirectoryTools(catalog, {
    query: 'word',
    category: 'text-writing',
    status: 'production',
  });
  assert.deepEqual(productionTextMatches.map((tool) => tool.slug), [
    'word-character-counter',
  ]);

  const plannedCaseMatches = filterAndSortDirectoryTools(catalog, {
    query: 'case',
    status: 'planned',
  });
  assert.ok(
    plannedCaseMatches.every((tool) => tool.implementationStatus === 'planned')
  );
  assert.ok(!plannedCaseMatches.some((tool) => tool.slug === 'case-converter'));

  const researchRequiredMatches = filterAndSortDirectoryTools(catalog, {
    mode: 'research-required',
  });
  assert.equal(researchRequiredMatches.length, 2);
  assert.ok(
    researchRequiredMatches.every((tool) => tool.processingMode === 'research-required')
  );
});

test('Tools Directory - Empty result combinations return an empty list', () => {
  const filtered = filterAndSortDirectoryTools(catalog, {
    query: 'invalidnonexistentterm12345',
    category: 'text-writing',
    status: 'production',
  });

  assert.deepEqual(filtered, []);
});

test('Tools Directory - No duplicate tool ids or slugs', () => {
  assert.equal(new Set(catalog.map((tool) => tool.id)).size, 187);
  assert.equal(new Set(catalog.map((tool) => tool.slug)).size, 187);

  const categorizedIds = ALL_CATEGORIES.flatMap((category) =>
    catalog.filter((tool) => tool.category === category).map((tool) => tool.id)
  );
  assert.equal(categorizedIds.length, 187);
  assert.equal(new Set(categorizedIds).size, 187);
});

test('Tools Directory - Status values map only to honest public labels', () => {
  assert.deepEqual(DIRECTORY_STATUS_LABELS, {
    production: 'Available',
    planned: 'Coming Soon',
  });
  assert.equal(getDirectoryStatusFilter('production'), 'production');
  assert.equal(getDirectoryStatusFilter('planned'), 'planned');
  assert.equal(getDirectoryStatusFilter('invalid'), '');
  assert.equal(getDirectoryStatusFilter(null), '');
  assert.equal(getDirectoryStatusLabel('production'), 'Available');
  assert.equal(getDirectoryStatusLabel('planned'), 'Coming Soon');
  assert.ok(
    catalog.every((tool) => getDirectoryStatusFilter(tool.implementationStatus) !== '')
  );
});

test('Tools Directory - URL parameter updates preserve unrelated committed filters', () => {
  const updated = updateDirectorySearchParams(
    'q=case&category=text-writing&status=production&mode=client',
    { category: 'developer', phase: 'phase-2-core-launch' }
  );
  const params = new URLSearchParams(updated);

  assert.equal(params.get('q'), 'case');
  assert.equal(params.get('category'), 'developer');
  assert.equal(params.get('status'), 'production');
  assert.equal(params.get('mode'), 'client');
  assert.equal(params.get('phase'), 'phase-2-core-launch');

  const cleared = new URLSearchParams(
    updateDirectorySearchParams(updated, { q: '', status: null })
  );
  assert.equal(cleared.has('q'), false);
  assert.equal(cleared.has('status'), false);
  assert.equal(cleared.get('category'), 'developer');
  assert.equal(cleared.get('mode'), 'client');
});

test('Tools Directory - URL changes authoritatively synchronize local search', () => {
  assert.equal(
    synchronizeDirectoryQueryFromUrl('local draft', 'q=case', 'q=word'),
    'word'
  );
  assert.equal(
    synchronizeDirectoryQueryFromUrl(
      'local draft',
      'q=case&category=text-writing',
      'q=case&category=developer'
    ),
    'case'
  );
  assert.equal(
    synchronizeDirectoryQueryFromUrl('local draft', 'q=case', 'q=case'),
    'local draft'
  );
});

test('Tools Directory - Stale debounced search commits are rejected', () => {
  assert.equal(isDirectorySearchUpdateCurrent('q=case', 'q=case', 4, 4), true);
  assert.equal(isDirectorySearchUpdateCurrent('q=case', 'q=word', 4, 4), false);
  assert.equal(isDirectorySearchUpdateCurrent('q=case', 'q=case', 4, 5), false);
});
