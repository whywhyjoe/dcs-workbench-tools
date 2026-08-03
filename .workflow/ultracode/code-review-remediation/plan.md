# Code-review reliability and performance remediation

## Goal

Implement the non-security reliability and near-term performance fixes accepted from the Gemini reviews, then consolidate the review history into one root document.

## Success criteria

- Halo cannot initialize the same root twice and no longer leaks implementation functions into the page global scope.
- Halo does not reparse unchanged component CSS or rebuild hidden output markup on every high-frequency input event; output actions still receive current markup.
- Broker reads reject known oversized responses before buffering and retain a post-read safety check.
- Large broker listings avoid one visible DOM mutation per row and remain completely accessible.
- Existing broker tests, Halo syntax, generated CSS, output behavior, and local browser flows pass.
- One root `code-review-process.md` records reviewed items, decisions, fixes, deferred security work, verification, and remaining issues; the three Gemini review files are removed.

## Current context

Branch `halo-filepick` at `55a16e7`. The worktree contains user-authored review updates and a root documentation rename from `index.md` to `readme.md`; these must be preserved. The three Gemini files are authorized for deletion after consolidation.

## Constraints

- Do not implement path traversal/canonicalization or configuration-origin hardening in this pass.
- Preserve the no-build runtime and all existing Halo output semantics.
- Keep broker changes generic and backward-compatible.
- Do not commit, push, publish, or deploy.

## Risk level

High: initialization and render scheduling affect every Halo interaction; the broker read contract is shared across consumers.

## Approval gates

Deletion of the three Gemini review files is explicitly authorized. No other destructive or external action is authorized.

## Mode

Delegated Ultracode workflow with two disjoint implementation packets and one independent review packet.

## Work packets

- 01 Halo reliability/performance: IIFE isolation, idempotency, scoped-CSS cache, current-output-safe render/emit optimization.
- 02 Broker performance/safety: early byte-ceiling propagation/enforcement and scalable listing rendering.
- 03 Parent documentation/integration: consolidate review record, remove source reviews, reconcile docs, verify.
- 04 Independent review: read-only regression and contract audit after integration.

## Eval contract

Full contract in `eval-contract.md` because this touches a shared public provider contract and a complex UI action flow.

## Integration policy

Agents own disjoint code surfaces. The parent reviews all diffs, owns documentation/deletions/workflow artifacts, and resolves cross-surface behavior.

## Verification plan

Broker Node tests; JavaScript syntax checks; CSS generation consistency; static DOM/config checks; local interactive browser regression; staged diff audit; independent review.

## Completion criteria

All accepted non-security fixes are implemented with evidence, security items are explicitly deferred, original review files are replaced by the consolidated record, and no unresolved regression blocker remains.
