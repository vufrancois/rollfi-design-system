import { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon } from '@phosphor-icons/react';
import { Calendar } from '../Calendar/Calendar';
import './DatePicker.css';

interface DatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  hint?: string;
  error?: string;
  placeholder?: string;
  min?: Date;
  max?: Date;
  format?: (date: Date) => string;
}

function fmtDefault(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function DatePicker({
  label, value, onChange, hint, error, placeholder = 'Pick a date', min, max, format = fmtDefault,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [open]);

  return (
    <div className={`rf-datepicker-wrap ${error ? 'rf-datepicker-wrap--error' : ''}`} ref={ref}>
      {label && <label className="rf-datepicker__label">{label}</label>}
      <button
        type="button"
        className="rf-datepicker__trigger"
        onClick={() => setOpen(o => !o)}
      >
        <CalendarIcon size={16} />
        <span className={value ? 'rf-datepicker__value' : 'rf-datepicker__placeholder'}>
          {value ? format(value) : placeholder}
        </span>
      </button>
      {open && (
        <div className="rf-datepicker__popover">
          <Calendar
            value={value}
            min={min}
            max={max}
            onChange={d => { onChange(d); setOpen(false); }}
          />
        </div>
      )}
      {error ? <span className="rf-datepicker__error">{error}</span> : hint ? <span className="rf-datepicker__hint">{hint}</span> : null}
    </div>
  );
}
