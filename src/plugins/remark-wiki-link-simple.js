// remark-wiki-link-simple.js
// Simple wiki link support for Astro Starlight
import wikiLinkPlugin from 'remark-wiki-link';

export function remarkWikiLink() {
  return wikiLinkPlugin();
}
