import React from 'react';

/* The little file-type pill. Same triple as the node glyph, so a selected
   file and its badge can never drift apart. */
export function Badge({ type, children, className = '', ...rest }) {
  return <span className={('dcs-badge ' + className).trim()} data-type={type} {...rest}>{children ?? type}</span>;
}

/* The context signal — one home per tool, in the topbar or the status bar. */
export function Chip({ tone = 'default', children, className = '', ...rest }) {
  const t = { ok: 'dcs-chip-ok', warn: 'dcs-chip-warn', err: 'dcs-chip-err', default: '' }[tone] || '';
  return (
    <span className={['dcs-chip', t, className].filter(Boolean).join(' ')} {...rest}>
      <span className="dcs-chip-dot" />{children}
    </span>
  );
}

/* The error count on a tab — red, because it is telling you where a failure is. */
export function CountPill({ children, className = '', ...rest }) {
  return <span className={('dcs-count ' + className).trim()} {...rest}>{children}</span>;
}

export function Kbd({ children, className = '', ...rest }) {
  return <kbd className={('dcs-kbd ' + className).trim()} {...rest}>{children}</kbd>;
}
