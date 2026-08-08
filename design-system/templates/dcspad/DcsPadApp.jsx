/* DCSPad · the assembled workbench. Click File → Import from SharePoint to
   open the export dialog; Run to render the preview and print to the console;
   the framework checkboxes, snippet rows and editor tabs are all live. */
const { Splitter, Toast } = window.DCSWorkbenchDesignSystem_dafd54;

const DCSPAD_FRAMEWORKS = [
  { name: 'PnPjs 2.15 (pnp2 bundle)', on: false, pin: true },
  { name: 'Alpine.js 3.15.2', on: false },
  { name: 'DCS Standard Include', on: false, needsConfig: true },
  { name: 'BSP Design System', on: false },
  { name: 'Fluent System Icons', on: true },
  { name: 'Chart.js', on: false },
  { name: 'Lodash', on: false },
  { name: 'ExcelJS', on: false },
  { name: 'Day.js', on: false },
];
const DCSPAD_SNIPPETS = [
  { name: 'Alpine · Accessible disclosure', lang: 'html' },
  { name: 'Alpine · Filter a local collection', lang: 'html' },
  { name: 'Alpine + PnP · List browser (HTML)', lang: 'html' },
  { name: 'Alpine + PnP · List browser (JS)', lang: 'js' },
  { name: 'Alpine component · Counter (HTML)', lang: 'html' },
  { name: 'Alpine component · Counter (JS)', lang: 'js' },
];

const stamp = () => new Date().toLocaleTimeString('en-GB', { hour12: false });

function DcsPad() {
  const [fileOpen, setFileOpen] = React.useState(false);
  const [spOpen, setSpOpen] = React.useState(false);
  const [tab, setTab] = React.useState('HTML');
  const [autoRun, setAutoRun] = React.useState(false);
  const [running, setRunning] = React.useState(false);
  const [ran, setRan] = React.useState(false);
  const [logs, setLogs] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  const [frameworks, setFrameworks] = React.useState(DCSPAD_FRAMEWORKS);

  const run = React.useCallback(() => {
    setFileOpen(false);
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setRan(true);
      setLogs(l => [...l, { time: stamp(), text: 'Alpine 3.15.2 · disclosure mounted' }, { time: stamp(), text: 'ran in 42 ms' }]);
    }, 900);
  }, []);

  /* Ctrl/Cmd + Enter always runs. Esc always steps back one level. */
  React.useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); run(); }
      if (e.key === 'Escape') { if (spOpen) setSpOpen(false); else setFileOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [run, spOpen]);

  const toggleFramework = name => setFrameworks(fs => fs.map(f => f.name === name ? { ...f, on: !f.on } : f));
  const onSnippet = sn => { setTab(sn.lang === 'js' ? 'JS' : 'HTML'); setToast('Inserted “' + sn.name + '” into the ' + (sn.lang === 'js' ? 'JS' : 'HTML') + ' pane'); setTimeout(() => setToast(null), 2600); };

  return (
    <div style={{ width: 1440, height: 880, position: 'relative', background: 'var(--surround)', fontFamily: 'var(--sans)', overflow: 'hidden' }} data-screen-label="DCSPad hosted in SharePoint">
      <SuiteBar />
      <div className="dcs-app" style={{ position: 'absolute', inset: '53px 5px 5px', height: 'auto', borderRadius: 'var(--radius-l)', overflow: 'hidden' }}>
        <Topbar onFile={() => setFileOpen(o => !o)} fileOpen={fileOpen} autoRun={autoRun} setAutoRun={setAutoRun} onRun={run} running={running} />

        <main className="dcs-work" style={{ display: 'grid', gridTemplateColumns: '230px 5px minmax(200px, 1fr) 5px minmax(260px, 1fr)' }}>
          <Sidebar frameworks={frameworks} toggleFramework={toggleFramework} snippets={DCSPAD_SNIPPETS} onSnippet={onSnippet} />
          <Splitter />
          <EditorPane tab={tab} setTab={setTab} />
          <Splitter />
          <section style={{ display: 'grid', gridTemplateRows: '1fr 5px 300px', minWidth: 0, overflow: 'hidden' }}>
            <PreviewPane ran={ran} running={running} />
            <Splitter horizontal />
            <ConsolePane logs={logs} onClear={() => setLogs([])} />
          </section>
        </main>

        <StatusBar state={running ? 'running…' : ran ? 'ran in 42 ms' : 'idle'} saved={!ran} />

        {fileOpen ? <FileMenu onSharePoint={() => { setFileOpen(false); setSpOpen(true); }} /> : null}
        {spOpen ? <SpDialog onClose={() => setSpOpen(false)} /> : null}
        {toast ? <Toast>{toast}</Toast> : null}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<DcsPad />);