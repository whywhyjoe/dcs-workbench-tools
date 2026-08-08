The dense results table: sticky chrome header, accent underline on the sorted column, no zebra striping.

```jsx
<DataGrid
  columns={[{key:'title',label:'Title'},{key:'internal',label:'Internal name',mono:true},{key:'items',label:'Items',num:true}]}
  rows={lists} sort={{key:'title',dir:'asc'}} onSort={setSort} onOpenRow={open} />
```

Quantities right-align in mono; identifiers stay copyable. Row hover is the affordance — never stripe.
