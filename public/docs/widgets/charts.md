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

## StackedBarChart
A bar chart where each bar is divided into segments representing different series.

| Prop | Type | Description |
|------|------|-------------|
| `groups` | `StackedBarGroup[]` | Data groups, each with a label and segments |
| `maxValue` | `number` | Top of the Y axis; defaults to the max total |
| `orientation` | `'vertical' \| 'horizontal'` | Direction of bars |

```tsx

const chart = new StackedBarChart({ flexGrow: 1 }, {
    groups: [
        { label: 'Jan', segments: [{ value: 30, color: { type: 'named', name: 'cyan' } }, { value: 20, color: { type: 'named', name: 'green' } }] },
        { label: 'Feb', segments: [{ value: 45 }, { value: 15 }] },
    ],
})
```

## Histogram
Renders a frequency distribution as vertical bars over a continuous range.

| Prop | Type | Description |
|------|------|-------------|
| `data` | `number[]` | Raw values to bin |
| `bins` | `number` | Number of histogram bins |
| `color` | `Color` | Bar color |

```tsx

const chart = new Histogram({ flexGrow: 1 }, { data: samples, bins: 20 })
```

## PieChart
Draws a pie or donut chart using block characters.

| Prop | Type | Description |
|------|------|-------------|
| `slices` | `Array<{ label: string, value: number, color: Color }>` | Pie segments |
| `donut` | `boolean` | Render as a donut chart |

```tsx

const chart = new PieChart({ width: 20, height: 10 }, {
    slices: [
        { label: 'TypeScript', value: 68, color: { type: 'named', name: 'blue' } },
        { label: 'JavaScript', value: 22, color: { type: 'named', name: 'yellow' } },
        { label: 'Other', value: 10, color: { type: 'named', name: 'brightBlack' } },
    ],
})
```

## BulletChart
A compact horizontal bar that shows a primary measure against a target and comparative ranges.

| Prop | Type | Description |
|------|------|-------------|
| `value` | `number` | The primary measure |
| `target` | `number` | Target marker position |
| `ranges` | `Array<{ max: number, color: Color }>` | Background range bands |
| `label` | `string` | Label on the left |

```tsx

const chart = new BulletChart({ height: 1, flexGrow: 1 }, { label: 'Revenue', value: 270, target: 260, ranges: [{ max: 200, color: { type: 'named', name: 'red' } }, { max: 300, color: { type: 'named', name: 'green' } }] })
```

## CandlestickChart
Renders OHLC candlestick data for financial time series.

| Prop | Type | Description |
|------|------|-------------|
| `candles` | `Array<{ open: number, high: number, low: number, close: number, label?: string }>` | OHLC data points |
| `upColor` | `Color` | Color for bullish candles |
| `downColor` | `Color` | Color for bearish candles |

```tsx

const chart = new CandlestickChart({ flexGrow: 1 }, {
    candles: [
        { open: 100, high: 115, low: 98, close: 110, label: 'Mon' },
        { open: 110, high: 112, low: 102, close: 105, label: 'Tue' },
    ],
})
```

## AreaChart
A line chart with the area below the line filled in.

| Prop | Type | Description |
|------|------|-------------|
| `series` | `Array<{ data: number[], label: string, color: Color }>` | One or more data series |
| `xLabels` | `string[]` | Labels for each X position |
| `filled` | `boolean` | Fill the area under the line (default: true) |

```tsx

const chart = new AreaChart({ flexGrow: 1 }, {
    series: [{ data: [5, 20, 15, 40, 30, 55], label: 'Visitors', color: { type: 'named', name: 'cyan' } }],
    xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
})
```

## ScatterPlot
Renders individual data points on a 2D axis.

| Prop | Type | Description |
|------|------|-------------|
| `points` | `Array<{ x: number, y: number, label?: string, color?: Color }>` | Data points to plot |
| `xLabel` | `string` | X axis label |
| `yLabel` | `string` | Y axis label |

```tsx

const chart = new ScatterPlot({ flexGrow: 1 }, {
    points: [{ x: 1, y: 2 }, { x: 3, y: 5 }, { x: 4, y: 3 }],
})
```

## RadarChart
A spider/radar chart that plots multiple variables on radial axes.

| Prop | Type | Description |
|------|------|-------------|
| `axes` | `string[]` | Axis labels |
| `series` | `Array<{ label: string, values: number[], color: Color }>` | One value per axis per series |

```tsx

const chart = new RadarChart({ width: 30, height: 15 }, {
    axes: ['Speed', 'Reliability', 'Security', 'DX', 'Perf'],
    series: [{ label: 'TermUI', values: [90, 85, 78, 95, 88], color: { type: 'named', name: 'cyan' } }],
})
```

## GanttChart
Displays tasks on a timeline grid for project or process scheduling views.

| Prop | Type | Description |
|------|------|-------------|
| `tasks` | `Array<{ label: string, start: number, end: number, color?: Color }>` | Tasks with numeric start/end columns |
| `columns` | `string[]` | Column header labels |

```tsx

const chart = new GanttChart({ flexGrow: 1 }, {
    columns: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    tasks: [
        { label: 'Design', start: 0, end: 1 },
        { label: 'Build', start: 1, end: 3 },
        { label: 'Test', start: 2, end: 3 },
    ],
})
```

## BrailleCanvas
A free-form drawing canvas that uses Unicode Braille characters to achieve 2x4 sub-character resolution.

| Prop | Type | Description |
|------|------|-------------|
| `width` | `number` | Canvas width in terminal columns |
| `height` | `number` | Canvas height in terminal rows |

```tsx

const canvas = new BrailleCanvas({ width: 40, height: 20 }, {})
// Draw a diagonal line
for (let i = 0; i < 80; i++) {
    canvas.setPixel(i, i / 2, true)
}
```

## See also

- [@termuijs/data](/docs/data/overview) — reactive hooks for live CPU, memory, and network metrics
- [Accessibility & caps flags](/docs/guides/accessibility) — how charts adapt to NO_UNICODE environments
