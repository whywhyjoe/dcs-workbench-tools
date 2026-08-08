# 07 · Building a new DCS Workbench app

The order of operations, and a skeleton to copy the *shape* of.

> ### ⚠️ The skeleton below is illustrative, not authoritative
>
> It has **never been built, deployed, or run.** It exists to show the shape and
> the naming — the file layout, the boot checklist, the seams. Do not treat it
> as a tested starter, do not copy it verbatim into production, and if it
> disagrees with a reference app, **the reference app is right.** Copy from
> `sp-dcspad` (L1) or `halo-banner` (L2), which are real.

---

## Before writing any code

1. **Pick the tier** using the decision list in
   [`00-system-model.md`](00-system-model.md). Getting this wrong is the only
   expensive mistake in this document.
2. **Ask for the deployment URLs.** The container path, the tools base, the
   design-system location, the File Broker release. Do not infer them from a
   repo — repo URLs are wrong.
3. **Decide what the app stores**, if anything. If nothing, you may be L2.
4. **Decide whether it touches files.** If yes, it uses the File Broker
   ([`04-file-broker.md`](04-file-broker.md)) — do not plan file I/O.
5. **Read the reference app's `CLAUDE.md`** for the tier you chose.

---

## L2 recipe — the instrument

```
<tool>/
  <tool>.html            the pasted payload: sp-webpart-options, style blocks,
                         markup, and a <script src> to the runtime
  <tool>.js              private classic-script IIFE, idempotent per root
  <tool>-overrides.css   every deviation from the vendored kit, each commented
  dcs-workbench.css      vendored design system — READ ONLY
  inline-css.py          regenerates the inlined <style> blocks from the .css
  vendor/                pinned, reviewed, licensed third-party assets
  README.md · AGENTS.md  what it is · the rules and traps
```

Order:

1. Copy Halo's `<sp-webpart-options>` block and the `body.editmode` script
   verbatim. Do not re-derive them.
2. Build the shell as `.dcs-tool` → `.dcs-tool-head` + `.dcs-tool-body`
   (`.dcs-controls` beside `.dcs-canvas`).
3. Write the runtime as one IIFE with a `waitForElement` poll, a per-root
   `initializing`/`ready` guard, and a rollback if synchronous init throws.
4. **One path from state to screen.** Every control writes to `state` and calls
   `render()`. No handler touches output DOM directly.
5. Scope anything you *emit* with a per-page-load generated class, so two
   versions of the tool can coexist on one page.
6. Put optional dependencies behind config with tenant-generic defaults, load
   them lazily, and prove the tool still works with each one absent.
7. Write `AGENTS.md` as you go: invariants, traps, and the things you
   deliberately did not do.

---

## L1 recipe — the workbench

```
<app>.webpart.html      2 lines: anchor + absolute <script src=boot.js?v=1>
boot.js                 the bootstrap checklist (01-hosting-and-boot.md)
<app>.config.json       editable runtime configuration
index.html              the shell — single source of truth, works standalone
<app>.app.js            GENERATED single-file esbuild bundle of src/
styles/app.css          all styling
src/
  main.js               bootstrap; wires everything; startup order lives here
  state.js              the ONLY module touching localStorage
  config.js             loads + normalizes <app>.config.json
  io.js                 file bytes in/out, no storage
  sp-odata.js           shared OData plumbing
  sp-rest.js            GET client
  sp-write.js           POST client
  shell.js              nav rail + view host + in-memory routing
  views/*.js            create({deps}) => { el, load(route), destroy? }
  util/dom.js           the shared el() helper — one copy, not twelve
tools/
  build-app.mjs         esbuild → ../<app>.app.js
  package.json          build-time deps only, pinned
deploy/
  Sync-Live.ps1         build + copy runtime files to the synced folder
tests/                  Playwright suites + README with the server setup
CLAUDE.md               invariants · file map · dev workflow · gotchas
```

Order:

1. **`index.html` first.** The shell is the single source of truth and must work
   standalone from a local static server. Everything else serves it.
