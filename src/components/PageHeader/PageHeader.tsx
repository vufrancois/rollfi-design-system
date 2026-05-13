import { type ReactNode } from 'react';
import './PageHeader.css';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="rf-page-header">
      <div className="rf-page-header__text">
        <h1 className="rf-page-header__title">{title}</h1>
        {subtitle && <p className="rf-page-header__subtitle">{subtitle}</p>}
      </div>
      {action && <div className="rf-page-header__action">{action}</div>}
    </div>
  );
}
