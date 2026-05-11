# Chart Widgets
Data visualization widgets in `@termuijs/widgets` render charts entirely in the terminal using Unicode block characters, with ASCII fallbacks for CI environments.
## BarChart
Grouped horizontal or vertical bar chart:
```ts

const data: BarGroup[] = [
    { label: 'Jan', bars: [{ value: 42, color: { type: 'named', name: 'cyan' } }] },
    { label: 'Feb', bars: [{ value: 67 }] },
    { label: 'Mar', bars: [{ value: 55 }] },
]

const chart = new BarChart(data, { flexGrow: 1 }, {
    orientation: 'vertical',
    maxValue: 100,
})
```
For grouped bars, include multiple items in the `bars` array:
```ts
const grouped: BarGroup[] = [
    {
        label: 'Q1',
        bars: [
            { value: 42, color: { type: 'named', name: 'cyan' }   },  // read
            { value: 31, color: { type: 'named', name: 'green' }  },  // write
        ],
    },
]
```
| BarGroup field | Type     | Description                 |
| -------------- | -------- | --------------------------- |
| `label`        | `string` | X-axis label for this group |
| `bars`         | `Array`  | One bar per series          |

| BarChart option | Type                         | Default            | Description       |
| --------------- | ---------------------------- | ------------------ | ----------------- |
| `orientation`   | `'horizontal' \| 'vertical'` | `'vertical'`       | Direction of bars |
| `maxValue`      | `number`                     | Auto (max of data) | Top of the scale  |
| `showLabels`    | `boolean`                    | `true`             | Show axis labels  |

## Sparkline
A compact inline trend line for time-series data. Fits in a single row:
```ts

const spark = new Sparkline('CPU', { height: 1, flexGrow: 1 }, {
    color: { type: 'named', name: 'green' },
})
spark.setData([12, 24, 18, 45, 67, 52, 41])
```
The widget auto-scales to fit the data range into the available width. When `NO_UNICODE=1`, uses numeric ASCII characters (`1`–`8`) as level indicators instead of block characters.
## LineChart
An ASCII line plot with labeled X and Y axes:
```ts

const chart = new LineChart({ flexGrow: 1 }, {
    series: [
        { data: [10, 20, 35, 28, 42, 38, 55], label: 'Requests', color: { type: 'named', name: 'cyan' } },
        { data: [2,  5,  8,  6,  12, 10, 18], label: 'Errors',   color: { type: 'named', name: 'red' }  },
    ],
    xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    xLabel: 'Day',
    yLabel: 'Count',
    showAxes: true,
})
```
Plot characters used:
- `●` — data point
- `╱` — positive slope
- `╲` — negative slope
- `─` — flat segment

When `NO_UNICODE=1`, falls back to: `*`, `/`, `\`, `-`.
| Series field | Type       | Description                  |
| ------------ | ---------- | ---------------------------- |
| `data`       | `number[]` | Y values for each X position |
| `label`      | `string`   | Legend label                 |
| `color`      | `Color`    | Line color                   |

| LineChart option | Type           | Default  | Description                  |
| ---------------- | -------------- | -------- | ---------------------------- |
| `series`         | `SeriesData[]` | Required | One or more data series      |
| `xLabels`        | `string[]`     | —        | Labels for each X position   |
| `xLabel`         | `string`       | —        | X axis title                 |
| `yLabel`         | `string`       | —        | Y axis title                 |
| `showAxes`       | `boolean`      | `true`   | Render axis lines and labels |
| `minY`           | `number`       | Auto     | Force Y axis minimum         |
| `maxY`           | `number`       | Auto     | Force Y axis maximum         |

## HeatMap
A 2D matrix visualization with a cool-to-warm color gradient:
```ts

// 24-hour × 7-day activity grid
const data = Array.from({ length: 7 }, () =>
    Array.from({ length: 24 }, () => Math.random() * 100)
)

const map = new HeatMap({ flexGrow: 1 }, {
    data,
    rowLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    colLabels: Array.from({ length: 24 }, (_, i) => `${i}h`),
})
```
Shading characters (unicode): `░` `▒` `▓` `█` — lighter = lower value, darker = higher.
ASCII fallback (when `NO_UNICODE=1`): `.` `:` `#` `@`.
| HeatMap option | Type             | Description                                                 |
| -------------- | ---------------- | ----------------------------------------------------------- |
| `data`         | `number[][]`     | Row-major 2D matrix of values                               |
| `rowLabels`    | `string[]`       | Label for each row (left side)                              |
| `colLabels`    | `string[]`       | Label for each column (top)                                 |
| `colorScale`   | `[Color, Color]` | Start and end colors for the gradient (default: blue → red) |

## See also

- [@termuijs/data](/docs/data/overview) — reactive hooks for live CPU, memory, and network metrics
- [Accessibility & caps flags](/docs/guides/accessibility) — how charts adapt to NO_UNICODE environments
