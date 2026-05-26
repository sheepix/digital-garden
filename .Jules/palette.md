## 2024-05-26 - Prevent Staggered Screen Reader Readouts in Links
**Learning:** Screen readers may read out inline child elements of a link in a staggered or disjointed manner, reducing accessibility when a link contains multiple text elements (e.g., category and title spans).
**Action:** Always combine the logical text contents into a single `aria-label` on the parent `<a>` element, and apply `aria-hidden="true"` to the inner child `<span>` elements to ensure the screen reader announces a smooth, cohesive description.
