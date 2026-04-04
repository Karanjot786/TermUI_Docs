export function WidgetsVirtualList() {
    return (
        <>
            <h1>VirtualList</h1>
            <p>
                A scroll-virtualized list that renders only the rows currently visible in
                the viewport. The rest of the dataset — whether it's 1,000 items or
                10,000,000 — is never painted. Scroll performance stays constant regardless
                of dataset size.
            </p>
            <p>
                Use it whenever a list could grow beyond what fits on screen: log viewers,
                process tables, file pickers, search results.
            </p>

            <h2 id="installation">Installation</h2>
            <pre><code>{`npm install @termuijs/widgets`}</code></pre>

            <h2 id="basic-usage">Basic Usage</h2>
            <pre><code>{`import { VirtualList } from '@termuijs/widgets'
import { App } from '@termuijs/core'

const app = new App()

const list = new VirtualList({
    totalItems: 100_000,
    renderItem: (index) => \`Row \${index}: some content\`,
    onSelect:   (index) => console.log('Selected:', index),
})

app.render(list)
// ┌──────────────────────────────────────────────────────────────────────────────┐
// │   Row 0: some content                                                    ░   │
// │ ▸ Row 1: some content                                                    █   │
// │   Row 2: some content                                                    ░   │
// │   Row 3: some content                                                    ░   │
// └──────────────────────────────────────────────────────────────────────────────┘`}</code></pre>

            <h2 id="options">Options</h2>
            <table>
                <thead>
                    <tr><th>Option</th><th>Type</th><th>Default</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>totalItems</code></td><td><code>number</code></td><td>—</td><td>Total number of items in the dataset</td></tr>
                    <tr><td><code>renderItem</code></td><td><code>(index: number) =&gt; string</code></td><td>—</td><td>Called for each visible item. Return its text content.</td></tr>
                    <tr><td><code>itemHeight</code></td><td><code>number</code></td><td><code>1</code></td><td>Rows each item occupies</td></tr>
                    <tr><td><code>onSelect</code></td><td><code>(index: number) =&gt; void</code></td><td><code>undefined</code></td><td>Called when the user presses Enter</td></tr>
                    <tr><td><code>overscan</code></td><td><code>number</code></td><td><code>2</code></td><td>Extra items to render above/below the viewport (prevents flicker)</td></tr>
                    <tr><td><code>showScrollbar</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Show a scrollbar indicator on the right</td></tr>
                    <tr><td><code>style</code></td><td><code>Partial&lt;Style&gt;</code></td><td><code>undefined</code></td><td>Style overrides (color, background, etc.)</td></tr>
                </tbody>
            </table>

            <h2 id="keyboard-navigation">Keyboard Navigation</h2>
            <p>
                Hook the list's methods to your key handler:
            </p>
            <pre><code>{`import { App } from '@termuijs/core'

const app = new App()
const list = new VirtualList({ totalItems: 1000, renderItem: (i) => \`Item \${i}\` })

app.onKey('up',       () => list.selectPrev())
app.onKey('down',     () => list.selectNext())
app.onKey('pageup',   () => list.pageUp())
app.onKey('pagedown', () => list.pageDown())
app.onKey('home',     () => list.selectFirst())
app.onKey('end',      () => list.selectLast())
app.onKey('enter',    () => list.confirm())

app.render(list)`}</code></pre>

            <h2 id="api">API Reference</h2>

            <h3 id="navigation-methods">Navigation Methods</h3>
            <table>
                <thead>
                    <tr><th>Method</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>selectNext()</code></td><td>Move selection down by one item</td></tr>
                    <tr><td><code>selectPrev()</code></td><td>Move selection up by one item</td></tr>
                    <tr><td><code>selectFirst()</code></td><td>Jump to the first item</td></tr>
                    <tr><td><code>selectLast()</code></td><td>Jump to the last item</td></tr>
                    <tr><td><code>pageUp()</code></td><td>Move up by one viewport height</td></tr>
                    <tr><td><code>pageDown()</code></td><td>Move down by one viewport height</td></tr>
                    <tr><td><code>scrollTo(index)</code></td><td>Jump to a specific index</td></tr>
                    <tr><td><code>confirm()</code></td><td>Trigger <code>onSelect</code> with the current index</td></tr>
                </tbody>
            </table>

            <h3 id="data-methods">Data Methods</h3>
            <table>
                <thead>
                    <tr><th>Method</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>setTotalItems(count)</code></td><td>Update the dataset size (e.g., after a filter or load). Clamps selection if needed.</td></tr>
                    <tr><td><code>setRenderItem(fn)</code></td><td>Replace the render function (e.g., when data changes). Triggers a repaint.</td></tr>
                </tbody>
            </table>

            <h3 id="getters">Getters</h3>
            <table>
                <thead>
                    <tr><th>Property</th><th>Type</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>totalItems</code></td><td><code>number</code></td><td>Current total item count</td></tr>
                    <tr><td><code>selectedIndex</code></td><td><code>number</code></td><td>Current selection (0-based)</td></tr>
                    <tr><td><code>scrollOffset</code></td><td><code>number</code></td><td>First visible item index</td></tr>
                </tbody>
            </table>

            <h2 id="real-world-filter">Real-World Example: Filterable List</h2>
            <pre><code>{`import { App } from '@termuijs/core'
import { VirtualList, TextInput, Box, Text } from '@termuijs/widgets'

const ALL_PROCESSES = await getProcessList()   // 10,000+ items

const app = new App()
let filtered = ALL_PROCESSES

const list = new VirtualList({
    totalItems: filtered.length,
    renderItem: (i) => {
        const p = filtered[i]
        return \`\${p.pid.toString().padEnd(6)} \${p.name.padEnd(20)} \${p.cpu}%\`
    },
    onSelect: (i) => inspectProcess(filtered[i]),
})

const searchInput = new TextInput({
    placeholder: 'Filter processes...',
    onChange: (query) => {
        filtered = ALL_PROCESSES.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
        )
        list.setTotalItems(filtered.length)
        list.selectFirst()
    },
})

app.onKey('up',    () => list.selectPrev())
app.onKey('down',  () => list.selectNext())
app.onKey('enter', () => list.confirm())

app.render(
    <Box flexDirection="column">
        {searchInput}
        {list}
    </Box>
)`}</code></pre>

            <h2 id="async-data">Loading Async Data</h2>
            <p>
                Start with a placeholder count and update as data arrives:
            </p>
            <pre><code>{`const list = new VirtualList({
    totalItems: 0,
    renderItem: (i) => items[i]?.name ?? 'Loading...',
})

// Show the list immediately — renders nothing until data arrives
app.render(list)

// Data comes in pages
async function loadPage(offset: number) {
    const page = await fetchItems(offset, 50)
    items.push(...page)
    list.setTotalItems(items.length)
}

loadPage(0)`}</code></pre>

            <h2 id="how-virtualization-works">How Virtualization Works</h2>
            <p>
                On each render, <code>VirtualList</code> calculates which indices fall
                within the current viewport:
            </p>
            <pre><code>{`start = scrollOffset - overscan
end   = scrollOffset + visibleCount + overscan

// Anything outside [start, end] is never called or painted.
// totalItems only affects the scrollbar ratio and clamp logic.`}</code></pre>
            <p>
                The scrollbar position is computed as a ratio of{' '}
                <code>scrollOffset / (totalItems - visibleCount)</code>. It uses block
                characters (<code>█</code> for thumb, <code>░</code> for track) and
                disappears when all items fit in the viewport.
            </p>

            <h2 id="performance">Performance Numbers</h2>
            <table>
                <thead>
                    <tr><th>Dataset size</th><th>Items rendered per frame</th><th>Memory for item state</th></tr>
                </thead>
                <tbody>
                    <tr><td>100 items</td><td>~26 rows + 4 overscan</td><td>O(viewport)</td></tr>
                    <tr><td>100,000 items</td><td>~26 rows + 4 overscan</td><td>O(viewport)</td></tr>
                    <tr><td>1,000,000 items</td><td>~26 rows + 4 overscan</td><td>O(viewport)</td></tr>
                </tbody>
            </table>
            <p>
                The only work that scales with dataset size is your{' '}
                <code>renderItem</code> function — keep it cheap. Derive display strings
                ahead of time if the computation is expensive.
            </p>

            <h2 id="see-also">See Also</h2>
            <ul>
                <li><strong>List</strong> — Simple non-virtualized list for small datasets (&lt;100 items)</li>
                <li><strong>Table</strong> — Tabular data with column headers and alignment</li>
                <li><strong>TextInput</strong> — Combine with VirtualList for search/filter UIs</li>
                <li><strong>@termuijs/store</strong> — Manage filter/selection state outside the widget</li>
            </ul>
        </>
    )
}
