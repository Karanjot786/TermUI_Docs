export function TssOverview() {
    return (
        <>
            <h1>TSS — Terminal Style Sheets</h1>
            <p><code>@termuijs/tss</code> brings CSS-like theming to terminal apps. Define variables in named themes, write selectors with pseudo-classes, and swap themes at runtime without restarting the app.</p>

            <h2 id="installation">Installation</h2>
            <pre><code>{`npm install @termuijs/tss`}</code></pre>

            <h2 id="syntax">Syntax</h2>
            <p>TSS files look like CSS but target terminal widgets instead of HTML elements:</p>
            <pre><code>{`@theme default {
  --primary: #00ff88;
  --bg: #0a0a0f;
  --text: #e8e8f0;
  --border: #2a2a45;
}

.container {
  border-color: var(--border);
  padding: 1;
}

.container:focused {
  border-color: var(--primary);
}`}</code></pre>

            <h2 id="selector-syntax">Selector syntax</h2>
            <p>TSS supports a subset of CSS selectors adapted for terminal widget trees:</p>
            <table>
                <thead><tr><th>Selector</th><th>Matches</th></tr></thead>
                <tbody>
                    <tr><td><code>.name</code></td><td>Widget with <code>className="name"</code></td></tr>
                    <tr><td><code>Box</code></td><td>All Box widget instances</td></tr>
                    <tr><td><code>Box {'>'} Text</code></td><td>Text that is a direct child of Box</td></tr>
                    <tr><td><code>.panel Text</code></td><td>Text anywhere inside <code>.panel</code></td></tr>
                    <tr><td><code>.btn:hover</code></td><td>Widget in hover state</td></tr>
                    <tr><td><code>.btn:focused</code></td><td>Widget with keyboard focus</td></tr>
                    <tr><td><code>.btn:disabled</code></td><td>Widget with <code>disabled: true</code></td></tr>
                    <tr><td><code>.btn:active</code></td><td>Widget being pressed</td></tr>
                </tbody>
            </table>
            <p>Pseudo-class states are passed as the second argument to <code>resolveStyle()</code>:</p>
            <pre><code>{`engine.resolveStyle('.btn', { focused: true, hover: false })
// → { borderColor: '#00ff88', ... }`}</code></pre>

            <h2 id="color-formats">Color formats</h2>
            <p>TSS accepts any terminal-compatible color notation:</p>
            <pre><code>{`@theme custom {
  --a: #00ff88;           /* hex */
  --b: rgb(0, 255, 136);  /* rgb() */
  --c: green;             /* ANSI named color */
  --d: 46;                /* 256-color index */
}`}</code></pre>
            <p>Named colors map to ANSI 16-color codes. The terminal renderer picks the closest match when the terminal doesn't support truecolor.</p>

            <h2 id="theme-engine">ThemeEngine</h2>
            <pre><code>{`import { ThemeEngine } from '@termuijs/tss'

const engine = new ThemeEngine()

// Load from a TSS string
engine.load(tssString)

// Or load multiple sources at once
engine.loadAll([baseTheme, customOverrides])

// Switch the active theme
engine.setTheme('cyberpunk')

// Read a variable
engine.getVariable('--primary')  // → '#ff00ff'

// Resolve styles for a selector
const styles = engine.resolveStyle('.container', { focused: true })
// → { borderColor: '#ff00ff', padding: 1 }

// Apply resolved styles to a widget
widget.applyStyles(styles)

// React to theme changes
engine.onChange(() => {
    // re-resolve and re-apply styles here
    widget.applyStyles(engine.resolveStyle('.container'))
    app.requestRender()
})`}</code></pre>

            <h2 id="error-handling">Error handling</h2>
            <p>TSS is forgiving by design — unknown selectors and missing variables degrade gracefully:</p>
            <ul>
                <li>A selector that matches no widget simply produces an empty style object — no error is thrown.</li>
                <li>A <code>var(--unknown)</code> reference resolves to <code>undefined</code>. The property is omitted from the resolved style object.</li>
                <li>If <code>setTheme(name)</code> is called with a name that doesn't exist, the engine keeps the previous theme active and emits a warning to stderr.</li>
                <li>Parse errors in a <code>load()</code> call throw a <code>TSSParseError</code> with a line number and message. Subsequent <code>load()</code> calls continue to work.</li>
            </ul>
            <pre><code>{`try {
    engine.load(userTSSInput)
} catch (err) {
    if (err instanceof TSSParseError) {
        console.error('Theme parse error on line', err.line, ':', err.message)
    }
}`}</code></pre>

            <h2 id="built-in-themes">Built-in themes</h2>
            <p>Six themes ship with the package. Load them from <code>BUILTIN_THEMES</code>:</p>
            <pre><code>{`import { BUILTIN_THEMES } from '@termuijs/tss'

engine.load(BUILTIN_THEMES.default)`}</code></pre>
            <table>
                <thead><tr><th>Theme</th><th>Description</th></tr></thead>
                <tbody>
                    <tr><td><code>default</code></td><td>Dark background with green accents</td></tr>
                    <tr><td><code>cyberpunk</code></td><td>Neon pink and purple on dark</td></tr>
                    <tr><td><code>nord</code></td><td>Arctic, muted blues and grays</td></tr>
                    <tr><td><code>dracula</code></td><td>Dark with pastel accents</td></tr>
                    <tr><td><code>catppuccin</code></td><td>Warm pastel palette</td></tr>
                    <tr><td><code>solarized</code></td><td>Ethan Schoonover's solarized colors</td></tr>
                </tbody>
            </table>

            <h2 id="hot-reload">Hot-reload with TSSWatcher</h2>
            <p>During development, the watcher picks up <code>.tss</code> file changes and reloads automatically:</p>
            <pre><code>{`import { TSSWatcher } from '@termuijs/tss'

const watcher = new TSSWatcher(engine, {
    dir: './themes',
    onReload: (filename) => console.log('Reloaded', filename),
})
watcher.start()`}</code></pre>

            <h2 id="see-also">See also</h2>
            <ul>
                <li><a href="/docs/getting-started/installation">Getting Started — installation and setup</a></li>
                <li><a href="/docs/core/style">Core / Style & Colors — built-in color utilities</a></li>
            </ul>
        </>
    )
}
