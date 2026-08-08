import * as React from 'react';

/** The JSON inspector — Monaco value colours, mono throughout. */
export interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>;
}
export declare function Tree(props: TreeProps): JSX.Element;

export interface TreeNodeProps { label: string; value: any; open?: boolean; depth?: number }
export declare function TreeNode(props: TreeNodeProps): JSX.Element;
