# Product marks

Marks the shipping app uses that are **not** DCS Workbench's own. They live
here, and as `<ProductGlyph name="…" />`, rather than in the icon set, so
nobody mistakes them for system glyphs.

**The settings gear is not one of them.** The app's topbar draws Microsoft's
filled Fluent gear (`fui-Icon`, 16 grid, `fill="currentColor"`). The system
does not: there is exactly **one gear**, the Lucide outline at
`<Icon name="settings" />`, and it is the gear everywhere — topbar, rail
(`advanced` is an alias of it), and any tool built on this system. Swapping the
Fluent gear for it is a one-line change in the app and is the recommended one.

| File | Where it is used | Provenance |
| --- | --- | --- |
| `copilot.svg` | Topbar → *Open Microsoft 365 Copilot* (`#btn-copilot`, hidden until `config.copilot.enabled`) | Microsoft Fluent UI, copied verbatim from `index.html` in whywhyjoe/sp-dcspad |
| `sharepoint.svg` | Topbar → *Open SP Workbench* (`#btn-sp`), between Copilot and Settings | The SharePoint mark, drawn on the 24 grid at stroke 1.5 — same file, same source |

**Trademark:** these are Microsoft marks. Use them only where they point at the
Microsoft product they name. Do not recolour them into the accent, do not put
them on a solid accent fill, and do not use them as decoration. The system's
own line gear (`<Icon name="settings" />`) is the right glyph everywhere the
button is *not* opening a Microsoft surface.

**The SharePoint mark is the one product mark that is also a system glyph.**
Unlike Copilot and the Fluent gear it is drawn to the system's own rule — 24
grid, stroke 1.5, `currentColor`, no fill — so it sits correctly in a row of
DCS glyphs and is available as `<Icon name="sharepoint" />`. It is still a
trademark: use it only where the control opens SharePoint.

**The suite bar is not in here.** That chrome — waffle, search, account — is
rendered by the host page; the app never draws it, and the waffle in the
reference comps is a placeholder.
