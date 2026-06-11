## 2026-02-14 - Prevent staggered readouts in compound links
**Learning:** Screen readers often read links with multiple inner spans in a staggered, disjointed way.
**Action:** Apply a consolidated `aria-label` to the parent `<a>` element and `aria-hidden="true"` to the inner child `<span>` elements for a smoother experience.
