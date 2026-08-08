import React from 'react';

/* The core icon set, inlined so a tool stays a single copyable file with no
   CDN and no icon package. Geometry rule: a 16 grid at stroke 1.4 or a 24
   grid at stroke 2 — both land on a ~1.35px line at 15–16px, so the two mix.
   Copy from DCSPad first, Lucide (lucide.dev) second, draw third.
   The same paths live in assets/icons.svg as a <symbol> sprite. */
const G = {
  file:          ['0 0 24 24', 2, ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4']],
  folder:        ['0 0 24 24', 2, ['M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z']],
  'folder-open': ['0 0 24 24', 2, ['m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2']],
  star:          ['0 0 24 24', 2, ['M11.5 2.8a.55.55 0 0 1 1 0l2.3 4.68a2.1 2.1 0 0 0 1.6 1.16l5.16.75a.53.53 0 0 1 .3.91l-3.74 3.64a2.1 2.1 0 0 0-.61 1.87l.88 5.14a.53.53 0 0 1-.77.56l-4.62-2.43a2.1 2.1 0 0 0-1.97 0L6.4 21.5a.53.53 0 0 1-.77-.56l.88-5.14a2.1 2.1 0 0 0-.61-1.88L2.16 10.3a.53.53 0 0 1 .29-.9l5.17-.76a2.1 2.1 0 0 0 1.6-1.16z']],
  download:      ['0 0 24 24', 2, ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5', 'M12 15V3']],
  upload:        ['0 0 24 24', 2, ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm17 8-5-5-5 5', 'M12 3v12']],
  trash:         ['0 0 24 24', 2, ['M3 6h18', 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6', 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M10 11v6', 'M14 11v6']],
  search:        ['0 0 16 16', 1.5, ['M11.5 7A4.5 4.5 0 1 1 2.5 7a4.5 4.5 0 0 1 9 0', 'm10.5 10.5 3 3']],
  refresh:       ['0 0 16 16', 1.4, ['M13.2 8A5.2 5.2 0 1 1 11 3.8', 'M13.2 2.6v3.2H10']],
  plus:          ['0 0 16 16', 1.4, ['M8 3.5v9M3.5 8h9']],
  close:         ['0 0 16 16', 1.4, ['m4 4 8 8M12 4l-8 8']],
  check:         ['0 0 16 16', 1.7, ['m3 8.5 3.2 3.2L13 4.8']],
  chevron:       ['0 0 16 16', 2,   ['M4 6.5 8 10.5 12 6.5']],
  maximize:      ['0 0 16 16', 1.5, ['M6 2.5H2.5V6M10 13.5h3.5V10']],
  code:          ['0 0 16 16', 1.5, ['M6 3.6 2.6 8 6 12.4M10 3.6 13.4 8 10 12.4']],
  layers:        ['0 0 16 16', 1.4, ['m8 1.8 6 3.1-6 3.1-6-3.1z', 'm2 8.1 6 3.1 6-3.1', 'm2 11.2 6 3.1 6-3.1']],
  globe:         ['0 0 16 16', 1.35,['M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0', 'M2.2 8h11.6M8 2c1.8 1.7 2.8 3.7 2.8 6S9.8 12.3 8 14M8 2C6.2 3.7 5.2 5.7 5.2 8s1 4.3 2.8 6']],
  shield:        ['0 0 16 16', 1.4, ['M8 1.8 13 3.6v3.6c0 3.2-2.1 5.6-5 6.9-2.9-1.3-5-3.7-5-6.9V3.6z', 'm5.8 7.8 1.6 1.6 2.9-3']],
  link:          ['0 0 16 16', 1.4, ['M6.5 9.5 9.5 6.5', 'M7.5 4.6 9 3.1a2.6 2.6 0 0 1 3.7 3.7L11.4 8.5', 'M8.5 11.4 7 12.9a2.6 2.6 0 0 1-3.7-3.7L4.6 7.5']],
  info:          ['0 0 16 16', 1.5, ['M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0', 'M8 7.4v3.4M8 5.3v.1']],
  warn:          ['0 0 16 16', 1.5, ['M8 2.4 14.3 13H1.7z', 'M8 6.6v3M8 11.2v.1']],
  error:         ['0 0 16 16', 1.5, ['M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0', 'm5.8 5.8 4.4 4.4M10.2 5.8l-4.4 4.4']],
  'arrow-left':  ['0 0 16 16', 1.6, ['m7 3-5 5 5 5M2.5 8H14']],
  'arrow-right': ['0 0 16 16', 1.6, ['M3 8h9M8.8 4.2 12.6 8l-3.8 3.8']],
  clock:         ['0 0 16 16', 1.35,['M12 8a4.8 4.8 0 1 1-9.6 0 4.8 4.8 0 0 1 9.6 0', 'M7.2 5.4v3l2 1.2M12.2 4.2h2v2']],
  list:          ['0 0 16 16', 1.4, ['M5.5 4h8M5.5 8h8M5.5 12h8', 'M3.6 4a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0', 'M3.6 8a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0', 'M3.6 12a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0']],
  /* DCSPad's own shipping glyphs, copied from whywhyjoe/sp-dcspad. */
  minus:         ['0 0 16 16', 1.5, ['M4 8h8']],
  'chevron-up':  ['0 0 16 16', 1.5, ['M3 10.5 8 5.5l5 5']],
  edit:          ['0 0 16 16', 1.4, ['m10.8 2.5 2.7 2.7-7.7 7.7-3.3.6.6-3.3z', 'm9.5 3.8 2.7 2.7']],
  wrap:          ['0 0 16 16', 1.4, ['M2.5 4h11M2.5 8h7.5a2 2 0 1 1 0 4H8', 'M9.5 10.5 8 12l1.5 1.5']],
  eval:          ['0 0 16 16', 1.5, ['M13 3v5a2 2 0 0 1-2 2H3', 'm5.5 7.5-2.5 2.5 2.5 2.5']],
  sun:           ['0 0 16 16', 1.4, ['M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0', 'M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4']],
  moon:          ['0 0 16 16', 1.4, ['M13 9.5A5.5 5.5 0 1 1 6.5 3a4.3 4.3 0 0 0 6.5 6.5z']],
  pin:           ['0 0 16 16', 1.4, ['M4.5 2.5h7v11L8 10.6l-3.5 2.9z']],
  library:       ['0 0 16 16', 1.3, ['M5 11.5V3a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 14 3a1.5 1.5 0 0 1-1.5 1.5H11v8.5a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 2 13a1.5 1.5 0 0 1 1.5-1.5H5z']],
  'pane-left':   ['0 0 16 16', 1.3, ['M3.2 2.7h9.6a1.4 1.4 0 0 1 1.4 1.4v8.2a1.4 1.4 0 0 1-1.4 1.4H3.2a1.4 1.4 0 0 1-1.4-1.4V4.1a1.4 1.4 0 0 1 1.4-1.4z', 'M6.3 2.7v10.6']],
  'pane-right':  ['0 0 16 16', 1.3, ['M3.2 2.7h9.6a1.4 1.4 0 0 1 1.4 1.4v8.2a1.4 1.4 0 0 1-1.4 1.4H3.2a1.4 1.4 0 0 1-1.4-1.4V4.1a1.4 1.4 0 0 1 1.4-1.4z', 'M9.7 2.7v10.6']],
  'pane-bottom': ['0 0 16 16', 1.3, ['M3.2 2.7h9.6a1.4 1.4 0 0 1 1.4 1.4v8.2a1.4 1.4 0 0 1-1.4 1.4H3.2a1.4 1.4 0 0 1-1.4-1.4V4.1a1.4 1.4 0 0 1 1.4-1.4z', 'M1.8 9.9h12.4']],
  /* The SharePoint mark, drawn to the system's own rule — 24 grid, stroke 1.5,
     currentColor. It is the glyph on the topbar's "Open SP Workbench" button.
     Microsoft trademark: use it only where the control opens SharePoint. */
  sharepoint:    ['0 0 24 24', 1.5, ['M9 9.5c-1.167-.333-3.5-.6-3.5 1S9 12 9 13.5c0 2-2.667 1.167-4 1', 'M17 19a5.5 5.5 0 1 0-4.5-8.663', 'M9.126 17.5a4 4 0 0 0 3.874 5c2.18 0 4-1.846 4-4a4 4 0 0 0-4.5-3.97', 'M18.472 8.086A6 6 0 0 0 6.583 6.5', 'M1.5 16.5v-9a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1Z']],
  /* A real toothed gear (Lucide, 24 grid). It must NOT be the rail's
     spoke-circle — at 15px that reads as a sun, and the set already has one.
     The shipping topbar uses Microsoft's filled Fluent gear; that is a product
     mark, not this. */
  settings:      ['0 0 24 24', 2, ['M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0', 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z']],
  /* SP Workbench rail glyphs — the source's own 16-grid shapes. */
  site:          ['0 0 16 16', 1.4, ['M2.2 13.3V6.5L8 2.3l5.8 4.2v6.8z', 'M6.2 13.3V9.4h3.6v3.9']],
  pages:         ['0 0 16 16', 1.4, ['M3.4 1.8h6.4l2.8 2.8v9.6H3.4z', 'M9.6 1.8v3h3', 'M5.4 8h5.2M5.4 10.4h5.2']],
  query:         ['0 0 16 16', 1.4, ['M11.4 7A4.4 4.4 0 1 1 2.6 7a4.4 4.4 0 0 1 8.8 0', 'M5.2 7h3.6M7 5.2v3.6', 'm13.5 13.5-3.2-3.2']],
};

export function Icon({ name, size = 15, strokeWidth, style, ...rest }) {
  const g = G[name];
  if (!g) return null;
  const [viewBox, sw, ds] = g;
  return (
    <svg
      width={size} height={size} viewBox={viewBox} aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeWidth={strokeWidth ?? sw}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ flex: 'none', display: 'block', ...style }} {...rest}
    >
      {ds.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

/* Solid play triangle — the one filled glyph in the set, used only on the
   primary Run verb. */
export function PlayGlyph({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" focusable="false" style={{ flex: 'none' }}>
      <path d="M5 3.2 12.2 8 5 12.8z" fill="currentColor" />
    </svg>
  );
}

/* Two filled glyphs the app ships that the stroke set cannot express. The
   system's "no filled glyph among the line ones" rule holds: these are the
   named exceptions, exactly as PlayGlyph is. */
export function PinGlyph({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" focusable="false" style={{ flex: 'none' }}>
      <path d="M4.5 2.5h7v11L8 10.6l-3.5 2.9z" fill="currentColor" />
    </svg>
  );
}

/* The drag handle on a reorderable row — six dots, never a stroke shape. */
export function DragGlyph({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" focusable="false" style={{ flex: 'none' }}>
      {[3.5, 8, 12.5].map(cy => (
        <React.Fragment key={cy}><circle cx="5" cy={cy} r="1" fill="currentColor" /><circle cx="11" cy={cy} r="1" fill="currentColor" /></React.Fragment>
      ))}
    </svg>
  );
}

/* ── Product marks ───────────────────────────────────────────────────────
   Microsoft marks the shipping app uses. They are filled, they sit on foreign
   grids, and they are trademarks — so they are NOT in the icon set and never
   mix into a row of DCS glyphs. Use one only where the control opens the
   product it names; never recoloured into the accent.
     <ProductGlyph name="copilot" />    topbar → Microsoft 365 Copilot
     <ProductGlyph name="sharepoint" /> topbar → Open SP Workbench
   Standalone copies: assets/icons-product/. The SharePoint mark is also
   available as <Icon name="sharepoint" /> because it is drawn to the system's
   own rule. */
const PRODUCT = {
  copilot: ['0 0 20 20', 'fill', ['M5.93 2h6.2c1.06 0 1.99.7 2.29 1.7l.47 1.6c.16.55.64.93 1.2.98h.28c.9 0 1.58.25 2.03.77.44.5.6 1.17.6 1.84.02 1.32-.5 2.96-.9 4.27a12.57 12.57 0 01-1.45 3.22c-.61.9-1.45 1.62-2.58 1.62H7.86c-1.05 0-1.98-.7-2.28-1.7l-.47-1.6a1.38 1.38 0 00-1.2-.98h-.29c-.88 0-1.57-.25-2.02-.77a2.78 2.78 0 01-.6-1.84c-.02-1.32.5-2.96.9-4.26.37-1.14.83-2.32 1.44-3.23C3.96 2.72 4.8 2 5.93 2zM2.86 7.15C2.43 8.5 1.98 9.97 2 11.1c0 .55.13.94.35 1.2.2.23.57.42 1.27.42h2.63c.61 0 1.15-.4 1.32-.98.47-1.58 1.27-4.24 1.9-6.28l.03-.1c.15-.5.3-.96.45-1.38.13-.35.28-.69.46-.98H5.93c-.65 0-1.22.4-1.76 1.19-.53.78-.96 1.84-1.3 2.96zm2.87 6.57c.15.2.27.44.34.7l.47 1.6c.17.58.71.98 1.32.98h.03c.36 0 .6-.17.75-.38a4 4 0 00.47-.95c.15-.4.29-.83.44-1.33l.03-.1.2-.64c-.24.07-.49.11-.74.11H6.4l-.16.01h-.52zm2.46-1h.85c.55 0 1.04-.34 1.26-.84l1.17-3.9c.07-.25.19-.49.34-.7h-.85c-.55 0-1.04.34-1.26.83l-1.17 3.91c-.08.25-.19.49-.34.7zm2.03-6.32c.24-.07.49-.11.74-.11h3.31c-.15-.22-.27-.45-.34-.7l-.47-1.6c-.17-.59-.71-.99-1.32-.99h-.02a.92.92 0 00-.76.38 4 4 0 00-.48.96c-.14.38-.28.82-.43 1.32l-.03.1-.2.64zm6.92 6.45c.42-1.35.88-2.82.86-3.95 0-.55-.13-.94-.35-1.2-.2-.23-.57-.42-1.28-.42h-2.62c-.61 0-1.15.4-1.32.99-.47 1.57-1.27 4.23-1.9 6.27l-.03.1c-.15.5-.3.96-.45 1.38-.13.35-.28.69-.46.98h4.48c.65 0 1.22-.4 1.76-1.19.53-.78.96-1.84 1.3-2.96z']],
  sharepoint: ['0 0 24 24', 'stroke', ["M9 9.5c-1.167-.333-3.5-.6-3.5 1S9 12 9 13.5c0 2-2.667 1.167-4 1","M17 19a5.5 5.5 0 1 0-4.5-8.663","M9.126 17.5a4 4 0 0 0 3.874 5c2.18 0 4-1.846 4-4a4 4 0 0 0-4.5-3.97","M18.472 8.086A6 6 0 0 0 6.583 6.5","M1.5 16.5v-9a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1Z"]],
};

export function ProductGlyph({ name, size = 16, ...rest }) {
  const g = PRODUCT[name];
  if (!g) return null;
  const [viewBox, mode, ds] = g;
  const paint = mode === 'fill'
    ? { fill: 'currentColor' }
    : { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinejoin: 'round' };
  return (
    <svg width={size} height={size} viewBox={viewBox} aria-hidden="true" focusable="false"
      style={{ flex: 'none', display: 'block' }} {...paint} {...rest}>
      {ds.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}
export const PRODUCT_NAMES = Object.keys(PRODUCT);

/* ONE gear in the system. `advanced` (the SP Workbench rail's last item) and
   `settings` are the same shape — the app drew the rail item as a circle with
   eight rays, which at 15px is indistinguishable from `sun`. Consistency wins:
   both names resolve to the single toothed gear. */
G.advanced = G.settings;

/* Back-compat alias — this mark shipped briefly under the wrong name. */
G.workbench = G.sharepoint;

export const ICON_NAMES = Object.keys(G).filter(n => n !== 'workbench' && n !== 'advanced');
