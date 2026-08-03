# Integration

## Accepted

All four packets were accepted after reconciliation: Halo runtime, broker runtime/tests,
documentation consolidation, and independent audit.

## Rejected

No packet was rejected.

## Conflicts and resolutions

The independent audit found that low but nonzero size metadata could bypass the intended
post-read ceiling, and that provider-switch batch cancellation happened too late. Both were
resolved in the integration pass and re-audited successfully.

## Shared contract

Halo initializes each root once, keeps preview state immediate, and flushes serialized
markup only when visible or required by Copy/Show. The broker gives providers the effective
read ceiling, rejects known-large SharePoint responses before buffering, and independently
measures buffered payloads afterward. Broker listing batches retain every entry and are
invalidated before navigation, provider changes, close, or failure can mix states.

## Deferred by scope

Dot-segment path hardening and executable configuration URL policy were deliberately not
implemented. No authenticated SharePoint deployment test was available.

## Generated assets

`python halo-banner/inline-css.py` completed without changing the generated HTML.
