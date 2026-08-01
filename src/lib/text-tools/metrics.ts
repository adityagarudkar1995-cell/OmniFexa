import type { TextMetrics } from './types';

/**
 * Format minutes duration into human-readable text.
 */
function formatTimeEstimate(minutes: number): string {
  if (minutes <= 0) return '0 min';
  if (minutes < 1) return '< 1 min';
  const rounded = Math.round(minutes);
  return `${rounded} min${rounded === 1 ? '' : 's'}`;
}

/**
 * Pure, Unicode-aware text metrics calculation engine.
 */
export function calculateTextMetrics(text: string): TextMetrics {
  if (!text || text.length === 0) {
    return {
      words: 0,
      charactersWithSpaces: 0,
      charactersWithoutSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
      readingTimeFormatted: '0 min',
      speakingTimeFormatted: '0 min',
    };
  }

  // Normalize CRLF (\r\n) and CR-only (\r) to LF (\n) for line and paragraph analysis only
  const normalizedText = text.replace(/\r\n|\r/g, '\n');

  // 1. Lines count
  const lines = normalizedText.split('\n').length;

  // 2. Paragraphs count (non-empty blocks separated by one or more blank lines, including whitespace-only lines)
  const paragraphs = normalizedText
    .split(/\n\s*\n+/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0).length;

  // 3. Characters with spaces (Unicode code points array fallback)
  let charactersWithSpaces = 0;
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    charactersWithSpaces = Array.from(segmenter.segment(text)).length;
  } else {
    charactersWithSpaces = Array.from(text).length;
  }

  // 4. Characters without spaces (removes Unicode whitespace)
  const textWithoutSpaces = text.replace(/\s+/g, '');
  let charactersWithoutSpaces = 0;
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    charactersWithoutSpaces = Array.from(segmenter.segment(textWithoutSpaces)).length;
  } else {
    charactersWithoutSpaces = Array.from(textWithoutSpaces).length;
  }

  // 5. Words count
  let words = 0;
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' });
    for (const segment of segmenter.segment(text)) {
      if (segment.isWordLike) {
        words++;
      }
    }
  } else {
    const tokens = text.trim().split(/\s+/).filter(Boolean);
    words = tokens.length;
  }

  // 6. Sentences estimate
  let sentences = 0;
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'sentence' });
    sentences = Array.from(segmenter.segment(text)).filter((s) => s.segment.trim().length > 0).length;
  } else {
    sentences = text
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0).length;
  }

  // 7. Time estimates (Reading: 200 WPM, Speaking: 130 WPM)
  const readingTimeMinutes = words > 0 ? words / 200 : 0;
  const speakingTimeMinutes = words > 0 ? words / 130 : 0;

  return {
    words,
    charactersWithSpaces,
    charactersWithoutSpaces,
    sentences,
    paragraphs,
    lines,
    readingTimeMinutes,
    speakingTimeMinutes,
    readingTimeFormatted: formatTimeEstimate(readingTimeMinutes),
    speakingTimeFormatted: formatTimeEstimate(speakingTimeMinutes),
  };
}
