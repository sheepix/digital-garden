
## 2026-05-16 - Prevent Staggered Readout on Compound Links
**Learning:** Screen readers often read compound links containing multiple inner elements (like `span`s for category and title) in a staggered, disjointed manner, degrading the UX for visually impaired users.
**Action:** Consolidate the accessible name by adding a descriptive `aria-label` to the parent `<a>` element, and apply `aria-hidden="true"` to the inner child elements to prevent redundant or fragmented announcements.
