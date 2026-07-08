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
  /** Number for currency / percent / count formatting in the legend and inline labels. */
  format?: (value: number) => string;
  /** Bar height (default 10px, or 28px when `inlineLabels` is on). */
  height?: number;
  /** Show the legend below the bar. */
  showLegend?: boolean;
  /** Render each segment's formatted value inside the bar. Auto-hides in segments narrower than ~40px. */
  inlineLabels?: boolean;
  /** Append `(NN%)` to each legend value. */
  showPercent?: boolean;
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
  segments,
  total,
  format,
  height,
  showLegend = true,
  inlineLabels = false,
  showPercent = false,
  className = '',
}: StackedBarProps) {
  const visible = segments.filter(s => s.value > 0);
  const sum = total ?? visible.reduce((acc, s) => acc + s.value, 0);
  const fmt = format ?? ((v: number) => v.toLocaleString());
  const trackHeight = height ?? (inlineLabels ? 28 : 10);

  return (
    <div className={`rf-stacked-bar ${inlineLabels ? 'rf-stacked-bar--inline-labels' : ''} ${className}`}>
      <div className="rf-stacked-bar__track" style={{ height: trackHeight }} role="img" aria-label="Distribution">
        {visible.map((s, i) => {
          const color = s.color ?? DEFAULT_PALETTE[i % DEFAULT_PALETTE.length];
          const pct = (s.value / sum) * 100;
          return (
            <span
              key={i}
              className="rf-stacked-bar__segment"
              style={{ width: `${pct}%`, background: color }}
              title={`${typeof s.label === 'string' ? s.label : ''}: ${fmt(s.value)}`}
            >
              {inlineLabels && (
                <span className="rf-stacked-bar__segment-label">{fmt(s.value)}</span>
              )}
            </span>
          );
        })}
      </div>
      {showLegend && (
        <div className="rf-stacked-bar__legend">
          {visible.map((s, i) => {
            const color = s.color ?? DEFAULT_PALETTE[i % DEFAULT_PALETTE.length];
            const pct = (s.value / sum) * 100;
            return (
              <div key={i} className="rf-stacked-bar__legend-item">
                <span className="rf-stacked-bar__swatch" style={{ background: color }} />
                <span className="rf-stacked-bar__legend-label">{s.label}</span>
                <span className="rf-stacked-bar__legend-value">
                  {fmt(s.value)}
                  {showPercent && <span className="rf-stacked-bar__legend-pct"> ({Math.round(pct)}%)</span>}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
