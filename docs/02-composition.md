# 02 · Composition — how an app is broken up

The shape of the code inside `src/`. Follow this and a developer who knows one
DCS app can navigate a new one without a tour.

## The archetype

An L1 app's `src/` sorts into five kinds of module. Name files after the
responsibility, not the layer.

| Kind | Examples | Rule |
| --- | --- | --- |
| **Bootstrap** | `main.js` | Exactly one. Imports everything, wires it, owns startup order. No business logic. |
| **Seams** | `state.js`, `config.js`, `io.js` | One module per external boundary. Nothing else may touch that boundary. |
| **Clients** | `sp-odata.js`, `sp-rest.js`, `sp-write.js`, `sp-files.js` | Know protocols. Know no DOM. |
| **Views / panels** | `views/*.js`, `console-panel.js`, `layout.js` | Own a region of the screen. Receive dependencies; never reach for globals. |
| **Pure logic** | `field-editor.js`, `canvas.js`, `perm-kinds.js`, `scriptgen.js`, `page-export.js`, `util/paths.js` | No DOM, no network, no storage. Fully unit-testable. |

Keep modules small enough to read in one sitting. In `sp-dcspad` the median
module is ~200 lines; the two that broke 800 (`main.js`, `docs.js`) are the ones
people complain about. When a module passes ~400 lines, look for the pure-logic
half hiding inside it and lift that out first.

## The bootstrap module

`main.js` reads top to bottom as the startup sequence, and that is its whole
value. The pattern:

```js
applyBuildMarker();                       // 1. stamp the build so bug reports carry it
const splashApi = showSplash();           // 2. show something immediately
splashApi.status('Restoring workspace…');
const configReady = loadAppConfig();      // 3. start async work, don't await yet
const state = getState();
const ctx = applyContextIndicators();     // 4. establish SharePoint context + chip

const layoutApi = initLayout({ … });      // 5. init subsystems in dependency order,
const editorsApi = await initEditors({…});//    updating splash status as you go
…
splashApi.ready();                        // 6. hand over
```

Rules:

- **Kick off async work early, await it late.** `loadAppConfig()` starts before
  the editors initialize and is awaited only where its values are needed.
- **Update the splash at every slow step.** A named wait is a wait; an unnamed
  one is a hang.
- **Subsystems get callbacks, not each other.** `initLayout({ onEditorTabChange })`
  — layout does not import editors.
- **Nothing below `main.js` calls `main.js`.** The graph is a tree.

## Views are factories

Every view in an L1 app is a factory with one shape:

```js
create({ client, navigate, …deps }) => { el, load(route), destroy?() }
```

- `el` is the view's root element, created once and reused.
- `load(route)` is called every time the view is landed on. It takes the route
  object, so a view can be deep-linked to a specific list, page, or folder.
- `destroy()` is optional and used when the inspected target changes wholesale.

**Views never reach for shell element IDs.** Everything arrives through `deps`.
That is what lets the SP Workbench's views be mounted later inside DCSPad's
sidebar without rewriting them — the seam is already there.

## Routing

Routes are **plain objects kept in memory**, `{ view: 'lists', listId: '…' }`,
and remembered per tab in `sessionStorage`.

> **Do not bind routing to `location.hash` or push history entries.** The host
> is a modern SharePoint page whose SPA router owns the URL. Touching it means
> fighting that router, and losing.

`sessionStorage` is the one storage exception to the single-seam rule (see
below): it is per-tab ephemeral UI state, not user data, and keeping it out of
the durable seam is what makes that seam swappable.

The shell owns: the rail, the view host, instance caching, `navigate(route)`,
`restore()` (re-land on the remembered route at boot), and `reset()` (drop every
cached instance — used when the inspected site changes, because everything the
views cached belongs to the old site).

## Seams

A seam is a module that is the **only** code allowed to touch one external
thing. The point is that replacing that thing is a one-file change.

### Storage — one module, three documents

```
state.js  ── localStorage ──┬── workspace   (live, debounced autosave)
                            ├── catalog     (explicit user action, sync write)
                            └── snippets    (explicit user action, sync write)
```

Rules that make it swappable:

- **Deep-merge over defaults on load.** New fields added in a later version must
  appear for existing users, and a corrupt document must fall back to defaults
  rather than throw.
- **Debounce the hot document, write the cold ones synchronously.** Keystroke-
  driven state gets a ~600 ms debounce; documents that change on explicit user
  action do not.
- **Flush on `pagehide`.** Otherwise the last debounce window of edits is
  silently lost when the tab closes.
- **Surface write failures.** A quota error must reach the status bar. Without
  it the indicator sticks at "saving…" and the user closes the tab over unsaved
  work. `saveDoc` returns `false` rather than throwing so callers can decide.
- **Never `throw` out of storage.** Absent or corrupt returns `null`; the caller
  seeds.

Files moving to and from disk go through a separate no-storage module (`io.js`):
it moves bytes, it stores nothing.

### Configuration — an editable document, normalized at the boundary

Runtime locations live in `<app>.config.json`, deliberately **outside the
bundle**, so a SharePoint path can change without a rebuild.

