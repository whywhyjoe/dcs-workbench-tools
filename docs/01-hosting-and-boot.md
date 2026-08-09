# 01 · Hosting, injection, and boot

How a DCS app gets from a document library onto a page. This is the densest set
of paid-for lessons in the system — most of it is not guessable from first
principles.

## The host

Apps are injected by a **custom-script web part** on a modern SharePoint page
(the Modern Script Editor family). Its *external* mode is what we use: you give
it a **Script URL** pointing at an HTML file; it fetches that file and injects
its contents into the page, re-creating any `<script>` tags it finds.

Consequences that shape everything below:

- You are a guest in someone else's document. `<html>`, `<head>`, `<body>`, and
  the URL belong to SharePoint.
- SharePoint's SPA router changes the URL without reloading the page. Any
  boot-time check of `location` runs exactly once and then goes stale.
- Modern pages ship a **nonce-based `script-src` CSP with no `unsafe-inline`**.
- The web part re-runs its script on re-render. Booting twice is a real event.
- Page **edit mode** must not be taken over, or the web part becomes impossible
  to select and configure.

---

## L1 hosting: the three-file entry

An L1 app has exactly three things between SharePoint and its code.

### 1. `<app>.webpart.html` — the permanent entry

Two meaningful lines. This is the file the web part's Script URL points at, and
**it should never need to change again**:

```html
<div data-<app>-anchor></div>
<script src="https://<tenant>/sites/<Site>/<Container>/<app>/boot.js?v=13"></script>
```

- The anchor is a plain `<div>` — boot writes its edit-mode note there, and a
  `<div>` keeps SharePoint's global link theming and sanitizers away from it.
- The `<script src>` is **the only site-specific line in the entire app**. Every
  other path is resolved from it at runtime.
- "Never needs to change again" holds **per deployment target**. An app that
  ships to more than one — a dev site and a prod site — needs one of these per
  environment, and hand-editing the live copy is a trap: the next deploy copies
  the repo's placeholder straight over it. Generate the file per environment
  instead; see *Deploying to more than one environment* in
  [`08-build-test-deploy.md`](08-build-test-deploy.md).
- The `?v=` is the *only* cache-buster for boot itself, because boot sits below
  the versioning layer it implements. **Changing `boot.js` means bumping `?v=`
  in this file**, or browsers keep the old boot for up to a day.

### 2. `boot.js` — the bootstrap

A **classic script** (the web part injects it as `<script src>`, not as a
module). Its job list, in order, is a checklist for any new L1 app:

```
1.  Edit-mode guard        — if ?mode=edit or /_layouts/, write an inert note
                             into the anchor and return. Do nothing else.
2.  Double-boot guard      — window.__<APP>_BOOTED__; return if already set.
3.  Resolve the base       — document.currentScript.src, sliced to the folder.
                             A folder move then costs one web-part edit, not a
                             source change. Keep a hardcoded fallback for the
                             case where currentScript is unavailable.
4.  Create the mount       — a <div> inserted next to the script if that spot is
                             in the visible canvas, else appended to <body>.
5.  Mark hosted mode       — document.documentElement.classList.add('dcs-hosted')
                             BEFORE the first paint, so the dark underlay covers
                             SharePoint's white canvas immediately.
6.  Paint a curtain        — a dependency-free splash injected before anything is
                             fetched. On a cold SharePoint load this is the only
                             thing explaining an otherwise-blank several seconds.
7.  Watch for edit mode    — patch history.pushState/replaceState and listen for
                             popstate; toggle a .dcs-suspended class on <html>
                             whenever Mode=Edit appears in the URL. (See below.)
8.  Version the assets     — conditional GET each versioned file, read its
                             Last-Modified, use that as its ?v= stamp.
9.  Fetch the shell        — index.html with cache: 'no-store'.
10. Inject the shell       — parse it, append every <body> child except <script>
                             and the standalone splash into the mount; add the
                             stylesheet <link> with its version stamp.
11. Import the bundle      — import(versioned('<app>.app.js')).
12. Fail loudly            — any rejection paints the stage and message into the
                             splash, or a bordered error box as a last resort.
```

`boot.js` also publishes the globals the bundle cannot compute for itself,
because inside a bundle `import.meta.url` points at the bundle, not at `src/`:

```js
window.__DCSPAD_SRC_BASE__   = base + 'src/';  // runtime-fetched source assets
window.__DCSPAD_ASSET_BASE__ = base;           // vendor assets, workers
window.__DCSPAD_CONFIG_URL__ = versioned('dcspad.config.json');
```

New apps should use their own prefix (`__HALO_…`, `__WB_…`) but keep the shape.

### 3. `<app>.app.js` — the bundle

A single-file ESM bundle of `src/`, built by esbuild. It is what the web part
actually runs. `index.html` and the test suites keep loading `src/` unbundled,
so the source stays modular and debuggable. See
[`08-build-test-deploy.md`](08-build-test-deploy.md).

