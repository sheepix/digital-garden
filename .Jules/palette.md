## 2025-02-23 - Prevent Staggered Screen Reader Readout in Inline Elements
**Learning:** When an interactive element (like a link or button) contains multiple inline text elements (like spans), screen readers may read them out in a staggered, disjointed manner.
**Action:** Apply a consolidated `aria-label` to the parent interactive element and set `aria-hidden="true"` on the inner child elements to ensure a smooth, continuous readout.

## 2025-02-23 - Consistent Focus Styles in Astro Starlight
**Learning:** Maintaining visual consistency for keyboard navigation across custom components is crucial in a themable environment like Astro Starlight.
**Action:** Use existing CSS variables for focus styles (e.g., `outline: 2px solid var(--sl-color-accent); outline-offset: 2px;`) to ensure the focus indicator respects the current theme's accent color.