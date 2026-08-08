import React from 'react';

/* Two to four mutually exclusive views. The active segment fills with --bg-3
   and its label goes accent — it is not a solid accent fill, so it never
   spends the screen's one accent budget. */
export function Segmented({ options = [], value, onChange, className = '', ...rest }) {
  return (
    <span className={('dcs-seg ' + className).trim()} role="tablist" {...rest}>
      {options.map(o => {
        const v = typeof o === 'string' ? o : o.value;
        const label = typeof o === 'string' ? o : o.label;
        return (
          <button key={v} type="button" role="tab" aria-selected={v === value}
            className={v === value ? 'is-active' : ''}
            onClick={onChange ? () => onChange(v) : undefined}>
            {label}
          </button>
        );
      })}
    </span>
  );
}
