## 2024-04-23 - Improve Screen Reader Experience for Links with Multiple Inline Elements
**Learning:** When a link contains multiple distinct inline elements (like a category and a title), screen readers may read them out in a staggered, inconsistent, or disjointed manner.
**Action:** Apply a consolidated `aria-label` to the parent `<a>` element and use `aria-hidden="true"` on the internal elements to provide a smooth, unified screen reader experience.
