# Halo image picker and optimization

## Goal
Implement the approved Halo foreground/background file-picking, SharePoint save, image inspection, and client-side optimization feature using the shared DCS File Broker.

## Success criteria
- Local and SharePoint JPEG/PNG/WebP selection works for both image fields; SVG is rejected.
- Local and optimized files are saved through SharePoint and fields receive direct, non-sharing URLs.
- 2000px/400 KiB guards run at pick time and before Copy, Show code, or SVG, without redundant prompts.
- Header size status, one warning icon, accessibility, and DCS visual consistency are present.
- Manual URLs and current output actions fail gracefully when optional dependencies are unavailable.
- Shared broker behavior is distributable, versionable, documented, and covered by tests.

## Current context
The clean `halo-filepick` branch contains sibling `halo-banner` and `dcs-file-picker` projects. Halo is static HTML/classic JS with generated inline CSS. The broker is dependency-free ES modules with Node tests.

## Constraints
- No bundler, package manager, server-side processing, deployment, commit, or push.
- Preserve Halo component CSS/export geometry and existing manual URL workflow.
- Keep generic SharePoint behavior in the broker and Halo image policy in Halo.
- Preserve user work and integrate only packet-owned edits.

## Risk level
High: public shared module, SharePoint context/auth behavior, async output gating, binary image transforms, generated HTML CSS.

## Approval gates
No additional gate: the user explicitly requested implementation. Publishing/deployment and destructive repository operations remain excluded.

## Mode
Delegated Ultracode workflow with three write-capable agents and parent integration.

## Work packets
- 01 broker: shared context/direct-URL/size fixes, favorites config, tests, broker docs.
- 02 Halo UI: markup, DCS-styled controls/status/dialog surfaces, generated inline CSS, Halo docs.
- 03 Halo runtime: broker integration, check cache, optimization, upload/save flows, guarded actions, static compressor asset.
- Parent: contracts, integration, cross-surface fixes, full verification, final audit.

## Eval contract
Full contract in `eval-contract.md`; broker-to-Halo guarantees are in `contracts/broker-halo.md`.

## Integration policy
The parent reviews every diff and result, validates shared contracts, resolves cross-surface mismatches, and owns final changes outside packet scopes. No packet may revert another packet.

## Verification plan
Run broker Node tests, JavaScript syntax checks, CSS inlining consistency check, static ID/config contract checks, git diff checks, and browser-capable smoke checks where the environment permits. Record live SharePoint checks as skipped if no authenticated tenant is available.

## Completion criteria
All deliverables exist, required local checks pass, skipped environment-dependent checks are explicit, and the final audit finds no unresolved contract or regression blocker.
