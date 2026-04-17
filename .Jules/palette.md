## 2024-05-15 - Consolidate ARIA labels for complex inline links
**Learning:** For interactive components (like backlink lists) that contain multiple distinct text elements (e.g., category and title), screen readers may stutter or read each piece of text inconsistently.
**Action:** Always apply a single, descriptive `aria-label` to the parent interactive element (e.g., `<a>`) and use `aria-hidden="true"` on the individual inner textual elements to ensure smooth and clear readout.
