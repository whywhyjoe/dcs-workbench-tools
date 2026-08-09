# 08 · Build, test, deploy

## What to rebuild after what

Generated artifacts are the most common source of "I fixed it but it's still
broken". For an L1 app:

| You changed… | Rebuild |
| --- | --- |
| anything in `src/` | the app bundle (`node tools/build-app.mjs`) |
| a second entry point's `src/` | that entry's bundle too |
| the vendored editor (Monaco) or its type graph | the vendor set (`build:monaco`) |
| design-system CSS or the icon catalog | the generated intelligence data (`build:intelligence`) |
| example/starter content | the generated snippet catalog (`build:snippets`) |
| `boot.js` | nothing — but **bump `?v=` in `<app>.webpart.html`** |
| an L2 tool's sibling `.css` | the inlined `<style>` blocks (`python inline-css.py`) |
| an L2 tool's runtime `.js` | nothing — but bump the deployed `?c=` cache-buster |

The deploy script runs the bundle builds for you and refuses to proceed if a
required vendor artifact is missing. **Never hand-edit generated output.**

### Build-time dependencies

Pinned in `tools/package.json`, build-time only, never shipped as a runtime
dependency. Nothing in the deployed artifact requires npm.

> **Windows ARM64 machines have two Node installs.** Builds must run under the
> system Node (`C:\Program Files\nodejs\node.exe`, v24 arm64), not the nvm4w x64
> one — esbuild ships a native per-arch binary, so an x64 `node_modules` fails
> with *"You installed esbuild for another platform"* the moment the deploy
> script reaches the bundle build. `tools/node_modules` is untracked and
> `.gitignore`d for exactly this reason; if it ever reappears in a commit,
> remove it. To fix the error, reinstall with the system Node.

---

## Testing

Testing is proportional to tier and concentrated where this system actually
fails: **timing, workers, frame boundaries, and SharePoint response shapes** —
not types.

### Pure logic → `node --test`

Anything with no DOM, network, or storage gets headless Node tests. The File
Broker's 45 tests cover its entire contract this way, with injected `fetch` and
context adapters, so they never touch a tenant. Field-value conversions, path
normalization, category matching, canvas parsing, export builders, permission
decoding, and script generation all belong here.

```bash
node --test test/broker.test.mjs
```

### Behavior → Playwright against a locally served copy

L1 apps get browser suites. The setup is two static servers plus the runner:

```bash
python3 -m http.server 8642            # terminal 1, from the repo root — the app
cd tests && python3 -m http.server 8643 # terminal 2 — fixtures
cd tests && node smoke.mjs             # terminal 3 — and the rest
```

Chromium resolves via `CHROMIUM_PATH` → `/opt/pw-browsers/chromium` → locally
installed Chrome. Non-zero exit on any failure. Override endpoints with
`DCSPAD_URL` / `DCSPAD_FIXTURES`.

`sp-dcspad` runs **285 checks across eleven suites** — smoke, editor, config,
hosted boot, dark mode, splash, UX, files, workbench, workbench-hosted,
workbench-edit. Per-suite counts in `tests/README.md` are authoritative.

What earns a suite, based on what has actually broken here:

- **Hosted boot** — the exact boot/bundle/config request path, versioned assets,
  viewport pinning, edit-mode suspension, and the boot guard. This suite exists
  because a hosting bug costs a live deploy and produces no error message.
- **Isolation and lifecycle** — anything involving an iframe, a worker, or a
  re-run. Failures here are "sometimes it initializes", which no type system
  catches.
- **The stubbed live path** — Accept headers, paging, retried and re-targeted
  requests, digest use, and writes that must not re-upload. Stub `fetch`; never
  authenticate.
- **Degradation** — a missing worker, a failed config, a storage quota error, an
  absent optional dependency. Prove the reduced-capability path, not just the
  happy one.

### Known quirks

- A failing `custom library` check almost always means the fixtures server
  (8643) is not running.
- **Public CDNs are blocked from the sandbox**, so library-loading tests use the
  local fixture. Real CDN presets can only be exercised in a browser with
  ordinary egress — and are not used at runtime anyway.
- The serving root must expose sibling design-system repos for asset tests.
  Junctions or symlinks inside the repo root work.
- **Live SharePoint behavior cannot be tested here at all.** It is verified by a
  manual checklist against a tenant. Write that checklist down.

---

## Deploying

Deployment is a **pure copy of runtime files into a SharePoint-synced folder**.
No transformation, no packaging step — what is in the folder is what runs. (The
one exception is the `.webpart.html` entry file when an app targets more than
one environment; see below. Its absolute URL is site-specific by definition, so
it is the only thing a deploy may generate.)

```powershell
deploy\Sync-Live.ps1 [-LivePath <synced folder>]
```

The script's shape, worth copying:

1. **Resolve sibling repos** it needs (design system, icon library) and **throw
   with an actionable message** if they are absent.
2. **Verify required generated vendor artifacts exist** before doing anything —
   fail fast rather than deploying half a Monaco.
3. **Build every bundle.**
4. **Copy runtime files only.** No `tests/`, no `tools/`, no `docs/`, no
   `plans/`, no `.md`. Production should be byte-identical to the tag.
5. **Guard against accidental nesting** (`src\src`, `styles\styles`) from a
   previous mis-run.

### Deploying to more than one environment (recommended pattern)

**Recommended, not required.** Evaluate it when an app deploys to more than one
tenant location — a dev site and a prod site. An app with a single deployment
target can skip it, and an L2 instrument pasted into one page almost certainly
should. Do not retrofit an app that is happily single-target.

