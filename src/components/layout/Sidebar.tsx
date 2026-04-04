import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { navigation } from '../../data/navigation'
import type { NavItem } from '../../data/navigation'

const SECTION_ICONS: Record<string, string> = {
    'Getting Started': '◈',
    'Core': '⬡',
    'JSX': '◇',
    'Widgets': '▦',
    'UI Components': '◉',
    'Store': '⊕',
    'TSS (Theming)': '◈',
    'Router': '⟋',
    'Motion': '∿',
    'Testing': '✦',
    'Guides': '◎',
}

export function Sidebar() {
    const routerState = useRouterState()
    const currentPath = routerState.location.pathname

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <span className="sidebar-header-prompt">$ docs</span>
                <span className="sidebar-header-cursor">▌</span>
            </div>
            {navigation.map((section) => (
                <SidebarSection
                    key={section.label}
                    section={section}
                    currentPath={currentPath}
                />
            ))}
        </aside>
    )
}

function SidebarSection({
    section,
    currentPath,
}: {
    section: NavItem
    currentPath: string
}) {
    const isAnyChildActive = section.children?.some(
        (child) => currentPath === child.href
    )
    const [isOpen, setIsOpen] = useState(isAnyChildActive ?? true)

    const icon = SECTION_ICONS[section.label] ?? '◦'
    const slug = section.label
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[()]/g, '')

    return (
        <div className="sidebar-section">
            <button
                className={`sidebar-section-label${isOpen ? ' open' : ''}${isAnyChildActive ? ' has-active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                type="button"
            >
                <span className="section-icon">{icon}</span>
                <span className="section-path">
                    <span className="section-path-prefix">~/</span>
                    <span className="section-path-name">{slug}</span>
                    <span className="section-path-slash">/</span>
                </span>
                <span className="chevron">{isOpen ? '▾' : '▸'}</span>
            </button>

            <ul
                className={`sidebar-items${isOpen ? ' expanded' : ' collapsed'}`}
                aria-hidden={!isOpen}
            >
                {section.children?.map((item) => (
                    <li key={item.href} className="sidebar-item">
                        <Link
                            to={item.href}
                            className={`sidebar-link${currentPath === item.href ? ' active' : ''}`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
