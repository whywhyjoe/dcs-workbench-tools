import React from 'react';

/* Two shapes, one idea. Default: the active tab drops to the surface it
   opens (editor ground) and carries a 2px accent top bar — for tabs OVER a
   surface. Underline: for tabs inside a view, sitting on the panel ground. */
export function Tabs({ tabs = [], value, onChange, underline = false, className = '', ...rest }) {
  return (
    <div className={['dcs-tabs', underline ? 'dcs-tabs-underline' : '', className].filter(Boolean).join(' ')} role="tablist" {...rest}>
      {tabs.map(t => {
        const v = typeof t === 'string' ? t : t.value;
        const label = typeof t === 'string' ? t : t.label;
        const count = typeof t === 'string' ? null : t.count;
        return (
          <button key={v} type="button" role="tab" aria-selected={v === value}
            className={'dcs-tab' + (v === value ? ' is-active' : '')}
            onClick={onChange ? () => onChange(v) : undefined}>
            {label}
            {count ? <span className="dcs-count">{count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
