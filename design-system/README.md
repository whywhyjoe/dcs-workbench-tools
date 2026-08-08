# DCS Workbench design system — where it lives

**The design system is its own repository: [`whywhyjoe/dcs-workbench-design-system`](https://github.com/whywhyjoe/dcs-workbench-design-system).**

This folder is a pointer, deliberately. It holds **no CSS** — a copy here would
be a fourth version of a file that already exists in three places, which is
exactly the problem the upstream repo solves.

## What's upstream

It is a full system, not a stylesheet:

```
styles.css              the entry point — an @import list only; link this one file
tokens/                 colors · typography · fonts · spacing · motion · elevation
base.css                L1 takeover pages, specimen cards, templates  (L1 ONLY)
dcs-workbench.css       the component sheet
dcs-additions.css       intentional additions on top of the source sheet
components/             controls · data · feedback · forms · identity ·
                        navigation · overlay · shell
guidelines/             22 specimen pages — colour, type, space, motion, icons
templates/              dcspad · sp-workbench · compact-tool
assets/                 brand marks, product icons, CascadiaCode.ttf,
                        and dcs-workbench.standalone.css (the paste-inline build)
SKILL.md                a user-invocable Claude skill: `dcs-workbench-design`
readme.md               the authoritative guide — six rules, the two layers,
                        visual foundations, iconography, embedding, do/don't
```

**There is a skill.** `SKILL.md` declares `dcs-workbench-design` as
user-invocable. If you are designing a DCS Workbench interface — production or
throwaway mock — invoke it rather than working from a token list.

## How to consume it

| You are building | Link |
| --- | --- |
| an L1 workbench (takeover page) | `styles.css` — everything, `base.css` included |
| an L2 instrument (inside one web part) | `tokens/*.css` + `dcs-workbench.css` (+ `dcs-additions.css`) — **skip `base.css`** |
| a single-file tool pasted whole into a web part | `assets/dcs-workbench.standalone.css`, inlined |

Two embedding rules that are easy to get wrong and expensive to debug:

- **L2 must never set `html`, `body`, or bare element selectors.** The host page
  owns those. A stray `body { overflow: hidden }` makes the whole SharePoint
  page unscrollable — the same failure documented from the L1 side in
  [`../docs/01-hosting-and-boot.md`](../docs/01-hosting-and-boot.md).
- **L2 declares tokens on the tool root, not `:root`** — `.dcs-tool { --accent: … }`.
  That is also what lets two tools coexist on one page.
- **L1 must always ship a suspend path.** When the host page enters edit mode,
  hide the tool and revert the global `html`/`body` overrides, or the editor
  canvas goes dark and unscrollable.

**The drift contract:** tools built with this system will be copied, inlined,
and edited in place — that is expected and fine. The only requirement is **keep
the token names**. A copy whose `--accent` drifted to a slightly different teal
still reads as family; a copy that renamed it to `--brand-green` can never be
swept back in.

## Reconciliation record — 2026-08-08

An earlier revision of this folder promoted `halo-banner/dcs-workbench.css` to
canonical, on the belief that no standalone repository existed, and recorded a
"drift backlog" of tokens DCSPad had that the system lacked. **Both conclusions
were wrong.** Measured against the actual repo:

| Comparison | Result |
| --- | --- |
| Repo tokens vs Halo's vendored file | **180 vs 103 — a strict superset.** Zero vendored tokens are missing upstream. |
| Repo tokens vs `sp-dcspad/styles/app.css` | **All 104 pad tokens are present upstream.** There are no orphans. |
| Repo classes vs vendored | **140 of 140 shared**, plus 10 upstream-only (`.dcs-work*`, `.dcs-mark*`, `.dcs-kbd-inline`, `.dcs-liga*`). |
| Token *values* | Identical on every shared token but one. |
| `assets/dcs-workbench.standalone.css` vs Halo's vendored file | **Byte-identical.** |

So nothing forked. Halo is not carrying a divergent copy — it is carrying the
repo's own intended paste-inline build. The apparent "drift backlog" was an
artifact of comparing DCSPad against that single-file subset instead of against
the real system, which had already absorbed DCSPad's additions (`--ft-sp-*`,
`--accent-soft-hover`, `--radius-pill`, `--logo-dim`, the `--t-*` type roles,
and the JS-set layout variables).

**The one genuine discrepancy:**

| Token | Standalone / Halo | Repo `tokens/typography.css` |
| --- | --- | --- |
| `--sans` | `"Segoe UI", system-ui, sans-serif` | `"Segoe UI", sans-serif` |

The repo dropped `system-ui`. Harmless on Windows, a visible fallback change
anywhere else. Worth deciding once and making consistent.

## Open items

- **No version stamp.** Nothing enforces a version across the repo, its
  standalone build, and the copies inlined into shipped tools. The
  `bsp-design-system` pattern is worth copying: a `VERSION` file as source of
  truth, a script that stamps it into each file's banner and into a
  `--ds-version` custom property, and a deploy that refuses a stamp mismatch —
  so a live page can report its own version.
- **No Alpine state contract.** Now that Alpine is viable in this hosting model
  ([`../docs/06-alpine.md`](../docs/06-alpine.md)), the system should document
  which classes and attributes bindings drive — `.is-active`, `.is-dragging`,
  `[aria-current]`, `[aria-pressed]`, `:disabled` — as BSP documents its own.
- **Resolve `--sans`.**
- **Re-sync Halo when the standalone build changes.** Halo correctly vendors
  rather than references (`halo-banner/AGENTS.md` forbids cross-folder
  dependencies, and the tool must survive being pasted whole); it just needs a
  named upstream, which it now has.
