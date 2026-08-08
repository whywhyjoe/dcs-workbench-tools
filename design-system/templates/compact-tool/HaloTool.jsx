/* L2 · the instrument itself. Head (40px) + control column (340px) + canvas.
   No status bar, no splitters, never full-bleed — it is an object on the page.
   The banner generator is SAMPLE CONTENT standing in so the shell can be seen
   doing real work; it is not a spec for the real Halo tool. */
const { ToolShell, Controls, ControlGroup, ControlRow, Canvas, Field, Input, Textarea, Select, Slider, Swatches, Check, Button, IconButton, Icon, PlayGlyph, PanelTitle, Segmented, Notice, ScanBar } = window.DCSWorkbenchDesignSystem_dafd54;

function HaloArtboard({ stroke, textSize, plateRound }) {
  return (
    <div style={{ width: 620, height: 352, position: 'relative', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-m)', overflow: 'hidden', background: '#0f1114' }}>
      <svg width="620" height="352" viewBox="0 0 620 352" style={{ position: 'absolute', inset: 0, display: 'block' }}>
        <defs>
          <pattern id="halo-stripe" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="8" height="8" fill="#1a1d23" /><rect width="3" height="8" fill="#20242c" />
          </pattern>
          <clipPath id="halo-clip"><circle cx="420" cy="150" r="118" /></clipPath>
        </defs>
        <rect width="620" height="352" fill="url(#halo-stripe)" />
        <g clipPath="url(#halo-clip)"><rect x="302" y="32" width="236" height="236" fill="#252932" /></g>
        <circle cx="420" cy="150" r="118" fill="none" stroke="var(--accent)" strokeWidth={stroke} />
        <text x="420" y="155" textAnchor="middle" fill="var(--fg-faint)" fontFamily="var(--mono)" fontSize="11">photo · inner fill</text>
        <rect x="46" y="228" width="352" height="58" rx={plateRound ? 8 : 0} fill="#0f1114" fillOpacity="0.82" />
        <text x="70" y="266" fill="var(--fg-strong)" fontFamily="var(--sans)" fontSize={textSize * 0.54}>
          Meet the <tspan fill="var(--accent)" fontWeight="700">Insights</tspan> team
        </text>
      </svg>
    </div>
  );
}

function HaloTool() {
  const [halo, setHalo] = React.useState({ scale: 0.96, x: 35, y: 50, stroke: 9, height: 680 });
  const [photo, setPhoto] = React.useState({ zoom: 1, panX: 50, panY: 50 });
  const [text, setText] = React.useState({ size: 50, x: 40, y: 80 });
  const [colour, setColour] = React.useState('#ffffff');
  const [round, setRound] = React.useState(true);
  const [zoom, setZoom] = React.useState('Fit');
  const [running, setRunning] = React.useState(false);
  const [stampAt, setStampAt] = React.useState('14:22:06');

  const generate = () => {
    setRunning(true);
    setTimeout(() => { setRunning(false); setStampAt(new Date().toLocaleTimeString('en-GB', { hour12: false })); }, 900);
  };
  const set = (fn, key) => e => fn(s => ({ ...s, [key]: +e.target.value }));

  return (
    <ToolShell title="Halo banner" accent="generator"
      style={{ boxShadow: '0 10px 28px -10px #0006' }}
      actions={<>
        <span style={{ font: '500 10px/1 var(--mono)', color: 'var(--fg-faint)', padding: '3px 6px', background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-s)', alignSelf: 'center', marginRight: 4 }}>v1.4</span>
        <Button><Icon name="file" size={13} />Copy code</Button>
        <Button><Icon name="code" size={13} />Show code</Button>
        <Button variant="primary" size="lg" onClick={generate}><PlayGlyph size={13} />Generate</Button>
      </>}
      canvas>
      <Controls style={{ maxHeight: 620, width: 340 }}>
        <ControlGroup title="Design · Halo">
          <Field label="Scale" value={halo.scale.toFixed(2)}><Slider min={0.2} max={2} step={0.01} value={halo.scale} onChange={e => setHalo(s => ({ ...s, scale: +e.target.value }))} /></Field>
          <ControlRow>
            <Field label="Position X" value={halo.x}><Slider value={halo.x} onChange={set(setHalo, 'x')} /></Field>
            <Field label="Position Y" value={halo.y}><Slider value={halo.y} onChange={set(setHalo, 'y')} /></Field>
          </ControlRow>
          <Field label="Stroke weight" value={halo.stroke}><Slider min={1} max={40} value={halo.stroke} onChange={set(setHalo, 'stroke')} /></Field>
          <Field label="Artboard height" value={halo.height}><Slider min={200} max={1000} value={halo.height} onChange={set(setHalo, 'height')} /></Field>
        </ControlGroup>

        <ControlGroup title="Photo · Inner fill">
          <ControlRow cols={3}>
            <Field label="Zoom" value={photo.zoom}><Slider min={1} max={4} step={0.1} value={photo.zoom} onChange={e => setPhoto(s => ({ ...s, zoom: +e.target.value }))} /></Field>
            <Field label="Pan X" value={photo.panX}><Slider value={photo.panX} onChange={set(setPhoto, 'panX')} /></Field>
            <Field label="Pan Y" value={photo.panY}><Slider value={photo.panY} onChange={set(setPhoto, 'panY')} /></Field>
          </ControlRow>
          <Field label="Photo URL"><Input mono defaultValue="https://images.unsplash.com/photo-1480714378408" /></Field>
          <Field label="Photo alt text" hint="Required — the banner is decorative only if this is empty."><Input defaultValue="City skyline" /></Field>
        </ControlGroup>

        <ControlGroup title="Text">
          <Field label={<>Content <span style={{ color: 'var(--fg-faint)' }}>— HTML ok</span></>}>
            <Textarea mono defaultValue={'Meet the <span class="b">Insights</span> team'} />
          </Field>
          <ControlRow>
            <Field label="Font"><Select options={['Dax Pro', 'Segoe UI']} /></Field>
            <Field label="Weight"><Select options={['Regular', 'Semibold', 'Bold']} /></Field>
          </ControlRow>
          <ControlRow cols={3}>
            <Field label="Size" value={text.size}><Slider min={12} max={120} value={text.size} onChange={set(setText, 'size')} /></Field>
            <Field label="Position X" value={text.x}><Slider value={text.x} onChange={set(setText, 'x')} /></Field>
            <Field label="Position Y" value={text.y}><Slider value={text.y} onChange={set(setText, 'y')} /></Field>
          </ControlRow>
          <Field label={<>Text colour <span style={{ color: 'var(--fg-faint)', fontWeight: 400 }}>— swatch pattern, shown for the kit</span></>}>
            <Swatches colors={['#ffffff', '#14161b', '#0079c1', '#e8b660']} value={colour} onChange={setColour} />
          </Field>
          <Check label="Round the text plate corners" checked={round} onChange={e => setRound(e.target.checked)} />
        </ControlGroup>
      </Controls>

      <div style={{ position: 'relative', minWidth: 0, display: 'flex', flexDirection: 'column', background: 'var(--bg-0)' }}>
        <div className={'dcs-canvas-bar' + (running ? ' is-pending' : '')} style={{ position: 'relative', overflow: 'hidden' }}>
          <PanelTitle>Artboard</PanelTitle>
          <span style={{ font: '500 10.5px/1 var(--mono)', color: 'var(--fg-faint)', whiteSpace: 'nowrap' }}>1200 × {halo.height}</span>
          <span style={{ flex: 1 }} />
          <Segmented options={['Fit', '100%']} value={zoom} onChange={setZoom} style={{ height: 22 }} />
          <IconButton size="sm" title="Download PNG"><Icon name="download" size={13} /></IconButton>
          <IconButton size="sm" title="Maximise"><Icon name="maximize" size={13} /></IconButton>
          <ScanBar style={{ opacity: running ? 1 : 0 }} />
        </div>
        <div className="dcs-canvas-stage" style={{ padding: 24 }}>
          <HaloArtboard stroke={halo.stroke} textSize={text.size} plateRound={round} />
        </div>
        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderTop: '1px solid var(--border)', background: 'var(--bg-1)' }}>
          <Notice tone="info" icon={<Icon name="info" size={13} />} style={{ padding: '6px 10px' }}>
            Paste the generated markup into a Code web part — placement above the fold delays loading.
          </Notice>
          <span style={{ marginLeft: 'auto', font: '10.5px/1 var(--mono)', color: 'var(--fg-faint)', whiteSpace: 'nowrap' }}>last generated {stampAt}</span>
        </div>
      </div>
    </ToolShell>
  );
}

Object.assign(window, { HaloTool });