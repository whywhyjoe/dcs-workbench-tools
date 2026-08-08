Inline notices and the single floating toast.

```jsx
<Notice tone="info" icon={<Icon name="info" size={13} />}>Results are capped at 100 — a nextLink is available.</Notice>
<Notice tone="err" icon={<Icon name="error" size={13} />}>403 — the request digest expired. Retrying once.</Notice>
<Toast>Uploaded to /Code/tools/dcspad · v2.0</Toast>
```

A recoverable error is a notice, never a modal.
