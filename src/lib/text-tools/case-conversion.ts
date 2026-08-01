import type { CaseConversionMode } from './types';

/**
 * Tokenize input text into clean words/tokens for identifier casing modes.
 * Uses Unicode property escapes for letters (\p{L}), marks (\p{M}), and numbers (\p{N}).
 */
function tokenizeText(text: string): string[] {
  if (!text) return [];

  // Match sequences of Unicode letters/marks/numbers or transition split on camelCase
  const normalized = text
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');

  const tokens = normalized.match(/[\p{L}\p{M}\p{N}]+/gu);
  return tokens ? tokens.map((t) => t.trim()).filter((t) => t.length > 0) : [];
}

/**
 * Capitalize the first character of a word.
 */
function capitalizeWord(word: string): string {
  if (!word) return '';
  const chars = Array.from(word);
  return chars[0].toUpperCase() + chars.slice(1).join('').toLowerCase();
}

/**
 * Pure, Unicode-aware case conversion engine.
 */
export function convertCase(text: string, mode: CaseConversionMode): string {
  if (!text || text.length === 0) return '';

  switch (mode) {
    case 'uppercase':
      return text.toUpperCase();

    case 'lowercase':
      return text.toLowerCase();

    case 'title-case':
      return text.replace(/[\p{L}\p{M}\p{N}]+/gu, (word) => {
        const chars = Array.from(word);
        return chars[0].toUpperCase() + chars.slice(1).join('').toLowerCase();
      });

    case 'sentence-case': {
      // Lowercase text first while preserving original line break delimiters (\r\n, \r, \n) and spacing
      const lower = text.toLowerCase();
      // Capitalize first Unicode letter at text start (^\s*), after linebreaks ([\r\n]+\s*), or after sentence punctuation ([.!?]+\s+)
      return lower.replace(/(^\s*|[\r\n]+\s*|[.!?]+\s+)(\p{L})/gu, (match, prefix, char) => {
        return prefix + char.toUpperCase();
      });
    }

    case 'camel-case': {
      const tokens = tokenizeText(text);
      if (tokens.length === 0) return '';
      return (
        tokens[0].toLowerCase() +
        tokens
          .slice(1)
          .map((t) => capitalizeWord(t))
          .join('')
      );
    }

    case 'pascal-case': {
      const tokens = tokenizeText(text);
      if (tokens.length === 0) return '';
      return tokens.map((t) => capitalizeWord(t)).join('');
    }

    case 'snake-case': {
      const tokens = tokenizeText(text);
      if (tokens.length === 0) return '';
      return tokens.map((t) => t.toLowerCase()).join('_');
    }

    case 'kebab-case': {
      const tokens = tokenizeText(text);
      if (tokens.length === 0) return '';
      return tokens.map((t) => t.toLowerCase()).join('-');
    }

    case 'constant-case': {
      const tokens = tokenizeText(text);
      if (tokens.length === 0) return '';
      return tokens.map((t) => t.toUpperCase()).join('_');
    }

    default:
      return text;
  }
}
