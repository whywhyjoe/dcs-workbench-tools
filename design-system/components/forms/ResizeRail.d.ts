import * as React from 'react';

/** Drags one edge of a preview. Rest state is drawn; accent on hover/drag. */
export interface ResizeRailProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Drags a height instead of a width. */
  horizontal?: boolean;
  /** Set by your drag handler for the duration of the drag. */
  dragging?: boolean;
  /** One short phrase. Not a tooltip system. */
  tip?: string;
  label?: string;
}
export declare function ResizeRail(props: ResizeRailProps): JSX.Element;
