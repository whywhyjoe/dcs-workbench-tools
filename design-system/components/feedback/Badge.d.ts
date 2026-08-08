import * as React from 'react';

/**
 * File-type pill, status chip, count pill and keycap.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** js | html | css | json — anything else falls back to the accent pill. */
  type?: 'js' | 'html' | 'css' | 'json' | string;
}
export declare function Badge(props: BadgeProps): JSX.Element;

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'ok' | 'warn' | 'err';
}
export declare function Chip(props: ChipProps): JSX.Element;

export interface CountPillProps extends React.HTMLAttributes<HTMLSpanElement> {}
export declare function CountPill(props: CountPillProps): JSX.Element;

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}
export declare function Kbd(props: KbdProps): JSX.Element;
