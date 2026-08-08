import * as React from 'react';

export type IconName =
  | 'file' | 'folder' | 'folder-open' | 'star' | 'download' | 'upload' | 'trash'
  | 'search' | 'refresh' | 'plus' | 'close' | 'check' | 'chevron' | 'maximize'
  | 'code' | 'layers' | 'globe' | 'shield' | 'link' | 'info' | 'warn' | 'error'
  | 'arrow-left' | 'arrow-right' | 'clock' | 'list'
  /** One gear. `advanced` is an alias of `settings`. */
  | 'settings' | 'advanced' | 'site' | 'pages' | 'query'
  | 'minus' | 'chevron-up' | 'edit' | 'wrap' | 'eval' | 'sun' | 'moon' | 'pin'
  | 'library' | 'pane-left' | 'pane-right' | 'pane-bottom'
  /** The SharePoint mark. `workbench` is a deprecated alias of it. */
  | 'sharepoint' | 'workbench';

/**
 * The canonical DCS Workbench glyph. Inline SVG, no package, no CDN.
 * Colour always comes from the parent's `color`; never pass a hex.
 */
export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  /** Rendered px. 15–16 is the shipping size; 13 inside xs/sm controls. */
  size?: number;
  /** Override only to match a neighbouring glyph. 1.3–1.5 on the 16 grid. */
  strokeWidth?: number;
}
export declare function Icon(props: IconProps): JSX.Element | null;
export declare function PlayGlyph(props: { size?: number }): JSX.Element;
/** Filled pin — the pinned state of a framework row. */
export declare function PinGlyph(props: { size?: number }): JSX.Element;
/** Six-dot drag handle on a reorderable row. */
export declare function DragGlyph(props: { size?: number }): JSX.Element;
export declare const ICON_NAMES: IconName[];

/**
 * A Microsoft product mark. NOT part of the icon set: filled, foreign grid,
 * trademarked. Use only where the control opens the product it names.
 */
export declare function ProductGlyph(props: { name: 'copilot' | 'sharepoint'; size?: number } & React.SVGProps<SVGSVGElement>): JSX.Element | null;
export declare const PRODUCT_NAMES: string[];
