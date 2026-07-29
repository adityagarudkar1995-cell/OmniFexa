import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const registryPath = resolve(__dirname, '../src/data/result-adapter-registry.json');
const catalogPath = resolve(__dirname, '../src/data/tool-catalog.json');

try {
  const registryContent = readFileSync(registryPath, 'utf-8');
  const registry = JSON.parse(registryContent);

  const catalogContent = readFileSync(catalogPath, 'utf-8');
  const catalog = JSON.parse(catalogContent);

  let hasError = false;

  const requiredAdapterIds = [
    'pdf',
    'image',
    'text',
    'code',
    'simple',
    'media',
    'whiteboard',
  ];

  if (typeof registry !== 'object' || registry === null || Array.isArray(registry)) {
    console.error('Error: Adapter registry is not a valid JSON object.');
    process.exit(1);
  }

  const registryKeys = Object.keys(registry);

  if (registryKeys.length !== requiredAdapterIds.length) {
    console.error(
      `Error: Adapter registry must contain exactly ${requiredAdapterIds.length} adapters, but found ${registryKeys.length}.`
    );
    hasError = true;
  }

  for (const requiredId of requiredAdapterIds) {
    if (!(requiredId in registry)) {
      console.error(`Error: Missing required adapter ID "${requiredId}" in registry.`);
      hasError = true;
    }
  }

  for (const [key, contract] of Object.entries(registry)) {
    if (key !== contract.id) {
      console.error(`Error: Registry key "${key}" does not match contract.id "${contract.id}".`);
      hasError = true;
    }

    if (typeof contract.name !== 'string' || contract.name.trim() === '') {
      console.error(`Error in adapter "${key}": Missing or empty name.`);
      hasError = true;
    }

    if (typeof contract.description !== 'string' || contract.description.trim() === '') {
      console.error(`Error in adapter "${key}": Missing or empty description.`);
      hasError = true;
    }

    if (!contract.capabilities || typeof contract.capabilities !== 'object') {
      console.error(`Error in adapter "${key}": Missing or invalid capabilities object.`);
      hasError = true;
    } else {
      if (!Array.isArray(contract.capabilities.exportFormats) || contract.capabilities.exportFormats.length === 0) {
        console.error(`Error in adapter "${key}": exportFormats must be a non-empty array.`);
        hasError = true;
      } else {
        for (const fmt of contract.capabilities.exportFormats) {
          if (!fmt.id || !fmt.label || !fmt.extension || !fmt.mimeType) {
            console.error(`Error in adapter "${key}": Invalid exportFormat object (missing id, label, extension, or mimeType).`);
            hasError = true;
          }
        }
      }
    }

    if (!Array.isArray(contract.defaultActions)) {
      console.error(`Error in adapter "${key}": defaultActions must be an array.`);
      hasError = true;
    } else {
      for (const act of contract.defaultActions) {
        if (!act.id || !act.label || !act.iconName) {
          console.error(`Error in adapter "${key}": Invalid defaultAction object (missing id, label, or iconName).`);
          hasError = true;
        }
      }
    }
  }

  // Verify catalog tools against registered adapters
  for (const tool of catalog) {
    if (!registry[tool.resultAdapter]) {
      console.error(`Error in tool "${tool.id}": References unknown resultAdapter "${tool.resultAdapter}".`);
      hasError = true;
    }
  }

  if (hasError) {
    console.error('\nAdapter Registry Validation Failed.');
    process.exit(1);
  }

  console.log('Adapter Registry Validation Successful!');
  console.log(`Adapter count: ${registryKeys.length}`);
  console.log(`Catalog tools checked: ${catalog.length}`);
  console.log(`Registered adapter IDs: ${registryKeys.join(', ')}`);
  process.exit(0);

} catch (err) {
  console.error('Adapter Registry Validation failed with unexpected error:', err.message);
  process.exit(1);
}
