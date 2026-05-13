import { type ReactNode } from 'react';
import './Callout.css';

type CalloutVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

interface CalloutProps {
  variant?: CalloutVariant;
  icon?: ReactNode;
  title?: string;
  children: ReactNode;
}

export function Callout({ variant = 'neutral', icon, title, children }: CalloutProps) {
  return (
    <div className={`rf-callout rf-callout--${variant}`}>
      {icon && <span className="rf-callout__icon">{icon}</span>}
      <div className="rf-callout__body">
        {title && <div className="rf-callout__title">{title}</div>}
        <div className="rf-callout__content">{children}</div>
      </div>
    </div>
  );
}
