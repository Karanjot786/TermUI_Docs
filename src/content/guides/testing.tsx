export function GuideTesting() {
    return (
        <>
            <h1>Testing TermUI Apps</h1>
            <p>
                TermUI ships a dedicated test renderer — <code>@termuijs/testing</code> —
                so you can write fast, headless tests for your components without a real
                terminal. This guide covers everything from basic component tests to
                integration tests with stores and context.
            </p>

            <h2 id="setup">Setup</h2>
            <pre><code>{`npm install --save-dev @termuijs/testing vitest`}</code></pre>
            <p>Add a Vitest config:</p>
            <pre><code>{`// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
    },
})`}</code></pre>
            <p>Add a test script to <code>package.json</code>:</p>
            <pre><code>{`{
    "scripts": {
        "test": "vitest run",
        "test:watch": "vitest"
    }
}`}</code></pre>

            <h2 id="anatomy">Anatomy of a TermUI Test</h2>
            <p>Every test follows the same four-step pattern:</p>
            <pre><code>{`import { describe, it, expect, afterEach } from 'vitest'
import { render } from '@termuijs/testing'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
    it('renders correctly', () => {
        // 1. Render
        const t = render(<MyComponent />)

        // 2. Query the output
        expect(t.getByText('Hello')).toBeTruthy()

        // 3. Interact
        t.fireKey('enter')

        // 4. Assert
        expect(t.getByText('Done')).toBeTruthy()
        t.unmount()   // always clean up
    })
})`}</code></pre>

            <h2 id="testing-state">Testing State</h2>
            <p>
                Components using <code>useState</code> work exactly as they would in a
                running app — hook state persists between interactions within the same test.
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

            <h2 id="testing-input">Testing Keyboard Input</h2>
            <p>
                Use <code>fireKey</code> for special keys and <code>typeText</code> for
                strings. Key names match what <code>useInput</code> receives.
            </p>
            <pre><code>{`// Special keys
t.fireKey('up')
t.fireKey('down')
t.fireKey('enter')
t.fireKey('escape')
t.fireKey('tab')
t.fireKey('backspace')
t.fireKey('delete')

// With modifiers
t.fireKey('c', { ctrl: true })   // Ctrl+C
t.fireKey('z', { ctrl: true })   // Ctrl+Z

// Typing
t.typeText('hello')
// equivalent to:
['h','e','l','l','o'].forEach(ch => t.fireKey(ch))`}</code></pre>

            <h2 id="testing-lists">Testing Lists and Navigation</h2>
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

    // First item selected by default
    const texts = t.getAllByType(Text)
    expect(texts).toHaveLength(3)

    t.fireKey('down')
    // selection moved — check your own logic
    t.fireKey('down')
    t.fireKey('up')

    t.unmount()
})`}</code></pre>

            <h2 id="testing-async">Testing Async Components</h2>
            <p>
                Use Vitest's <code>waitFor</code> or <code>flushPromises</code> helper to
                let async effects resolve before asserting:
            </p>
            <pre><code>{`import { waitFor } from 'vitest'

function DataPanel() {
    const { data, loading } = useAsync(() => fetchData(), [])
    if (loading) return <Text>Loading...</Text>
    return <Text>Items: {data.length}</Text>
}

it('shows data after load', async () => {
    // Mock the network call
    vi.mocked(fetchData).mockResolvedValue([{ id: 1 }, { id: 2 }])

    const t = render(<DataPanel />)

    // Before resolve: loading
    expect(t.getByText('Loading...')).toBeTruthy()

    // Wait for async to settle
    await waitFor(() => {
        expect(t.getByText('Items: 2')).toBeTruthy()
    })

    t.unmount()
})`}</code></pre>

            <h2 id="testing-store">Testing with @termuijs/store</h2>
            <p>
                Reset store state between tests by calling <code>destroy()</code> in{' '}
                <code>afterEach</code>. This removes all subscribers and lets the next test
                start fresh.
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
    // Reset state for next test
    useCounterStore.setState({ count: 0 })
})

it('increments via store', () => {
    useCounterStore.getState().increment()
    expect(t.getByText('Count: 1')).toBeTruthy()
})

it('reads initial state', () => {
    expect(t.getByText('Count: 0')).toBeTruthy()
})`}</code></pre>

            <h2 id="testing-context">Testing with Context</h2>
            <p>
                Wrap the component in a Provider when it reads from context. This lets you
                test with different context values without modifying the component.
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
    // StatusBar rendered with the test theme — no real app needed
    expect(t.getByText('Ready')).toBeTruthy()
    t.unmount()
})

