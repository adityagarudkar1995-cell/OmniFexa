import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const catalogPath = resolve(__dirname, '../src/data/tool-catalog.json');
const registryPath = resolve(__dirname, '../src/data/tool-implementation-registry.json');
const adapterRegistryPath = resolve(__dirname, '../src/data/result-adapter-registry.json');

try {
  const catalog = JSON.parse(readFileSync(catalogPath, 'utf-8'));
  const registry = JSON.parse(readFileSync(registryPath, 'utf-8'));
  const adapterRegistry = JSON.parse(readFileSync(adapterRegistryPath, 'utf-8'));

  let hasError = false;

  if (typeof registry !== 'object' || registry === null || Array.isArray(registry)) {
    console.error('Error: Implementation registry is not a plain JSON object.');
    process.exit(1);
  }

  const registryKeys = Object.keys(registry);
  const catalogMap = new Map(catalog.map((t) => [t.slug, t]));

  console.log(`Checking ${registryKeys.length} registered tool implementation(s)...`);

  for (const [key, entry] of Object.entries(registry)) {
    if (key !== entry.slug) {
      console.error(`Error: Registry key "${key}" does not match entry.slug "${entry.slug}".`);
      hasError = true;
    }

    if (!entry.implementationKey || typeof entry.implementationKey !== 'string') {
      console.error(`Error in implementation "${key}": Missing or invalid implementationKey.`);
      hasError = true;
    }

    if (!entry.componentFile || typeof entry.componentFile !== 'string') {
      console.error(`Error in implementation "${key}": Missing or invalid componentFile path.`);
      hasError = true;
    } else {
      const fullComponentPath = resolve(__dirname, '..', entry.componentFile);
      if (!existsSync(fullComponentPath)) {
        console.error(`Error in implementation "${key}": Component file "${entry.componentFile}" does not exist at "${fullComponentPath}".`);
        hasError = true;
      }
    }

    if (!entry.releasedAt || isNaN(Date.parse(entry.releasedAt))) {
      console.error(`Error in implementation "${key}": Invalid or unparseable releasedAt ISO date "${entry.releasedAt}".`);
      hasError = true;
    }

    const catalogTool = catalogMap.get(entry.slug);
    if (!catalogTool) {
      console.error(`Error in implementation "${key}": Slug "${entry.slug}" does not exist in canonical tool catalog.`);
      hasError = true;
    } else {
      if (catalogTool.implementationStatus !== entry.releasedStatus) {
        console.error(`Error in implementation "${key}": Catalog implementationStatus ("${catalogTool.implementationStatus}") does not match registry releasedStatus ("${entry.releasedStatus}").`);
        hasError = true;
      }

      if (catalogTool.resultAdapter !== entry.resultAdapter) {
        console.error(`Error in implementation "${key}": Catalog resultAdapter ("${catalogTool.resultAdapter}") does not match registry resultAdapter ("${entry.resultAdapter}").`);
        hasError = true;
      }

      if (catalogTool.processingMode !== entry.processingMode) {
        console.error(`Error in implementation "${key}": Catalog processingMode ("${catalogTool.processingMode}") does not match registry processingMode ("${entry.processingMode}").`);
        hasError = true;
      }

      if (catalogTool.requiresBackend) {
        console.error(`Error in implementation "${key}": Released browser tool cannot set requiresBackend to true.`);
        hasError = true;
      }

      if (catalogTool.requiresAI) {
        console.error(`Error in implementation "${key}": Released tool cannot set requiresAI to true.`);
        hasError = true;
      }

      if (catalogTool.licensingReviewRequired) {
        console.error(`Error in implementation "${key}": Released tool cannot set licensingReviewRequired to true.`);
        hasError = true;
      }
    }

    if (!adapterRegistry[entry.resultAdapter]) {
      console.error(`Error in implementation "${key}": References unregistered adapter "${entry.resultAdapter}".`);
      hasError = true;
    }
  }

  // Verify that all catalog tools marked production/beta/alpha exist in registry
  for (const tool of catalog) {
    const isReleased = tool.implementationStatus !== 'planned';
    const isRegistered = Boolean(registry[tool.slug]);

    if (isReleased && !isRegistered) {
      console.error(`Error: Catalog tool "${tool.slug}" is marked "${tool.implementationStatus}" but has no entry in tool-implementation-registry.json.`);
      hasError = true;
    }

    if (!isReleased && isRegistered) {
      console.error(`Error: Catalog tool "${tool.slug}" is marked planned but is registered in tool-implementation-registry.json.`);
      hasError = true;
    }
  }

  if (hasError) {
    console.error('\nTool Implementation Validation Failed.');
    process.exit(1);
  }

  console.log('Tool Implementation Validation Successful!');
  console.log(`Released implementations: ${registryKeys.length}`);
  console.log(`Released slugs: ${registryKeys.join(', ')}`);
  console.log(`Catalog entries checked: ${catalog.length}`);
  console.log(`Adapters checked: ${Object.keys(adapterRegistry).length}`);
  process.exit(0);

} catch (err) {
  console.error('Tool Implementation Validation failed with unexpected error:', err.message);
  process.exit(1);
}
