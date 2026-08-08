# DCS Workbench — how we build apps

This is the construction method for the **DCS Workbench** family of SharePoint
applications: DCSPad, the SP Workbench, the Halo Banner Maker, the DCS File
Broker, and everything built after them.

**Why it exists.** Every app in this family solves the same problems — get
hosted inside a SharePoint page, survive SharePoint's caching, find a page
context, talk to `_api`, move files, look like the rest of the family. Those
problems are solved. A new app that re-solves them differently costs a developer
a week of relearning and gives the user a tool that feels like a stranger.

**How to use it.** Read `00` and the one or two topic docs your task actually
touches. Each file is sized to be read whole.

---

## Read this when

| Doc | Read it when |
| --- | --- |
| [`00-system-model.md`](00-system-model.md) | **Always first.** What a DCS app is, the L1/L2 tier model, the non-negotiables, how to pick a tier. |
| [`01-hosting-and-boot.md`](01-hosting-and-boot.md) | You are creating a new app, changing how one loads, or debugging "it's blank in view mode / stale after deploy / silently runs nothing". |
| [`02-composition.md`](02-composition.md) | You are laying out an app's modules, adding a view, adding a config key, or deciding where state lives. |
| [`03-sharepoint-data.md`](03-sharepoint-data.md) | You are reading or writing lists, files, permissions, or pages — anything that touches `_api` or PnPjs. |
| [`04-file-broker.md`](04-file-broker.md) | Your app needs to open, save, upload, download, or set metadata on a file. |
| [`05-design-systems.md`](05-design-systems.md) | You are writing any markup or CSS. Tells you which of the two design systems applies and what you may not do. |
| [`06-alpine.md`](06-alpine.md) | You are writing UI and wondering whether to use Alpine or hand-rolled DOM. Contains the assessment and the recommendation. |
| [`07-new-app-recipe.md`](07-new-app-recipe.md) | You are starting a new app. Step-by-step, plus an illustrative skeleton. |
| [`08-build-test-deploy.md`](08-build-test-deploy.md) | You are about to ship, or you changed something and need to know what to rebuild and re-run. |

## Reference implementations

Read the code, not just these docs. In rough order of how much they teach:

| App | Repo | Tier | What it demonstrates best |
| --- | --- | --- | --- |
| **DCSPad** | `sp-dcspad` | L1 | The full hosting/boot/bundle/config stack, the preview-runner isolation model, the storage seam. |
| **SP Workbench** | `sp-dcspad` (`src/workbench/`) | L1 | View factories + shell routing, the REST read/write clients, mock-backed development, "copy as PnPjs/REST/PowerShell". |
| **DCS File Broker** | `dcs-workbench-tools/dcs-file-picker` | component | The provider contract, versioned ES-module distribution, headless-testable design. |
| **Halo Banner Maker** | `dcs-workbench-tools/halo-banner` | L2 | The single-payload pasted-in tool, `<sp-webpart-options>` hosting, graceful degradation when an optional dependency is missing. |

Each has its own `CLAUDE.md` / `AGENTS.md` with rules and paid-for gotchas
specific to it. **Those files win over this one** for their own app. This doc
set is the shared method; those are the local law.

## A standing warning about URLs

**No URL written in any repository is authoritative.** Production locations live
in each app's config document, set after deployment. Repository URLs are close
but wrong, and several are stale or point at the wrong tenant.

Every URL an app emits or fetches is either **tenant-relative** or **fully
qualified from config** — never page-relative, because SharePoint does not
resolve page-relative links reliably. The shape is:

```
/sites/<SiteName>/<Container>/<path>
```

for example `/sites/FCUPortal/Code/fluent-icons/…` or
`/sites/FCUPortal/Dev/tools/dcspad/…`. When you need a real one, ask — do not
copy one out of a repo and do not infer it from another app.
