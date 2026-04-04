export function DevServerOverview() {
    return (
        <>
            <h1>Dev server and hot reload</h1>
            <p>
                The <code>@termuijs/dev-server</code> package runs your app in a child
                process and automatically restarts it whenever a source file changes. It
                pairs with the <code>dev</code> script in every project created by{' '}
                <code>create-termui-app</code>.
            </p>
            <p>
                Changes are reflected in under 200ms in most cases — the old process exits,
                a fresh one starts, and your terminal is live again.
            </p>

            <h2 id="usage">Usage</h2>
            <pre><code>{`# From a create-termui-app project
npm run dev

# Or directly with the CLI
npx termui-dev --entry src/index.tsx`}</code></pre>

            <h2 id="cli-flags">CLI Flags</h2>
            <table>
                <thead>
                    <tr><th>Flag</th><th>Default</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>--entry &lt;path&gt;</code></td><td>Auto-detected</td><td>Entry file to run (e.g. <code>src/index.tsx</code>)</td></tr>
                    <tr><td><code>--watch &lt;glob&gt;</code></td><td><code>src/**</code></td><td>Files to watch for changes</td></tr>
                    <tr><td><code>--debounce &lt;ms&gt;</code></td><td><code>200</code></td><td>Wait this long after last change before restarting</td></tr>
                </tbody>
            </table>

            <h2 id="auto-entry">Auto entry detection</h2>
            <p>
                If you don't pass <code>--entry</code>, the server looks for these files in
                order:
            </p>
            <pre><code>{`src/index.tsx
src/index.ts
src/main.tsx
src/main.ts
index.tsx
index.ts`}</code></pre>

            <h2 id="how-it-works">How it works</h2>
            <p>
                The dev server uses Node's <code>child_process.fork()</code> to spawn your
                entry file as a separate process with TypeScript support (via{' '}
                <code>--loader tsx</code>). On file change:
            </p>
            <pre><code>{`// Schematic
1. File change detected (debounced 200ms)
2. Send SIGTERM to old process
3. If still alive after 2s → send SIGKILL
4. Fork a new process with the same entry
5. New process starts rendering immediately`}</code></pre>
            <p>
                The child process runs with <code>TERMUI_DEV=1</code> and{' '}
                <code>NODE_ENV=development</code> in its environment — you can check these
                to enable dev-only features like verbose logging.
            </p>

            <h2 id="devtools">DevTools integration</h2>
            <p>
                When the dev server is running, it communicates with the child process over
                IPC. The DevTools panel (if enabled) receives timing metrics and render
                traces from the child without polluting your terminal output.
            </p>
            <pre><code>{`// In your app — check if dev server is present
if (process.env.TERMUI_DEV === '1') {
    // Enable verbose logging, performance overlays, etc.
}`}</code></pre>

            <h2 id="graceful-shutdown">Graceful shutdown</h2>
            <p>
                The dev server handles <code>SIGTERM</code> and <code>SIGINT</code>{' '}
                (Ctrl+C). When it receives one, it first forwards SIGTERM to the child
                process, waits up to 2 seconds, then kills the child if necessary before
                exiting cleanly.
            </p>

            <h2 id="env-vars">Environment variables</h2>
            <table>
                <thead>
                    <tr><th>Variable</th><th>Value</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>TERMUI_DEV</code></td><td><code>"1"</code></td><td>Signals the app is running under the dev server</td></tr>
                    <tr><td><code>NODE_ENV</code></td><td><code>"development"</code></td><td>Standard Node env flag</td></tr>
                </tbody>
            </table>

            <h2 id="see-also">See also</h2>
            <ul>
                <li><strong>create-termui-app</strong> — Scaffold a new project with dev server pre-configured</li>
                <li><strong>Architecture</strong> — How the render pipeline runs inside the child process</li>
            </ul>
        </>
    )
}
