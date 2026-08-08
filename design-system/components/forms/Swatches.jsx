import React from 'react';

/* Curated colours, never a free picker. Three to six values that the tool's
   output actually supports. */
export function Swatches({ colors = [], value, onChange, className = '', ...rest }) {
  return (
    <span className={('dcs-swatches ' + className).trim()} {...rest}>
      {colors.map(c => (
        <button key={c} type="button" title={c} aria-label={c}
          className={'dcs-swatch' + (c === value ? ' is-active' : '')}
          style={{ background: c }}
          onClick={onChange ? () => onChange(c) : undefined} />
      ))}
    </span>
  );
}
