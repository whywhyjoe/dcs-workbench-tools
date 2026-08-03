# Halo Banner Generator

A single-page browser tool that builds "halo banners" for BMO SharePoint pages: a large
ringed circular photo overlapping a coloured artboard, with a text block beside it. You
drive it with sliders and dropdowns, watch a live preview, and take one of two outputs
away.

The tool itself is pasted into a SharePoint **custom script web part**. It is not built,
bundled or installed — there is no toolchain or package manager. Open the HTML file in a
browser and it runs. There is no dedicated automated Halo test suite; browser checks and
the shared broker's headless tests are the current verification layers.

## The two outputs

Both come out of the same live preview, and picking the wrong one is the most common
mistake with this tool.

| Button | Output | Use it when |
|---|---|---|
| **Copy** | HTML + a scoped `<style>` block | You are pasting into a page (custom script web part) |
| **SVG** | One `.svg` file, images inlined as base64 | You need a *file* — Image web part, Hero web part, a deck, email, Teams |

**Paste the HTML when the banner lives on a page.** It keeps hover (halo scale-up, text
background colour swap) and the `<a>` wrapper with target/rel, it weighs about 4 KB
because photos stay as URLs, and every setting stays visible and editable as a custom
property in the `style` attribute. The SVG has none of that.

**Upload the SVG when a web part demands an image.** Hero and Image web parts want a file,
and that is what the exporter is for.

### The SVG export inlines its images, and has to

When a browser loads an SVG *as an image* — `<img src>`, `background-image`, which is what
Image and Hero web parts do — it renders in a restricted mode where **external references
are never fetched**. This is not CORS: an image sitting in the same folder on the same
server is still not loaded. Verified directly; the same file in an `<iframe>` loads it
fine, in an `<img>` it does not.

So every raster the banner needs is fetched and base64'd into the file at export time. If
a fetch fails, the exporter falls back to a plain URL and the button reads
**"1 image linked"** instead of "Saved". **Treat that as an error** — the file will upload
happily and render with a hole where the photo should be.

The same restriction applies to fonts: a linked `@font-face` would be blocked too.

### Image size guard

The header reports the latest inspected sizes as compact text such as
`FG 100 KB / BG 1.4 MB`. An em dash means that URL has not been inspected yet.
One warning icon appears when either image exceeds the policy.

An image qualifies for optional optimization when either dimension exceeds 2000px or
the file is larger than 400 KiB. Halo checks:

- immediately after a user selects a local or SharePoint file; and
- before Copy, Show code, or SVG download.

The result is cached against the normalized, unchanged URL. A successful optimization,
an accepted original, or a declined/uninspectable URL is not prompted repeatedly.
Editing the URL invalidates that record.

Optimization is entirely in-browser. It first fits the image inside a 2000×2000 box,
then performs one compression policy:

- JPEG is re-encoded toward the 400 KiB target.
- An opaque PNG may be converted to WebP to reach the target efficiently.
- A PNG with actual transparent pixels stays PNG and receives one fidelity-preserving
  resize/re-encode; it may remain over 400 KiB rather than repeatedly destroying detail.
- WebP is resized/re-encoded while preserving decoded transparency.

If the optimized result is optional and larger than the original, Halo keeps the
original. The pinned compressor is preferred; native Canvas is the fallback.

The standalone SVG still costs the final raster bytes plus about 33% for base64, plus
roughly 2 KB of vector. A 400 KiB photo will therefore produce an SVG larger than
400 KiB; the threshold controls referenced source images, not the final SVG container.

Watch resolution in the other direction too: the halo photo is clipped to a circle roughly
**1154 units across — wider than the 1024-unit artboard**, because the halo deliberately
overflows the banner. A 1020px source is about 1:1 only when the banner renders near
1024 CSS px. A full-bleed Hero tile can be 1600px+, a 2× display doubles it again, and
photo zoom crops into the source on top of that. Only the photograph can go soft; the
ring, text and shapes are vector and stay sharp.

### Selection and save flow

The upload icon beside either URL field opens the shared broker with an exact
JPEG/PNG/WebP filter.

For a **local file**, Halo validates the file signature, decodes it, inspects its native
dimensions and alpha pixels, offers optimization if necessary, and then requires the
final bytes to be saved to a SharePoint library. The URL field changes only after that
save succeeds.

For a **SharePoint file**, Halo uses the broker's direct browsing URL. If optimization
is accepted, the final bytes are saved through the broker before assignment. The save
starts in the source site/folder and keeps the original filename when the format permits,
so replacing the source is the expected path but not a requirement.

