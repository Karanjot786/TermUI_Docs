import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'node:url'

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: 'github-dark',
  keepBackground: false,
  defaultLang: 'ts',
  onVisitLine(node: any) {
    // Prevent empty lines from collapsing
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
    // Classify bash/shell prompt and comment lines for CSS targeting
    const text = (node.children as any[])
      .map((c: any) => {
        if (c.type === 'text') return c.value ?? ''
        return ((c.children ?? []) as any[]).map((cc: any) => cc.value ?? '').join('')
      })
      .join('')
      .trimStart()
    if (text.startsWith('$ ') || text === '$') {
      node.properties['data-prompt'] = ''
    } else if (text.startsWith('#') && !text.startsWith('#!')) {
      node.properties['data-comment'] = ''
    }
  },
  onVisitHighlightedLine(node: any) {
    if (!node.properties.className) node.properties.className = []
    node.properties.className.push('highlighted')
  },
  onVisitHighlightedChars(node: any) {
    node.properties.className = ['word-highlight']
  },
}

const config = defineConfig({
  server: { port: 3000, host: '0.0.0.0' },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
      },
    }),
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
    }),
    viteReact(),
  ],
})

export default config

