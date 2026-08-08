/* DCSPad · overlays — the File menu and the SharePoint export dialog. The
   dialog is where the two-tier node colour does its work: folders carry role,
   files carry type, and only the row you are acting on is bright. */
const { Menu, MenuLabel, MenuItem, Badge, Button, IconButton, Icon, NodeRow, Field, Input, Select } = window.DCSWorkbenchDesignSystem_dafd54;

function FileMenu({ onSharePoint }) {
  return (
    <Menu style={{ top: 74, left: 30, width: 272 }}>
      <MenuLabel>Project</MenuLabel>
      <MenuItem>New project…</MenuItem>
      <MenuItem>Save project (.dcspad.json)</MenuItem>
      <MenuItem>Load project (.dcspad.json)…</MenuItem>
      <MenuLabel>Import</MenuLabel>
      <MenuItem lead={<Badge>file</Badge>}>Import HTML, CSS, or JS…</MenuItem>
      <MenuItem lead={<Badge>SP</Badge>} onClick={onSharePoint}>Import from SharePoint…</MenuItem>
      <MenuLabel>Export</MenuLabel>
      <MenuItem lead={<Badge>all</Badge>}>Export all non-empty</MenuItem>
      <MenuItem lead={<Badge type="html">html</Badge>}>Export HTML</MenuItem>
      <MenuItem lead={<Badge type="css">css</Badge>}>Export CSS</MenuItem>
      <MenuItem lead={<Badge type="js">js</Badge>}>Export JS</MenuItem>
      <MenuItem lead={<Badge>SP</Badge>} onClick={onSharePoint}>Export to SharePoint…</MenuItem>
    </Menu>
  );
}

const SP_NODES = [
  { name: 'examples', kind: 'folder', role: 'user', meta: 'folder' },
  { name: 'lib-mirror', kind: 'folder', role: 'lib', meta: 'folder' },
  { name: 'src', kind: 'folder', role: 'user', meta: 'folder' },
  { name: 'styles', kind: 'folder', role: 'user', meta: 'folder' },
  { name: 'vendor', kind: 'folder', role: 'lib', meta: 'folder' },
  { name: '_backup', kind: 'folder', role: 'sys', meta: 'folder' },
  { name: 'boot-workbench.js', kind: 'file', role: 'js', meta: 'JS · 5.4 KB' },
  { name: 'boot.js', kind: 'file', role: 'js', meta: 'JS · 13.0 KB' },
  { name: 'dcspad.app.js', kind: 'file', role: 'js', meta: 'JS · 243.9 KB' },
  { name: 'dcspad.webpart.html', kind: 'file', role: 'html', meta: 'HTML · 783 B' },
];

function SpDialog({ onClose }) {
  const [sel, setSel] = React.useState(null);
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 60, background: '#0a0c10cc', display: 'grid', placeItems: 'center' }}>
      <div style={{ width: 680, background: 'var(--bg-2)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-l)', boxShadow: 'var(--shadow-pop)', display: 'grid', gap: 10, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <h2 style={{ margin: 0, color: 'var(--fg)', font: 'var(--t-title)' }}>Export to SharePoint</h2>
          <IconButton size="sm" title="Close" onClick={onClose}><Icon name="close" size={13} /></IconButton>
        </div>
        <label style={{ display: 'grid', gap: 6, color: 'var(--fg)', fontSize: 12 }}>
          <span>SharePoint site</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <Input mono defaultValue="https://nervedotnet.sharepoint.com/sites/NewNerve" style={{ height: 30 }} />
            <Button style={{ flex: 'none', height: 30 }}>Open site</Button>
          </span>
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(130px, .55fr) minmax(220px, 1fr)', gap: 10, padding: 10, background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-m)' }}>
          <Field label="Editor pane"><Select options={['JavaScript', 'HTML', 'CSS']} /></Field>
          <Field label="File name"><Input mono defaultValue="disclosure.js" /></Field>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0, height: 30, padding: '3px 5px', background: 'var(--bg-0)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-m)' }}>
          <IconButton size="sm" title="Up one folder"><svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 8 5.5l5 5" /></svg></IconButton>
          <span style={{ flex: 1, minWidth: 0, color: 'var(--fg-dim)', font: '11px/1 var(--mono)' }}>/sites/NewNerve/FCUPortal/Code/tools/dcspad</span>
          <IconButton size="sm" title="Refresh"><Icon name="refresh" size={13} /></IconButton>
        </div>
        <div style={{ height: 300, overflow: 'auto', padding: 3, background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-m)', display: 'flex', flexDirection: 'column', gap: 1 }}>
          {SP_NODES.map(n => (
            <NodeRow key={n.name} node={n} calledOut={sel === n.name} onClick={() => setSel(n.name)} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="lg" disabled={!sel}>Review metadata</Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FileMenu, SpDialog });