A second entry point (the SP Workbench alongside DCSPad) is the same three files
again with different names — `workbench.webpart.html`, `boot-workbench.js`,
`dcspad.workbench.js` — sharing the same `src/` tree and its own `?v=` bump rule.

---

## Cache discipline — why the bundle exists

Three facts, each proven empirically on this tenant, stack into one conclusion:

1. SharePoint serves library files with `cache-control: public, max-age=86400`.
2. Chrome caches **module-script requests separately from `fetch()`**, so
   revalidating a file with `fetch` does not refresh what `import` uses.
3. The modern page **freezes import-map registration** — a map added after page
   load is silently ignored.

Together: a multi-file ES-module graph served from SharePoint cannot be
reliably cache-busted. Hence the rule:

> **One bundled file behind one versioned URL.** One file = one version = no
> mixed-version module graph.

The versioning mechanism is a conditional GET whose `Last-Modified` becomes the
`?v=` stamp. In DCSPad the versioned list is:

```js
var VERSIONED = [
  'styles/app.css',
  'dcspad.app.js',
  'dcspad.config.json',
  'vendor/intelligence/manifest.json',
  'vendor/monaco/version.json',
];
```

Note the pattern for large vendor sets: **one manifest file versions the whole
set**, so Monaco's runtime, workers, CSS, font, and type declarations always
move together and a worker never resolves against the SharePoint page.

Files outside that list have their own rules:

| File | Policy | Why |
| --- | --- | --- |
| `index.html` | `cache: 'no-store'` | Cheap, and it is the single source of truth for the shell. |
| `boot.js` | `?v=` in `.webpart.html` | It implements the versioning layer, so it cannot use it. |
| runtime-fetched source (e.g. the preview harness) | `cache: 'no-cache'` | Revalidate; a 304 keeps it in step after a deploy. |
| the `.webpart.html` itself | the web part appends its own `?pnp=` timestamp | Handled for you. |

---

## Viewport pinning, and the blank-page trap

**This one cost a live deploy.** An L1 stylesheet styles the whole host page,
not just the app. Unscoped rules at the top of the file —

```css
html, body { height: 100% }
body { overflow: hidden }
```

— apply to the SharePoint page the moment boot injects the stylesheet. The host
page stops scrolling.

Therefore **anything hosted must pin itself over the viewport**:

```css
html.dcs-hosted .dcs-app {
  position: fixed; inset: 53px 5px 5px; z-index: 999;
  height: auto; border-radius: var(--radius-l); overflow: hidden;
  box-shadow: 0 0 0 100vmax var(--surround);   /* paint the surround yourself */
}
```

The `inset` top of `53px` clears the 48px suite bar. `box-shadow: 0 0 0 100vmax`
paints the surround because the SharePoint wrappers behind the gap are white.

Leaving a hosted root in normal document flow produces the specific failure
signature: **blank in view mode, mysteriously fine in edit mode** — because edit
mode applies `.dcs-suspended`, which reverts the host-page overrides. If you see
that signature, this is the cause.

### Edit-mode suspension

Two guards, because there are two ways in:

- **Boot-time** — `?mode=edit` in the query or `/_layouts/` in the path: write
  an inert note and return without booting.
- **Runtime** — SharePoint enters edit mode via SPA navigation with no reload,
  so the boot-time guard never sees it. Patch `history.pushState`/`replaceState`
  and listen for `popstate`; on every change toggle `.dcs-suspended` on `<html>`.
  The stylesheet uses that class to hide the app *and* undo the host-page
  overrides.

---

## The CSP nonce

Modern SharePoint pages ship a nonce-based `script-src` CSP with no
`unsafe-inline`. Two consequences:

1. **Any `<script>` or `<style>` you create must carry the host page's nonce**,
   read from your own script element or from any `script[nonce]` on the page:

   ```js
   var hostNonce = (self && self.nonce)
     || document.querySelector('script[nonce]')?.nonce;
   ```

2. **`about:srcdoc` documents inherit the parent's CSP.** DCSPad's preview
   iframe therefore has to stamp the host nonce onto every script tag it
   assembles, or the frame silently runs nothing — no errors, no messages,
   markup renders fine. Standalone pages have no nonce and the attribute is
   simply omitted.

If your app evaluates strings as code (which is what Alpine's default build
does), **`unsafe-eval` is a separate directive from `unsafe-inline` and its
presence has not been verified here** — see [`06-alpine.md`](06-alpine.md).

---

## L2 hosting: the single payload

An L2 instrument has no boot script and no bundle. It is **one self-contained
HTML payload plus its own runtime script**, pasted whole into a custom-script
web part. Halo is the reference.

### Web-part presentation controls

L2 tools declare their host behavior with an inert custom element the host page
CSS keys off:

```html
<sp-webpart-options hide-in-editmode no-margin></sp-webpart-options>
```

The accompanying `<style>` block implements the attributes with
`:has()` selectors on the web part's own `ControlZone`, and toggles on a
`body.editmode` class the payload sets itself:

