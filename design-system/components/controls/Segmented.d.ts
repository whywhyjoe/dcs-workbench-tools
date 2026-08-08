import * as React from 'react';

/** Mutually exclusive views — Tree / Table / Raw. Two to four options. */
export interface SegmentedProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  options: Array<string | { value: string; label: React.ReactNode }>;
  value?: string;
  onChange?: (value: string) => void;
}
export declare function Segmented(props: SegmentedProps): JSX.Element;
