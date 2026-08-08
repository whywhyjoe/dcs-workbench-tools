# DCS Workbench design system

The visual language for **internal developer tooling** in the DCS Workbench
family — DCSPad, the SP Workbench, Halo, the File Broker. Dark only, dense, one
accent. Dependency-free and copy-safe: no build, no CDN, no icon package, no
`@import`.

**This is not the design system for employee-facing pages.** That is BSP/BMO, in
the `bsp-design-system` repo. Picking between them is covered in
[`../docs/05-design-systems.md`](../docs/05-design-systems.md).

## Files

| File | What |
| --- | --- |
| `dcs-workbench.css` | the whole system: `:root` tokens, L1 shell, L2 shell, controls, navigation, data display, feedback, motion |

Drop it in whole, or paste the `:root` block plus the components you actually
use — it is written to survive both.

## The two layers

- **L1 · Workbench** (`.dcs-app`) — full-screen takeover under the SharePoint
  suite bar. Topbar (40px) · work · status bar (24px) in a CSS grid. Panels,
  splitters, nav rail, data grid, tree, node rows. Carries the
  `html.dcs-hosted` pinning rules that keep a hosted app over the viewport.
- **L2 · Instrument** (`.dcs-tool`) — a single-purpose tool inside one web part,
  in normal document flow. Head, controls column, canvas. No takeover, no status
  bar, no splitters. Paints its own dark ground so it reads as an instrument
  dropped onto the page, not as a themed page.

These correspond exactly to the app tiers in
[`../docs/00-system-model.md`](../docs/00-system-model.md). The layer you use is
decided by the tier of the app, not by preference.

## Rules

1. **One accent, one solid fill per screen.** `.dcs-btn-primary` is the verb
   that runs the tool; additive actions use `.dcs-btn-soft`.
2. **Signal colors are status, never decoration.**
3. **Named durations only** — `--dur-tint` (hover/color), `--dur-move` (chrome),
   `--dur-beat` (a result arriving). Tools do not invent durations.
4. **The bare node-icon name is the resting state.** Brightness (`-active`,
   `.is-called-out`) is rationed: the folder you are inside, the selected row, a
   filter match. If everything is active, nothing is.
5. **No hex literals in tool chrome.** Document any exemption where it lives,
   with a reason.
6. **Compose from existing classes and modifiers.** Do not invent component
   classes; do not inline a value a token already covers.
7. **A consumer that vendors this file treats it as read-only** and puts every
   deviation in a sibling overrides file, commented.
8. **A component embedded in a host app reads the host's tokens and never
   declares them.** Keep the token *names* even when values travel inline —
   `var(--bg-1, #1a1d23)` fallbacks are for standalone use only.

## Consumers, and the drift this folder exists to stop

Before this folder existed there was no canonical copy, and the token set had
already diverged three ways:

| Consumer | How it consumes | State when this folder was created |
| --- | --- | --- |
| `halo-banner/dcs-workbench.css` | vendored file, inlined into the payload by `inline-css.py` | the snapshot this folder was seeded from |
| `sp-dcspad` `styles/app.css` | its own `:root`, predating the system | 104 tokens · **85 shared** · 18 system-only · 19 pad-only |
| `dcs-file-picker` `src/styles.js` | the `dcs` theme transcribes ~12 token *fallback values* into template-literal strings | comment points at a `dcs-workbench-design-system/tokens/*.css` path that no longer resolves |

Reading the difference:

- **18 system-only tokens** are the `--node-*-active*` pair set — the two-tier
  node-icon addition. DCSPad predates it.
- **19 pad-only tokens** split three ways: six are JS-set layout variables
  (`--sidebar-w`, `--diag-h`, `--editors-w`, `--preview-h`, `--runtime-w`,
  `--diag-fs`) which are correctly *not* design tokens; five are transition and
  scan aliases (`--t-*`, `--dur-scan`); and the remaining eight are genuine
  tokens DCSPad added and the system never absorbed — `--ft-sp-*` (the
  SharePoint file badge triple), `--accent-soft-fg-hi`, `--accent-soft-hover`,
  `--info-fg`, `--logo-dim`, `--radius-pill`.

**That last group is the actual backlog**: decide which belong in the system,
add them here, and let DCSPad's `:root` shrink toward this file. Do not do it
piecemeal from inside DCSPad — that is how the drift happened.

## Provenance — read before making system-level changes

`dcs-workbench.css` here is a **byte-identical copy of
`halo-banner/dcs-workbench.css` at commit `07a46f6`**, promoted to canonical
because no standalone design-system repository could be found.

`dcs-file-picker/CLAUDE.md` previously referenced a repo at
`C:\dev\repos\dcs-workbench-design-system` described as holding "tokens, the
`.dcs-*` component sheet, and the embedding rules". The vendored snapshot covers
the tokens and the component sheet. **If that repository does turn up, it may
hold embedding rules and docs this file does not** — reconcile before treating
this folder as complete:

- [ ] diff its stylesheet against `dcs-workbench.css` here; this copy wins only
      where it is genuinely newer
- [ ] import any embedding rules / docs it has that are missing here
- [ ] fold in the eight pad-only tokens listed above, or record why not
- [ ] retire the old repo so there is exactly one home again

## Open items

- **No version stamp.** The header says `v1.0` and nothing enforces it. The BSP
  repo's pattern is worth copying: a `VERSION` file as the source of truth, a
  script that stamps it into each shipped file's banner and into a
  `--ds-version` custom property, and a deploy that refuses a dirty tree or a
  stamp mismatch — so a live page can report its own version. Nothing here does
  that yet.
- **No Alpine state contract.** Now that Alpine is viable in this hosting model
  ([`../docs/06-alpine.md`](../docs/06-alpine.md)), the system should document
  which classes and attributes bindings are expected to drive — `.is-active`,
  `.is-dragging`, `[aria-current]`, `[aria-pressed]`, `:disabled` — the way BSP
  documents its own. Without it every tool invents its own vocabulary and the
  familiarity argument for adopting Alpine decays.
- **Halo still vendors its own copy** rather than referencing this one. That is
  correct for now: `halo-banner/AGENTS.md` forbids cross-folder dependencies,
  and the tool must survive being pasted whole. The difference is that the
  vendored copy now has a named upstream to re-sync from.
