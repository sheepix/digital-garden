// generate-backlinks.js
// Generates a backlinks index JSON at build time
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Go up two levels: from src/plugins to project root
const projectRoot = path.resolve(__dirname, '..', '..');
const contentDir = path.join(projectRoot, 'src/content/docs');

async function getAllFiles(dir, files = []) {
  // Use withFileTypes to avoid separate stat calls
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const promises = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Check if entry is a directory or file.
    // We handle symlinks explicitly if needed.
    if (entry.isSymbolicLink()) {
       promises.push((async () => {
         try {
           const stat = await fs.stat(fullPath);
           if (stat.isDirectory()) {
             await getAllFiles(fullPath, files);
           } else if (stat.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
             files.push(fullPath);
           }
         } catch (e) {
           // Ignore broken links
         }
       })());
       continue;
    }

    if (entry.isDirectory()) {
      promises.push(getAllFiles(fullPath, files));
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      files.push(fullPath);
    }
  }

  await Promise.all(promises);
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

async function generateBacklinks() {
  console.log('[Backlinks] Scanning content...');
  
  const files = await getAllFiles(contentDir);
  // Sort files to help with deterministic processing (though async makes completion order random)
  files.sort();

  const backlinks = {};
  
  // Initialize backlinks for all pages
  for (const file of files) {
    const slug = getSlugFromPath(file, contentDir);
    backlinks[slug] = [];
  }
  
  // Extract links and build reverse index
  // Process in chunks to avoid opening too many files at once
  const CHUNK_SIZE = 50;
  for (let i = 0; i < files.length; i += CHUNK_SIZE) {
    const chunk = files.slice(i, i + CHUNK_SIZE);
    await Promise.all(chunk.map(async (file) => {
      try {
        const content = await fs.readFile(file, 'utf-8');
        const slug = getSlugFromPath(file, contentDir);
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
      } catch (error) {
        console.error(`[Backlinks] Error processing file ${file}: `, error);
      }
    }));
  }
  
  // Sort keys and values for deterministic output
  const sortedBacklinks = {};
  Object.keys(backlinks).sort().forEach(key => {
    sortedBacklinks[key] = backlinks[key].sort();
  });

  // Write the backlinks JSON
  const outputPath = path.join(projectRoot, 'src/data/backlinks.json');
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(sortedBacklinks, null, 2));
  console.log(`[Backlinks] Generated ${outputPath} with ${Object.keys(sortedBacklinks).length} pages`);
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateBacklinks().catch(console.error);
}

export { generateBacklinks };
