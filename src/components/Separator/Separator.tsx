import './Separator.css';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  className?: string;
}

export function Separator({ orientation = 'horizontal', decorative = true, className = '' }: SeparatorProps) {
  return (
    <div
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={`rf-separator rf-separator--${orientation} ${className}`}
    />
  );
}
