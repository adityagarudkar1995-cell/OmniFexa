import type { AdapterContract, ResultAdapterType } from './types';
import ADAPTER_REGISTRY_JSON from '@/data/result-adapter-registry.json';

/** Canonical adapter registry loaded directly from result-adapter-registry.json */
export const ADAPTER_REGISTRY: Record<ResultAdapterType, AdapterContract> =
  ADAPTER_REGISTRY_JSON as Record<ResultAdapterType, AdapterContract>;

/** Get the contract for a given adapter type */
export function getAdapterContract(adapterType: ResultAdapterType): AdapterContract {
  if (!isValidAdapter(adapterType)) {
    throw new Error(`Unsupported workspace adapter type: ${adapterType}`);
  }
  return ADAPTER_REGISTRY[adapterType];
}

/** Check if a string is a valid registered adapter type (rejects prototype properties) */
export function isValidAdapter(adapterType: string): adapterType is ResultAdapterType {
  return (
    typeof adapterType === 'string' &&
    Object.prototype.hasOwnProperty.call(ADAPTER_REGISTRY, adapterType)
  );
}

/** Validate that all items in a catalog map to a valid registered adapter */
export function validateCatalogAdapters(
  catalog: Array<{ id: string; resultAdapter: string }>
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const tool of catalog) {
    if (!isValidAdapter(tool.resultAdapter)) {
      errors.push(`Tool "${tool.id}" references unknown resultAdapter "${tool.resultAdapter}"`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
