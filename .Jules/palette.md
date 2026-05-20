## 2026-05-20 - Backlinks Component Screen Reader Improvements
**Learning:** Structural landmarks like `<aside>` should be labeled with `aria-labelledby` pointing to their inner heading. Furthermore, when links contain multiple inline elements (like separate spans for category and title), it causes staggered screen reader readouts.
**Action:** Always label structural landmarks with `aria-labelledby`. Apply a consolidated `aria-label` to parent elements and `aria-hidden="true"` to inner child elements to provide a smoother screen reader experience.
