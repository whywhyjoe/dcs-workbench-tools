import * as React from 'react';

/** Editor-style tabs (default) or in-view underline tabs. */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: Array<string | { value: string; label: React.ReactNode; count?: number | string }>;
  value?: string;
  onChange?: (value: string) => void;
  /** Tabs inside a view rather than over a surface. */
  underline?: boolean;
}
export declare function Tabs(props: TabsProps): JSX.Element;
