## 2025-06-13 - Staggered screen reader reads on complex link blocks
**Learning:** Screen readers may read out complex inline elements staggered if an overarching label is not provided. Structural landmarks like `<aside>` also need proper `aria-labelledby` referencing their heading for optimal context.
**Action:** When a link contains multiple distinct spans (like a category and a title), apply a consolidated `aria-label` to the parent `<a>` and hide the children via `aria-hidden="true"`. Ensure structural `<aside>` sections are correctly labelled by an inner `<h3>` with a matching `id`.
