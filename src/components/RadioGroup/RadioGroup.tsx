import { type ReactNode, createContext, useContext } from 'react';
import './RadioGroup.css';

interface RadioGroupContextValue {
  value: string;
  onChange: (value: string) => void;
  name: string;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  children: ReactNode;
}

let uid = 0;

export function RadioGroup({ value, onChange, name, disabled, orientation = 'vertical', children }: RadioGroupProps) {
  const groupName = name || `rf-radio-group-${++uid}`;
  return (
    <RadioGroupContext.Provider value={{ value, onChange, name: groupName, disabled }}>
      <div className={`rf-radio-group rf-radio-group--${orientation}`} role="radiogroup">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

interface RadioProps {
  value: string;
  children?: ReactNode;
  disabled?: boolean;
}

export function Radio({ value, children, disabled }: RadioProps) {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) return null;
  const isDisabled = disabled ?? ctx.disabled;
  const checked = ctx.value === value;
  return (
    <label className={`rf-radio ${isDisabled ? 'rf-radio--disabled' : ''}`}>
      <input
        type="radio"
        name={ctx.name}
        value={value}
        checked={checked}
        disabled={isDisabled}
        onChange={() => ctx.onChange(value)}
        className="rf-radio__input"
      />
      <span className={`rf-radio__circle ${checked ? 'rf-radio__circle--checked' : ''}`}>
        {checked && <span className="rf-radio__dot" />}
      </span>
      {children && <span className="rf-radio__label">{children}</span>}
    </label>
  );
}
