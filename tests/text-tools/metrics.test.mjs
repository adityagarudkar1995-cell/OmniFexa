import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTextMetrics } from '../../src/lib/text-tools/metrics.ts';

test('Word & Character Counter Engine - Empty string', () => {
  const metrics = calculateTextMetrics('');
  assert.equal(metrics.words, 0);
  assert.equal(metrics.charactersWithSpaces, 0);
  assert.equal(metrics.charactersWithoutSpaces, 0);
  assert.equal(metrics.sentences, 0);
  assert.equal(metrics.paragraphs, 0);
  assert.equal(metrics.lines, 0);
  assert.equal(metrics.readingTimeMinutes, 0);
  assert.equal(metrics.speakingTimeMinutes, 0);
  assert.equal(metrics.readingTimeFormatted, '0 min');
  assert.equal(metrics.speakingTimeFormatted, '0 min');
});

test('Word & Character Counter Engine - Single word & spaces', () => {
  const metrics = calculateTextMetrics('  Hello  ');
  assert.equal(metrics.words, 1);
  assert.equal(metrics.charactersWithSpaces, 9);
  assert.equal(metrics.charactersWithoutSpaces, 5);
  assert.equal(metrics.lines, 1);
  assert.equal(metrics.paragraphs, 1);
});

test('Word & Character Counter Engine - Multi-line and paragraphs (LF and CRLF)', () => {
  const text = "First paragraph here.\n\nSecond paragraph here.\r\n\r\nThird paragraph line 1.\r\nThird paragraph line 2.";
  const metrics = calculateTextMetrics(text);
  assert.equal(metrics.words, 14);
  assert.equal(metrics.paragraphs, 3);
  assert.equal(metrics.lines, 6);
  assert.equal(metrics.sentences, 4);
});

test('Word & Character Counter Engine - Line endings and paragraph separation (CR, LF, CRLF, whitespace blank lines)', () => {
  // CR-only blank line
  assert.equal(calculateTextMetrics("First\r\rSecond").paragraphs, 2);

  // Whitespace-only blank line
  assert.equal(calculateTextMetrics("First\n   \nSecond").paragraphs, 2);

  // CRLF whitespace blank line
  assert.equal(calculateTextMetrics("First\r\n\t\r\nSecond").paragraphs, 2);

  // Blank-only text
  assert.equal(calculateTextMetrics("\n\n").paragraphs, 0);
  assert.equal(calculateTextMetrics("\r\n \r\n").paragraphs, 0);

  // Single paragraph
  assert.equal(calculateTextMetrics("Single paragraph").paragraphs, 1);
});

test('Word & Character Counter Engine - Indian Unicode text (Hindi / Marathi)', () => {
  const hindiText = "नमस्ते दुनिया! OmniFexa एक बेहतरीन प्लेटफ़ॉर्म है।";
  const metrics = calculateTextMetrics(hindiText);
  assert.ok(metrics.words > 0);
  assert.ok(metrics.charactersWithSpaces > 0);
  assert.ok(metrics.sentences >= 2);
});

test('Word & Character Counter Engine - Emoji & grapheme boundaries', () => {
  const text = "Hello 👋 world 🌍!";
  const metrics = calculateTextMetrics(text);
  assert.equal(metrics.words, 2);
  assert.equal(metrics.charactersWithSpaces, 16);
});

test('Word & Character Counter Engine - Time estimates', () => {
  // 200 words = 1 min reading, ~1.5 min speaking
  const hundredWords = Array(200).fill('word').join(' ');
  const metrics = calculateTextMetrics(hundredWords);
  assert.equal(metrics.words, 200);
  assert.equal(metrics.readingTimeFormatted, '1 min');
  assert.equal(metrics.speakingTimeFormatted, '2 mins');
});
