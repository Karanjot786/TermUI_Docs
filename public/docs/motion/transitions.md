# Easings & Transitions
Easing functions map a progress value (0 to 1) to a curved output. Pair them with a timer to animate position, opacity, or color interpolation.

Unlike springs, easing functions are time-based: you specify a duration and the curve does the rest.
## Usage
```ts

// All easings take a number 0–1 and return 0–1
easings.easeInOut(0.0)  // → 0
easings.easeInOut(0.5)  // → 0.5
easings.easeInOut(1.0)  // → 1
```
## Available easings
| Easing           | What it does                                    |
| ---------------- | ----------------------------------------------- |
| `linear`         | Constant speed. no curve                        |
| `easeIn`         | Starts slow, accelerates to end                 |
| `easeOut`        | Starts fast, decelerates to end                 |
| `easeInOut`      | Slow at both ends, fast in the middle           |
| `easeInQuad`     | Quadratic acceleration (t²)                     |
| `easeOutQuad`    | Quadratic deceleration                          |
| `easeInOutQuad`  | Quadratic ease in both directions               |
| `easeInCubic`    | Cubic acceleration curve (t³)                   |
| `easeOutCubic`   | Cubic deceleration curve                        |
| `easeInOutCubic` | Cubic ease in both directions                   |
| `easeInExpo`     | Exponential acceleration. very snappy start     |
| `easeOutExpo`    | Exponential deceleration. crisp landing         |
| `easeInBack`     | Slight overshoot at start before moving forward |
| `easeOutBack`    | Overshoots the target then settles back         |
## Guarantees
- `easing(0)` always returns `0`
- `easing(1)` always returns `1`
- Standard easings are monotonically increasing (no negative values)
- `easeInOut` variants are symmetric around `t = 0.5`
- `easeInBack` / `easeOutBack` may temporarily exceed `[0, 1]`
## Animation loop example
```ts

const duration = 500  // ms
const start = Date.now()

function animate() {
    const elapsed = Date.now() - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = easings.easeOutCubic(progress)

    // Move a dot across 40 columns
    const x = Math.round(eased * 40)
    screen.writeString(x, 5, '●')

    if (progress < 1) setTimeout(animate, 16)
}

animate()
```
## When to use springs instead
Easing functions are ideal for one-shot, fixed-duration transitions (page loads, reveals, progress fills). If your animation reacts to user input mid-flight or needs to look physical, use [springs](/docs/motion/springs) instead.

Springs handle interrupts gracefully; easing functions don't.
## See also

- [Springs: physics-based animation](/docs/motion/springs)
- [Widgets: animatable terminal components](/docs/widgets/overview)
