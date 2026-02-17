// remark-wiki-link-with-backlinks.js
// Enhanced remark-wiki-link that also extracts backlinks metadata
import wikiLinkPlugin from 'remark-wiki-link';
import { visit } from 'unist-util-visit';

// Configuration for wiki links
const wikiLinkConfig = {
  hrefTemplate: (permalink) => `/${permalink}`,
  pageResolver: (name) => [name.replace(/ /g, '-').toLowerCase()],
  aliasDivider: '|',
  markdownProperties: {
    dataProperties: {
      classes: ['wikilink'],
    },
  },
};

export function remarkWikiLink() {
  return wikiLinkPlugin(wikiLinkConfig);
}

// Plugin to extract all wiki links from AST for backlinks
export function remarkExtractWikiLinks() {
  return (tree, file) => {
    const links = [];
    
    visit(tree, 'wikiLink', (node) => {
      links.push({
        permalink: node.data.permalink,
        exists: node.data.exists !== false,
      });
    });
    
    // Store in file data for later use
    file.data.wikiLinks = links;
  };
}

// Combined plugin that both transforms wiki links AND extracts metadata
export function remarkWikiLinksWithBacklinks() {
  return (tree, file) => {
    // First, transform wiki links
    const transformer = wikiLinkPlugin(wikiLinkConfig);
    transformer(tree, file);
    
    // Then extract links for backlinks
    const links = [];
    visit(tree, 'wikiLink', (node) => {
      links.push({
        permalink: node.data.permalink,
        exists: node.data.exists !== false,
      });
    });
    
    file.data.wikiLinks = links;
  };
}
