## 2024-05-20 - Consolidating inline elements for Screen Readers
**Learning:** When links or interactive components contain multiple distinct inline elements (e.g., categories and titles), screen readers often read them out in a staggered, disconnected manner. Applying a consolidated `aria-label` to the parent element and `aria-hidden="true"` to the internal elements prevents this and provides a smoother experience.
**Action:** Always verify if complex link structures need consolidated `aria-label`s on the parent and `aria-hidden` on the children to avoid redundant or staggered readout.