```html
<script>
  if (new URLSearchParams(window.location.search).has('Mode')) {
    document.body.classList.add('editmode');
  }
</script>
```

Supported attributes: `hide-webpart`, `show-webpart`, `hide-in-editmode`,
`no-margin`. Reuse this block verbatim; it encodes several rounds of fighting
with SharePoint's edit/preview modes.

### The runtime script

- A **private classic-script IIFE**, not a module. It must survive being
  evaluated more than once on one page.
- Started by a `waitForElement` poll rather than a load event, because the web
  part injects markup asynchronously.
- **Idempotent per root.** Record `initializing` on the root element before
  binding listeners and `ready` after the first render; a second evaluation
  leaves an initialized root alone. If synchronous init throws, remove the guard
  so a corrected runtime can retry.
- Scoping must survive **two instances of different versions on one page**. Use
  a per-page-load generated *class* (not an id) to scope emitted component CSS.

### L2 caching traps

- **The deployed filename may differ from the repository filename** (Halo ships
  `halo-banner-maker.js` as `halo-banner-generator.js`) and carries its own
  `?c=` cache-buster that must be bumped on every change.
- **The JS caches hard** across reloads, including forced ones, in browsers and
  preview panes alike. If behavior does not match the source you just edited,
  assume stale JS before you assume a bug. Bust with a changing query string on
  the *page* URL during development.
- **Some preview panes render local files as sandboxed static snapshots** with
  scripts silently disabled. If nothing responds to clicks, that is why — use a
  real browser against a real HTTP server.

### L2 configuration

An L2 tool takes configuration from a global set **before** its runtime script:

```html
<script>
window.HALO_IMAGE_PICKER_CONFIG = {
  toolsBaseUrl: "/sites/<Site>/<Container>/tools/",
  brokerModuleUrl: "…/dcs-file-broker/v1.0.0/src/file-broker.js",
  siteCatalogUrl: "…/dcs-file-broker/sites.json",
  defaultProvider: "sharepoint",
};
</script>
```

Every key must have a **tenant-generic default** derived from the SharePoint
page context or the current `/sites/<name>` URL, so an ordinary deployment needs
no configuration at all and a nonstandard one can override any single URL.

---

## Two tenant serving facts that bite on first deployment

**`.html` files may download instead of render.** Tenants with strict browser
file handling, or sites without custom scripting enabled, serve an HTML file as
a download. A site administrator may need to enable custom scripting. For a
standalone host page, renaming `index.html` to `<app>.aspx` is the other way
out. This does not affect the web-part path (boot fetches `index.html` with
`fetch`, which is unaffected) — it affects anyone opening the shell directly.

**`.mjs` is served as `application/octet-stream`.** Every generated artifact
therefore uses the `.js` extension, including workers. Two consequences for any
vendored runtime:

- **Never emit `.mjs`.** A build that produces one will load fine locally and
  fail silently in the tenant.
- **Workers use ordinary same-origin URLs, never `blob:`.** A blob worker has an
  opaque origin, and the page's `worker-src` CSP will refuse it. If a feature
  that depends on a worker is missing while the rest of the UI appears, inspect
  `worker-src` before anything else.

## The globals contract

Cross-boundary contracts are deliberately tiny. Keep to these names:

| Global | Set by | Read by | Meaning |
| --- | --- | --- | --- |
| `__DCS_SP_CONTEXT__` | a host adapter | the File Broker, apps | `{ webAbsoluteUrl }` at minimum — the stable SharePoint context adapter |
| `__DCSPAD_SP_CONTEXT__` | DCSPad | the File Broker | compatibility alias for the above |
| `__DCSPAD_SRC_BASE__` | `boot.js` | the bundle | folder for runtime-fetched source assets |
| `__DCSPAD_ASSET_BASE__` | `boot.js` | the bundle | folder for versioned vendor assets |
| `__DCSPAD_CONFIG_URL__` | `boot.js` | `config.js` | the versioned config URL |
| `__<APP>_BOOTED__` | `boot.js` | itself | double-boot guard |

Context adapters may live on a **same-origin parent or top window**; probe those
too, and swallow cross-origin access errors rather than surfacing them.

---

## Proving a hosting change

Hosting failures are silent and expensive. Before trusting one:

- Deploy and load the page **in view mode**, logged in as a non-owner if
  possible. The blank-page trap only appears in view mode.
- Enter and leave **edit mode without reloading**. The app must disappear and
  come back, and the page must scroll normally while suspended.
- Load the page **twice in a row** with an intervening deploy, without clearing
  the cache. Every versioned asset must be the new one.
- Check the console for CSP violations. Silence is not proof — a blocked script
  in a `srcdoc` frame reports nothing.

`sp-dcspad/deploy/webpart-spike.html` is the standing minimal reproduction used
to prove each hosting mechanism in isolation. Extend it rather than debugging
inside a full app.
