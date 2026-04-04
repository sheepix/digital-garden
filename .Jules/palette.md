## 2024-05-24 - Semantic Navigation for Dynamic Collections
**Learning:** Tag collections rendered simply as `<div>` containers with internal `<a>` links lack structural context for screen readers, meaning users aren't informed they are entering a list of tags.
**Action:** Always wrap dynamic tag or category collections in a `<nav aria-label="...">` element to provide a clear semantic boundary, and include `:focus-visible` states to ensure keyboard navigability on interactive dynamic items.
