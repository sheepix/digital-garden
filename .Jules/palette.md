## 2024-05-15 - Consolidate ARIA labels for multi-element links
**Learning:** Links containing multiple visual elements (like a category and a title) can result in staggered, redundant, or confusing readout for screen reader users if each element is read separately.
**Action:** Apply a consolidated `aria-label` to the parent `<a>` tag that forms a complete phrase, and set `aria-hidden="true"` on the individual inner visual elements to provide a single, cohesive announcement.
