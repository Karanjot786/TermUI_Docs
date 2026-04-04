export function CoreEventEmitter() {
    return (
        <>
            <h1>Event emitter</h1>
            <p>A generic, type-safe publish/subscribe system. The App, Router, and individual widgets all use it internally, and you can create your own for custom events.</p>

            <h2 id="usage">Usage</h2>
            <pre><code>{`import { EventEmitter } from '@termuijs/core'

type MyEvents = {
    data: { value: number }
    error: string
}

const emitter = new EventEmitter<MyEvents>()

// Subscribe — returns an unsubscribe function
const unsub = emitter.on('data', (payload) => {
    console.log('Got:', payload.value)
})

// Fire once only
emitter.once('error', (msg) => console.error(msg))

// Emit
emitter.emit('data', { value: 42 })

// Clean up
unsub()`}</code></pre>

            <h2 id="api">API</h2>
            <table>
                <thead><tr><th>Method</th><th>Params</th><th>Returns</th><th>What it does</th></tr></thead>
                <tbody>
                    <tr><td><code>on(event, handler)</code></td><td>event name, callback</td><td><code>() =&gt; void</code></td><td>Subscribe. Returns unsubscribe function.</td></tr>
                    <tr><td><code>once(event, handler)</code></td><td>event name, callback</td><td><code>() =&gt; void</code></td><td>Subscribe for one emission, then auto-removes.</td></tr>
                    <tr><td><code>emit(event, data)</code></td><td>event name, payload</td><td><code>void</code></td><td>Fire the event to all current subscribers.</td></tr>
                    <tr><td><code>removeAll(event?)</code></td><td>optional event name</td><td><code>void</code></td><td>Remove all handlers for one event, or all events if no name given.</td></tr>
                </tbody>
            </table>
        </>
    )
}
