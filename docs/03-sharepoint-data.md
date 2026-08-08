# 03 · SharePoint, lists, files, and PnPjs

Everything about talking to SharePoint. The short version: **raw `fetch` against
`_api`, layered into three thin clients over one shared plumbing module, always
with a mock path.**

## Where PnPjs actually fits

This surprises people, so it goes first.

| Role | Is PnPjs used? |
| --- | --- |
| The app's own data access | **No.** Raw `fetch`. |
| A library offered to code running *inside* DCSPad's preview | **Yes** — self-hosted `pnp2.bundle.js` (PnPjs **2.15.0**), loaded from config. |
| An **output format** of the script generator | **Yes** — "Copy as PnPjs 2". |
| Editor intelligence | **Yes** — the exact 2.15.0 declaration graph is shipped to Monaco. |

Why the app itself doesn't use it: a runtime dependency on a large library, in a
context where every byte is served from a 24-hour cache and cannot be bundled
with the app's own versioning story, buys nothing over ~60 lines of `fetch`
plumbing. PnPjs is a thing we *hand to users*, not a thing we *build on*.

**PnPjs 2, not 3.** The tenant's pinned version is 2.15.0 and the generated
scripts, the Monaco declarations, and the self-hosted bundle all match it. If
you generate PnPjs code, generate v2 fluent syntax (`sp.web.lists.getById(…)`),
and mirror any version change across all three places at once.

## Getting a context

Before any `_api` call you need `webAbsoluteUrl`. The discovery order is:

1. **The injected adapter** — `window.__DCS_SP_CONTEXT__` (or the compatibility
   `__DCSPAD_SP_CONTEXT__`). Minimum contract is one field:
   `{ webAbsoluteUrl: 'https://tenant.sharepoint.com/sites/example' }`.
2. **`_spPageContextInfo`** — the classic global, still present on many pages.
3. **The modern Site Pages fallback** —
   `spModuleLoader._bundledComponents[<Site Pages feature id>].PageManager._instance.pageContext.legacyPageContext`.
   Ugly, undocumented, and the only thing that works on some modern pages.

Each source is probed on `window`, then on `parent`, then on `top` — an embedded
tool may be inside a frame whose parent holds the context. Force the same-origin
check once by reading `candidate.location.href` inside a `try`, then treat every
later property access as safe. **Cross-origin failures are expected; swallow
them.** Never let a security exception reach the user.

Then:

- **Reject anything not on `location.origin`.** The app authenticates with the
  page's own cookies, which do not travel cross-origin. Same-tenant only, at
  every layer.
- **Copy the context, don't hold a reference.** Deep-clone what you need; the
  host page's object mutates under SPA navigation.
- **Prefer the classic form digest when present.** `#__REQUESTDIGEST` on the
  same accessible document is fresher than the page context's copy.
- **Re-capture on demand.** `getSpContext({ refresh: true })` before operations
  that must follow SPA navigation or a digest refresh.

### The mock context is a feature

With no context found, return a **labeled mock** with the same shape, marked
`live: false` and carrying an `isDcsPadMock` flag. Every UI shows a chip:
`SP` (live, with the web URL and user in its tooltip) or `SP: Mock`. This is
what makes the app runnable and testable off-tenant, and the flag is what stops
the digest cache from ever treating a mock digest as real.

## The client layers

```
sp-odata.js     shared plumbing — no DOM, no storage, no context
   │              ACCEPT_JSON · SpFileError · odataPathLiteral
   │              resultArray · unwrapJson · responseMessage · requireOk
   ├── sp-files.js    text/binary transfer + THE digest cache + site switching
   ├── sp-rest.js     GET client for inspector views (paging, retry, mocks)
   └── sp-write.js    POST client layered on sp-files.js's digest cache
```

Two rules make this work:

- **One digest cache in the system.** `sp-write.js` imports `getDigest` from
  `sp-files.js` and never modifies it. Two modules, one digest per web, no
  shared state beyond that.
- **The read client is GET-only on purpose.** Writes are a separate module with
  a separate import, so "does this view write?" is answerable by reading its
  imports.

### Reading

```js
const client = createSpRestClient({ mockResolver: ctx.live ? null : mockResolver });
const web   = await client.get('web', { select: ['Title', 'Url'] });
const lists = await client.getAll('web/lists', { select: LIST_SELECT, filter: '…' });
```

- **Always `Accept: application/json;odata=nometadata`.** Smaller payloads,
  flatter shapes, no `__metadata` noise.
- **Tolerate four collection shapes.** `nometadata` gives `{value:[]}`, verbose
  gives `{d:{results:[]}}`, some endpoints give `{results:[]}`, and mocks give
  bare arrays. One `collectionOf()` handles all four; nothing downstream cares.
- **Follow paging to a cap, and report it.** `getAll` walks `odata.nextLink` /
  `@odata.nextLink` / `d.__next` up to a 5000-item ceiling and returns
  `{ items, partial }`. A `partial` result must be visible in the UI.
- **Cap concurrency (3) and retry 429/503 once**, honouring `Retry-After`
  clamped to 30s. Views load in parallel; the tenant should not notice.
- **Select explicitly.** Every view declares a `*_SELECT` array constant at the
  top of the file. `$select` everything you need and nothing else; `$expand`
  only single-valued navigations you actually render.

**Site switching.** `connectWeb(input)` validates a candidate web by asking it
for `/_api/web`, then re-targets every later call. Accept a server-relative
path (`/sites/Project`) or an absolute URL on the host origin; reject anything
else with a plain-language error. Prefer the canonical `Url` SharePoint reports
over the user's input — it fixes casing and trailing segments.

### Writing

Two endpoints cover almost everything:

