import * as React from 'react';

/**
 * The pixel alphabet — a letter tile per L1 tool, plus the L2 instrument mark
 * and the split-weight wordmark.
 */
export interface MarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** D (DCS/DCSPad, the primary) · S (SP Workbench) · I · Q. */
  letter?: 'D' | 'S' | 'I' | 'Q';
  /** A custom 4 × 5 grid string: X lit, o lit at 55%, . off. Five groups of four. */
  grid?: string;
  /** lg doubles the cell and gap — for a masthead. */
  size?: 'md' | 'lg';
}
export declare function Mark(props: MarkProps): JSX.Element;
export declare const GRIDS: Record<string, string>;

export interface InstrumentMarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'md' | 'lg';
}
export declare function InstrumentMark(props: InstrumentMarkProps): JSX.Element;

export interface WordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Quiet half. */
  head?: string;
  /** Accent half. */
  tail?: string;
}
export declare function Wordmark(props: WordmarkProps): JSX.Element;
