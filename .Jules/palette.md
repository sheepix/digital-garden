
## 2026-04-30 - Consolidated ARIA labels for multi-part inline elements
**Learning:** When interactive elements (like links or buttons) contain multiple distinct text elements (e.g., a category and a title), screen readers may announce them in a staggered or confusing manner. Applying a consolidated `aria-label` to the parent element and `aria-hidden="true"` to the internal child elements ensures a seamless and clear readout.
**Action:** Apply this pattern to components like Backlinks.astro to improve the screen reader experience.
