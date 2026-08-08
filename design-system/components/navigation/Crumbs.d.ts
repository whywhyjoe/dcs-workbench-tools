import * as React from 'react';

/** The path bar. Mono, last segment inert. */
export interface CrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<string | { label: string; href?: string }>;
  onNavigate?: (item: any, index: number) => void;
}
export declare function Crumbs(props: CrumbsProps): JSX.Element;
