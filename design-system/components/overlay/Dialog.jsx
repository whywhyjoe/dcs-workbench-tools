import React from 'react';

/* For a decision that needs the rest of the screen to stop. Never for a
   recoverable error — that is a Notice. Esc closes it. */
export function Dialog({ open = true, title, context, actions, onClose, children, className = '', ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) { el.showModal ? el.showModal() : el.setAttribute('open', ''); }
    if (!open && el.open) el.close();
  }, [open]);
  return (
    <dialog ref={ref} className={('dcs-dialog ' + className).trim()} onCancel={onClose} {...rest}>
      <div className="dcs-dialog-panel">
        <div className="dcs-dialog-head">
          <h2>{title}</h2>
          <button type="button" className="dcs-btn dcs-btn-ghost dcs-btn-icon dcs-btn-sm" title="Close" aria-label="Close" onClick={onClose}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" /></svg>
          </button>
        </div>
        {context ? <p className="dcs-dialog-context">{context}</p> : null}
        {children}
        {actions ? <div className="dcs-dialog-actions">{actions}</div> : null}
      </div>
    </dialog>
  );
}
