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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TermUI — Build Beautiful Terminal Interfaces' },
      {
        name: 'description',
        content: 'A TypeScript-first framework for building rich, interactive terminal user interfaces with components, theming, routing, and animations.',
      },
      { name: 'theme-color', content: '#0a0a0f' },
      { property: 'og:title', content: 'TermUI — Build Beautiful Terminal Interfaces' },
      { property: 'og:description', content: 'A TypeScript-first framework for building rich, interactive terminal user interfaces.' },
      { property: 'og:type', content: 'website' },
    ],
    links: [
      { rel: 'stylesheet', href: globalCss },
      { rel: 'stylesheet', href: componentsCss },
      { rel: 'stylesheet', href: navbarCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
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
