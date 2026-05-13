import { type ReactNode } from 'react';
import './SegmentedControl.css';

interface SegmentedItem {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface SegmentedControlProps {
  items: SegmentedItem[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
  fullWidth?: boolean;
}

export function SegmentedControl({ items, value, onChange, size = 'md', fullWidth }: SegmentedControlProps) {
  return (
    <div
      className={`rf-segmented rf-segmented--${size} ${fullWidth ? 'rf-segmented--full' : ''}`}
      role="radiogroup"
    >
      {items.map(item => (
        <button
          key={item.value}
          type="button"
          role="radio"
          aria-checked={value === item.value}
          className={`rf-segmented__item ${value === item.value ? 'rf-segmented__item--active' : ''}`}
          onClick={() => onChange(item.value)}
        >
          {item.icon && <span className="rf-segmented__icon">{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  );
}
