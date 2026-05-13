import { type ReactNode } from 'react';
import './Alert.css';

interface AlertProps {
  variant?: 'info' | 'warning' | 'success' | 'danger';
  icon?: ReactNode;
  children: ReactNode;
}

export function Alert({ variant = 'info', icon, children }: AlertProps) {
  return (
    <div className={`rf-alert rf-alert--${variant}`} role="alert">
      {icon && <span className="rf-alert__icon">{icon}</span>}
      <div className="rf-alert__content">{children}</div>
    </div>
  );
}
