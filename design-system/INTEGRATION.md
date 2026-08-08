# DCS Workbench design system — integration notes

**This folder is the design system.** It was imported from
`whywhyjoe/dcs-workbench-design-system` at commit `5c69a34`, and this repo is now
its home. Make changes here.

> The standalone repo is **superseded**. It still exists and nothing was deleted
> there, but it is no longer the place to edit. If someone pushes to it, the two
> will diverge — fold their change in here and say so.

**For the design system itself, read [`readme.md`](readme.md)** — six rules, the
two layers, visual foundations, iconography, embedding, do/don't. This file only
covers how the folder relates to the rest of the repo.

(This file is `INTEGRATION.md` rather than `README.md` on purpose: the system's
own guide is `readme.md`, and two files differing only in case break on
case-insensitive filesystems — which includes the Windows dev machine.)

## What's here

```
readme.md               THE guide — start here
SKILL.md                user-invocable Claude skill: `dcs-workbench-design`
styles.css              entry point — an @import list only; link this one file
tokens/                 colors · typography · fonts · spacing · motion · elevation
base.css                L1 takeover pages, specimen cards, templates  (L1 ONLY)
dcs-workbench.css       the component sheet
dcs-additions.css       intentional additions on top of the source sheet
components/             controls · data · feedback · forms · identity ·
                        navigation · overlay · shell
guidelines/             22 specimen pages
templates/              dcspad · sp-workbench · compact-tool
assets/                 brand marks, product icons, CascadiaCode.ttf,
                        and dcs-workbench.standalone.css (the paste-inline build)
uploads/                authoring scratch — pasted source images. Not part of the
                        system; safe to prune if you want the ~1.9 MB back.
```

**There is a skill.** `SKILL.md` declares `dcs-workbench-design` as
user-invocable. If you are designing a DCS interface — production or throwaway
mock — invoke it rather than working from a token list.

## What to link

| Building | Link |
| --- | --- |
| L1 workbench (takeover page) | `styles.css` — everything, `base.css` included |
| L2 instrument (inside one web part) | `tokens/*.css` + `dcs-workbench.css` (+ `dcs-additions.css`) — **skip `base.css`** |
| single-file tool pasted whole into a web part | `assets/dcs-workbench.standalone.css`, inlined |

Three embedding rules that are easy to get wrong and expensive to debug:

- **L2 must never set `html`, `body`, or bare element selectors.** The host page
  owns those. A stray `body { overflow: hidden }` freezes the whole SharePoint
  page — the same failure documented from the L1 side in
  [`../docs/01-hosting-and-boot.md`](../docs/01-hosting-and-boot.md).
- **L2 declares tokens on the tool root, not `:root`** — `.dcs-tool { --accent: … }`.
  That is also what lets two tools coexist on one page.
- **L1 must always ship a suspend path.** When the host page enters edit mode,
  hide the tool and revert the global `html`/`body` overrides, or the editor
  canvas goes dark and unscrollable.

**The drift contract:** tools built with this system get copied, inlined, and
edited in place — expected and fine. The only requirement is **keep the token
names**. A copy whose `--accent` drifted to a slightly different teal still
reads as family; one that renamed it to `--brand-green` can never be swept back
in.

## Consumers

| Consumer | How | Notes |
| --- | --- | --- |
| `halo-banner/` | vendors `dcs-workbench.css`, inlined into the payload by `inline-css.py` | Byte-identical to `assets/dcs-workbench.standalone.css`. **Keep vendoring** — `halo-banner/AGENTS.md` forbids cross-folder dependencies and the tool must survive being pasted whole. Re-sync from the standalone build when it changes. |
| `dcs-file-picker/` | the `dcs` theme in `src/styles.js` transcribes token *values* as `var(--x, fallback)` | Reads the host's live tokens; the fallbacks are for standalone use. Update them when a token value changes. |
| `sp-dcspad` (other repo) | its own `:root` in `styles/app.css`, predating the system | All 104 of its tokens exist here. Converging it is optional and not urgent. |

## Reconciliation record — 2026-08-08

An earlier revision of this folder promoted `halo-banner/dcs-workbench.css` to
canonical, believing no standalone repo existed, and recorded a "drift backlog"
of tokens DCSPad had that the system lacked. **Both conclusions were wrong.**
Measured against the real repo before importing it:

| Comparison | Result |
| --- | --- |
| System tokens vs Halo's vendored file | **180 vs 103 — a strict superset.** Zero vendored tokens missing. |
| System tokens vs `sp-dcspad/styles/app.css` | **All 104 pad tokens present.** No orphans. |
| Classes | **140 of 140 shared**, plus 10 system-only (`.dcs-work*`, `.dcs-mark*`, `.dcs-kbd-inline`, `.dcs-liga*`). |
| Token *values* | Identical on every shared token but one — see below. |
| `assets/dcs-workbench.standalone.css` vs Halo's vendored file | **Byte-identical.** |

So nothing had forked. Halo was carrying the system's own paste-inline build,
and the apparent backlog was an artifact of comparing DCSPad against that
single-file subset rather than against the system, which had already absorbed
DCSPad's additions (`--ft-sp-*`, `--accent-soft-hover`, `--radius-pill`,
`--logo-dim`, the `--t-*` type roles, and the JS-set layout variables).

### `--sans` — fixed on import

`tokens/typography.css` had dropped `system-ui` from the stack while every other
copy kept it. Harmless on Windows, a visible fallback change anywhere else.
Resolved in favour of the majority; all five copies now read:

```css
--sans: "Segoe UI", system-ui, sans-serif;
```

(`tokens/typography.css`, `assets/dcs-workbench.standalone.css`,
`halo-banner/dcs-workbench.css`, Halo's inlined `<style id="dcs-workbench">`,
and `sp-dcspad/styles/app.css`.)

## Open items

- **No version stamp.** Nothing ties the split sheets, the standalone build, and
  the copies inlined into shipped tools to one version. The `bsp-design-system`
  pattern is worth copying: a `VERSION` file as source of truth, a script that
  stamps it into each file's banner and into a `--ds-version` custom property,
  and a deploy that refuses a stamp mismatch — so a live page can report which
  version it is running. This is the thing that prevents the next round of
  "which copy is this?".
- **No Alpine state contract.** Now that Alpine is viable in this hosting model
  ([`../docs/06-alpine.md`](../docs/06-alpine.md)), the system should document
  which classes and attributes bindings drive — `.is-active`, `.is-dragging`,
  `[aria-current]`, `[aria-pressed]`, `:disabled` — as BSP documents its own.
  Without it every tool invents its own vocabulary.
- **Skill discovery.** `SKILL.md` sits at `design-system/SKILL.md` now rather
  than at a repo root. Confirm it is still discovered where you expect it to be
  invoked from.
- **`uploads/`** is authoring scratch (~1.9 MB of pasted images). Prune if you
  want the space.
