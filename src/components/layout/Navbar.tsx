import { useEffect, useState, useCallback } from 'react'
import { NavLogo } from '@/components/navbar/NavLogo'
import { NavLinks } from '@/components/navbar/NavLinks'
import { SearchTrigger } from '@/components/navbar/SearchTrigger'
import { GithubStarsBadge } from '@/components/navbar/GithubStarsBadge'
import { ThemeToggle } from '@/components/navbar/ThemeToggle'
import { ChangelogBadge } from '@/components/navbar/ChangelogBadge'
import { MobileNav } from '@/components/navbar/MobileNav'

interface NavbarProps {
    onSearchOpen?: () => void
}

export function Navbar({ onSearchOpen }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Boot stagger — mark mounted after first paint
    useEffect(() => {
        const raf = requestAnimationFrame(() => setMounted(true))
        return () => cancelAnimationFrame(raf)
    }, [])

    // Scroll-aware glass intensification — rAF throttled
    useEffect(() => {
        let ticking = false
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 12)
                    ticking = false
                })
                ticking = true
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleSearchOpen = useCallback(() => {
        onSearchOpen?.()
    }, [onSearchOpen])

    const closeMobile = useCallback(() => {
        setMobileOpen(false)
    }, [])

    return (
        <>
            <nav
                className={[
                    'navbar-v2',
                    scrolled ? 'navbar-v2-scrolled' : '',
                    mounted ? 'navbar-v2-mounted' : '',
                ].filter(Boolean).join(' ')}
            >
                {/* Animated border glow — sweeps on scroll */}
                <span className="navbar-v2-border-glow" aria-hidden="true" />

                {/* Boot scan line */}
                <span className="navbar-v2-scan" aria-hidden="true" />

                <div className="navbar-v2-inner">
                    {/* Logo — typing animation + glitch on hover */}
                    <div className="navbar-v2-logo" style={{ '--stagger': 0 } as React.CSSProperties}>
                        <NavLogo />
                    </div>

                    {/* Desktop nav links — magnetic hover + mega dropdowns */}
                    <div className="navbar-v2-center" style={{ '--stagger': 1 } as React.CSSProperties}>
                        <NavLinks />
                    </div>

                    {/* Actions — search, stars, theme, changelog, mobile toggle */}
                    <div className="navbar-v2-actions" style={{ '--stagger': 2 } as React.CSSProperties}>
                        <SearchTrigger onOpen={handleSearchOpen} />

                        <div className="navbar-v2-separator" aria-hidden="true" />

                        <div className="navbar-v2-action-group">
                            <GithubStarsBadge />
                            <ThemeToggle />
                            <ChangelogBadge />
                        </div>

                        <span className="navbar-v2-version">v1.0</span>

                        {/* Mobile hamburger */}
                        <button
                            className={`navbar-v2-hamburger ${mobileOpen ? 'navbar-v2-hamburger-open' : ''}`}
                            onClick={() => setMobileOpen((o) => !o)}
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                            type="button"
                        >
                            <span className="navbar-v2-bar" />
                            <span className="navbar-v2-bar" />
                            <span className="navbar-v2-bar" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile slide-out sheet */}
            <MobileNav
                open={mobileOpen}
                onClose={closeMobile}
                onSearchOpen={handleSearchOpen}
            />
        </>
    )
}
