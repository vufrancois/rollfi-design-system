import './Progress.css';

type ProgressVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  label?: string;
  showValue?: boolean;
  format?: (value: number, max: number) => string;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  label,
  showValue,
  format,
  className = '',
}: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const display = format ? format(value, max) : `${Math.round(pct)}%`;
  return (
    <div className={`rf-progress rf-progress--${size} ${className}`}>
      {(label || showValue) && (
        <div className="rf-progress__header">
          {label && <span className="rf-progress__label">{label}</span>}
          {showValue && <span className="rf-progress__value">{display}</span>}
        </div>
      )}
      <div
        className={`rf-progress__track rf-progress__track--${variant}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div className="rf-progress__bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
