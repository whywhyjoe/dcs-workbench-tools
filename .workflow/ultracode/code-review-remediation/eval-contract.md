# Eval contract

## Goal

Improve reliability and near-term performance without changing user-visible Halo output, weakening broker behavior, or implementing deferred security work.

## Success criteria

- Duplicate Halo runtime evaluation binds a root no more than once.
- Current preview/output actions remain correct after render/emit optimization.
- Broker byte limits are communicated to providers and applied before known oversized response bodies are buffered.
- Every listed broker entry remains reachable while initial large-list rendering is bounded/batched.
- Existing public APIs remain source-compatible.

## Integration surfaces

- Halo initialization, render, emit, Copy, Show code, SVG, and output guards.
- Broker `read(providerId, entry, options)` to provider `read(entry, options)` contract.
- Broker dialog listing DOM and interaction state.
- Consolidated root review documentation.

## Downstream consumers

Halo Banner Maker and future DCS Workbench applications using the File Broker.

## Required checks

- Broker suite passes with focused byte-limit/listing coverage where testable.
- Halo runtime parses and duplicate-init/current-output behavior receives browser or deterministic evidence.
- No component geometry or generated banner CSS changes.
- Security findings remain documented and unmodified.

## Deliverables

Runtime changes, focused tests, consolidated `code-review-process.md`, deleted Gemini review files, workflow integration/final reports.

## Blocking conditions

Stale Copy/Show/SVG output, inaccessible listing entries, broken manual URL fallback, public API incompatibility, syntax/test failure, or accidental security-scope changes.
