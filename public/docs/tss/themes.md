# Built-in Themes
`@termuijs/tss` ships ten built-in themes and a runtime theme switcher. All themes use the same CSS variable names so widgets styled against `var(--primary)` work with every theme.
## Available themes
| Name           | Character                                                                            | Primary Color |
| -------------- | ------------------------------------------------------------------------------------ | ------------- |
| `default`      | Dark background, cyan/green accents, clean terminal aesthetic                        | cyan          |
| `cyberpunk`    | Neon magenta and cyan on deep navy, high contrast                                    | #ff00ff       |
| `nord`         | Arctic blues and muted grays, easy on the eyes                                       | #88c0d0       |
| `dracula`      | Deep purple background with pastel pink, green, and yellow accents                   | #bd93f9       |
| `catppuccin`   | Warm pastels on dark, soft and legible                                               | #cba6f7       |
| `solarized`    | Ethan Schoonover's classic: yellow, orange, blue on warm base                        | #268bd2       |
| `highContrast` | Pure black background with white text and vivid accent colors for maximum legibility | #00ffff       |
| `rose-pine`    | Rosé Pine: dusty rose, pine green, and gold on a deep indigo base                    | #c4a7e7       |
| `tokyo-night`  | Tokyo Night: soft blues and purples on a near-black background                       | #7aa2f7       |
| `gruvbox`      | Gruvbox: warm earthy browns with muted greens, blues, and yellows                    | #458588       |

## Loading a built-in theme
```ts

const engine = new ThemeEngine()
engine.load(BUILTIN_THEMES['dracula'])
engine.setTheme('dracula')
```
`BUILTIN_THEMES` is a `Record<string, string>` mapping theme names to TSS strings. You can load multiple at once:
```ts
// Load all built-ins at once

engine.load(getAllBuiltinThemes())
```
## useTheme hook
`useTheme` gives JSX components access to the active theme and the ability to switch:
```ts

function ThemeSelector() {
    const { theme, setTheme, availableThemes } = useTheme()

    return (
        <col>
            <Text>Active: {theme}</Text>
            {availableThemes.map((name) => (
                <Text key={name} bold={name === theme} onClick={() => setTheme(name)}>
                    {name}
                </Text>
            ))}
        </col>
    )
}
```
### Return value
| Property          | Type                     | Description              |
| ----------------- | ------------------------ | ------------------------ |
| `theme`           | `string`                 | Name of the active theme |
| `setTheme`        | `(name: string) => void` | Switch themes at runtime |
| `availableThemes` | `string[]`               | All loaded theme names   |

## AutoThemeProvider
`AutoThemeProvider` detects the terminal's background color via an OSC escape query and picks the closest built-in theme automatically. Useful when you don't want to force a specific theme on users with custom terminal colors.
```ts

function Root() {
    return (
        <AutoThemeProvider fallback="dracula">

        </AutoThemeProvider>
    )
}
```
### Props
| Prop       | Type          | Default      | Description                                                       |
| ---------- | ------------- | ------------ | ----------------------------------------------------------------- |
| `fallback` | `string`      | `'default'`  | Theme to use if detection fails                                   |
| `engine`   | `ThemeEngine` | Auto-created | Provide an existing engine if you've already loaded custom themes |

The provider wraps all descendant components in a `ThemeContext`, so `useTheme()` works anywhere below it.
## Defining a custom theme
Write a TSS string with your own `@theme` block:
```ts
const mytheme = `
@theme midnight {
  --primary: #a78bfa;
  --bg: #0f0f1a;
  --surface: #1a1a2e;
  --text: #e2e8f0;
  --text-muted: #64748b;
  --border: single;
  --border-color: #334155;
  --border-focus: #a78bfa;
  --error: #f87171;
  --success: #34d399;
  --warning: #fbbf24;
}
`

engine.loadAll([getAllBuiltinThemes(), mytheme])
engine.setTheme('midnight')
```
## Loading themes from JSON or YAML
`loadThemeFromFile` reads a JSON or YAML file from disk and returns a `ThemeTokens` object. Pass the result to `tokensToTSS` and load it into your engine:
```ts

const engine = new ThemeEngine()

// Load from JSON
const jsonTokens = loadThemeFromFile('./my-theme.json')
engine.load(tokensToTSS(jsonTokens, 'my-theme'))

// Load from YAML
const yamlTokens = loadThemeFromFile('./my-theme.yaml')
engine.load(tokensToTSS(yamlTokens, 'my-theme'))

engine.setTheme('my-theme')
```
Your JSON or YAML file should define the same token keys used in `ThemeTokens`: `bg`, `fg`, `primary`, `secondary`, `success`, `warning`, `error`, `muted`, `border`, and `highlight`. You can nest them under a `tokens` property or put them at the root level.

```json
{
  "bg": "#1e1e2e",
  "fg": "#cdd6f4",
  "primary": "#cba6f7",
  "secondary": "#f5c2e7",
  "success": "#a6e3a1",
  "warning": "#f9e2af",
  "error": "#f38ba8",
  "muted": "#585b70",
  "border": "#585b70",
  "highlight": "#313244"
}
```

## CSS variable reference
All built-in themes define these variables. Widgets use them via `var(--name)`:
| Variable         | Purpose                                                |
| ---------------- | ------------------------------------------------------ |
| `--primary`      | Main accent color — borders, highlights, active states |
| `--secondary`    | Secondary accent                                       |
| `--bg`           | Application background                                 |
| `--surface`      | Panel and card backgrounds                             |
| `--text`         | Primary text color                                     |
| `--text-muted`   | Dimmed text, placeholders, hints                       |
| `--border`       | Border style (`single`, `double`, `round`)             |
| `--border-color` | Inactive border color                                  |
| `--border-focus` | Border color when focused                              |
| `--error`        | Error state                                            |
| `--success`      | Success state                                          |
| `--warning`      | Warning state                                          |

## See also

- [TSS Overview](/docs/tss/overview) — selector syntax, pseudo-classes, engine API
- [Theme Tokens](/docs/tss/tokens) — programmatic token objects and the tokensToTSS bridge
