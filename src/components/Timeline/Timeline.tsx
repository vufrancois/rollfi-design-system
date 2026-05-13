import { type ReactNode } from 'react';
import './Timeline.css';

interface TimelineItem {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  timestamp?: ReactNode;
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  icon?: ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="rf-timeline">
      {items.map((item, i) => (
        <li key={item.id} className={`rf-timeline__item rf-timeline__item--${item.variant ?? 'neutral'}`}>
          <span className="rf-timeline__marker" aria-hidden="true">
            {item.icon ?? <span className="rf-timeline__dot" />}
          </span>
          {i < items.length - 1 && <span className="rf-timeline__line" aria-hidden="true" />}
          <div className="rf-timeline__content">
            <div className="rf-timeline__title">{item.title}</div>
            {item.description && <div className="rf-timeline__description">{item.description}</div>}
            {item.timestamp && <div className="rf-timeline__timestamp">{item.timestamp}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
