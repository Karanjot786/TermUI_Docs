import { useEffect, useState } from 'react'

type PackageManager = 'npx' | 'npm' | 'pnpm' | 'yarn' | 'bun'

const STORAGE_KEY = 'termui-preferred-pm'

interface PackageTabsProps {
    npx?: string
    npm?: string
    pnpm?: string
    yarn?: string
    bun?: string
}

const ClipboardIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
)

const CheckIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
    </svg>
)

/** Renders a command string as styled spans — $ in purple, commands in green, # comments in gray */
function CommandLines({ cmd }: { cmd: string }) {
    const lines = cmd.split('\n')
    return (
        <>
            {lines.map((line, i) => {
                if (!line && i === lines.length - 1) return null
                const trimmed = line.trimStart()

                if (trimmed.startsWith('#')) {
                    return (
                        <span key={i} className="pkg-line pkg-comment" data-line="">
                            <span>{line}</span>
                            {'\n'}
                        </span>
                    )
                }

                // Strip leading $ if present
                const cmd = trimmed.startsWith('$ ') ? trimmed.slice(2) : line
                return (
                    <span key={i} className="pkg-line pkg-prompt" data-line="">
                        <span className="pkg-dollar">$</span>
                        {' '}
                        <span className="pkg-cmd">{cmd}</span>
                        {'\n'}
                    </span>
                )
            })}
        </>
    )
}

export function PackageTabs({ npx, npm, pnpm, yarn, bun }: PackageTabsProps) {
    const [selected, setSelected] = useState<PackageManager>('npx')
    const [copied, setCopied] = useState(false)

    const tabs: { key: PackageManager; label: string; cmd: string }[] = [
        { key: 'npx',  label: 'npx',  cmd: npx  },
        { key: 'npm',  label: 'npm',  cmd: npm  },
        { key: 'pnpm', label: 'pnpm', cmd: pnpm },
        { key: 'yarn', label: 'yarn', cmd: yarn },
        { key: 'bun',  label: 'bun',  cmd: bun  },
    ].filter((t): t is { key: PackageManager; label: string; cmd: string } => Boolean(t.cmd))

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY) as PackageManager | null
        if (saved && tabs.some((t) => t.key === saved)) {
            setSelected(saved)
        } else if (tabs.length > 0) {
            setSelected(tabs[0].key)
        }
    }, [])

    const handleSelect = (pm: PackageManager) => {
        setSelected(pm)
        localStorage.setItem(STORAGE_KEY, pm)
    }

    const active = tabs.find((t) => t.key === selected) ?? tabs[0]
    if (!active) return null

    const handleCopy = async () => {
        // Copy commands without $ prefix and without comment lines
        const text = active.cmd
            .split('\n')
            .filter((l) => l.trim() && !l.trimStart().startsWith('#'))
            .map((l) => (l.trimStart().startsWith('$ ') ? l.trimStart().slice(2) : l))
            .join('\n')
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // Clipboard API not available
        }
    }

    return (
        <div className="code-window pkg-tabs" data-language="bash">
            {/* Chrome bar with traffic lights + tabs + copy */}
            <div className="code-chrome">
                <div className="traffic-lights" aria-hidden="true">
                    <span className="tl tl-red" />
                    <span className="tl tl-yellow" />
                    <span className="tl tl-green" />
                </div>

                {/* Tabs inside the chrome bar */}
                <div className="pkg-tab-bar" role="tablist">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            role="tab"
                            type="button"
                            aria-selected={active.key === tab.key}
                            className={`pkg-tab${active.key === tab.key ? ' active' : ''}`}
                            onClick={() => handleSelect(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* TERMINAL label */}
                <div className="code-lang-label">
                    <span className="code-lang-icon" style={{ color: '#28c840' }}>▶</span>
                    <span className="code-lang-text" style={{ color: '#28c840' }}>TERMINAL</span>
                </div>

                {/* Copy button */}
                <button
                    className={`code-copy-btn${copied ? ' copied' : ''}`}
                    onClick={handleCopy}
                    aria-label={copied ? 'Copied' : 'Copy command'}
                    type="button"
                >
                    {copied ? (
                        <><CheckIcon /><span>copied!</span></>
                    ) : (
                        <><ClipboardIcon /><span>copy</span></>
                    )}
                </button>
            </div>

            {/* Code area */}
            <pre data-language="bash" role="tabpanel">
                <code className="pkg-code">
                    <CommandLines cmd={active.cmd} />
                </code>
            </pre>
        </div>
    )
}
