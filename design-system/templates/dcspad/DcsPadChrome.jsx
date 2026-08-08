/* DCSPad · chrome — the SharePoint suite bar it is hosted under, the 40px
   topbar, and the 24px status bar. Recreated from the DCSPad Workbench comp. */
const { Button, IconButton, Icon, PlayGlyph, Mark, Wordmark, Chip, Toggle } = window.DCSWorkbenchDesignSystem_dafd54;

/* The host page. It STAYS VISIBLE and desaturated — that is the point: the
   tool is running on your SharePoint, under your account. */
function SuiteBar() {
  return (
    <div style={{ height: 48, background: '#1b1d21', display: 'flex', alignItems: 'center', gap: 16, padding: '0 16px', filter: 'grayscale(1) brightness(.85)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 4px)', gap: 3 }}>
        {Array.from({ length: 9 }, (_, i) => <i key={i} style={{ width: 4, height: 4, borderRadius: 1, background: '#8a8f98', display: 'block' }} />)}
      </div>
      <span style={{ fontSize: 15, fontWeight: 600, color: '#d8dade' }}>SharePoint</span>
      <div style={{ width: 380, height: 32, background: '#2b2d31', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', marginLeft: 24 }}>
        <Icon name="search" size={15} style={{ color: '#9aa0a6' }} />
        <span style={{ fontSize: 13, color: '#9aa0a6' }}>Search this site</span>
      </div>
      <span style={{ marginLeft: 'auto', fontSize: 13, color: '#c8cace' }}>Joe Zapert (NERVE…</span>
      <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#3a3d42' }} />
    </div>
  );
}

const dcsPadMenuBtn = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, height: 28, padding: '0 8px', background: 'transparent', color: 'var(--fg-dim)', border: '1px solid transparent', borderRadius: 'var(--radius-m)', font: '500 12.5px/1 var(--sans)', cursor: 'pointer' };

function Topbar({ onFile, fileOpen, autoRun, setAutoRun, onRun, running }) {
  return (
    <header className="dcs-topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, userSelect: 'none' }}>
        <Mark letter="D" title="DCS mark — D" />
        <Wordmark head="DCS" tail="PAD" />
        {/* the two-cell run indicator that rides beside the wordmark */}
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2, marginLeft: 2 }}>
          <i style={{ width: 5, height: 5, background: 'var(--accent)', display: 'block' }} />
          <i style={{ width: 5, height: 5, background: 'var(--accent)', opacity: running ? 1 : .35, display: 'block' }} />
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={onFile} style={{ ...dcsPadMenuBtn, ...(fileOpen ? { background: 'var(--bg-3)', color: 'var(--fg)', borderColor: 'var(--border-strong)' } : null) }}>
          <Icon name="file" size={14} />File
          <Icon name="chevron" size={10} style={{ opacity: .6 }} />
        </button>
        <button style={dcsPadMenuBtn}><Icon name="star" size={14} />Favorites<Icon name="chevron" size={10} style={{ opacity: .6 }} /></button>
        <IconButton size="lg" title="Open Microsoft 365 Copilot">
          {/* Microsoft's mark, not a system glyph — see assets/icons-product/ */}
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.93 2h6.2c1.06 0 1.99.7 2.29 1.7l.47 1.6c.16.55.64.93 1.2.98h.28c.9 0 1.58.25 2.03.77.44.5.6 1.17.6 1.84.02 1.32-.5 2.96-.9 4.27a12.57 12.57 0 01-1.45 3.22c-.61.9-1.45 1.62-2.58 1.62H7.86c-1.05 0-1.98-.7-2.28-1.7l-.47-1.6a1.38 1.38 0 00-1.2-.98h-.29c-.88 0-1.57-.25-2.02-.77a2.78 2.78 0 01-.6-1.84c-.02-1.32.5-2.96.9-4.26.37-1.14.83-2.32 1.44-3.23C3.96 2.72 4.8 2 5.93 2zM2.86 7.15C2.43 8.5 1.98 9.97 2 11.1c0 .55.13.94.35 1.2.2.23.57.42 1.27.42h2.63c.61 0 1.15-.4 1.32-.98.47-1.58 1.27-4.24 1.9-6.28l.03-.1c.15-.5.3-.96.45-1.38.13-.35.28-.69.46-.98H5.93c-.65 0-1.22.4-1.76 1.19-.53.78-.96 1.84-1.3 2.96zm2.87 6.57c.15.2.27.44.34.7l.47 1.6c.17.58.71.98 1.32.98h.03c.36 0 .6-.17.75-.38a4 4 0 00.47-.95c.15-.4.29-.83.44-1.33l.03-.1.2-.64c-.24.07-.49.11-.74.11H6.4l-.16.01h-.52zm2.46-1h.85c.55 0 1.04-.34 1.26-.84l1.17-3.9c.07-.25.19-.49.34-.7h-.85c-.55 0-1.04.34-1.26.83l-1.17 3.91c-.08.25-.19.49-.34.7zm2.03-6.32c.24-.07.49-.11.74-.11h3.31c-.15-.22-.27-.45-.34-.7l-.47-1.6c-.17-.59-.71-.99-1.32-.99h-.02a.92.92 0 00-.76.38 4 4 0 00-.48.96c-.14.38-.28.82-.43 1.32l-.03.1-.2.64zm6.92 6.45c.42-1.35.88-2.82.86-3.95 0-.55-.13-.94-.35-1.2-.2-.23-.57-.42-1.28-.42h-2.62c-.61 0-1.15.4-1.32.99-.47 1.57-1.27 4.23-1.9 6.27l-.03.1c-.15.5-.3.96-.45 1.38-.13.35-.28.69-.46.98h4.48c.65 0 1.22-.4 1.76-1.19.53-.78.96-1.84 1.3-2.96z" /></svg>
        </IconButton>
        <IconButton size="lg" title="Open SP Workbench"><Icon name="sharepoint" size={16} /></IconButton>
        <IconButton size="lg" title="Settings"><Icon name="settings" size={16} /></IconButton>
      </div>

      <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 84, maxWidth: 520, display: 'flex', alignItems: 'center', gap: 7, marginLeft: 2 }}>
        <span style={{ flex: 'none', color: 'var(--fg-dim)', font: '600 9.5px/1 var(--sans)', letterSpacing: '.05em', textTransform: 'uppercase' }}>PRJ</span>
        <button style={{ display: 'flex', alignItems: 'center', gap: 7, flex: '1 1 auto', minWidth: 0, height: 28, padding: '0 6px', color: 'var(--fg-faint)', background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-m)', font: '500 15px/1 var(--sans)', fontStyle: 'italic', cursor: 'pointer', textAlign: 'left' }}>(untitled)</button>
        <span style={{ flex: 'none', padding: '3px 6px', border: '1px solid var(--warn-pill-line)', borderRadius: 'var(--radius-pill)', color: 'var(--warn)', background: 'var(--bg-1)', font: '600 9.5px/1 var(--sans)', letterSpacing: '.025em' }}>unsaved</span>
      </div>

      <div className="dcs-topbar-right">
        <span className="dcs-seg" style={{ height: 28 }}>
          {[['M6.3 2.7v10.6', 'Editor left'], ['M9.7 2.7v10.6', 'Editor right'], ['M1.8 9.9h12.4', 'Stacked']].map(([d, t]) => (
            <button key={t} title={t} className="is-active" style={{ width: 30, padding: 0 }}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
                <rect x="1.8" y="2.7" width="12.4" height="10.6" rx="1.4" /><path d={d} />
              </svg>
            </button>
          ))}
        </span>
        <span style={{ width: 1, height: 16, background: 'var(--border)' }} />
        <Toggle label="Auto-run" checked={autoRun} onChange={e => setAutoRun(e.target.checked)} />
        <Button variant="primary" size="lg" kbd="⌘↵" onClick={onRun} style={{ padding: '0 13px 0 11px' }}><PlayGlyph size={14} />Run</Button>
        <Chip tone="ok" style={{ cursor: 'pointer' }}>SP<Icon name="chevron" size={12} style={{ opacity: .7 }} /></Chip>
      </div>
    </header>
  );
}

function StatusBar({ state, saved }) {
  return (
    <footer className="dcs-statusbar">
      <span>{state}</span>
      <span>SP: https://nervedotnet.sharepoint.com/sites/NewNerve · Joe Zapert (NERVE.digital)</span>
      <span style={{ flex: 1 }} />
      <span style={{ color: 'var(--ok)' }}>{saved ? '✓ saved' : '• unsaved'}</span>
      <span className="dcs-badge" data-type="html">html</span>
      <span>Ln 1, Col 1</span>
    </footer>
  );
}

Object.assign(window, { SuiteBar, Topbar, StatusBar });