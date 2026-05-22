## 2024-05-18 - Prevent Staggered Screen Reader Readout on Compound Links
**Learning:** Structural landmarks like `<aside>` in Astro components need `aria-labelledby` pointing to their inner heading. Compound links containing multiple inline text elements (like spans for category and title) cause staggered and disjointed readout by screen readers.
**Action:** Always add `aria-labelledby` to `<aside>` referencing its heading `id`. Apply a consolidated `aria-label` to the parent `<a>` element and `aria-hidden="true"` to inner child elements to provide a single, cohesive announcement.
