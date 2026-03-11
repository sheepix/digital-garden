## 2024-03-11 - Dynamic Deep Linking with Fixed Headers
**Learning:** When implementing dynamic deep linking (e.g. `href="/tags/#tag-{name}"`), the target anchor needs two critical additions for usability: URL encoding for the target string (`encodeURIComponent` to handle spaces or special characters safely), and scroll margins (`scroll-mt-24`) to prevent the fixed header from obscuring the target when it scrolls into view.

**Action:** Ensure that all anchor fragments referencing dynamic data apply `encodeURIComponent()` to the anchor name. Also, verify that the corresponding target element defines `scroll-mt-*` matching the site`s header height.
