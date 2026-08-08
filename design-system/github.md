repo: whywhyjoe/sp-dcspad
branch: main
path: (whole repo — src/, styles/, index.html, workbench.html)

## Last sync

date: 2026-08-03T00:34:00Z

### Updated in this project

- Copied DCSPad's own shipping glyphs into the icon set — pane toggles, wrap, eval, sun/moon, edit, pin, library, minus, chevron-up, workbench.
- Added `assets/icons-product/` for the Microsoft marks the app uses (Copilot, SharePoint), with trademark guidance.
- Standardised on **one gear**: the app's filled Fluent gear is not carried over — `<Icon name="settings" />` (Lucide outline) is the single gear, and the rail's `advanced` aliases it.
- Confirmed every token in `styles/app.css` matches `tokens/colors.css` exactly; added the app's layout defaults (`--sidebar-w`, `--diag-h`, `--diag-fs`, pane fractions) to `tokens/spacing.css`.
- Recorded that no SharePoint logo exists in the app — the suite bar is host-rendered.

## Screen map

| Screen / artefact | Repo files it was built from |
| --- | --- |
| `templates/dcspad/` | `index.html` (topbar, sidebar, editor, preview, console markup), `src/main.js`, `src/libraries.js`, `src/snippets.js`, `src/console-panel.js`, `styles/app.css` |
| `templates/sp-workbench/` | `workbench.html`, `src/workbench/main.js` (rail glyphs), `src/workbench/shell.js`, `src/workbench/grid.js`, `styles/workbench.css` |
| `templates/compact-tool/` | No repo counterpart — built from the Compact Tool Pattern comp in the primary design project |
| `components/identity/Icon.jsx`, `assets/icons.svg`, `assets/icons.js` | Inline SVG in `index.html`, `src/workbench/main.js`, `src/libraries.js`, `src/main.js` |
| `assets/icons-product/` | `index.html` (`#btn-copilot`, `#btn-settings`) |
| `tokens/*.css` | `styles/app.css` `:root`, cross-checked against the primary project's `dcs-workbench.css` |
| `readme.md` § Iconography | `src/bridge/fluent-icon-font.js`, `src/intelligence/fluent-icons.js`, `vendor/intelligence/fluent-icons.json` |
