The dropdown. Absolutely positioned by the caller; the class supplies paint, radius and the one shadow.

```jsx
<Menu style={{ top: 34, left: 8 }}>
  <MenuLabel>Export</MenuLabel>
  <MenuItem lead={<Badge type="html" />}>Export HTML</MenuItem>
  <MenuItem lead={<Badge type="js" />} active>Export JS</MenuItem>
  <MenuSep />
  <MenuItem lead={<Badge type="sp">sp</Badge>} disabled>Export to SharePoint…</MenuItem>
</Menu>
```
