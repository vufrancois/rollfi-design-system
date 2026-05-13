import { type ReactNode } from 'react';
import './Switch.css';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
}

export function Switch({ checked, onChange, label, disabled }: SwitchProps) {
  return (
    <label className={`rf-switch ${disabled ? 'rf-switch--disabled' : ''}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        disabled={disabled}
        className={`rf-switch__track ${checked ? 'rf-switch__track--on' : ''}`}
        onClick={() => !disabled && onChange(!checked)}
      >
        <span className="rf-switch__thumb" />
      </button>
      {label && <span className="rf-switch__label">{label}</span>}
    </label>
  );
}
