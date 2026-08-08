import React from 'react';

/* Label left, optional live value right in mono, control below, optional
   hint under that. The value is always visible on anything numeric — a
   slider with no readout is unusable in a generator. */
export function Field({ label, value, hint, invalid, children, className = '', ...rest }) {
  return (
    <div className={('dcs-field ' + className).trim()} {...rest}>
      {(label || value) && (
        <span className="dcs-label">
          <span style={invalid ? { color: 'var(--error-fg)' } : undefined}>{label}</span>
          {value != null ? <span className="dcs-value">{value}</span> : null}
        </span>
      )}
      {children}
      {hint ? <span className="dcs-hint" style={invalid ? { color: 'var(--error-fg)' } : undefined}>{hint}</span> : null}
    </div>
  );
}

/* mono for anything a machine produced or will consume — paths, URLs, GUIDs. */
export function Input({ mono, invalid, className = '', ...rest }) {
  return <input className={['dcs-input', mono ? 'dcs-input-mono' : '', invalid ? 'is-invalid' : '', className].filter(Boolean).join(' ')} {...rest} />;
}
export function Textarea({ mono, invalid, className = '', ...rest }) {
  return <textarea className={['dcs-textarea', mono ? 'dcs-textarea-mono' : '', invalid ? 'is-invalid' : '', className].filter(Boolean).join(' ')} {...rest} />;
}
export function Select({ options = [], className = '', children, ...rest }) {
  return (
    <select className={('dcs-select ' + className).trim()} {...rest}>
      {children || options.map(o => {
        const v = typeof o === 'string' ? o : o.value;
        return <option key={v} value={v}>{typeof o === 'string' ? o : o.label}</option>;
      })}
    </select>
  );
}
