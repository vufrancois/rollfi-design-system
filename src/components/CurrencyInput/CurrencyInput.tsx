import { type InputHTMLAttributes, forwardRef } from 'react';
import { Input } from '../Input/Input';

interface CurrencyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  hint?: string;
  error?: string;
  currency?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ currency = '$', ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="text"
        inputMode="decimal"
        prefix={currency}
        {...props}
      />
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';
