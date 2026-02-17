// backlinks-plugin.js
// Builds a backlinks index at build time
import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'astro/loaders';

/**
 * Creates a backlinks collector for Starlight
 * This runs at build time and generates backlink data
 */
export function createBacklinksPlugin() {
  return {
    name: 'starlight-backlinks',
    
    async hooks?.build?.({ astro, pages }) {
      // This will collect wiki links from all MDX/MD files
      const backlinks = {};
      
      // For now, we'll create a simple global backlinks data file
      // that can be imported by the component
      console.log('[Backlinks] Plugin initialized');
      
      return { links: backlinks };
    },
    
    hooks: {
      'astro:build:done': async ({ pages, dir }) => {
        // At build time, we can generate a JSON of all pages and their links
        // This is a simple approach - for production, you'd want more sophisticated analysis
        console.log('[Backlinks] Build complete');
      }
    }
  };
}
