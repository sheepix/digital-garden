## 2025-06-21 - Accessible Backlinks Component
**Learning:** Staggered screen reader announcements can occur when structural `<span>` elements are used inside `<a>` tags.
**Action:** Consolidate the announcement by applying a unified `aria-label` to the parent `<a>` element and adding `aria-hidden="true"` to the inner `<span>` structural elements.
