A 26px segmented control for switching between two to four views of the same data.

```jsx
<Segmented options={['Tree', 'Table', 'Raw']} value={view} onChange={setView} />
```

Use it for view modes, not for navigation and not for a binary setting (that is a Toggle).
