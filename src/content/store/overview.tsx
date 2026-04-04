export function StoreOverview() {
    return (
        <>
            <h1>@termuijs/store</h1>
            <p>
                Global state management for terminal apps. The API mirrors Zustand — create
                a store with a creator function, subscribe to slices of it in your
                components, and update state from anywhere. No context, no prop drilling, no
                boilerplate.
            </p>
            <p>
                Each component only re-renders when the specific slice it reads actually
                changes. If ten components share a store and one field updates, only the
                components that selected that field re-render.
            </p>

            <h2 id="installation">Installation</h2>
            <pre><code>{`npm install @termuijs/store`}</code></pre>

            <h2 id="quick-example">Quick Example</h2>
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
                Defines your state shape and the actions that update it. The{' '}
                <code>creator</code> function receives <code>set</code> and <code>get</code>{' '}
                and must return the initial state object.
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
                Merges partial state. Accepts an object or an updater function (for reads
                that depend on the previous state):
            </p>
            <pre><code>{`// Object — overwrites matching keys
set({ filter: 'done' })

// Updater — safe for state that depends on previous values
set((state) => ({ count: state.count + 1 }))
set((state) => ({ todos: [...state.todos, newTodo] }))`}</code></pre>

            <h3 id="get"><code>get()</code></h3>
            <p>
                Reads the current state synchronously. Useful inside async actions:
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
                Pass a selector to read a specific slice of state. Only your component
                re-renders when that slice changes — other components watching different
                slices are unaffected.
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
                Selectors that return a new object on every call (e.g., mapping an array
                inline) will always trigger a re-render. For derived arrays, either store
                the derived value in state or use <code>memo()</code> on the component.
            </p>

            <h2 id="outside-components">Accessing State Outside Components</h2>
            <p>
                <code>createStore</code> attaches <code>getState</code>,{' '}
                <code>setState</code>, <code>subscribe</code>, and <code>destroy</code>{' '}
                directly to the hook — no hooks rules required.
            </p>
            <pre><code>{`// One-off read without subscribing
const current = useCounter.getState()
console.log('count:', current.count)

// Update from outside a component (e.g., in a timer)
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

            <h2 id="async-actions">Async Actions</h2>
            <p>
                Actions are plain functions — just use <code>async/await</code>:
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

            <h2 id="splitting-stores">Splitting Into Multiple Stores</h2>
            <p>
                There's no global store required. Create as many focused stores as your
                app needs. Splitting avoids unnecessary re-renders and keeps logic cohesive:
            </p>
            <pre><code>{`// Focus each store on one domain
export const useThemeStore = createStore((set) => ({
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
                Full type inference — the state shape and all selector return types are
                inferred from the creator function. No manual type annotations required:
            </p>
            <pre><code>{`// All types are inferred
const useCounter = createStore((set) => ({
    count: 0,
    increment: () => set((s) => ({ count: s.count + 1 })),
}))

const count: number         = useCounter((s) => s.count)
const inc: () => void       = useCounter((s) => s.increment)
const state: { count: number; increment: () => void } = useCounter.getState()`}</code></pre>

            <h2 id="api-reference">API Reference</h2>
            <table>
                <thead>
                    <tr><th>API</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>createStore(creator)</code></td><td>Create a store. Returns a hook with selector support.</td></tr>
                    <tr><td><code>useStore()</code></td><td>Subscribe to the full state</td></tr>
                    <tr><td><code>useStore(selector)</code></td><td>Subscribe to a derived slice</td></tr>
                    <tr><td><code>useStore.getState()</code></td><td>Read state synchronously (outside components)</td></tr>
                    <tr><td><code>useStore.setState(partial)</code></td><td>Update state (outside components)</td></tr>
                    <tr><td><code>useStore.subscribe(listener)</code></td><td>External subscriber — returns unsubscribe fn</td></tr>
                    <tr><td><code>useStore.destroy()</code></td><td>Remove all subscribers (useful in tests)</td></tr>
                </tbody>
            </table>

            <h2 id="vs-usestate">When to use Store vs useState</h2>
            <table>
                <thead>
                    <tr><th>Use <code>useState</code> for</th><th>Use <code>createStore</code> for</th></tr>
                </thead>
                <tbody>
                    <tr><td>Local UI state (open/closed, cursor position)</td><td>State shared across many components</td></tr>
                    <tr><td>State that lives inside one component</td><td>Global settings (theme, auth, config)</td></tr>
                    <tr><td>Values that aren't needed outside the component</td><td>State updated from outside JSX (timers, events)</td></tr>
                    <tr><td>Transient state cleared on unmount</td><td>State that persists across route changes</td></tr>
                </tbody>
            </table>

            <h2 id="see-also">See Also</h2>
            <ul>
                <li><strong>Context API</strong> — Share config that rarely changes without a store</li>
                <li><strong>useAsync</strong> — Async data loading in individual components</li>
                <li><strong>memo()</strong> — Prevent re-renders when store selectors return stable values</li>
            </ul>
        </>
    )
}
