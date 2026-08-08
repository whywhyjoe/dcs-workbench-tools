import * as React from 'react';

/** Empty / loading / error — one centred mono line. */
export interface StateProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'empty' | 'loading' | 'err';
}
export declare function State(props: StateProps): JSX.Element;

export interface SkeletonProps extends React.HTMLAttributes<HTMLElement> {
  width?: number | string;
  height?: number | string;
  /** Seconds — stagger sibling rows by .1s. */
  delay?: number;
}
export declare function Skeleton(props: SkeletonProps): JSX.Element;

/** Put it inside a relatively-positioned parent carrying .is-sweeping or .is-pending. */
export interface ScanBarProps extends React.HTMLAttributes<HTMLSpanElement> {}
export declare function ScanBar(props: ScanBarProps): JSX.Element;
