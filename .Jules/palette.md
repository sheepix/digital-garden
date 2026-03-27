## 2024-03-27 - Semantic Navigation and Focus Management for Tags
**Learning:** Using a generic `<div>` for a list of tags lacks semantic meaning for screen readers. Tag links also need clear focus indicators for keyboard navigation and descriptive aria-labels.
**Action:** Wrapped tag lists in `<nav aria-label="Page tags">` and added Tailwind `focus-visible` utility classes (`focus-visible:ring-2`, etc.) to improve keyboard navigation and accessibility.
