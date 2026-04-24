## 2025-04-24 - Screen Reader Staggered Readout on Links

**Learning:** When a link or interactive component contains multiple distinct inline elements (like a category and a title, e.g., in `Backlinks.astro`), screen readers can read them out in a staggered, confusing manner.
**Action:** Consolidate the accessible name by applying an overall `aria-label` to the parent anchor element, and apply `aria-hidden="true"` to the internal child elements so the screen reader speaks a single, cohesive phrase.