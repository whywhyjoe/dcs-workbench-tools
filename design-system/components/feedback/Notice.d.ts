import * as React from 'react';

/** Inline banner. Every tone has a wash to sit on — never bare red text. */
export interface NoticeProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'default' | 'info' | 'ok' | 'warn' | 'err';
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}
export declare function Notice(props: NoticeProps): JSX.Element;

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {}
export declare function Toast(props: ToastProps): JSX.Element;
