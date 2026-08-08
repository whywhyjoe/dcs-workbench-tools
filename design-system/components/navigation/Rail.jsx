import React from 'react';

/* The left rail of an L1 workbench. Group it — three labelled groups turn
   scanning into recognition. The whole strip is the hit target, not the
   label box. The active item gets the soft accent wash plus a 2px inset
   rail; it does NOT get the solid fill. */
export function Rail({ children, className = '', ...rest }) {
  return <nav className={('dcs-rail ' + className).trim()} {...rest}>{children}</nav>;
}

export function RailLabel({ children }) {
  return <div className="dcs-rail-label">{children}</div>;
}

export function RailItem({ glyph, active = false, children, className = '', ...rest }) {
  return (
    <button type="button" className={['dcs-rail-btn', active ? 'is-active' : '', className].filter(Boolean).join(' ')} aria-current={active ? 'page' : undefined} {...rest}>
      {glyph ? <span className="dcs-rail-glyph">{glyph}</span> : null}
      {children}
    </button>
  );
}

export function RailSep() { return <div className="dcs-rail-sep" />; }
