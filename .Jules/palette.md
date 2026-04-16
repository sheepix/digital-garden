## 2024-04-16 - Consolidated ARIA Labels for Multi-Element Links
**Learning:** When links or interactive components contain multiple distinct inline elements (e.g., categories and titles in `Backlinks.astro`), screen readers may read them out in a staggered, disjointed way.
**Action:** Apply a consolidated `aria-label` to the parent `<a>` element and add `aria-hidden="true"` to the internal elements to ensure a single, consistent readout.
