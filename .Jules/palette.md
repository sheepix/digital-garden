## 2026-02-18 - [Fix Broken Tags & Deep Linking]
**Learning:** Custom content processing scripts (like tag extraction) must robustly handle whitespace, especially when splitting content by `---`. Inadequate whitespace handling led to garbage tags like `\n\n` being generated.
**Action:** Always normalize whitespace (e.g., `.replace(/\s+/g, ' ')`) before tokenizing content for tag extraction.

**Learning:** Starlight's component props context can vary. `MarkdownContent.astro` may receive `entry` instead of `frontmatter` depending on usage.
**Action:** When overriding Starlight components, check both `Astro.props.entry?.data` and `Astro.props.frontmatter` for metadata access.
