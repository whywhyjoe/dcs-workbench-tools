import React from 'react';

/* Sticky header on chrome ground · no zebra (hover is the affordance) ·
   IDs, GUIDs and paths in mono · quantities right-aligned · one accent
   underline on the sorted column. */
export function DataGrid({ columns = [], rows = [], sort, onSort, onOpenRow, className = '', ...rest }) {
  return (
    <div className={('dcs-grid-wrap ' + className).trim()} {...rest}>
      <table className="dcs-grid">
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.key} className={sort && sort.key === c.key ? 'is-sorted' : ''}
                style={c.num ? { textAlign: 'right' } : undefined}
                onClick={onSort ? () => onSort(c.key) : undefined}>
                {c.label}
                {sort && sort.key === c.key ? <span className="dcs-grid-sort">{sort.dir === 'desc' ? '▼' : '▲'}</span> : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id ?? i}
              className={[r.selected ? 'is-selected' : '', onOpenRow ? 'is-openable' : ''].filter(Boolean).join(' ')}
              onClick={onOpenRow ? () => onOpenRow(r) : undefined}>
              {columns.map(c => (
                <td key={c.key} className={c.num ? 'dcs-num' : c.mono ? 'dcs-mono' : ''}
                  style={r.dim ? { color: 'var(--fg-faint)' } : undefined}>
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
