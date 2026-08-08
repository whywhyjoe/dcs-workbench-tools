File and folder rows with the two-tier node colour system.

```jsx
<NodeRow node={{ name: 'Lateleir', kind: 'folder', role: 'user', meta: 'folder' }} />
<NodeRow node={{ name: 'Splash', kind: 'folder', role: 'open', meta: 'open' }} calledOut />
<NodeRow node={{ name: 'dcspad.js', kind: 'file', role: roleForFile('dcspad.js'), meta: '65 B' }} />
```

From a card or anywhere reading the global namespace, use `NodeRoles.forFile(name)` — `roleForFile` is lowercase and so is not exposed on `window.<Namespace>`.

Folder roles: `user` (default), `lib` (vendored), `sys` (Forms, hidden, leading underscore — no fill), `open` (the folder you are inside). File roles come from `roleForFile`. Use `calledOut` on a handful of rows at most.
