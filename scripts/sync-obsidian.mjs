#!/usr/bin/env node
/**
 * Obsidian -> Astro/Starlight 同步管线
 *
 * 规则:
 *  1. 扫描 OBSIDIAN_VAULT 下所有 .md
 *  2. 仅收录 frontmatter tags 含 digital-garden (含 digitalgarden / digital garden 变体) 的笔记
 *  3. 输出到 src/content/docs/garden/，保留相对目录层级
 *  4. [[wikilink]] 转站内链接，![[asset]] 复制到 public/garden-assets/
 *  5. 生成 garden/index.md 索引 + 清空旧产物（幂等）
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VAULT = process.env.OBSIDIAN_VAULT || path.join(os.homedir(), 'Library/Mobile Documents/iCloud~md~obsidian/Documents/ObsidianVault');
const OUT_DIR = path.join(ROOT, 'src/content/docs/garden');
const ASSET_DIR = path.join(ROOT, 'public/garden-assets');
const TAG_KEYS = ['digital-garden', 'digitalgarden', 'digital garden', 'digital_garden'];

const log = (...a) => console.log('[sync]', ...a);

/* ---------- frontmatter ---------- */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  let key = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const list = line.match(/^\s*-\s+(.*)$/);
    if (list && key) {
      if (!Array.isArray(data[key])) data[key] = [];
      data[key].push(stripQuote(list[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) {
      key = kv[1];
      const val = kv[2].trim();
      if (!val) { data[key] = []; continue; }
      const inline = val.match(/^\[(.*)\]$/);
      data[key] = inline
        ? inline[1].split(',').map(stripQuote).filter(Boolean)
        : stripQuote(val);
    }
  }
  return { data, body: raw.slice(m[0].length) };
}

const stripQuote = (s) => String(s).trim().replace(/^["']|["']$/g, '');

const normTag = (t) => stripQuote(t).replace(/^#/, '').toLowerCase().replace(/\s+/g, '-');

function getTags(data) {
  const raw = data.tags ?? data.tag ?? [];
  const arr = Array.isArray(raw) ? raw : String(raw).split(',');
  return arr.map(normTag).filter(Boolean);
}

const hasGardenTag = (data) => getTags(data).some((t) => TAG_KEYS.includes(t) || t === 'digital-garden');

/* ---------- walk ---------- */
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

/* ---------- assets & links ---------- */
let assetIndex = null;
function buildAssetIndex(vault) {
  if (assetIndex) return assetIndex;
  assetIndex = new Map();
  const exts = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.mp4', '.pdf', '.avif'];
  for (const f of walkAll(vault)) {
    if (exts.includes(path.extname(f).toLowerCase())) assetIndex.set(path.basename(f), f);
  }
  return assetIndex;
}
function walkAll(dir, out = []) {
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkAll(p, out);
    else out.push(p);
  }
  return out;
}

let copiedAssets = 0;
function rewriteAssets(body, vault) {
  const idx = buildAssetIndex(vault);
  return body.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (all, name, alt) => {
    const hit = idx.get(path.basename(name.trim()));
    if (!hit) return `*[缺失附件: ${name.trim()}]*`;
    fs.mkdirSync(ASSET_DIR, { recursive: true });
    const safe = path.basename(hit).replace(/\s+/g, '-');
    fs.copyFileSync(hit, path.join(ASSET_DIR, safe));
    copiedAssets += 1;
    return `![${alt || path.basename(hit)}](/garden-assets/${safe})`;
  });
}

function rewriteWikiLinks(body, titleToSlug) {
  return body
    .replace(/\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g, (all, target, _h, alias) => {
      const slug = titleToSlug.get(target.trim()) || titleToSlug.get(path.basename(target.trim()));
      const label = alias || target.trim();
      return slug ? `[${label}](/garden/${slug})` : `[${label}]`;
    })
    .replace(/\[\[([^\]]+)\]\]/g, (all, target) => {
      const slug = titleToSlug.get(target.trim());
      return slug ? `[${target.trim()}](/garden/${slug})` : `[${target.trim()}]`;
    });
}

/* ---------- main ---------- */
function main() {
  if (!fs.existsSync(VAULT)) {
    console.error(`[sync] vault 不存在: ${VAULT}`);
    process.exit(1);
  }
  log(`vault = ${VAULT}`);

  const files = walk(VAULT);
  const picked = [];
  for (const f of files) {
    const raw = fs.readFileSync(f, 'utf-8');
    const { data, body } = parseFrontmatter(raw);
    if (!hasGardenTag(data)) continue;
    const rel = path.relative(VAULT, f);
    const slugBase = path.basename(f, '.md');
    picked.push({ file: f, rel, data, body, slug: slugBase });
  }
  log(`扫描 ${files.length} 篇，命中 digital-garden ${picked.length} 篇`);

  // slug 去重
  const slugCount = new Map();
  for (const p of picked) slugCount.set(p.slug, (slugCount.get(p.slug) || 0) + 1);
  const titleToSlug = new Map();
  for (const p of picked) {
    const title = stripQuote(p.data.title || p.slug);
    titleToSlug.set(title, p.slug);
    titleToSlug.set(p.slug, p.slug);
  }

  // 清理旧产物（仅 garden 目录）
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const manifest = [];
  for (const p of picked) {
    const title = stripQuote(p.data.title || p.slug);
    const created = stripQuote(p.data.created || p.data.date || '');
    const updated = stripQuote(p.data.updated || created);
    let body = p.body;
    body = rewriteAssets(body, VAULT);
    body = rewriteWikiLinks(body, titleToSlug);
    // 去掉正文首个 H1，避免与 title 重复
    body = body.replace(/^\s*#\s+.+\r?\n+/, '');

    const fm = [
      '---',
      `title: ${JSON.stringify(title)}`,
      `description: ${JSON.stringify(stripQuote(p.data.description || ''))}`,
      `tags: ${JSON.stringify(getTags(p.data))}`,
      created ? `created: ${JSON.stringify(created)}` : null,
      updated ? `updated: ${JSON.stringify(updated)}` : null,
      '---',
      '',
    ].filter(Boolean).join('\n');

    const dest = path.join(OUT_DIR, `${p.slug}.md`);
    fs.writeFileSync(dest, fm + body.trim() + '\n');
    manifest.push({ slug: p.slug, title, tags: getTags(p.data), created, updated, source: p.rel });
  }

  // 索引页
  const sorted = [...manifest].sort((a, b) => String(b.updated || b.created).localeCompare(String(a.updated || a.created)));
  const index = [
    '---',
    'title: 花园索引',
    'description: 按更新时间排列的笔记',
    '---',
    '',
    `共 ${sorted.length} 篇笔记。`,
    '',
    ...sorted.map((n) => `- [${n.title}](/garden/${n.slug})${n.updated ? ` · ${String(n.updated).slice(0, 10)}` : ''}`),
    '',
  ].join('\n');
  fs.writeFileSync(path.join(OUT_DIR, 'index.md'), index);

  // 供标签云使用
  fs.mkdirSync(path.join(ROOT, 'src/data'), { recursive: true });
  fs.writeFileSync(
    path.join(ROOT, 'src/data/garden-manifest.json'),
    JSON.stringify({ generatedAt: new Date().toISOString(), count: manifest.length, notes: sorted }, null, 2)
  );

  log(`写入 ${manifest.length} 篇到 ${path.relative(ROOT, OUT_DIR)}，复制附件 ${copiedAssets} 个`);
}

main();
