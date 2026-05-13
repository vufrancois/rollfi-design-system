import { type ReactNode } from 'react';
import './Item.css';

interface ItemProps {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Item({ icon, title, description, action, onClick, className = '' }: ItemProps) {
  const interactive = !!onClick;
  return (
    <div
      className={`rf-item ${interactive ? 'rf-item--interactive' : ''} ${className}`}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {icon && <span className="rf-item__icon">{icon}</span>}
      <div className="rf-item__body">
        <div className="rf-item__title">{title}</div>
        {description && <div className="rf-item__description">{description}</div>}
      </div>
      {action && <div className="rf-item__action">{action}</div>}
    </div>
  );
}
