The workbench's left navigation rail — grouped, 30px rows, one active item.

```jsx
<Rail>
  <RailLabel>Site</RailLabel>
  <RailItem glyph={<Icon name="globe" />}>Overview</RailItem>
  <RailLabel>Content</RailLabel>
  <RailItem glyph={<Icon name="list" />}>Lists</RailItem>
  <RailItem glyph={<Icon name="folder" />} active>Files</RailItem>
</Rail>
```

Group labels are two words at most: Site, Content, Tools.
