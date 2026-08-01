import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const catalogPath = resolve(__dirname, '../../src/data/tool-catalog.json');
const catalog = JSON.parse(readFileSync(catalogPath, 'utf-8'));

test('Tools Directory - Derived Catalog Counts', () => {
  assert.equal(catalog.length, 187);

  const productionTools = catalog.filter((t) => t.implementationStatus === 'production');
  const plannedTools = catalog.filter((t) => t.implementationStatus === 'planned');

  assert.equal(productionTools.length, 2);
  assert.equal(plannedTools.length, 185);

  const slugs = productionTools.map((t) => t.slug).sort();
  assert.deepEqual(slugs, ['case-converter', 'word-character-counter']);
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
