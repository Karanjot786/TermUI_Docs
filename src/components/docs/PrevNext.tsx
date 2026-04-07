import { Link, useRouterState } from '@tanstack/react-router'
import { navigation } from '../../data/navigation'

// Flatten all nav children into an ordered list
const flatNav = navigation.flatMap((section) => section.children ?? [])

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' })

export function PrevNext() {
    const { location: { pathname } } = useRouterState()
    const idx = flatNav.findIndex((item) => item.href === pathname)

    const prev = idx > 0 ? flatNav[idx - 1] : null
    const next = idx >= 0 && idx < flatNav.length - 1 ? flatNav[idx + 1] : null

    if (!prev && !next) return null

    return (
        <div className="prev-next">
            {prev ? (
                <Link to={prev.href} className="prev-next-card prev-next-card--prev" onClick={scrollToTop}>
                    <span className="prev-next-label">← Previous</span>
                    <span className="prev-next-title">{prev.label}</span>
                </Link>
            ) : (
                <div />
            )}
            {next ? (
                <Link to={next.href} className="prev-next-card prev-next-card--next" onClick={scrollToTop}>
                    <span className="prev-next-label">Next →</span>
                    <span className="prev-next-title">{next.label}</span>
                </Link>
            ) : (
                <div />
            )}
        </div>
    )
}
