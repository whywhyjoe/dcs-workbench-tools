import * as React from 'react';

/** Modal decision. Native <dialog>; the backdrop is #0a0c10cc. */
export interface DialogProps extends React.HTMLAttributes<HTMLDialogElement> {
  open?: boolean;
  title: React.ReactNode;
  /** One sentence of context under the title — what is being acted on. */
  context?: React.ReactNode;
  /** Buttons, right-aligned. Cancel is ghost; the verb is primary. */
  actions?: React.ReactNode;
  onClose?: () => void;
}
export declare function Dialog(props: DialogProps): JSX.Element;
