## 2024-05-24 - Consolidated aria-labels for multi-element links
**Learning:** Links containing multiple distinct inline elements (like categories and titles in `Backlinks.astro`) cause staggered and inconsistent readout in screen readers.
**Action:** Apply a consolidated `aria-label` to the parent element and `aria-hidden="true"` to the internal elements to prevent staggered and inconsistent screen reader readout.
