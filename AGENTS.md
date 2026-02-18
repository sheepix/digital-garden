# Digital Garden - OpenCode Project Rules

A minimalist tech blog built with Astro Starlight, deployed on Cloudflare Pages.

## Project Structure

```
src/
├── content/
│   └── docs/           # Markdown/MDX content (wiki, stream, guides)
├── components/         # Astro components
│   ├── Backlinks.astro
│   ├── MarkdownContent.astro
│   ├── PageTags.astro
│   └── TagCloud.astro
├── layouts/           # Page layouts
│   ├── Page.astro
│   └── TaggedPage.astro
├── plugins/           # Build-time plugins
│   ├── extract-tags.js     # Smart tag extraction
│   └── generate-backlinks.js
├── styles/
│   └── custom.css     # Global styles (Tailwind + custom)
└── data/
    ├── backlinks.json  # Auto-generated
    └── tags.json      # Auto-generated
```

## Tech Stack

- **Framework**: Astro Starlight
- **Styling**: Tailwind CSS + Custom CSS
- **Hosting**: Cloudflare Pages
- **Search**: Pagefind (static)
- **Content**: MDX

## Code Standards

### General
- Use functional components where possible
- Keep components small and focused
- Add TypeScript types for new functions

### Astro Components
- Use `.astro` for static components
- Use `.jsx` / `.tsx` for interactive components
- Follow Astro's component composition patterns

### CSS / Tailwind
- Use Tailwind utility classes for layout
- Custom CSS in `src/styles/custom.css` for complex styles
- Follow 4pt grid rhythm in custom CSS (margin/padding: 0.25rem, 0.5rem, 1rem, etc.)

### Git Workflow
1. Fetch before modify: `git fetch origin`
2. Create feature branch: `git checkout -b feature/xxx`
3. Commit with meaningful messages
4. Push and create PR

## Build & Deployment

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Deploy to Cloudflare Pages
```bash
CLOUDFLARE_API_TOKEN='xxx' CLOUDFLARE_ACCOUNT_ID='xxx' npx wrangler pages deploy dist --project-name=digital-garden
```

## Content Guidelines

### Frontmatter
```yaml
---
title: Page Title
description: Brief description
---
```

### WikiLink Syntax
```markdown
[[page-name]]        # Link to another page
[[page-name|Text]]  # Link with custom text
```

## Environment Variables

| Variable | Description |
| :--- | :--- |
| CLOUDFLARE_API_TOKEN | Cloudflare API token for deployment |
| CLOUDFLARE_ACCOUNT_ID | Cloudflare account ID |
