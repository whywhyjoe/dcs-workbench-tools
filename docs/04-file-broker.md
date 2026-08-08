# 04 · The DCS File Broker

**One component for every "get a file in" and "put a file out" moment in a DCS
app.** Local disk and SharePoint document libraries behind a single dialog, with
the library's metadata columns handled in the same breath.

Source: `dcs-workbench-tools/dcs-file-picker/` (folder name is historical — the
component is the *File Broker*: `src/file-broker.js`, CSS prefix `dfb-`).

> **Do not hand-roll file I/O.** If your app opens, saves, uploads, downloads,
> or edits metadata on a file, use the broker. Every app that rolled its own
> re-learned the digest, the overwrite race, the path escaping, and the metadata
> sequencing — and got at least one of them wrong.

## What it gives you

| Concern | Answer |
| --- | --- |
| Choose an existing file | `broker.open()` — one dialog, every location |
| Write a file out | `broker.save()` — destination + name + metadata |
| Local disk | `localProvider()` — OS picker in; File System Access API or download out |
| SharePoint | `sharePointProvider()` — same-tenant libraries, digest handled, site switching |
| Standard sites | a JSON catalog of sites and libraries, plus a paste-any-URL box |
| Metadata | the app declares the columns it wants; the provider reports which exist |
| File types | eight categories (`web · code · text · data · office · image · media · archive`), plus extensions, MIME types, and predicates |
| Starting location | `start: { provider, path }`, else where the user was last time |
| Look | the DCS Workbench design system by default; `theme: 'basic'` elsewhere |
| No UI at all | `list / read / write / getMetadata / setMetadata` drive providers headlessly |

## Using it

```js
import {
  createFileBroker, DCSPAD_METADATA_FIELDS,
  localProvider, sharePointProvider, loadSiteCatalog,
} from '<broker release url>/src/file-broker.js';

const broker = createFileBroker({
  providers: [
    sharePointProvider({ sites: loadSiteCatalog('<catalog url>') }),
    localProvider(),
  ],
  metadata: DCSPAD_METADATA_FIELDS,
});

// Open — filtered picker, read as text. null means the user cancelled.
const picked = await broker.open({
  accept: ['web', 'code'],
  read: 'text',
  start: { provider: 'sharepoint', path: '/sites/<Site>/Shared Documents' },
});
if (picked) editor.setValue(picked.text);

// Save — destination, bytes, then columns.
const saved = await broker.save({
  data: editor.getValue(),
  suggestedName: 'app.js',
  accept: ['code'],
  metadata: { title: 'Pad export' },     // prefill
});
```

**Cancelling resolves `null`. It is never an exception.** Write your call sites
against that.

Results carry `file.webUrl` and `file.providerData` so you can reopen a later
dialog in the site and folder the user last used.

Ceilings default to 25 MB read / 50 MB write and are enforced by the broker
regardless of what a provider reports.

## The provider contract — the one extension seam

Nothing outside `src/providers/` knows what SharePoint is. Add a store —
OneDrive, Graph, an in-app document table — by writing one provider; the dialog,
the metadata form, the categories, and the path rules do not change.

```
id · label · hint · capabilities
isAvailable()                        -> boolean | Promise<boolean>
roots(location?)                     -> Promise<Location[]>
list(location, { accept })           -> Promise<Listing>
read(entry, { as, maxBytes })        -> Promise<ReadResult>
write(location, name, data, opts)    -> Promise<WriteResult>
pick({ accept, multiple })           -> Promise<ReadResult[]>   (browse:false only)
getMetadata(target, { schema, mode })-> Promise<MetadataState>
setMetadata(target, state, values)   -> Promise<{ updated: string[] }>
locator                              -> { label, placeholder, hint,
                                           current(), resolve(text), options?() }
downloadUrl(entry)                   -> string
```

Capabilities (everything omitted is `false`): `browse · read · write · metadata
· discoverMetadata · overwriteCheck · createFolder · multiple · locator`.
`defineProvider()` validates them against the methods you supplied and throws at
definition time, not at first use.

Shapes:

```
Location    { path, label?, rootPath?, providerId? }
Entry       { kind: 'folder'|'file', name, path, size?, modified?,
              mimeType?, category?, url?, extra? }
Listing     { path, rootPath, parentPath, entries: Entry[], partial? }
ReadResult  { name, path, size?, mimeType?, text?, data?, blob?, file? }
WriteResult { name, path, url?, overwritten? }
```

