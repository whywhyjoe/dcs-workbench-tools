/* SP Workbench · the view surfaces. Every view is the same page shell:
   breadcrumb bar, then eyebrow + title + hint, then the view's own toolbar and
   its grid. Recreated from the SP Workbench comp. */
const { Rail, RailLabel, RailItem, Crumbs, Icon, Button, IconButton, Chip, Select, DataGrid, NodeGlyph, Notice, State } = window.DCSWorkbenchDesignSystem_dafd54;

/* The host page's suite bar — visible and desaturated while the tool runs. */
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

const SPW_RAIL = [
  { group: 'Site' },
  { id: 'site', label: 'Site', icon: 'site' },
  { id: 'permissions', label: 'Permissions', icon: 'shield' },
  { group: 'Content' },
  { id: 'lists', label: 'Lists', icon: 'list' },
  { id: 'pages', label: 'Pages', icon: 'pages' },
  { id: 'files', label: 'Files', icon: 'folder' },
  { group: 'Tools' },
  { id: 'query', label: 'Query', icon: 'query' },
  { id: 'panels', label: 'Panels', icon: 'link' },
  { id: 'advanced', label: 'Advanced', icon: 'advanced' },
];

const SPW_FILES = [
  { name: '_backup', kind: 'folder', role: 'sys', type: 'Folder', size: '', mod: '2026-07-18', ver: '' },
  { name: 'Forms', kind: 'folder', role: 'sys', type: 'Folder', size: '', mod: '2026-06-25', ver: '' },
  { name: 'Lateleir', kind: 'folder', role: 'user', type: 'Folder', size: '', mod: '2026-07-22', ver: '' },
  { name: 'Social Media', kind: 'folder', role: 'user', type: 'Folder', size: '', mod: '2026-07-21', ver: '' },
  { name: 'Splash', kind: 'folder', role: 'user', type: 'Folder', size: '', mod: '2026-07-21', ver: '' },
  { name: 'Up and Down Town', kind: 'folder', role: 'user', type: 'Folder', size: '', mod: '2026-07-31', ver: '' },
  { name: 'Claude Design Update Brief.pdf', kind: 'file', role: 'doc', type: 'pdf', size: '44.3 KB', mod: '2026-07-18', ver: '1.0' },
  { name: 'Content Strategy - Pillars and Series.pptx', kind: 'file', role: 'doc', type: 'pptx', size: '62.0 MB', mod: '2026-07-24', ver: '2.0' },
  { name: 'dcspad.js', kind: 'file', role: 'js', type: 'js', size: '65 B', mod: '2026-07-31', ver: '2.0' },
  { name: 'LAteleir_Shot_List_1.xlsx', kind: 'file', role: 'json', type: 'xlsx', size: '20.9 KB', mod: '2026-07-22', ver: '1.0' },
  { name: 'MedSpa.zip', kind: 'file', role: 'sys', type: 'zip', size: '16.24 GB', mod: '2026-07-14', ver: '1.0' },
  { name: 'untitled.js', kind: 'file', role: 'js', type: 'js', size: '65 B', mod: '2026-07-30', ver: '1.0' },
];

const SPW_LISTS = [
  { id: 1, title: 'Announcements', internal: 'Announcements', type: 'GenericList', items: '18' },
  { id: 2, title: 'Documents', internal: 'Shared Documents', type: 'DocumentLibrary', items: '412', selected: true },
  { id: 3, title: 'Site Pages', internal: 'SitePages', type: 'DocumentLibrary', items: '37' },
  { id: 4, title: 'Site Assets', internal: 'SiteAssets', type: 'DocumentLibrary', items: '96' },
  { id: 5, title: 'appdata', internal: 'appdata', type: 'GenericList', items: '4', dim: true },
];

function SpwRail({ view, setView }) {
  return (
    <Rail style={{ padding: '6px 6px 10px' }}>
      {SPW_RAIL.map((it, i) => it.group
        ? <RailLabel key={'g' + i}>{it.group}</RailLabel>
        : <RailItem key={it.id} glyph={<Icon name={it.icon} />} active={view === it.id} onClick={() => setView(it.id)}>{it.label}</RailItem>)}
    </Rail>
  );
}

function PageHeader({ eyebrow, title, hint, actions }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ font: '700 9.5px/1 var(--sans)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent-dim)', marginBottom: 6 }}>{eyebrow}</div>
        <h2 style={{ margin: 0, font: 'var(--t-view)', color: 'var(--fg-strong)' }}>{title}</h2>
        <p style={{ margin: '4px 0 0', color: 'var(--fg-dim)', fontSize: 12.5, maxWidth: '62ch' }}>{hint}</p>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, flex: 'none' }}>{actions}</div>
    </div>
  );
}

function FilterBar({ children, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {children}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, height: 26, padding: '0 9px', flex: '0 1 280px', background: 'var(--bg-1)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-m)' }}>
        <Icon name="search" size={13} style={{ color: 'var(--fg-faint)' }} />
        <span style={{ color: 'var(--fg-faint)', fontSize: 12 }}>Filter files…</span>
      </div>
      <span style={{ font: '500 11.5px/1 var(--mono)', color: 'var(--fg-dim)', padding: '3px 7px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-s)', whiteSpace: 'nowrap' }}>{count}</span>
    </div>
  );
}

/* The Files grid keeps the comp's own six-column layout and hover-revealed
   row tools, so it is a recreation rather than a generic DataGrid render. */
