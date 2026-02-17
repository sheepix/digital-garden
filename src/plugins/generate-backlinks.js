// generate-backlinks.js
// Generates a backlinks index JSON at build time
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Go up two levels: from src/plugins to project root
const projectRoot = path.resolve(__dirname, '..', '..');
const contentDir = path.join(projectRoot, 'src/content/docs');

function getAllFiles(dir, files = [], visited = new Set()) {
  // Resolve symlinks to avoid infinite recursion
  let realDir;
  try {
    realDir = fs.realpathSync(dir);
  } catch (e) {
    // If the path cannot be resolved, skip it
    return files;
  }

  if (visited.has(realDir)) {
    return files;
  }
  visited.add(realDir);

  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    let stat;
    try {
      stat = fs.statSync(fullPath);
    } catch (e) {
      // Skip if we can't stat (e.g. broken symlink)
      continue;
    }

    if (stat.isDirectory()) {
      getAllFiles(fullPath, files, visited);
    } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractWikiLinks(content) {
  // Match [[link]] or [[link|alias]] patterns
  const wikiLinkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  const links = [];
  let match;
  while ((match = wikiLinkRegex.exec(content)) !== null) {
    const permalink = match[1].trim().replace(/ /g, '-').toLowerCase();
    links.push(permalink);
  }
  return links;
}

function getSlugFromPath(filePath, baseDir) {
  const relativePath = path.relative(baseDir, filePath);
  const slug = relativePath
    .replace(/\.mdx?$/, '')
    .replace(/\\/g, '/');
  return slug;
}

function generateBacklinks() {
  console.log('[Backlinks] Scanning content...');
  
  const files = getAllFiles(contentDir);
  const backlinks = {};
  
  // Extract links and build reverse index
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const slug = getSlugFromPath(file, contentDir);

    // Initialize backlinks for current page if not exists
    if (!backlinks[slug]) {
      backlinks[slug] = [];
    }

    const links = extractWikiLinks(content);
    
    for (const link of links) {
      // Add this page as a backlink to the target
      if (!backlinks[link]) {
        backlinks[link] = [];
      }
      if (!backlinks[link].includes(slug)) {
        backlinks[link].push(slug);
      }
    }
  }
  
  // Write the backlinks JSON
  const outputPath = path.join(projectRoot, 'src/data/backlinks.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(backlinks, null, 2));
  console.log(`[Backlinks] Generated ${outputPath} with ${Object.keys(backlinks).length} pages`);
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateBacklinks();
}

export { generateBacklinks, getAllFiles };
