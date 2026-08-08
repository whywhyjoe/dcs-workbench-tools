import * as React from 'react';

/** Immediate binary setting — 30 × 17 pill, accent when on. */
export interface ToggleProps {
  label?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
export declare function Toggle(props: ToggleProps): JSX.Element;

/** Checkbox — a form value, not an immediate setting. */
export interface CheckProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}
export declare function Check(props: CheckProps): JSX.Element;
