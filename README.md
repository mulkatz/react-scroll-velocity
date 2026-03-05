# react-scroll-velocity

React hook & components for scroll-speed-based animations. Text skew, velocity marquee, scroll-reactive opacity. Zero dependencies.

## Features

- **`useScrollVelocity` hook** — normalized velocity, direction, speed, scrolling state
- **`<VelocityText>`** — text skews/squeezes based on scroll speed
- **`<VelocityMarquee>`** — continuous marquee that accelerates when scrolling
- **`<VelocityOpacity>`** — elements fade based on scroll speed
- **SSR-safe** — `useSyncExternalStore`, no server-side DOM access
- **Respects `prefers-reduced-motion`** — disabled automatically
- **Zero dependencies** — just React as peer dependency
- **Tiny** — ~1.5KB gzipped

## Install

```bash
npm install react-scroll-velocity
```

## Quick Start

### Hook

```tsx
import { useScrollVelocity } from 'react-scroll-velocity';

function ScrollDebug() {
  const { velocity, direction, isScrolling } = useScrollVelocity();

  return (
    <div>
      <p>Velocity: {velocity.toFixed(2)}</p>
      <p>Direction: {direction}</p>
      <p>{isScrolling ? 'Scrolling...' : 'Idle'}</p>
    </div>
  );
}
```

### Components

```tsx
import { VelocityText, VelocityMarquee, VelocityOpacity } from 'react-scroll-velocity';

function App() {
  return (
    <>
      {/* Text skews when scrolling */}
      <VelocityText maxSkew={15}>
        <h1>Scroll to see me skew</h1>
      </VelocityText>

      {/* Marquee speeds up when scrolling */}
      <VelocityMarquee baseSpeed={50}>
        <span style={{ padding: '0 2rem' }}>Breaking News — </span>
      </VelocityMarquee>

      {/* Content fades when scrolling fast */}
      <VelocityOpacity>
        <p>I fade when you scroll fast</p>
      </VelocityOpacity>
    </>
  );
}
```

## API

### `useScrollVelocity(options?)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `smoothing` | `number` | `0.1` | Smoothing factor (0-1). Lower = smoother |
| `maxSpeed` | `number` | `2000` | Max speed in px/s for normalization |
| `idleTimeout` | `number` | `150` | Time in ms before scroll is "stopped" |
| `respectMotionPreference` | `boolean` | `true` | Honor `prefers-reduced-motion` |

**Returns:**

| Field | Type | Description |
|-------|------|-------------|
| `velocity` | `number` | Normalized velocity (-1 to 1). Negative = up, positive = down |
| `speed` | `number` | Raw speed in px/s |
| `direction` | `'up' \| 'down' \| 'idle'` | Current scroll direction |
| `isScrolling` | `boolean` | Whether user is currently scrolling |

### `<VelocityText>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxSkew` | `number` | `10` | Maximum skew angle in degrees |
| `squeeze` | `boolean` | `false` | Also apply scaleY compression |
| `maxSqueeze` | `number` | `0.1` | Maximum scaleY change (0-1) |
| `as` | `string` | `'div'` | HTML tag to render |
| `className` | `string` | — | CSS class |
| `style` | `CSSProperties` | — | Inline styles |

### `<VelocityMarquee>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `baseSpeed` | `number` | `50` | Base marquee speed in px/s |
| `maxSpeedMultiplier` | `number` | `5` | Max speed boost when scrolling |
| `reverse` | `boolean` | `false` | Reverse direction |
| `className` | `string` | — | CSS class |
| `style` | `CSSProperties` | — | Inline styles |

### `<VelocityOpacity>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fadeOut` | `boolean` | `true` | Fade out on scroll (false = fade in) |
| `minOpacity` | `number` | `0.1` | Minimum opacity |
| `as` | `string` | `'div'` | HTML tag to render |
| `className` | `string` | — | CSS class |
| `style` | `CSSProperties` | — | Inline styles |

## How It Works

The hook uses `requestAnimationFrame` to poll `window.scrollY` each frame and compute velocity as `(currentPos - lastPos) / deltaTime`. Exponential smoothing prevents jitter. Internal values are refs — components only re-render when the state meaningfully changes.

## Browser Support

Works in all modern browsers (Chrome 77+, Firefox 63+, Safari 13.1+, Edge 79+).

## License

MIT
