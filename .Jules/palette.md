## 2024-06-15 - Prevent Staggered Screen Reader Readout
**Learning:** Screen readers might read out links containing multiple distinct inline child elements sequentially in a staggered manner, negatively affecting the user experience.
**Action:** Apply a single comprehensive `aria-label` to the parent link element, and add `aria-hidden="true"` to its inner child elements to consolidate the readout. Also ensure semantic landmarks like `<aside>` are labeled with `aria-labelledby`.
