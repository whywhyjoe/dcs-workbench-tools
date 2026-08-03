# Code review process and disposition

This is the single review record for the Halo Banner Maker and DCS File Broker.
It consolidates the former root and component Gemini reviews, the source-level
validation performed after those reviews, the remediation implemented from
them, and the items deliberately left open.

## Scope and decision rule

The reviews were evaluated against the code on branch `halo-filepick`, not only
against their quoted line numbers. Each item was classified by present validity,
realistic impact in the SharePoint deployment, and whether the proposed fix
preserved the projects' static/no-build architecture.

This remediation pass intentionally addresses only issues likely to cause
breakage, avoidable memory use, or near-term performance degradation. Security
hardening was explicitly deferred by the project owner and remains recorded
below; it was not silently dismissed.

## Review disposition

| Review item | Assessment | Effective severity | Disposition |
| --- | --- | --- | --- |
| Dot-segment path traversal in `normalizePath()` / `isWithin()` | Valid shared-boundary weakness, but the original Critical rating overstates current exploitability because shipped providers and SharePoint responses are trusted/canonical inputs. | High hardening priority | **Deferred by scope.** Reject/canonicalize raw and encoded dot segments and add boundary regression tests in a dedicated security pass. |
| Executable URLs in `HALO_IMAGE_PICKER_CONFIG` | Conditionally valid. The config is trusted administrator-authored JavaScript; a hostile script able to change it already has execution. Both compressor `script.src` and broker dynamic import share the trust requirement. | Low now; High if config ever becomes user-controlled | **Deferred by scope.** Document trusted-only input and later enforce hosted same-origin HTTPS with explicit local-development exceptions. |
| Duplicate Halo initialization | Fully valid. Re-evaluating the classic runtime can bind every control twice and trigger duplicate dialogs/actions. | High reliability | **Accepted and implemented.** See Implementation below. |
| Halo globals colliding with other page scripts | Partially valid. `waitForElement` and `initGenerator` were global; application state was already closure-local. | Low–Medium reliability | **Accepted and implemented** as classic-script isolation, retaining only intentional external globals. |
| Scoped CSS regenerated on every render | Valid; the component stylesheet and generated scope do not change during one initialization. The original Critical label was excessive. | Medium performance | **Accepted and implemented.** See Implementation below. |
| Emitted markup rebuilt on every high-frequency input | Valid. Preview CSS variables were already efficient, but hidden output serialization was unnecessary work. | Medium performance | **Accepted and implemented** with a current-output flush contract. |
| Broker rows appended directly to the live DOM | Valid concern, but “thousands of forced layouts” was imprecise because the loop performs no layout reads. The larger problem is an unbounded number of row nodes. | Medium for large folders | **Accepted and implemented** with batching/incremental reachability; see Implementation below. |
| Broker may buffer an oversized read before rejecting it | Valid. The core performed a post-read check, while SharePoint knew `Content-Length` but did not receive the ceiling. | Medium memory/availability | **Accepted and implemented** with early known-size enforcement while retaining the post-read guard. |
| Polling for the injected Halo DOM | Technically true but not a meaningful current performance problem: one selector runs every 100 ms for at most ten seconds and stops when found. | Low | **No change.** A bounded `MutationObserver` may be considered during a future bootstrap refactor. |
| Extract helpers from the large Halo closure | Valid maintainability suggestion, not a current behavior defect. Moving them to bare file scope would have worsened global leakage. | Low | **No broad refactor.** Revisit inside the private wrapper after automated UI coverage exists. |
| Per-character SVG text measurement | The cost is real, but the review incorrectly said a new Range is created per character; one Range is created per text node and reused. Export is infrequent and text is short. | Low | **No change.** Preserve the verified wrapping algorithm unless profiling demonstrates a real long-text problem. |
| Missing automated browser tests | Valid. Broker headless contracts are strong, while dialog/Halo flows rely on browser smoke testing. | Medium quality risk | **Partially addressed by focused regression checks in this pass; full browser automation remains open.** A repo-level development-only harness must not alter the production runtime. |

## Implementation in this remediation

This section is finalized from the integrated source and verification evidence,
not copied from review suggestions.

### Halo Banner Maker

- Wrapped the classic-script implementation in a private IIFE so helper names no longer
  collide with host-page scripts. The intended configuration/compressor globals remain
  external.
- Added a per-generator-root `initializing` / `ready` attribute guard before listeners are
  bound. A synchronous failure removes the guard so a corrected runtime may retry.
