import { type ReactNode } from 'react';
import './Badge.css';

type BadgeVariant = 'neutral' | 'success' | 'danger' | 'warning' | 'info' | 'teal' | 'purple' | 'orange';

interface BadgeProps {
  variant?: BadgeVariant;
  icon?: ReactNode;
  children: ReactNode;
}

export function Badge({ variant = 'neutral', icon, children }: BadgeProps) {
  return (
    <span className={`rf-badge rf-badge--${variant}`}>
      {icon && <span className="rf-badge__icon">{icon}</span>}
      {children}
    </span>
  );
}
