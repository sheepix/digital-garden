## 2024-05-22 - Backlinks Accessibility
**Learning:** The `Backlinks` component is injected via `MarkdownContent.astro` and not directly in page layouts. It was missing `aria-labelledby` for its `aside` region and lacked focus styles for keyboard navigation.
**Action:** When working on similar components, ensure landmark regions have accessible names and interactive elements have clear focus states, especially when using custom styling outside of Tailwind's defaults.
