import './Slider.css';

interface SliderProps {
  label?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  format?: (v: number) => string;
  hint?: string;
  showMinMax?: boolean;
}

export function Slider({ label, value, min, max, step = 1, onChange, format, hint, showMinMax }: SliderProps) {
  const display = format ? format(value) : String(value);
  return (
    <div className="rf-slider">
      {(label || display) && (
        <div className="rf-slider__header">
          {label && <span className="rf-slider__label">{label}</span>}
          <span className="rf-slider__value">{display}</span>
        </div>
      )}
      <input
        type="range"
        className="rf-slider__input"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={e => onChange(Number(e.target.value))}
      />
      {showMinMax && (
        <div className="rf-slider__range">
          <span>{format ? format(min) : min}</span>
          <span>{format ? format(max) : max}</span>
        </div>
      )}
      {hint && <span className="rf-slider__hint">{hint}</span>}
    </div>
  );
}
