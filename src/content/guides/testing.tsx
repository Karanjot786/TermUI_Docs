export function GuideTesting() {
    return (
        <>
            <h1>Testing TermUI apps</h1>
            <p>
                TermUI ships a test renderer, <code>@termuijs/testing</code>,
                that lets you write fast, headless tests without a real terminal.
                This guide covers component tests, state, async, stores, context,
                and snapshots.
            </p>

            <h2 id="setup">Setup</h2>
            <pre><code>{`npm install --save-dev @termuijs/testing vitest`}</code></pre>
            <p>Vitest config:</p>
            <pre><code>{`// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
    },
})`}</code></pre>
            <p>Add scripts to <code>package.json</code>:</p>
            <pre><code>{`{
    "scripts": {
        "test": "vitest run",
        "test:watch": "vitest"
    }
}`}</code></pre>

            <h2 id="anatomy">The pattern</h2>
            <p>Render, query, interact, assert. Same four steps every time:</p>
            <pre><code>{`import { describe, it, expect } from 'vitest'
import { render } from '@termuijs/testing'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
    it('renders correctly', () => {
        // 1. Render
        const t = render(<MyComponent />)

        // 2. Query
        expect(t.getByText('Hello')).toBeTruthy()

        // 3. Interact
        t.fireKey('enter')

        // 4. Assert
        expect(t.getByText('Done')).toBeTruthy()
        t.unmount()   // always clean up
    })
})`}</code></pre>

            <h2 id="testing-state">State</h2>
            <p>
                Hook state persists between interactions within the same test, just
                like in a running app:
            </p>
            <pre><code>{`function Toggle() {
    const [on, setOn] = useState(false)
    useInput((key) => { if (key === 'space') setOn((v) => !v) })
    return <Text>{on ? 'ON' : 'OFF'}</Text>
}

it('toggles on space', () => {
    const t = render(<Toggle />)
    expect(t.getByText('OFF')).toBeTruthy()

    t.fireKey('space')
    expect(t.getByText('ON')).toBeTruthy()

    t.fireKey('space')
    expect(t.getByText('OFF')).toBeTruthy()

    t.unmount()
})`}</code></pre>

            <h2 id="testing-input">Keyboard input</h2>
            <p>
                <code>fireKey</code> for special keys, <code>typeText</code> for
                strings:
            </p>
            <pre><code>{`// Special keys
t.fireKey('up')
t.fireKey('down')
t.fireKey('enter')
t.fireKey('escape')
t.fireKey('tab')
t.fireKey('backspace')
t.fireKey('delete')

// Modifiers
t.fireKey('c', { ctrl: true })   // Ctrl+C
t.fireKey('z', { ctrl: true })   // Ctrl+Z

// Typing
t.typeText('hello')
// same as:
['h','e','l','l','o'].forEach(ch => t.fireKey(ch))`}</code></pre>

            <h2 id="testing-lists">Lists and navigation</h2>
            <pre><code>{`function Menu() {
    const [active, setActive] = useState(0)
    const items = ['Save', 'Open', 'Quit']

    useInput((key) => {
        if (key === 'up')    setActive((i) => Math.max(0, i - 1))
        if (key === 'down')  setActive((i) => Math.min(items.length - 1, i + 1))
    })

    return (
        <Box flexDirection="column">
            {items.map((label, i) => (
                <Text key={i} inverse={i === active}>{label}</Text>
            ))}
        </Box>
    )
}

it('navigates with arrow keys', () => {
    const t = render(<Menu />)
    const texts = t.getAllByType(Text)
    expect(texts).toHaveLength(3)

    t.fireKey('down')
    t.fireKey('down')
    t.fireKey('up')

    t.unmount()
})`}</code></pre>

            <h2 id="testing-async">Async components</h2>
            <p>
                Let async effects settle before asserting. Use a small helper
                to flush the microtask queue:
            </p>
            <pre><code>{`// Helper. flush pending promises
const flushPromises = () => new Promise((r) => setTimeout(r, 0))

function DataPanel() {
    const { data, loading } = useAsync(() => fetchData(), [])
    if (loading) return <Text>Loading...</Text>
    return <Text>Items: {data.length}</Text>
}

it('shows data after load', async () => {
    vi.mocked(fetchData).mockResolvedValue([{ id: 1 }, { id: 2 }])

    const t = render(<DataPanel />)
    expect(t.getByText('Loading...')).toBeTruthy()

    // Let the promise resolve and state update
    await flushPromises()

    expect(t.getByText('Items: 2')).toBeTruthy()
    t.unmount()
})`}</code></pre>

            <h2 id="testing-store">With @termuijs/store</h2>
            <p>
                Call <code>destroy()</code> in <code>afterEach</code> to reset
                subscribers between tests:
            </p>
            <pre><code>{`// counter.store.ts
export const useCounterStore = createStore((set) => ({
    count: 0,
    increment: () => set((s) => ({ count: s.count + 1 })),
}))

// counter.test.tsx
import { afterEach, beforeEach } from 'vitest'
import { useCounterStore } from './counter.store'

let t: TestInstance

beforeEach(() => {
    t = render(<CounterWidget />)
})
afterEach(() => {
    t.unmount()
    useCounterStore.destroy()
    useCounterStore.setState({ count: 0 })
})

it('increments via store', () => {
    useCounterStore.getState().increment()
    expect(t.getByText('Count: 1')).toBeTruthy()
})

it('reads initial state', () => {
    expect(t.getByText('Count: 0')).toBeTruthy()
})`}</code></pre>

            <h2 id="testing-context">With context</h2>
            <p>
                Wrap the component in a Provider to test with different values:
            </p>
            <pre><code>{`import { ThemeCtx } from './theme'

function StatusBar() {
    const theme = useContext(ThemeCtx)
    return <Text color={theme.primary}>Ready</Text>
}

it('uses the provided theme', () => {
    const t = render(
        <ThemeCtx.Provider value={{ primary: 'red', bg: 'black' }}>
            <StatusBar />
        </ThemeCtx.Provider>
    )
    expect(t.getByText('Ready')).toBeTruthy()
    t.unmount()
})

it('falls back to default without Provider', () => {
    const t = render(<StatusBar />)
    expect(t.getByText('Ready')).toBeTruthy()
    t.unmount()
})`}</code></pre>

            <h2 id="snapshot-testing">Snapshots</h2>
            <p>
                <code>lastFrame()</code> captures the full rendered grid: borders,
                padding, alignment. Good for catching unintended layout changes:
            </p>
            <pre><code>{`it('matches snapshot', () => {
    const t = render(<Dashboard />)
    expect(t.lastFrame()).toMatchSnapshot()
    t.unmount()
})

// Generated snapshot:
// [
//   "┌─────────────────────────────────┐",
//   "│ System Dashboard                │",
//   "│ CPU ████████████░░░░ 72%        │",
//   "│ MEM ████████░░░░░░░░ 58%        │",
//   "└─────────────────────────────────┘",
// ]`}</code></pre>
            <p>Update after intentional layout changes:</p>
            <pre><code>{`vitest --update-snapshots`}</code></pre>

            <h2 id="testing-virtuallist">VirtualList</h2>
            <pre><code>{`import { VirtualList } from '@termuijs/widgets'

it('navigates through the list', () => {
    const onSelect = vi.fn()
    const list = new VirtualList({
        totalItems: 100,
        renderItem: (i) => \`Item \${i}\`,
        onSelect,
    })

    expect(list.selectedIndex).toBe(0)

    list.selectNext()
    expect(list.selectedIndex).toBe(1)

    list.selectLast()
    expect(list.selectedIndex).toBe(99)

    list.confirm()
    expect(onSelect).toHaveBeenCalledWith(99)
})`}</code></pre>

            <h2 id="best-practices">Tips</h2>

            <h3 id="always-unmount">Always unmount</h3>
            <p>
                Skipping <code>unmount()</code> leaves Fiber state behind. The next
                test might see stale hook values:
            </p>
            <pre><code>{`afterEach(() => t?.unmount())`}</code></pre>

            <h3 id="query-content">Query by text, not structure</h3>
            <p>
                <code>getByText</code> survives layout changes. Querying by widget
                type or index ties your tests to the implementation:
            </p>
            <pre><code>{`// Good
expect(t.getByText('5 items selected')).toBeTruthy()

// Fragile
const boxes = t.getAllByType(Box)
expect((boxes[2] as any)._children[0]).toBeTruthy()`}</code></pre>

            <h3 id="one-concept">One behavior per test</h3>
            <p>
                If you're writing 10+ assertions in one test, split them up.
            </p>

            <h3 id="mock-side-effects">Mock side effects</h3>
            <p>
                Network calls, file reads, timers. Mock them so tests stay fast
                and predictable:
            </p>
            <pre><code>{`import { vi } from 'vitest'

vi.mock('./api', () => ({
    fetchData: vi.fn().mockResolvedValue([{ id: 1, name: 'test' }]),
}))

// Fake timers for interval components
vi.useFakeTimers()
t.fireKey('r')
vi.advanceTimersByTime(1000)
expect(t.getByText('Refreshed')).toBeTruthy()
vi.useRealTimers()`}</code></pre>

            <h2 id="see-also">See also</h2>
            <ul>
                <li><strong>@termuijs/testing</strong>: Full method reference</li>
                <li><strong>@termuijs/store</strong>: destroy() for test cleanup</li>
                <li><strong>Vitest</strong>: Mocking, fake timers, snapshots</li>
            </ul>
        </>
    )
}