Cancellation, invalid files, failed reads, failed optimization, failed upload, malformed
broker results, and sharing-link-shaped URLs all preserve the previous field value.

## Fonts

The banner asks for **Dax Pro**, which is not a system font and is **not shipped here**.
The `@font-face` block at the top of `<style id="halo-banner-css">` is commented out. Fill
in real paths and uncomment it, or the stack falls back to Segoe UI.

For the SVG export this matters more than it looks: line breaks are measured off the live
preview and baked into the file as absolute positions. If the viewing machine substitutes
a different font, the glyphs move but the baked line breaks do not. If you get the woff2
files, embed them base64 inside the SVG rather than linking them (see above).

## Files

| File | What it is |
|---|---|
| `halo-banner-maker.html` | The whole tool. This is the paste target. Contains three `<style>` blocks — two generated, one hand-written |
| `halo-banner-maker.js` | All behaviour: state, live preview, both exporters |
| `dcs-workbench.css` | Vendored DCS Workbench design kit. Treat as read-only |
| `halo-overrides.css` | Halo's deltas from the kit — tool chrome only, never banner styles |
| `inline-css.py` | Splices the two stylesheets into the HTML. Idempotent |
| `halo-banner-test.html` | Two pasted banner blocks plus hostile host-page CSS, to prove scoping works |
| `RESTYLE-PLAN.md` | The inventory and plan for the DCS Workbench re-skin. History, not instructions |

## Running it locally

Open `halo-banner-maker.html` in a browser. That is the whole workflow.

A static server avoids browser caching headaches when you are iterating on the JS:

```bash
python -m http.server 8653 --bind 127.0.0.1
```

Then load `http://127.0.0.1:8653/halo-banner/halo-banner-maker.html`. Add a changing query
string (`?v=2`) when the JS does not seem to update — browsers cache it aggressively and
some preview panes never reload it at all.

The second `<script>` tag points at the deployed copy on SharePoint. It does not resolve
outside the tenant and is inert locally; only the relative `halo-banner-maker.js` runs.

## Image picker dependency and configuration

The URL fields still accept manual values. Their upload buttons add local/SharePoint
selection when the optional **DCS File Broker** module is available; failure to load that
module must not block manual URLs, preview, Copy, Show code, or SVG.

The sanctioned deployment is a static, immutable copy of the broker's complete `src/`
module tree. `file-broker.js` imports sibling modules, so publishing that one file alone is
not enough. Host the tree on the same SharePoint tenant with a versioned path and serve
JavaScript with the correct MIME type. Do not point production Halo pages at a mutable
branch URL.

Define `window.HALO_IMAGE_PICKER_CONFIG` before `halo-banner-maker.js` (and before the
deployed `halo-banner-generator.js`) to override the tenant-generic defaults:

```html
<script>
window.HALO_IMAGE_PICKER_CONFIG = {
  toolsBaseUrl: "/sites/Tools/SiteAssets/Code/tools/",
  brokerVersion: "v1.0.0",
  brokerModuleUrl: "/sites/Tools/SiteAssets/Code/tools/dcs-file-broker/v1.0.0/src/file-broker.js",
  siteCatalogUrl: "/sites/Tools/SiteAssets/Code/tools/dcs-file-broker/sites.json",
  compressionScriptUrl: "/sites/Tools/SiteAssets/Code/tools/halo-banner/vendor/browser-image-compression-2.0.2.js",
  defaultProvider: "sharepoint",
  sharePoint: { allowSiteSwitch: true }
};
</script>
```

| Key | Purpose |
|---|---|
| `toolsBaseUrl` | Optional base for shared DCS Workbench assets. On SharePoint it defaults to `[current web]/SiteAssets/Code/tools/`; it is not hostname-specific. |
| `brokerVersion` | Immutable broker folder below `dcs-file-broker/`; defaults to `v1.0.0`. |
| `brokerModuleUrl` | Full broker ESM override. Otherwise it is derived from `toolsBaseUrl` and `brokerVersion`; locally it defaults to `../dcs-file-picker/src/file-broker.js`. |
| `siteCatalogUrl` | Favorites JSON override. On SharePoint it defaults to the unversioned `dcs-file-broker/sites.json`; set it to `false` to disable the catalog. |
| `compressionScriptUrl` | Full URL of the reviewed browser-image-compression 2.0.2 UMD asset. Otherwise it is derived from `toolsBaseUrl`; locally it defaults to `vendor/browser-image-compression-2.0.2.js`. |
| `defaultProvider` | Optional initial provider id; defaults to `sharepoint`. |
| `sharePoint` | Optional object forwarded to `sharePointProvider`; `siteCatalogUrl` takes precedence for `sites`. |

