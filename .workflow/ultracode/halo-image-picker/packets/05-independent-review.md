# Packet 05: Independent cross-surface review

## Objective
Independently audit the complete feature against the eval contract and approved plan.

## Context
Read-only review after a crashed implementation wave. Focus on actual behavior, not stylistic preferences.

## Sources
All changed broker/Halo files and workflow contracts.

## Ownership
Read-only; no repository edits.

## Do
Trace local and SharePoint pick/save flows, optimization decisions, check caching, output guards, direct URLs, dependency failure, DOM IDs, and broker availability. Cite file/line evidence and rank concrete defects.

## Do not
Edit files, repeat broker unit tests without reason, or review unrelated legacy code.

## Expected output
Findings-first audit, contract coverage, required fixes, and remaining live-environment risks.

## Verification
Safe read-only commands and syntax/static analysis.

## Handoff format
Summary, evidence, risks, recommended parent actions.
