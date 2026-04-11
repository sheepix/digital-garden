## 2024-04-11 - Consolidating ARIA labels on composite inline links
**Learning:** For components containing multiple distinct inline elements (like categories and titles inside `Backlinks.astro`), screen readers may stagger the readout, causing a disjointed UX.
**Action:** Apply a consolidated `aria-label` to the parent wrapper and `aria-hidden="true"` to the internal elements to ensure smooth and clear screen reader readouts. Also, keyboard accessibility requires `.focus-visible:ring` utilities when using Tailwind.
