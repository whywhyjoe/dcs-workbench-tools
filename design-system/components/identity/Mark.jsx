import React from 'react';

/* A PIXEL ALPHABET, NOT A LOGO. Every workbench-class (L1) tool gets a letter
   drawn on a 4 × 5 grid inside a tinted tile: the tile is the constant, the
   letter changes per tool. D is the primary — the team (DCS) and the flagship
   tool (DCSPad).
   Cells 3px, gap 1.5px, tile padding 4px, radius 6px; double both for a
   masthead (size="lg"). Lit cells --accent, off cells --logo-dim, and two lit
   cells per mark drop to 55% so the mark reads as a display that is ON.
   A letter that will not read on the grid is a sign the tool needs a
   different name, not a bigger grid. */
export const GRIDS = {
  D: 'XXX. X..o X..X X..o XXX.',
  S: '.XXX X... .oX. ...X XXX.',
  I: 'XXXX .Xo. .XX. .oX. XXXX',
  Q: '.XX. X..X X..X X.oX .XXX',
};

export function Mark({ letter = 'D', grid, size = 'md', className = '', ...rest }) {
  const cells = (grid || GRIDS[letter] || GRIDS.D).replace(/ /g, '').split('');
  return (
    <span className={['dcs-mark', size === 'lg' ? 'dcs-mark-lg' : '', className].filter(Boolean).join(' ')}
      role="img" aria-label={letter + ' mark'} {...rest}>
      {cells.map((c, i) => <i key={i} className={c === 'X' ? 'on' : c === 'o' ? 'dim' : ''} />)}
    </span>
  );
}

/* L2 tools get NO letter. Four cells, one accent hue, four brightness steps
   — no tile, no outline, no background. It marks the family; the tool's name
   does the identifying. */
export function InstrumentMark({ size = 'md', className = '', ...rest }) {
  return (
    <span className={['dcs-mark-2x2', size === 'lg' ? 'dcs-mark-2x2-lg' : '', className].filter(Boolean).join(' ')}
      role="img" aria-label="DCS instrument" {...rest}><i /><i /><i /><i /></span>
  );
}

/* Mono, split weight: quiet prefix, accent suffix. */
export function Wordmark({ head = 'DCS', tail = 'PAD', className = '', ...rest }) {
  return <span className={('dcs-wordmark ' + className).trim()} {...rest}>{head}<b>{tail}</b></span>;
}
