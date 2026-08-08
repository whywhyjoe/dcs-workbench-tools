import React from 'react';

/* Folders carry role, files carry type — Lucide outlines, each a single
   closed path so the tint fill and the stroke ride the same edge.
   TWO TIERS: the bare role paints REST (low chroma, so 200 rows read as one
   calm list). calledOut opts into the bright pair, and is rationed — the
   folder you are inside, the selected row, a filter match, a file changed
   since last sync. If everything is called out, nothing is. */
const FOLDER = 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z';
const FILE_BODY = 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z';
const FILE_FOLD = 'M14 2v4a2 2 0 0 0 2 2h4';

/* Near relatives inherit: .ts/.mjs → js, .scss → css, .svg → html,
   .csv/.xlsx → json (Data). Anything else is grey — a sixth hue needs a
   sixth pane to justify it. */
const EXT = {
  js: 'js', ts: 'js', mjs: 'js', cjs: 'js', jsx: 'js', tsx: 'js',
  html: 'html', htm: 'html', svg: 'html', aspx: 'html',
  css: 'css', scss: 'css', less: 'css',
  json: 'json', csv: 'json', xlsx: 'json', xls: 'json', xml: 'json',
  pdf: 'doc', docx: 'doc', doc: 'doc', pptx: 'doc', md: 'doc', txt: 'doc',
};
export function roleForFile(name) {
  const m = /\.([a-z0-9]+)$/i.exec(name || '');
  return (m && EXT[m[1].toLowerCase()]) || 'file';
}

/* Colour comes from the CSS classes, never from a hex here: .dcs-node-<role>
   paints rest, .is-called-out swaps in the active pair, .dcs-node-open is
   the current folder. */
export function NodeGlyph({ kind = 'file', role = 'file', calledOut = false, size = 15, className = '', ...rest }) {
  const cls = ['dcs-node', role === 'open' ? 'dcs-node-open' : 'dcs-node-' + role, calledOut ? 'is-called-out' : '', className].filter(Boolean).join(' ');
  return (
    <svg className={cls} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {kind === 'folder'
        ? <path d={FOLDER} />
        : <><path d={FILE_BODY} /><path d={FILE_FOLD} /></>}
    </svg>
  );
}

export function NodeRow({ node = {}, calledOut, onClick, className = '', ...rest }) {
  const hi = calledOut ?? node.calledOut ?? false;
  return (
    <button type="button" className={['dcs-noderow', hi ? 'is-called-out' : '', className].filter(Boolean).join(' ')} onClick={onClick} {...rest}>
      <NodeGlyph kind={node.kind} role={node.role || (node.kind === 'folder' ? 'user' : roleForFile(node.name))} calledOut={hi} />
      <span className="dcs-noderow-name">{node.name}</span>
      <span className="dcs-noderow-meta">{node.meta}</span>
    </button>
  );
}

/* The bundler only puts CAPITALISED exports on window.<Namespace>, so
   roleForFile — correctly lowercase, it is a function not a component — was
   unreachable from a card or a kit that reads the global. NodeRoles is the
   capitalised door to it. roleForFile itself is unchanged and still exported;
   nothing that already imports it needs to move. */
export const NodeRoles = {
  /** Map a filename to its node role. NodeRoles.forFile('a.scss') === 'css' */
  forFile: roleForFile,
  /** The extension → role table, for tools that need to extend it. */
  ext: EXT,
  /** Every role the system paints. */
  all: ['user', 'lib', 'sys', 'open', 'js', 'html', 'css', 'json', 'doc', 'file'],
};
