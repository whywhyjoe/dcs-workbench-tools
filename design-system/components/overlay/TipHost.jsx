import React from 'react';

/* A hover/focus label for a control too small to carry text. One short
   phrase, never a paragraph — and the control still needs a real aria-label. */
export function TipHost({ tip, below = false, children, className = '', ...rest }) {
  return (
    <span className={('dcs-tip-host ' + className).trim()} style={{ display: 'inline-flex' }} {...rest}>
      {children}
      <span className={'dcs-tip' + (below ? ' dcs-tip-below' : '')}>{tip}</span>
    </span>
  );
}
