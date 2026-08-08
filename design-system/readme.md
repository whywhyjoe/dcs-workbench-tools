# DCS Workbench Design System

**v1.0 · dark only.** The design system for our internal developer tools.

It is deliberately *not* BMO and not SharePoint: when a page looks like this,
you are inside a specialised instrument built by and for this team. End-user
app UI stays in the BMO design system. This is the other thing.

It is the DCSPad token set, codified — **nothing in DCSPad is deprecated.**
Everything new is additive, and every recommended change to an existing repo is
listed, with a reason, under *Recommended upgrades*.

---

## Sources

| Source | What it gave us |
| --- | --- |
| **Primary** · Claude Design project `c053d346-67f8-4af3-a6c2-a68a59f6e0a9` | The ground truth. `dcs-workbench.css` (the real sheet, tokens and all), the `DCS Workbench Design System` document, the `ComponentGallery`, and the three reference comps: **DCSPad Workbench**, **SP Workbench**, **Compact Tool Pattern**, plus `NodeRow`, `FileGridRow`, `FrameworkRow`, `SnippetRow`, `RailItem`, `SliderField`, `Swatch`. |
| **Codebase** · `whywhyjoe/sp-dcspad` (branch `main`) | The shipping app. Its `styles/app.css` `:root` confirmed every token value; its inline SVG supplied the glyphs the comps did not show; `index.html` supplied the two Microsoft Fluent product marks. See `github.md` for the screen map. |
| **Secondary** · Claude Design project `3d19250c-016d-41a7-add2-19b782d9e2c4` | An earlier compilation of the same system, made without access to the comps or the real sheet. Its token files, letter marks and icon sprite were reused; its reconstructed class names were **discarded** in favour of the real ones. |

**Rule of precedence.** Nothing the primary source decided has been changed.
Where the two sources disagreed — class names, node-fill keywords, shadow token
name, the mono stack — the primary won. Additions are marked `ADDED` in the
token files and listed under *Intentional additions* below.

---

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | Global entry point. `@import` list only — link this one file. |
| `tokens/` | `colors.css`, `typography.css`, `fonts.css`, `spacing.css`, `motion.css`, `elevation.css` |
| `base.css` | Document resets, focus-visible, selection. **Not for web parts.** |
| `dcs-workbench.css` | The component sheet — every `.dcs-*` class, verbatim from the source. |
| `dcs-additions.css` | The six things this compilation added, kept separate on purpose. |
| `assets/dcs-workbench.standalone.css` | The untouched original single-file sheet. **Copy this** into a copy-safe tool. |
| `assets/` | `icons.svg` sprite, `icons.js` (self-injecting), `mark-d/s/i/q.svg`, `mark-instrument.svg`, `fonts/CascadiaCode.ttf` |
| `assets/icons-product/` | The two Microsoft Fluent marks the app uses, quarantined from the icon set — read its README before using them |
| `github.md` | The codebase association and screen map, for one-click upstream sync |
| `guidelines/` | Foundation specimen cards — Colors, Type, Spacing, Motion, Brand |
| `components/` | React primitives, grouped by concern |
| `templates/` | Starting points for consuming projects — `dcspad/` (L1), `sp-workbench/` (L1), `compact-tool/` (L2) |
| `thumbnail.html` | The system's homepage tile |
| `SKILL.md` | Agent-Skills entry point |
| `VERSION` | The shipped version — single source of truth |
| `tools/set-version.py` | Stamps `VERSION` into every shipped file. See *Versioning* below. |

---

## Versioning

`VERSION` is the source of truth. `tools/set-version.py` propagates it into the
two places a **deployed** copy can be read from without git: the `/*! … */`
banner on line 1 of each shipped CSS/JS, and the `--ds-version` custom property
in `tokens/colors.css` and `assets/dcs-workbench.standalone.css`.

```bash
python tools/set-version.py 1.1.0    # set a new version and stamp everything
python tools/set-version.py          # re-stamp current VERSION (repairs drift)
python tools/set-version.py --check  # verify only; non-zero exit on drift
```

Any live page can then answer which version it is running:

```js
getComputedStyle(document.documentElement).getPropertyValue('--ds-version')
```

