# Kickoff prompt

Paste this at the start of a session where you want Claude Code to build a new
DCS Workbench app. Fill in the last line.

---

```
Use the DCS Workbench method for this build.

READ FIRST, in whywhyjoe/dcs-workbench-tools:
  1. docs/README.md — the index; it says which doc covers what
  2. docs/00-system-model.md — what a DCS app is, the L1/L2 tiers, the invariants
Then pull only the topic docs this task actually needs. Don't read all nine.

DESIGN: the design system is design-system/ in that same repo. Invoke its
dcs-workbench-design skill rather than working from a token list.

BEFORE WRITING CODE:
  - Pick the tier (L1 workbench vs L2 instrument) using the decision list in
    00-system-model.md. Tell me which and why. Ask me if it's genuinely
    ambiguous — getting this wrong is the expensive mistake.
  - Skim OPEN-ITEMS.md so you don't trip over known gaps.
  - Propose the file layout and the plan, then wait for my go-ahead.

NEVER INVENT A SHAREPOINT URL. Every runtime location comes from the app's
config document — ask me for the real ones. URLs written in the repos are
close but wrong.

WHAT I WANT TO BUILD:
```

---

## Shorter version

When you already know the tier and just want it to follow the house style:

```
Follow the DCS Workbench method — read docs/README.md and docs/00-system-model.md
in whywhyjoe/dcs-workbench-tools first, then only the topic docs you need. Use
the dcs-workbench-design skill in that repo's design-system/ folder for anything
visual. Ask me for real SharePoint URLs; never invent one. Propose the plan
before writing code.

Build: <L1 or L2> — <what it does>
```

## Why these lines are in there

Each one is a failure this system has already paid for:

- **"Read the index first, then only what you need"** — the docs are split so a
  session can load two files instead of nine. Reading everything wastes the
  context the build needs.
- **"Pick the tier first"** — tier drives hosting, shell, styling, and
  complexity together. An L2 tool that fakes an L1 takeover produces the
  blank-page-in-view-mode failure that cost a live deploy.
- **"Invoke the skill"** — the design system carries guidelines, specimen pages,
  brand marks, fonts, and templates that no summarised token list replaces.
- **"Never invent a SharePoint URL"** — repo URLs are stale, some point at the
  wrong tenant, and a hardcoded one defeats the config seam the whole method
  is built around.
- **"Propose the plan first"** — hosting and boot decisions are expensive to
  unwind once code exists on top of them.
