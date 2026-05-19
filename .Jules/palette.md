## 2024-05-19 - Screen reader staggered readouts for multi-element links
**Learning:** Links containing multiple distinct inline elements (like spans for category and title) cause screen readers to announce each element separately, resulting in a staggered and confusing readout for users.
**Action:** Consolidate the link text into a single `aria-label` on the parent `<a>` element and apply `aria-hidden="true"` to all inner children.
