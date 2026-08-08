import * as React from 'react';

/** A 28px catalog row with hover-revealed tools. */
export interface ListRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Checkbox, glyph, or badge before the name. */
  lead?: React.ReactNode;
  name: React.ReactNode;
  /** Mono, right-aligned — size, count, timestamp. */
  meta?: React.ReactNode;
  /** Icon buttons; they fade in on hover and focus. */
  tools?: React.ReactNode;
  /** Selected — accent rail plus chrome ground, kept at rest. */
  on?: boolean;
  /** Unavailable / implicit entry: faint italic. */
  muted?: boolean;
}
export declare function ListRow(props: ListRowProps): JSX.Element;
