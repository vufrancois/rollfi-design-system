import { type ReactNode } from 'react';
import './StatCard.css';

interface StatCardProps {
  label: ReactNode;
  /** Convenience: render a large display number. For custom content (e.g. a selector or trend), use `children`. */
  value?: ReactNode;
  helper?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function StatCard({ label, value, helper, children, className = '' }: StatCardProps) {
  return (
    <div className={`rf-stat-card ${className}`}>
      <div className="rf-stat-card__label">{label}</div>
      {children ? (
        <div className="rf-stat-card__custom">{children}</div>
      ) : value !== undefined ? (
        <div className="rf-stat-card__value">{value}</div>
      ) : null}
      {helper && <div className="rf-stat-card__helper">{helper}</div>}
    </div>
  );
}
