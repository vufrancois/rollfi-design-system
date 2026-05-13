import { type TextareaHTMLAttributes, forwardRef } from 'react';
import './Textarea.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className = '', id, rows = 4, ...props }, ref) => {
    const taId = id || (label ? `rf-textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    return (
      <div className={`rf-textarea-wrap ${error ? 'rf-textarea-wrap--error' : ''} ${className}`}>
        {label && (
          <label className="rf-textarea-label" htmlFor={taId}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={taId}
          rows={rows}
          className="rf-textarea"
          aria-invalid={!!error}
          {...props}
        />
        {error && <span className="rf-textarea-error" role="alert">{error}</span>}
        {!error && hint && <span className="rf-textarea-hint">{hint}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
