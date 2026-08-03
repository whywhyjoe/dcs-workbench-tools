# DCS File Broker

**One component for every "get a file in" and "put a file out" moment in a DCS
app** — the local disk and SharePoint document libraries behind a single
dialog, with the library's metadata columns handled in the same breath.

> **About the name.** "File picker" only covers half of it: this also writes,
> uploads, downloads, and reads/writes metadata, across more than one store. It
> *brokers* between an app and whatever holds its files — hence **File Broker**.
> The folder is still `dcs-file-picker/` because that is where it was asked to
> live; the component, the module (`src/file-broker.js`), and the CSS prefix
> (`dfb-`) all use the real name.

Zero dependencies. Vanilla ES modules, plain DOM, no build step, no framework.
Drop `src/` into a page and import it. It is drawn in the **DCS Workbench
design system** by default, so it looks like part of DCSPad and the SP
Workbench the moment it opens.

---

## Quick start

```js
import {
  createFileBroker, DCSPAD_METADATA_FIELDS,
  localProvider, sharePointProvider, loadSiteCatalog,
} from './src/file-broker.js';

const broker = createFileBroker({
  providers: [
    sharePointProvider({
      // The standard places files belong. Pasting any other site still works.
      sites: {
        sites: [
          {
            label: 'Team site',
            url: '/sites/Team',
            default: true,
            libraries: [
              { label: 'Documents', path: 'Shared Documents' },
              { label: 'Pad exports', path: 'Shared Documents/pad' },
            ],
          },
          { label: 'Brand assets', url: '/sites/Brand', libraries: ['Site Assets'] },
        ],
      },
    }),
    localProvider(),
  ],
  metadata: DCSPAD_METADATA_FIELDS,      // Title · _ExtendedDescription · DocVersion
});

// Import — a picker filtered to web + code files, read as text
const picked = await broker.open({
  accept: ['web', 'code'],
  read: 'text',
  start: { provider: 'sharepoint', path: '/sites/Team/Shared Documents' },
});
if (picked) editor.setValue(picked.text);   // null means the user cancelled

// Export — choose a destination, write the bytes, then fill in the columns
const saved = await broker.save({
  data: editor.getValue(),
  suggestedName: 'app.js',
  accept: ['code'],
  metadata: { title: 'Pad export', docVersion: '1.2.0' },   // prefill
});
```

Try it without a tenant: serve the repo and open
[`demo/index.html`](demo/index.html) — ten working examples against an
in-memory library. Run the headless tests with:

```bash
node --test test/broker.test.mjs
```

---

## What you get

| Concern | Answer |
| --- | --- |
| Choose an existing file | `broker.open()` — one dialog, every location |
| Write a file out | `broker.save()` — same dialog, name + destination + metadata |
| Local disk | `localProvider()` — OS picker in, File System Access API or download out |
| SharePoint | `sharePointProvider()` — same-tenant libraries, digest handled, site switching |
| Standard sites | a JSON catalog of sites and their libraries, plus a paste-any-URL box |
| Metadata | app declares the columns it wants; the provider reports which exist |
| File types | eight built-in categories, plus extensions, MIME types and predicates |
| Starting location | `start: { provider, path }`, else where the user was last time |
| Remembering | last location, last site, and recent sites, in one swappable seam |
| Look | the DCS Workbench design system by default; `theme: 'basic'` for elsewhere |
| No UI at all | `broker.list/read/write/getMetadata/setMetadata` drive providers headlessly |

---

## Methodology and ownership

The broker separates application intent from storage mechanics.

- The **broker core** validates requests, provider capabilities, path boundaries, byte
  ceilings, metadata sequencing, and result shapes.
- A **provider** owns storage-specific discovery, paths, reads, writes, overwrite behavior,
  and metadata translation. SharePoint knowledge stays in `src/providers/sharepoint.js`.
- The **dialog** consumes only the provider-neutral contract. Applications may replace it
  or use the headless methods without duplicating REST, digest, filtering, or validation.
- The **site catalog** is optional operational configuration. Failure to fetch or normalize
  favorites becomes an empty catalog rather than a broken application.
- A **consumer** owns its own policy. Halo, for example, decides which image formats and
  sizes are acceptable; the broker only transfers the bytes and returns location data.

This boundary is deliberate because the broker is intended to be distributed to multiple
DCS Workbench applications. Changes should be generic, backward-conscious, and testable
without depending on a particular consumer.