SharePoint defaults are derived from the injected DCS context, standard SharePoint page
context, or the current `/sites/<name>` / `/teams/<name>` URL. A nonstandard deployment
can always provide `toolsBaseUrl` or the three full URL overrides explicitly.

Image inspection uses browser-native image decoding and Canvas pixel checks. Optimization
loads the pinned, reviewed `vendor/browser-image-compression-2.0.2.js` UMD file lazily and
runs it on the main thread (`useWebWorker: false`) to avoid SharePoint CSP worker failures.
That file is the upstream browser distribution from
[`browser-image-compression` 2.0.2](https://github.com/Donaldcwl/browser-image-compression/tree/2.0.2)
and its MIT terms are retained in `vendor/LICENSE.browser-image-compression.txt`.
There is no npm/build step, public runtime CDN, upload service, or server-side processing.
Opaque PNGs may become WebP; PNGs with actual transparent pixels remain PNG and receive a
single transparency-preserving resize/re-encode, so a best-effort result may remain above
400 KiB. If the compressor cannot load, Canvas provides an in-browser fallback.

## Work completed in the image-picker feature

- Added compact, connected, icon-only pick controls to both image URL fields.
- Added the foreground/background size summary and single aggregate warning.
- Integrated local and SharePoint open/save flows through the shared broker.
- Added JPEG/PNG/WebP signature and decode validation, native-resolution tiled alpha
  inspection, image qualification, browser-only optimization, and progress/decision UI.
- Added cached guards to selection, Copy, Show code, and SVG actions; inspected Blobs are
  reused by SVG export where possible.
- Added strict direct-URL and broker-contract validation plus session-level graceful
  picker disable when an incompatible dependency is encountered.
- Added tenant-generic defaults for the versioned broker, favorite-sites catalog, and
  pinned compressor, while retaining explicit configuration overrides.
- Preserved the banner component geometry, emitted component CSS, manual URL workflow,
  and existing HTML/SVG output semantics.

## Deliberately not done

- No SharePoint deployment or tenant-specific site/catalog configuration is stored here.
- No server-side image service, npm dependency graph, build step, public runtime CDN, or
  SVG input support was added.
- Optimization does not guarantee a transparent PNG will fall below 400 KiB; fidelity
  and transparency take priority after the one approved pass.
- The tool does not modify or delete a source file itself. Replacement happens only when
  the user chooses the same destination/name and confirms the broker's overwrite flow.

## Outstanding work and risks

- **Authenticated SharePoint testing is still required.** Verify current/favorite-site
  browsing, permissions-trimmed libraries, local upload, optimized overwrite, direct
  image rendering, CSP/MIME delivery, and special filenames through real REST responses.
- Halo has no automated DOM/browser regression suite. The completed feature was checked
  locally in desktop and 520px layouts, but these flows remain manual.
- `initGenerator()` is not idempotent. If more than one runtime copy resolves on the same
  page, controls can be bound twice. Current deployment depends on only one script copy
  resolving in each environment.
- `scopedComponentCss()` and emitted markup are regenerated on every render. This is
  known performance debt during rapid slider movement, though it was not a blocker in
  local smoke testing.
- Dax Pro remains external and is not embedded in generated SVG files; font substitution
  can shift glyphs relative to the measured line breaks.

## Editing styles

Never hand-edit the `<style id="dcs-workbench">` or `<style id="halo-overrides">` blocks in
the HTML — they carry a generated-block banner and get overwritten. Edit the sibling `.css`
file, then:

```bash
python inline-css.py
```

`<style id="halo-banner-css">` is the exception: it is hand-written and lives only in the
HTML. It is also the **banner component itself** — that block is bundled into every copied
snippet, so changing it changes what everyone pastes.

## Deploying

1. Update the JS at the SharePoint path in `halo-banner-maker.html` line 10. Note the
   deployed file is named `halo-banner-generator.js`, **not** `halo-banner-maker.js`.
2. Bump the `?c=` cache-buster on that URL, or nobody will see the change.
3. Paste the contents of `halo-banner-maker.html` into the custom script web part.

## The unit system

Everything is authored on a **1024-unit-wide artboard**, `--ab-h` units tall. Every length
in the component is either a percentage of that box or a `cqw`, and `1cqw = 10.24 units`,
so `n / 10.24 = n cqw`. Font sizes, padding and radii in the control panel are all plain
artboard units.

This is why the SVG export is straightforward: `viewBox="0 0 1024 H"` needs no scale
factor. It is also why the banner never reflows — it scales as one piece at any width.
