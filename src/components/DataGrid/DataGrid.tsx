import { type ReactNode } from 'react';
import './DataGrid.css';

interface DataGridItem {
  label: ReactNode;
  value: ReactNode;
}

interface DataGridProps {
  items: DataGridItem[];
  /** Visual rhythm — gap between items */
  gap?: 'sm' | 'md' | 'lg';
  /** Override column count. Default flows naturally with flex-wrap. */
  columns?: number;
  className?: string;
}

export function DataGrid({ items, gap = 'md', columns, className = '' }: DataGridProps) {
  const style = columns
    ? { display: 'grid', gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
    : undefined;
  return (
    <div className={`rf-data-grid rf-data-grid--${gap} ${className}`} style={style}>
      {items.map((item, i) => (
        <div key={i} className="rf-data-grid__item">
          <div className="rf-data-grid__label">{item.label}</div>
          <div className="rf-data-grid__value">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
