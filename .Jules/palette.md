## 2024-05-03 - Accessible Links with Multiple Child Elements
**Learning:** When a link contains multiple distinct visual elements (like a category badge and a title), screen readers may read them sequentially or staggeredly, which can be confusing or disjointed.
**Action:** Always compute a consolidated label string, apply it as the `aria-label` to the parent `<a>` element, and add `aria-hidden="true"` to the internal child elements to ensure a single, clean readout. Also, explicitly add `.link:focus-visible` states using existing design tokens for keyboard navigation support.
