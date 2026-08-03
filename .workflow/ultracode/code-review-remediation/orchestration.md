# Orchestration

## Parent critical path

Preserve user documentation changes, define contracts, integrate packet diffs, consolidate the review record, and run final browser/static verification.

## Packets

- 01 Halo runtime: write-capable agent, `halo-banner/halo-banner-maker.js` only.
- 02 Broker runtime/tests: write-capable agent, broker core/provider/dialog/tests only.
- 03 Documentation/integration: parent.
- 04 Independent review: read-only agent after integration.

## Delegation

One parallel implementation wave, followed by one review wave.

## Agents

Two write-capable implementation agents and one read-only reviewer; parent owns final integration.

## Delegation limits

Three sidecars total, two waves, no commit/push/deployment.

## Wait points

Parent may prepare documentation and verification while packets run, then waits before integration and final review.

## Fallback

Parent completes a bounded packet if an agent blocks or returns incomplete evidence.

## Verification order

Packet checks; source/diff review; broker suite; Halo syntax/static checks; CSS consistency; browser regression; independent audit.
