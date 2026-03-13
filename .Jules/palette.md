
## 2024-03-22 - Deep Link Anchors Hidden Under Fixed Headers
**Learning:** When using hash navigation (`#tag-name`) in Astro Starlight (which has a fixed top header), the target elements are often obscured behind the header upon scrolling.
**Action:** Always add Tailwind's `scroll-mt-24` (or similar scroll margin utility) to the target element (the element with the `id` attribute) so that when scrolled into view, there is enough margin at the top to clear the fixed header. Also remember to ensure `encodeURIComponent` is used on both the `href` and the `id` for non-alphanumeric tags.
