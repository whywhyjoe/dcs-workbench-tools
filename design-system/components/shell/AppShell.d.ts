import * as React from 'react';

/**
 * L1 · Workbench shell — topbar / work / status bar, full takeover.
 */
export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Wordmark, view controls, context chip. 28px controls. */
  topbar?: React.ReactNode;
  /** Mono, 11px. Path, counts, connection state. */
  status?: React.ReactNode;
}
export declare function AppShell(props: AppShellProps): JSX.Element;

/**
 * L2 · Instrument shell — one job, one screen, inside a web part.
 */
export interface ToolShellProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  /** The accent half of the split title — "Halo <b>generator</b>". */
  accent?: React.ReactNode;
  actions?: React.ReactNode;
  /** Control column beside a canvas; stacks below 720px. */
  canvas?: boolean;
  /** The 2×2 instrument mark. On by default; identical on every L2 tool. */
  mark?: boolean;
}
export declare function ToolShell(props: ToolShellProps): JSX.Element;

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A string becomes the 10px uppercase panel title. */
  title?: React.ReactNode;
  /** sm (22px) buttons, right-aligned in the head. */
  tools?: React.ReactNode;
}
export declare function Panel(props: PanelProps): JSX.Element;

export interface PanelTitleProps extends React.HTMLAttributes<HTMLSpanElement> {}
export declare function PanelTitle(props: PanelTitleProps): JSX.Element;

export interface ControlsProps extends React.HTMLAttributes<HTMLDivElement> {}
export declare function Controls(props: ControlsProps): JSX.Element;

export interface ControlGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Two words at most: Site, Content, Geometry, Colour, Output. */
  title?: React.ReactNode;
}
export declare function ControlGroup(props: ControlGroupProps): JSX.Element;

export interface ControlRowProps extends React.HTMLAttributes<HTMLDivElement> { cols?: 2 | 3 }
export declare function ControlRow(props: ControlRowProps): JSX.Element;

export interface CanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The canvas's own 30px toolbar. */
  bar?: React.ReactNode;
}
export declare function Canvas(props: CanvasProps): JSX.Element;

export interface SplitterProps extends React.HTMLAttributes<HTMLDivElement> {
  horizontal?: boolean;
  /** Set by your drag handler for the duration of the drag. */
  dragging?: boolean;
}
export declare function Splitter(props: SplitterProps): JSX.Element;
