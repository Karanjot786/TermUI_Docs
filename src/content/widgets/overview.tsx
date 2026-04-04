export function WidgetsOverview() {
    return (
        <>
            <h1>Widgets Overview</h1>
            <p>
                <code>@termuijs/widgets</code> provides the fundamental building blocks for
                terminal UIs. Every widget is a class that extends <code>Widget</code>,
                owns its render rectangle, and only repaints when marked dirty.
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
                    <tr><td><code>VirtualList</code></td><td>Input</td><td>Scroll-virtualized list — renders only visible rows, any dataset size</td></tr>
                </tbody>
            </table>

            <h2 id="example">Quick Example</h2>
            <pre><code>{`import { Box, Text, ProgressBar, Spinner, VirtualList } from '@termuijs/widgets'

// Dashboard layout
app.render(
  <Box border="round" padding={1} flexDirection="column" gap={1}>
    <Text bold color="cyan">Dashboard</Text>

    <Box flexDirection="row" gap={2}>
      <Spinner type="dots" color="green" />
      <Text>Loading data...</Text>
    </Box>

    <Box flexDirection="column">
      <Text>CPU Usage</Text>
      <ProgressBar value={0.73} width={30} color="green" />
    </Box>
  </Box>
)
// ╭──────────────────────────────────╮
// │ Dashboard                        │
// │ ⠋ Loading data...               │
// │ CPU Usage                        │
// │ ████████████████████░░░░░ 73%    │
// ╰──────────────────────────────────╯`}</code></pre>

            <h2 id="virtuallist-highlight">VirtualList — Handle Any Dataset Size</h2>
            <p>
                The <code>VirtualList</code> widget renders only the rows visible in the
                viewport. A list of 1,000,000 items renders as fast as a list of 10.
            </p>
            <pre><code>{`import { VirtualList } from '@termuijs/widgets'

const list = new VirtualList({
    totalItems: 1_000_000,
    renderItem: (index) => \`Log line \${index}: some message content\`,
    onSelect:   (index) => openDetail(index),
})

app.onKey('up',    () => list.selectPrev())
app.onKey('down',  () => list.selectNext())
app.onKey('enter', () => list.confirm())
app.onKey('home',  () => list.selectFirst())
app.onKey('end',   () => list.selectLast())

// Handles 1M items — renders ~26 rows with scrollbar`}</code></pre>

            <h2 id="common-patterns">Common Patterns</h2>

            <h3 id="status-dashboard">Status Dashboard</h3>
            <pre><code>{`import { Box, Text, Gauge, StatusIndicator, ProgressBar } from '@termuijs/widgets'

<Box flexDirection="column" gap={1}>
    <Box flexDirection="row" gap={4}>
        <StatusIndicator status="ok" label="API" />
        <StatusIndicator status="warn" label="DB" />
        <StatusIndicator status="error" label="Cache" />
    </Box>

    <Text dim>Resource Usage</Text>
    <ProgressBar value={cpu}    label="CPU" width={40} color="green" />
    <ProgressBar value={memory} label="MEM" width={40} color="cyan" />
    <Gauge value={disk} label="Disk" />
</Box>`}</code></pre>

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

<Table
    columns={[
        { key: 'pid',  header: 'PID',     width: 8  },
        { key: 'name', header: 'Process',  width: 20 },
        { key: 'cpu',  header: 'CPU%',     width: 8, align: 'right' },
        { key: 'mem',  header: 'Memory',   width: 10 },
    ]}
    rows={processes}
/>`}</code></pre>

            <h2 id="see-also">See Also</h2>
            <ul>
                <li><strong>VirtualList</strong> — Full API reference for the virtualized list</li>
                <li><strong>@termuijs/ui</strong> — Higher-level composites: Select, Tabs, Modal, Toast, Tree</li>
                <li><strong>Core Layout</strong> — Flexbox properties that control widget positioning</li>
                <li><strong>TSS</strong> — Style widgets with CSS-like theming and variables</li>
            </ul>
        </>
    )
}
