import { type ReactNode, useEffect } from 'react';
import './SidePanel.css';

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  footer?: ReactNode;
  width?: 'md' | 'lg';
  children: ReactNode;
}

export function SidePanel({ open, onClose, title, description, footer, width = 'md', children }: SidePanelProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="rf-side-panel__overlay" onClick={onClose} role="presentation">
      <aside
        className={`rf-side-panel rf-side-panel--${width}`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {(title || description) && (
          <header className="rf-side-panel__header">
            <div>
              {title && <h2 className="rf-side-panel__title">{title}</h2>}
              {description && <p className="rf-side-panel__description">{description}</p>}
            </div>
            <button type="button" className="rf-side-panel__close" onClick={onClose} aria-label="Close panel">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </header>
        )}
        <div className="rf-side-panel__body">{children}</div>
        {footer && <footer className="rf-side-panel__footer">{footer}</footer>}
      </aside>
    </div>
  );
}
