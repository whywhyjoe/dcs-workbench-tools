Field wraps a label + control + hint; Input / Textarea / Select are the 28px controls that go inside it.

```jsx
<Field label="Server-relative path" hint="Enter an absolute https:// URL on this tenant.">
  <Input mono defaultValue="/sites/NewNerve/FCUPortal/Code" />
</Field>
<Field label="Library"><Select options={['Documents', 'Site Pages']} /></Field>
```

`mono` for anything machine-made. `invalid` turns the border red and tints label + hint; the hint then states the fix, starting with the machine fact.
