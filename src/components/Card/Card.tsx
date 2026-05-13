import { type HTMLAttributes, type ReactNode } from 'react';
import './Card.css';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'interactive';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Card({ variant = 'default', padding = 'md', children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`rf-card rf-card--${variant} rf-card--pad-${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function CardHeader({ title, description, action }: CardHeaderProps) {
  return (
    <div className="rf-card__header">
      <div className="rf-card__header-text">
        <h3 className="rf-card__title">{title}</h3>
        {description && <p className="rf-card__description">{description}</p>}
      </div>
      {action && <div className="rf-card__header-action">{action}</div>}
    </div>
  );
}

export function CardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rf-card__footer ${className}`}>{children}</div>;
}
