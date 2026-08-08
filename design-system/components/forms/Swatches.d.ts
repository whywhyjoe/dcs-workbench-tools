import * as React from 'react';

/** A curated colour row — 24px squares. Never a free colour picker. */
export interface SwatchesProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  colors: string[];
  value?: string;
  onChange?: (color: string) => void;
}
export declare function Swatches(props: SwatchesProps): JSX.Element;
