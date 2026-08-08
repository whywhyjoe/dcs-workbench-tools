# 05 · Which design system, and the rules that come with it

There are **two** design systems, they are not interchangeable, and which one
applies is decided by audience, not taste.

| System | For | Register | Where |
| --- | --- | --- | --- |
| **DCS Workbench** | internal developer tooling | dark only, dense, one accent | `whywhyjoe/dcs-workbench-design-system` — see [`../design-system/`](../design-system/README.md) |
| **BSP / BMO** | employee-facing pages and apps | light, branded, warm editorial mode available | `bsp-design-system` repo |

**Both ship a Claude skill.** For DCS Workbench it is `dcs-workbench-design`
(user-invocable, declared in the repo's `SKILL.md`). If you are designing an
interface rather than looking up one token, **invoke the skill** — it carries
the guidelines, specimen pages, brand marks, fonts, and templates that no
summary here can replace.

Everything in this doc set — DCSPad, the SP Workbench, Halo, the File Broker —
is a developer tool and uses **DCS Workbench**. If you are building something
employees will see on an intranet page, you are in BSP territory and should read
that repo's `CLAUDE.md`, `docs/PAGE-TEMPLATE.md`, and
`docs/TECHNICAL-REFERENCE.md` instead of improvising from this one.

This doc is a pointer plus the rules that apply either way. It is not a
substitute for either system's own reference.

---

## DCS Workbench design system

Dependency-free, copy-safe: no build, no CDN, no icon package, no `@import`.
Drop the file in, or paste the `:root` block plus the components you use.

### The two layers, matching the app tiers

- **L1 · Workbench** (`.dcs-app`) — full-screen takeover under the SharePoint
  suite bar. Topbar (40px) · work area · status bar (24px) in a CSS grid.
  Panels, splitters, nav rail, data grid, tree, node rows.
- **L2 · Instrument** (`.dcs-tool`) — a single-purpose tool inside one web part,
  in normal flow. No takeover, no status bar, no splitters. Head, controls
  column, canvas. It paints its own dark ground so it reads as an instrument
  dropped onto the page, not as a themed page.

Both consume the same token set. The hosted pinning rules
(`html.dcs-hosted .dcs-app`) live in the stylesheet — see
[`01-hosting-and-boot.md`](01-hosting-and-boot.md) for why they matter.

L1 gets a **letter mark**; L2 gets the **2×2 instrument mark**. If an L2 tool
grows a second working surface and a status bar, it has become L1 — give it a
letter. That is the design system's own restatement of the tier test in
[`00-system-model.md`](00-system-model.md), and the two agree.

### What to link

| Building | Link |
| --- | --- |
| L1 workbench | `styles.css` — the whole system, `base.css` included |
| L2 instrument | `tokens/*.css` + `dcs-workbench.css` (+ `dcs-additions.css`); **skip `base.css`** |
| single-file pasted tool | `assets/dcs-workbench.standalone.css`, inlined |

### Embedding rules

- **L1**: the suite bar deliberately stays visible (desaturated) — it says "this
  is running on your SharePoint, under your account". Pin at
  `inset: 53px 5px 5px`, paint the surround with `box-shadow: 0 0 0 100vmax`,
  and **always ship a suspend path** for edit mode.
- **L2**: never set `html`, `body`, or bare element selectors, and declare
  tokens on `.dcs-tool`, not `:root`. Two tools then coexist on one page, and no
  stray `body { overflow: hidden }` can freeze the host page.

### Token families

`--bg-0…3` and `--bg-editor` surfaces · `--border`/`-strong`/`-mid` ·
`--surround` (hosted ground) · `--fg-strong`/`fg`/`fg-row`/`fg-dim`/`fg-mid`/
`fg-faint`/`fg-ghost` text ladder · `--accent` family · `--ok`/`--warn`/
`--error`/`--info` signal pairs · `--ft-*` file-type badge triples · `--node-*`
icon tiers · `--radius-s/m/l` · `--mono`/`--sans` · `--ease` and
`--dur-tint/move/beat` motion.

### Rules with teeth

1. **One accent, one solid fill per screen.** `.dcs-btn-primary` is the verb
   that runs the tool. Additive actions use `.dcs-btn-soft`. If two things are
   solid accent, neither reads as primary.
2. **Signal colors are status, never decoration.**
3. **Named durations only.** `--dur-tint` for hover/color, `--dur-move` for
   chrome, `--dur-beat` for a result arriving. Tools do not invent durations.
4. **The bare node-icon name is the resting state.** Brightness (`-active`,
   `.is-called-out`) is rationed — the folder you are inside, the selected row,
   a filter match. If everything is active, nothing is.
5. **No hex literals in tool chrome.** Colors and durations come from custom
   properties. Document any exemption where it lives and say why.
6. **Compose from existing classes and modifiers.** Do not invent component
   classes, and do not inline a style value a token already covers.
7. **A vendored copy is read-only.** Halo vendors the stylesheet and puts every
   deviation in a sibling overrides file with a comment explaining it. Do the
   same; never edit a vendored kit in place.
8. **A component embedded in a host app reads the host's tokens, never declares
   them.** Keep the token *names* even when values travel inline — that is the
   drift contract (`var(--bg-1, #1a1d23)` is for standalone use only).

### Where the source lives

The standalone repo is canonical. [`../design-system/README.md`](../design-system/README.md)
is a pointer to it and carries the reconciliation record.

The short version, because an earlier revision of these docs got it wrong: the
repo is a **strict superset** of every copy in circulation. Its
`assets/dcs-workbench.standalone.css` is byte-identical to the file Halo
vendors, and every one of DCSPad's 104 tokens already exists upstream. Nothing
has forked, and there is no drift backlog — only one small inconsistency in
`--sans`. Halo correctly keeps vendoring rather than referencing, because an L2
tool must survive being pasted whole and `halo-banner/AGENTS.md` forbids
cross-folder dependencies; it now just has a named upstream to re-sync from.

---

## BSP / BMO design system (employee-facing)

Buildless, CDN-free, self-hosted HTML/CSS/JS that runs inside SharePoint Online.
Read `bsp-design-system/CLAUDE.md` before touching it. In one screen:

- **Link order matters**: `colors_and_type.css` (tokens + base + utilities) then
  `components.css`. `styles.css` is the one-tag bundle of both. `editorial.css`
  is an additive, opt-in layer for warm content pages and loads *after*
  components.
- **One BEM vocabulary on shared tokens.** `block--modifier` built from custom
  properties. Never invent component classes, never raw hex, never redefine
  `:root`.
- **Hand-rolled Fluent 2 + BMO**, not a third-party UI kit. Do not pull in
  Fluent React, Material, Web Awesome, or any icon package.
- **Interactivity is minimal inline Alpine** against a documented state
  contract. Every binding must sit inside an `x-data` ancestor — a bound control
  outside one renders, does nothing, and throws no error. There is deliberately
  no `Alpine.data()` factory layer for trivial controls.
- **Icons**: the durable contract is the name token
  `ic-fluent-{name}-24-regular`, delivered as a sprite `<use>`, the optional
  `<fluent-icon>` element, or the self-hosted Fluent icon font. Size with
  `.icon--N`, never in the name. The complete Fluent library is a separate repo
  deployed as its own top-level folder. BMO's Abacus brand icons are referenced
  by URL on an `<img class="icon icon--24">` and are never sprited.
- **Start from `docs/PAGE-TEMPLATE.md`.** Do not hand-roll a page scaffold.

DCSPad's relationship to it is worth knowing: the pad ships **editor
intelligence** for BSP — generated token/class completion and hover data under
`vendor/intelligence/` — so a developer writing an employee-facing page inside
the pad gets the design system's real vocabulary as autocomplete. That data is
generated from the configured design-system CSS; regenerate it when the CSS
changes.

---

## Cross-cutting rules

- **Absolute or tenant-relative URLs only.** SharePoint does not resolve
  page-relative links reliably. Example pages in both repos use relative paths
  on purpose so they open from disk — **those snippets must be repointed when
  pasted into a real page.** The exception is `url()` *inside* a stylesheet,
  which resolves against the stylesheet's own URL and is what keeps a folder
  relocatable.
- **Retired vocabulary stays retired.** Both systems keep a retired→canonical
  map; check it before reintroducing an old class name you saw in an old page.
- **Verify by opening the page.** Both systems' example pages are self-contained
  and work from `file://`. After a change: every `<use href="#…">` resolves to an
  inlined `<symbol>`, no retired vocabulary remains, and the canonical
  stylesheets are linked in the right order.
