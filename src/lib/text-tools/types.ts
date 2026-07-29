export interface TextMetrics {
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  readingTimeFormatted: string;
  speakingTimeFormatted: string;
}

export type CaseConversionMode =
  | 'uppercase'
  | 'lowercase'
  | 'title-case'
  | 'sentence-case'
  | 'camel-case'
  | 'pascal-case'
  | 'snake-case'
  | 'kebab-case'
  | 'constant-case';

export interface CaseConversionOption {
  id: CaseConversionMode;
  label: string;
  description: string;
}

export const CASE_CONVERSION_OPTIONS: CaseConversionOption[] = [
  { id: 'uppercase', label: 'UPPERCASE', description: 'Convert all letters to uppercase.' },
  { id: 'lowercase', label: 'lowercase', description: 'Convert all letters to lowercase.' },
  { id: 'title-case', label: 'Title Case', description: 'Capitalize the first letter of each word.' },
  { id: 'sentence-case', label: 'Sentence case', description: 'Capitalize the first letter of each sentence.' },
  { id: 'camel-case', label: 'camelCase', description: 'Combine words with lowercase first word and capitalized subsequent words.' },
  { id: 'pascal-case', label: 'PascalCase', description: 'Combine words with capitalized first letter of every word.' },
  { id: 'snake-case', label: 'snake_case', description: 'Combine lowercase words with underscores.' },
  { id: 'kebab-case', label: 'kebab-case', description: 'Combine lowercase words with hyphens.' },
  { id: 'constant-case', label: 'CONSTANT_CASE', description: 'Combine uppercase words with underscores.' },
];
