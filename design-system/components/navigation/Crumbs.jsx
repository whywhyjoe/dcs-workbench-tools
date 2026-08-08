import React from 'react';

/* Always mono — a breadcrumb is a path, and a path is machine output. The
   last segment is not a button. */
export function Crumbs({ items = [], onNavigate, className = '', ...rest }) {
  return (
    <nav className={('dcs-crumbs ' + className).trim()} aria-label="Breadcrumb" {...rest}>
      {items.map((it, i) => {
        const label = typeof it === 'string' ? it : it.label;
        const last = i === items.length - 1;
        return (
          <React.Fragment key={label + i}>
            {last
              ? <span className="dcs-crumb is-current" aria-current="page">{label}</span>
              : <button type="button" className="dcs-crumb" onClick={onNavigate ? () => onNavigate(it, i) : undefined}>{label}</button>}
            {last ? null : <span className="dcs-crumb-sep" aria-hidden="true">›</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
