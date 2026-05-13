import { type ReactNode } from 'react';
import './Field.css';

interface FieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export function Field({ label, required, hint, error, children }: FieldProps) {
  return (
    <div className={`rf-field ${error ? 'rf-field--error' : ''}`}>
      <label className="rf-field__label">
        {label}
        {required && <span className="rf-field__required" aria-label="required">*</span>}
      </label>
      <div className="rf-field__control">{children}</div>
      {error ? (
        <span className="rf-field__error" role="alert">{error}</span>
      ) : hint ? (
        <span className="rf-field__hint">{hint}</span>
      ) : null}
    </div>
  );
}
