import { type ReactNode, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MagnifyingGlass } from '@phosphor-icons/react';
import './Command.css';

interface CommandItem {
  id: string;
  label: string;
  icon?: ReactNode;
  group?: string;
  shortcut?: ReactNode;
  onSelect: () => void;
  keywords?: string[];
}

interface CommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
}

export function Command({ open, onOpenChange, items, placeholder = 'Type a command or search...', emptyMessage = 'No results' }: CommandProps) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  const filtered = items.filter(item => {
    if (!query) return true;
    const q = query.toLowerCase();
    return item.label.toLowerCase().includes(q) || item.keywords?.some(k => k.toLowerCase().includes(q));
  });

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    const k = item.group || 'Suggestions';
    (acc[k] = acc[k] || []).push(item);
    return acc;
  }, {});

  const flat = Object.values(grouped).flat();

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(a => Math.min(a + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(a => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = flat[active];
      if (item) { item.onSelect(); onOpenChange(false); }
    }
  };

  return createPortal(
    <div className="rf-command__overlay" onClick={() => onOpenChange(false)}>
      <div className="rf-command" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="rf-command__search">
          <MagnifyingGlass size={16} />
          <input
            ref={inputRef}
            type="text"
            className="rf-command__input"
            value={query}
            placeholder={placeholder}
            onChange={e => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={onInputKey}
          />
        </div>
        <div className="rf-command__list" role="listbox">
          {flat.length === 0 ? (
            <div className="rf-command__empty">{emptyMessage}</div>
          ) : Object.entries(grouped).map(([group, gItems]) => (
            <div key={group} className="rf-command__group">
              <div className="rf-command__group-label">{group}</div>
              {gItems.map(item => {
                const idx = flat.indexOf(item);
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={idx === active}
                    className={`rf-command__item ${idx === active ? 'rf-command__item--active' : ''}`}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => { item.onSelect(); onOpenChange(false); }}
                  >
                    {item.icon && <span className="rf-command__item-icon">{item.icon}</span>}
                    <span className="rf-command__item-label">{item.label}</span>
                    {item.shortcut && <span className="rf-command__item-shortcut">{item.shortcut}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
