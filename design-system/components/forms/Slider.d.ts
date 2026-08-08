import * as React from 'react';

/** Parametric input. Always inside a Field, so the live value is readable. */
export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  min?: number; max?: number; step?: number; value?: number;
}
export declare function Slider(props: SliderProps): JSX.Element;