## Work completed for the Halo integration

- Exported the dependency-free local and SharePoint providers and site-catalog loader from
  the public entry point so consumers need one import surface.
- Added stable DCS/DCSPad context adapters, same-origin parent/top probing, classic page
  context, and the modern Site Pages `spModuleLoader` fallback.
- Hardened direct browsing URL construction by encoding each path segment and returning
  normal file URLs instead of SharePoint sharing links.
- Made SharePoint Blob reads derive their actual byte size when `Content-Length` is absent.
- Passed the effective read ceiling to providers so SharePoint can reject a known-large
  `Content-Length` before buffering, while retaining the broker's post-read enforcement.
- Rendered large browsable listings in cancellable 200-row animation-frame batches so the
  dialog stays responsive without dropping or hiding entries.
- Added generic `file.webUrl` and `file.providerData` result location metadata so a consumer
  can reopen a save dialog in the selected source site/folder.
- Added optional favorite-site JSON loading with graceful empty-catalog fallback and a
  canonical example configuration.
- Added immutable distribution guidance for the complete ES-module tree and a separately
  managed catalog.
- Expanded the headless suite to 45 passing contract and regression tests.

## Deliberately not done

- The broker does not contain Halo's image signature, size, transparency, compression, or
  prompt policy. Those rules remain in the consumer.
- No tenant URL, credentials, production favorite-sites file, deployment script, generated
  bundle, mutable `latest` release, or public runtime CDN is included.
- The existing DCSPad implementation was not migrated or removed.
- No server-side transfer or processing service was introduced.

## Outstanding work and risks

- **Authenticated SharePoint validation remains mandatory before release.** Exercise modern
  page context, current and favorite sites, permissions-trimmed libraries, upload/replace,
  metadata, direct URLs, CSP/MIME delivery, and special filenames through real REST calls.
- **Canonicalize or reject dot segments in paths.** `normalizePath()` collapses slashes but
  does not resolve `.` or `..` before `isWithin()` performs a prefix boundary check. Provider
  output is expected to be canonical, but this shared safety seam should be hardened and
  covered by regression tests.
- The dialog has no automated DOM test suite. Its demo flows and accessibility behavior are
  still checked manually.
- Batched listing rendering still creates every row eventually; profile real very-large
  libraries before taking on the added complexity of virtualization.
- When both entry size and `Content-Length` are unavailable or dishonest, a response may
  still be fully read before the broker's post-read ceiling rejects it. Strict prevention
  would require bounded stream consumption in providers that support it.
- Chunked uploads above 50 MB, User/Lookup/Taxonomy editors, an asynchronous recall store,
  and additional providers remain extension work rather than v1 features.

The disposition of the latest review, including deliberately deferred security work, is
recorded in [`../code-review-process.md`](../code-review-process.md).

---

## `open(options)`

Resolves the selection, or `null` if the user cancelled. Cancelling is never an
error.

