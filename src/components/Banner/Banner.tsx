import { type ReactNode } from 'react';
import { X } from '@phosphor-icons/react';
import './Banner.css';

type BannerVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

interface BannerProps {
  variant?: BannerVariant;
  icon?: ReactNode;
  action?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  children: ReactNode;
}

export function Banner({ variant = 'neutral', icon, action, dismissible, onDismiss, children }: BannerProps) {
  return (
    <div className={`rf-banner rf-banner--${variant}`} role="status">
      {icon && <span className="rf-banner__icon">{icon}</span>}
      <div className="rf-banner__content">{children}</div>
      {action && <div className="rf-banner__action">{action}</div>}
      {dismissible && (
        <button type="button" className="rf-banner__dismiss" onClick={onDismiss} aria-label="Dismiss">
          <X size={14} />
        </button>
      )}
    </div>
  );
}
