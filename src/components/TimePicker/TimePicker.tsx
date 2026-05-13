import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Clock } from '@phosphor-icons/react';
import './TimePicker.css';

interface TimePickerProps {
  label?: string;
  /** "HH:MM" in 24-hour format */
  value: string;
  onChange: (value: string) => void;
  /** Minute step (default 5) */
  step?: number;
  /** 12h with AM/PM or 24h */
  format?: '12h' | '24h';
  hint?: string;
  error?: string;
  disabled?: boolean;
}

function parse24(value: string): { h: number; m: number } {
  const [hStr, mStr] = (value || '').split(':');
  const h = Math.max(0, Math.min(23, parseInt(hStr, 10) || 0));
  const m = Math.max(0, Math.min(59, parseInt(mStr, 10) || 0));
  return { h, m };
}

function format24(h: number, m: number) {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function display(value: string, format: '12h' | '24h') {
  const { h, m } = parse24(value);
  if (format === '24h') return format24(h, m);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

export function TimePicker({
  label, value, onChange, step = 5, format = '12h', hint, error, disabled,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const hourColRef = useRef<HTMLDivElement>(null);
  const minuteColRef = useRef<HTMLDivElement>(null);
  const periodColRef = useRef<HTMLDivElement>(null);

  const { h, m } = parse24(value);
  const period: 'AM' | 'PM' = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;

  const hours = format === '24h'
    ? Array.from({ length: 24 }, (_, i) => i)
    : Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: Math.floor(60 / step) }, (_, i) => i * step);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    const scrollToActive = (col: HTMLDivElement | null) => {
      const active = col?.querySelector<HTMLElement>('.rf-timepicker__cell--active');
      if (active && col) col.scrollTop = active.offsetTop - col.clientHeight / 2 + active.clientHeight / 2;
    };
    requestAnimationFrame(() => {
      scrollToActive(hourColRef.current);
      scrollToActive(minuteColRef.current);
      scrollToActive(periodColRef.current);
    });
  }, [open]);

  const setHour = (newH: number) => {
    if (format === '24h') onChange(format24(newH, m));
    else {
      const real = period === 'AM'
        ? (newH === 12 ? 0 : newH)
        : (newH === 12 ? 12 : newH + 12);
      onChange(format24(real, m));
    }
  };

  const setMinute = (newM: number) => onChange(format24(h, newM));

  const setPeriod = (p: 'AM' | 'PM') => {
    let newH = h;
    if (p === 'AM' && h >= 12) newH = h - 12;
    if (p === 'PM' && h < 12) newH = h + 12;
    onChange(format24(newH, m));
  };

  return (
    <div className={`rf-timepicker-wrap ${error ? 'rf-timepicker-wrap--error' : ''}`} ref={wrapRef}>
      {label && <label className="rf-timepicker__label">{label}</label>}
      <button
        type="button"
        className="rf-timepicker__trigger"
        onClick={() => !disabled && setOpen(o => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Clock size={16} className="rf-timepicker__icon" />
        <span className="rf-timepicker__value">{display(value, format)}</span>
      </button>
      {open && (
        <div className="rf-timepicker__panel" role="dialog">
          <div className="rf-timepicker__columns">
            <div ref={hourColRef} className="rf-timepicker__col">
              {hours.map(hr => {
                const active = format === '24h' ? hr === h : hr === h12;
                return (
                  <button
                    key={hr}
                    type="button"
                    className={`rf-timepicker__cell ${active ? 'rf-timepicker__cell--active' : ''}`}
                    onClick={() => setHour(hr)}
                  >
                    {String(hr).padStart(2, '0')}
                  </button>
                );
              })}
            </div>
            <div ref={minuteColRef} className="rf-timepicker__col">
              {minutes.map(mn => (
                <button
                  key={mn}
                  type="button"
                  className={`rf-timepicker__cell ${mn === m ? 'rf-timepicker__cell--active' : ''}`}
                  onClick={() => setMinute(mn)}
                >
                  {String(mn).padStart(2, '0')}
                </button>
              ))}
            </div>
            {format === '12h' && (
              <div ref={periodColRef} className="rf-timepicker__col rf-timepicker__col--period">
                {(['AM', 'PM'] as const).map(p => (
                  <button
                    key={p}
                    type="button"
                    className={`rf-timepicker__cell ${p === period ? 'rf-timepicker__cell--active' : ''}`}
                    onClick={() => setPeriod(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {error ? <span className="rf-timepicker__error">{error}</span> : hint ? <span className="rf-timepicker__hint">{hint}</span> : null}
    </div>
  );
}
