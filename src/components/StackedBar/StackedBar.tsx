import { type ReactNode } from 'react';
import './StackedBar.css';

interface StackedBarSegment {
  label: ReactNode;
  value: number;
  /** Token variable name (without `var()`) OR raw color. Defaults rotate through semantic accent tokens. */
  color?: string;
}

interface StackedBarProps {
  segments: StackedBarSegment[];
  /** Override the total. Defaults to sum of segment values. */
  total?: number;
  /** Number for currency / percent / count formatting in the legend. */
  format?: (value: number) => string;
  /** Bar height (default 10px). */
  height?: number;
  /** Show the legend below the bar. */
  showLegend?: boolean;
  className?: string;
}

const DEFAULT_PALETTE = [
  'var(--rf-color-success)',
  'var(--rf-color-accent-teal)',
  'var(--rf-color-info)',
  'var(--rf-color-warning)',
  'var(--rf-color-accent-purple)',
  'var(--rf-color-accent-orange)',
  'var(--rf-color-text-tertiary)',
];

export function StackedBar({
  segments, total, format, height = 10, showLegend = true, className = '',
}: StackedBarProps) {
  const visible = segments.filter(s => s.value > 0);
  const sum = total ?? visible.reduce((acc, s) => acc + s.value, 0);
  const fmt = format ?? ((v: number) => v.toLocaleString());

  return (
    <div className={`rf-stacked-bar ${className}`}>
      <div className="rf-stacked-bar__track" style={{ height }} role="img" aria-label="Distribution">
        {visible.map((s, i) => {
          const color = s.color ?? DEFAULT_PALETTE[i % DEFAULT_PALETTE.length];
          const pct = (s.value / sum) * 100;
          return (
            <span
              key={i}
              className="rf-stacked-bar__segment"
              style={{ width: `${pct}%`, background: color }}
              title={`${typeof s.label === 'string' ? s.label : ''}: ${fmt(s.value)}`}
            />
          );
        })}
      </div>
      {showLegend && (
        <div className="rf-stacked-bar__legend">
          {visible.map((s, i) => {
            const color = s.color ?? DEFAULT_PALETTE[i % DEFAULT_PALETTE.length];
            return (
              <div key={i} className="rf-stacked-bar__legend-item">
                <span className="rf-stacked-bar__swatch" style={{ background: color }} />
                <span className="rf-stacked-bar__legend-label">{s.label}</span>
                <span className="rf-stacked-bar__legend-value">{fmt(s.value)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
