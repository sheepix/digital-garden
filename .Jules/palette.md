# Palette Journal\n

## 2025-03-02 - Enhanced Tag Deep Linking and Keyboard Navigation
**Learning:** Adding IDs and scroll-margin (`scroll-mt-24`) to dynamically generated content wrappers ensures deep links (e.g., `#tag-name`) don't get hidden behind fixed headers. Also, ARIA labels on tag links enhance context for screen readers, and maintaining consistent `focus-visible` ring styling ensures users navigating via keyboard can easily identify their focus points across Astro components.
**Action:** When implementing deep linking across components or dynamically generated content, always verify the target element has an appropriate ID and enough scroll margin. Use `focus-visible` utilities rather than just `:focus` to prevent annoying focus rings for mouse users while keeping them visible for keyboard navigation.
