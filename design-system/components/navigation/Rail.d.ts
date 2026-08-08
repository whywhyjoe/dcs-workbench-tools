import * as React from 'react';

/**
 * The grouped left rail of a workbench.
 */
export interface RailProps extends React.HTMLAttributes<HTMLElement> {}
export declare function Rail(props: RailProps): JSX.Element;

export interface RailLabelProps { children?: React.ReactNode }
export declare function RailLabel(props: RailLabelProps): JSX.Element;

export interface RailItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** A 15px Icon. Strokes read --fg-mid at rest. */
  glyph?: React.ReactNode;
  active?: boolean;
}
export declare function RailItem(props: RailItemProps): JSX.Element;
export declare function RailSep(): JSX.Element;