| Option | Default | Meaning |
| --- | --- | --- |
| `accept` | broker default, else any | see [File types](#file-types) |
| `start` | `{ provider, path, webUrl }` | where the dialog opens; `webUrl` preserves an alternate SharePoint site |
| `read` | `'text'` | `'text'` · `'arrayBuffer'` · `'blob'` · `'none'` |
| `multiple` | `false` | resolves an **array** when true |
| `metadata` | broker default | `false` to skip, or a schema override |
| `editMetadata` | `false` | let the person edit and save columns while opening |
| `providers` | all | subset of provider ids to offer |
| `maxReadBytes` | 25 MB | ceiling passed to the provider for early rejection and enforced again after the read |
| `title`, `description` | — | dialog copy |

```js
{
  provider: 'sharepoint',
  file: { name, path, url, webUrl, providerData, size, modified, mimeType, category },
  text,            // or data / blob / nativeFile, per `read`
  metadata: { title: 'Pad export', … } | null,
  metadataState,   // the raw provider state, if you need availability details
}
```

## `save(options)`

| Option | Default | Meaning |
| --- | --- | --- |
| `data` | **required** | string, `Blob`, `ArrayBuffer`, typed array, or `() => any of those` |
| `suggestedName` | `''` | prefills the name box |
| `accept` | broker default | filters the listing and the OS Save dialog |
| `start` | — | `{ provider, path, webUrl }` |
| `metadata` | broker default | **values** to prefill (`{ title: 'x' }`) or a schema override (`{ fields: [...] }`) |
| `maxWriteBytes` | 50 MB | SharePoint's single-request ceiling |

```js
{
  provider: 'sharepoint',
  file: { name, path, url },
  overwritten: false,
  metadata: { title: 'Pad export', … } | null,
  metadataSaved: true,
  metadataError: '',
}
```

**The bytes and the columns are two steps, and the dialog says so.** If the
upload succeeds but the metadata write fails, the file stays where it landed and
the person is offered *Retry metadata* or *Keep file without metadata* — a retry
never re-uploads. That behaviour is not incidental; it is the shape DCSPad
arrived at after doing it the other way.

---

## File types

`accept` takes a mixed array of:

| Form | Example |
| --- | --- |
| category id | `'data'` |
| extension | `'.csv'`, `'csv'` |
| MIME type | `'text/csv'` |
| MIME wildcard | `'image/*'` |
| predicate | `(entry) => entry.name.startsWith('draft-')` |
| everything | `'*'` or omit |

Built-in categories:

| id | Covers |
| --- | --- |
| `web` | html, htm, css, scss, less, svg |
| `code` | js, mjs, ts, tsx, py, ps1, cs, java, sql, sh, yml… |
| `text` | txt, md, markdown, rst, log, rtf |
| `data` | csv, tsv, json, xml, ndjson, parquet |
| `office` | doc(x), xls(x), ppt(x), vsd(x), one, pdf |
| `image` | jpg, jpeg, png, gif, webp, avif, bmp, tif, ico, svg, heic |
| `video` | mp4, m4v, mov, webm, avi, mkv, wmv, mpg |
| `audio` | mp3, m4a, aac, wav, flac, ogg, wma |
| `archive` | zip, 7z, rar, tar, gz |

Categories overlap on purpose (`csv` is both `data` and `office`; `svg` is both
`web` and `image`). Add your own once at startup:

```js
import { registerCategory } from './src/file-broker.js';
registerCategory({ id: 'cad', label: 'CAD', extensions: ['dwg', 'dxf'] });
```

---

## Standard sites

Most apps do not want people hunting for a library. Hand the SharePoint
provider a catalog and the dialog shows a **site dropdown** over the browser,
with the site's libraries as one-click shortcuts — and a box for pasting any
other site on the tenant, because a curated list must never become a cage.

```json
{
  "sites": [
    {
      "label": "Team site",
      "url": "https://contoso.sharepoint.com/sites/Team",
      "default": true,
      "libraries": [
        { "label": "Documents", "path": "Shared Documents" },
        { "label": "Pad exports", "path": "Shared Documents/pad", "hint": "Generated files" }
      ]
    },
    { "label": "Brand assets", "url": "/sites/Brand", "libraries": ["Site Assets"] }
  ]
}
```

Every shorthand is accepted, because a hand-written config should not need to
be exact: the top level may be the bare array; a site may be a bare URL string;
`url` may be absolute or server-relative; a library may be a bare string, either
absolute (`/sites/Team/Shared Documents`) or relative to its site
(`Shared Documents/pad`). Malformed entries are dropped, not thrown.

```js
sharePointProvider({ sites: CATALOG })                       // inline
sharePointProvider({ sites: loadSiteCatalog('/sites/App/file-config.json') })  // fetched once
sharePointProvider({ sites: CATALOG, discoverLibraries: false })  // only what you listed
```

For the canonical JSON sample and the release/deployment pattern, see
[`config/favorite-sites.example.json`](config/favorite-sites.example.json) and
[`docs/DISTRIBUTION.md`](docs/DISTRIBUTION.md). Keep broker JavaScript in an
immutable versioned directory, while the favorites URL may remain stable and
centrally managed. Loading that URL is best-effort: missing, denied, offline,
non-JSON, or malformed configuration becomes an empty catalog rather than an
application failure.

The catalog's `default: true` site is where the dialog opens the first time.
`discoverLibraries: false` hides the site's other libraries, leaving exactly the
configured set (plus the site root). With no catalog at all, behaviour is
unchanged: the page's own site, its libraries, and the paste box.

## Remembering where you were

The dialog reopens where it was left: same location, same site, same folder,
with recently used sites offered under the address box. That state lives behind
one seam — `src/storage.js`, the only module that touches `localStorage`, which
is what makes moving it into SharePoint JSON later a one-file change.

```js
createFileBroker({ storage: false })                  // remember nothing
createFileBroker({ storageKey: 'my-app.files' })      // a private key
createFileBroker({ storage: myStore })                // any { read(), write() }

broker.recall.location('sharepoint')      // { path, webUrl }
broker.recall.recentLocators('sharepoint')
broker.recall.forgetAll()
```

Precedence when the dialog opens: `start` from the call, then what was
remembered, then `defaultProvider` / the catalog's default site, then the first
thing available. A remembered folder that has since been renamed, deleted, or
locked down is forgotten silently and replaced by the fallback — never an error
banner on every open.

## Theming

```js
createFileBroker({ theme: 'dcs' })     // default — the DCS Workbench design system
createFileBroker({ theme: 'basic' })   // neutral, follows the host's light/dark scheme
createFileBroker({ theme: 'none' })    // inject nothing; you ship the CSS
```

The `dcs` theme **reads** design-system tokens and never declares them
(`var(--accent, #3fd8b4)`). Inside DCSPad or the SP Workbench the dialog picks
up that app's live values automatically; standalone, the fallbacks are the
system's own. Every rule is scoped under `.dfb-theme-dcs` on the dialog root, so
a host that already loads `dcs-workbench.css` is never restyled by us. Overrides
go in your own sheet after ours, or set the tokens on a container.

---

## Metadata

The app declares **which columns it cares about**; the provider decides whether
the chosen location actually has them. A missing column is shown, disabled, and
explained — never a blocked save.

```js
metadata: [
  { key: 'title',       label: 'Title',       type: 'text',      name: 'Title', required: true },
  { key: 'description', label: 'Description', type: 'multiline', target: { sharepoint: '_ExtendedDescription' } },
  { key: 'audience',    label: 'Audience',    type: 'choice',    name: 'Audience' },   // choices come from the library
  { key: 'reviewed',    label: 'Reviewed on', type: 'date',      name: 'ReviewedOn' },
]
```

Field types are provider-neutral: `text` · `multiline` · `choice` ·
`multichoice` · `boolean` · `number` · `date` · `url` · `tags`. The SharePoint
provider maps `TypeAsString` onto them and converts values to the `FieldValue`
strings `ValidateUpdateListItem` expects (`;#A;#B;#` for multi-choice, `1`/`0`
for booleans, and so on — all documented in `src/providers/sharepoint.js`).

Three ways to supply it, in increasing order of dynamism:

```js
metadata: DCSPAD_METADATA_FIELDS                       // a fixed schema
metadata: { fields: [...], mode: 'discover' }          // schema + every other writable column
metadata: async ({ mode, accept }) => [...]            // computed per operation
```

`mode: 'discover'` is the seam a future "let the user pick which columns to
fill" UI plugs into: it returns the declared fields first, then everything else
the library will accept, already typed and ready to render.

---

## Files

```
src/file-broker.js        public API: createFileBroker, open(), save(), headless plumbing
src/dialog.js             the default UI — the only UI; swap it wholesale via `dialog`
src/metadata-form.js      one control per neutral field type
src/metadata.js           schema normalization, coercion, validation (pure)
src/categories.js         categories + the accept grammar (pure)
src/site-catalog.js       the standard-sites JSON shape + loader (pure)
src/storage.js            what the dialog remembers — the only localStorage toucher
src/provider.js           the provider contract, enforced at definition time
src/styles.js             both themes as strings (bundle-safe) + ensureStyles()
src/providers/local.js    the browser's own file system
src/providers/sharepoint.js  same-tenant document libraries over /_api
src/providers/memory.js   an in-memory library for demos and tests
src/util/{paths,errors}.js
demo/                     ten working examples, no network needed
test/broker.test.mjs      headless contract tests (node --test)
docs/EXTENDING.md         add a provider, a category, a field type, or your own UI
docs/DCSPAD-MIGRATION.md  how DCSPad and the SP Workbench map onto this
docs/DISTRIBUTION.md      immutable releases + central favorite-sites operations
config/                   canonical favorite-sites JSON example
```

## Errors

Everything throws `FileBrokerError` with a `code` you can switch on:
`not-available`, `invalid-location`, `outside-root`, `not-found`, `permission`,
`conflict`, `too-large`, `unsupported-type`, `invalid-name`, `network`, `read`,
`write`, `metadata-read`, `metadata-write`, `cancelled`. Metadata rejections
also carry `err.fieldErrors` (`{ fieldKey: message }`), which the form routes
back onto the control that caused them.
