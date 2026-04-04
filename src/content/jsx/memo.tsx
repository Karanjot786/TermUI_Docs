export function JsxMemo() {
    return (
        <>
            <h1>memo() and Batched Updates</h1>
            <p>
                Two performance tools that often go together: <code>memo()</code> skips
                re-rendering a component when its props haven't changed, and{' '}
                <strong>batched state updates</strong> collapse multiple{' '}
                <code>setState</code> calls into a single render cycle.
            </p>
            <p>
                In most terminal apps these go unnoticed — the framework is fast. But when
                you're rendering large lists, running data refreshes every second, or
                building deeply-nested component trees, they make a measurable difference.
            </p>

            <h2 id="memo">memo()</h2>
            <p>
                Wraps a component so it only re-renders when its props change. Under the
                hood it keeps a copy of the previous props and does a shallow comparison
                before each render. If nothing changed, the cached output is returned
                immediately.
            </p>
            <pre><code>{`import { memo } from '@termuijs/jsx'

// Basic — shallow prop comparison
const ProcessRow = memo(function ProcessRow({ pid, name, cpu, memory }) {
    return (
        <Box flexDirection="row" gap={2}>
            <Text dim>{pid}</Text>
            <Text>{name}</Text>
            <Text color={cpu > 0.8 ? 'red' : 'green'}>{(cpu * 100).toFixed(1)}%</Text>
            <Text>{memory}</Text>
        </Box>
    )
})`}</code></pre>

            <h3 id="custom-comparison">Custom Comparison</h3>
            <p>
                The second argument lets you supply your own equality check. Return{' '}
                <code>true</code> to skip the re-render, <code>false</code> to re-render.
            </p>
            <pre><code>{`// Only re-render when the item's id changes
// (ignore expensive computed fields)
const ListItem = memo(
    function ListItem({ item }) {
        return <Text>{item.label}</Text>
    },
    (prev, next) => prev.item.id === next.item.id
)

// Skip re-render for expensive chart unless data version bumps
const CpuChart = memo(
    function CpuChart({ dataVersion, data }) {
        return <Sparkline data={data} />
    },
    (prev, next) => prev.dataVersion === next.dataVersion
)`}</code></pre>

            <h3 id="shallow-comparison">How shallow comparison works</h3>
            <p>
                The default comparison uses <code>Object.is</code> on each prop value. This
                means:
            </p>
            <ul>
                <li>Primitives (<code>string</code>, <code>number</code>, <code>boolean</code>) — compared by value ✓</li>
                <li>Objects and arrays — compared by reference (same object = no re-render) ✓</li>
                <li>Inline objects <code>{'{ value: 1 }'}</code> — new reference every render → always re-renders ✗</li>
                <li>Inline arrow functions — same problem ✗</li>
            </ul>
            <pre><code>{`// Bad — new object every render defeats memo
<Gauge options={{ showLabel: true }} />

// Good — stable reference
const GAUGE_OPTS = { showLabel: true }
<Gauge options={GAUGE_OPTS} />

// If dynamic, use useRef or useMemo to stabilize
function Dashboard() {
    const opts = useRef({ showLabel: true }).current
    return <Gauge options={opts} />
}`}</code></pre>

            <h3 id="memo-api">API Reference</h3>
            <table>
                <thead>
                    <tr><th>Argument</th><th>Type</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>component</code></td><td><code>FC&lt;P&gt;</code></td><td>The functional component to memoize</td></tr>
                    <tr><td><code>areEqual</code></td><td><code>(prev: P, next: P) =&gt; boolean</code></td><td>Optional. Return true to skip re-render</td></tr>
                </tbody>
            </table>
            <p>
                <code>memo()</code> returns a new component with a{' '}
                <code>displayName</code> of <code>memo(YourComponent)</code> and an{' '}
                <code>_isMemo: true</code> flag — useful for debugging.
            </p>

            <h2 id="batched-updates">Batched State Updates</h2>
            <p>
                When multiple <code>setState</code> calls happen in the same event handler,
                TermUI batches them into a single re-render using{' '}
                <code>queueMicrotask</code>. This is automatic — you don't opt in, but you
                should understand it to reason about when renders happen.
            </p>
            <pre><code>{`function Dashboard() {
    const [cpu, setCpu] = useState(0)
    const [memory, setMemory] = useState(0)
    const [net, setNet] = useState(0)

    useInterval(() => {
        const stats = getStats()

        // These three setState calls happen in the same tick.
        // Without batching: 3 renders.
        // With batching: 1 render. TermUI batches automatically.
        setCpu(stats.cpu)
        setMemory(stats.memory)
        setNet(stats.net)
    }, 1000)

    return (
        <Box flexDirection="column">
            <Gauge value={cpu} label="CPU" />
            <Gauge value={memory} label="MEM" />
            <Gauge value={net} label="NET" />
        </Box>
    )
}`}</code></pre>

            <h3 id="how-batching-works">How it works</h3>
            <p>
                When any <code>setState</code> is called, TermUI schedules a flush via{' '}
                <code>queueMicrotask</code> rather than running the re-render synchronously.
                Subsequent <code>setState</code> calls within the same microtask queue check
                whether a flush is already scheduled and skip scheduling another one. The
                result: one render per "batch" no matter how many state updates triggered it.
            </p>
            <pre><code>{`// Internal mechanism — simplified
let flushScheduled = false

function scheduleRender() {
    if (!flushScheduled) {
        flushScheduled = true
        queueMicrotask(() => {
            flushScheduled = false
            runRender()    // single render pass
        })
    }
}`}</code></pre>

            <h2 id="combining">Combining memo and Batching</h2>
            <p>
                The two optimizations stack well. Batching reduces how often a component's
                parent re-renders; memo ensures that children only re-render when their
                specific slice of state changed.
            </p>
            <pre><code>{`// Store slice: only update when cpu changes
const useCpuStore = createStore((set) => ({
    cpu: 0,
    memory: 0,
    updateAll: (stats) => set(stats),  // one set call, batched internally
}))

// Each widget only re-renders when its value changes
const CpuGauge = memo(function CpuGauge({ value }) {
    return <Gauge value={value} label="CPU" />
})

const MemGauge = memo(function MemGauge({ value }) {
    return <Gauge value={value} label="MEM" />
})

function Metrics() {
    const cpu = useCpuStore(s => s.cpu)
    const mem = useCpuStore(s => s.memory)

    // updateAll fires once per second.
    // Even if both values changed, each Memo child
    // only re-renders if its own prop changed.
    return (
        <Box flexDirection="column">
            <CpuGauge value={cpu} />
            <MemGauge value={mem} />
        </Box>
    )
}`}</code></pre>

            <h2 id="when-to-use-memo">When to use memo()</h2>
            <p>
                Measure first, optimize second. That said, memo is worth adding when:
            </p>
            <ul>
                <li>The component does non-trivial work per render (e.g., data formatting)</li>
                <li>The component renders inside a high-frequency update loop (e.g., 10 Hz data refresh)</li>
                <li>The component is a list item rendered many times simultaneously</li>
                <li>You can guarantee stable prop references (no inline objects/arrays/functions)</li>
            </ul>
            <p>
                Skip memo for simple, cheap components — the overhead of comparison can
                exceed the savings.
            </p>

            <h2 id="see-also">See Also</h2>
            <ul>
                <li><strong>useState</strong> — Hook fundamentals and update patterns</li>
                <li><strong>@termuijs/store</strong> — Selector-based subscriptions that naturally limit re-renders</li>
                <li><strong>useAsync</strong> — Async data loading without manual state juggling</li>
                <li><strong>VirtualList</strong> — Render 1M rows efficiently by only painting visible items</li>
            </ul>
        </>
    )
}
