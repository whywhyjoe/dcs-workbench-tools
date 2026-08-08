import * as React from 'react';

/**
 * Dropdown menu — labelled groups, badge-led items, separators.
 */
export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {}
export declare function Menu(props: MenuProps): JSX.Element;
export interface MenuLabelProps { children?: React.ReactNode }
export declare function MenuLabel(props: MenuLabelProps): JSX.Element;
export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** A Badge or Icon before the label. */
  lead?: React.ReactNode;
  active?: boolean;
}
export declare function MenuItem(props: MenuItemProps): JSX.Element;
export declare function MenuSep(): JSX.Element;
