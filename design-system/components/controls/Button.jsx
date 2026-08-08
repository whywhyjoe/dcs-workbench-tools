import React from 'react';

/* One system, height-tiered by CONTAINER, not by taste. The solid accent
   fill appears exactly ONCE per screen — on the verb that runs the tool. If
   two actions both matter, the secondary becomes variant="soft".
   lg 28 topbar · md 26 default · sm 22 panel head · xs 20 escape hatch
   (grouped, glyph-only, always titled). Never mix two tiers in one row. */
const VARIANT = { primary: 'dcs-btn-primary', soft: 'dcs-btn-soft', ghost: 'dcs-btn-ghost', danger: 'dcs-btn-danger', default: '' };
const SIZE = { lg: 'dcs-btn-lg', md: '', sm: 'dcs-btn-sm', xs: 'dcs-btn-xs' };

export function Button({ variant = 'default', size = 'md', kbd, className = '', children, ...rest }) {
  const cls = ['dcs-btn', VARIANT[variant] || '', SIZE[size] || '', className].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} {...rest}>
      {children}
      {kbd ? <span className="dcs-kbd-inline">{kbd}</span> : null}
    </button>
  );
}

/* Square button at the same tiers. Glyph-only, so it ALWAYS needs a title;
   the accessible name lives on the button, never on the svg. */
export function IconButton({ size = 'md', variant = 'ghost', title, className = '', children, ...rest }) {
  const cls = ['dcs-btn', 'dcs-btn-icon', VARIANT[variant] || '', SIZE[size] || '', className].filter(Boolean).join(' ');
  return <button type="button" className={cls} title={title} aria-label={rest['aria-label'] || title} {...rest}>{children}</button>;
}
