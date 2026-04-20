## 2026-04-20 - Multi-element link screen reader stuttering
**Learning:** Links containing multiple distinct inline elements (like a category and a title) can cause screen readers to read the link in a staggered, confusing manner.
**Action:** Consolidate the screen reader text by applying a comprehensive `aria-label` to the parent `<a>` element, and adding `aria-hidden="true"` to the inner elements (e.g., spans for category and title) to prevent redundant or broken readout.
