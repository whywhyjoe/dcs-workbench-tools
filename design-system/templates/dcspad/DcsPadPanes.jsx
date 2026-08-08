/* DCSPad · working surfaces — the editor with its tab strip and gutter, the
   preview, and the console. Editor ground is --bg-editor #17191f, which is
   also the Monaco theme's ground; the value hues in the console mirror it. */
const { IconButton, Icon, Kbd, State, PanelTitle, ScanBar, Tabs } = window.DCSWorkbenchDesignSystem_dafd54;

const H = { t: 'var(--code-keyword)', a: 'var(--code-key)', s: 'var(--code-string)', d: '#d4d4d4', p: 'var(--code-fg)', c: 'var(--code-comment)', n: 'var(--code-number)' };

const CODE = {
  HTML: [
    [['t', '<section'], ['a', ' x-data'], ['d', '='], ['s', '"{ open: false }"'], ['t', '>']],
    [['p', '  '], ['t', '<button']],
    [['p', '    '], ['a', 'type'], ['d', '='], ['s', '"button"']],
    [['p', '    '], ['a', 'class'], ['d', '='], ['s', '"btn btn--secondary"']],
    [['p', '    '], ['a', ':aria-expanded'], ['d', '='], ['s', '"open"']],
    [['p', '    '], ['a', 'aria-controls'], ['d', '='], ['s', '"disclosure-panel"']],
    [['p', '    '], ['a', '@click'], ['d', '='], ['s', '"open = !open"'], ['t', '>']],
    [['p', '    '], ['t', '<fluent-icon'], ['a', ' name'], ['d', '='], ['s', '"chevron-down-20-regular"']],
    [['p', '      '], ['a', 'aria-hidden'], ['d', '='], ['s', '"true"'], ['t', '></fluent-icon>']],
    [['p', '    Details']],
    [['p', '  '], ['t', '</button>']],
    [],
    [['p', '  '], ['t', '<div'], ['a', ' id'], ['d', '='], ['s', '"disclosure-panel"'], ['a', ' x-show'], ['d', '='], ['s', '"open"'], ['t', '>']],
    [['p', '    '], ['t', '<p>'], ['p', 'This content is controlled entirely by Alpine state.'], ['t', '</p>']],
    [['p', '  '], ['t', '</div>']],
    [['t', '</section>']],
  ],
  CSS: [
    [['c', '/* scoped to the web part — never html, never body */']],
    [['t', '.btn--secondary'], ['p', ' {']],
    [['p', '  '], ['a', 'display'], ['d', ': '], ['p', 'inline-flex;']],
    [['p', '  '], ['a', 'gap'], ['d', ': '], ['n', '7px'], ['p', ';']],
    [['p', '  '], ['a', 'height'], ['d', ': '], ['n', '26px'], ['p', ';']],
    [['p', '  '], ['a', 'border'], ['d', ': '], ['n', '1px'], ['p', ' solid '], ['s', 'var(--border-strong)'], ['p', ';']],
    [['p', '  '], ['a', 'border-radius'], ['d', ': '], ['n', '4px'], ['p', ';']],
    [['p', '}']],
  ],
  JS: [
    [['t', 'const'], ['p', ' { sp } = '], ['t', 'pnp'], ['p', ';']],
    [],
    [['t', 'const'], ['p', ' lists = '], ['t', 'await'], ['p', ' sp.web.lists']],
    [['p', '  .select('], ['s', "'Title'"], ['p', ', '], ['s', "'ItemCount'"], ['p', ')']],
    [['p', '  .filter('], ['s', "'Hidden eq false'"], ['p', ')();']],
    [],
    [['t', 'console'], ['p', '.log(lists.length, '], ['s', "'lists'"], ['p', ');']],
  ],
};

