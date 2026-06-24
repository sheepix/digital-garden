## 2025-02-27 - Consolidated ARIA Labels for Multi-Element Links
**Learning:** Links containing multiple inline elements (like category and title spans) cause staggered and disjointed screen reader readout.
**Action:** Apply a consolidated `aria-label` to the parent `<a>` element and add `aria-hidden="true"` to the inner child elements to ensure a single, smooth announcement.