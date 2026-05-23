## 2025-05-18 - Added `aria-labelledby` to structural landmark `<aside>`

**Learning:** Structural landmarks in Astro components, like `<aside>`, need explicit `aria-labelledby` attributes pointing to an internal heading `id` to be properly labeled and announced by screen readers.
**Action:** When adding or modifying semantic landmarks (`<aside>`, `<nav>`, `<section>`), ensure they have an associated heading with an `id` and are labeled using `aria-labelledby` to provide context for screen reader users.