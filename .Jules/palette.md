## 2025-05-28 - Screen Reader Compatibility for Complex Links
**Learning:** When links contain multiple inline elements (like spans for category and title), screen readers can stutter or read them in a disjointed, staggered manner.
**Action:** Apply a consolidated `aria-label` to the parent `<a>` element and `aria-hidden="true"` to the inner child elements to provide a smooth, single announcement.