it('uses default theme without Provider', () => {
    const t = render(<StatusBar />)
    // Falls back to ThemeCtx.defaultValue
    expect(t.getByText('Ready')).toBeTruthy()
    t.unmount()
})`}</code></pre>

            <h2 id="snapshot-testing">Snapshot Testing</h2>
            <p>
                Lock in your component's visual layout with snapshots. The{' '}
                <code>lastFrame()</code> output captures borders, padding, alignment — the
                full rendered character grid.
            </p>
            <pre><code>{`it('matches snapshot', () => {
    const t = render(<Dashboard />)
    expect(t.lastFrame()).toMatchSnapshot()
    t.unmount()
})

// Generated snapshot:
// exports[\`Dashboard matches snapshot 1\`] = \`
// [
//   "┌─────────────────────────────────┐",
//   "│ System Dashboard                │",
//   "│ CPU ████████████░░░░ 72%        │",
//   "│ MEM ████████░░░░░░░░ 58%        │",
//   "└─────────────────────────────────┘",
// ]
// \``}</code></pre>
            <p>Update snapshots after intentional layout changes:</p>
            <pre><code>{`vitest --update-snapshots`}</code></pre>

            <h2 id="testing-virtuallist">Testing VirtualList</h2>
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

            <h2 id="best-practices">Best Practices</h2>

            <h3 id="always-unmount">Always unmount</h3>
            <p>
                Failing to call <code>unmount()</code> leaves Fiber state behind and can
                cause the next test to see stale hook values. Use <code>afterEach</code>:
            </p>
            <pre><code>{`afterEach(() => t?.unmount())`}</code></pre>

            <h3 id="query-content">Query text content, not DOM structure</h3>
            <p>
                <code>getByText</code> is resilient to layout changes. Querying by widget
                type or position ties tests to implementation detail. Prefer:
            </p>
            <pre><code>{`// Good — content-based
expect(t.getByText('5 items selected')).toBeTruthy()

// Fragile — structure-based
const boxes = t.getAllByType(Box)
expect((boxes[2] as any)._children[0]).toBeTruthy()`}</code></pre>

            <h3 id="one-concept">One concept per test</h3>
            <p>
                Keep each test focused on a single behavior. If you find yourself writing
                10+ assertions in one test, split them.
            </p>

            <h3 id="mock-side-effects">Mock external side effects</h3>
            <p>
                Network calls, file reads, and timers should be mocked so tests are fast
                and deterministic:
            </p>
            <pre><code>{`import { vi } from 'vitest'

vi.mock('./api', () => ({
    fetchData: vi.fn().mockResolvedValue([{ id: 1, name: 'test' }]),
}))

// Control time for interval-based components
vi.useFakeTimers()
t.fireKey('r')
vi.advanceTimersByTime(1000)
expect(t.getByText('Refreshed')).toBeTruthy()
vi.useRealTimers()`}</code></pre>

            <h2 id="see-also">See Also</h2>
            <ul>
                <li><strong>@termuijs/testing API</strong> — Full method reference</li>
                <li><strong>@termuijs/store</strong> — destroy() for test cleanup</li>
                <li><strong>Vitest docs</strong> — waitFor, mocking, snapshot management</li>
            </ul>
        </>
    )
}