2. **`boot.js` second**, against the checklist in
   [`01-hosting-and-boot.md`](01-hosting-and-boot.md). Deploy it and prove
   hosting *before* writing features — including view mode, edit mode without
   reload, and a second deploy without clearing the cache.
3. **Seams third**: `state.js`, `config.js`, the SP client. These are cheap now
   and expensive to retrofit.
4. **Then views**, one at a time, each a factory, each working against mock data
   before it works against a tenant.
5. **Tests alongside**, not after. See [`08-build-test-deploy.md`](08-build-test-deploy.md).
6. **`CLAUDE.md` last, and keep it current.** Invariants, file map, dev
   workflow, gotchas paid for. It is the highest-leverage file in the repo.

---

## Illustrative skeleton

Again: **never built or run.** Shape only.

### `myapp.webpart.html`

```html
<!-- MyApp web-part entry. The Modern Script Editor's Script URL points here.
     All boot logic lives in boot.js, which resolves the library folder from
     its own src URL. The absolute URL below is the only site-specific line.
     Bump ?v= whenever boot.js changes — boot sits below the versioning layer. -->
<div data-myapp-anchor></div>
<script src="https://<tenant>/sites/<Site>/<Container>/myapp/boot.js?v=1"></script>
```

### `boot.js` (abridged — the real one is ~280 lines; see `sp-dcspad/boot.js`)

```js
(function () {
  'use strict';

  // 1. Never take over a page being edited.
  if (/[?&]mode=edit/i.test(location.search) || /\/_layouts\//i.test(location.pathname)) {
    var anchor = document.querySelector('[data-myapp-anchor]');
    if (anchor && !anchor.textContent) {
      anchor.textContent = 'MyApp (inactive while the page is in edit mode)';
      anchor.style.cssText = 'font:12px/1.5 Consolas,monospace;color:#888;padding:8px';
    }
    return;
  }

  // 2. Modern pages re-run web-part scripts on re-render.
  if (window.__MYAPP_BOOTED__) return;
  window.__MYAPP_BOOTED__ = true;

  // 3. Resolve the library folder from this script's own URL.
  var self = document.currentScript;
  var base = (self && self.src)
    ? self.src.slice(0, self.src.lastIndexOf('/') + 1)
    : 'https://<tenant>/sites/<Site>/<Container>/myapp/';

  // 4. Mount + 5. hosted marker (before first paint).
  var mount = document.createElement('div');
  mount.id = 'myapp-mount';
  if (self && self.parentNode && document.body.contains(self)) {
    self.parentNode.insertBefore(mount, self.nextSibling);
  } else {
    document.body.appendChild(mount);
  }
  document.documentElement.classList.add('dcs-hosted');

  // 6. Curtain: a dependency-free splash, carrying the host CSP nonce.
  //    (omitted — copy sp-dcspad/boot.js; it is ~80 lines and load-bearing)

  // 7. SharePoint enters edit mode via SPA navigation with no reload.
  function syncEditSuspension() {
    document.documentElement.classList
      .toggle('dcs-suspended', /[?&]mode=edit/i.test(location.search));
  }
  ['pushState', 'replaceState'].forEach(function (fn) {
    var orig = history[fn];
    history[fn] = function () { var r = orig.apply(this, arguments); syncEditSuspension(); return r; };
  });
  window.addEventListener('popstate', syncEditSuspension);
  syncEditSuspension();

  // 8. Version the assets by their own Last-Modified.
  var VERSIONED = ['styles/app.css', 'myapp.app.js', 'myapp.config.json'];
  var versions = {};
  var revalidated = Promise.all(VERSIONED.map(function (f) {
    return fetch(base + f, { credentials: 'same-origin', cache: 'no-cache' })
      .then(function (r) {
        var lm = r.headers.get('Last-Modified');
        versions[f] = lm && !isNaN(new Date(lm))
          ? String(new Date(lm).getTime()) : String(Date.now());
      })
      .catch(function () { versions[f] = String(Date.now()); });
  }));
  function versioned(f) { return base + f + '?v=' + versions[f]; }

  window.__MYAPP_SRC_BASE__ = base + 'src/';
  window.__MYAPP_ASSET_BASE__ = base;

  // 9-11. Shell, then bundle.
  fetch(base + 'index.html', { credentials: 'same-origin', cache: 'no-store' })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status + ' loading index.html');
      return r.text();
    })
    .then(function (html) {
      return revalidated.then(function () {
        window.__MYAPP_CONFIG_URL__ = versioned('myapp.config.json');
        return html;
      });
    })
    .then(function (html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      if (!document.getElementById('myapp-style')) {
        var link = document.createElement('link');
        link.id = 'myapp-style';
        link.rel = 'stylesheet';
        link.href = versioned('styles/app.css');
        document.head.appendChild(link);
      }
      var frag = document.createDocumentFragment();
      Array.prototype.slice.call(doc.body.children).forEach(function (el) {
        if (el.tagName !== 'SCRIPT' && el.id !== 'splash') frag.appendChild(el);
      });
      mount.appendChild(frag);
      return import(versioned('myapp.app.js'));
    })
    .catch(function (err) { /* paint the failure — never fail silently */ });
})();
```

