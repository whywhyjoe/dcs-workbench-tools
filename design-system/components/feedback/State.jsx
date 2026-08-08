import React from 'react';

/* Empty, loading, error — one centred monospace line, no illustration.
   Say what would appear here and how to make it appear, then stop. */
export function State({ tone = 'empty', children, className = '', ...rest }) {
  const t = { loading: 'dcs-state-loading', err: 'dcs-state-err', empty: '' }[tone] || '';
  return <div className={['dcs-state', t, className].filter(Boolean).join(' ')} {...rest}>{children}</div>;
}

/* Only where the shape is known before the data lands — grid rows, cards. */
export function Skeleton({ width = '100%', height = 10, delay = 0, style, className = '', ...rest }) {
  return <i className={('dcs-skel ' + className).trim()} style={{ display: 'block', width, height, animationDelay: delay + 's', ...style }} {...rest} />;
}

/* Work in progress. Sweeps once for a fast run (.is-sweeping on the parent);
   loops only while genuinely pending (.is-pending). */
export function ScanBar({ className = '', ...rest }) {
  return <span className={('dcs-scanline ' + className).trim()} aria-hidden="true" {...rest} />;
}
