A modal for a decision, never for an error you already recovered from.

```jsx
<Dialog open={open} title="Save snippet" context="Saving the current JS selection — 14 lines."
  onClose={close}
  actions={<><Button variant="ghost" onClick={close}>Cancel</Button><Button variant="primary" size="lg">Save snippet</Button></>}>
  <Field label="Snippet name"><Input mono /></Field>
</Dialog>
```