**The trap it exists to close.** An L1 app's only site-specific line is the
absolute `<script src>` in its `.webpart.html`
([`01-hosting-and-boot.md`](01-hosting-and-boot.md)), and its runtime config
document is seeded once and then edited in place. That is clean for one
environment. Add a second and the repo has no concept of *which* — so a deploy
script that force-copies the repo's placeholder `.webpart.html` over the live
folder **silently overwrites the hand-edited live URL on every sync after the
first**. Deploy #1 works, you hand-fix the URL, and deploy #2 breaks the page
with no error and nothing in the diff to look at. Reference implementation, where
this was hit and solved: `whywhyjoe/sp-traffic-analytics`
(`deploy/Sync-Live.ps1`, `deploy/environments.sample.json`).

**1 · A gitignored `deploy/environments.json`, with a committed
`deploy/environments.sample.json` template.** One entry per target:

```json
{
  "$comment": "Copy to deploy/environments.json (gitignored) and fill in.",
  "dev": {
    "livePath": "C:\\...\\Dev Site - Documents\\SiteAssets\\<app>",
    "deployedBaseUrl": "https://<tenant>.sharepoint.com/sites/<DevSite>/SiteAssets/<app>/",
    "siteURL": "/sites/<DevSite>/"
  },
  "prod": { "…": "…" }
}
```

Add whatever else that environment must seed into the config document
(a File Broker release URL, a catalog URL). **Gitignoring the real file is what
keeps this compatible with the non-negotiable "never hardcode a tenant URL in
source"** — the committed sample carries placeholders only.

**2 · The script takes `-Environment <name>`, per invocation.** Deliberately a
flag, not a sticky "current environment" file: with dev and prod both live, a
mode you forgot to switch back is worse than typing four characters. Per
environment it:

- **resolves `livePath`**, and fails with an actionable message if the
  environments file, the named entry, its `livePath`, or the folder is missing;
- **generates the `.webpart.html` entry file(s)** into the live folder by
  rewriting the script-URL prefix to `deployedBaseUrl` **while preserving the
  repo copy's `?v=` value**. That keeps the boot cache-bump rule a single edit
  in the repo that propagates to every environment. Throw if the `src` pattern
  isn't found rather than writing an unchanged file — a silent no-op here is the
  same failure in a new costume;
- **seeds the runtime config document from the environment entry on first
  deploy only.** If a config already exists in the live folder, leave it alone
  and say so. It is operational configuration that gets edited in place.

A plain `-LivePath` fallback may remain for one-offs, but it must **warn
loudly** that the verbatim-copied `.webpart.html` still carries its placeholder
and that the next verbatim deploy will clobber any hand-edit.

**3 · Nothing else becomes environment-aware.** This is the part that keeps the
pattern cheap:

- `boot.js` still resolves every asset from its own script URL — it has no idea
  which environment it is in, and must not gain one.
- Runtime code still reads the config document. No build-time substitution, no
  `if (isDev)`.
- **Local development still needs no environments file at all** — the standalone
  shell plus mock data, exactly as before.

The environments file feeds the deploy step and nothing else. If you find
yourself threading an environment name into application code, the pattern has
been misapplied.

### Versioning a shared library

Anything other apps consume gets a version stamp, so a live page can say which
copy it is running. Both design systems now do this: a `VERSION` file as the
source of truth, a script that stamps it into each shipped file's banner and
into a `--ds-version` custom property, and a check that fails on a mismatch.

```bash
# DCS Workbench design system
python design-system/tools/set-version.py 1.1.0    # bump and stamp
python design-system/tools/set-version.py --check  # deploy gate
```

```js
// from any live page running a stamped copy
getComputedStyle(document.documentElement).getPropertyValue('--ds-version')
```

**Never hand-edit a stamp**, and after a bump re-sync every consumer that
carries its own copy — for the design system that is Halo's vendored sheet plus
its inlined `<style>` block (`cp` the standalone build over it, then re-run
`inline-css.py`). A consumer left un-synced ships a stale version string, which
is worse than no stamp at all.

### Deploy checklist

- [ ] Every generated artifact rebuilt (table at the top of this file).
- [ ] Tests pass.
- [ ] `?v=` bumped in `.webpart.html` **if `boot.js` changed**.
- [ ] `?c=` bumped **if an L2 runtime script changed** (and the deployed
      filename may differ from the repo filename — check).
- [ ] Deployed, then loaded **in view mode** on the real page.
- [ ] Edit mode entered and left **without a reload**.
- [ ] Page reloaded **without clearing the cache** — every versioned asset is
      the new one.
- [ ] Console checked for CSP violations. (Silence is not proof: a blocked
      script inside a `srcdoc` frame reports nothing.)
- [ ] Config document reviewed — URLs correct for *this* environment.
- [ ] A **live-tenant validation checklist** run, not just "the page loads".

### The live-tenant checklist

Nothing above proves the app talks to SharePoint — the mock path is designed to
look healthy. Write an app-specific version of this and run it after every
deploy that touches data access:

1. The context chip reads **live**, not mock, and the status bar shows the
   expected web URL and user.
2. A read against the real web returns real data — and the request is visible,
   with a 200, in whatever request view the app has.
3. A **cross-site** read against another same-tenant site works, and an
   off-tenant URL is refused with a readable message.
4. A write succeeds, and **repeating it with the same name requires a second
   explicit confirmation** (overwrite consent).
5. A write whose metadata step fails leaves the file in place and offers retry —
   it does not re-upload.
6. Any vendored runtime with workers reports no unavailable worker.

Do this in a disposable folder. Steps 4–5 are the ones that have actually been
wrong in production.

### Rollback

For versioned components (the File Broker, and anything published under
`releases/<id>/`), rollback is **repointing one configured URL** at the previous
immutable release. That property only exists if you never overwrite a release
directory and never publish a `latest` path. Keep it.
