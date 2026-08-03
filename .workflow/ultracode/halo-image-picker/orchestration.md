# Orchestration

## Parent critical path
Define contracts, inspect integration points, review packet diffs, reconcile Halo UI/runtime IDs and broker shapes, then verify.

## Packets
- 01 broker core and tests: write-capable agent.
- 02 Halo UI and docs: write-capable agent.
- 03 Halo runtime and vendor asset: write-capable agent.

## Delegation
One implementation wave followed by a crash-recovery/review wave. The original runtime agent was interrupted; packet 04 recovers its surviving edits and packet 05 independently reviews all shared surfaces.

## Agents
Five native agents total across the run: three original implementation agents, one runtime recovery agent, and one read-only reviewer. The parent retains workflow artifacts, integration, browser checks, and final audit.

## Delegation limits
Five agents total, one broad implementation wave and one recovery/review wave; no deployment.

## Wait points
Parent may inspect while packets run, then waits for all results before integration.

## Fallback
If an agent blocks, the parent completes that bounded scope after integrating successful packets.

## Verification order
Broker tests; Halo syntax/static contracts; CSS inline consistency; diff review; manual/browser checklist.
