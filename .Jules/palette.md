## 2024-05-24 - Consolidated Backlink Labels and Landmark Labeling
**Learning:** Screen readers announce inline elements sequentially, causing staggered readout for links spanning multiple spans. <aside> tags lack context without labels.
**Action:** Add consolidated `aria-label` to parent links and `aria-hidden='true'` to child elements. Add `aria-labelledby` to landmarks pointing to inner heading IDs.
