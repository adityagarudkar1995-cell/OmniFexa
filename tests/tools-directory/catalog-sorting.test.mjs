import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDetailedCategoryDisplays, ALL_CATEGORIES } from '../../src/lib/categories.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const catalogPath = resolve(__dirname, '../../src/data/tool-catalog.json');
const catalog = JSON.parse(readFileSync(catalogPath, 'utf-8'));

test('Tools Directory - Derived Catalog & Status Counts', () => {
  assert.equal(catalog.length, 187);

  const productionTools = catalog.filter((t) => t.implementationStatus === 'production');
  const plannedTools = catalog.filter((t) => t.implementationStatus === 'planned');

  assert.equal(productionTools.length, 2);
  assert.equal(plannedTools.length, 185);

  const slugs = productionTools.map((t) => t.slug).sort();
  assert.deepEqual(slugs, ['case-converter', 'word-character-counter']);
});

test('Tools Directory - Category Counts & 15 Category Coverage', () => {
  const displays = getDetailedCategoryDisplays(catalog);
  assert.equal(displays.length, 15);
  assert.equal(ALL_CATEGORIES.length, 15);

  let sumTotal = 0;
  let sumAvailable = 0;

  for (const cat of displays) {
    assert.ok(cat.totalCount > 0, `Category ${cat.key} should have at least 1 tool`);
    sumTotal += cat.totalCount;
    sumAvailable += cat.availableCount;
  }

  assert.equal(sumTotal, 187);
  assert.equal(sumAvailable, 2);
});

test('Tools Directory - Sorting Strategy (Production First -> Featured -> Alphabetical)', () => {
  const sorted = [...catalog].sort((a, b) => {
    const aProd = a.implementationStatus === 'production';
    const bProd = b.implementationStatus === 'production';
    if (aProd && !bProd) return -1;
    if (!aProd && bProd) return 1;

    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    return a.name.localeCompare(b.name);
  });

  // First two tools in default list MUST be the production tools
  assert.equal(sorted[0].implementationStatus, 'production');
  assert.equal(sorted[1].implementationStatus, 'production');

  const firstTwoSlugs = new Set([sorted[0].slug, sorted[1].slug]);
  assert.ok(firstTwoSlugs.has('word-character-counter'));
  assert.ok(firstTwoSlugs.has('case-converter'));
});

test('Tools Directory - Search and Filter Combinations', () => {
  // Search for "word" within text-writing category
  const query = 'word';
  const category = 'text-writing';

  const filtered = catalog.filter((tool) => {
    if (tool.category !== category) return false;
    const name = tool.name.toLowerCase();
    const desc = tool.shortDescription.toLowerCase();
    const kwMatch = tool.keywords.some((k) => k.toLowerCase().includes(query));
    return name.includes(query) || desc.includes(query) || kwMatch;
  });

  assert.ok(filtered.length > 0);
  assert.equal(filtered[0].slug, 'word-character-counter');
  assert.equal(filtered[0].implementationStatus, 'production');
});

test('Tools Directory - Empty Search Results Handling', () => {
  const query = 'invalidnonexistentterm12345';

  const filtered = catalog.filter((tool) => {
    const name = tool.name.toLowerCase();
    const desc = tool.shortDescription.toLowerCase();
    const kwMatch = tool.keywords.some((k) => k.toLowerCase().includes(query));
    return name.includes(query) || desc.includes(query) || kwMatch;
  });

  assert.equal(filtered.length, 0);
});

test('Tools Directory - No Duplicate Tools in Category Sections', () => {
  const seenToolIds = new Set();

  for (const catKey of ALL_CATEGORIES) {
    const toolsInCat = catalog.filter((t) => t.category === catKey);
    for (const tool of toolsInCat) {
      assert.ok(!seenToolIds.has(tool.id), `Duplicate tool ID "${tool.id}" found in category ${catKey}`);
      seenToolIds.add(tool.id);
    }
  }

  assert.equal(seenToolIds.size, 187);
});
