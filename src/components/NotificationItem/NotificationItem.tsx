import { type ReactNode } from 'react';
import './NotificationItem.css';

interface NotificationItemProps {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  timestamp?: ReactNode;
  read?: boolean;
  actions?: ReactNode;
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  onClick?: () => void;
}

export function NotificationItem({
  icon, title, description, timestamp, read, actions, variant = 'neutral', onClick,
}: NotificationItemProps) {
  return (
    <div
      className={`rf-notif rf-notif--${variant} ${!read ? 'rf-notif--unread' : ''} ${onClick ? 'rf-notif--clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {icon && <span className="rf-notif__icon">{icon}</span>}
      <div className="rf-notif__body">
        <div className="rf-notif__title">{title}</div>
        {description && <div className="rf-notif__description">{description}</div>}
        {timestamp && <div className="rf-notif__timestamp">{timestamp}</div>}
      </div>
      {actions && <div className="rf-notif__actions">{actions}</div>}
    </div>
  );
}
