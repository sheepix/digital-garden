## 2024-05-24 - Backlinks Accessibility
**Learning:** Staggered screen reader readout for links containing multiple elements (category and title) can be fixed by putting a consolidated `aria-label` on the anchor and `aria-hidden="true"` on the inner spans. Structural landmarks like `<aside>` also need `aria-labelledby` pointing to their heading's `id` for proper labeling.
**Action:** Use consolidated `aria-label`s on wrapper elements with `aria-hidden` inner elements for complex links. Always label structural elements like `<aside>`, `<nav>`, or `<section>` using `aria-labelledby`.
