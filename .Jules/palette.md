## 2024-10-24 - Screen Reader Link Readout & Landmark Labeling
**Learning:** Structural landmarks like `<aside>` need explicit `aria-labelledby` pointing to inner headings. Links with multiple inner elements (like category + title spans) cause staggered and disjointed screen reader readout unless consolidated.
**Action:** Use `aria-labelledby` for structural landmarks, and consolidate link content using a single `aria-label` on the parent `<a>` while hiding inner child elements with `aria-hidden="true"`.
