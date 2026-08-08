Brand marks. There is no logo file and no drawn mark — identity is a letter on a 4 × 5 pixel grid plus a mono wordmark.

```jsx
<Mark letter="D" />                     {/* L1 tool tile */}
<Mark letter="S" size="lg" />           {/* masthead */}
<InstrumentMark />                      {/* every L2 tool, identical */}
<Wordmark head="DCS" tail="PAD" />
```

L1 gets a letter, L2 never does. Static SVG copies of the four letters live in `assets/mark-*.svg` for places that cannot run the component.
