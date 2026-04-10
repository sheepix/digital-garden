
## 2026-04-10 - Screen Reader Continuity in Link Previews
**Learning:** For components that construct visual UI using multiple interior inline elements (like categories and titles in a backlink), screen readers will natively announce them as separate staggered pieces of text. This causes an inconsistent readout experience for users using accessibility tools.
**Action:** Apply `aria-label` on the parent interactive `<a>` element containing the fully synthesized text (e.g., "Page Title in category Group"), and apply `aria-hidden="true"` to the inner decorative or distinct `<span>` elements to force the screen reader to only announce the parent's descriptive text.
