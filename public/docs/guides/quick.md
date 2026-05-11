# Quick: rapid prototyping
`@termuijs/quick` is for when you want to throw something on screen fast. It gives you reactive values, one-liner widget builders, and a fluent app builder that skips most of the boilerplate.
## Installation
```ts
npm install @termuijs/quick
```
## Reactive values
A reactive value is a function that returns a value. The framework calls it on every render, so the UI stays in sync without you wiring up events:
```ts

// Static. returns the value as-is
resolve(42)         // → 42

// Reactive. calls the function each time
resolve(() => 99)   // → 99

isReactive(42)          // → false
isReactive(() => 1)     // → true
```
## Widget shorthands
One-liner functions that create common widgets without touching constructors:
```ts

const label  = text('Hello World')         // Text widget
const cpuBar = gauge('CPU', 0.75)          // Gauge with label
const apiDot = status('API', true)         // Green/red status dot
```
## Layout helpers
Arrange widgets without manually creating Box containers:
```ts

// Horizontal layout
const header = row(text('Left'), text('Right'))

// Vertical layout
const sidebar = col(text('A'), text('B'), text('C'))

// Grid. specify columns and rows
const dashboard = grid(2, 2, [
    text('CPU'),  text('MEM'),
    text('Disk'), text('NET'),
])
```
## Table and list
```ts

const t = table(
    ['Name', 'Age', 'Role'],
    [
['Alice', '32', 'Engineer'],
['Bob',   '28', 'Designer'],
    ]
)

const l = list(['Item 1', 'Item 2', 'Item 3'])
```
## App builder
The `app()` function returns a builder with a fluent API. Chain your configuration and call `.run()` at the end:
```ts

app('My Dashboard')
    .rows(
text('System Monitor'),
gauge('CPU', () => getCpuUsage()),
gauge('MEM', () => getMemUsage()),
    )
    .keys({
q: () => process.exit(0),
    })
    .refresh(1000)  // re-render every second
    .run()
```
This is the fastest way to get something on screen. No App constructor, no Screen setup, no manual render loop.
## Sprint 3 additions
### New widget builders
Sprint 3 added shorthand builders for all new widgets:
```ts

    jsonView,
    diffView,
    streamingText,
    chatMessage,
    toolCall,
    commandPalette,
    multiProgress,
    grid,
} from '@termuijs/quick'

// Collapsible JSON tree
const tree = jsonView({ name: 'Alice', scores: [98, 87] })

// Unified diff viewer (parses raw diff strings)
const diff = diffView('+ added line\n- removed line')

// Typewriter effect
const text = streamingText({ text: 'Generating...', speed: 40 })

// Chat bubble
const msg = chatMessage({ role: 'assistant', content: 'How can I help?' })

// AI tool call display
const call = toolCall({ name: 'readFile', status: 'running' })

// Searchable command palette
const palette = commandPalette([
    { label: 'New File',  action: newFile },
    { label: 'Open...',   action: openFile },
])

// Multiple progress bars
const progress = multiProgress([
    { label: 'Download', value: 0.72 },
    { label: 'Extract',  value: 0.10 },
])

// Grid layout (col × items)
const dashboard = grid(2, [cpuGauge, memGauge, diskGauge, netGauge])
```
### Re-exported hooks
All framework hooks are re-exported from `@termuijs/quick` — no need to import from multiple packages:
```ts

    useKeymap,
    useMotion,
    useTheme,
    useNotifications,
    useAsync,
    // data hooks
    useCpu,
    useMemory,
    useDisk,
    useNetwork,
    useTopProcesses,
    useSystemInfo,
    useHttpHealth,
} from '@termuijs/quick'
```
### AI assistant dashboard example
```ts

const messages = col(
    chatMessage({ role: 'user', content: 'Check disk usage' }),
    toolCall({ name: 'diskMetrics', status: 'done', result: { used: '45GB', free: '120GB' } }),
    streamingText({ text: 'Your disk is 27% full. No action needed.' }),
)

const palette = commandPalette([
    { label: 'New conversation', action: () => clearMessages() },
    { label: 'Export chat',      action: () => exportToFile() },
])

app('AI Assistant')
    .rows(messages, palette)
    .keys({ q: () => process.exit(0) })
    .run()
```
