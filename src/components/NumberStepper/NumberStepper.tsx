import { Minus, Plus } from '@phosphor-icons/react';
import './NumberStepper.css';

interface NumberStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  hint?: string;
}

export function NumberStepper({ value, onChange, min, max, step = 1, disabled, label, hint }: NumberStepperProps) {
  const clamp = (n: number) => {
    if (min !== undefined && n < min) return min;
    if (max !== undefined && n > max) return max;
    return n;
  };
  const dec = () => onChange(clamp(value - step));
  const inc = () => onChange(clamp(value + step));
  const atMin = min !== undefined && value <= min;
  const atMax = max !== undefined && value >= max;

  return (
    <div className="rf-num-stepper-wrap">
      {label && <label className="rf-num-stepper__label">{label}</label>}
      <div className="rf-num-stepper">
        <button type="button" className="rf-num-stepper__btn" onClick={dec} disabled={disabled || atMin} aria-label="Decrease">
          <Minus size={14} />
        </button>
        <input
          type="number"
          className="rf-num-stepper__input"
          value={value}
          step={step}
          min={min}
          max={max}
          disabled={disabled}
          onChange={e => onChange(clamp(Number(e.target.value)))}
        />
        <button type="button" className="rf-num-stepper__btn" onClick={inc} disabled={disabled || atMax} aria-label="Increase">
          <Plus size={14} />
        </button>
      </div>
      {hint && <span className="rf-num-stepper__hint">{hint}</span>}
    </div>
  );
}
