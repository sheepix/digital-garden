## 2024-05-21 - [Accessibility: Compound UI Elements]
**Learning:** When using compound UI elements like links that contain multiple distinct text spans (e.g., category and title), screen readers might read them out in a staggered or disjointed manner.
**Action:** Always apply a consolidated `aria-label` to the parent anchor element containing all necessary context, and use `aria-hidden="true"` on the individual child elements to prevent redundant or awkward announcements. Ensure structural elements like `<aside>` are properly linked to their headings using `aria-labelledby`.
