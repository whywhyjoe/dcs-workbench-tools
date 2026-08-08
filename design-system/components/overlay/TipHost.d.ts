import * as React from 'react';

/** Wraps a glyph-only control and shows one short phrase on hover/focus. */
export interface TipHostProps extends React.HTMLAttributes<HTMLSpanElement> {
  tip: React.ReactNode;
  /** Drop it underneath instead of to the right. */
  below?: boolean;
}
export declare function TipHost(props: TipHostProps): JSX.Element;
