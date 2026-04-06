# TSS: Terminal Style Sheets
`@termuijs/tss` brings CSS-like theming to terminal apps. Define variables in named themes, write selectors with pseudo-classes, and swap themes at runtime without restarting the app.
## Installation
```ts
npm install @termuijs/tss
```
## Syntax
TSS files look like CSS but target terminal widgets instead of HTML elements:
```ts
@theme default {
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
}
```
## Selector syntax
TSS supports a subset of CSS selectors adapted for terminal widget trees:
| Selector         | Matches                            |
| ---------------- | ---------------------------------- |
| `.name`          | Widget with `className="name"`     |
| `Box`            | All Box widget instances           |
| `Box {'>'} Text` | Text that is a direct child of Box |
| `.panel Text`    | Text anywhere inside `.panel`      |
| `.btn:hover`     | Widget in hover state              |
| `.btn:focused`   | Widget with keyboard focus         |
| `.btn:disabled`  | Widget with `disabled: true`       |
| `.btn:active`    | Widget being pressed               |
Pseudo-class states are passed as the second argument to `resolveStyle()`:
```ts
engine.resolveStyle('.btn', { focused: true, hover: false })
// → { borderColor: '#00ff88', ... }
```
## Color formats
TSS accepts any terminal-compatible color notation:
```ts
@theme custom {
  --a: #00ff88;           /* hex */
  --b: rgb(0, 255, 136);  /* rgb() */
  --c: green;             /* ANSI named color */
  --d: 46;                /* 256-color index */
}
```
Named colors map to ANSI 16-color codes. The terminal renderer picks the closest match when the terminal doesn't support truecolor.
## ThemeEngine
```ts

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
})
```
## Error handling
TSS is forgiving by design; unknown selectors and missing variables degrade gracefully:

- A selector that matches no widget produces an empty style object; no error is thrown.- A `var(--unknown)` reference resolves to `undefined`. The property is omitted from the resolved style object.- If `setTheme(name)` is called with a name that doesn't exist, the engine keeps the previous theme active and emits a warning to stderr.- Parse errors in a `load()` call throw a `TSSParseError` with a line number and message.

Subsequent `load()` calls continue to work.
```ts
try {
    engine.load(userTSSInput)
} catch (err) {
    if (err instanceof TSSParseError) {
console.error('Theme parse error on line', err.line, ':', err.message)
    }
}
```
## Built-in themes
Six themes ship with the package. Load them from `BUILTIN_THEMES`:
```ts

engine.load(BUILTIN_THEMES.default)
```
| Theme        | Description                         |
| ------------ | ----------------------------------- |
| `default`    | Dark background with green accents  |
| `cyberpunk`  | Neon pink and purple on dark        |
| `nord`       | Arctic, muted blues and grays       |
| `dracula`    | Dark with pastel accents            |
| `catppuccin` | Warm pastel palette                 |
| `solarized`  | Ethan Schoonover's solarized colors |
## Hot-reload with TSSWatcher
During development, the watcher picks up `.tss` file changes and reloads automatically:
```ts

const watcher = new TSSWatcher(engine, {
    dir: './themes',
    onReload: (filename) => console.log('Reloaded', filename),
})
watcher.start()
```
## See also

- [Getting Started. installation and setup](/docs/getting-started/installation)
- [Core / Style & Colors. built-in color utilities](/docs/core/style)
