## 2024-03-05 - Consolidated ARIA Labels on Composite Links
**Learning:** When creating interactive elements (like links or buttons) that contain multiple distinct inline elements (e.g., categories and titles in `Backlinks.astro`), applying `aria-label` to individual internal elements can cause staggered and inconsistent screen reader readout.
**Action:** Apply a single, consolidated `aria-label` to the parent interactive element (e.g., the `<a>` tag) and apply `aria-hidden="true"` to the internal decorative or text elements to ensure a cohesive and predictable screen reader experience.
