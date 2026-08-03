# Packet 04: Runtime recovery

## Objective
Audit and finish the interrupted Halo runtime packet without discarding its surviving edits.

## Context
The crash terminated the original runtime agent after it changed `halo-banner-maker.js` and added browser-image-compression 2.0.2. Broker and UI contracts are complete. Halo docs still describe a native-only compressor and must be reconciled with actual runtime configuration.

## Sources
Eval/downstream contracts, packet 03, current Halo runtime/UI/docs, and broker public API.

## Ownership
Halo runtime, vendor dependency, and the dependency/config sections of Halo README/AGENTS.

## Write scope
- `halo-banner/halo-banner-maker.js`
- `halo-banner/vendor/`
- `halo-banner/README.md`
- `halo-banner/AGENTS.md`

## Coordination rule
You are not alone in the codebase. Do not revert edits made by others. Adapt to nearby changes.

## Do
Trace every picker/output path, validate broker/UI result shapes, fix defects, document the pinned UMD/config key, preserve cancellation/URL-cache invariants, and run syntax/static checks.

## Do not
Edit HTML/CSS/broker/workflow files, change geometry, deploy, commit, or replace working prior edits wholesale.

## Expected output
Recovered implementation with a full DOM/config/broker handoff and verification evidence.

## Verification
`node --check`, targeted static contracts, `git diff --check`, and safe runtime smoke checks available without SharePoint.

## Handoff format
Use the Ultracode shared-behavior handoff block; identify any live-tenant-only checks.
