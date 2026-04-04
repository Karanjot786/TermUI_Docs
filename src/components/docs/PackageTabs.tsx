import { useEffect, useState } from 'react'
import { CodeBlock } from './CodeBlock'

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun'

const STORAGE_KEY = 'termui-preferred-pm'

interface PackageTabsProps {
    npm: string
    pnpm?: string
    yarn?: string
    bun?: string
}

export function PackageTabs({ npm, pnpm, yarn, bun }: PackageTabsProps) {
    const [selected, setSelected] = useState<PackageManager>('npm')

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY) as PackageManager | null
        if (saved && ['npm', 'pnpm', 'yarn', 'bun'].includes(saved)) {
            setSelected(saved)
        }
    }, [])

    const handleSelect = (pm: PackageManager) => {
        setSelected(pm)
        localStorage.setItem(STORAGE_KEY, pm)
    }

    const tabs: { key: PackageManager; cmd: string }[] = [
        { key: 'npm', cmd: npm },
        { key: 'pnpm', cmd: pnpm },
        { key: 'yarn', cmd: yarn },
        { key: 'bun', cmd: bun },
    ].filter((t): t is { key: PackageManager; cmd: string } => Boolean(t.cmd))

    const active = tabs.find((t) => t.key === selected) ?? tabs[0]

    return (
        <div className="tab-group pkg-tabs">
            <div className="tab-group-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        className={`tab-group-tab${active.key === tab.key ? ' active' : ''}`}
                        onClick={() => handleSelect(tab.key)}
                    >
                        {tab.key}
                    </button>
                ))}
            </div>
            <div className="tab-group-content">
                <CodeBlock lang="sh" children={active.cmd} />
            </div>
        </div>
    )
}
