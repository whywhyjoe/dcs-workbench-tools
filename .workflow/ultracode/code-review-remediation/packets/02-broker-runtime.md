# Packet 02: Broker read and listing performance

## Objective

Prevent avoidable oversized-response buffering and keep large broker listings responsive without hiding entries.

## Context

The broker checks known entry size before provider read but does not pass the ceiling to the provider. SharePoint reads `Content-Length` but cannot enforce it. The dialog appends every row directly to the live list.

## Sources

- `dcs-file-picker/src/file-broker.js`
- `dcs-file-picker/src/providers/sharepoint.js`
- `dcs-file-picker/src/dialog.js`
- `dcs-file-picker/test/broker.test.mjs`
- root and broker Gemini reviews

## Ownership

Write-capable; broker runtime and tests only.

## Write scope

- `dcs-file-picker/src/file-broker.js`
- `dcs-file-picker/src/providers/sharepoint.js`
- `dcs-file-picker/src/dialog.js`
- `dcs-file-picker/test/broker.test.mjs`

## Coordination rule

You are not alone in the codebase. Do not revert edits made by others. Adapt to nearby changes.

## Do

- Pass the broker read ceiling to providers in a backward-compatible options object.
- Make SharePoint reject known oversized `Content-Length` before buffering; retain post-read enforcement for missing/dishonest headers.
- Add focused tests for ceiling propagation and early rejection.
- Batch large listing DOM construction and, if necessary, use an incremental strategy that keeps every entry reachable and preserves selection/double-click/status behavior.
- Keep the provider contract generic and document decisions in the handoff.

## Do not

- Modify path normalization/security, add dependencies, hide/drop entries, change SharePoint write behavior, or edit docs/workflow files.
- Commit, push, publish, or deploy.

## Expected output

Focused broker changes and tests with compatibility/performance evidence.

## Verification

`node --test test/broker.test.mjs`; syntax/import checks; diff review.

## Handoff format

Summary, files, contract change, tests, compatibility, remaining risks.
