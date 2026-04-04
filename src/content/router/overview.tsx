export function RouterOverview() {
    return (
        <>
            <h1>Router</h1>
            <p><code>@termuijs/router</code> gives your terminal app screen-based navigation with a history stack, dynamic parameters, and event hooks.</p>

            <h2 id="installation">Installation</h2>
            <pre><code>{`npm install @termuijs/router`}</code></pre>

            <h2 id="setup">Setting up routes</h2>
            <p>Register routes with <code>addRoute()</code>. Each route maps a path pattern to a component loader:</p>
            <pre><code>{`import { Router } from '@termuijs/router'

const router = new Router({ initialPath: '/' })

router.addRoute('/',          () => HomeScreen)
router.addRoute('/settings',  () => SettingsScreen)
router.addRoute('/users/[id]', () => UserScreen)

// Or register several at once
router.addRoutes([
    { path: '/logs',        component: () => LogScreen },
    { path: '/logs/[...slug]', component: () => LogDetail },
])`}</code></pre>

            <h2 id="navigation">Navigating</h2>
            <pre><code>{`// Push a new route onto the history stack
router.push('/settings')
console.log(router.currentPath)  // → '/settings'

// Push a dynamic route
router.push('/users/42')
console.log(router.current)
// → { route: ..., params: { id: '42' } }

// Go back
router.back()
console.log(router.currentPath)  // → '/settings'

// Replace — swaps the current entry without growing history
router.replace('/help')
console.log(router.historyLength)  // same as before`}</code></pre>

            <h2 id="dynamic-params">Dynamic parameters</h2>
            <p>Use bracket syntax for dynamic segments. This is the same convention as Next.js file-based routing:</p>
            <table>
                <thead><tr><th>Pattern</th><th>Matches</th><th>Params</th></tr></thead>
                <tbody>
                    <tr><td><code>/users/[id]</code></td><td><code>/users/42</code></td><td><code>{`{ id: '42' }`}</code></td></tr>
                    <tr><td><code>/[...slug]</code></td><td><code>/a/b/c</code></td><td><code>{`{ slug: 'a/b/c' }`}</code></td></tr>
                    <tr><td><code>/settings</code></td><td><code>/settings</code></td><td><code>{`{}`}</code></td></tr>
                </tbody>
            </table>

            <h2 id="events">Listening for route changes</h2>
            <p>The router has an <code>events</code> emitter you can subscribe to:</p>
            <pre><code>{`router.events.on('navigate', (match) => {
    console.log('Navigated to', match.route.path)
    console.log('Params:', match.params)
})

router.events.on('back', (match) => {
    console.log('Went back to', match?.route.path)
})`}</code></pre>

            <h2 id="api">API reference</h2>
            <table>
                <thead><tr><th>Method / Property</th><th>Description</th></tr></thead>
                <tbody>
                    <tr><td><code>addRoute(path, component, layout?)</code></td><td>Register a single route</td></tr>
                    <tr><td><code>addRoutes(routes)</code></td><td>Register multiple routes at once</td></tr>
                    <tr><td><code>push(path)</code></td><td>Navigate to a new path</td></tr>
                    <tr><td><code>replace(path)</code></td><td>Replace the current history entry</td></tr>
                    <tr><td><code>back()</code></td><td>Go to the previous path</td></tr>
                    <tr><td><code>currentPath</code></td><td>The current path string</td></tr>
                    <tr><td><code>current</code></td><td>The current <code>RouteMatch</code> (route + params), or null</td></tr>
                    <tr><td><code>historyLength</code></td><td>Number of entries in the history stack</td></tr>
                    <tr><td><code>canGoBack</code></td><td>Whether there's a previous entry to go back to</td></tr>
                </tbody>
            </table>
        </>
    )
}
