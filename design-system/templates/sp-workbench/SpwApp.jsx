/* SP Workbench · assembled. The rail switches views; Files and Lists are the
   two recreated surfaces. Upload raises the truncation-honest notice the
   system's copy rules call for. */
const { Crumbs, Chip, Icon, Button, IconButton, Mark, Notice, Toast, Input } = window.DCSWorkbenchDesignSystem_dafd54;

function SpWorkbench() {
  const [view, setView] = React.useState('files');
  const [toast, setToast] = React.useState(null);
  const crumbs = view === 'files' ? ['/sites/NewNerve', 'Documents', 'Shared Documents'] : ['/sites/NewNerve', view[0].toUpperCase() + view.slice(1)];
  return (
    <div style={{ width: 1440, height: 880, position: 'relative', background: 'var(--surround)', fontFamily: 'var(--sans)', overflow: 'hidden' }} data-screen-label="SP Workbench — Files">
      <SuiteBar />
      <div style={{ position: 'absolute', inset: '53px 5px 5px', borderRadius: 'var(--radius-l)', overflow: 'hidden', background: 'var(--bg-0)', color: 'var(--fg)', fontSize: 13, display: 'grid', gridTemplateRows: '42px 1fr 26px' }}>

        <header className="dcs-topbar" style={{ padding: '0 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <Mark letter="S" title="SP Workbench mark — S" />
            <span style={{ font: '600 13px/1 var(--mono)', letterSpacing: '.08em', color: 'var(--fg-dim)' }}>SP<b style={{ color: 'var(--accent)', fontWeight: 600 }}>WORKBENCH</b></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0, marginLeft: 8 }}>
            <span style={{ color: 'var(--fg-dim)', font: '500 12px/1 var(--sans)' }}>Site</span>
            <Input mono placeholder="/sites/ProjectName — blank = this site" style={{ width: 380, height: 26 }} />
            <Button size="sm" style={{ padding: '0 10px' }}>Inspect</Button>
            <IconButton size="md" title="Favourite this site" style={{ width: 26, height: 26, color: 'var(--fg-mid)' }}><Icon name="star" size={14} /></IconButton>
            <Button size="sm" style={{ padding: '0 10px' }}>Sites <Icon name="chevron" size={9} style={{ opacity: .6 }} /></Button>
          </div>
          <div className="dcs-topbar-right"><Chip tone="ok">SP: Live</Chip></div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '176px 1fr', minHeight: 0 }}>
          <SpwRail view={view} setView={setView} />
          <div style={{ minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10, minHeight: 32, padding: '0 16px', background: 'var(--bg-editor)', borderBottom: '1px solid var(--border)' }}>
              <Crumbs items={crumbs} />
              <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, font: '10.5px/1 var(--mono)', color: 'var(--fg-faint)' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--ok)' }} />read + write
              </span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, padding: '14px 16px 12px', gap: 10 }}>
              {view === 'files' ? <FilesView onUpload={() => { setToast('Uploaded to /Documents/Shared Documents · 2 files'); setTimeout(() => setToast(null), 2600); }} />
                : view === 'lists' ? <ListsView />
                : <PlaceholderView id={view} />}
            </div>
          </div>
        </div>

        <footer className="dcs-statusbar" style={{ fontSize: 11.5 }}>
          <span>SP: https://nervedotnet.sharepoint.com/sites/NewNerve · Joe Zapert (NERVE.digital)</span>
          <span className="dcs-status-right">
            <span>joe@nerve.digital</span>
            <span style={{ font: '600 10px/1 var(--sans)', letterSpacing: '.04em', textTransform: 'uppercase', borderRadius: 'var(--radius-pill)', padding: '3px 8px', color: 'var(--accent-soft-fg)', background: 'var(--accent-soft)', border: '1px solid var(--accent-soft-line)' }}>Site admin</span>
          </span>
        </footer>

        {toast ? <Toast>{toast}</Toast> : null}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<SpWorkbench />);