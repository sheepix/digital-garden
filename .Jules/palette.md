## 2024-06-29 - Improve screen reader accessibility in Backlinks
**Learning:** Staggered screen reader readouts can occur when links contain multiple inline elements like `<span>`. Structural landmarks like `<aside>` also need proper labeling.
**Action:** Apply a consolidated `aria-label` to the parent element and `aria-hidden="true"` to inner child elements to prevent staggered readout. Add `aria-labelledby` to landmarks pointing to inner headings.
