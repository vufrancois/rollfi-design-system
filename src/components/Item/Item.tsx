import { type ReactNode, type MouseEvent } from 'react';
import { X } from '@phosphor-icons/react';
import './Item.css';

type ItemIconTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'brand';

interface ItemProps {
  icon?: ReactNode;
  /** Colors the icon container background + foreground. Default `neutral`. */
  iconTone?: ItemIconTone;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  onClick?: () => void;
  /** When set, renders a small dismiss `X` in the top-right corner. */
  onDismiss?: () => void;
  className?: string;
}

export function Item({
  icon,
  iconTone = 'neutral',
  title,
  description,
  action,
  onClick,
  onDismiss,
  className = '',
}: ItemProps) {
  const interactive = !!onClick;
  return (
    <div
      className={`rf-item ${interactive ? 'rf-item--interactive' : ''} ${onDismiss ? 'rf-item--dismissible' : ''} ${className}`}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {icon && (
        <span className={`rf-item__icon rf-item__icon--${iconTone}`}>
          {icon}
        </span>
      )}
      <div className="rf-item__body">
        <div className="rf-item__title">{title}</div>
        {description && <div className="rf-item__description">{description}</div>}
      </div>
      {action && <div className="rf-item__action">{action}</div>}
      {onDismiss && (
        <button
          type="button"
          className="rf-item__dismiss"
          onClick={(e: MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); onDismiss(); }}
          aria-label="Dismiss"
        >
          <X size={12} weight="bold" />
        </button>
      )}
    </div>
  );
}
