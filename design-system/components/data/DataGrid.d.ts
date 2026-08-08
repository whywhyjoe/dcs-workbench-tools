import * as React from 'react';

/**
 * The workbench's primary data surface — lists, files, fields, results.
 */
export interface GridColumn {
  key: string;
  label: React.ReactNode;
  /** Right-aligned mono quantity. */
  num?: boolean;
  /** Mono identifier — a GUID, internal name, or server-relative path. */
  mono?: boolean;
  render?: (row: any) => React.ReactNode;
}
export interface DataGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: GridColumn[];
  rows: Array<Record<string, any> & { id?: string; selected?: boolean; dim?: boolean }>;
  sort?: { key: string; dir?: 'asc' | 'desc' };
  onSort?: (key: string) => void;
  /** Makes rows clickable — sets the pointer and the openable affordance. */
  onOpenRow?: (row: any) => void;
}
export declare function DataGrid(props: DataGridProps): JSX.Element;
