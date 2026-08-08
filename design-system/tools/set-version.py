"""Stamp the design system's version across its shipped files.

The VERSION file beside this folder is the single source of truth. This script
propagates it into the two places a *deployed* copy can be read from without
git:

  1. The /*! ... */ banner on the first line of each shipped CSS/JS file.
  2. The --ds-version custom property, in tokens/colors.css and in the
     standalone paste-inline build.

Why it exists: this system ships in three shapes — the split sheets, the
single-file standalone build, and copies inlined into tools like Halo. Without
a stamp there is no way to tell which one a live page is running, and answering
that took a full reconciliation once already. A stamped copy answers it in one
line from the browser console:

    getComputedStyle(document.documentElement).getPropertyValue('--ds-version')

Usage
-----
    python tools/set-version.py 1.1.0    set a new version and stamp everything
    python tools/set-version.py          re-stamp the current VERSION (repairs
                                         drift, or picks up a newly added file)
    python tools/set-version.py --check  verify only; non-zero exit on any drift

--check is the deploy gate. Run it before shipping; a mismatch means some file
was hand-edited or a new one was never added to STAMPED below.

Idempotent. Preserves each file's existing line endings and writes no BOM —
SharePoint serves these files as-is and a BOM leaks into the page.

After a version bump, remember the consumers that carry their own copy:
copy assets/dcs-workbench.standalone.css over halo-banner/dcs-workbench.css and
re-run halo-banner/inline-css.py, or Halo ships a stale version string.
"""

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VERSION_FILE = ROOT / "VERSION"

SEMVER_RE = re.compile(r"^\d+\.\d+\.\d+(-[A-Za-z0-9.]+)?$")

# Files that carry the banner. Add new shipped CSS/JS here — a file missing
# from this list is exactly what --check is designed to catch later.
#
# Deliberately excluded: _ds_bundle.js, whose first line is a generated
# @ds-bundle JSON header owned by other tooling; prepending to it would corrupt
# that header.
STAMPED = [
    "styles.css",
    "base.css",
    "dcs-workbench.css",
    "dcs-additions.css",
    "tokens/colors.css",
    "tokens/typography.css",
    "tokens/fonts.css",
    "tokens/spacing.css",
    "tokens/motion.css",
    "tokens/elevation.css",
    "assets/dcs-workbench.standalone.css",
    "assets/icons.js",
]

# Files that additionally carry the runtime-readable token.
TOKEN_HOSTS = [
    "tokens/colors.css",
    "assets/dcs-workbench.standalone.css",
]

BANNER_RE = re.compile(r"^/\*!\s*DCS Workbench Design System.*?\*/\r?\n", re.S)
DS_VERSION_RE = re.compile(r'--ds-version:\s*"[^"]*";')


def banner(version, name, eol):
    return f"/*! DCS Workbench Design System · v{version} · {name} */{eol}"


def read(path):
    """Read as text without translating newlines, so we can preserve them.

    open(newline="") rather than Path.read_text(newline=...) — the latter is
    Python 3.13+, and this has to run on whatever is on the dev machine.
    """
    with path.open("r", encoding="utf-8", newline="") as handle:
        return handle.read()


def write(path, text):
    """Write UTF-8 with no BOM and no newline translation."""
    with path.open("w", encoding="utf-8", newline="") as handle:
        handle.write(text)


def stamp(text, version, name):
    """Return `text` with the banner and (where applicable) the token set."""
    eol = "\r\n" if "\r\n" in text else "\n"
    new = BANNER_RE.sub(banner(version, name, eol), text, count=1)
    if new == text and not BANNER_RE.match(text):
        new = banner(version, name, eol) + text

    if name in TOKEN_HOSTS:
        if not DS_VERSION_RE.search(new):
            raise SystemExit(
                f"{name} has no --ds-version declaration to update.\n"
                f"Add `--ds-version: \"0.0.0\";` inside its :root block first."
            )
        new = DS_VERSION_RE.sub(f'--ds-version: "{version}";', new)
    return new


def current_version():
    if not VERSION_FILE.exists():
        raise SystemExit(f"No VERSION file at {VERSION_FILE}")
    value = VERSION_FILE.read_text(encoding="utf-8").strip()
    if not value:
        raise SystemExit("VERSION file is empty")
    return value


def main():
    parser = argparse.ArgumentParser(
        description="Stamp the design system version across shipped files.")
    parser.add_argument("version", nargs="?",
                        help="new semver, e.g. 1.1.0 (omit to re-stamp VERSION)")
    parser.add_argument("--check", action="store_true",
                        help="verify only; exit non-zero if anything is out of sync")
    args = parser.parse_args()

    if args.check and args.version:
        raise SystemExit("--check takes no version argument")

    version = args.version or current_version()
    if not SEMVER_RE.match(version):
        raise SystemExit(f"Not a valid semver: {version}")

    missing, drifted, changed = [], [], 0

    for name in STAMPED:
        path = ROOT / name
        if not path.exists():
            missing.append(name)
            continue

        text = read(path)
        new = stamp(text, version, name)

        if args.check:
            if new != text:
                drifted.append(name)
            continue

        if new != text:
            write(path, new)
            print(f"  stamped  {name}")
            changed += 1
        else:
            print(f"  current  {name}")

    if args.check:
        problems = False
        if missing:
            problems = True
            print("missing (listed in STAMPED but not on disk):", file=sys.stderr)
            for name in missing:
                print(f"  {name}", file=sys.stderr)
        if drifted:
            problems = True
            print(f"not stamped at v{version}:", file=sys.stderr)
            for name in drifted:
                print(f"  {name}", file=sys.stderr)
        if problems:
            print("\nRun: python tools/set-version.py", file=sys.stderr)
            raise SystemExit(1)
        print(f"All {len(STAMPED)} shipped files are stamped at v{version}.")
        return

    for name in missing:
        print(f"  MISSING  {name}  (remove it from STAMPED, or restore the file)")

    write(VERSION_FILE, f"{version}\n")
    print(f"\nVersion {version} — {changed} file(s) updated.")
    print("Review the diff and commit; consider: git tag ds-v" + version)
    print("Consumers with their own copy (Halo) need a re-sync — see the "
          "module docstring.")


if __name__ == "__main__":
    main()
