The three non-content states, plus the two progress treatments.

```jsx
<State>Console is clear — console.log from your JS lands here</State>
<State tone="loading">Reading the field schema…</State>
<State tone="err">404 — that list does not exist on this web</State>
<Skeleton width="70%" /><Skeleton width="92%" delay={0.1} />
<div className="dcs-canvas-bar is-pending"><PanelTitle>Preview</PanelTitle><ScanBar /></div>
```

No illustration, no mascot, no call-to-action card. Skeletons only where the shape is known in advance.