### `myapp.config.json`

```json
{
  "version": 1,
  "siteURL": "/sites/<Site>/",
  "assets": {
    "designSystem": {
      "prefer": "local",
      "localBaseUrl": "<Container>/bsp-design/",
      "files": { "bundle": "styles.css" }
    }
  },
  "fileBroker": {
    "moduleUrl": "<Container>/tools/dcs-file-broker/v1.0.0/src/file-broker.js",
    "siteCatalogUrl": "<Container>/tools/dcs-file-broker/sites.json"
  }
}
```

Every URL is resolved against the config document's own URL, with `siteURL` as
the base for tenant paths — so an operator can move the deployment without
touching source.

### `src/main.js`

```js
import { getState } from './state.js';
import { loadAppConfig } from './config.js';
import { getSpContext, applyContextIndicators } from './sp-context.js';
import { createSpRestClient } from './sp-rest.js';
import { mockResolver } from './mock-data.js';
import { createShell } from './shell.js';
import { createThingsView } from './views/things.js';

const configReady = loadAppConfig();          // start early
const state = getState();
const ctx = applyContextIndicators();          // SP / SP: Mock chip

const client = createSpRestClient({ mockResolver: ctx.live ? null : mockResolver });

const shell = createShell({
  mount: document.getElementById('myapp-main'),
  deps: { client },
  views: [
    { id: 'things', label: 'Things', group: 'Content', create: createThingsView },
  ],
});

const { warnings } = await configReady;
for (const w of warnings) console.warn('MyApp config:', w);

shell.restore();
```

### `src/views/things.js`

```js
import { el } from '../util/dom.js';

const THING_SELECT = ['Id', 'Title', 'Created'];

export function createThingsView({ client }) {
  const root = el('div', 'wb-view');
  const status = el('div', 'dcs-state');
  root.append(status);

  async function load() {
    status.textContent = 'Loading…';
    status.className = 'dcs-state dcs-state-loading';
    try {
      const { items, partial } = await client.getAll('web/lists', { select: THING_SELECT });
      status.className = 'dcs-state';
      status.textContent = partial
        ? `${items.length} shown (more available)`
        : `${items.length} items`;
      // …render items…
    } catch (err) {
      status.className = 'dcs-state dcs-state-err';
      status.textContent = err?.message || String(err);
    }
  }

  return { el: root, load };
}
```

---

## Definition of done

An app is not finished until:

- [ ] It runs standalone from a local static server with **no** SharePoint, on
      mock data, with every view reachable.
- [ ] It runs hosted, in **view mode**, on a real page.
- [ ] Entering and leaving edit mode without a reload hides and restores it, and
      the host page scrolls normally while suspended.
- [ ] A second deploy is picked up **without clearing the browser cache**.
- [ ] Config-driven URLs are in the config document; **no tenant URL is in
      source** except the one line in `.webpart.html`.
- [ ] Failures are visible: a failed boot, a failed config load, a denied
      request, and a storage-quota error each produce a readable message.
- [ ] `CLAUDE.md` exists with invariants, file map, dev workflow, and gotchas.
- [ ] Tests pass ([`08-build-test-deploy.md`](08-build-test-deploy.md)).
