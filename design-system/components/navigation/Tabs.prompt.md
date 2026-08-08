Tab strips. Default form is for panes over a working surface; `underline` is for switching views inside one panel.

```jsx
<Tabs tabs={[{value:'html',label:'HTML'},{value:'css',label:'CSS'},{value:'console',label:'Console',count:3}]} value={tab} onChange={setTab} />
<Tabs underline tabs={['Fields', 'Items', 'Raw']} value={v} onChange={setV} />
```

The count pill is the error count — it is red, and it is how you know which pane the failure is in.
