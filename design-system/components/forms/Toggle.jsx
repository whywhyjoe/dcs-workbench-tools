import React from 'react';

/* A binary setting that takes effect immediately. If it needs a Save to
   apply, it is a checkbox in a form, not a toggle. */
export function Toggle({ label, checked, onChange, disabled, className = '', ...rest }) {
  return (
    <label className={('dcs-toggle ' + className).trim()} {...rest}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} />
      <span className="dcs-toggle-pill" />
      {label}
    </label>
  );
}

/* Checkbox — a value in a form, submitted with everything else. */
export function Check({ label, className = '', ...rest }) {
  return (
    <label className={('dcs-check ' + className).trim()}>
      <input type="checkbox" {...rest} />
      {label}
    </label>
  );
}
