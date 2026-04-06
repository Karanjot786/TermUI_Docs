import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  Link,
} from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { CustomCursor } from '../components/landing/CustomCursor'
import { SearchModal } from '../components/docs/SearchModal'

import globalCss from '../styles/global.css?url'
import componentsCss from '../styles/components.css?url'
import navbarCss from '../styles/navbar.css?url'

const SITE_URL = 'https://termui.io'
const SITE_NAME = 'TermUI'
const SITE_TITLE = 'TermUI | Terminal UI Framework for TypeScript'
const SITE_DESCRIPTION =
  'TermUI is a TypeScript framework for building terminal user interfaces. It includes 16+ components, JSX support, React-style hooks, theming, routing, and spring animations. Pure TypeScript, no C extensions.'
const OG_IMAGE = `${SITE_URL}/og-image.png`

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo512.png`,
      },
      sameAs: ['https://github.com/Karanjot786/TermUI', 'https://www.npmjs.com/package/@termuijs/core'],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#software`,
      name: 'TermUI',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Linux, macOS, Windows',
      programmingLanguage: 'TypeScript',
      url: SITE_URL,
      downloadUrl: 'https://www.npmjs.com/package/@termuijs/core',
      softwareVersion: '1.0',
      license: 'https://opensource.org/licenses/MIT',
      description:
        'TermUI is a TypeScript framework for building terminal user interfaces with 16+ components, JSX support, hooks, theming, routing, and animations.',
      author: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/docs/getting-started/installation#search={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'SoftwareSourceCode',
      '@id': `${SITE_URL}/#sourcecode`,
      name: 'TermUI Source Code',
      codeRepository: 'https://github.com/Karanjot786/TermUI',
      programmingLanguage: 'TypeScript',
      license: 'https://opensource.org/licenses/MIT',
      runtimePlatform: 'Node.js',
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is TermUI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TermUI is a TypeScript framework for building terminal user interfaces (TUIs). It gives you JSX, a component model, theming, animations, routing, and state management for the terminal instead of the browser.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is TermUI different from Ink?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TermUI uses its own JSX runtime with no React dependency. It ships a router, CSS-like theming (TSS), spring animations, Zustand-style global state, and a hot-reload dev server. Ink reuses React directly and provides minimal extras. TermUI is pure TypeScript with zero C extensions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does TermUI require React?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. TermUI uses @termuijs/jsx, its own JSX runtime. You get useState, useEffect, useContext, useAsync, and memo() with no React dependency and no browser abstractions.',
          },
        },
        {
          '@type': 'Question',
          name: 'What Node.js version does TermUI require?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Node.js 18 or later. LTS recommended.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I install TermUI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Run npx create-termui-app my-app to scaffold a project, or add packages directly with npm install @termuijs/core @termuijs/widgets @termuijs/jsx.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I test a TermUI app?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Install @termuijs/testing and render your components into an in-memory screen. Use getByText(), fireKey(), and lastFrame() to query and assert. Works with Vitest and Jest. No terminal required.',
          },
        },
        {
          '@type': 'Question',
          name: 'What terminals does TermUI support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Any terminal emulator with ANSI escape code support: iTerm2, Kitty, Alacritty, Windows Terminal, GNOME Terminal, tmux, and SSH sessions. Requires 256-color support.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many packages does TermUI have?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '13 packages: core, widgets, ui, jsx, tss, router, motion, store, data, quick, testing, dev-server, and create-termui-app.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is TermUI open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. TermUI is MIT licensed. Source code is at https://github.com/Karanjot786/TermUI.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use TermUI for a system monitoring dashboard?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. @termuijs/data provides live CPU, memory, disk, network, and process data. Pair it with Gauge, ProgressBar, Sparkline, and Table widgets to build an htop-style dashboard.',
          },
        },
      ],
    },
  ],
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: SITE_TITLE },
      { name: 'description', content: SITE_DESCRIPTION },
      { name: 'theme-color', content: '#0a0a0f' },
      { name: 'application-name', content: SITE_NAME },
      { name: 'author', content: 'Karanjot786' },
      { name: 'keywords', content: 'terminal UI, TypeScript, TUI, terminal framework, CLI UI, Node.js terminal, terminal components, JSX terminal' },
      { name: 'robots', content: 'index, follow' },
      { name: 'twitter:site', content: '@termuijs' },
      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: SITE_TITLE },
      { property: 'og:description', content: SITE_DESCRIPTION },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'TermUI. Terminal UI Framework for TypeScript' },
      // Twitter / X
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: SITE_TITLE },
      { name: 'twitter:description', content: SITE_DESCRIPTION },
      { name: 'twitter:image', content: OG_IMAGE },
      { name: 'twitter:image:alt', content: 'TermUI. Terminal UI Framework for TypeScript' },
    ],
    links: [
      { rel: 'stylesheet', href: globalCss },
      { rel: 'stylesheet', href: componentsCss },
      { rel: 'stylesheet', href: navbarCss },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'canonical', href: SITE_URL },
      { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(structuredData),
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  const [searchOpen, setSearchOpen] = useState(false)

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <RootDocument>
      <CustomCursor />
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <main id="main-content" style={{ paddingTop: 'var(--navbar-height)' }}>
        <Outlet />
      </main>
      <Footer />
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        {children}
        <Scripts />
        <Analytics />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - var(--navbar-height) - 200px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--space-16) var(--space-6)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          fontWeight: 900,
          color: 'var(--accent)',
          lineHeight: 1,
          textShadow: '0 0 30px rgba(0, 255, 136, 0.3)',
          margin: 0,
        }}
      >
        404
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-lg)',
          color: 'var(--text-muted)',
          marginTop: 'var(--space-4)',
        }}
      >
        <span style={{ color: 'var(--accent)', opacity: 0.7 }}>$ </span>
        Page not found
      </p>
      <Link
        to="/"
        style={{
          marginTop: 'var(--space-8)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          padding: 'var(--space-3) var(--space-6)',
          background: 'var(--accent)',
          color: 'var(--text-inverse)',
          borderRadius: 'var(--radius-md)',
          textDecoration: 'none',
          boxShadow: '0 0 10px rgba(0, 255, 136, 0.15)',
        }}
      >
        ← Back to Home
      </Link>
    </div>
  )
}
