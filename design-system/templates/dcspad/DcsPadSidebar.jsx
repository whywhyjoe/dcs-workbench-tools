/* DCSPad · left sidebar — two stacked catalogs, Frameworks over Snippets,
   split by a 5px gutter. Rows are 28px; the checked framework keeps a resting
   selected state (chrome ground + accent rail) so selection survives hover. */
const { IconButton, Icon, Badge } = window.DCSWorkbenchDesignSystem_dafd54;

const dcsPadSectionHead = { display: 'flex', alignItems: 'center', gap: 8, flex: 'none', minHeight: 28, padding: '0 6px 0 12px', borderBottom: '1px solid var(--border)' };
const dcsPadSectionTitle = { fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--fg-dim)', whiteSpace: 'nowrap' };
const dcsPadCount = { font: '500 10px/1 var(--mono)', color: 'var(--fg-faint)', padding: '2px 4px', background: 'var(--bg-2)', borderRadius: 'var(--radius-s)' };

function SectionTools({ add }) {
  return (
    <span style={{ marginLeft: 'auto', display: 'inline-flex', gap: 1 }}>
      {add
        ? <IconButton size="sm" title="New snippet" style={{ color: 'var(--accent-dim)' }}><Icon name="plus" size={13} /></IconButton>
        : <IconButton size="sm" title="Search"><Icon name="search" size={13} /></IconButton>}
      <IconButton size="sm" title="Import"><Icon name="download" size={13} /></IconButton>
      <IconButton size="sm" title="Export"><Icon name="upload" size={13} /></IconButton>
      <IconButton size="sm" title="Refresh"><Icon name="refresh" size={13} /></IconButton>
    </span>
  );
}

function FrameworkRow({ fw, onToggle }) {
  return (
    <div onClick={onToggle}
      style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 9, minHeight: 28, padding: '2px 6px 2px 8px', borderRadius: 'var(--radius-s)', cursor: 'pointer', userSelect: 'none', fontSize: 13,
        background: fw.on ? 'var(--bg-2)' : 'transparent', boxShadow: fw.on ? 'inset 2px 0 0 var(--accent)' : 'none' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', width: 14, height: 22, marginLeft: -4, color: 'var(--fg-ghost)' }}>
        <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" aria-hidden="true">
          {[3, 7, 11].map(y => <React.Fragment key={y}><circle cx="3" cy={y} r="1" /><circle cx="7" cy={y} r="1" /></React.Fragment>)}
        </svg>
      </span>
      <span style={{ flex: 'none', width: 13, height: 13, borderRadius: 2, border: '1px solid ' + (fw.on ? 'var(--accent)' : 'var(--fg-ghost)'), background: fw.on ? 'var(--accent)' : 'var(--bg-0)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        {fw.on ? <svg width="9" height="9" viewBox="0 0 16 16" fill="none" stroke="var(--accent-ink)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m3 8.5 3.2 3.2L13 4.8" /></svg> : null}
      </span>
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: fw.needsConfig ? 'var(--fg-faint)' : fw.on ? 'var(--fg)' : 'var(--fg-row)', fontWeight: fw.on ? 500 : 400, fontStyle: fw.needsConfig ? 'italic' : 'normal' }}>{fw.name}</span>
      {fw.pin ? <span style={{ color: 'var(--accent)', display: 'inline-flex', flex: 'none' }}><svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4.5 1.8h7v8.4l-3.5-2.2-3.5 2.2z" /></svg></span> : null}
    </div>
  );
}

function SnippetRow({ sn, onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 9, minHeight: 28, padding: '2px 6px 2px 8px', borderRadius: 'var(--radius-s)', cursor: 'pointer', userSelect: 'none', fontSize: 13 }}>
      <Badge type={sn.lang} style={{ flexShrink: 0 }}>{sn.lang}</Badge>
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--fg-row)' }}>{sn.name}</span>
    </div>
  );
}

function Sidebar({ frameworks, toggleFramework, snippets, onSnippet }) {
  const on = frameworks.filter(f => f.on).length;
  return (
    <aside style={{ background: 'var(--bg-1)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
      <div style={{ display: 'flex', flex: 'none', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
        <button style={{ flex: 1, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-strong)', background: 'transparent', border: 0, borderRight: '1px solid var(--border)', cursor: 'pointer', boxShadow: 'inset 0 2px 0 var(--border-strong)' }} title="Library">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 11.5V3a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 14 3a1.5 1.5 0 0 1-1.5 1.5H11v8.5a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 2 13a1.5 1.5 0 0 1 1.5-1.5H5z" /></svg>
        </button>
        <button style={{ flex: 1, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-faint)', background: 'transparent', border: 0, cursor: 'pointer' }} title="Browser">
          <Icon name="globe" size={15} />
        </button>
      </div>

      <div style={{ flex: '1 1 auto', minHeight: 120, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={dcsPadSectionHead}>
          <Icon name="layers" size={13} style={{ color: 'var(--fg-mid)' }} />
          <span style={dcsPadSectionTitle}>Frameworks</span>
          <span style={dcsPadCount}>{on}/12</span>
          <SectionTools />
        </div>
        <div style={{ flex: '1 1 auto', overflowY: 'auto', padding: '4px 6px', minHeight: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {frameworks.map(fw => <FrameworkRow key={fw.name} fw={fw} onToggle={() => toggleFramework(fw.name)} />)}
        </div>
        <div style={{ flex: 'none', background: 'var(--bg-0)', borderTop: '1px solid var(--border-strong)', padding: '10px 12px 12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%', height: 28, background: 'transparent', border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-m)', color: 'var(--fg-dim)', font: '500 12px/1 var(--sans)', cursor: 'pointer' }}>
            <Icon name="plus" size={13} /> Add framework
          </button>
        </div>
      </div>

      <div style={{ flex: '0 0 5px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-0)' }} />

      <div style={{ flex: '0 0 240px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={dcsPadSectionHead}>
          <Icon name="code" size={13} style={{ color: 'var(--fg-mid)' }} />
          <span style={dcsPadSectionTitle}>Snippets</span>
          <span style={dcsPadCount}>37</span>
          <SectionTools add />
        </div>
        <div style={{ flex: '1 1 auto', overflowY: 'auto', padding: '4px 6px', minHeight: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {snippets.map(sn => <SnippetRow key={sn.name} sn={sn} onClick={() => onSnippet(sn)} />)}
        </div>
      </div>
    </aside>
  );
}

Object.assign(window, { Sidebar });