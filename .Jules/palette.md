## 2024-05-14 - Screen Reader Staggered Link Readout
**Learning:** When links contain multiple separate inline elements (like spans), screen readers can sometimes read them out in a staggered, fragmented way rather than as a single clear phrase.
**Action:** Use a consolidated `aria-label` on the parent `<a href="...">` and apply `aria-hidden="true"` to the inner child elements. This provides a unified text for screen readers while maintaining the visual layout.
