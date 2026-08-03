# Packet 03: Halo runtime

## Objective
Implement the end-to-end browser image workflow and guarded output actions.

## Context
Consume the broker contract and expected UI IDs: `pick-purl`, `pick-bgurl`, `image-sizes`, `image-size-warning`, `halo-notice`, and reusable decision/progress UI. Adapt after integration if packet 02 differs.

## Sources
`halo-banner-maker.js`, current broker API/docs, and the approved plan.

## Ownership
Halo runtime JavaScript and static third-party compression asset only.

## Write scope
- `halo-banner/halo-banner-maker.js`
- `halo-banner/vendor/`

## Coordination rule
You are not alone in the codebase. Do not revert edits made by others. Adapt to nearby changes.

## Do
Add resilient dynamic broker loading/config, exact file validation, inspection cache, PNG alpha detection, 2000px/400 KiB optimization rules, local/SharePoint save flows, direct-URL assignment, serialized output guards, pasted-URL CORS acknowledgment, busy/error recovery, and Blob reuse for SVG.

## Do not
Edit HTML/CSS/docs/broker files; change component geometry; require a build/server; deploy.

## Expected output
Runtime implementation, static browser-ready compressor asset if used, and detailed handoff of UI/broker assumptions.

## Verification
Run a JavaScript parse check and any safe focused smoke checks possible without SharePoint.

## Handoff format
Use the shared-behavior handoff block and list DOM/config contracts.