**Never hand-edit a stamp** — run the script, or the files drift and `--check`
starts failing. `--check` is the deploy gate; run it before shipping. It also
catches a newly added sheet that was never added to the script's `STAMPED` list.

After a bump, **re-sync the consumers that carry their own copy**:

```bash
cp assets/dcs-workbench.standalone.css ../halo-banner/dcs-workbench.css
cd ../halo-banner && python inline-css.py
```

Otherwise Halo ships a stale version string — which is exactly the ambiguity the
stamp exists to remove.

### Components

**controls/** `Button` · `IconButton` · `Segmented` · `Microbar` · `MicrobarValue`
**forms/** `Field` · `Input` · `Textarea` · `Select` · `Toggle` · `Check` · `Slider` · `Swatches` · `ResizeRail`
**navigation/** `Tabs` · `Crumbs` · `Rail` · `RailLabel` · `RailItem` · `RailSep`
**data/** `DataGrid` · `ListRow` · `NodeRow` · `NodeGlyph` · `NodeRoles` · `roleForFile` · `Tree` · `TreeNode`
**feedback/** `Badge` · `Chip` · `CountPill` · `Kbd` · `Notice` · `Toast` · `State` · `Skeleton` · `ScanBar`
**overlay/** `Menu` · `MenuLabel` · `MenuItem` · `MenuSep` · `Dialog` · `TipHost`
**shell/** `AppShell` · `ToolShell` · `Panel` · `PanelTitle` · `Controls` · `ControlGroup` · `ControlRow` · `Canvas` · `Splitter`
**identity/** `Icon` · `PlayGlyph` · `PinGlyph` · `DragGlyph` · `Mark` · `InstrumentMark` · `Wordmark`

> Only capitalised exports reach `window.<Namespace>`. `roleForFile` is a
> function, not a component, so it stays lowercase — reach it as
> `NodeRoles.forFile(name)` when you are reading the global namespace.

Each directory carries a `.prompt.md` per component with a usage example, and
one `@dsCard` HTML showing its states.

---

## Six rules that make everything else fall out

1. **Sharper than its host.** It lives inside corporate SharePoint. It should
   read as a precision instrument dropped onto that page — never as a themed
   SharePoint page, and never as a decorated one.
2. **One accent, used once.** Teal is structural: rails, hairlines, active
   states, glyphs. A solid accent fill appears exactly once per screen, on the
   verb that runs the thing.
3. **Colour is information.** Signals mean status. File type is a colour.
   Folder role is a colour. If a colour tells you nothing, the element is grey.
4. **Hierarchy by surface, not shadow.** Four greys stack: ground, panel,
   chrome, hover. Hairlines separate. One shadow exists and it means "floating
   above the app."
5. **Mono means machine.** Anything a machine produced or will consume —
   paths, GUIDs, sizes, statuses, code — is monospace. Everything a human wrote
   is sans.
6. **Copy-safe by design.** No build step, no CDN, no icon package. A tool can
   be a single HTML file with the tokens pasted inline and still be
   unmistakably part of the family.

---

## Two layers, one vocabulary

Pick before you start — they differ in shell, not in tokens, so a control that
looks a certain way in one looks identical in the other.

**L1 · Workbench.** Multi-pane instruments that take over the page. DCSPad, SP
Workbench, anything with a persistent shell and more than one working surface.
Shell `.dcs-app`: 40px topbar / 1fr work / 24px status. Seat: fixed
`inset: 53px 5px 5px`, radius 6, surround `#101216`. Has splitters, collapsible
panes, a status bar, keyboard shortcuts. Density 22–30px controls, 10px
uppercase panel titles. **Gets a letter mark.**

**L2 · Instrument.** One job, one screen, living inside a single web part in
normal page flow. Shell `.dcs-tool`: 40px head / body, no status bar. Seat: in
flow, own dark ground, 1px border, radius 6 — never full-bleed. Control column
plus optional canvas; stacks below 720px. Density 26–28px controls, 9.5px
uppercase group titles. **No letter — the 2×2 instrument mark instead.**

If an L2 tool grows a second working surface and a status bar, it has become
L1. Give it a letter.

---

## VISUAL FOUNDATIONS

### Colour

One accent hue and nothing else decorative. Solid `--accent` fill appears
**exactly once per screen** — on the verb that runs the tool. Everywhere else
the accent is a hairline, a rail, a glyph, or a soft wash.

- **Surfaces**, four steps in order, never skipped: `--bg-0 #14161b` ground →
  `--bg-1 #1a1d23` panels → `--bg-2 #20242c` chrome → `--bg-3 #2a2f3a` hover.
  Need more contrast? Add a hairline, don't jump a step. `--bg-editor #17191f`
  is the code ground and matches the Monaco theme exactly.
- **Text**, seven steps from `--fg-strong #f2f5fa` down to `--fg-ghost #4a5060`.
  `--fg-faint` is timestamps and hints; it is never body copy.
- **Accent**: `#3fd8b4`, with `-hi` for hover on the fill, `-ink` for text on
  it, and a soft trio (`-soft` / `-soft-line` / `-soft-fg`) that does
  everything the rationed fill cannot.
- **Signals** mean status and never decorate: ok `#57d18a`, warn `#e8b660`,
  error `#ff6b62`, info `#67a7f7`. Each has a wash to sit on — red text on the
  plain panel ground is the anti-pattern.
- **File type**: five buckets only — JS, HTML, CSS, Data, Document. The three
  languages DCSPad edits get their own hue because a JS pane and a CSS pane are
  different places you type. Anything else stays grey; a sixth hue needs a
  sixth pane to justify it. Near relatives inherit (`.ts`→JS, `.scss`→CSS,
  `.svg`→HTML, `.csv`/`.xlsx`→Data).
- **Node glyphs, two tiers.** The bare token name is the *resting* state,
  because rest is what the whole list does. You opt into brightness with
  `-active`, applied by `.is-called-out`, and only for a row that is doing
  something. `--node-js-active: var(--ft-js-fg)`, so a selected file and its
  badge can never drift apart.
- Dark only. There is no light theme and there should not be one — the contrast
  with the host page is the point.

### Type

Two families; **nothing is downloaded**, which is what lets a tool be a
single copyable file. `--sans: "Segoe UI"` for prose and UI labels — every
machine that runs these tools has it, so it is referenced, never shipped. `--mono: "Cascadia Code", "Consolas", "SF Mono", Menlo, monospace`
for anything a machine produced or will consume.

Sans ramp 26/600 section · 17/600 view title · 15/600 dialog & card title ·
13/400 body and menu rows · 12.5/500 buttons and rail items · 11.5/500 field
labels · 10/700 .14em uppercase panel title · 9.5/600 .06em uppercase chip.
Mono ramp 15/700 .02em wordmark · 12.5 code · 12 paths · 11.5/500 sizes and
timestamps · 11/500 .04em status · 10/700 counts · 9/600 .06em file badge.

Panel and group titles are uppercase, 10px (9.5px in L2), 700, `.14em`,
`--fg-dim`. Always — and never for anything longer than three words.

### Space, shape, elevation

2px base, and only these values ship: **2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 20
· 24**. Gutters between panes are always **5px** — that is the splitter track,
a control, not a spacing step.

Three radii, assigned rather than chosen by eye: **3px** rows, badges, tags ·
**4px** buttons, inputs, cards · **6px** the app shell, menus, dialogs ·
**999px** status chips only.

**One shadow**, `0 10px 28px -10px #000d`, and it means "this floats above the
app": menus, dialogs, toasts. Panels never carry it — they are separated by
hairlines and surface steps. Using a shadow to separate two adjacent panels is
the mistake this rule exists to prevent.

**Density tiers**, picked by container and never mixed in one row:
`lg 28` topbar and tool header · `md 26` the default · `sm 22` panel heads and
inline toolbars · `xs 20` escape hatch only, inside an already-tight strip,
welded into one bordered group with glyph-only controls and a `title` on each.

### Cards, borders, hover, press, focus

A "card" here is a panel: flat `--bg-1`, a 1px opaque `--border` hairline,
radius 4 (6 for a shell, menu or dialog), **no shadow**, no gradient, no
coloured left border. Hairlines are opaque (`--border #2a2e38`), never `rgba` —
they must read identically over every surface step. Interactive edges step up
to `--border-strong #3a4150`.

**Hover changes colour, never size.** No transform, no shadow, no border-width
change — nothing that shifts layout. Row tools fade in with `opacity`, not
`visibility`, so they stay clickable and testable. Selected rows keep a
*resting* state (accent rail + chrome ground) so selection survives losing
hover. Press is the same wash one step darker; there is no scale-down.

Focus is `:focus-visible` only: `--accent-soft-line` outline plus a 2px
`--accent-ring` wash. Mouse clicks never light a ring.

### Backgrounds, transparency, imagery

No images, no gradients, no textures, no blur. Depth comes from four flat
greys, hairlines, and the one shadow. The only patterned surface in the system
is the L2 canvas stage: a 24px hairline lattice, so an artboard's real edges
read against the dark ground. Transparency appears in exactly four places: the
shadow, the dialog backdrop (`#0a0c10cc`), the skeleton shimmer (`#ffffff0d`),
and disabled opacity. **There is no photography and no illustration anywhere in
this system — including in empty states, deliberately.** Layout is fixed
chrome: the topbar, status bar and panel heads never scroll; only panel bodies
do.

### Motion

Four beats, nothing outside them, because motion in a developer tool is
feedback rather than personality: **tint 120ms** (hover, focus, colour only —
never moves anything) · **move 220ms** (a panel opens, a menu drops) ·
**beat 460ms** (a result arrived; once per event, never on a timer) ·
**scan 820ms** (work in progress; loops only while genuinely pending).
Easing is `cubic-bezier(.35, 0, .25, 1)`.

Non-negotiable: no entrance animation on page load beyond the splash; no
animation that loops when nothing is pending; no layout-shifting hover; every
tool ships the `prefers-reduced-motion` kill switch. DCSPad's boot twinkle is
the single exception — it fires once, at launch, and never loops.

---

## ICONOGRAPHY

**There is no icon package.** Tools get copied around and inlined; a CDN icon
font would drift or break. So icons are inline SVG and consistency comes from
one hard rule instead of one library.

- **A 16 grid at stroke 1.4, or a 24 grid at stroke 2.** Both land on a ~1.35px
  line at 15–16px, so the two mix cleanly on one row.
- `fill="none" stroke="currentColor"`, stroke-width 1.4 (1.3–1.5 acceptable),
  round cap and join.
- **Colour comes from the parent's `color`.** Never hard-code a hex on a glyph.
- Always `aria-hidden="true"`; the accessible name lives on the button.
- **Copy from DCSPad first, [Lucide](https://lucide.dev) second, draw third.**
  DCSPad's hand-built 16-grid glyphs are already correct and are not worth
  redrawing. Lucide's folder, file, folder-open, download, upload, trash and
  star are better drawn than the originals and were swapped in. Paste Lucide
  SVG as-is — keep its `viewBox="0 0 24 24"` and `stroke-width="2"`, set
  width/height to 15–16, delete the class attributes. Do not install the
  package; do not fetch from a CDN.
- **No emoji. Ever.** Emoji folder icons are exactly what the node glyph system
  replaced. No filled glyph among the line ones either — the one exception is
  the solid play triangle (`PlayGlyph`) on the Run verb.
- **The set is the app's own, extracted from `whywhyjoe/sp-dcspad`.** Every
  glyph the shipping UI inlines is in `Icon` — including the ones the comps
  never showed: the three pane toggles, word-wrap, the REPL return arrow,
  sun/moon for the preview theme, the project-name pencil, the pin, the
  library stack, minus, chevron-up and the workbench mark.
- **Two filled exceptions besides the play triangle**, because the app cannot
  express them as strokes: `PinGlyph` (a pinned framework) and `DragGlyph`
  (the six-dot reorder handle). Nothing else fills.
- **One gear, and it is Lucide's.** The shipping app's topbar uses Microsoft's
  filled Fluent gear; this system does not. `<Icon name="settings" />` is the
  single gear — outline, 24 grid, stroke 2 — and `advanced` (the SP Workbench
  rail's last item, drawn in the app as a circle with eight rays that reads as
  a sun at 15px) is an alias of it. Two shapes for one idea is the drift this
  rule prevents.
- **Microsoft product marks are not system glyphs.** `assets/icons-product/`
  and `<ProductGlyph name="copilot" | "sharepoint" />` hold the two that
  remain. They are filled or foreign-gridded, and they are trademarks — use
  them only where the control opens the Microsoft product they name, and never
  recoloured into the accent.
- **The SharePoint mark is a system glyph** — `<Icon name="sharepoint" />`, the
  glyph on the topbar's *Open SP Workbench* button, between Copilot and
  Settings. It is the one product mark drawn to the system's own rule (24 grid,
  stroke 1.5, currentColor), so it mixes cleanly with the rest; it is also a
  copy in `assets/icons-product/sharepoint.svg`. Trademark rules still apply:
  only where the control opens SharePoint. What is *not* here is the suite bar
  chrome — waffle, search, account — which the host page renders and the app
  never draws.
- **`<fluent-icon>` is a preview-frame feature, not a system component.**
  `src/bridge/fluent-icon-font.js` registers a custom element that maps
  `name="chevron-down-20-regular"` onto a Fluent icon-font class, injected into
  the *user's* preview document when the Fluent Icons framework is enabled. It
  styles what users build in DCSPad — it never styles DCSPad itself, and it is
  not a licence to use an icon font in a tool.
- Three ways to ship the same shapes: `<Icon name="…">` from the bundle,
  `assets/icons.svg` as a `<symbol>` sprite for a repo-backed tool, or
  `assets/icons.js` — the same sprite, self-injecting, for pages that cannot
  reference an external `<use>` target.

**Nodes: folders carry role, files carry type.** Both are the Lucide folder and
file outlines, each a single closed path so the tint fill and the stroke ride
the same edge. Colour is *meaning*, not decoration — if a row's colour tells
you nothing, it is grey.

**Brand marks.** No logo file was provided and none was drawn. Identity is a
letter on a 4 × 5 pixel grid inside a tinted tile (`Mark`, and static copies in
`assets/mark-*.svg`), the 2×2 instrument mark for L2 (`InstrumentMark`), and
the split-weight mono wordmark (`Wordmark`). Anywhere a logo would go, set the
tool's name in the mono wordmark.

---

## CONTENT FUNDAMENTALS

The copy voice is a good engineer explaining a thing once, precisely, and then
stopping.

- **Sentence case everywhere** except panel/group titles and chip labels, which
  are uppercase with tracking. Never title case.
- **Second person, implied.** "Enter an absolute https:// URL on this tenant."
  Not "Please enter…", not "The user must enter…". No "we".
- **Say the system state, not a feeling.** "403 — the request digest expired.
  Retrying once." Not "Oops! Something went wrong."
- **Lead with the machine fact.** Error strings start with the code:
  `404 — that list does not exist on this web`.
- **Empty states are one centred monospace line** that says what would appear
  here and how to make it appear: "Console is clear — console.log from your JS
  lands here." No illustration, no mascot, no call-to-action card.
- **Notices name the specific object.** "This folder already contains a file
  with that name." "Uploaded to /Code/tools/dcspad · v2.0."
- **Truncation and caps are disclosed**, never silent: "Results are capped at
  100 — a nextLink is available."
- **Buttons are verbs**, one or two words: Run, Generate, Inspect, Export JS,
  Save snippet, Add framework. The primary button names the thing it produces.
- **Units and paths inline, in mono**, in the sentence: `243.9 KB · 2026-07-31`.
- **No exclamation marks, no emoji, no jokes in UI copy.** Wit belongs in
  documentation, not in a status bar.
- **Group titles are two words at most** — Site, Content, Tools, Geometry,
  Colour, Output.
- Keyboard convention stated once and honoured everywhere: `Ctrl/Cmd + Enter`
  always runs; `Esc` always steps back one level — closes a menu, then a
  dialog, then un-maximises. Never bind a plain letter key.

---

## Embedding — living inside SharePoint without pretending to be it

**L1 · Takeover.** The suite bar **stays visible**. That is deliberate: it says
"this is running on your SharePoint, under your account." It is desaturated
while the tool runs so it never competes. The app pins itself at
`inset: 53px 5px 5px` and paints the surround itself with
`box-shadow: 0 0 0 100vmax` — SP wrappers behind the gap have white backgrounds
you cannot chase class-by-class. No outline on the app: the 5px gap and the 6px
radius do that work. **Always ship a *suspend* path** — when the host page
enters edit mode, hide the tool and revert the global `html`/`body` overrides,
or the editor canvas goes dark and unscrollable.

**L2 · In a web part.** Scope every rule. Never set `html`, `body`, or bare
element selectors — the host page owns those, and a stray
`body { overflow: hidden }` makes the whole page unscrollable. Declare tokens on
the tool root, not `:root`: `.dcs-tool { --accent: … }`. That also lets two
tools coexist on one page. Set an explicit min-height so the canvas doesn't
collapse before content arrives, and stack the controls above the canvas below
720px.

> **On drift.** Tools built with this system will be copied, inlined, and
> edited in place. That is fine and expected. The contract is only this: **keep
> the token names**, even when you paste the values inline. A copy whose
> `--accent` has drifted to a slightly different teal still looks like part of
> the family; a copy that renamed it to `--brand-green` can never be swept back
> in.

`base.css` is for L1 takeover pages, the specimen cards, and the templates. **An
L2 web part imports `tokens/*.css` + `dcs-workbench.css` (+ `dcs-additions.css`)
only.**

---

## Do / don't

| Topic | ✓ | ✕ |
| --- | --- | --- |
| Accent budget | One solid accent fill per screen — the Run / Generate / Upload verb. Everything else accented uses rail, hairline, soft wash, or glyph. | Two filled accent buttons in the same view. If both matter, the secondary becomes `.dcs-btn-soft`. |
| Surfaces | Step bg-0 → bg-1 → bg-2 in order, separated by a 1px `--border` hairline. | Invent a fifth grey, or use a shadow to separate two panels. Shadow means floating, not adjacent. |
| Density | Match the tier to the container: 28 topbar · 26 default · 22 panel head · 20 only inside an already-tight strip, welded into one bordered group with glyph-only controls and a title on each. | Mix tiers in one row, or reach for 20px because a layout is crowded. A crowded layout is a layout problem. |
| Labels | Panel and group titles are uppercase, 10px, 700, .14em, `--fg-dim`. Always. | Sentence-case panel titles, or uppercase for anything longer than three words. |
| Numbers and paths | Monospace, right-aligned when they are quantities, copyable when they are identifiers. | Set a GUID, size or server-relative path in the sans stack. It stops being scannable. |
| Empty states | One centred monospace line stating what would appear here and how to make it appear. | An illustration, a mascot, or a call-to-action card. |
| Errors | Error text on `--error-bg` with an `--error` inset rail. The count pill on the tab tells you where. | A modal for a recoverable error, or red text on the plain panel ground with no wash behind it. |
| Icons | 16-grid, 1.4 stroke, currentColor, round joins. Copy from DCSPad first, Lucide second. | Emoji, a webfont, a CDN sprite, or a filled glyph among the line ones. |
| Colour meaning | Colour a row only when the colour answers a question the label does not. | Rainbow a list for visual interest. Twelve hues in a sidebar is noise, not a taxonomy. |
| Scoping in a web part | Declare tokens on the tool root and prefix every selector. | Touch `html`, `body`, or bare element selectors. You will break the host page for everyone. |

---

## Recommended upgrades

Changes to **your existing repos** — DCSPad, SP Workbench, Halo — not to the
system sheet. Everything they call for already exists in `dcs-workbench.css`;
the work is adoption.

| # | Change | Where | Effort |
| --- | --- | --- | --- |
| 01 | Coloured node glyphs everywhere a file tree appears — the SharePoint files dialog, the Browser picker, SP Workbench's Files grid. One shared helper, one role/type lookup. | `sp-files.js`, `workbench/files.js`, `app.css` | Small |
| 02 | Adopt the slider in Halo. `.dcs-slider` already ships; swap Halo's bespoke range rules for it. | Halo generator | Small |
| 03 | Group labels on the SP Workbench rail — Site / Content / Tools. One array change. | `workbench/shell.js`, `workbench.css` | Small |
| 04 | A page-shell header for SP Workbench views: persistent breadcrumb bar, then eyebrow + title + hint per view. | `workbench/shell.js`, `workbench.css` | Medium |
| 05 | Data-grid spec — accent underline on the sorted column, right-aligned mono quantities, copyable identifiers, no zebra. | `workbench.css` `.wb-table` | Medium |
| 06 | The `.dcs-tool` shell for compact tools, plus the control-group primitives. | `dcs-workbench.css` | Medium |
| 07 | Skeleton loading for the Files and Lists grids, in the grid's own shape. | `workbench/grid.js` | Small |
| 08 | Two more file-type triples — json/data and doc. | `app.css :root` | Trivial |
| 09 | Named motion durations — `--dur-tint` / `-move` / `-beat`. | `app.css :root` | Trivial |

Items 03, 04 and 05 are applied in `templates/sp-workbench/`; 08 and 09 are
already in this system's token files.

---

## Intentional additions

Everything else is transcribed. These are the only things added, and each one
is a name for something the source already did:

1. **`dcs-additions.css`** — `.dcs-work` (the 1fr band of the L1 shell, which
   the source's grid declares but never names), `.dcs-kbd-inline` (the dimmed
   mono shortcut inside a button), `.dcs-mark` / `.dcs-mark-2x2` (the mark spec,
   rendered as classes), `data-type="doc" | "pdf" | "sp"` on the badge —
   the tokens for both already existed and the gallery paints those two pills
   inline — and a `button.dcs-noderow` reset, because the React `NodeRow` is a
   real button while the source comp drew it as a `<div>`.
2. **A universal `:focus-visible` rule** (`base.css`). The token
   (`--accent-ring`) and the field treatment already existed; what was missing
   was one rule covering every control. Colour + ring, no size change.
3. **`assets/icons.js`** — the sprite, self-injecting, for the single-file and
   sandboxed cases where an external `<use>` target does not resolve. No new
   geometry.
4. **Named ramp, scale and density tokens** (`--t-*`, `--s-*`, `--h-*`) — names
   for the exact sizes the source specimen lists, so a tool stops re-typing
   `font: 700 10px/1 …`.
5. **Four rail glyph names** — `site`, `pages`, `query` copied verbatim from
   the SP Workbench comp into `Icon` and both sprites, so the rail does not
   need locally-drawn SVG; `advanced` resolves to the system gear rather than
   the comp's circle-with-rays (see § Iconography).
6. **Ligatures, stated.** `--mono-ligatures` / `--mono-features` in
   `tokens/typography.css`, applied by `base.css` (`body, body *`, plus the
   `code/kbd/samp/pre` rule) and, for a web part that cannot ship `base.css`,
   by `dcs-additions.css` § 6 on `.dcs-app` / `.dcs-tool` and their
   descendants. Cascadia Code's `=> !== <= ->` are contextual alternates: on
   by default, but `input`, `textarea` and `select` opt out on their own and a
   host page can switch them off. The selectors are deliberately *not*
   `:where()` — the `font:` shorthand resets `font-variant-*` and
   `font-feature-settings`, so a zero-specificity rule is wiped out by every
   `font: var(--t-*)` in the sheet; matching (0,1,0) and importing
   `dcs-additions.css` last is what makes it land. `.dcs-liga` opts in outside
   a shell; `.dcs-liga-off` is the escape hatch for a character-by-character
   diff.

---

## Caveats

- **No logo file was provided and none was drawn.** The letter marks are the
  4 × 5 grid strings the source document specifies, rendered — they are the
  spec, not an interpretation.
- **One webfont, added on request.** The system references installed fonts by
  design, so a tool can be a single copyable file. `tokens/fonts.css` is the
  one exception: the real **Cascadia Code** (variable, weight 200–700) from
  `microsoft/cascadia-code`, SIL OFL 1.1. The `src` leads with
  `local("Cascadia Code")`, so an installed copy still wins and a tool pasted
  somewhere without the file falls back to Consolas / SF Mono / Menlo exactly
  as before. **Segoe UI is simply referenced** — it is on every machine that
  runs these tools, so there is nothing to ship.
- **`dcs-workbench.css` is the source sheet verbatim**, minus its `:root` block,
  which moved to `tokens/*.css` so the compiler can index it. No value, name or
  rule was altered. `assets/dcs-workbench.standalone.css` is the untouched
  original.
- **The L2 comp inlines its own round-thumb slider** (`.hslider`) which differs
  from `.dcs-slider` in the sheet. The kit uses the sheet's version, since that
  is the named component; flagged rather than reconciled.
- **Contrast, flagged not changed:** `--fg-faint #6d7484` on `--bg-1` measures
  ≈3.5:1 — under WCAG AA for body text, fine for the incidental use the system
  assigns it. The rule that it is never body copy is doing real work.

---

## Review notes · 2026-08-02

Findings from a full audit, left as open decisions — none is a defect that
breaks anything today. A future maintainer (human or LLM) should decide each
on its merits; the verbatim-sheet contract (see § Caveats) is the constraint
that kept them unfixed.

1. **Bare element selectors vs the L2 scoping rule.** `dcs-workbench.css` sets
   `* { box-sizing }`, `[hidden]`, `kbd`, `a`, and global `::-webkit-scrollbar`
   rules, yet § Embedding tells an L2 web part to import that sheet into a host
   page whose own rule is "never touch bare element selectors." Options: caveat
   it in § Embedding, or ship a scoped variant of the sheet (every bare selector
   prefixed with `.dcs-tool`). The sheet is verbatim, so the fix belongs in a
   new file, not in place.
2. **`.dcs-canvas-stage` comment says "8px lattice"; the grid it draws is 24px**
   (`background-size: 24px 24px`, and 24 is what the readme specifies). The
   comment is inside the verbatim sheet, so it was flagged rather than edited —
   it is almost certainly an upstream comment bug, safe to fix in both sheet and
   standalone if verbatim is relaxed for comments.
3. **`--accent-soft-hover` and `--accent-soft-fg-hi` are defined but unused.**
   They were ADDED to name the `#25473f` / `#8fe8d1` that `.dcs-btn-soft:hover`
   hardcodes — but the verbatim sheet cannot adopt them, so the token and the
   hex can drift apart silently. Either wire the sheet to the tokens (one-line
   change, breaks verbatim) or accept the tokens as documentation only.
4. **Sprite parity gap for the filled glyphs.** `dcs-play` (filled) is in both
   sprites, but `PinGlyph` (filled) and `DragGlyph` (six-dot handle) have no
   sprite symbols — only the stroke `dcs-pin` exists. "Three ways to ship the
   same shapes" (§ Iconography) does not fully hold for the filled exceptions.
   Fix: add `dcs-pin-filled` and `dcs-drag` symbols to `assets/icons.svg` and
   `assets/icons.js`.
5. **Dialog action rows mix density tiers.** `.dcs-btn-primary` is hardcoded to
   28px, so every dialog seats a 26px Cancel beside a 28px primary — technically
   against "never mix two tiers in one row." Almost certainly intended (the
   primary is always lg); the cheap fix is one sentence in § Space documenting
   the exception, the strict fix is `size="lg"` on dialog secondaries.
6. **`.dcs-chip` is `cursor: pointer` even when the chip is not clickable** —
   inherited from the source sheet, where the status chip opens a menu. If a
   tool renders an inert chip, it will look clickable.
7. **Screenshot-tool artifacts, not bugs** (recorded so nobody re-chases them):
   DOM-recreation captures (html-to-image and similar) draw `.dcs-slider` as a
   round native blue thumb and sometimes wrap button labels. The live DOM is
   correct — verified computed styles: `appearance: none`, 5×12 accent thumb,
   no wrapping.

Resolved in the same audit (already applied): stale "three/four things" counts
in `dcs-additions.css` and this file; `tokens/typography.css` claiming no
@font-face exists; "four rail glyphs copied verbatim" (only three are —
`advanced` aliases the gear); `SKILL.md` casing of `readme.md`; the three
`ui_kits/` screens converted to `templates/` and the deprecated
`@startingPoint` tags removed.
