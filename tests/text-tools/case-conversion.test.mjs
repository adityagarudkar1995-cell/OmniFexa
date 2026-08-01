import test from 'node:test';
import assert from 'node:assert/strict';
import { convertCase } from '../../src/lib/text-tools/case-conversion.ts';

test('Case Conversion Engine - Empty input', () => {
  assert.equal(convertCase('', 'uppercase'), '');
  assert.equal(convertCase('', 'camel-case'), '');
  assert.equal(convertCase('', 'kebab-case'), '');
});

test('Case Conversion Engine - Basic casing modes', () => {
  const text = "hello World! This IS a Test.";

  assert.equal(convertCase(text, 'uppercase'), "HELLO WORLD! THIS IS A TEST.");
  assert.equal(convertCase(text, 'lowercase'), "hello world! this is a test.");
  assert.equal(convertCase(text, 'title-case'), "Hello World! This Is A Test.");
  assert.equal(convertCase(text, 'sentence-case'), "Hello world! This is a test.");
});

test('Case Conversion Engine - Sentence Case Line & Indentation Boundaries (LF, CRLF, CR)', () => {
  // LF line beginning
  assert.equal(
    convertCase("HELLO WORLD\nSECOND LINE", 'sentence-case'),
    "Hello world\nSecond line"
  );

  // CRLF line beginning with indentation
  assert.equal(
    convertCase("HELLO\r\n  SECOND", 'sentence-case'),
    "Hello\r\n  Second"
  );

  // CR line beginning
  assert.equal(
    convertCase("FIRST\rSECOND", 'sentence-case'),
    "First\rSecond"
  );

  // Multiple paragraphs
  assert.equal(
    convertCase("FIRST PARAGRAPH.\n\nSECOND PARAGRAPH.", 'sentence-case'),
    "First paragraph.\n\nSecond paragraph."
  );
});

test('Case Conversion Engine - Identifier modes', () => {
  const text = "Hello World  foo_bar-baz 123";

  assert.equal(convertCase(text, 'camel-case'), "helloWorldFooBarBaz123");
  assert.equal(convertCase(text, 'pascal-case'), "HelloWorldFooBarBaz123");
  assert.equal(convertCase(text, 'snake-case'), "hello_world_foo_bar_baz_123");
  assert.equal(convertCase(text, 'kebab-case'), "hello-world-foo-bar-baz-123");
  assert.equal(convertCase(text, 'constant-case'), "HELLO_WORLD_FOO_BAR_BAZ_123");
});

test('Case Conversion Engine - Unicode & Emoji safety', () => {
  const emoji = "😀 😃 😄";
  assert.doesNotThrow(() => convertCase(emoji, 'kebab-case'));
  assert.doesNotThrow(() => convertCase(emoji, 'title-case'));

  const hindi = "नमस्ते दुनिया";
  assert.equal(convertCase(hindi, 'kebab-case'), "नमस्ते-दुनिया");
});
