## 2026-04-26 - Accessible Backlinks Component
**Learning:** Consolidating `aria-label`s on parent interactive elements (like `<a>` tags) while adding `aria-hidden="true"` to multiple inner `<span>` children prevents staggered and inconsistent screen reader readout, creating a single coherent announcement.
**Action:** When creating links with complex internal structure (e.g., category and title spans), always apply a comprehensive `aria-label` to the parent and hide the presentational children from screen readers.

## 2026-04-26 - Playwright CSS Verification
**Learning:** When verifying CSS variables (like `var(--sl-color-accent)`) in built Astro pages with Playwright, using the `file://` protocol can cause resolution failures, resulting in fallback colors being applied instead of the intended variable value.
**Action:** Always serve the built `dist/` directory over HTTP (e.g., `python3 -m http.server`) for accurate visual and programmatic verification of styles in Playwright.
