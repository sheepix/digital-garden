## 2024-05-09 - Consolidating ARIA labels for staggered readout
**Learning:** For links or interactive components containing multiple distinct inline elements (e.g., categories and titles in `Backlinks.astro`), screen readers may read them out in a staggered and inconsistent manner.
**Action:** Apply a consolidated `aria-label` to the parent element and `aria-hidden="true"` to the internal elements to prevent staggered and inconsistent screen reader readout.
