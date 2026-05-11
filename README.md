# TermUI Documentation Website

The documentation website for TermUI at [termui.io](https://www.termui.io).

## Stack

- [TanStack Start](https://tanstack.com/start) - Full-stack React framework
- [Vite](https://vitejs.dev/) - Build tool
- [MDX](https://mdxjs.com/) - Markdown with JSX components for doc pages
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Development

```bash
pnpm install
pnpm dev
```

The dev server starts at `http://localhost:3000`.

## Building

```bash
pnpm build
```

The `prebuild` script runs `scripts/generate-llm-docs.mjs` first. This exports all MDX pages to `public/docs/` as plain Markdown and writes `public/llms.txt` for LLM-friendly access.

## Adding a doc page

1. Create an MDX file in `src/content/{section}/{slug}.mdx`:

```mdx
---
title: "Page Title"
description: "160-character SEO description"
lastUpdated: May 2026
---

# Heading

Content here.
```

2. Register it in `src/content/pages.ts`:

```typescript
import MyPage, { frontmatter as myPageMeta } from './section/slug.mdx'

// Add to docPages:
'section/slug': {
    title: myPageMeta.title as string,
    description: myPageMeta.description as string,
    component: MyPage,
    lastUpdated: myPageMeta.lastUpdated as string,
},
```

3. Add it to `src/data/navigation.ts`:

```typescript
{ label: 'My Page', href: '/docs/section/slug' }
```

## Content structure

```
src/
  content/
    getting-started/   Installation, quick start, architecture
    core/              Screen, layout, input, style, events, string utilities
    jsx/               Hooks, context, focus, ErrorBoundary, memo
    widgets/           Overview, display, layout, charts, feedback
    ui/                Overview, notifications, prompts, inputs
    store/             Overview and batch()
    tss/               Overview, themes, tokens
    router/            Overview
    motion/            Springs, transitions
    data/              Overview and hooks
    testing/           Overview
    guides/            First app, testing guide, dev server, quick, accessibility
  data/
    navigation.ts      Sidebar navigation tree
  content/
    pages.ts           MDX page registry
  components/
    docs/              MDX components: Callout, Steps, PackageTabs
```

## MDX components

Use these inside MDX files without importing them; they are globally available:

- `<Callout type="info|warning|tip">` - Highlighted note block
- `<Steps>` - Numbered step list
- `<PackageTabs>` - npm / pnpm / yarn install tabs

HTML tables use standard `<table><thead><tbody>` format. Code blocks use triple-backtick fences with a language tag.

## License

MIT
