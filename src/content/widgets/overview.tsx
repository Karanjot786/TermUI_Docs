export function WidgetsOverview() {
    return (
        <>
            <h1>Widgets Overview</h1>
            <p>
                <code>@termuijs/widgets</code> gives you the building blocks for
                terminal UIs. Every widget extends the base <code>Widget</code>{' '}
                class, manages its own render rectangle, and only repaints when
                something actually changes.
            </p>

            <h2 id="installation">Installation</h2>
            <pre><code>{`npm install @termuijs/widgets`}</code></pre>

            <h2 id="components">All Widgets</h2>
            <table>
                <thead>
                    <tr><th>Widget</th><th>Category</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>Box</code></td><td>Display</td><td>Container with borders, padding, and flex layout</td></tr>
                    <tr><td><code>Text</code></td><td>Display</td><td>Styled text with color, bold, italic, dim, underline</td></tr>
                    <tr><td><code>LogView</code></td><td>Display</td><td>Scrollable log panel with auto-scroll and max buffer</td></tr>
                    <tr><td><code>Table</code></td><td>Data</td><td>Data table with column alignment and headers</td></tr>
                    <tr><td><code>Gauge</code></td><td>Data</td><td>Percentage indicator with label and color thresholds</td></tr>
                    <tr><td><code>Sparkline</code></td><td>Data</td><td>Inline bar chart for time-series data</td></tr>
                    <tr><td><code>BarChart</code></td><td>Data</td><td>Horizontal or vertical bar chart with groups</td></tr>
                    <tr><td><code>StatusIndicator</code></td><td>Data</td><td>Color-coded status dot (ok / warn / error / unknown)</td></tr>
                    <tr><td><code>ProgressBar</code></td><td>Feedback</td><td>Horizontal progress indicator with customizable fill</td></tr>
                    <tr><td><code>Spinner</code></td><td>Feedback</td><td>Animated loading spinner with multiple styles</td></tr>
                    <tr><td><code>Scrollbar</code></td><td>Feedback</td><td>Standalone scrollbar indicator (vertical or horizontal)</td></tr>
                    <tr><td><code>List</code></td><td>Input</td><td>Keyboard-navigable list for small datasets</td></tr>
                    <tr><td><code>TextInput</code></td><td>Input</td><td>Single-line text input with cursor and placeholder</td></tr>
                    <tr><td><code>VirtualList</code></td><td>Input</td><td>Scroll-virtualized list; renders only visible rows, any dataset size</td></tr>
                </tbody>
            </table>

            <h2 id="example">Quick Example</h2>
            <p>
                Build a simple dashboard by composing widgets and passing the
                root to <code>App</code>:
            </p>
            <pre><code>{`import { App } from '@termuijs/core'
import { Box, Text, ProgressBar, Spinner } from '@termuijs/widgets'

// Create widgets
const title = new Text('Dashboard', { bold: true, fg: 'cyan' })
const spinner = new Spinner({ type: 'dots', fg: 'green' })
const loadingText = new Text('Loading data...')
const cpuLabel = new Text('CPU Usage')
const cpuBar = new ProgressBar({ value: 0.73, width: 30, fg: 'green' })

// Compose layout
const row = new Box({ flexDirection: 'row', gap: 2 })
row.addChild(spinner)
row.addChild(loadingText)

const column = new Box({ flexDirection: 'column', gap: 1 })
column.addChild(cpuLabel)
column.addChild(cpuBar)

const root = new Box({ border: 'round', padding: 1, flexDirection: 'column', gap: 1 })
root.addChild(title)
root.addChild(row)
root.addChild(column)

// Mount
const app = new App(root, { fullscreen: true })
await app.mount()
// ╭──────────────────────────────────╮
// │ Dashboard                        │
// │ ⠋ Loading data...               │
// │ CPU Usage                        │
// │ ████████████████████░░░░░ 73%    │
// ╰──────────────────────────────────╯`}</code></pre>

            <h2 id="virtuallist-highlight">VirtualList: handle any dataset size</h2>
            <p>
                <code>VirtualList</code> renders only the rows visible in the
                viewport. A list of 1,000,000 items renders as fast as a list of 10.
            </p>
            <pre><code>{`import { App } from '@termuijs/core'
import { VirtualList } from '@termuijs/widgets'

const list = new VirtualList({
    totalItems: 1_000_000,
    renderItem: (index) => \`Log line \${index}: some message content\`,
    onSelect:   (index) => console.log('Selected:', index),
})

const app = new App(list, { fullscreen: true })
app.events.on('key', (e) => {
    if (e.key === 'up')    list.selectPrev()
    if (e.key === 'down')  list.selectNext()
    if (e.key === 'enter') list.confirm()
    if (e.key === 'home')  list.selectFirst()
    if (e.key === 'end')   list.selectLast()
})
await app.mount()

// Handles 1M items. renders ~26 rows with scrollbar`}</code></pre>

            <h2 id="common-patterns">Common Patterns</h2>

            <h3 id="status-dashboard">Status Dashboard</h3>
            <pre><code>{`import { Box, Text, Gauge, StatusIndicator, ProgressBar } from '@termuijs/widgets'

// Build a status row
const apiStatus = new StatusIndicator({ status: 'ok', label: 'API' })
const dbStatus = new StatusIndicator({ status: 'warn', label: 'DB' })
const cacheStatus = new StatusIndicator({ status: 'error', label: 'Cache' })

const statusRow = new Box({ flexDirection: 'row', gap: 4 })
statusRow.addChild(apiStatus)
statusRow.addChild(dbStatus)
statusRow.addChild(cacheStatus)

// Resource gauges
const cpuBar = new ProgressBar({ value: 0.72, label: 'CPU', width: 40, fg: 'green' })
const memBar = new ProgressBar({ value: 0.58, label: 'MEM', width: 40, fg: 'cyan' })
const diskGauge = new Gauge({ value: 0.45, label: 'Disk' })

const panel = new Box({ flexDirection: 'column', gap: 1 })
panel.addChild(statusRow)
panel.addChild(new Text('Resource Usage', { dim: true }))
panel.addChild(cpuBar)
panel.addChild(memBar)
panel.addChild(diskGauge)`}</code></pre>

            <h3 id="log-viewer">Log Viewer</h3>
            <pre><code>{`import { LogView } from '@termuijs/widgets'

const logs = new LogView({
    maxLines: 1000,
    autoScroll: true,
})

logs.append({ text: '[INFO]  Server started', color: 'green' })
logs.append({ text: '[WARN]  Memory usage high', color: 'yellow' })
logs.append({ text: '[ERROR] Connection reset', color: 'red' })`}</code></pre>

            <h3 id="data-table">Data Table</h3>
            <pre><code>{`import { Table } from '@termuijs/widgets'

const table = new Table({
    columns: [
        { key: 'pid',  header: 'PID',     width: 8  },
        { key: 'name', header: 'Process',  width: 20 },
        { key: 'cpu',  header: 'CPU%',     width: 8, align: 'right' },
        { key: 'mem',  header: 'Memory',   width: 10 },
    ],
    rows: processes,
})`}</code></pre>

            <h2 id="see-also">See Also</h2>
            <ul>
                <li><strong>VirtualList</strong>: Full reference for the virtualized list</li>
                <li><strong>@termuijs/ui</strong>: Higher-level composites: Select, Tabs, Modal, Toast, Tree</li>
                <li><strong>Core Layout</strong>: Flexbox properties that control widget positioning</li>
                <li><strong>TSS</strong>: Style widgets with CSS-like theming and variables</li>
            </ul>
        </>
    )
}
