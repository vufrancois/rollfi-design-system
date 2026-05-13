import { type ReactNode } from 'react';
import './IconTile.css';

type IconTileVariant = 'neutral' | 'success' | 'danger' | 'warning' | 'info' | 'teal' | 'purple' | 'orange';
type IconTileSize = 'sm' | 'md' | 'lg';
type IconTileShape = 'square' | 'circle';

interface IconTileProps {
  variant?: IconTileVariant;
  size?: IconTileSize;
  shape?: IconTileShape;
  children: ReactNode;
  className?: string;
}

export function IconTile({
  variant = 'neutral',
  size = 'md',
  shape = 'square',
  children,
  className = '',
}: IconTileProps) {
  return (
    <span
      className={`rf-icon-tile rf-icon-tile--${variant} rf-icon-tile--${size} rf-icon-tile--${shape} ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
