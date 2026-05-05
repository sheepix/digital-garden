## 2026-05-05 - Improve screen reader readout for complex links
**Learning:** Multiple distinct inline elements inside interactive components (like links) can cause staggered and confusing screen reader readouts.
**Action:** Apply a consolidated `aria-label` to the parent interactive element and add `aria-hidden="true"` to the internal child elements to ensure a single, consistent readout.
