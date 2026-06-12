
## 2024-06-12 - Structural Landmark and Multi-element Link Accessibility
**Learning:** Structural landmarks like `<aside>` in Astro components need `aria-labelledby` pointing to their inner heading's ID. Links containing multiple inline elements (like spans for category and title) cause staggered screen reader readouts unless consolidated with an `aria-label` on the parent and `aria-hidden="true"` on the children.
**Action:** Always label structural landmarks explicitly and consolidate multi-element interactive controls with `aria-hidden` on children and a unified `aria-label` on the parent.
