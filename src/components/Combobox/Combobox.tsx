import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlass, Check, CaretDown } from '@phosphor-icons/react';
import './Combobox.css';

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  label?: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
}

export function Combobox({
  label, hint, value, onChange, options, placeholder = 'Select...', emptyMessage = 'No matches', disabled,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [open]);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  const filtered = options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()));
  const selected = options.find(o => o.value === value);

  return (
    <div className="rf-combobox-wrap" ref={wrapRef}>
      {label && <label className="rf-combobox__label">{label}</label>}
      <button
        type="button"
        className="rf-combobox__trigger"
        onClick={() => !disabled && setOpen(o => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected ? 'rf-combobox__value' : 'rf-combobox__placeholder'}>
          {selected?.label || placeholder}
        </span>
        <CaretDown size={14} className="rf-combobox__chevron" />
      </button>
      {open && (
        <div className="rf-combobox__panel">
          <div className="rf-combobox__search">
            <MagnifyingGlass size={14} />
            <input
              ref={inputRef}
              type="text"
              className="rf-combobox__input"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search..."
            />
          </div>
          <div className="rf-combobox__list" role="listbox">
            {filtered.length === 0 ? (
              <div className="rf-combobox__empty">{emptyMessage}</div>
            ) : filtered.map(opt => (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={opt.value === value}
                className={`rf-combobox__option ${opt.value === value ? 'rf-combobox__option--selected' : ''}`}
                onClick={() => { onChange(opt.value); setOpen(false); setQuery(''); }}
              >
                <span>{opt.label}</span>
                {opt.value === value && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>
      )}
      {hint && <span className="rf-combobox__hint">{hint}</span>}
    </div>
  );
}
