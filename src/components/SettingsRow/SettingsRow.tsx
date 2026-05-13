import { type ReactNode } from 'react';
import './SettingsRow.css';

interface SettingsRowProps {
  title: ReactNode;
  description?: ReactNode;
  /** Right-side control (Switch, Button, Badge, etc.) */
  control: ReactNode;
  icon?: ReactNode;
  /** Visual emphasis when the row is in an active/enabled state */
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SettingsRow({ title, description, control, icon, active, onClick, className = '' }: SettingsRowProps) {
  return (
    <div
      className={`rf-settings-row ${active ? 'rf-settings-row--active' : ''} ${onClick ? 'rf-settings-row--interactive' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {icon && <span className="rf-settings-row__icon">{icon}</span>}
      <div className="rf-settings-row__body">
        <div className="rf-settings-row__title">{title}</div>
        {description && <div className="rf-settings-row__description">{description}</div>}
      </div>
      <div className="rf-settings-row__control" onClick={e => e.stopPropagation()}>{control}</div>
    </div>
  );
}
