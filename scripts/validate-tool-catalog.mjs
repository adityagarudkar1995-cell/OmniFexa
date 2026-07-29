import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const catalogPath = resolve(__dirname, '../src/data/tool-catalog.json');
const registryPath = resolve(__dirname, '../src/data/result-adapter-registry.json');

try {
  const catalogContent = readFileSync(catalogPath, 'utf-8');
  const catalog = JSON.parse(catalogContent);

  const registryContent = readFileSync(registryPath, 'utf-8');
  const registry = JSON.parse(registryContent);
  
  if (!Array.isArray(catalog)) {
    console.error('Error: Catalog is not an array.');
    process.exit(1);
  }

  const validCategories = [
    'pdf-compress-core', 'pdf-edit-view', 'pdf-security-scan',
    'convert-from-pdf', 'convert-to-pdf', 'ai-pdf', 'image',
    'screenshot-editor', 'ocr-handwriting', 'whiteboard-design',
    'text-writing', 'converters-generators', 'developer',
    'calculators', 'audio-video'
  ];
  
  const validPhases = [
    'phase-1-foundation', 'phase-2-core-launch', 'phase-3-document-workflows',
    'phase-4-advanced-conversion', 'phase-5-ai-tools', 'phase-6-media-and-growth'
  ];

  const validProcessingModes = ['client', 'server', 'hybrid', 'research-required'];
  const validResultAdapters = Object.keys(registry);
  const validStatuses = ['planned', 'in-progress', 'alpha', 'beta', 'production'];

  const kebabRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;

  const ids = new Set();
  const slugs = new Set();

  let hasError = false;
  
  const categoriesCount = {};
  const phasesCount = {};
  let featuredCount = 0;

  for (const tool of catalog) {
    const requiredFields = [
      'id', 'slug', 'name', 'shortDescription', 'category', 'subcategory',
      'keywords', 'hinglishKeywords', 'phase', 'implementationStatus',
      'processingMode', 'resultAdapter', 'inputFormats', 'outputFormats',
      'requiresBackend', 'requiresAI', 'licensingReviewRequired', 'featured',
      'seoTitle', 'seoDescription', 'notes'
    ];

    for (const field of requiredFields) {
      if (!(field in tool)) {
        console.error(`Error in tool "${tool.name || tool.id}": Missing field "${field}"`);
        hasError = true;
      }
    }

    if (typeof tool.id !== 'string' || tool.id.trim() === '') {
      console.error(`Error in tool "${tool.name}": Invalid id`);
      hasError = true;
    }

    if (typeof tool.slug !== 'string' || !kebabRegex.test(tool.slug)) {
      console.error(`Error in tool "${tool.name}": Invalid slug "${tool.slug}". Must be URL-safe kebab-case.`);
      hasError = true;
    }

    if (!Array.isArray(tool.keywords) || tool.keywords.length === 0) {
      console.error(`Error in tool "${tool.name}": keywords must be a non-empty array`);
      hasError = true;
    }

    if (!Array.isArray(tool.hinglishKeywords)) {
      console.error(`Error in tool "${tool.name}": hinglishKeywords must be an array`);
      hasError = true;
    }

    if (typeof tool.seoTitle !== 'string' || tool.seoTitle.trim() === '') {
      console.error(`Error in tool "${tool.name}": Invalid seoTitle`);
      hasError = true;
    }

    if (typeof tool.seoDescription !== 'string' || tool.seoDescription.trim() === '') {
      console.error(`Error in tool "${tool.name}": Invalid seoDescription`);
      hasError = true;
    }

    if (!validProcessingModes.includes(tool.processingMode)) {
      console.error(`Error in tool "${tool.name}": Invalid processingMode "${tool.processingMode}"`);
      hasError = true;
    }

    if (!validResultAdapters.includes(tool.resultAdapter)) {
      console.error(`Error in tool "${tool.name}": Invalid resultAdapter "${tool.resultAdapter}". Must map to one of registered adapters: ${validResultAdapters.join(', ')}`);
      hasError = true;
    }

    if (!validPhases.includes(tool.phase)) {
      console.error(`Error in tool "${tool.name}": Invalid phase "${tool.phase}"`);
      hasError = true;
    }

    if (!validStatuses.includes(tool.implementationStatus)) {
      console.error(`Error in tool "${tool.name}": Invalid implementationStatus "${tool.implementationStatus}"`);
      hasError = true;
    }

    if (!validCategories.includes(tool.category)) {
      console.error(`Error in tool "${tool.name}": Invalid category "${tool.category}"`);
      hasError = true;
    }

    if (ids.has(tool.id)) {
      console.error(`Error in tool "${tool.name}": Duplicate id "${tool.id}"`);
      hasError = true;
    }
    ids.add(tool.id);

    if (slugs.has(tool.slug)) {
      console.error(`Error in tool "${tool.name}": Duplicate slug "${tool.slug}"`);
      hasError = true;
    }
    slugs.add(tool.slug);

    categoriesCount[tool.category] = (categoriesCount[tool.category] || 0) + 1;
    phasesCount[tool.phase] = (phasesCount[tool.phase] || 0) + 1;
    if (tool.featured) featuredCount++;
  }

  if (hasError) {
    console.error('\nValidation failed.');
    process.exit(1);
  }

  console.log('Validation successful!');
  console.log(`Total tools: ${catalog.length}`);
  console.log(`Featured tools: ${featuredCount}`);
  console.log(`Verified result adapters: ${validResultAdapters.length} adapters registered`);
  
  console.log('\nTools per category:');
  for (const [cat, count] of Object.entries(categoriesCount)) {
    console.log(`- ${cat}: ${count}`);
  }
  
  console.log('\nTools per phase:');
  for (const [phase, count] of Object.entries(phasesCount)) {
    console.log(`- ${phase}: ${count}`);
  }

  process.exit(0);

} catch (err) {
  console.error('Validation failed with an unexpected error:', err.message);
  process.exit(1);
}
