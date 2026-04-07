import { useEffect, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'

interface Heading {
    id: string
    text: string
    depth: number
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<Heading[]>([])
    const [activeId, setActiveId] = useState<string>('')
    const [scrollProgress, setScrollProgress] = useState(0)
    const { location: { pathname } } = useRouterState()

    // Re-query headings whenever the route changes (after new content is in the DOM)
    useEffect(() => {
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll('.doc-content h2, .doc-content h3')
            const items: Heading[] = Array.from(elements).map((el) => ({
                id: el.id || el.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
                text: el.textContent || '',
                depth: el.tagName === 'H2' ? 2 : 3,
            }))
            setHeadings(items)

            // Ensure headings have IDs
            elements.forEach((el) => {
                if (!el.id) {
                    el.id = el.textContent?.toLowerCase().replace(/\s+/g, '-') || ''
                }
            })
        }, 0)
        return () => clearTimeout(timer)
    }, [pathname])

    // Reset active section on navigation
    useEffect(() => {
        setActiveId('')
    }, [pathname])

    // IntersectionObserver for active heading tracking
    useEffect(() => {
        if (headings.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting)
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id)
                }
            },
            { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
        )

        headings.forEach((heading) => {
            const el = document.getElementById(heading.id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [headings])

    // Scroll progress tracker
    useEffect(() => {
        let ticking = false
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const el = document.querySelector('.doc-content') as HTMLElement | null
                    if (!el) return
                    const navbarHeight = 64
                    const total = el.scrollHeight - window.innerHeight + navbarHeight
                    const scrolled = window.scrollY - el.offsetTop + navbarHeight
                    const pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0
                    setScrollProgress(pct)
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    if (headings.length === 0) return null

    return (
        <nav className="toc">
            <div className="toc-progress-track">
                <div
                    className="toc-progress-fill"
                    style={{ height: `${scrollProgress}%` }}
                />
            </div>

            <div className="toc-header">
                <span className="toc-title">On this page</span>
                <span className="toc-count">{headings.length} sections</span>
            </div>

            <ul className="toc-list">
                {headings.map((heading) => (
                    <li key={heading.id} className="toc-item">
                        <a
                            href={`#${heading.id}`}
                            className={`toc-link${heading.depth === 3 ? ' depth-3' : ''}${activeId === heading.id ? ' active' : ''}`}
                        >
                            {activeId === heading.id && (
                                <span className="toc-cursor" aria-hidden="true">▶</span>
                            )}
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