**Field types are provider-neutral**: `text · multiline · choice · multichoice ·
boolean · number · date · url · tags`. A provider maps its native types onto
these; `TypeAsString` never leaves `providers/sharepoint.js`.

**Paths are POSIX-absolute and boundary-checked twice** — in the provider and
again in `broker.list()`. A provider returning a path outside its declared
`rootPath` is a bug, and the broker raises `outside-root`.

## Distribution and versioning

The broker has no build step. **A release is the complete `src/` tree, served as
static ES modules, with its relative structure intact.**

```
<container>/dcs-file-broker/<release-id>/src/file-broker.js
<container>/dcs-file-broker/<release-id>/src/providers/sharepoint.js
…
<container>/dcs-file-broker/sites.json        ← unversioned, operational
```

Rules:

- **Releases are immutable.** Never overwrite a release directory and never
  publish a `latest` path. Publish a new id, test the consumer, then update the
  consumer's configured URL. The old directory makes rollback a one-line change.
- **A consumer imports one explicit release URL**, from its own configuration —
  not a hardcoded constant, not a branch URL.
- **The favorites catalog is versioned separately** (or not at all). It is
  operational configuration that changes without releasing JavaScript. Its
  `schemaVersion` is `1`; unknown top-level properties are ignored.
- **The repository contains no tenant URL, credentials, deploy script, or
  bundle.** Keep it that way.

Release checklist: run `node --test test/broker.test.mjs`; copy the whole `src/`
to a new release directory; upload the catalog if used; test import, catalog
load, a local selection, and an authenticated SharePoint read/write on the target
page; pin the consumer; keep the previous release.

## Degradation is mandatory

Consumers must keep working when the broker cannot load. Halo is the reference:
it validates the broker's contract on load, disables the picker for the session
if it is missing or incompatible, and leaves manual URL entry, Copy, Show code,
and SVG export fully functional.

Within the broker, the same posture: a network error, denied or missing catalog,
non-JSON response, or malformed `sites` value resolves to an **empty catalog**,
not a broken app. With no usable page context the SharePoint provider reports
unavailable and other providers carry on.

## Ownership boundary

This is the part people get wrong when extending it.

- **The broker core** validates requests, capabilities, path boundaries, byte
  ceilings, metadata sequencing, and result shapes.
- **A provider** owns storage mechanics: discovery, paths, reads, writes,
  overwrite behavior, metadata translation.
- **The dialog** consumes only the neutral contract. Apps may replace it
  (`config.dialog`) or skip it entirely with the headless methods.
- **The consumer owns policy.** Halo decides which image formats and sizes are
  acceptable and whether to re-encode; the broker only moves bytes and reports
  where they landed.

If a change you are making is specific to one consumer, it belongs in that
consumer. The broker is distributed to several apps: changes should be generic,
backward-conscious, and testable without a tenant.

## Theming

The default `dcs` theme **reads design-system token names and never declares
them** — inside a DCS app the host's live values must win, and the
`var(--x, fallback)` second argument only covers standalone use. Keep the token
*names* even when values travel inline. `theme: 'basic'` is for embedding
outside a DCS app.

## Gotchas already paid for

- **`[hidden]` loses to a `display` rule.** Every dialog section sets a display,
  so the stylesheet carries `.dfb-dialog [hidden] { display: none !important }`.
  Without it an "invisible" row still takes space and still takes clicks.
- **The dialog element itself is the flex container**
  (`.dfb-theme-*[open] { display: flex }`). The `[open]` qualifier is
  load-bearing: a bare `display: flex` defeats the UA's
  `dialog:not([open]) { display: none }` and paints a closed dialog.
- **Fixed-height rows need `flex: none`.** In a column flex layout every child
  shrinks by default; only the listing and the metadata body may give.
- **Categories overlap on purpose** (`csv` is data *and* office). `categoryOf()`
  resolves the display label by a fixed priority; `compileAccept()` unions the
  rules, so overlap never hides a file.
- **The theme strings are template literals.** A backtick inside a CSS comment
  ends the string and the module dies naming a CSS keyword. Use quotes in those
  comments, and run the tests after editing `styles.js`.
- **Chrome caches module scripts separately from `fetch()`.** While iterating on
  the demo, switching between `localhost` and `127.0.0.1` gives a clean module
  graph.

## Working on it

```bash
node --test test/broker.test.mjs     # 45 headless tests, no DOM, no network
python -m http.server 8655           # then open demo/index.html — 10 examples
```

Dialog behavior is verified by walking the ten demo examples after any
`dialog.js` change. Live SharePoint behavior can only be verified in a tenant.
