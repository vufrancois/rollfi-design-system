import { type SelectHTMLAttributes, forwardRef } from 'react';
import './Select.css';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

type SelectSize = 'sm' | 'md' | 'lg';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children' | 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  size?: SelectSize;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, options, placeholder, size = 'md', className = '', id, ...props }, ref) => {
    const selectId = id || (label ? `rf-select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className={`rf-select-wrap rf-select-wrap--${size} ${error ? 'rf-select-wrap--error' : ''} ${className}`}>
        {label && (
          <label className="rf-select-label" htmlFor={selectId}>
            {label}
          </label>
        )}
        <div className="rf-select-field">
          <select
            ref={ref}
            id={selectId}
            className="rf-select"
            aria-invalid={!!error}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map(opt => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="rf-select-chevron" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        {error && <span className="rf-select-error" role="alert">{error}</span>}
        {!error && hint && <span className="rf-select-hint">{hint}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
