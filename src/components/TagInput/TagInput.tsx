import { useState, useRef, type KeyboardEvent } from 'react';
import { X } from '@phosphor-icons/react';
import './TagInput.css';

interface TagInputProps {
  label?: string;
  hint?: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Trigger keys to commit a tag */
  separators?: string[];
}

export function TagInput({
  label, hint, value, onChange, placeholder = 'Add tag…', disabled,
  separators = ['Enter', ','],
}: TagInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const commit = () => {
    const trimmed = input.trim().replace(/,$/, '');
    if (trimmed && !value.includes(trimmed)) onChange([...value, trimmed]);
    setInput('');
  };

  const remove = (t: string) => onChange(value.filter(x => x !== t));

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (separators.includes(e.key)) { e.preventDefault(); commit(); }
    else if (e.key === 'Backspace' && !input && value.length) remove(value[value.length - 1]);
  };

  return (
    <div className="rf-tag-input-wrap">
      {label && <label className="rf-tag-input__label">{label}</label>}
      <div
        className={`rf-tag-input ${disabled ? 'rf-tag-input--disabled' : ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map(t => (
          <span key={t} className="rf-tag-input__chip">
            {t}
            <button type="button" className="rf-tag-input__remove" onClick={() => remove(t)} aria-label={`Remove ${t}`}>
              <X size={10} />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="rf-tag-input__field"
          value={input}
          placeholder={value.length ? '' : placeholder}
          disabled={disabled}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          onBlur={commit}
        />
      </div>
      {hint && <span className="rf-tag-input__hint">{hint}</span>}
    </div>
  );
}
