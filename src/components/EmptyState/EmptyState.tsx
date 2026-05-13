import { type ReactNode } from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="rf-empty-state">
      {icon && <div className="rf-empty-state__icon">{icon}</div>}
      <h3 className="rf-empty-state__title">{title}</h3>
      {description && <p className="rf-empty-state__description">{description}</p>}
      {action && <div className="rf-empty-state__action">{action}</div>}
    </div>
  );
}
