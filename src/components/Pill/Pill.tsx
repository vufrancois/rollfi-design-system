import { type ReactNode } from 'react';
import './Pill.css';

type PillTone = 'brand' | 'dark' | 'outline';
type PillSize = 'md' | 'sm';

interface PillProps {
  tone?: PillTone;
  size?: PillSize;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  as?: 'span' | 'a' | 'button';
  href?: string;
  onClick?: () => void;
}

export function Pill({
  tone = 'brand', size = 'md', icon, children, className = '',
  as = 'span', href, onClick,
}: PillProps) {
  const Tag = as as 'span';
  const props: Record<string, unknown> = { className: `rf-pill rf-pill--${tone} rf-pill--${size} ${className}` };
  if (as === 'a') props.href = href;
  if (as === 'button') props.type = 'button';
  if (onClick) props.onClick = onClick;
  return (
    <Tag {...props}>
      {icon && size === 'md' && <span className="rf-pill__chip">{icon}</span>}
      <span className="rf-pill__label">{children}</span>
    </Tag>
  );
}
