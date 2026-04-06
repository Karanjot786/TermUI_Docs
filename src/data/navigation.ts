export interface NavItem {
    label: string
    href: string
    children?: NavItem[]
}

export const navigation: NavItem[] = [
    {
        label: 'Getting Started',
        href: '/docs/getting-started/installation',
        children: [
            { label: 'Installation', href: '/docs/getting-started/installation' },
            { label: 'Quick Start', href: '/docs/getting-started/quick-start' },
            { label: 'Architecture', href: '/docs/getting-started/architecture' },
        ],
    },
    {
        label: 'Core',
        href: '/docs/core/overview',
        children: [
            { label: 'Overview', href: '/docs/core/overview' },
            { label: 'App Lifecycle', href: '/docs/core/app' },
            { label: 'Screen', href: '/docs/core/screen' },
            { label: 'Layout Engine', href: '/docs/core/layout' },
            { label: 'Style & Colors', href: '/docs/core/style' },
            { label: 'Input Parser', href: '/docs/core/input-parser' },
            { label: 'Event Emitter', href: '/docs/core/event-emitter' },
            { label: 'String Utilities', href: '/docs/core/unicode' },
        ],
    },
    {
        label: 'JSX',
        href: '/docs/jsx/context',
        children: [
            { label: 'Context API', href: '/docs/jsx/context' },
            { label: 'memo() & Batched Updates', href: '/docs/jsx/memo' },
            { label: 'useAsync', href: '/docs/jsx/use-async' },
        ],
    },
    {
        label: 'Widgets',
        href: '/docs/widgets/overview',
        children: [
            { label: 'Overview', href: '/docs/widgets/overview' },
            { label: 'VirtualList', href: '/docs/widgets/virtual-list' },
        ],
    },
    {
        label: 'UI Components',
        href: '/docs/ui/overview',
        children: [
            { label: 'Overview', href: '/docs/ui/overview' },
        ],
    },
    {
        label: 'Store',
        href: '/docs/store/overview',
        children: [
            { label: 'Overview', href: '/docs/store/overview' },
        ],
    },
    {
        label: 'TSS (Theming)',
        href: '/docs/tss/overview',
        children: [
            { label: 'Overview', href: '/docs/tss/overview' },
        ],
    },
    {
        label: 'Router',
        href: '/docs/router/overview',
        children: [
            { label: 'Overview', href: '/docs/router/overview' },
        ],
    },
    {
        label: 'Motion',
        href: '/docs/motion/springs',
        children: [
            { label: 'Springs', href: '/docs/motion/springs' },
            { label: 'Transitions', href: '/docs/motion/transitions' },
        ],
    },
    {
        label: 'Testing',
        href: '/docs/testing/overview',
        children: [
            { label: 'Overview', href: '/docs/testing/overview' },
        ],
    },
    {
        label: 'Guides',
        href: '/docs/guides/first-app',
        children: [
            { label: 'What is a TUI?', href: '/docs/guides/what-is-a-tui' },
            { label: 'Build Your First App', href: '/docs/guides/first-app' },
            { label: 'Testing Guide', href: '/docs/guides/testing' },
            { label: 'Dev Server & Hot Reload', href: '/docs/guides/dev-server' },
            { label: '@termuijs/quick', href: '/docs/guides/quick' },
            { label: 'TermUI vs Ink', href: '/docs/guides/termui-vs-ink' },
        ],
    },
]
