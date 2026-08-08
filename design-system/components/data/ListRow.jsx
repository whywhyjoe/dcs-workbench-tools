import React from 'react';

/* Sidebar catalogs and file pickers. Selected rows keep a RESTING state —
   accent rail + chrome ground — so selection survives losing hover. Row
   tools fade in with opacity, not visibility, so they stay clickable and
   testable. */
export function ListRow({ lead, name, meta, tools, on = false, muted = false, className = '', ...rest }) {
  return (
    <div className={['dcs-listrow', on ? 'is-on' : '', className].filter(Boolean).join(' ')} {...rest}>
      {lead}
      <span className="dcs-listrow-name" style={muted ? { color: 'var(--fg-faint)', fontStyle: 'italic' } : undefined}>{name}</span>
      {meta ? <span className="dcs-listrow-meta">{meta}</span> : null}
      {tools ? <span className="dcs-listrow-tools">{tools}</span> : null}
    </div>
  );
}
