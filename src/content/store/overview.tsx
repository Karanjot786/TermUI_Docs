export function StoreOverview() {
    return (
        <>
            <h1>@termuijs/store</h1>
            <p>
                Global state for terminal apps. The idea is borrowed from Zustand: you
                create a store with a creator function, subscribe to slices in your
                components, and update from anywhere. No context wrappers. No prop
                chains.
            </p>
            <p>
                The performance model is simple. Each component picks the slice it
                cares about. When something else in the store updates, that component
                doesn't re-render. Ten components sharing a store won't cause ten
                re-renders unless they're all reading the same field.
            </p>

            <h2 id="installation">Installation</h2>
            <pre><code>{`npm install @termuijs/store`}</code></pre>

            <h2 id="quick-example">Quick example</h2>
            <pre><code>{`import { createStore } from '@termuijs/store'
import { useInput } from '@termuijs/jsx'
import { Box, Text } from '@termuijs/widgets'

// 1. Create the store outside any component
const useCounter = createStore((set) => ({
    count: 0,
    increment: () => set((s) => ({ count: s.count + 1 })),
    decrement: () => set((s) => ({ count: s.count - 1 })),
    reset:     () => set({ count: 0 }),
}))

// 2. Use it in a component with a selector
function Counter() {
    const count     = useCounter((s) => s.count)
    const increment = useCounter((s) => s.increment)
    const decrement = useCounter((s) => s.decrement)

    useInput((key) => {
        if (key === 'up')   increment()
        if (key === 'down') decrement()
        if (key === 'r')    useCounter.getState().reset()
    })

    return (
        <Box border="round" padding={1}>
            <Text bold>Count: {count}</Text>
            <Text dim>↑ up  ↓ down  r reset</Text>
        </Box>
    )
}`}</code></pre>

            <h2 id="createstore">createStore(creator)</h2>
            <p>
                The <code>creator</code> function receives <code>set</code> and{' '}
                <code>get</code> and returns your initial state object, actions
                included.
            </p>
            <pre><code>{`const useAppStore = createStore((set, get) => ({
    // State fields
    todos:  [] as string[],
    filter: 'all' as 'all' | 'done' | 'active',

    // Actions
    addTodo:  (text: string) => set((s) => ({ todos: [...s.todos, text] })),
    setFilter: (filter: string) => set({ filter }),

    // Derived — using get() to read current state inside an action
    get activeTodos() {
        return get().todos.filter((_, i) => !get().done[i])
    },
}))`}</code></pre>

            <h3 id="set"><code>set(partial)</code></h3>
            <p>
                Merges partial state. Pass an object for simple overwrites, or an
                updater function when the new value depends on the old one:
            </p>
            <pre><code>{`// Object form — merges these keys
set({ filter: 'done' })

// Updater form — safe when you need the previous value
set((state) => ({ count: state.count + 1 }))
set((state) => ({ todos: [...state.todos, newTodo] }))`}</code></pre>

            <h3 id="get"><code>get()</code></h3>
            <p>
                Reads state synchronously. Useful inside async actions where the
                state may have changed between <code>await</code> calls:
            </p>
            <pre><code>{`const useNetStore = createStore((set, get) => ({
    logs: [] as string[],
    endpoint: '',

    fetchLogs: async () => {
        const { endpoint } = get()   // read current endpoint
        const data = await fetch(endpoint).then(r => r.json())
        set({ logs: data })
    },
}))`}</code></pre>

            <h2 id="selectors">Selectors</h2>
            <p>
                Pass a function to pick out the piece of state you need. Your
                component re-renders only when that piece changes.
            </p>
            <pre><code>{`// Read one field
const count  = useCounter((s) => s.count)
const filter = useAppStore((s) => s.filter)

// Derive a value inline
const activeTodos = useTodoStore((s) =>
    s.todos.filter((t) => !t.done)
)

// Read everything (re-renders on any change — use sparingly)
const { count, increment } = useCounter()`}</code></pre>
            <p>
                Watch out for selectors that create a new object every call (mapping
                an array, for example). They'll trigger a re-render every time
                because the reference is always different. Either store the derived
                value in state or wrap the component in <code>memo()</code>.
            </p>

            <h2 id="outside-components">Reading and writing outside components</h2>
            <p>
                <code>createStore</code> attaches <code>getState</code>,{' '}
                <code>setState</code>, <code>subscribe</code>, and <code>destroy</code>{' '}
                directly to the hook. You don't need to be inside a component:
            </p>
            <pre><code>{`// One-off read
const current = useCounter.getState()
console.log('count:', current.count)

// Update from a timer or event handler
setInterval(() => {
    useNetStore.setState((s) => ({ requestCount: s.requestCount + 1 }))
}, 5000)

// Subscribe without JSX
const unsub = useCounter.subscribe((state, prev) => {
    if (state.count !== prev.count) {
        console.log('count changed:', state.count)
    }
})
// later:
unsub()`}</code></pre>

            <h2 id="async-actions">Async actions</h2>
            <p>
                Actions are plain functions. Use <code>async/await</code> like you
                would anywhere else:
            </p>
            <pre><code>{`const useDataStore = createStore((set, get) => ({
    items: [] as Item[],
    loading: false,
    error: null as string | null,

    fetch: async () => {
        set({ loading: true, error: null })
        try {
            const items = await fetchItems()
            set({ items, loading: false })
        } catch (err) {
            set({ error: (err as Error).message, loading: false })
        }
    },
}))

// In a component:
function ItemList() {
    const { items, loading, error, fetch } = useDataStore()

    useEffect(() => { fetch() }, [])

    if (loading) return <Spinner />
    if (error)   return <Text color="red">{error}</Text>
    return <List items={items} renderItem={(item) => item.name} />
}`}</code></pre>

            <h2 id="splitting-stores">Multiple stores</h2>
            <p>
                There's no "one store" rule. Create as many as your app needs. Each
                one stays focused, re-renders stay minimal.
            </p>
            <pre><code>{`export const useThemeStore = createStore((set) => ({
    dark: true,
    toggle: () => set((s) => ({ dark: !s.dark })),
}))

export const useNavStore = createStore((set) => ({
    activeTab: 0,
    setTab: (i: number) => set({ activeTab: i }),
}))

export const useDataStore = createStore((set, get) => ({
    records: [] as Record[],
    load: async () => { /* ... */ },
}))`}</code></pre>

            <h2 id="typescript">TypeScript</h2>
            <p>
                Types are inferred from the creator function. You don't need to
                annotate anything:
            </p>
            <pre><code>{`const useCounter = createStore((set) => ({
    count: 0,
    increment: () => set((s) => ({ count: s.count + 1 })),
}))

const count: number         = useCounter((s) => s.count)
const inc: () => void       = useCounter((s) => s.increment)
const state: { count: number; increment: () => void } = useCounter.getState()`}</code></pre>

            <h2 id="api-reference">Full reference</h2>
            <table>
                <thead>
                    <tr><th>Method</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>createStore(creator)</code></td><td>Create a store. Returns a hook with selector support.</td></tr>
                    <tr><td><code>useStore()</code></td><td>Subscribe to the full state</td></tr>
                    <tr><td><code>useStore(selector)</code></td><td>Subscribe to a derived slice</td></tr>
                    <tr><td><code>useStore.getState()</code></td><td>Read state without subscribing</td></tr>
                    <tr><td><code>useStore.setState(partial)</code></td><td>Update state from outside a component</td></tr>
                    <tr><td><code>useStore.subscribe(listener)</code></td><td>Listen for changes — returns an unsubscribe function</td></tr>
                    <tr><td><code>useStore.destroy()</code></td><td>Remove all subscribers (call this in test cleanup)</td></tr>
                </tbody>
            </table>

            <h2 id="vs-usestate">When to use store vs useState</h2>
            <table>
                <thead>
                    <tr><th>useState</th><th>createStore</th></tr>
                </thead>
                <tbody>
                    <tr><td>Local UI state (open/closed, cursor position)</td><td>State shared across many components</td></tr>
                    <tr><td>Lives inside one component</td><td>Global settings (theme, auth, config)</td></tr>
                    <tr><td>Not needed outside the component</td><td>Updated from outside JSX (timers, events)</td></tr>
                    <tr><td>Transient state cleared on unmount</td><td>State that persists across route changes</td></tr>
                </tbody>
            </table>

            <h2 id="see-also">See also</h2>
            <ul>
                <li><strong>Context API</strong> — Share config that rarely changes</li>
                <li><strong>useAsync</strong> — Async data loading in individual components</li>
                <li><strong>memo()</strong> — Prevent re-renders when store selectors return stable values</li>
            </ul>
        </>
    )
}
