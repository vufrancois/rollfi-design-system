import { type ReactNode } from 'react';
import './PageHeader.css';

interface PageHeaderProps {
  /**
   * Small uppercase kicker rendered above the title (e.g. `Step 1 of 6`,
   * `Beta`, `New`). Rendered in `--rf-color-brand-text` with wider tracking.
   */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ eyebrow, title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="rf-page-header">
      <div className="rf-page-header__text">
        {eyebrow && <div className="rf-page-header__eyebrow">{eyebrow}</div>}
        <h1 className="rf-page-header__title">{title}</h1>
        {subtitle && <p className="rf-page-header__subtitle">{subtitle}</p>}
      </div>
      {action && <div className="rf-page-header__action">{action}</div>}
    </div>
  );
}
