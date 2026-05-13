import { type ReactNode, useEffect } from 'react';
import './Drawer.css';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export function Drawer({ open, onClose, title, description, footer, children }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="rf-drawer__overlay" onClick={onClose}>
      <div className="rf-drawer" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        <div className="rf-drawer__handle" aria-hidden="true" />
        {(title || description) && (
          <header className="rf-drawer__header">
            {title && <h2 className="rf-drawer__title">{title}</h2>}
            {description && <p className="rf-drawer__description">{description}</p>}
          </header>
        )}
        <div className="rf-drawer__body">{children}</div>
        {footer && <footer className="rf-drawer__footer">{footer}</footer>}
      </div>
    </div>
  );
}
