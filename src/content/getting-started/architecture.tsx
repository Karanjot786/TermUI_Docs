export function GettingStartedArchitecture() {
    return (
        <>
            <h1>Architecture</h1>
            <p>
                TermUI is a monorepo with 13 packages. Each one does one thing and can be
                used on its own or combined with the others. Dependencies flow downward —
                nothing in the core layer imports from the layers above it.
            </p>

            <h2 id="package-graph">Package dependency graph</h2>
            <p>
                Four layers, each building on the one below:
            </p>
            <pre><code>{`
┌──────────────────────────────────────────────────────────────────┐
│                       Application Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ @termuijs/ui │  │@termuijs/quick│  │  create-termui-app   │   │
│  └──────┬───────┘  └──────┬───────┘  └──────────────────────┘   │
├─────────┴─────────────────┴──────────────────────────────────────┤
│                       Component Layer                             │
│  ┌────────────────────┐  ┌────────────────┐  ┌───────────────┐  │
│  │ @termuijs/widgets  │  │ @termuijs/jsx   │  │@termuijs/store│  │
│  └──────────┬─────────┘  └───────┬────────┘  └───────┬───────┘  │
│                                  │                    │           │
│  ┌───────────────────────────────────────────────┐   │           │
│  │              @termuijs/testing                 │◀──┘           │
│  └───────────────────────────────────────────────┘               │
├──────────────────────────────────────────────────────────────────┤
│                       Feature Layer                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │@termuijs/tss │  │@termuijs/router│ │  @termuijs/motion    │   │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────────┘   │
├─────────┴─────────────────┴───────────────────┴─────────────────┤
│                       Core Layer                                  │
│  ┌──────────────────────────┐  ┌────────────────────────────┐   │
│  │      @termuijs/core       │  │      @termuijs/data          │  │
│  │  Screen · Input · Events ·│  │  CPU · Memory · Disk ·       │  │
│  │  Layout · Style · App     │  │  Network · Processes         │  │
│  └──────────────────────────┘  └────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘`}</code></pre>

            <h2 id="render-pipeline">Render pipeline</h2>
            <p>Every frame follows this path:</p>
            <pre><code>{`
  State Change (widget dirty flag / store update)
       │
       ▼
  ┌──────────┐    ┌──────────────┐    ┌───────────────────┐
  │  Layout  │ ──▶│ Style Resolve│ ──▶│  Screen Buffer     │
  │  Engine  │    │ (TSS vars)   │    │  Diff (prev→next)  │
  └──────────┘    └──────────────┘    └────────┬──────────┘
                                               │
                                               ▼
                                        ┌──────────────┐
                                        │  Flush to    │
                                        │  stdout      │
                                        └──────────────┘`}</code></pre>

            <h3 id="layout-phase">Layout</h3>
            <p>
                The layout engine computes positions and sizes using a flexbox algorithm.
                It handles <code>flexDirection</code>, <code>flexGrow</code>,{' '}
                <code>padding</code>, <code>margin</code>, <code>gap</code>, and alignment.
                All computed values are rounded to integers since terminal cells are discrete.
            </p>

            <h3 id="style-phase">Style resolution</h3>
            <p>
                TSS variables and selectors are resolved. The theme engine substitutes{' '}
                <code>var(--name)</code> references and matches selectors against widget types
                and pseudo-classes like <code>:focus</code>.
            </p>

            <h3 id="diff-phase">Buffer diff</h3>
            <p>
                The screen holds two buffers. The renderer diffs them cell by cell and
                only writes changed cells to stdout. A full-screen update that touches
                3 cells writes exactly 3 escape sequences.
            </p>

            <h2 id="event-flow">Event flow</h2>
            <pre><code>{`
  Raw stdin bytes
       │
       ▼
  ┌──────────────┐    ┌──────────────┐    ┌────────────────────┐
  │ InputParser  │ ──▶│ EventEmitter │ ──▶│ Widget key handlers │
  │ (decode)     │    │ (bubble up)  │    │ + app-level events  │
  └──────────────┘    └──────────────┘    └────────────────────┘`}</code></pre>
            <p>
                <code>InputParser</code> decodes raw bytes into <code>KeyEvent</code>{' '}
                objects with key name, modifiers, and raw bytes. Events bubble from the
                focused widget up through its parents to the app level.
            </p>

            <h2 id="state-management-architecture">State management</h2>
            <p>Three levels of state, each suited to different situations:</p>
            <table>
                <thead>
                    <tr><th>Level</th><th>API</th><th>Good for</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Local</td>
                        <td><code>useState</code></td>
                        <td>State inside one component (cursor position, open/closed)</td>
                    </tr>
                    <tr>
                        <td>Shared config</td>
                        <td><code>createContext</code></td>
                        <td>Data that rarely changes and many components need (theme, user)</td>
                    </tr>
                    <tr>
                        <td>Global reactive</td>
                        <td><code>createStore</code></td>
                        <td>Data that updates often and multiple components select from</td>
                    </tr>
                </tbody>
            </table>

            <h2 id="dev-server-architecture">Dev server</h2>
            <p>
                The dev server runs your entry file in a child process via{' '}
                <code>child_process.fork()</code>. When a source file changes, it kills the
                old process and spawns a fresh one. Clean slate on every reload, no stale
                module cache.
            </p>
            <pre><code>{`
  File change
       │
       ▼ (debounced 200ms)
  ┌──────────────────┐    ┌──────────────────────────┐
  │  FileWatcher     │ ──▶│  DevServer               │
  │  (fs.watch)      │    │  SIGTERM old process      │
  └──────────────────┘    │  fork() new process       │
                           └──────────────────────────┘`}</code></pre>
        </>
    )
}
