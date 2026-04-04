export function JsxUseAsync() {
    return (
        <>
            <h1>useAsync</h1>
            <p>
                Load async data inside a component without writing the
                loading/error/data state yourself. <code>useAsync</code> fires
                the request when deps change, tracks loading state, stores the
                result, and cancels stale requests if a newer one comes in.
            </p>
            <p>
                Think of it as a built-in <code>useQuery</code> for one-shot
                fetches. No external library needed.
            </p>

            <h2 id="installation">Installation</h2>
            <pre><code>{`npm install @termuijs/jsx`}</code></pre>

            <h2 id="basic-usage">Basic Usage</h2>
            <pre><code>{`import { useAsync } from '@termuijs/jsx'
import { Box, Text, Spinner } from '@termuijs/widgets'

function ProcessList() {
    const { data, loading, error, refetch } = useAsync(
        () => fetchProcesses(),
        []   // deps — empty means run once on mount
    )

    if (loading) return <Spinner label="Loading processes..." />
    if (error)   return <Text color="red">Error: {error.message}</Text>

    return (
        <Box flexDirection="column">
            {data.map((p) => (
                <Text key={p.pid}>{p.name} — {p.cpu}%</Text>
            ))}
        </Box>
    )
}`}</code></pre>

            <h2 id="return-value">Return Value</h2>
            <table>
                <thead>
                    <tr><th>Field</th><th>Type</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>data</code></td><td><code>T | null</code></td><td>Resolved value, or null while loading</td></tr>
                    <tr><td><code>loading</code></td><td><code>boolean</code></td><td>True from call until resolve/reject</td></tr>
                    <tr><td><code>error</code></td><td><code>Error | null</code></td><td>Set if the async function threw</td></tr>
                    <tr><td><code>refetch</code></td><td><code>() =&gt; void</code></td><td>Manually trigger a new fetch</td></tr>
                </tbody>
            </table>

            <h2 id="deps">Dependencies</h2>
            <p>
                The second argument is a dependency array — same semantics as{' '}
                <code>useEffect</code>. The async function re-runs whenever any dep changes.
            </p>
            <pre><code>{`function FileViewer({ path }) {
    // Re-loads whenever path changes
    const { data: content, loading } = useAsync(
        () => readFile(path),
        [path]
    )

    return loading
        ? <Spinner />
        : <Text>{content}</Text>
}`}</code></pre>

            <h2 id="stale-request-prevention">Stale Request Prevention</h2>
            <p>
                <code>useAsync</code> uses an internal version counter. If deps change
                before the previous request finishes, the older response is silently
                discarded — only the latest request updates state. This prevents race
                conditions when users navigate quickly.
            </p>
            <pre><code>{`// Deps change rapidly — only the last response wins
function LogViewer({ filter }) {
    const { data: logs } = useAsync(
        () => searchLogs(filter),   // could be slow
        [filter]                     // changes as user types
    )
    // "loading" stays true until the current filter's request resolves.
    // Older, slower responses are thrown away.
}`}</code></pre>

            <h2 id="manual-refetch">Manual Refetch</h2>
            <p>
                Bind a key to <code>refetch</code> for refresh-on-demand:
            </p>
            <pre><code>{`function Dashboard() {
    const { data, loading, refetch } = useAsync(fetchMetrics, [])

    useInput((key) => {
        if (key === 'r') refetch()
    })

    return (
        <Box>
            {loading && <Spinner />}
            <Text dim>Press r to refresh</Text>
            {data && <MetricsPanel data={data} />}
        </Box>
    )
}`}</code></pre>

            <h2 id="polling">Polling (Auto-Refresh)</h2>
            <p>
                Combine <code>useAsync</code> with <code>useInterval</code> to poll at a
                fixed rate:
            </p>
            <pre><code>{`function LiveMetrics() {
    const { data, loading, refetch } = useAsync(fetchMetrics, [])

    // Re-fetch every 2 seconds
    useInterval(refetch, 2000)

    return (
        <Box flexDirection="column">
            <Text dim>Updates every 2s {loading && '(refreshing...)'}</Text>
            {data && <MetricsPanel data={data} />}
        </Box>
    )
}`}</code></pre>

            <h2 id="error-handling">Error Handling</h2>
            <p>
                Any exception thrown inside the async function is caught and exposed as
                <code>error</code>. You can display it and offer a retry:
            </p>
            <pre><code>{`function DataPanel() {
    const { data, loading, error, refetch } = useAsync(
        async () => {
            const res = await fetchData()
            if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
            return res.json()
        },
        []
    )

    if (loading) return <Spinner label="Loading..." />
    if (error) {
        return (
            <Box flexDirection="column" gap={1}>
                <Text color="red">Failed: {error.message}</Text>
                <Text dim>Press r to retry</Text>
            </Box>
        )
    }

    return <DataView data={data} />
}`}</code></pre>

            <h2 id="typescript">TypeScript</h2>
            <p>
                The return type is inferred from the async function's resolved value.
                No explicit generics needed in most cases:
            </p>
            <pre><code>{`// Inferred: AsyncResult<Process[]>
const { data } = useAsync(() => fetchProcesses(), [])
//    data is Process[] | null

// Explicit if needed
const { data } = useAsync<Config>(() => loadConfig(), [])
//    data is Config | null`}</code></pre>

            <h2 id="how-it-works">How It Works</h2>
            <p>
                Internally <code>useAsync</code> uses <code>useState</code> for the three
                state fields and <code>useEffect</code> to fire the async function when deps
                change. A version counter ensures older responses are discarded if a newer
                request completes first.
            </p>
            <pre><code>{`// Simplified internals
function useAsync(fn, deps) {
    const [state, setState] = useState({ data: null, loading: true, error: null })
    const version = useRef(0)

    function run() {
        const myVersion = ++version.current
        setState(s => ({ ...s, loading: true, error: null }))
        fn().then(data => {
            if (version.current === myVersion)
                setState({ data, loading: false, error: null })
        }).catch(error => {
            if (version.current === myVersion)
                setState({ data: null, loading: false, error })
        })
    }

    useEffect(run, deps)
    return { ...state, refetch: run }
}`}</code></pre>

            <h2 id="see-also">See also</h2>
            <ul>
                <li><strong>useEffect</strong> — The hook useAsync builds on</li>
                <li><strong>useInterval</strong> — Combine with useAsync for polling</li>
                <li><strong>@termuijs/data</strong> — Reactive data streams for continuous updates</li>
                <li><strong>@termuijs/store</strong> — Global state for shared async results</li>
            </ul>
        </>
    )
}
