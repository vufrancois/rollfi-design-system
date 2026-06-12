import { type ReactNode } from 'react';
import './DetailRow.css';

type DetailRowLayout = 'inline' | 'stacked';

interface DetailRowProps {
  label: ReactNode;
  value: ReactNode;
  masked?: boolean;
  /**
   * `inline` (default) — label left, value right-aligned on the same baseline.
   * Best for traditional key/value lists inside forms or side panels.
   *
   * `stacked` — label on top, value directly underneath, left-aligned.
   * Best for "info card" layouts where each datum reads as a labelled stat.
   */
  layout?: DetailRowLayout;
  className?: string;
}

export function DetailRow({ label, value, masked, layout = 'inline', className = '' }: DetailRowProps) {
  return (
    <div className={`rf-detail-row rf-detail-row--${layout} ${className}`}>
      <span className="rf-detail-row__label">{label}</span>
      <span className="rf-detail-row__value">
        {masked ? '••••••••' : value}
      </span>
    </div>
  );
}
