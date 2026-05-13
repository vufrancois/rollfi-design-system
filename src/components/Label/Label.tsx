import { type LabelHTMLAttributes } from 'react';
import './Label.css';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ required, children, className = '', ...props }: LabelProps) {
  return (
    <label className={`rf-label ${className}`} {...props}>
      {children}
      {required && <span className="rf-label__required" aria-label="required">*</span>}
    </label>
  );
}
