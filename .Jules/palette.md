## 2025-06-04 - Prevent staggered screen reader readout for complex links
**Learning:** For links that contain multiple inline child elements (e.g., category and title `<span>` tags), screen readers may read them out in a staggered or disjointed manner.
**Action:** Apply a consolidated `aria-label` to the parent `<a>` element (or interactive container) that provides the full context, and add `aria-hidden="true"` to the inner child elements to hide the disjointed text chunks from screen readers.
