## 2026-04-29 - Improve screen reader experience for links containing distinct inline text
**Learning:** Screen readers often announce nested elements like `<span>`s with a slight pause or staggered pronunciation, which can make links with multiple descriptive parts (like category and title) sound disconnected or repetitive.
**Action:** Always apply a consolidated `aria-label` to the parent anchor `<a>` element, and set `aria-hidden="true"` on the distinct internal `<span>` text nodes to provide a cleaner and singular read-out.
