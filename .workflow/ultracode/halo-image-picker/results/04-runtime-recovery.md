# Result 04: Runtime recovery

## Summary

Recovered and completed the Halo runtime and image-processing implementation.

## Evidence

- Tenant-generic, versioned broker/catalog/compressor configuration and defensive dynamic loading.
- Strict broker result and direct-URL validation with session-level graceful picker disable on contract/import failure.
- Local, SharePoint, and pasted-URL inspection flows for JPEG, PNG, and WebP; SVG and false-signature files are rejected.
- 2000px/400 KiB qualification, decoded tiled alpha inspection, opaque PNG-to-WebP conversion, transparent best-effort handling, and in-browser-only optimization.
- Terminal per-URL decisions, sequential output guards, inspected Blob reuse for SVG, and exact cache invalidation on URL edits.
- SharePoint save starts in the source folder and preserves the original name where the output format permits overwrite.
- Pinned `browser-image-compression` 2.0.2 UMD asset and license, with Canvas fallback and deployment/config documentation.

## Handoff

Handoff:
- Summary: Complete browser-only image selection, inspection, optimization, SharePoint-save, and output-guard runtime.
- Changed surfaces: Halo runtime, pinned compressor asset/license, runtime configuration documentation.
- Contracts satisfied: Broker location metadata, strict direct URL acceptance, unchanged-URL decision caching, local final-byte upload.
- Assumptions: Broker `v1.0.0`; central unversioned catalog; compressor 2.0.2 with `useWebWorker:false`.
- Local checks: JavaScript syntax, DOM ID contract, configuration/docs contract, geometry scan.
- Integration evidence: Uses generic `file.webUrl` and defensive `providerData.webUrl`; shared validator covers open and save.
- Risks: Authenticated SharePoint and browser-specific compression behavior require deployment smoke testing.

## Files changed

- `halo-banner/halo-banner-maker.js`
- `halo-banner/vendor/browser-image-compression-2.0.2.js`
- `halo-banner/vendor/LICENSE.browser-image-compression.txt`
- Runtime/config sections of `halo-banner/README.md` and `halo-banner/AGENTS.md`

## Decisions

Keep shared SharePoint behavior in the broker and image policy in Halo; retain a Canvas fallback and no build/runtime CDN dependency.

## Risks

Authenticated SharePoint browsing, upload, overwrite, direct URL loading, CSP, and real-browser compression quality remain live-environment checks.

## Verification run

- Halo runtime and vendored UMD pass `node --check`.
- All 41 static runtime DOM IDs resolve.
- Configuration keys and documentation agree.
- No component/export geometry constants changed.
- Vendor SHA-256: `C6713A21756570AF4C230F706FAAC4F0187845928BD14FD5910210D1CDC6FB87`.

Authenticated SharePoint browsing/upload/overwrite/CSP behavior remains a deployment smoke check.

## Open questions

None blocking local completion.
