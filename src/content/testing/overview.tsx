export function TestingOverview() {
    return (
        <>
            <h1>Testing</h1>
            <p>
                <code>@termuijs/testing</code> is a test renderer for TermUI components. It
                renders your JSX tree into an in-memory screen buffer, lets you query the
                output, simulate key presses, and verify behavior — all without a real
                terminal.
            </p>
            <p>
                The design is intentionally close to React Testing Library: render,
                query, fire, assert.
            </p>

            <h2 id="installation">Installation</h2>
            <pre><code>{`npm install --save-dev @termuijs/testing vitest`}</code></pre>

            <h2 id="quick-start">Quick Start</h2>
            <pre><code>{`// counter.test.tsx
import { describe, it, expect } from 'vitest'
import { render } from '@termuijs/testing'
import { useState, useInput } from '@termuijs/jsx'
import { Text } from '@termuijs/widgets'

function Counter() {
    const [count, setCount] = useState(0)
    useInput((key) => {
        if (key === '+') setCount((c) => c + 1)
        if (key === '-') setCount((c) => c - 1)
    })
    return <Text>Count: {count}</Text>
}

describe('Counter', () => {
    it('starts at zero', () => {
        const t = render(<Counter />)
        expect(t.getByText('Count: 0')).toBeTruthy()
        t.unmount()
    })

    it('increments on +', () => {
        const t = render(<Counter />)
        t.fireKey('+')
        expect(t.getByText('Count: 1')).toBeTruthy()
        t.unmount()
    })

    it('decrements on -', () => {
        const t = render(<Counter />)
        t.fireKey('+')
        t.fireKey('+')
        t.fireKey('-')
        expect(t.getByText('Count: 1')).toBeTruthy()
        t.unmount()
    })
})`}</code></pre>

            <h2 id="render">render(element, options?)</h2>
            <p>
                Renders a JSX element into a virtual{' '}
                <code>width × height</code> screen. Returns a <code>TestInstance</code>{' '}
                with query and interaction methods. Always call <code>unmount()</code> in
                your test's cleanup to avoid hook state leaking between tests.
            </p>
            <pre><code>{`import { render } from '@termuijs/testing'

const t = render(<MyWidget />, {
    width:  80,   // default
    height: 24,   // default
})`}</code></pre>

            <h3 id="render-options">Options</h3>
            <table>
                <thead>
                    <tr><th>Option</th><th>Default</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>width</code></td><td><code>80</code></td><td>Screen columns</td></tr>
                    <tr><td><code>height</code></td><td><code>24</code></td><td>Screen rows</td></tr>
                </tbody>
            </table>

            <h2 id="query-api">Query API</h2>

            <h3 id="getbytext">getByText(text)</h3>
            <p>
                Finds the first widget whose text content includes{' '}
                <code>text</code>. Returns <code>null</code> if nothing matches. Uses both
                the widget tree (preferred) and the screen buffer as fallback.
            </p>
            <pre><code>{`const widget = t.getByText('Hello')
expect(widget).not.toBeNull()

// Test absence
expect(t.getByText('Error')).toBeNull()`}</code></pre>

            <h3 id="getallbytext">getAllByText(text)</h3>
            <p>
                Returns all widgets containing the text. Useful when the same string
                appears multiple times (e.g., list items):
            </p>
            <pre><code>{`const rows = t.getAllByText('active')
expect(rows).toHaveLength(3)`}</code></pre>

            <h3 id="getallbytype">getAllByType(Type)</h3>
            <p>
                Returns all widget instances of a given constructor. Useful for counting
                rendered widgets regardless of content:
            </p>
            <pre><code>{`import { Text, Box } from '@termuijs/widgets'

const texts = t.getAllByType(Text)
expect(texts).toHaveLength(5)

const boxes = t.getAllByType(Box)
expect(boxes.length).toBeGreaterThan(0)`}</code></pre>

            <h3 id="lastframe">lastFrame()</h3>
            <p>
                Returns the current screen as an array of strings (one per row). Rows are
                trimmed of trailing whitespace. Good for snapshot tests:
            </p>
            <pre><code>{`const frame = t.lastFrame()

// Check specific rows
expect(frame[0]).toBe('┌────────────┐')
expect(frame[1]).toContain('Dashboard')

// Snapshot test (Vitest)
expect(frame).toMatchSnapshot()`}</code></pre>

            <h3 id="tostring">toString()</h3>
            <p>
                Joins all non-empty screen rows into a single string. Useful for quick
                content assertions without caring about exact line positions:
            </p>
            <pre><code>{`expect(t.toString()).toContain('Items: 5')`}</code></pre>

            <h2 id="interaction-api">Interaction API</h2>

            <h3 id="firekey">fireKey(key, modifiers?)</h3>
            <p>
                Dispatches a key event to all <code>useInput</code> handlers in the widget
                tree. Modifiers are optional.
            </p>
            <pre><code>{`// Bare key
t.fireKey('enter')
t.fireKey('escape')
t.fireKey('tab')

// Arrow keys
t.fireKey('up')
t.fireKey('down')

// With modifiers
t.fireKey('c', { ctrl: true })    // Ctrl+C
t.fireKey('a', { shift: true })   // Shift+A
t.fireKey('f', { alt: true })     // Alt+F`}</code></pre>

            <h3 id="typetext">typeText(text)</h3>
            <p>
                Fires each character in the string as a separate key event. Simulates
                typing into a <code>TextInput</code>:
            </p>
            <pre><code>{`const t = render(<SearchInput />)
t.typeText('hello world')
expect(t.getByText('hello world')).toBeTruthy()`}</code></pre>

            <h2 id="lifecycle">Lifecycle</h2>

            <h3 id="rerender">rerender(element?)</h3>
            <p>
                Re-renders the widget tree. If you pass a new element, it replaces the
                previous root. Useful for testing prop changes:
            </p>
            <pre><code>{`// Update props
const t = render(<StatusBar status="loading" />)
expect(t.getByText('loading')).toBeTruthy()

t.rerender(<StatusBar status="done" />)
expect(t.getByText('done')).toBeTruthy()
expect(t.getByText('loading')).toBeNull()`}</code></pre>

            <h3 id="unmount">unmount()</h3>
            <p>
                Cleans up all component instances and hook state. Always call this at the
                end of each test. With Vitest, put it in <code>afterEach</code>:
            </p>
            <pre><code>{`import { afterEach } from 'vitest'

let t: TestInstance

beforeEach(() => { t = render(<MyWidget />) })
afterEach(() => t.unmount())`}</code></pre>

            <h2 id="testing-with-store">Testing with @termuijs/store</h2>
            <p>
                Call <code>destroy()</code> on your stores in <code>afterEach</code> to
                reset state between tests:
            </p>
            <pre><code>{`import { afterEach } from 'vitest'
import { useCounterStore } from './store'

afterEach(() => {
    useCounterStore.destroy()
})`}</code></pre>

            <h2 id="testing-context">Testing with Context</h2>
            <p>
                Wrap the component in a Provider when it needs context:
            </p>
            <pre><code>{`import { ThemeCtx } from './theme'

const testTheme = { fg: 'white', bg: 'black' }

const t = render(
    <ThemeCtx.Provider value={testTheme}>
        <MyComponent />
    </ThemeCtx.Provider>
)

expect(t.getByText('Ready')).toBeTruthy()`}</code></pre>

            <h2 id="snapshot-testing">Snapshot Testing</h2>
            <p>
                Use <code>lastFrame()</code> with Vitest's <code>toMatchSnapshot</code> to
                lock in your terminal UI's visual output. The snapshot captures exact
                character layout including borders and alignment:
            </p>
            <pre><code>{`it('renders the dashboard layout', () => {
    const t = render(<Dashboard />)
    expect(t.lastFrame()).toMatchSnapshot()
    t.unmount()
})

// Snapshot file (auto-generated):
// [
//   "┌────────────────────────────────┐",
//   "│ System Dashboard               │",
//   "│ CPU ████████░░ 72%             │",
//   "│ MEM ██████░░░░ 58%             │",
//   "└────────────────────────────────┘",
// ]`}</code></pre>

            <h2 id="full-api">Full API Summary</h2>
            <table>
                <thead>
                    <tr><th>Method</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>render(el, opts?)</code></td><td>Render into a virtual screen. Returns TestInstance.</td></tr>
                    <tr><td><code>t.getByText(text)</code></td><td>Find first widget / null</td></tr>
                    <tr><td><code>t.getAllByText(text)</code></td><td>Find all widgets matching text</td></tr>
                    <tr><td><code>t.getAllByType(Type)</code></td><td>Find all widgets of a constructor</td></tr>
                    <tr><td><code>t.lastFrame()</code></td><td>Screen rows as string[]</td></tr>
                    <tr><td><code>t.toString()</code></td><td>Screen as a single string</td></tr>
                    <tr><td><code>t.fireKey(key, mods?)</code></td><td>Simulate a key press</td></tr>
                    <tr><td><code>t.typeText(text)</code></td><td>Type characters one by one</td></tr>
                    <tr><td><code>t.rerender(el?)</code></td><td>Re-render, optionally with new element</td></tr>
                    <tr><td><code>t.unmount()</code></td><td>Clean up all component state</td></tr>
                    <tr><td><code>t.container</code></td><td>The root Box widget</td></tr>
                    <tr><td><code>t.screen</code></td><td>The raw Screen buffer</td></tr>
                </tbody>
            </table>

            <h2 id="see-also">See Also</h2>
            <ul>
                <li><strong>Vitest</strong> — Recommended test runner</li>
                <li><strong>@termuijs/store</strong> — Call <code>destroy()</code> in test cleanup</li>
                <li><strong>Guide: Testing Best Practices</strong> — End-to-end testing patterns</li>
            </ul>
        </>
    )
}
