import { forwardRef } from 'react';
import './PhoneInput.css';

interface PhoneInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  onCountryChange: (code: string) => void;
  hint?: string;
  error?: string;
  disabled?: boolean;
  countryCodes?: { value: string; label: string }[];
}

const defaultCountryCodes = [
  { value: '+1', label: '+1 (US)' },
  { value: '+44', label: '+44 (UK)' },
  { value: '+33', label: '+33 (FR)' },
  { value: '+49', label: '+49 (DE)' },
  { value: '+81', label: '+81 (JP)' },
  { value: '+86', label: '+86 (CN)' },
  { value: '+91', label: '+91 (IN)' },
];

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label, value, onChange, countryCode, onCountryChange, hint, error, disabled, countryCodes = defaultCountryCodes }, ref) => {
    return (
      <div className={`rf-phone-input ${error ? 'rf-phone-input--error' : ''} ${disabled ? 'rf-phone-input--disabled' : ''}`}>
        {label && <label className="rf-phone-input__label">{label}</label>}
        <div className="rf-phone-input__container">
          <select
            className="rf-phone-input__code"
            value={countryCode}
            onChange={e => onCountryChange(e.target.value)}
            disabled={disabled}
            aria-label="Country code"
          >
            {countryCodes.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <div className="rf-phone-input__divider" />
          <input
            ref={ref}
            type="tel"
            className="rf-phone-input__input"
            value={value}
            onChange={e => onChange(e.target.value)}
            disabled={disabled}
            placeholder="(555) 123-4567"
          />
        </div>
        {(hint || error) && (
          <span className={`rf-phone-input__hint ${error ? 'rf-phone-input__hint--error' : ''}`}>
            {error || hint}
          </span>
        )}
      </div>
    );
  }
);
