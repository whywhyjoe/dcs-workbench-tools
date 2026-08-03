# Packet 01: Halo reliability and render performance

## Objective

Eliminate duplicate initialization/global leakage and remove unnecessary high-frequency CSS/output regeneration without changing Halo behavior.

## Context

Current runtime is a classic script with two global functions, a polling bootstrap, synchronous `render() -> emit()`, and per-render `scopedComponentCss()`.

## Sources

- `halo-banner/halo-banner-maker.js`
- `halo-banner/AGENTS.md`
- `halo-banner/README.md`
- root and Halo Gemini reviews

## Ownership

Write-capable; runtime file only.

## Write scope

- `halo-banner/halo-banner-maker.js`

## Coordination rule

You are not alone in the codebase. Do not revert edits made by others. Adapt to nearby changes.

## Do

- Wrap private runtime implementation in an IIFE appropriate for a classic SharePoint script.
- Preserve intentional globals (`HALO_IMAGE_PICKER_CONFIG`, compressor API) and capture the executing script URL correctly.
- Add a robust per-root initialization guard before event binding.
- Cache scoped component CSS once per initialized root/session.
- Avoid rebuilding hidden emitted markup for every slider tick; ensure Copy and Show code synchronously flush the latest state and SVG behavior remains current.
- Consider requestAnimationFrame coalescing only if it cannot make output stale.
- Add deterministic instrumentation/checks if feasible without introducing a toolchain.

## Do not

- Change security/config URL policy, polling behavior unless required by isolation, component CSS/geometry, output HTML/SVG semantics, dependencies, or documentation.
- Commit, push, publish, or deploy.

## Expected output

Minimal runtime diff with exact behavior explanation and verification evidence.

## Verification

`node --check`; static inspection; local browser duplicate-init and output-current checks.

## Handoff format

Summary, changed surface, decisions, checks, remaining risks.
