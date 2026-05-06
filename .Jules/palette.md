## 2024-05-18 - Consolidated ARIA Label for Complex Links
**Learning:** When a link contains multiple distinct visual elements (like a category pill and a title), screen readers may read them out as staggered, confusing, or separated elements.
**Action:** Always apply a consolidated `aria-label` to the parent `<a>` element and add `aria-hidden="true"` to the internal child elements to ensure a single, coherent, and logical readout for screen reader users.
