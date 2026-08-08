# UI kit · DCSPad workbench (L1)

A recreation of the DCSPad comp in the primary source project — the flagship
L1 workbench, hosted inside SharePoint. Nothing here is invented: the layout,
the pixel values and the copy come from `DCSPad Workbench.dc.html`.

## Anatomy

| Region | Spec |
| --- | --- |
| Host | The SharePoint suite bar stays visible at 48px, desaturated. |
| Seat | `position: fixed; inset: 53px 5px 5px`, radius 6, surround `--surround`. |
| Shell | `.dcs-app` — 40px topbar / 1fr work / 24px status bar. |
| Work | `230px · 5px · minmax(200px,1fr) · 5px · minmax(260px,1fr)` — sidebar, splitter, editor, splitter, preview over console. |
| Sidebar | Frameworks (flexible) over a 5px gutter over Snippets (240px fixed). |
| Right column | `1fr / 5px / 300px` — preview above console. |

## What is interactive

- **File** opens the menu; *Import from SharePoint* opens the export dialog.
- **Run** (or `Ctrl/Cmd + Enter`) sweeps the preview scan bar, renders the
  preview and prints two console lines. `Esc` steps back one level.
- Framework checkboxes toggle and keep a resting selected state; snippet rows
  switch the editor pane and raise a toast; the HTML / CSS / JS tabs are live.
- In the SharePoint dialog, selecting a node calls it out — the bright node
  tier — and enables *Review metadata*.

## Files

`DcsPadChrome.jsx` suite bar, topbar, status bar · `DcsPadSidebar.jsx`
frameworks and snippets · `DcsPadPanes.jsx` editor, preview, console ·
`DcsPadOverlays.jsx` File menu, SharePoint dialog · `DcsPadApp.jsx` state and
composition.

## Known deviations

- The editor is a static syntax-coloured block, not Monaco. Colours are the
  `dcspad-dark` hues from `tokens/colors.css`.
- Splitters are drawn and hoverable but do not resize; pane sizes are fixed.
- The topbar's Copilot, SP Workbench and Settings glyphs use the design
  system's own icon set rather than the Microsoft product marks in the comp.

## Using this in a consuming project

The page links the design system by relative path — `../../styles.css` and
`../../_ds_bundle.js`, correct inside this design-system repo (two levels up).
A consuming project that copies this folder must repoint those two references
at its bound copy of the system (usually `_ds/<folder>/styles.css` and
`_ds/<folder>/_ds_bundle.js`, relative to wherever the page lands). Nothing
else needs to change.
