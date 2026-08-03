# Packet 02: Halo UI

## Objective
Implement DCS-consistent picker controls, size status, warning/notice/dialog surfaces, and documentation.

## Context
Markup must expose stable IDs for runtime packet 03. Tool styles belong in `halo-overrides.css`; run `inline-css.py` after edits.

## Sources
Halo HTML/CSS/docs and DCS design patterns already present in the project.

## Ownership
Halo HTML, tool CSS, generated inline CSS, and Halo docs only.

## Write scope
- `halo-banner/halo-banner-maker.html`
- `halo-banner/halo-overrides.css`
- `halo-banner/README.md`
- `halo-banner/AGENTS.md`

## Coordination rule
You are not alone in the codebase. Do not revert edits made by others. Adapt to nearby changes.

## Do
Add welded icon-only upload buttons for `purl` and `bgurl`; compact FG/BG size indicator and one warning icon; accessible status/notice/decision UI and busy styling; document sanctioned static broker/compressor dependencies.

## Do not
Edit JavaScript, component CSS, design-system source, geometry, or broker files.

## Expected output
Stable DOM IDs/classes, source CSS plus regenerated inline block, docs, and result evidence.

## Verification
Run `python inline-css.py` and confirm only intended inline blocks change.

## Handoff format
List every runtime-facing ID/class and accessibility behavior.
