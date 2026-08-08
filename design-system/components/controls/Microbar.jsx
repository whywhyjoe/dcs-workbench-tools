import React from 'react';

/* THE XS ESCAPE HATCH. A whole toolbar inside a 22px strip — DCSPad's Browser
   address bar is the reference case: six controls and a live URL inside a
   230px sidebar. Controls are WELDED into one bordered strip with 1px
   dividers; six loose 20px buttons at this scale read as confetti.
   Glyph-only, and every child carries a title because the glyph is doing all
   the work. Do not build a whole view out of this. */
export function Microbar({ className = '', children, ...rest }) {
  return <span className={('dcs-microbar ' + className).trim()} {...rest}>{children}</span>;
}

/* The live value in the middle of the strip — mono, ellipsised, not editable. */
export function MicrobarValue({ children, ...rest }) {
  return <span className="dcs-microbar-value" {...rest}>{children}</span>;
}
