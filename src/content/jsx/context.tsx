export function JsxContext() {
    return (
        <>
            <h1>Context API</h1>
            <p>
                Share state across your component tree without threading props
                through every level. Create a context, wrap your tree in a
                Provider, read the value anywhere below it.
            </p>
            <p>
                Under the hood, <code>useContext()</code> walks up the fiber chain
                to find the nearest <code>Provider</code>. No match? It falls back
                to the default value from <code>createContext()</code>.
            </p>

            <h2 id="installation">Installation</h2>
            <pre><code>{`npm install @termuijs/jsx`}</code></pre>

            <h2 id="quick-example">Quick Example</h2>
            <pre><code>{`import { createContext, useContext } from '@termuijs/jsx'

// 1. Create. define shape and default
const ThemeCtx = createContext({ fg: 'white', bg: 'black' })

// 2. Provide. supply a value to the subtree
function App() {
    return (
        <ThemeCtx.Provider value={{ fg: '#00ff88', bg: '#0a0a0f' }}>
            <Dashboard />
        </ThemeCtx.Provider>
    )
}

// 3. Consume. read the nearest value
function StatusBar() {
    const theme = useContext(ThemeCtx)
    return <Text color={theme.fg}>Ready</Text>
}`}</code></pre>

            <h2 id="createcontext">createContext(defaultValue)</h2>
            <p>
                Creates a new Context object. The <code>defaultValue</code> is used when a
                component reads the context outside of any Provider, useful for testing and
                for components that should work standalone.
            </p>
            <pre><code>{`import { createContext } from '@termuijs/jsx'

// Primitive default
const CountCtx = createContext(0)

// Object default
const UserCtx = createContext({ name: 'Guest', role: 'viewer' })

// Nullable. when absence is meaningful
const RouterCtx = createContext<RouterState | null>(null)`}</code></pre>

            <h3 id="return-value">Return value</h3>
            <table>
                <thead>
                    <tr><th>Property</th><th>Type</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>Provider</code></td><td><code>FC&lt;&#123; value: T &#125;&gt;</code></td><td>Wrap your subtree with this component to supply a value</td></tr>
                    <tr><td><code>defaultValue</code></td><td><code>T</code></td><td>The fallback value when no Provider is in scope</td></tr>
                    <tr><td><code>_id</code></td><td><code>symbol</code></td><td>Internal. used by the fiber engine for lookup</td></tr>
                </tbody>
            </table>

            <h2 id="usecontext">useContext(context)</h2>
            <p>
                Reads the value from the nearest Provider ancestor. Must be called inside a
                functional component, same as any other hook.
            </p>
            <pre><code>{`import { useContext } from '@termuijs/jsx'

function StatusBar() {
    const theme = useContext(ThemeCtx)    // reads Provider value
    const user = useContext(UserCtx)      // falls back to defaultValue if no Provider
    
    return (
        <Box>
            <Text color={theme.fg}>{user.name}</Text>
        </Box>
    )
}`}</code></pre>
            <p>
                <strong>Rule:</strong> Like all hooks, <code>useContext</code> must be called
                at the top level of your component, never in a loop or conditional.
            </p>

            <h2 id="provider">Context.Provider</h2>
            <p>
                The <code>Provider</code> component makes a value available to the entire
                subtree it wraps. It takes a single <code>value</code> prop.
            </p>
            <pre><code>{`function App() {
    const [theme, setTheme] = useState(darkTheme)

    return (
        <ThemeCtx.Provider value={theme}>
            <Header />
            <Main>
                <Sidebar />
                <Content />
            </Main>
            <Footer />
        </ThemeCtx.Provider>
    )
}`}</code></pre>

            <h2 id="nested-providers">Nested Providers</h2>
            <p>
                Providers can be nested. The <strong>nearest</strong> one wins. This lets
                you override context for a specific subtree without touching the rest.
            </p>
            <pre><code>{`// Global theme: dark
<ThemeCtx.Provider value={darkTheme}>
    <Header />          {/* reads darkTheme */}

    {/* A single panel with an override */}
    <ThemeCtx.Provider value={lightTheme}>
        <HelpPanel />   {/* reads lightTheme */}
    </ThemeCtx.Provider>

    <Footer />          {/* reads darkTheme again */}
</ThemeCtx.Provider>`}</code></pre>

            <h2 id="multiple-contexts">Multiple Contexts</h2>
            <p>
                Each context is completely independent. Use as many as you need; there's no
                performance penalty for additional contexts.
            </p>
            <pre><code>{`const ThemeCtx = createContext(defaultTheme)
const UserCtx  = createContext<User | null>(null)
const RouterCtx = createContext<RouterState>(defaultRouter)

function App() {
    return (
        <ThemeCtx.Provider value={theme}>
            <UserCtx.Provider value={currentUser}>
                <RouterCtx.Provider value={router}>
                    <Shell />
                </RouterCtx.Provider>
            </UserCtx.Provider>
        </ThemeCtx.Provider>
    )
}`}</code></pre>

            <h2 id="real-world-example">Real-World Example: Theme System</h2>
            <p>
                A common pattern: manage theme switching at the top level, read it deep in
                the tree:
            </p>
            <pre><code>{`import { createContext, useContext, useState } from '@termuijs/jsx'
import { Box, Text } from '@termuijs/widgets'

// ── Types ──
interface Theme {
    primary: string
    bg: string
    border: string
}

const DARK: Theme  = { primary: '#00ff88', bg: '#0a0a0f', border: '#2a2a45' }
const LIGHT: Theme = { primary: '#007a3d', bg: '#f8f8f0', border: '#cccccc' }

// ── Context ──
const ThemeCtx = createContext<Theme>(DARK)

// ── Hook shortcut (optional. cleaner call sites) ──
export function useTheme() {
    return useContext(ThemeCtx)
}

// ── Root ──
function App() {
    const [dark, setDark] = useState(true)
    const theme = dark ? DARK : LIGHT

    return (
        <ThemeCtx.Provider value={theme}>
            <Shell onToggle={() => setDark(d => !d)} />
        </ThemeCtx.Provider>
    )
}

// ── Deep child ──
function Sidebar() {
    const theme = useTheme()   // no props needed
    return (
        <Box border="single" borderColor={theme.border}>
            <Text color={theme.primary}>Navigation</Text>
        </Box>
    )
}`}</code></pre>

            <h2 id="typescript">TypeScript</h2>
            <p>
                Context is fully generic. The type is inferred from the default value, but
                you can be explicit when needed (e.g., nullable types):
            </p>
            <pre><code>{`// Inferred from default
const CountCtx = createContext(0)
// CountCtx is Context<number>

// Explicit generic for nullable
const AuthCtx = createContext<{ token: string } | null>(null)
// AuthCtx is Context<{ token: string } | null>

// Reading a nullable context
function RequiresAuth() {
    const auth = useContext(AuthCtx)
    if (!auth) return <Text color="red">Not authenticated</Text>
    return <Text>Welcome, token: {auth.token}</Text>
}`}</code></pre>

            <h2 id="when-to-use">When to use context</h2>
            <p>
                Context works well when data needs to reach components at many
                different depths. For 1-2 levels of nesting, plain props are
                simpler and easier to trace.
            </p>
            <table>
                <thead>
                    <tr><th>Good fit</th><th>Not ideal</th></tr>
                </thead>
                <tbody>
                    <tr><td>Active theme / color scheme</td><td>Data only used by one child</td></tr>
                    <tr><td>Current authenticated user</td><td>Frequently-updating values (use store)</td></tr>
                    <tr><td>Router state / current route</td><td>Component-local UI state</td></tr>
                    <tr><td>Feature flags or config</td><td>Props that change every render</td></tr>
                </tbody>
            </table>
            <p>
                For global state that updates frequently (like a real-time data feed), reach
                for <strong>@termuijs/store</strong> instead; it has selector-based
                subscriptions that prevent unnecessary re-renders.
            </p>

            <h2 id="see-also">See also</h2>
            <ul>
                <li><strong>@termuijs/store</strong>: Global state with selector subscriptions</li>
                <li><strong>useState</strong>: Component-local state</li>
                <li><strong>memo()</strong>: Skip re-renders when context-derived props haven't changed</li>
            </ul>
        </>
    )
}
