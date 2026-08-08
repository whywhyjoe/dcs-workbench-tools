# 00 · The system model

## What a DCS Workbench app is

A DCS Workbench app is **static client-side code hosted in a SharePoint document
library and injected into a SharePoint page by a custom-script web part.**

That sentence contains every constraint that follows:

- **Static** — no application server, no backend, no server-side rendering. The
  only server is SharePoint, reached through `_api` with the page's own cookies.
- **Client-side** — everything runs in the user's browser, under the host page's
  CSP, sharing a document with SharePoint's own DOM.
- **Hosted in a document library** — files are served with
  `cache-control: public, max-age=86400` and you do not control that header.
- **Injected into a page** — you do not own `<html>`, `<head>`, `<body>`, or the
  URL. SharePoint's SPA router does.

There is no build step *required to run* the shipped artifact. Local build
tooling (Node, esbuild, npm) is fine **as tooling** — L1 apps use esbuild to
produce a single bundled file — but what lands in the library must be plain
files a browser can execute directly. SharePoint cannot build anything.

## The two tiers

The tier is a decision about **how much page the app takes over**, and it drives
hosting, shell, styling, and complexity. It is named in the design system
itself (`dcs-workbench.css` header) and mirrored by the reference apps.

### L1 — Workbench

A full-screen application that takes over the page beneath the SharePoint suite
bar. DCSPad and the SP Workbench are L1.

- Owns the viewport. Pinned `position: fixed` under the suite bar, paints its
  own surround, hides itself when the page enters edit mode.
- Has a topbar, a status bar, panels, splitters, a nav rail or sidebar.
- Has multiple views and internal routing.
- Has a **separate boot script**, an **editable config document**, and a
  **bundled application file**. Its shell markup lives in its own `index.html`.
- Persists user state.
- Has an automated test suite.

Shell class: `.dcs-app`. Hosted marker on `<html>`: `.dcs-hosted` (DCSPad
predates the shared name and uses `.dcspad-hosted` — new apps use `.dcs-hosted`).

### L2 — Instrument

A single-purpose tool that sits *in the page flow* inside one web part, like an
instrument dropped onto the page. The Halo Banner Maker is L2.

- No takeover, no status bar, no splitters. Renders in normal document flow.
- Typically: a control panel beside a canvas, or just a control panel.
- Ships as **one self-contained HTML payload plus its own runtime script**. It
  must survive being pasted whole into a custom-script web part.
- Usually no persisted state, no routing, no test suite.
- Optional runtime dependencies (the File Broker, a pinned vendor library) are
  loaded lazily and their absence must leave the core tool working.

Shell class: `.dcs-tool`.

### Picking a tier

Answer these in order; the first "yes" decides it.

1. Does it need to occupy the whole screen to be usable (code panes, data grids,
   inspectors, side-by-side comparison)? → **L1**
2. Does it have more than three distinct views the user navigates between? → **L1**
3. Does it need to persist user state across sessions? → **L1**
4. Otherwise → **L2**

Do not build an L1 app because it might grow. An L2 instrument that outgrows its
tier is a rewrite of its shell, not of its logic — the composition rules in
[`02-composition.md`](02-composition.md) are shared, so the logic ports.

Do not build an L2 tool that fakes a takeover with `height: 100vh`. The tiers
differ in *hosting behavior*, and half-measures produce the blank-page failure
documented in [`01-hosting-and-boot.md`](01-hosting-and-boot.md).

## The non-negotiables

These hold for every app in the family regardless of tier. Each one is here
because breaking it has already cost someone a live deploy.

1. **The shipped artifact needs no build and no CDN.** Every runtime dependency
   is self-hosted in SharePoint. No public CDN at runtime, ever — it is a
   network dependency, a privacy question, and an availability risk the tenant
   does not accept.

2. **One versioning unit, versioned deliberately.** SharePoint's 24-hour cache
   plus Chrome's separate module-script cache means a multi-file module graph
   cannot be reliably busted. L1 apps therefore ship **one bundled ESM file**
   behind a URL stamped with its own `Last-Modified`. See
   [`01-hosting-and-boot.md`](01-hosting-and-boot.md).

3. **Never hardcode a tenant URL in source.** Runtime locations live in the
   app's config document, loaded at startup and resolved against the config's
   own URL. The single exception is the one absolute `<script src>` in the
   `.webpart.html` entry file, which is the only site-specific line in an app.

4. **One module owns persistence.** Whatever the app stores — `localStorage`
   today, a SharePoint JSON document later — exactly one module touches the
   storage API. DCSPad's `src/state.js` and the broker's `src/storage.js` both
   follow this so the future swap is a one-file change.

5. **SharePoint knowledge stays behind a seam.** Views and UI never build
   `_api` URLs, never handle digests, never parse OData shapes. That lives in a
   client module ([`03-sharepoint-data.md`](03-sharepoint-data.md)) or in a File
   Broker provider ([`04-file-broker.md`](04-file-broker.md)).

6. **Every app runs with no SharePoint.** Off-tenant, the app falls back to a
   labeled mock context and mock data, and every view stays exercisable. This
   is not a courtesy to developers; it is what makes the app testable at all,
   since the test suites never authenticate.

7. **Degrade, don't die.** A missing optional dependency, an unreachable config,
   a denied library, a malformed favorites document — each resolves to a
   reduced-capability app with a visible explanation, never a broken one.

8. **Use the design system; do not invent vocabulary.** Two systems exist and
   which one applies is not a matter of taste — see
   [`05-design-systems.md`](05-design-systems.md).

## What is deliberately not in this system

Do not add these without asking. They have each been considered and declined.

- **A frontend framework** (React, Vue, Svelte) or any framework that requires a
  build to run. Alpine is the one open question, assessed in
  [`06-alpine.md`](06-alpine.md).
- **A component library** (Fluent React, Material, Web Awesome). The design
  systems are hand-rolled on purpose.
- **npm dependencies in the shipped artifact.** Build-time only, pinned,
  reviewed, and vendored into the repo.
- **A server.** No upload service, no image processor, no API proxy, no
  serverless function. If it cannot be done in the browser against `_api`, it
  needs a conversation, not a service.
- **TypeScript source.** Vanilla ES modules with JSDoc-grade comments. Type
  information for authored code arrives through the editor (DCSPad ships PnPjs
  declarations to Monaco), not through a compile step.
