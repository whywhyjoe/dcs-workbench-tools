import * as React from 'react';

/**
 * A labelled control. The label row carries the name on the left and, for
 * numeric controls, the live value on the right in mono.
 */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  /** Live readout, right-aligned in mono. */
  value?: React.ReactNode;
  /** One short line under the control. Never a paragraph. */
  hint?: React.ReactNode;
  invalid?: boolean;
}
export declare function Field(props: FieldProps): JSX.Element;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Paths, URLs, GUIDs, endpoints — anything a machine produced. */
  mono?: boolean;
  invalid?: boolean;
}
export declare function Input(props: InputProps): JSX.Element;

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  mono?: boolean;
  invalid?: boolean;
}
export declare function Textarea(props: TextareaProps): JSX.Element;

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: Array<string | { value: string; label: string }>;
}
export declare function Select(props: SelectProps): JSX.Element;
