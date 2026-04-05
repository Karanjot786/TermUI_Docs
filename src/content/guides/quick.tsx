export function GuideQuick() {
    return (
        <>
            <h1>Quick: rapid prototyping</h1>
            <p><code>@termuijs/quick</code> is for when you want to throw something on screen fast. It gives you reactive values, one-liner widget builders, and a fluent app builder that skips most of the boilerplate.</p>

            <h2 id="installation">Installation</h2>
            <pre><code>{`npm install @termuijs/quick`}</code></pre>

            <h2 id="reactive">Reactive values</h2>
            <p>A reactive value is a function that returns a value. The framework calls it on every render, so the UI stays in sync without you wiring up events:</p>
            <pre><code>{`import { resolve, isReactive } from '@termuijs/quick'

// Static. returns the value as-is
resolve(42)         // → 42

// Reactive. calls the function each time
resolve(() => 99)   // → 99

isReactive(42)          // → false
isReactive(() => 1)     // → true`}</code></pre>

            <h2 id="widget-helpers">Widget shorthands</h2>
            <p>One-liner functions that create common widgets without touching constructors:</p>
            <pre><code>{`import { text, gauge, status } from '@termuijs/quick'

const label  = text('Hello World')         // Text widget
const cpuBar = gauge('CPU', 0.75)          // Gauge with label
const apiDot = status('API', true)         // Green/red status dot`}</code></pre>

            <h2 id="layout-helpers">Layout helpers</h2>
            <p>Arrange widgets without manually creating Box containers:</p>
            <pre><code>{`import { row, col, grid, text } from '@termuijs/quick'

// Horizontal layout
const header = row(text('Left'), text('Right'))

// Vertical layout
const sidebar = col(text('A'), text('B'), text('C'))

// Grid. specify columns and rows
const dashboard = grid(2, 2, [
    text('CPU'),  text('MEM'),
    text('Disk'), text('NET'),
])`}</code></pre>

            <h2 id="table-list">Table and list</h2>
            <pre><code>{`import { table, list } from '@termuijs/quick'

const t = table(
    ['Name', 'Age', 'Role'],
    [
        ['Alice', '32', 'Engineer'],
        ['Bob',   '28', 'Designer'],
    ]
)

const l = list(['Item 1', 'Item 2', 'Item 3'])`}</code></pre>

            <h2 id="app-builder">App builder</h2>
            <p>The <code>app()</code> function returns a builder with a fluent API. Chain your configuration and call <code>.run()</code> at the end:</p>
            <pre><code>{`import { app, text, gauge } from '@termuijs/quick'

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
    .run()`}</code></pre>
            <p>This is the fastest way to get something on screen. No App constructor, no Screen setup, no manual render loop.</p>
        </>
    )
}
