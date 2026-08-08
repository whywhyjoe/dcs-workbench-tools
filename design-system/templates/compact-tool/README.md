# UI kit · Compact tool pattern (L2)

The L2 instrument in situ, recreated from the Compact Tool Pattern comp: a
single-purpose tool inside one web part, in normal page flow, on a light
SharePoint page it does not try to theme.

The Halo banner generator is **sample content**, exactly as the comp states —
take the shell and the controls, leave each tool's own decisions alone.

## Anatomy

| Region | Spec |
| --- | --- |
| Seat | In flow, own dark ground, 1px border, radius 6, real margins above and below. Never full-bleed. |
| Head | 40px, the 2×2 instrument mark (no letter), split-weight title, version pill, actions right. |
| Body | `340px` control column + canvas; stacks below 720px. |
| Groups | 9.5px uppercase group titles, hairline between groups, two- and three-up control rows. |
| Canvas | Own 30px toolbar (title, live size, Fit/100%, download, maximise) over a 24px lattice stage. |
| Footer | One info notice plus a mono "last generated" stamp. |

## What is interactive

Every slider, the swatches and the checkbox drive the artboard live; **Generate**
sweeps the canvas scan bar and updates the timestamp; the Fit/100% segment
switches.

## Known deviations

- The comp inlines a bespoke round-thumb range control (`.hslider`). This kit
  uses the system's `.dcs-slider` — 4px track, 5 × 12 thumb — because that is
  the sheet's named component and the one the system tells tools to adopt.
  If the round thumb is the intended spec, change `.dcs-slider` and both
  update.
- Copy code / Show code and the photo URL field are inert.

## Using this in a consuming project

The page links the design system by relative path — `../../styles.css` and
`../../_ds_bundle.js`, correct inside this design-system repo (two levels up).
A consuming project that copies this folder must repoint those two references
at its bound copy of the system (usually `_ds/<folder>/styles.css` and
`_ds/<folder>/_ds_bundle.js`, relative to wherever the page lands). Nothing
else needs to change.
