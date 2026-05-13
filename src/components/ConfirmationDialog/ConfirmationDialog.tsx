import { type ReactNode } from 'react';
import { AlertDialog } from '../AlertDialog/AlertDialog';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
}

export function ConfirmationDialog(props: ConfirmationDialogProps) {
  return <AlertDialog {...props} variant="default" />;
}
