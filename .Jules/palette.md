# Palette's Journal

## 2024-03-24 - Accessible Deep Linking in Fixed Header Layouts
**Learning:** When deep linking to sections in an application with a fixed header, target sections become hidden under the header unless specific spacing logic is applied. Additionally, dynamic IDs and URLs constructed from user content (like tags) must be encoded for reliability, and focus states in dark mode need proper contrast offset.
**Action:** When creating anchor links, use `scroll-mt` classes (e.g., Tailwind's `scroll-mt-24`) on the target container. Always encode deep link inputs using `encodeURIComponent()`. Enhance keyboard navigation in dark contexts with offset rings (e.g., `dark:focus-visible:ring-offset-stone-900`) and ensure a semantic `<nav>` structure is used for tag lists.
