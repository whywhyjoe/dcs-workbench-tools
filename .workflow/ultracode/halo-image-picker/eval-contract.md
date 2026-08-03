# Eval contract

## Goal
Deliver a resilient browser-only image selection and optimization workflow in Halo while improving the shared File Broker for reusable DCS Workbench consumers.

## Success criteria
- Broker supplies valid direct SharePoint URLs, robust context discovery, reliable byte sizes, favorite sites, and graceful typed failures.
- Halo can open local/SharePoint images, inspect and optionally optimize them, save final bytes to SharePoint, and assign only successful direct URLs.
- Output guards are cached by unchanged normalized URL and serialize user decisions.
- Existing manual URL, preview, emitted HTML, and standalone SVG behavior remain available.

## Integration surfaces
- `dcs-file-picker/src/file-broker.js` public exports and provider result shapes.
- SharePoint provider `open/read/write`, context adapter, URL construction, and site catalog.
- Halo DOM IDs/classes/config globals consumed by `halo-banner-maker.js`.
- Halo emitted HTML/SVG action handlers and inspected-blob reuse.

## Downstream consumers
Halo Banner Maker and future DCS Workbench tools importing an immutable broker version.

## Required checks
- Broker Node tests pass, including new provider helpers and fallback behavior.
- Halo JavaScript parses and all referenced DOM IDs exist.
- Inline CSS generated in HTML matches source CSS.
- Unsupported/canceled/failure flows preserve the prior URL and release busy UI.
- Diff review confirms no component geometry or emitted banner CSS drift.

## Deliverables
Broker implementation/tests/config/docs; Halo HTML/CSS/JS/static compression dependency/docs; Ultracode integration and audit artifacts.

## Blocking conditions
Syntax/test failures, unresolved broker-Halo shape mismatch, destructive URL mutation on cancellation, external server processing, or mandatory runtime build tooling.