function EditorPane({ tab, setTab }) {
  const lines = CODE[tab];
  return (
    <section style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-editor)', minWidth: 0, overflow: 'hidden' }}>
      <div className="dcs-tabs">
        {['HTML', 'CSS', 'JS'].map(t => (
          <button key={t} className={'dcs-tab' + (t === tab ? ' is-active' : '')} onClick={() => setTab(t)}>{t}</button>
        ))}
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 8px' }}>
          <span className="dcs-seg" style={{ height: 22 }}>
            <button title="Zoom out" style={{ width: 22, padding: 0 }}><Icon name="close" size={13} strokeWidth={1.5} style={{ transform: 'rotate(45deg)' }} /></button>
            <button title="Zoom in" style={{ width: 22, padding: 0 }}><Icon name="plus" size={13} strokeWidth={1.5} /></button>
          </span>
          <span style={{ width: 1, height: 16, background: 'var(--border)' }} />
          <button title="Wrap lines" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 22, padding: '0 6px', background: 'var(--bg-3)', border: '1px solid transparent', borderRadius: 'var(--radius-m)', color: 'var(--accent)', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 4h11M2.5 8h7.5a2 2 0 1 1 0 4H8" /><path d="M9.5 10.5 8 12l1.5 1.5" /></svg>
          </button>
          <IconButton size="sm" title="Maximise pane"><Icon name="maximize" size={13} /></IconButton>
        </span>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', font: '12.5px/1.55 var(--mono)', paddingTop: 6 }}>
        <div style={{ flex: 'none', width: 46, textAlign: 'right', paddingRight: 12, color: 'var(--fg-faint)', background: 'var(--bg-0)', userSelect: 'none' }}>
          {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingLeft: 14, color: 'var(--code-fg)', whiteSpace: 'pre' }}>
          {lines.map((line, i) => (
            <div key={i} style={{ minHeight: '19.4px' }}>
              {line.map(([k, txt], j) => <span key={j} style={{ color: H[k] }}>{txt}</span>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PreviewPane({ ran, running }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-1)', minHeight: 0, overflow: 'hidden', position: 'relative' }}>
      <div className={'dcs-panel-head' + (running ? ' is-pending' : '')} style={{ position: 'relative', overflow: 'hidden' }}>
        <PanelTitle>Preview</PanelTitle>
        <span style={{ flex: 1 }} />
        <ScanBar style={{ opacity: running ? 1 : 0 }} />
        <IconButton size="sm" title="Theme"><Icon name="shield" size={13} /></IconButton>
        <IconButton size="sm" title="Reload preview"><Icon name="refresh" size={13} /></IconButton>
        <IconButton size="sm" title="Maximise pane"><Icon name="maximize" size={13} /></IconButton>
      </div>
      <div style={{ flex: 1, position: 'relative', background: 'var(--bg-0)', minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--fg-faint)', font: '12px var(--mono)' }}>
        {ran
          ? <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', gap: 10, padding: 20, alignItems: 'flex-start' }}>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 32, padding: '0 12px', background: '#f3f2f1', border: '1px solid #c8c6c4', borderRadius: 2, color: '#242424', font: '13px "Segoe UI", system-ui, sans-serif' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#242424" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6.5 8 10.5 12 6.5" /></svg>Details
              </button>
              <p style={{ margin: 0, color: '#323130', font: '14px/1.5 "Segoe UI", system-ui, sans-serif', maxWidth: 320 }}>This content is controlled entirely by Alpine state.</p>
            </div>
          : <>Nothing to preview yet — press <Kbd>Ctrl/Cmd + Enter</Kbd></>}
      </div>
    </div>
  );
}

function ConsolePane({ logs, onClear }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-1)', minHeight: 0, overflow: 'hidden' }}>
      <div className="dcs-panel-head" style={{ padding: '0 8px 0 0' }}>
        <div style={{ display: 'flex', alignSelf: 'stretch' }}>
          <button className="dcs-tab is-active" style={{ height: 'auto', background: 'var(--bg-1)', padding: '0 13px' }}>Console</button>
          <button className="dcs-tab" style={{ height: 'auto', padding: '0 13px' }}>Network</button>
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <input placeholder="filter" className="dcs-input dcs-input-mono" style={{ width: 110, height: 22, padding: '2px 7px', fontSize: 11.5 }} />
          {[['log', 'var(--fg)'], ['warn', 'var(--warn)'], ['err', 'var(--error-fg)']].map(([l, c]) => (
            <button key={l} style={{ height: 22, padding: '0 8px', background: 'var(--bg-3)', border: '1px solid transparent', borderRadius: 'var(--radius-m)', color: c, font: '500 10.5px/1 var(--mono)', letterSpacing: '.04em', cursor: 'pointer' }}>{l}</button>
          ))}
          <span className="dcs-seg" style={{ height: 22 }}>
            <button title="Smaller" style={{ width: 22, padding: 0 }}><Icon name="close" size={13} strokeWidth={1.5} style={{ transform: 'rotate(45deg)' }} /></button>
            <button title="Larger" style={{ width: 22, padding: 0 }}><Icon name="plus" size={13} strokeWidth={1.5} /></button>
          </span>
          <IconButton size="sm" title="Clear console" onClick={onClear}><Icon name="trash" size={13} /></IconButton>
        </span>
      </div>
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <div style={{ position: 'absolute', inset: '0 0 48px 0', overflow: 'auto' }}>
          {logs.length === 0
            ? <State style={{ height: '100%' }}>Console is clear — <span style={{ color: 'var(--fg-dim)' }}>console.log</span> from your JS lands here</State>
            : <div style={{ padding: '6px 12px', display: 'grid', gap: 3, font: '12px/1.6 var(--mono)' }}>
                {logs.map((l, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, color: l.tone === 'warn' ? 'var(--warn)' : l.tone === 'err' ? 'var(--error-fg)' : 'var(--fg-row)' }}>
                    <span style={{ color: 'var(--fg-faint)', flex: 'none' }}>{l.time}</span><span>{l.text}</span>
                  </div>
                ))}
              </div>}
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', gap: 8, height: 48, padding: '0 10px', borderTop: '1px solid var(--border-strong)', background: 'var(--bg-0)' }}>
          <div style={{ flex: '1 1 auto', minWidth: 0, display: 'flex', alignItems: 'center', gap: 8, height: 32, padding: '0 10px', background: 'var(--bg-1)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-m)' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700, fontFamily: 'var(--mono)' }}>›</span>
            <span style={{ flex: 1, color: 'var(--fg-faint)', fontFamily: 'var(--mono)', fontSize: 12 }}>Evaluate JavaScript in the preview frame</span>
            <span style={{ flex: 'none', font: '500 10px/1 var(--mono)', color: 'var(--fg-dim)', background: 'var(--bg-2)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-s)', padding: '3px 5px' }}>↑↓ history</span>
          </div>
          <IconButton size="lg" variant="default" title="Run in frame" style={{ width: 32, height: 32 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3v5a2 2 0 0 1-2 2H3" /><path d="m5.5 7.5-2.5 2.5 2.5 2.5" /></svg>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { EditorPane, PreviewPane, ConsolePane });