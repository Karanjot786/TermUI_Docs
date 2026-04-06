# Widgets Overview
`@termuijs/widgets` gives you the building blocks for terminal UIs. Every widget extends the base `Widget`  class, manages its own render rectangle, and only repaints when something actually changes.
## Installation
```ts
npm install @termuijs/widgets
```
## All Widgets
| Widget            | Category | Description                                                          |
| ----------------- | -------- | -------------------------------------------------------------------- |
| `Box`             | Display  | Container with borders, padding, and flex layout                     |
| `Text`            | Display  | Styled text with color, bold, italic, dim, underline                 |
| `LogView`         | Display  | Scrollable log panel with auto-scroll and max buffer                 |
| `Table`           | Data     | Data table with column alignment and headers                         |
| `Gauge`           | Data     | Percentage indicator with label and color thresholds                 |
| `Sparkline`       | Data     | Inline bar chart for time-series data                                |
| `BarChart`        | Data     | Horizontal or vertical bar chart with groups                         |
| `StatusIndicator` | Data     | Color-coded status dot (ok / warn / error / unknown)                 |
| `ProgressBar`     | Feedback | Horizontal progress indicator with customizable fill                 |
| `Spinner`         | Feedback | Animated loading spinner with multiple styles                        |
| `Scrollbar`       | Feedback | Standalone scrollbar indicator (vertical or horizontal)              |
| `List`            | Input    | Keyboard-navigable list for small datasets                           |
| `TextInput`       | Input    | Single-line text input with cursor and placeholder                   |
| `VirtualList`     | Input    | Scroll-virtualized list; renders only visible rows, any dataset size |
## Quick Example
Build a simple dashboard by composing widgets and passing the root to `App`:
```ts

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
// ╰──────────────────────────────────╯
```
## VirtualList: handle any dataset size
`VirtualList` renders only the rows visible in the viewport. A list of 1,000,000 items renders as fast as a list of 10.
```ts

const list = new VirtualList({
    totalItems: 1_000_000,
    renderItem: (index) => `Log line \${index}: some message content`,
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

// Handles 1M items. renders ~26 rows with scrollbar
```
## Common Patterns
### Status Dashboard
```ts

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
panel.addChild(diskGauge)
```
### Log Viewer
```ts

const logs = new LogView({
    maxLines: 1000,
    autoScroll: true,
})

logs.append({ text: '[INFO]  Server started', color: 'green' })
logs.append({ text: '[WARN]  Memory usage high', color: 'yellow' })
logs.append({ text: '[ERROR] Connection reset', color: 'red' })
```
### Data Table
```ts

const table = new Table({
    columns: [
{ key: 'pid',  header: 'PID',     width: 8  },
{ key: 'name', header: 'Process',  width: 20 },
{ key: 'cpu',  header: 'CPU%',     width: 8, align: 'right' },
{ key: 'mem',  header: 'Memory',   width: 10 },
    ],
    rows: processes,
})
```
## See also

- **VirtualList**: Full reference for the virtualized list
- **@termuijs/ui**: Higher-level composites: Select, Tabs, Modal, Toast, Tree
- **Core Layout**: Flexbox properties that control widget positioning
- **TSS**: Style widgets with CSS-like theming and variables
