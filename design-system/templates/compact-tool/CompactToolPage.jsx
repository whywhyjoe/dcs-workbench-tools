/* The host page around the instrument: the SharePoint suite bar, the page's
   own light chrome, and the tool sitting in flow with real margins above and
   below. This is the whole point of L2 — the tool never bleeds to the page
   edge and never inherits the page's white. */
function CompactToolPage() {
  return (
    <div style={{ width: 1180, padding: '0 0 48px', background: '#f3f2f1', fontFamily: 'var(--sans)' }} data-screen-label="Compact tool pattern (L2) in a web part">
      <div style={{ height: 48, background: '#1b1d21', display: 'flex', alignItems: 'center', gap: 16, padding: '0 16px', filter: 'grayscale(1) brightness(.85)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 4px)', gap: 3 }}>
          {Array.from({ length: 9 }, (_, i) => <i key={i} style={{ width: 4, height: 4, borderRadius: 1, background: '#8a8f98', display: 'block' }} />)}
        </div>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#d8dade' }}>SharePoint</span>
        <span style={{ marginLeft: 'auto', fontSize: 13, color: '#c8cace' }}>Joe Zapert (NERVE…</span>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ fontSize: 12, color: '#605e5c', letterSpacing: '.04em', textTransform: 'uppercase', fontWeight: 600 }}>FCU Portal · Tools</div>
        <h1 style={{ margin: '6px 0 8px', font: '600 28px/1.25 var(--sans)', color: '#242424' }}>Banner builder</h1>
        <p style={{ margin: '0 0 20px', fontSize: 15, lineHeight: 1.6, color: '#444', maxWidth: '68ch' }}>Generate a halo banner for a team page. Set the artboard, drop in a photo, and copy the markup — the generated HTML has no dependencies and can be pasted into any modern page.</p>

        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', margin: '0 0 24px', padding: '14px 16px', background: '#ffffff', border: '1px solid #d6d4d2', borderLeft: '3px solid var(--accent)', borderRadius: 4, maxWidth: '74ch' }}>
          <span style={{ flex: 'none', marginTop: 2, display: 'grid', gridTemplateColumns: 'repeat(2, 6px)', gridAutoRows: '6px', gap: 2 }}>
            <i style={{ background: '#0b6a5b' }} /><i style={{ background: '#0b6a5b', opacity: .62 }} /><i style={{ background: '#0b6a5b', opacity: .38 }} /><i style={{ background: '#0b6a5b', opacity: .2 }} />
          </span>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: '#444' }}>
            <strong style={{ color: '#242424', fontWeight: 600 }}>This is the L2 pattern reference, not a spec for the real Halo tool.</strong> The banner generator is standing in as sample content so the shell, the control column, the canvas and its toolbar can be seen doing real work. Choices made here to demonstrate the kit — the curated colour swatches, the grouped canvas toolbar — are pattern options, not requirements. Take the <em style={{ color: '#242424', fontStyle: 'normal' }}>shell and the controls</em> from this page; leave each tool's own decisions alone.
          </p>
        </div>

        <HaloTool />

        <p style={{ margin: '24px 0 0', fontSize: 14, lineHeight: 1.6, color: '#444' }}>Need a different shape? The <a href="#" style={{ color: '#0b6a5b' }}>artboard presets</a> page lists every sanctioned banner size for the portal.</p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<CompactToolPage />);