```json
{
  "version": 1,
  "siteURL": "/sites/<Site>/",
  "frameworks": { "prefer": "local", "fallbackToCdn": false, "items": { … } },
  "assets":     { "designSystem": { "prefer": "local", "localBaseUrl": "…", "files": { … } } },
  "docs":       [ { "id": "…", "title": "…", "url": "…", "type": "html" } ],
  "copilot":    { "enabled": true, "url": "…" }
}
```

The loader's discipline is worth copying exactly:

- **Resolve every URL against the config document's own URL**, not against the
  page and not against `import.meta.url`. `new URL(value, configUrl)`. Relative
  paths in config are then relative to the deployment, which is what an operator
  expects.
- **`siteURL` is the base for tenant paths**, so most entries can be written as
  `code/lib/pnp2.bundle.js` rather than repeating the site.
- **Normalize into a frozen shape with total defaults.** Every consumer reads a
  fully-populated object; nobody writes `config?.frameworks?.items?.[id] ?? {}`.
- **Collect warnings, never throw.** A malformed entry is dropped, a warning is
  pushed, and the app starts. A config that fails to load entirely resolves to
  the empty config plus one warning — built-in defaults remain active.
- **Validate hostile-shaped values.** `probeGlobal` is matched against an
  identifier-path regex before it is ever used to walk `window`.

### SharePoint — see [`03-sharepoint-data.md`](03-sharepoint-data.md)

### Files — see [`04-file-broker.md`](04-file-broker.md)

## Descriptors: one source of truth, many outputs

When the same query has to appear in more than one form, define a **descriptor**
and derive every form from it. The SP Workbench passes `{ path, options }` to
the REST client *and* to the script generator, which turns it into PnPjs 2, raw
REST `fetch`, or PnP.PowerShell. One descriptor, four consumers, no second
source of truth.

The same idea applies to exports (a grid's rows → CSV / JSON / Markdown from one
row model) and to page exports (one parsed page → `.md` content and `.json`
raw). Reach for it whenever you notice a shape being rebuilt.

## Errors

Use **one typed error per app with a code vocabulary**, not ad-hoc `Error`s:

```js
class SpFileError extends Error {
  constructor(message, { code = 'sharepoint', status = 0, cause } = {}) { … }
}
```

- `code` is a stable string the UI can branch on — `permission`, `not-found`,
  `conflict`, `network`, `invalid-name`, `too-large`, `outside-root`,
  `metadata-write`. The File Broker keeps its vocabulary in `util/errors.js`.
- **Translate transport status into human sentences at the boundary**, once.
  A shared `requireOk(response, fallback, code)` maps 401/403 → "SharePoint
  denied this request. Check library permissions", 404 → "not found",
  409 → "already exists", and prefers the server's own `error.message.value`
  when there is one.
- **Attach structured detail for forms.** A metadata write failure carries
  `err.fieldErrors = { FieldName: message }` so a form can map failures back
  onto individual editors instead of showing one wall of text.
- **Cancelling is not an error.** A dialog the user dismissed resolves `null`.

## Rendering

Today all four reference apps build DOM imperatively with the same six-line
helper, repeated verbatim in ten files:

```js
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};
```

Conventions that go with it:

- **`textContent` for data, `innerHTML` only for static markup you authored**
  (rail glyphs from a view registry). Never `innerHTML` with a value that came
  from SharePoint.
- **One path from state to screen.** Halo states it as a hard rule: every control
  calls `render()`; no event handler updates preview DOM directly. Follow it —
  it is the reason a new control is three lines instead of a bug.
- **Long listings render incrementally and cancellably.** Append in ~200-row
  `requestAnimationFrame` batches, and invalidate the render token on any
  navigation, mode switch, close, or failure so stale rows cannot appear in a
  new location. Every entry must remain reachable — batching is not truncation.
- **If you cap anything, say so in the UI.** A paging cap or a top-N is a lie
  unless the count is labeled partial.

The duplicated `el()` helper and the ~230 hand-written `addEventListener` calls
across `sp-dcspad/src` are the system's main ergonomic debt. That is the subject
of [`06-alpine.md`](06-alpine.md) — read it before writing a new view.

## Module-level cache busting in source

You will see query strings on relative imports inside `src/`:

```js
import { createGrid } from '../grid.js?v=2';
```

That exists for the **standalone/unbundled** path, where each module is a
separate SharePoint-served file subject to the 24-hour cache. Bump the number
when you change that module. The bundle collapses them all away, so this is
belt-and-braces for local and standalone use — harmless, and load-bearing when
someone opens the unbundled shell against a live library.

## Naming

- Files: `kebab-case.js`, named for what they own (`network-panel.js`,
  `field-editor.js`), not for a pattern (`utils.js`, `helpers.js`, `manager.js`).
- Exported factories: `createX(deps)` returning a plain object of functions.
  No classes for services; classes only for typed errors.
- Init functions: `initX(options)` when the module owns a fixed region of an
  existing shell, `createX(deps)` when the caller mounts the result.
- Globals: `__SCREAMING_SNAKE__` with an app prefix, listed in
  [`01-hosting-and-boot.md`](01-hosting-and-boot.md).
- CSS class prefixes: one short prefix per component (`dfb-` for the File
  Broker, `wb-` for the Workbench shell) so a component embedded in another app
  cannot collide.
