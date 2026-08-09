# Open items

Known, deliberate gaps across the DCS Workbench system. **This file is the
register** — if you find an open question recorded elsewhere in these repos, it
should also be here. Add to it rather than starting a second list.

Nothing below is broken. These are things that were consciously deferred, or
decisions that are mine (Claude's) and want a human's confirmation. Each says
what "done" looks like so it can be picked up cold.

_Last reviewed: 2026-08-08._

| # | Item | Where | Priority |
| --- | --- | --- | --- |
| 1 | The superseded standalone design-system repo is still writable | GitHub | **high** |
| 2 | Alpine state contract undefined | `design-system/` | medium |
| 3 | `--check` isn't wired into any deploy gate | `design-system/` | medium |
| 4 | DCSPad reports no `--ds-version` | `sp-dcspad` | medium |
| 5 | Deployed Alpine version unconfirmed | tenant | medium |
| 6 | Starting version `1.0.0` was chosen for you | `design-system/VERSION` | low |
| 7 | `design-system/uploads/` is authoring scratch | `design-system/` | low |
| 8 | Deployment docs duplicated in `sp-dcspad` | `sp-dcspad` | low |
| 9 | DCSPad's `:root` hasn't converged on the system | `sp-dcspad` | low / optional |
| 10 | The multi-environment deploy pattern's only worked example lives outside the family repos | `docs/` | low |

---

## 1 · The superseded standalone design-system repo is still writable

`whywhyjoe/dcs-workbench-design-system` (public, at `5c69a34`) was imported into
`design-system/` here, and this repo is now its home. **The old repo still
exists and can still be pushed to.** If anyone — a person, an agent, a stale
session — pushes there, the two diverge silently, and the reconciliation that
took a full session to do once has to happen again.

**Done looks like:** archive it on GitHub (Settings → Archive this repository),
or replace its `readme.md` with a pointer here. Archiving is stronger — it makes
the repo read-only rather than relying on someone reading a notice.

## 2 · Alpine state contract undefined

Alpine is confirmed viable in this hosting model
([`docs/06-alpine.md`](docs/06-alpine.md)) and recommended for new L2 tools and
new L1 chrome. But the design system does not say **which classes and attributes
bindings are expected to drive**. BSP documents this for its own system; DCS
does not.

Without it, every tool invents its own vocabulary — which decays the exact
familiarity argument that justified adopting Alpine.

**Done looks like:** a section in `design-system/readme.md` naming the contract —
at minimum `.is-active`, `.is-dragging`, `.is-called-out`, `[aria-current]`,
`[aria-pressed]`, `[aria-selected]`, `:disabled` — and saying which component
states are bindable. Best written alongside the first tool that actually uses
Alpine, not before it.

## 3 · `--check` isn't wired into any deploy gate

`design-system/tools/set-version.py --check` exists and works, but nothing runs
it automatically. The design system has no deploy script in this repo, and
`sp-dcspad/deploy/Sync-Live.ps1` doesn't know about it.

A gate nobody runs is a gate that fails open. The stamp only stays trustworthy
if something checks it.

**Done looks like:** `--check` invoked from whatever ships the design system,
and/or a CI step on this repo. It exits non-zero and names the offending file,
so it drops into either without special handling.

## 4 · DCSPad reports no `--ds-version`

`sp-dcspad/styles/app.css` carries its own `:root`, written before the design
system existed. All 104 of its tokens exist upstream, but it has no
`--ds-version`, so the flagship L1 app is the one deployed thing that **cannot
answer which design-system generation it is running**.

**Done looks like:** either add a stamped `--ds-version` to `app.css`, or (item
9) converge `app.css` onto the system's sheets and inherit the stamp. The first
is a five-minute fix; the second is the real one.

## 5 · Deployed Alpine version unconfirmed

DCSPad's editor intelligence targets **Alpine 3.15.2**. Nobody has checked what
`<Site>/<Container>/lib/alpine.js` actually is. If they differ, the pad offers
completions for a version that isn't deployed.

**Done looks like:** read the version banner off the deployed file, then either
confirm the match or re-generate the intelligence against the real version.

## 6 · Starting version `1.0.0` was chosen for you

I set `design-system/VERSION` to `1.0.0` when adding the stamp. The standalone
sheet's own header already said `v1.0`, so it lines up — but it was my call, not
a decision anyone made.

**Done looks like:** confirm it, or
`python design-system/tools/set-version.py <other>` and commit. One command.

## 7 · `design-system/uploads/` is authoring scratch

Eight pasted PNGs (~1.9 MB) from the session that authored the system. Not part
of the system, imported only because deleting someone's files unasked is worse
than carrying them.

**Done looks like:** delete the folder, or keep it and say so here so the next
person doesn't re-raise it.

## 8 · Deployment docs duplicated in `sp-dcspad`

`sp-dcspad/README.md` § Deploying and `sp-dcspad/deploy/README.md` overlap
[`docs/08-build-test-deploy.md`](docs/08-build-test-deploy.md). Cache-busting is
currently described in three places. **Deliberately deferred** — Joe asked not to
de-duplicate the app repos' docs yet.

**Done looks like:** the `sp-dcspad` docs keep only what is DCSPad-specific
(Monaco artifacts, its own validation steps) and link out for the general
method. Nothing here should be deleted in the process — `HANDOFF.md` is the
*evidence* record for the hosting rules and is the only place that reasoning
exists.

## 9 · DCSPad's `:root` hasn't converged on the system

`sp-dcspad/styles/app.css` predates the design system and duplicates its tokens.
There is no drift — every pad token exists upstream, values match — so this is
tidiness, not correctness. It would also resolve item 4.

**Done looks like:** `app.css` imports the system's sheets and keeps only its
genuinely app-specific variables (the JS-set layout ones: `--sidebar-w`,
`--diag-h`, `--editors-w`, `--preview-h`, `--runtime-w`, `--diag-fs`). Worth
doing when something else already requires touching `app.css`; not worth a
dedicated change.

## 10 · The multi-environment deploy pattern's only worked example lives outside the family repos

[`docs/08-build-test-deploy.md`](docs/08-build-test-deploy.md) documents the
environment-aware deploy pattern and cites `whywhyjoe/sp-traffic-analytics` as
the reference implementation. None of the three primary repos uses it —
correctly, since none of them deploys to more than one target and the pattern is
explicitly not to be retrofitted.

The consequence is only that if that repo moves, goes private, or is rewritten,
the doc's one concrete example goes with it. The prose is self-contained enough
to implement from, so this is a durability note, not a gap.

**Done looks like:** nothing, unless that repo becomes unreachable — in which
case inline a trimmed `Sync-Live.ps1` excerpt into the doc.

---

## Closed

Kept so nobody re-opens them.

- **Does the tenant CSP permit `eval`?** Yes — tested by running Alpine inside
  DCSPad on the tenant. `about:srcdoc` inherits the host page's CSP, so this
  settles it for the app shell too. Use the default Alpine build, not
  `@alpinejs/csp`. (2026-08-08)
- **Was the design system forked across copies?** No. The system is a strict
  superset of every copy; its standalone build is byte-identical to Halo's
  vendored sheet. The one real inconsistency, `--sans`, is fixed. See
  [`design-system/INTEGRATION.md`](design-system/INTEGRATION.md). (2026-08-08)
- **Where does `SKILL.md` belong?** Stays at `design-system/SKILL.md`; found by
  pointing Claude at the repo or folder. (2026-08-08)
- **No version stamp.** Done — `VERSION` + `tools/set-version.py`, at `1.0.0`.
  (2026-08-08)
