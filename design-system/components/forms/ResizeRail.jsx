import React from 'react';

/* A draggable boundary that resizes ONE thing instead of splitting two —
   Halo's banner preview is the reference case. Splitter vocabulary, but the
   rail is drawn AT REST, because there is no second pane to imply it and it
   has to announce itself. Not a slider: no value, no readout, no ticks. If
   the number matters, use Slider. */
export function ResizeRail({ horizontal = false, dragging = false, tip = 'Drag to resize preview', label, onPointerDown, className = '', ...rest }) {
  const cls = ['dcs-resize-rail', horizontal ? 'dcs-resize-rail-h' : '', 'dcs-tip-host', dragging ? 'is-dragging' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls} role="separator" tabIndex={0}
      aria-orientation={horizontal ? 'horizontal' : 'vertical'}
      aria-label={label || tip} onPointerDown={onPointerDown} {...rest}>
      <span className="dcs-resize-grip" />
      {tip ? <span className={'dcs-tip' + (horizontal ? ' dcs-tip-below' : '')}>{tip}</span> : null}
    </div>
  );
}
