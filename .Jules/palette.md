## 2026-05-18 - Consolidated Link Readouts
**Learning:** Screen readers often read multiple nested elements inside a link in a staggered, fragmented way (e.g., pausing between 'Category' and 'Title'), which degrades the experience.
**Action:** Apply a consolidated `aria-label` to the parent `<a>` element and add `aria-hidden="true"` to the internal visual `<span>` elements so the entire link is read seamlessly as a single entity.
