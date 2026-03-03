## 2024-05-24 - Semantic Tag Navigation
**Learning:** The `#tag` prefix convention in UI links can be read redundantly by screen readers if not properly labeled. Additionally, generic internal tag links lacking anchor targets fail to support deep linking capabilities.
**Action:** Use semantic `<nav>` elements for tag containers, provide descriptive `aria-label` attributes for tag links to improve screen reader context, implement deep linking `href`s (e.g., `#tag-{name}`), and apply explicit `focus-visible` utility classes to ensure robust keyboard navigation support.
