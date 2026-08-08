# DCS Workbench Tools

This repository contains small browser tools and shared components built for the
DCS Workbench family of SharePoint applications. The projects are intentionally
static: they use browser JavaScript, HTML, and CSS without a package manager,
application server, or mandatory build step.

> **Building a new DCS Workbench app? Start at [`docs/`](docs/README.md)** — the
> construction method for the whole family: hosting and boot, composition,
> SharePoint data access, the File Broker, design systems, and a new-app recipe.

The current repository has two cooperating projects:

| Folder | Role |
| --- | --- |
| [`halo-banner/`](halo-banner/README.md) | A visual editor that generates scoped Halo banner HTML/CSS or a standalone SVG for SharePoint pages. |
| [`dcs-file-picker/`](dcs-file-picker/README.md) | The reusable **DCS File Broker**: a provider-based open/save dialog for local files and same-tenant SharePoint document libraries. |

plus the two shared, non-application artifacts:

| Folder | Role |
| --- | --- |
| [`docs/`](docs/README.md) | The construction method for the whole DCS Workbench app family. |
| [`design-system/`](design-system/readme.md) | The **DCS Workbench design system** — the visual language for internal developer tooling (L1 workbench / L2 instrument layers): tokens, components, 22 guideline specimens, brand marks, templates, and a user-invocable `dcs-workbench-design` Claude skill. Imported here from the former standalone repo, which is now superseded. |

The folder name `dcs-file-picker` is historical. Its public component is the
**DCS File Broker**, because it opens, reads, writes, uploads, downloads, and
handles metadata rather than merely selecting files.

## How the projects work together

```text
Halo Banner Maker
  ├─ manual image URLs (always available)
  ├─ DCS File Broker (optional, versioned ES-module tree)
  │    ├─ local provider → browser file picker
  │    └─ SharePoint provider → libraries, folders, files, direct URLs
  │          └─ favorite sites → separately managed sites.json
  └─ image processor (optional, pinned browser-image-compression UMD)
       └─ native Image/Canvas inspection and fallback
```

Halo owns application policy: accepted image formats, the 2000×2000/400 KiB
guard, optimization prompts, caching decisions by URL, status display, and the
requirement that final bytes live in SharePoint. The broker owns reusable file
behavior: provider discovery, SharePoint context and REST calls, path and URL
handling, library browsing, upload/overwrite consent, metadata, and favorite
site configuration.

Both projects follow the external DCS Workbench design system. Halo vendors the
Workbench stylesheet and generates two inline style blocks for SharePoint.
The broker's default theme reads the same token names but does not declare or
overwrite the host application's values.

## Runtime and deployment model

- Halo is pasted into a SharePoint custom-script web part. Its JavaScript and
  optional dependencies are static files hosted in SharePoint.
- The File Broker is distributed as the complete `src/` ES-module tree. Its
  relative structure must remain intact.
- Broker releases should be immutable and versioned. The favorite-sites JSON
  is operational configuration and may remain at a stable, unversioned URL.
- Image optimization is entirely in-browser. No file or image is sent to an
  application server for processing.
- If the broker, catalog, compressor, or SharePoint context is unavailable,
  Halo preserves manual URL entry and its original Copy, Show code, and SVG
  features.

See [`dcs-file-picker/docs/DISTRIBUTION.md`](dcs-file-picker/docs/DISTRIBUTION.md)
and the Halo [`HALO_IMAGE_PICKER_CONFIG`](halo-banner/README.md#image-picker-dependency-and-configuration)
section before publishing.

## Work completed on `halo-filepick`

The image-picker feature added in August 2026 includes:

- compact upload-icon controls connected to both Halo image URL fields;
- local and SharePoint JPEG, PNG, and WebP selection, with SVG rejected;
- direct SharePoint browsing URLs rather than sharing links;
- local-file inspection followed by a required SharePoint save;
- checks at selection time and before Copy, Show code, or SVG, with unchanged
  URL decisions cached to prevent redundant prompts;
- a compact foreground/background size display and one aggregate warning icon;
- browser-only resize/compression with format-appropriate transparency policy;
- source-folder and original-name preservation for the expected SharePoint
  overwrite path;
- resilient broker loading and contract validation so manual workflows survive
  an unavailable or incompatible broker;
- shared-broker improvements for modern/legacy SharePoint context discovery,
  direct URL encoding, Blob size fallback, favorite sites, result location
  metadata, versioned distribution guidance, and regression tests.

The detailed implementation record is under
[`.workflow/ultracode/halo-image-picker/`](.workflow/ultracode/halo-image-picker/final-report.md).

A later reliability/performance review made Halo initialization idempotent,
removed repeated hidden-output serialization, rejected known-oversized
SharePoint reads before buffering, and made large broker listings render in
responsive batches. The decisions, deferrals, and verification evidence are in
[`code-review-process.md`](code-review-process.md).

## Verification completed

- `node --test dcs-file-picker/test/broker.test.mjs`: 45 tests passed.
- `node --check` passed for the Halo runtime and pinned compressor.
- Halo's generated inline CSS was refreshed and `git diff --check` passed.
- Local browser smoke testing covered graceful broker fallback, local-file
  inspection, oversize decisions and caching, Show/Hide code, and the compact
  520px layout.

## Not done

- No SharePoint files, broker release, favorite-sites catalog, or Halo assets
  were deployed by this repository work.
- No authenticated-tenant test was performed. SharePoint library discovery,
  permissions, upload, overwrite, direct image rendering, CSP/MIME behavior,
  and special filenames still require a live smoke pass.
- No server-side image processing, npm toolchain, bundler, service worker, or
  public runtime CDN was introduced.
- No migration of DCSPad to the shared broker was attempted.

## Outstanding issues and future work

1. **Run the authenticated SharePoint smoke checklist before deployment.** Test
   current and favorite sites, restricted libraries, local upload, optimized
   overwrite, direct URL rendering, and names containing spaces, `#`, `%`, and
   apostrophes.
2. **Harden generic path normalization.** `normalizePath()` does not currently
   resolve `.` and `..` segments before `isWithin()` performs its boundary
   check. Providers should not return such paths, but the shared boundary
   helper should reject or canonicalize them and gain regression tests.
3. **Add automated DOM/browser coverage.** The broker dialog and Halo flows
   currently rely on manual browser smoke testing; only the broker's headless
   contracts are automated.
4. **Complete optional product work only when required.** Dax Pro embedding,
   broker chunked uploads above 50 MB, User/Lookup/Taxonomy metadata controls,
   and asynchronous shared recall storage remain intentionally unimplemented.

## Repository conventions

- Read each project's `README.md` and agent guide before editing.
- Keep generic storage/SharePoint behavior in the broker and consumer-specific
  image rules in Halo.
- Do not edit Halo's generated inline style blocks directly; edit the sibling
  CSS and run `python halo-banner/inline-css.py`.
- Do not publish a mutable broker branch as a production dependency.
