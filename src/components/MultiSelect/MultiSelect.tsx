import { useEffect, useRef, useState } from 'react';
import './MultiSelect.css';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label?: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: Option[];
  placeholder?: string;
  hint?: string;
}

export function MultiSelect({ label, values, onChange, options, placeholder = 'Select...', hint }: MultiSelectProps) {
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

  const toggle = (v: string) => {
    onChange(values.includes(v) ? values.filter(x => x !== v) : [...values, v]);
  };

  const selected = options.filter(o => values.includes(o.value));

  return (
    <div className="rf-multiselect-wrap">
      {label && <label className="rf-multiselect__label">{label}</label>}
      <div ref={ref} className="rf-multiselect">
        <button
          type="button"
          className="rf-multiselect__control"
          onClick={() => setOpen(o => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="rf-multiselect__values">
            {selected.length === 0 ? (
              <span className="rf-multiselect__placeholder">{placeholder}</span>
            ) : (
              selected.map(s => (
                <span key={s.value} className="rf-multiselect__chip">
                  {s.label}
                  <span
                    className="rf-multiselect__chip-x"
                    onClick={e => { e.stopPropagation(); toggle(s.value); }}
                    aria-label={`Remove ${s.label}`}
                  >
                    ×
                  </span>
                </span>
              ))
            )}
          </span>
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open && (
          <div className="rf-multiselect__menu" role="listbox">
            {options.map(opt => (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={values.includes(opt.value)}
                className={`rf-multiselect__option ${values.includes(opt.value) ? 'rf-multiselect__option--selected' : ''}`}
                onClick={() => toggle(opt.value)}
              >
                <span className="rf-multiselect__check">
                  {values.includes(opt.value) && (
                    <svg width="10" height="10" viewBox="0 0 12 9" fill="none" aria-hidden="true">
                      <path d="M1 4L4.5 7.5L11 1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {hint && <span className="rf-multiselect__hint">{hint}</span>}
    </div>
  );
}
