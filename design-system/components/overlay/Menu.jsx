import React from 'react';

/* Floats above the app, so it carries the one shadow. Drops in on the move
   beat. Esc closes it before it closes anything else. */
export function Menu({ children, className = '', style, ...rest }) {
  return <div className={('dcs-menu ' + className).trim()} role="menu" style={style} {...rest}>{children}</div>;
}
export function MenuLabel({ children }) { return <div className="dcs-menu-label">{children}</div>; }
export function MenuItem({ lead, active = false, children, className = '', ...rest }) {
  return (
    <button type="button" role="menuitem" className={('dcs-menu-item ' + className).trim()}
      style={active ? { background: 'var(--bg-3)', color: 'var(--fg-strong)' } : undefined} {...rest}>
      {lead}{children}
    </button>
  );
}
export function MenuSep() { return <div className="dcs-menu-sep" />; }
