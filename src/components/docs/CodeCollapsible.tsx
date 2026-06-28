'use client'
import { useState, type ReactNode } from 'react'

/**
 * Clamp a tall code block to ~15 lines until expanded. Pass collapsed=false for
 * short blocks to render them without any control.
 */
export function CodeCollapsible({
    children,
    collapsed: shouldCollapse = true,
}: {
    children: ReactNode
    collapsed?: boolean
}) {
    const [open, setOpen] = useState(false)
    if (!shouldCollapse) return <>{children}</>

    return (
        <div className={`cd-collapsible${open ? ' is-open' : ''}`}>
            <div className="cd-collapsible-body">{children}</div>
            {!open && <div className="cd-collapsible-fade" aria-hidden="true" />}
            <button
                type="button"
                className="cd-collapsible-toggle"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
            >
                {open ? 'Collapse' : 'Expand'}
            </button>
        </div>
    )
}
