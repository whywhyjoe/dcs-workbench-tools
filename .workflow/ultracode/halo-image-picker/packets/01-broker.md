# Packet 01: Shared broker

## Objective
Implement the distributable File Broker improvements required by Halo.

## Context
Use the approved plan and `contracts/broker-halo.md`.

## Sources
`dcs-file-picker/src`, `test/broker.test.mjs`, and broker documentation.

## Ownership
Shared broker implementation, tests, central sample/configuration, and broker docs only.

## Write scope
- `dcs-file-picker/`

## Coordination rule
You are not alone in the codebase. Do not revert edits made by others. Adapt to nearby changes.

## Do
Add robust context resolution, direct URL encoding, byte-size fallback, central favorite-sites configuration/deployment/version guidance, graceful failures, and focused tests.

## Do not
Edit Halo or workflow files; add build tooling; deploy; hardcode Halo/tenant behavior.

## Expected output
Implementation, tests, docs, and a concise result with changed files and evidence.

## Verification
Run `node --test test/broker.test.mjs`.

## Handoff format
Use the Ultracode shared-behavior handoff block.
