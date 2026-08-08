# 06 · Alpine — assessment and recommendation

The DCS Workbench system currently uses **no** JavaScript framework. The BSP
design system, which the same developers use for employee-facing pages, uses
**inline Alpine v3** as its documented interactivity layer. The question is
whether new DCS apps should adopt Alpine for the same reason: fewer hand-rolled
templates, more human-grokkable code, and one idiom developers already know.

This doc is the answer. **The CSP prerequisite has been cleared** (see below);
what remains is a recommendation about scope, not a question about viability.
No DCS app's *own chrome* uses Alpine yet.

---

## What was measured

Across `sp-dcspad/src` (13,547 lines, 44 modules):

| Pattern | Count | What it is |
| --- | --- | --- |
| `addEventListener` | 207 | manual event wiring |
| `.textContent =` | 160 | manual text sync |
| `.hidden =` | 131 | manual visibility sync |
| `setAttribute` | 55 | mostly `aria-*` sync |
| `classList.toggle` | 48 | manual state→class sync |
| `.disabled =` | 41 | manual enablement sync |
| identical `el(tag, cls, text)` helper | **12 copies** | the same six lines, verbatim, in twelve files |

Concentration: `main.js` alone holds 56 listeners; `docs.js` 20; `libraries.js`
19; the Workbench views 6–13 each.

The characteristic shape is imperative state mirroring. A representative example
from `src/workbench/main.js`:

```js
function refreshFavStar() {
  const fav = isFavorite(currentSite.url);
  favBtn.textContent = fav ? '★' : '☆';
  favBtn.classList.toggle('active', fav);
  favBtn.setAttribute('aria-pressed', fav ? 'true' : 'false');
  favBtn.title = fav ? 'Remove the inspected site…' : 'Favorite the inspected site';
}
```

and the pervasive async-button dance:

```js
siteOpen.disabled = true;  siteOpen.textContent = 'Opening…';
try { … } finally { siteOpen.disabled = false; siteOpen.textContent = 'Inspect'; }
```

Every one of those is a declarative binding in Alpine — `x-text`, `:class`,
`:aria-pressed`, `:disabled` — and each hand-rolled version is a place where the
mirror can drift out of sync with the state. That drift is a real, recurring bug
class here, not a hypothetical.

**Conclusion of the measurement: the ~380 imperative sync statements are where
Alpine would pay, not the ~30 `createElement` calls.** The system is not
template-heavy; it is *binding*-heavy.

---

## The CSP question — resolved

**Alpine v3's default build evaluates expressions with `new Function`.** Modern
SharePoint pages ship a nonce-based `script-src` CSP, and `unsafe-eval` is a
*separate directive* from `unsafe-inline` — so this was the one thing that could
have made Alpine unusable here regardless of its merits.

**It was tested by running Alpine code inside DCSPad on the tenant, and it
works.** That result is conclusive for the whole hosting model, because of a
fact already documented in `sp-dcspad/CLAUDE.md`: **`about:srcdoc` documents
inherit the parent page's CSP.** The preview frame runs under the same
`script-src` as the host page. Alpine evaluating expressions there means the
host page permits eval, so the default build is viable in an app shell too.

Consequences:

- **Use the default Alpine build**, not `@alpinejs/csp`. Inline `x-data`,
  `x-on`, `:class`, `x-model` expressions all work — which is what keeps the
  idiom identical to BSP and preserves the familiarity argument that motivated
  this in the first place.
- Every `<script>` tag you add still needs the **host nonce** — that is the
  `unsafe-inline` half of the CSP and it is unchanged. Alpine loaded as an
  external `<script src>` with the page's nonce is fine; a hand-written inline
  `<script>` without one is not. See
  [`01-hosting-and-boot.md`](01-hosting-and-boot.md).
- One residual to confirm before writing against newer syntax: **which Alpine
  version is actually deployed**. DCSPad's editor intelligence targets
  **3.15.2**; check `<Site>/<Container>/lib/alpine.js` matches.

*Verified: Alpine executing in DCSPad on the tenant. Recorded 2026-08-08.*

---

## Recommendation

### Adopt for L2 instruments — yes, clearly

An L2 tool is a control panel driving a preview. Halo is exactly this: sliders,
selects, text inputs, and a rule that *every control calls `render()`*. That
rule is a hand-built reactive system. Alpine is the same rule, declared instead
of wired, and it is the shape BSP developers already write daily.

```html
<div class="dcs-tool" x-data="{ ringWeight: 8, shape: 'round', busy: false }">
  <input class="dcs-slider" type="range" x-model.number="ringWeight" min="0" max="40">
  <span class="dcs-value" x-text="ringWeight"></span>
  <button class="dcs-btn dcs-btn-primary" :disabled="busy"
          x-text="busy ? 'Working…' : 'Copy'" @click="copy()"></button>
</div>
```

