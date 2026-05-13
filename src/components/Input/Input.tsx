import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';
import './Input.css';

type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  inputSize?: InputSize;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, icon, prefix, suffix, inputSize = 'md', className = '', id, ...props }, ref) => {
    const inputId = id || (label ? `rf-input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className={`rf-input-wrap rf-input-wrap--${inputSize} ${error ? 'rf-input-wrap--error' : ''} ${className}`}>
        {label && (
          <label className="rf-input-label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <div className="rf-input-field">
          {prefix && <span className="rf-input-prefix">{prefix}</span>}
          {icon && !prefix && <span className="rf-input-icon">{icon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={`rf-input ${icon && !prefix ? 'rf-input--has-icon' : ''} ${prefix ? 'rf-input--has-prefix' : ''} ${suffix ? 'rf-input--has-suffix' : ''}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {suffix && <span className="rf-input-suffix">{suffix}</span>}
        </div>
        {error && (
          <span className="rf-input-error" id={`${inputId}-error`} role="alert">
            {error}
          </span>
        )}
        {!error && hint && (
          <span className="rf-input-hint" id={`${inputId}-hint`}>
            {hint}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