function FileRow({ row }) {
  const [hov, setHov] = React.useState(false);
  const cell = { padding: '3px 12px', whiteSpace: 'nowrap', font: '11.5px/1.6 var(--mono)' };
  const tool = (title, paths) => (
    <button title={title} style={{ width: 20, height: 18, padding: 0, background: 'transparent', border: 0, borderRadius: 'var(--radius-s)', color: 'var(--fg-faint)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', opacity: hov ? 1 : 0, transition: 'opacity var(--dur-tint)' }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths.map((d, i) => <path key={i} d={d} />)}</svg>
    </button>
  );
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 110px 110px 130px 80px 72px', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #22262e', background: hov ? 'var(--bg-3)' : 'transparent' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0, padding: '3px 12px', font: '12.5px/1.5 var(--sans)', color: row.role === 'sys' ? 'var(--fg-mid)' : hov ? 'var(--fg-strong)' : 'var(--fg-row)' }}>
        <NodeGlyph kind={row.kind} role={row.role} />
        <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.name}</span>
      </span>
      <span style={{ ...cell, color: 'var(--fg-mid)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.type}</span>
      <span style={{ ...cell, textAlign: 'right', color: 'var(--fg-row)' }}>{row.size}</span>
      <span style={{ ...cell, color: 'var(--fg-mid)' }}>{row.mod}</span>
      <span style={{ ...cell, textAlign: 'right', color: 'var(--fg-faint)' }}>{row.ver}</span>
      <span style={{ padding: '3px 12px 3px 0', textAlign: 'right', whiteSpace: 'nowrap' }}>
        {row.kind === 'file' ? <span style={{ display: 'inline-flex', gap: 2 }}>
          {tool('Download', ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5', 'M12 15V3'])}
          {tool('Copy link', ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'])}
        </span> : null}
      </span>
    </div>
  );
}

function FilesView({ onUpload }) {
  const headCell = { textAlign: 'left', padding: '7px 12px', background: 'transparent', border: 0, color: 'var(--fg-dim)', font: '600 11px/1.4 var(--sans)', letterSpacing: '.04em', cursor: 'pointer' };
  return (
    <>
      <PageHeader eyebrow="Content" title="Files"
        hint="Browse any library or folder of this web — every file type, with download, binary upload, and full metadata editing."
        actions={<>
          <Button><Icon name="refresh" size={13} />Refresh</Button>
          <Button>Export <Icon name="chevron" size={9} style={{ opacity: .6 }} /></Button>
          <Button variant="primary" size="lg" onClick={onUpload}><Icon name="upload" size={13} />Upload</Button>
        </>} />
      <FilterBar count="12 items"><Select options={['Documents', 'Site Pages', 'Site Assets']} style={{ width: 'auto', height: 26 }} /></FilterBar>
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto', background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-m)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 110px 110px 130px 80px 72px', position: 'sticky', top: 0, zIndex: 1, background: 'var(--bg-2)', borderBottom: '1px solid var(--border-strong)' }}>
          <button style={{ ...headCell, color: 'var(--fg-strong)', boxShadow: 'inset 0 -2px 0 var(--accent)' }}>Name <span style={{ color: 'var(--accent)', fontSize: 10, marginLeft: 4 }}>▲</span></button>
          <button style={headCell}>Type</button>
          <button style={{ ...headCell, textAlign: 'right' }}>Size</button>
          <button style={headCell}>Modified</button>
          <button style={{ ...headCell, textAlign: 'right' }}>Version</button>
          <span />
        </div>
        {SPW_FILES.map(r => <FileRow key={r.name} row={r} />)}
      </div>
    </>
  );
}

function ListsView() {
  const [sort, setSort] = React.useState({ key: 'title', dir: 'asc' });
  return (
    <>
      <PageHeader eyebrow="Content" title="Lists"
        hint="Every list and library on this web, with item counts, internal names and the field schema behind each one."
        actions={<><Button><Icon name="refresh" size={13} />Refresh</Button><Button variant="soft">New list</Button></>} />
      <FilterBar count="5 lists"><Select options={['All types', 'GenericList', 'DocumentLibrary']} style={{ width: 'auto', height: 26 }} /></FilterBar>
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
        <DataGrid style={{ flex: 1 }}
          columns={[{ key: 'title', label: 'Title' }, { key: 'internal', label: 'Internal name', mono: true }, { key: 'type', label: 'Type', mono: true }, { key: 'items', label: 'Items', num: true }]}
          rows={SPW_LISTS} sort={sort} onSort={k => setSort(s => ({ key: k, dir: s.key === k && s.dir === 'asc' ? 'desc' : 'asc' }))} onOpenRow={() => {}} />
      </div>
    </>
  );
}

function PlaceholderView({ id }) {
  const copy = {
    site: ['Site', 'Site', 'Title, template, created date, storage and the raw web properties.'],
    permissions: ['Site', 'Permissions', 'Role assignments for this web, and where each one is inherited from.'],
    pages: ['Content', 'Pages', 'Every site page, with layout, author and publication state.'],
    query: ['Tools', 'Query', 'Run a REST or PnP query against this web and inspect the response tree.'],
    panels: ['Tools', 'Panels', 'Saved web-part panels and the links that open them.'],
    advanced: ['Tools', 'Advanced', 'Tenant-managed switches. Nothing here is reversible from the workbench.'],
  }[id] || ['Site', id, ''];
  return (
    <>
      <PageHeader eyebrow={copy[0]} title={copy[1]} hint={copy[2]} actions={<Button><Icon name="refresh" size={13} />Refresh</Button>} />
      <div style={{ flex: 1, minHeight: 0, background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-m)', display: 'grid' }}>
        <State>This view is not part of the reference comp — nothing to show</State>
      </div>
    </>
  );
}

Object.assign(window, { SuiteBar, SpwRail, PageHeader, FilesView, ListsView, PlaceholderView, SPW_RAIL });