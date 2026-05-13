import { type ReactNode } from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  /** Destructive uses danger button; default uses primary */
  variant?: 'default' | 'destructive';
  loading?: boolean;
}

export function AlertDialog({
  open, onClose, title, description, confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  onConfirm, variant = 'default', loading,
}: AlertDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>{cancelLabel}</Button>
          <Button
            variant={variant === 'destructive' ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      {description && (
        <p style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)', margin: 0 }}>
          {description}
        </p>
      )}
    </Modal>
  );
}
