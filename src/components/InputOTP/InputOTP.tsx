import { useRef, type KeyboardEvent, type ClipboardEvent } from 'react';
import './InputOTP.css';

interface InputOTPProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  label?: string;
  hint?: string;
  error?: string;
}

export function InputOTP({
  length = 6, value, onChange, onComplete, disabled, label, hint, error,
}: InputOTPProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const setChar = (i: number, char: string) => {
    const next = value.split('');
    next[i] = char;
    const joined = next.join('').slice(0, length);
    onChange(joined);
    if (joined.length === length) onComplete?.(joined);
  };

  const onCharChange = (i: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1);
    setChar(i, digit);
    if (digit && i < length - 1) refs.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      refs.current[i - 1]?.focus();
      setChar(i - 1, '');
    } else if (e.key === 'ArrowLeft' && i > 0) {
      refs.current[i - 1]?.focus();
    } else if (e.key === 'ArrowRight' && i < length - 1) {
      refs.current[i + 1]?.focus();
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!text) return;
    e.preventDefault();
    onChange(text);
    refs.current[Math.min(text.length, length - 1)]?.focus();
    if (text.length === length) onComplete?.(text);
  };

  return (
    <div className={`rf-otp-wrap ${error ? 'rf-otp-wrap--error' : ''}`}>
      {label && <label className="rf-otp__label">{label}</label>}
      <div className="rf-otp" role="group">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={el => { refs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[i] || ''}
            disabled={disabled}
            className="rf-otp__slot"
            onChange={e => onCharChange(i, e.target.value)}
            onKeyDown={e => onKeyDown(i, e)}
            onPaste={onPaste}
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>
      {error ? <span className="rf-otp__error">{error}</span> : hint ? <span className="rf-otp__hint">{hint}</span> : null}
    </div>
  );
}
