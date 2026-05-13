import './StatusDot.css';

type StatusDotVariant = 'neutral' | 'success' | 'danger' | 'warning' | 'info' | 'teal' | 'purple' | 'orange';

interface StatusDotProps {
  variant?: StatusDotVariant;
  pulse?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function StatusDot({ variant = 'neutral', pulse, size = 'md', className = '' }: StatusDotProps) {
  return (
    <span
      className={`rf-status-dot rf-status-dot--${variant} rf-status-dot--${size} ${pulse ? 'rf-status-dot--pulse' : ''} ${className}`}
      role="presentation"
      aria-hidden="true"
    />
  );
}
