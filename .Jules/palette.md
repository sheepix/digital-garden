## 2026-05-17 - Compound Link Accessibility
**Learning:** For links that contain multiple distinct pieces of text (like category + title), screen readers may read them in a staggered or disjointed manner.
**Action:** Apply a consolidated `aria-label` on the parent link element that combines the text into a natural reading flow, and apply `aria-hidden="true"` to the internal text elements to prevent duplicate reading.
