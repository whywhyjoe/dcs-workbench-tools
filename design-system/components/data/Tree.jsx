import React from 'react';

/* The inspector. Value colours deliberately mirror the Monaco palette, so a
   string looks the same in the editor and in the console tree. */
function valueClass(v) {
  if (v === null || v === undefined) return 'dcs-tree-null';
  if (typeof v === 'string') return 'dcs-tree-str';
  if (typeof v === 'number') return 'dcs-tree-num';
  if (typeof v === 'boolean') return 'dcs-tree-bool';
  return '';
}
function render(v) {
  if (v === null) return 'null';
  if (typeof v === 'string') return '"' + v + '"';
  return String(v);
}

export function TreeNode({ label, value, open = true, depth = 0 }) {
  const [isOpen, setOpen] = React.useState(open);
  const branch = value && typeof value === 'object';
  if (!branch) {
    return (
      <div className="dcs-tree-row">
        <span className="dcs-tree-twist" />
        <span className="dcs-tree-key">{label}</span>:&nbsp;<span className={valueClass(value)}>{render(value)}</span>
      </div>
    );
  }
  return (
    <div>
      <div className={'dcs-tree-row is-expandable' + (isOpen ? ' is-open' : '')} onClick={() => setOpen(!isOpen)}>
        <span className="dcs-tree-twist">›</span>
        <span className="dcs-tree-key">{label}</span>:&nbsp;<span style={{ color: 'var(--fg-dim)' }}>{Array.isArray(value) ? '[…]' : '{…}'}</span>
      </div>
      {isOpen ? (
        <div className="dcs-tree-children">
          {Object.keys(value).map(k => <TreeNode key={k} label={k} value={value[k]} depth={depth + 1} />)}
        </div>
      ) : null}
    </div>
  );
}

export function Tree({ data = {}, className = '', ...rest }) {
  return (
    <div className={('dcs-tree ' + className).trim()} {...rest}>
      {Object.keys(data).map(k => <TreeNode key={k} label={k} value={data[k]} />)}
    </div>
  );
}
