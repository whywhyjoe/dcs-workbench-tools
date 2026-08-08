The XS escape hatch: a full toolbar welded into one 22px bordered strip, for genuinely small containers only.

```jsx
<Microbar>
  <button title="Back"><Icon name="arrow-left" size={12} /></button>
  <MicrobarValue>https://nervedotnet.sharepoin</MicrobarValue>
  <button title="Reload"><Icon name="refresh" size={12} /></button>
  <button title="Go"><Icon name="arrow-right" size={12} /></button>
</Microbar>
```

Children are bare `<button>`s — the strip styles them. Every one needs a `title`. Never put a destructive or first-time action at this size.
