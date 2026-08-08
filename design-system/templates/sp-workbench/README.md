# UI kit · SP Workbench (L1)

The upgraded SP Workbench from the primary source project's comp: grouped
rail, a real breadcrumb bar, an eyebrow + title + hint page header, the data-
grid spec, and coloured node glyphs in place of the old yellow OS folders.

## Anatomy

| Region | Spec |
| --- | --- |
| Shell | `42px` topbar / `1fr` / `26px` status bar — the comp runs slightly taller chrome than DCSPad. |
| Rail | 176px, grouped Site / Content / Tools, 30px rows, one active item. |
| Breadcrumb bar | 32px on `--bg-editor`, mono crumbs, permission read-out on the right. |
| Page header | Eyebrow (accent-dim, .16em) → 17/600 title → one hint line, actions right. |
| Grid | `minmax(0,1fr) 110 110 130 80 72`, sticky chrome header, accent underline on the sorted column, row tools revealed on hover. |

## What is interactive

- The rail switches views. **Files** and **Lists** are recreated; the other
  seven state plainly that they are not in the comp rather than inventing a
  screen.
- Grid rows hover-reveal download and copy-link tools; the Lists grid sorts.
- **Upload** raises the toast in the system's voice — it names the object.

## Known deviations

- The rail's Files, Permissions and Panels glyphs use the system's Lucide
  folder, shield and link rather than the comp's hand-built 16-grid versions;
  Site, Pages, Query and Advanced were copied into the icon set verbatim.
- The site picker, Inspect and Export menus are inert.

## Using this in a consuming project

The page links the design system by relative path — `../../styles.css` and
`../../_ds_bundle.js`, correct inside this design-system repo (two levels up).
A consuming project that copies this folder must repoint those two references
at its bound copy of the system (usually `_ds/<folder>/styles.css` and
`_ds/<folder>/_ds_bundle.js`, relative to wherever the page lands). Nothing
else needs to change.
