import { type ReactNode } from 'react';
import './Checkbox.css';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  children?: ReactNode;
}

export function Checkbox({ checked, onChange, disabled, children }: CheckboxProps) {
  return (
    <label className={`rf-checkbox ${disabled ? 'rf-checkbox--disabled' : ''}`}>
      <div
        className={`rf-checkbox__box ${checked ? 'rf-checkbox__box--checked' : ''}`}
        onClick={disabled ? undefined : onChange}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={0}
        onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!disabled) onChange(); } }}
      >
        {checked && (
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden="true">
            <path d="M1 4L4.5 7.5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {children && <span className="rf-checkbox__label">{children}</span>}
    </label>
  );
}
