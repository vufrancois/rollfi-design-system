import { type ReactNode } from 'react';
import './DetailCard.css';

export interface DetailCardItem {
  label: string;
  value: ReactNode;
  /** Renders the value as `••••••••`. Useful for SSN, account numbers, passwords. */
  masked?: boolean;
  /**
   * Right-side per-row slot — typically an "Edit" `Button`. Only rendered when
   * `layout="list"` (grid layout has no per-row action slot).
   */
  action?: ReactNode;
}

type DetailCardLayout = 'grid' | 'list';

interface DetailCardProps {
  title: string;
  /** Optional pill next to the title (e.g. `W-4`, `State`, `Primary`). */
  badge?: ReactNode;
  /** Right-side header slot — typically an `Edit` `Button` or a `DropdownMenu`. */
  action?: ReactNode;
  items: DetailCardItem[];
  /**
   * `grid` (default) — 2 (or `columns`) equal columns of stacked mini-fields. Best
   * for read-only review pages with many small facts.
   *
   * `list` — full-width vertical rows separated by hairline dividers, with an
   * optional per-row action on the right. Best for editable settings (Account &
   * Security, Notifications).
   */
  layout?: DetailCardLayout;
  /** Grid column count when `layout="grid"`. Default 2. */
  columns?: 1 | 2 | 3;
  /** Footer line, e.g. `Last updated: May 15, 2026`. */
  footer?: ReactNode;
  className?: string;
}

export function DetailCard({
  title,
  badge,
  action,
  items,
  layout = 'grid',
  columns = 2,
  footer,
  className = '',
}: DetailCardProps) {
  return (
    <div className={`rf-detail-card rf-detail-card--${layout} ${className}`}>
      <div className="rf-detail-card__header">
        <div className="rf-detail-card__title-group">
          <h3 className="rf-detail-card__title">{title}</h3>
          {badge && <span className="rf-detail-card__badge">{badge}</span>}
        </div>
        {action && <div className="rf-detail-card__action">{action}</div>}
      </div>

      {layout === 'grid' ? (
        <div
          className="rf-detail-card__grid"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {items.map((it, i) => (
            <div key={`${it.label}-${i}`} className="rf-detail-card__row">
              <span className="rf-detail-card__label">{it.label}</span>
              <span className="rf-detail-card__value">
                {it.masked ? '••••••••' : it.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="rf-detail-card__list">
          {items.map((it, i) => (
            <div key={`${it.label}-${i}`} className="rf-detail-card__list-row">
              <div className="rf-detail-card__row">
                <span className="rf-detail-card__label">{it.label}</span>
                <span className="rf-detail-card__value">
                  {it.masked ? '••••••••' : it.value}
                </span>
              </div>
              {it.action && <div className="rf-detail-card__row-action">{it.action}</div>}
            </div>
          ))}
        </div>
      )}

      {footer && <div className="rf-detail-card__footer">{footer}</div>}
    </div>
  );
}
