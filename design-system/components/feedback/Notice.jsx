import React from 'react';

/* Notices name the specific object and lead with the machine fact.
   "403 — the request digest expired. Retrying once." Never "Oops". */
export function Notice({ tone = 'default', icon, children, actions, className = '', ...rest }) {
  const t = { info: 'dcs-notice-info', ok: 'dcs-notice-ok', warn: 'dcs-notice-warn', err: 'dcs-notice-err', default: '' }[tone] || '';
  return (
    <div className={['dcs-notice', t, className].filter(Boolean).join(' ')} role={tone === 'err' ? 'alert' : undefined} {...rest}>
      {icon}
      <span className="dcs-notice-body">{children}</span>
      {actions}
    </div>
  );
}

/* Bottom-right, above the status bar. One event, one toast. */
export function Toast({ children, className = '', ...rest }) {
  return <div className={('dcs-toast ' + className).trim()} role="status" {...rest}>{children}</div>;
}
