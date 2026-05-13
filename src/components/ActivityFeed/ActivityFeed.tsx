import { type ReactNode } from 'react';
import { Avatar } from '../Avatar/Avatar';
import './ActivityFeed.css';

interface ActivityFeedItem {
  id: string;
  actorName: string;
  actorAvatar?: string;
  message: ReactNode;
  timestamp?: ReactNode;
  icon?: ReactNode;
}

interface ActivityFeedProps {
  items: ActivityFeedItem[];
  title?: ReactNode;
  action?: ReactNode;
}

export function ActivityFeed({ items, title, action }: ActivityFeedProps) {
  return (
    <div className="rf-activity-feed">
      {(title || action) && (
        <div className="rf-activity-feed__header">
          {title && <span className="rf-activity-feed__title">{title}</span>}
          {action && <div className="rf-activity-feed__action">{action}</div>}
        </div>
      )}
      <ul className="rf-activity-feed__list">
        {items.map(item => (
          <li key={item.id} className="rf-activity-feed__item">
            <Avatar name={item.actorName} src={item.actorAvatar} size="sm" />
            <div className="rf-activity-feed__body">
              <div className="rf-activity-feed__message">
                <strong>{item.actorName}</strong> {item.message}
              </div>
              {item.timestamp && <div className="rf-activity-feed__time">{item.timestamp}</div>}
            </div>
            {item.icon && <span className="rf-activity-feed__icon">{item.icon}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
