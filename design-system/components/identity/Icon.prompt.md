Inline SVG glyph from the DCS core set — use it anywhere a tool needs an icon, instead of an icon font, a CDN sprite or an emoji.

```jsx
<button className="dcs-icon-btn" title="Refresh" aria-label="Refresh">
  <Icon name="refresh" size={13} />
</button>
```

- Colour comes from the parent's `color` — never pass a hex to a glyph.
- `size` 15–16 is the shipping size; drop to 13 inside `sm`/`xs` controls.
- Always `aria-hidden` (built in); the accessible name lives on the button.
- `PlayGlyph` is the one filled shape in the set. It belongs on the Run verb and nowhere else.
- Need something not in the set? Copy from DCSPad first, Lucide second, draw third — and add it here rather than inlining a one-off.
