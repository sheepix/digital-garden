## 2024-05-23 - Structural Landmarks Accessibility
**Learning:** Screen readers cannot infer the purpose of structural landmarks like `<aside>` or `<section>` without an explicit label. Unlabeled landmarks reduce navigability and context.
**Action:** Always label structural landmarks using `aria-labelledby` pointing to the `id` of their inner heading element to ensure clear context for screen reader users.
