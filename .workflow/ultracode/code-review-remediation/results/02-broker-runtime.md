# Packet 02 result: Broker read and listing performance

## Status

Complete and accepted.

## Summary

The broker passes its effective byte ceiling to providers; SharePoint rejects a known-large
response before buffering; the core measures buffered payloads for final enforcement.
Browsable listings render all entries in cancellable 200-row animation-frame batches, and
provider switches invalidate old batches before asynchronous setup.

## Files changed

- `dcs-file-picker/src/file-broker.js`
- `dcs-file-picker/src/providers/sharepoint.js`
- `dcs-file-picker/src/dialog.js`
- `dcs-file-picker/test/broker.test.mjs`

## Verification

- `node --test test/broker.test.mjs`: 45/45 passed.
- Syntax checks passed for all modified broker modules.
- Tests cover ceiling propagation, early rejection without body consumption, actual-size
  reporting for a falsely low header, and post-read rejection when provider metadata is
  missing or inaccurate.

## Handoff

The new `read` option is backward-compatible. Missing or dishonest response size metadata
can still require full buffering; preventing that requires bounded provider streaming.
Batching is not virtualization and still creates every row eventually.
