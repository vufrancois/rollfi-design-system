import { type ReactNode } from 'react';
import './IconTile.css';

type IconTileVariant = 'neutral' | 'success' | 'danger' | 'warning' | 'info' | 'teal' | 'purple' | 'orange';
type IconTileSize = 'sm' | 'md' | 'lg' | 'xl';
type IconTileShape = 'square' | 'circle';

interface IconTileProps {
  variant?: IconTileVariant;
  size?: IconTileSize;
  shape?: IconTileShape;
  /**
   * Adds a `--rf-color-border` outline — same visual weight as a Button's border.
   * Use for decorative icon containers next to labels (e.g. section headers,
   * feature callouts, empty-state hints) that shouldn't read as interactive.
   */
  outlined?: boolean;
  children: ReactNode;
  className?: string;
}

export function IconTile({
  variant = 'neutral',
  size = 'md',
  shape = 'square',
  outlined = false,
  children,
  className = '',
}: IconTileProps) {
  return (
    <span
      className={`rf-icon-tile rf-icon-tile--${variant} rf-icon-tile--${size} rf-icon-tile--${shape} ${outlined ? 'rf-icon-tile--outlined' : ''} ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
