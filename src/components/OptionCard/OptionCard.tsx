import { type ReactNode } from 'react';
import './OptionCard.css';

interface OptionCardProps {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description?: string;
  badge?: ReactNode;
  disabled?: boolean;
}

export function OptionCard({ selected, onSelect, title, description, badge, disabled }: OptionCardProps) {
  return (
    <button
      type="button"
      className={`rf-option-card ${selected ? 'rf-option-card--selected' : ''} ${disabled ? 'rf-option-card--disabled' : ''}`}
      onClick={disabled ? undefined : onSelect}
      aria-pressed={selected}
      disabled={disabled}
    >
      <div className={`rf-option-card__radio ${selected ? 'rf-option-card__radio--selected' : ''}`}>
        {selected && <div className="rf-option-card__radio-dot" />}
      </div>
      <div className="rf-option-card__content">
        <div className="rf-option-card__header">
          <span className="rf-option-card__title">{title}</span>
          {badge && <span className="rf-option-card__badge">{badge}</span>}
        </div>
        {description && <span className="rf-option-card__description">{description}</span>}
      </div>
    </button>
  );
}
