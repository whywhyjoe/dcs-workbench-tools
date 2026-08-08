The parametric range control — a generator's main verb-adjacent input.

```jsx
<Field label="Stroke weight" value={`${w} px`}>
  <Slider min={1} max={40} value={w} onChange={e => setW(+e.target.value)} />
</Field>
```

Never ship a slider without its readout. If the user is dragging an edge rather than setting a number, use ResizeRail instead.
