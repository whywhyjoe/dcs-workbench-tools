import React from 'react';

/* L1 · WORKBENCH — a multi-pane instrument that takes over the page.
   40px topbar / 1fr work / 24px status bar. Hosted in SharePoint it pins at
   inset 53px 5px 5px (add the dcs-hosted class to <html>) so the suite bar
   stays visible above it, and paints the surround itself with a 100vmax
   ring, because SP wrappers behind the gap have white backgrounds you cannot
   chase class-by-class.
   ⚠ Ship a SUSPEND path: when the host page enters edit mode, hide the tool
   and revert the global html/body overrides, or the editor canvas goes dark
   and unscrollable. */
export function AppShell({ topbar, status, children, className = '', ...rest }) {
  return (
    <div className={('dcs-app ' + className).trim()} {...rest}>
      <div className="dcs-topbar">{topbar}</div>
      <div className="dcs-work">{children}</div>
      <div className="dcs-statusbar">{status}</div>
    </div>
  );
}

/* L2 · INSTRUMENT — one job, one screen, inside a single web part, in normal
   page flow. No status bar, no splitters, never full-bleed. Declare the
   tokens on THIS root, not :root, so two tools can coexist on one page. */
export function ToolShell({ title, accent, actions, canvas = false, mark = true, children, className = '', ...rest }) {
  return (
    <div className={('dcs-tool ' + className).trim()} {...rest}>
      <div className="dcs-tool-head">
        {mark ? <span className="dcs-mark-2x2" role="img" aria-label="DCS instrument"><i /><i /><i /><i /></span> : null}
        <span className="dcs-tool-title">{title}{accent ? <> <b>{accent}</b></> : null}</span>
        {actions ? <span className="dcs-tool-actions">{actions}</span> : null}
      </div>
      <div className={'dcs-tool-body' + (canvas ? ' has-canvas' : '')}>{children}</div>
    </div>
  );
}

/* A working surface with a 30px head. Panels are separated by hairlines and
   surface steps — never by a shadow. */
export function Panel({ title, tools, children, className = '', style, ...rest }) {
  return (
    <div className={('dcs-panel ' + className).trim()} style={style} {...rest}>
      {(title || tools) && (
        <div className="dcs-panel-head">
          {typeof title === 'string' ? <span className="dcs-panel-title">{title}</span> : title}
          <span className="dcs-panel-spacer" />
          {tools ? <span className="dcs-panel-tools">{tools}</span> : null}
        </div>
      )}
      <div className="dcs-panel-body">{children}</div>
    </div>
  );
}

export function PanelTitle({ children, ...rest }) {
  return <span className="dcs-panel-title" {...rest}>{children}</span>;
}

/* The L2 control column: grouped fields, 9.5px uppercase group titles. */
export function Controls({ children, className = '', ...rest }) {
  return <div className={('dcs-controls ' + className).trim()} {...rest}>{children}</div>;
}
export function ControlGroup({ title, children, className = '', ...rest }) {
  return (
    <div className={('dcs-group ' + className).trim()} {...rest}>
      {title ? <div className="dcs-group-title">{title}</div> : null}
      {children}
    </div>
  );
}
/* Two short controls on one line; -3 for three. */
export function ControlRow({ cols = 2, children, className = '', ...rest }) {
  return <div className={['dcs-row', cols === 3 ? 'dcs-row-3' : '', className].filter(Boolean).join(' ')} {...rest}>{children}</div>;
}

/* The L2 canvas — 24px lattice so an artboard's real edges read on the dark
   ground. Its own toolbar, never the app's. */
export function Canvas({ bar, children, className = '', ...rest }) {
  return (
    <div className={('dcs-canvas ' + className).trim()} {...rest}>
      {bar ? <div className="dcs-canvas-bar">{bar}</div> : null}
      <div className="dcs-canvas-stage">{children}</div>
    </div>
  );
}

/* The 5px gutter between two panes — the only spacing value off the 2px
   scale, because it is a control, not a gap. The whole track lights accent
   on hover and drag. */
export function Splitter({ horizontal = false, dragging = false, className = '', ...rest }) {
  return (
    <div role="separator" tabIndex={0}
      aria-orientation={horizontal ? 'horizontal' : 'vertical'}
      className={['dcs-splitter', horizontal ? 'dcs-splitter-h' : 'dcs-splitter-v', dragging ? 'is-dragging' : '', className].filter(Boolean).join(' ')}
      {...rest} />
  );
}
