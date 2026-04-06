import { createFileRoute } from '@tanstack/react-router'
import { docPages } from '../../content/pages'
import { useMermaid } from '../../hooks/useMermaid'
import { useCodeCopy } from '../../hooks/useCodeCopy'
import { TerminalCodeBlock } from '../../components/docs/TerminalCodeBlock'
import { PackageTabs } from '../../components/docs/PackageTabs'

const SITE_URL = 'https://termui.io'
const OG_IMAGE = `${SITE_URL}/og-image.png`

export const Route = createFileRoute('/docs/$section/$slug')({
    head: ({ params }) => {
        const page = docPages[`${params.section}/${params.slug}`]
        const title = page ? `${page.title} | TermUI Docs` : 'TermUI Docs'
        const description = page?.description ?? 'TermUI documentation. TypeScript terminal UI framework.'
        const canonical = `${SITE_URL}/docs/${params.section}/${params.slug}`

        const articleSchema = page
            ? {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: title,
                description,
                url: canonical,
                author: {
                    '@type': 'Organization',
                    name: 'TermUI',
                    url: SITE_URL,
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'TermUI',
                    url: SITE_URL,
                },
                ...(page.lastUpdated ? { dateModified: page.lastUpdated } : {}),
            }
            : null

        const sectionLabel: Record<string, string> = {
            'getting-started': 'Getting Started',
            'core': 'Core',
            'jsx': 'JSX',
            'widgets': 'Widgets',
            'ui': 'UI Components',
            'tss': 'TSS',
            'router': 'Router',
            'motion': 'Motion',
            'store': 'Store',
            'testing': 'Testing',
            'guides': 'Guides',
        }

        const breadcrumbSchema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: sectionLabel[params.section] ?? params.section,
                    item: `${SITE_URL}/docs/${params.section}/overview`,
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: page?.title ?? params.slug,
                    item: canonical,
                },
            ],
        }

        const comparisonSchema =
            params.section === 'guides' && params.slug === 'termui-vs-ink'
                ? {
                      '@context': 'https://schema.org',
                      '@type': 'ItemList',
                      name: 'TermUI vs Ink: Feature Comparison',
                      description: 'Side-by-side comparison of TermUI and Ink, two TypeScript terminal UI frameworks.',
                      itemListElement: [
                          { '@type': 'ListItem', position: 1, name: 'TermUI', url: 'https://termui.io', description: 'TypeScript terminal UI framework with 13 packages: JSX, TSS theming, router, spring animations, hot reload, and testing.' },
                          { '@type': 'ListItem', position: 2, name: 'Ink', url: 'https://github.com/vadimdemedes/ink', description: 'React renderer for the terminal. Minimal built-ins: components and layout only.' },
                      ],
                  }
                : null

        const howToSchema =
            params.section === 'guides' && params.slug === 'first-app'
                ? {
                      '@context': 'https://schema.org',
                      '@type': 'HowTo',
                      name: 'Build a Terminal Dashboard with TermUI in TypeScript',
                      description: 'Step-by-step guide to building a system monitoring TUI dashboard using TermUI.',
                      step: [
                          { '@type': 'HowToStep', position: 1, name: 'Create the project', text: 'Run npx create-termui-app my-dashboard and install @termuijs/widgets, @termuijs/tss, and @termuijs/data.' },
                          { '@type': 'HowToStep', position: 2, name: 'Set up a TSS theme', text: 'Create src/theme.tss with color variables for primary, background, border, text, and dim.' },
                          { '@type': 'HowToStep', position: 3, name: 'Add CPU and memory gauges', text: 'Use the Gauge widget with @termuijs/data cpuUsage() and memUsage() as reactive data sources.' },
                          { '@type': 'HowToStep', position: 4, name: 'Add a process table', text: 'Use the Table widget with @termuijs/data processes() to display a live process list.' },
                          { '@type': 'HowToStep', position: 5, name: 'Add a log viewer', text: 'Use VirtualList with auto-scroll enabled. Append new log lines by updating the items array.' },
                          { '@type': 'HowToStep', position: 6, name: 'Add keyboard navigation', text: 'Use the App onKey callback. Tab switches focus between panels, q calls app.stop().' },
                      ],
                  }
                : null

        return {
            meta: [
                { title },
                { name: 'description', content: description },
                { property: 'og:type', content: 'article' },
                { property: 'og:title', content: title },
                { property: 'og:description', content: description },
                { property: 'og:url', content: canonical },
                { property: 'og:image', content: OG_IMAGE },
                { property: 'og:site_name', content: 'TermUI' },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: title },
                { name: 'twitter:description', content: description },
                { name: 'twitter:image', content: OG_IMAGE },
            ],
            links: [
                { rel: 'canonical', href: canonical },
            ],
            scripts: [
                ...(articleSchema ? [{ type: 'application/ld+json', children: JSON.stringify(articleSchema) }] : []),
                { type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema) },
                ...(comparisonSchema ? [{ type: 'application/ld+json', children: JSON.stringify(comparisonSchema) }] : []),
                ...(howToSchema ? [{ type: 'application/ld+json', children: JSON.stringify(howToSchema) }] : []),
            ],
        }
    },
    component: DocPage,
})

function DocPage() {
    const { section, slug } = Route.useParams()
    const key = `${section}/${slug}`
    useMermaid()
    useCodeCopy()
    const page = docPages[key]

    if (!page) {
        return (
            <div>
                <h1>Page not found</h1>
                <p>
                    The documentation page <code>{key}</code> doesn't exist yet.
                </p>
            </div>
        )
    }

    const Content = page.component
    return <Content components={{ pre: TerminalCodeBlock, PackageTabs }} />
}