**`ValidateUpdateListItem`** — for all list-item metadata. Not `MERGE` on the
item, because Validate handles field validation, choice/lookup coercion, and
returns per-field errors.

```js
POST …/_api/web/lists(guid'…')/items(<id>)/ValidateUpdateListItem
POST …/_api/web/GetFileByServerRelativePath(decodedUrl='…')
       /ListItemAllFields/ValidateUpdateListItem
body: { formValues: [{ FieldName, FieldValue }], bNewDocumentUpdate: true }
```

**`FieldValue` is always a string**, with a per-type convention. This table is
load-bearing — getting it wrong produces a silent no-op or a cryptic server
error:

| `TypeAsString` | `FieldValue` string |
| --- | --- |
| `Text`, `Note` | plain string (`''` clears) |
| `Choice` | the choice verbatim (fill-ins pass through) |
| `MultiChoice` | `;#A;#B;#` — `;#`-delimited, **leading and trailing** `;#` |
| `Boolean` | `'1'` / `'0'` |
| `Number`, `Currency` | invariant numeric string, `.` decimal separator |
| `DateTime` | ISO 8601 |
| `URL` | `https://…, description` (comma-space separator) |
| `User`, `UserMulti` | `[{"Key":"i:0#.f|membership|user@x"}]` |
| `Lookup`, `LookupMulti` | `'1'` / `'1;#2;#'` |
| `TaxonomyFieldType` | `Label|guid;` |

The response is an array of `{ FieldName, HasException, ErrorMessage }` —
**a 200 does not mean success.** Filter for exceptions and raise a typed error
carrying `fieldErrors` keyed by `FieldName`.

Never offer edits for `ReadOnlyField`, `Hidden`, or the content fields
`CanvasContent1`, `LayoutWebpartsContent`, `ContentType`, `Attachments`.
Corrupting a modern page body from a metadata form is the one unrecoverable
mistake available here.

**`AddUsingPath`** — for uploads:

```js
POST …/_api/web/GetFolderByServerRelativePath(decodedUrl='<folder>')
       /Files/AddUsingPath(decodedUrl='<name>',overwrite=<bool>)
Content-Type: application/octet-stream
```

with a **50 MB single-request ceiling**, checked before the request. Chunked
upload for larger files is deliberately out of scope; reject with a clear
message rather than failing at the network.

### The digest

- `X-RequestDigest` on every POST. Cached **per web**, with a safety margin
  before the stated expiry.
- **A page digest is only valid for the web that supplied the page context.**
  Any other site gets its own `/_api/contextinfo` call. This is a real bug
  source; the cache enforces it structurally.
- **On 403, refresh the digest once and retry.** An expired digest is
  indistinguishable from a permission failure until you have tried a fresh one.
- Mock contexts never populate the cache.

### Path escaping

`odataPathLiteral()` — `encodeURIComponent`, then `'` → `''`. Both halves
matter: percent-encoding handles `#` and `%` in the URL, doubled apostrophes
handle OData's string-literal escaping. Use it for every user-supplied path
segment. Encode each path segment when building browsing URLs, and emit ordinary
file URLs, never SharePoint sharing links.

## Mocks are part of the client, not the test

Both clients take an injected mock:

```js
createSpRestClient({ mockResolver })   // url -> data | null
createSpWriteClient({ mockWriter })    // (url, body, contentType) -> response shape
```

- The read resolver matches on URL and returns a `structuredClone` of a fixture.
  Unmatched URLs raise a 404-shaped typed error, so a view with a typo fails the
  same way off-tenant as on.
- The default mock writer **records every call** to
  `globalThis.__DCSPAD_WB_WRITES__` and returns the minimal success shape each
  endpoint's caller parses. Tests assert against that array; no network, no
  credentials, no tenant.

This is why every SP Workbench view is exercisable and testable with zero
network, and why the test suites never authenticate.

## Sequencing rules

- **Bytes and columns are two steps, and the second must be retryable alone.**
  Upload the file, then set the metadata. If metadata fails, the file stays and
  the user is offered retry-or-keep — **never re-upload**. This is the difference
  between a hiccup and a duplicate.
- **Warn before overwriting, and handle the race.** Check for an existing file,
  ask, then still handle the 409 from someone else's write in between.
- **Enforce ceilings at both layers.** A provider may reject a known-large
  `Content-Length` early, but the caller re-checks after reading. Never trust a
  single enforcement point.
- **Unavailable columns are shown and explained, never hidden**, and never block
  the transfer.

## Give the user the code

Every view that runs a query should be able to hand the user that query as
runnable code — PnPjs 2 (which runs unmodified in DCSPad's JS pane), raw REST
`fetch`, and PnP.PowerShell. It costs one descriptor and a route table, and it
is the single most-appreciated feature in the SP Workbench. Build it in from the
start rather than bolting it on.

## SharePoint facts worth knowing before you hit them

- **A library's root folder has no list item**, so `ListItemAllFields.ParentList`
  is empty there. Fall back to `GetList(@listUrl)`.
- **Hidden lists exist and matter.** The SP UI won't show them; an inspector
  should, with a flag.
- **`Choices` arrives as either an array or `{ results: [] }`** depending on the
  endpoint and Accept header. Normalize.
- **`SPBasePermissions` is a 64-bit mask delivered as two 32-bit halves**
  (`High`/`Low` strings). Decode with `BigInt`, not `Number`.
- **`CanvasContent1` has several formats** across page generations — JSON and
  legacy HTML. A parser for it must never throw; degrade to showing the raw
  value.
- **Dates come back as ISO strings**, and locale strings are accepted on write.
  Surface server validation errors verbatim so a user can hand-fix.