- Captured `document.currentScript` while the script is executing, before the polling
  callback runs.
- Cached the scoped component stylesheet once per initialized root instead of reparsing it
  on every preview change.
- Made `render()` mark emitted output dirty rather than always serialize hidden markup.
  Visible code refreshes immediately; Copy and Show code synchronously flush the latest
  state after their existing image guards. SVG remains based on current state/live DOM.

### DCS File Broker

- Extended the existing provider read-options object with the effective `maxBytes` ceiling.
  This is backward-compatible because providers already receive an options object and may
  ignore unknown properties.
- Made the SharePoint provider reject a valid, known-oversized `Content-Length` before
  calling `text()`, `blob()`, or `arrayBuffer()`, with a best-effort response-body cancel.
- Retained the broker's post-read size check and made it prefer measurable buffered bytes
  over provider metadata, so a falsely low nonzero header/result cannot bypass the ceiling.
- Rendered browsable listings in cancellable 200-row animation-frame batches through
  `DocumentFragment`. Navigation, provider-mode changes, close, and failure invalidate the
  prior render token; provider switches invalidate before asynchronous locator work begins.
  All entries and final hidden/partial notices remain reachable.
- Added tests for effective-ceiling propagation, early no-buffer rejection, actual-size
  enforcement when metadata is falsely low, and retained post-read enforcement. The
  headless suite increased from 41 to 45 tests.

## Positive findings retained

The reviews correctly recognized these design strengths:

- broker core, dialog, providers, metadata, storage, and catalogs are cleanly separated;
- Halo owns image policy while the broker owns reusable storage mechanics;
- manual URL behavior survives optional broker/compressor failure;
- production runtime remains dependency-light, static, and build-free;
- SharePoint OData paths are encoded and apostrophes are doubled for string literals;
- metadata retry does not upload file bytes twice;
- Halo's preview uses CSS custom properties rather than recalculating geometry in JavaScript;
- SVG text extraction follows the browser's actual wrapped layout;
- current component selectors are strongly scoped for the stylesheet constructs in use;
- documentation and the broker's headless contract suite provide a solid maintenance base.

One positive claim needed qualification: list-id and field caches store in-flight
promises, but the digest cache stores resolved digest records. Concurrent first
writes may therefore make duplicate context-info requests; this is minor
performance debt, not a correctness issue.

## Explicitly not implemented

- Dot-segment path rejection/canonicalization.
- Configuration URL scheme/origin enforcement.
- A wholesale helper/module refactor.
- MutationObserver bootstrap replacement.
- A rewritten SVG text measurement algorithm.
- A production build, server process, or runtime framework.
- Authenticated SharePoint deployment verification.

## Verification record

- `node --test dcs-file-picker/test/broker.test.mjs`: 45/45 passed.
- `node --check` passed for the Halo runtime and all three modified broker modules.
- `python halo-banner/inline-css.py` completed and produced no HTML diff.
- `git diff --check` passed; `dcs-file-picker/src/util/paths.js` has no diff.
- Browser duplicate-runtime regression: the page loaded two local runtime script URLs,
  reached one `ready` root, exposed neither private helper on `window`, and one ArrowRight
  keypress changed the resize rail by exactly 10px rather than 20px.
- Browser output regression: Show code emitted freshly entered `--text-size: 61`; Copy,
  with code hidden, copied freshly entered `--text-size: 62` markup.
- Browser responsive/health regression: at a 520px viewport, document client and scroll
  widths were both 510px, the compact header remained usable, and no warning/error console
  entries were recorded.
- Authenticated SharePoint validation was not available and remains required before
  deployment.

The independent audit initially found two Medium integration gaps: post-read enforcement
trusted a falsely low nonzero size, and provider switching invalidated an old listing batch
too late. Both were corrected, covered by the 45-test suite where headlessly testable, and
confirmed resolved in a focused re-audit.

## Remaining work

1. Schedule the two deferred security items as a separately reviewed change.
2. Add automated browser coverage for broker dialog and Halo action flows without
   introducing a production build dependency.
3. Run the authenticated SharePoint checklist before deployment.
4. Profile real large libraries and long banner text before undertaking more
   complex virtualization or SVG text-measurement work.

## Superseded source reviews

This file replaces:

- `/gemini-code-review.md`
- `/dcs-file-picker/gemini-code-review.md`
- `/halo-banner/gemini-code-review.md`

Those files were removed after their findings, qualifications, accepted fixes,
and deferred work were incorporated here.
