## 2025-02-20 - Consolidated ARIA Labels for Multi-Element Links and Accessible Focus States
**Learning:** When an interactive element like a link (`<a>`) contains multiple distinct sub-elements visually styled differently (e.g. category and title spans), screen readers may read them sequentially with awkward pauses or repetitively.
**Action:** Apply a consolidated, descriptive `aria-label` to the parent `<a>` wrapper and add `aria-hidden="true"` to the internal child `<span>` elements to ensure a unified and clear readout.

**Learning:** When styling `:focus-visible` states for Astro Starlight components, custom `outline` rules without design token integration can look inconsistent with the theme.
**Action:** Utilize existing CSS variables such as `var(--sl-color-accent)` to define `outline` color for `:focus-visible` to maintain high contrast and strict thematic consistency.
