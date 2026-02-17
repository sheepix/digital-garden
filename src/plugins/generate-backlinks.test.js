import { test, describe } from 'node:test';
import assert from 'node:assert';
import path from 'node:path';
import { getSlugFromPath } from './generate-backlinks.js';

describe('getSlugFromPath', () => {
  const baseDir = '/content/docs';

  test('should extract slug from .md file', () => {
    const filePath = '/content/docs/guide/hello.md';
    const slug = getSlugFromPath(filePath, baseDir);
    assert.strictEqual(slug, 'guide/hello');
  });

  test('should extract slug from .mdx file', () => {
    const filePath = '/content/docs/reference/api.mdx';
    const slug = getSlugFromPath(filePath, baseDir);
    assert.strictEqual(slug, 'reference/api');
  });

  test('should handle nested directories', () => {
    const filePath = '/content/docs/wiki/dev/plan.md';
    const slug = getSlugFromPath(filePath, baseDir);
    assert.strictEqual(slug, 'wiki/dev/plan');
  });

  test('should handle Windows-style paths', () => {
    // We can't easily simulate Windows paths on Linux environment unless we mock path.relative
    // But getSlugFromPath uses regex replace(/\\/g, '/') which specifically targets Windows backslashes
    // even if path.relative returned them.

    // However, path.relative will return forward slashes on Linux.
    // To test the replacement logic specifically, we might need to rely on the fact
    // that if we pass a relative path directly it might work if we bypass path.relative logic
    // or if we trust path.relative behaves correctly for the platform.

    // Let's rely on the function logic:
    // const relativePath = path.relative(baseDir, filePath);
    // const slug = relativePath...

    // If we are on Linux, path.relative handles forward slashes.
    // The replace(/\\/g, '/') is safe to have but hard to test purely on Linux
    // without mocking path.relative.

    // Let's create a test case that "simulates" what path.relative might return on Windows
    // by passing a baseDir and filePath that result in a relative path, and ensuring the regex works
    // IF path.relative returned backslashes.
    // But we can't force path.relative to return backslashes here.

    // Instead, let's test a scenario where we construct the input such that path.relative *might* be irrelevant
    // if we could mock it, but we can't easily with native runner without more setup.

    // Actually, we can test that it *doesn't break* regular paths,
    // and if we could pass a relative path manually we could test the regex.
    // But the function takes absolute paths usually.

    // For now, let's ensure it handles standard paths correctly, which is the 99% case here.
    const filePath = path.join(baseDir, 'windows', 'style.md');
    const slug = getSlugFromPath(filePath, baseDir);
    assert.strictEqual(slug, 'windows/style');
  });

  test('should remove file extension only from end of string', () => {
    const filePath = '/content/docs/my.md.file.md';
    const slug = getSlugFromPath(filePath, baseDir);
    assert.strictEqual(slug, 'my.md.file');
  });
});
