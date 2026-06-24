import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { RootProvider } from 'fumadocs-ui/provider/next'
import { Analytics } from '@vercel/analytics/react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/landing/CustomCursor'
import './globals.css'

const SITE_URL = 'https://termui.io'
const SITE_NAME = 'TermUI'
const SITE_TITLE = 'TermUI | Terminal UI Framework for TypeScript'
const SITE_DESCRIPTION =
  'TermUI is a TypeScript framework for building terminal user interfaces. It includes 16+ components, JSX support, React-style hooks, theming, routing, and spring animations. Pure TypeScript, no C extensions.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: '%s | TermUI' },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Karanjot786' }],
  keywords: ['terminal UI', 'TypeScript', 'TUI', 'terminal framework', 'CLI UI', 'Node.js terminal'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'TermUI. Terminal UI Framework for TypeScript' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@termuijs',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
}

// Main site graph — Organization, Software, WebSite, SourceCode
// FAQPage is intentionally kept in a separate script block below.
// Mixing FAQPage inside @graph causes Google's "Duplicate field" validation error.
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
        url: `${SITE_URL}/icon-512.svg`,
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
  ],
}

// FAQPage must be a standalone JSON-LD block — not inside @graph.
// Google's Rich Results validator rejects FAQPage when co-located with other @types in a @graph.
const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
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
            text: '15 packages: core, widgets, ui, jsx, tss, router, motion, store, data, quick, testing, dev-server, adapters, charts, and create-termui-app.',
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
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="theme-color" content="#0a0a0f" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      </head>
      <body>
        <RootProvider search={{ enabled: false }}>
          <a href="#main-content" className="skip-to-content">Skip to content</a>
          <CustomCursor />
          <Navbar />
          <main id="main-content" style={{ paddingTop: 'var(--navbar-height)' }}>
            {children}
          </main>
          <Footer />
          <Analytics />
        </RootProvider>
      </body>
    </html>
  )
}
