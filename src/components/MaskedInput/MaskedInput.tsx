import { type InputHTMLAttributes, forwardRef, useCallback } from 'react';
import { Input } from '../Input/Input';

interface MaskedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string;
  hint?: string;
  error?: string;
  /** Mask pattern: `#` for digit, `A` for letter, anything else literal. e.g. "###-##-####" for SSN */
  mask: string;
  value: string;
  onChange: (value: string) => void;
}

function applyMask(raw: string, mask: string): string {
  let out = '';
  let ri = 0;
  for (let mi = 0; mi < mask.length && ri < raw.length; mi++) {
    const m = mask[mi];
    const c = raw[ri];
    if (m === '#') {
      if (/\d/.test(c)) { out += c; ri++; }
      else { ri++; mi--; }
    } else if (m === 'A') {
      if (/[a-zA-Z]/.test(c)) { out += c; ri++; }
      else { ri++; mi--; }
    } else {
      out += m;
      if (c === m) ri++;
    }
  }
  return out;
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, value, onChange, ...props }, ref) => {
    const handle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(applyMask(e.target.value, mask));
    }, [mask, onChange]);

    return (
      <Input
        ref={ref}
        type="text"
        value={value}
        onChange={handle}
        placeholder={props.placeholder || mask.replace(/#/g, '0').replace(/A/g, 'A')}
        {...props}
      />
    );
  }
);

MaskedInput.displayName = 'MaskedInput';
