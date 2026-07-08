import { type ReactNode } from 'react';
import { Button } from '../Button/Button';
import './PayrollCard.css';

export interface PayrollCardStat {
  label: string;
  value: ReactNode;
  /** Bumps the value's weight to 700 to emphasize this datum. Common for the primary date. */
  emphasized?: boolean;
}

interface PayrollCardProps {
  title: string;
  /**
   * Top-right accessory. Common patterns:
   *   - `<Badge variant="warning">Upcoming</Badge>` for a small status pill
   *   - `<span className="rf-payroll-card__amount">$3,247.86</span>` for a large total
   * Anything else that fits the grid also works.
   */
  trailing?: ReactNode;
  /** Two- or three-datum stat grid rendered under the title row. */
  stats: PayrollCardStat[];
  action?: {
    label: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  };
  className?: string;
}

export function PayrollCard({
  title,
  trailing,
  stats,
  action,
  className = '',
}: PayrollCardProps) {
  return (
    <div className={`rf-payroll-card ${className}`}>
      <div className="rf-payroll-card__header">
        <h3 className="rf-payroll-card__title">{title}</h3>
        {trailing && <div className="rf-payroll-card__trailing">{trailing}</div>}
      </div>
      <div
        className="rf-payroll-card__stats"
        style={{ gridTemplateColumns: `repeat(${Math.max(stats.length, 1)}, minmax(0, 1fr))` }}
      >
        {stats.map((s, i) => (
          <div key={`${s.label}-${i}`} className="rf-payroll-card__stat">
            <div className="rf-payroll-card__stat-label">{s.label}</div>
            <div
              className={`rf-payroll-card__stat-value ${s.emphasized ? 'rf-payroll-card__stat-value--emphasized' : ''}`}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>
      {action && (
        <Button
          variant={action.variant ?? 'secondary'}
          onClick={action.onClick}
          fullWidth
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
