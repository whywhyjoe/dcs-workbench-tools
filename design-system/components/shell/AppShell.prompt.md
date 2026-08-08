The two shells and their furniture — pick L1 or L2 before you start; they differ in shell, not in tokens.

```jsx
<AppShell topbar={<><Wordmark head="DCS" tail="PAD" /><span className="dcs-topbar-right"><Chip tone="ok">SP: Live</Chip></span></>}
          status={<><span>/sites/NewNerve</span><span className="dcs-status-right">4 files</span></>}>
  <Rail>…</Rail>
  <Splitter />
  <Panel title="Files" tools={<IconButton size="sm" title="Refresh"><Icon name="refresh" size={13}/></IconButton>}>…</Panel>
</AppShell>

<ToolShell title="Halo" accent="generator" canvas actions={<Button variant="primary" size="lg">Generate</Button>}>
  <Controls><ControlGroup title="Geometry">…</ControlGroup></Controls>
  <Canvas bar={<PanelTitle>Preview</PanelTitle>}>…</Canvas>
</ToolShell>
```

If an L2 tool grows a second working surface and a status bar, it has become L1 — give it a letter mark.
