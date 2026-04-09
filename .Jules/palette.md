## 2026-04-09 - Ensure Tag Trimming and Filtering for PageTags
**Learning:** Raw frontmatter strings may contain trailing spaces which result in incorrect slug generation and empty/duplicate attributes if not sanitized properly before processing tag lists in Astro templates.
**Action:** Always apply `.filter(tag => typeof tag === 'string' && tag.trim().length > 0)` and use `.trim()` on outputs when rendering user-defined array items.
