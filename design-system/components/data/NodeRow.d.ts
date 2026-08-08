import * as React from 'react';

export type NodeRole = 'user' | 'lib' | 'sys' | 'open' | 'js' | 'html' | 'css' | 'json' | 'doc' | 'file';

/**
 * A file-tree row: glyph, name, mono meta. Dense by design — these lists run
 * to hundreds of items.
 */
export interface NodeRowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  node: { name: string; kind?: 'folder' | 'file'; role?: NodeRole; meta?: React.ReactNode; calledOut?: boolean };
  /** Opt into the bright tier. Rationed — a row that is doing something. */
  calledOut?: boolean;
}
export declare function NodeRow(props: NodeRowProps): JSX.Element;

export interface NodeGlyphProps extends React.SVGAttributes<SVGElement> {
  kind?: 'folder' | 'file';
  role?: NodeRole;
  calledOut?: boolean;
  size?: number;
}
export declare function NodeGlyph(props: NodeGlyphProps): JSX.Element;

/** Maps a filename to its node role. .ts → js, .scss → css, .csv → json. */
export declare function roleForFile(name: string): NodeRole;

/** Capitalised accessor so the helper is reachable on window.<Namespace>. */
export declare const NodeRoles: {
  forFile(name: string): NodeRole;
  ext: Record<string, NodeRole>;
  all: NodeRole[];
};
