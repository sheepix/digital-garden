## 2024-07-01 - Consolidating Screen Reader Annoucements for Complex Links
**Learning:** In Astro components like Backlinks, links containing multiple semantic spans (e.g. category and title) cause staggered and confusing readouts for screen readers. Furthermore, semantic landmarks like `<aside>` are often not properly labelled.
**Action:** Use consolidated `aria-label`s on the parent `<a>` element and apply `aria-hidden="true"` to child elements to create a single, clear announcement. Always use `aria-labelledby` linking to heading IDs for structural landmarks like `<aside>`.
