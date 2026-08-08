import * as React from 'react';

/**
 * The DCS Workbench button. variant="primary" is the one solid accent fill on
 * the screen, on the verb that runs the tool.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = the one solid accent fill. soft = additive actions (Add, Save). */
  variant?: 'primary' | 'soft' | 'default' | 'ghost' | 'danger';
  /** lg 28 topbar · md 26 default · sm 22 panel head · xs 20 escape hatch. */
  size?: 'lg' | 'md' | 'sm' | 'xs';
  /** Dimmed mono shortcut rendered inside the button, e.g. "⌘↵". */
  kbd?: string;
}
export declare function Button(props: ButtonProps): JSX.Element;

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'lg' | 'md' | 'sm' | 'xs';
  variant?: 'default' | 'ghost' | 'danger';
  /** Required — the glyph is doing all the work. */
  title: string;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