Note this does **not** violate the no-build rule: Alpine is self-hosted in the
tenant (`<Site>/<Container>/lib/alpine.js`, already configured in DCSPad's
config as a framework), loaded as a plain classic script with `defer`. Nothing
compiles.

### Adopt selectively in L1 chrome — yes, with boundaries

Use it for: topbar and status bar state, menus and disclosure, dialogs,
segmented controls and toggles, form fields and metadata editors, empty/loading/
error states, chips and counts.

**Do not use it for:**

| Region | Why not |
| --- | --- |
| Data grids and trees | These run to thousands of rows with incremental, cancellable `requestAnimationFrame` batching. `x-for` over 5,000 rows is a worse implementation of a solved problem. |
| Monaco, canvases, iframes | Third-party or imperative-by-nature surfaces. Alpine adds a layer and no value. |
| **DCSPad's preview iframe** | Absolutely not. The preview is user territory; Alpine is a library the *user* may choose to load. Pad chrome must never appear in an assembled preview document. |
| The boot script | Boot must be dependency-free and paint before anything is fetched. |

The boundary to state in review terms: **Alpine binds chrome; imperative code
renders data.**

### Hosted-page rules if you adopt it

These matter because you share a document with SharePoint:

1. **Guard the start.** Two DCS apps on one page must not both start Alpine:
   ```js
   if (!window.__DCS_ALPINE_STARTED__) { window.__DCS_ALPINE_STARTED__ = true; Alpine.start(); }
   ```
2. **Know that `Alpine.start()` walks the whole `document.body`** — SharePoint's
   DOM included. That is one tree walk with no matching attributes, so the cost
   is small and the risk is a *third-party* `x-` attribute, not ours. If you
   need strict containment, defer auto-start and call `Alpine.initTree(mount)`
   on your own root only.
3. **Load Alpine as a separately versioned self-hosted script**, not bundled
   into `<app>.app.js`. The bundle is versioned by its own `Last-Modified`;
   putting a vendor library inside it means every Alpine change re-versions the
   whole app and vice versa. Version it like any other vendor asset
   ([`01-hosting-and-boot.md`](01-hosting-and-boot.md)).
4. **`defer` it, and initialize after the shell is injected** — an L1 shell is
   added to the page by `boot.js` after Alpine's own `DOMContentLoaded`.
5. **Every binding must live inside an `x-data` ancestor.** A bound control
   outside one renders, does nothing, and throws no error. BSP names this the
   #1 first-page bug; it will be ours too.
6. **No `Alpine.data()` factory layer for trivial controls.** BSP rules this out
   explicitly and DCS should match, so one idiom covers both. Inline `x-data`
   objects for small state; a named `Alpine.data()` component only when the same
   behavior appears in three or more places.

### Regardless of the Alpine decision

**Extract the `el()` helper.** Twelve verbatim copies is indefensible either
way. One shared `src/util/dom.js` export, imported everywhere, is a small,
uncontroversial, immediate improvement — and if Alpine is adopted, the remaining
imperative renderers (grids, trees) still need it.

---

## Migration posture

**Do not retrofit.** DCSPad and the SP Workbench work and are covered by 285
tests; rewriting their chrome buys nothing and risks the timing- and
boundary-shaped failures those tests exist to catch.

The path is:

1. ~~Run the eval gate.~~ **Done — it passes.**
2. Build the **next new L2 tool** with Alpine end to end. That is the low-risk
   proving ground: one self-contained payload, no bundle, no test suite to
   invalidate.
3. Then use Alpine for **new views and new chrome** in existing L1 apps — a view
   is a self-contained factory, so one view can be Alpine-backed while its
   neighbours are not. Grids and trees inside those views stay imperative.
4. Revisit this file with what was learned. Update the recommendation rather
   than adding a second opinion elsewhere.

## Open questions for whoever picks this up

- Which self-hosted Alpine version is canonical? DCSPad's editor intelligence
  targets **Alpine 3.15.2**; confirm the deployed `lib/alpine.js` matches before
  writing against newer syntax.
- Should the DCS Workbench design system gain a documented Alpine state contract
  the way BSP has one — which classes and attributes bindings are expected to
  drive (`.is-active`, `[aria-selected]`, `[aria-invalid]`, `:checked`)? Now
  that adoption is viable, **yes** — otherwise every tool invents its own and
  the familiarity argument decays. That belongs in the design-system repo.
- Does anything change for the **preview iframe**? No. Alpine remains a library
  the *user* may load into their own code; pad chrome never appears in an
  assembled preview document. The fact that it works there is what proved the
  CSP question, not an invitation to use it there.
