import { type InputHTMLAttributes, forwardRef, useState } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { Input } from '../Input/Input';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  hint?: string;
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);
    return (
      <Input
        ref={ref}
        {...props}
        type={visible ? 'text' : 'password'}
        suffix={
          <button
            type="button"
            onClick={() => setVisible(v => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', padding: 0, color: 'inherit', pointerEvents: 'auto' }}
          >
            {visible ? <EyeSlash size={16} /> : <Eye size={16} />}
          </button>
        }
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
