## 2024-05-18 - Improve Screen Reader Feedback for Links with Multiple Inline Elements
**Learning:** When links or interactive components contain multiple distinct inline elements (like a category and a title), screen readers may read them out in a staggered, inconsistent, or disjointed manner.
**Action:** Apply a consolidated `aria-label` to the parent element (the `<a>` or `<button>`) with the full desired text, and add `aria-hidden="true"` to the internal child elements to prevent the screen reader from reading the disjointed parts separately.
