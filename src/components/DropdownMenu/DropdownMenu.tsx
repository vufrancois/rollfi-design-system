import { type ReactNode, useEffect, useRef, useState } from 'react';
import './DropdownMenu.css';

interface MenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: MenuItem[];
  align?: 'left' | 'right';
}

export function DropdownMenu({ trigger, items, align = 'right' }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="rf-dropdown">
      <div className="rf-dropdown__trigger" onClick={() => setOpen(o => !o)}>
        {trigger}
      </div>
      {open && (
        <div className={`rf-dropdown__menu rf-dropdown__menu--${align}`} role="menu">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              role="menuitem"
              className={`rf-dropdown__item ${item.danger ? 'rf-dropdown__item--danger' : ''}`}
              disabled={item.disabled}
              onClick={() => { item.onClick(); setOpen(false); }}
            >
              {item.icon && <span className="rf-dropdown__icon">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
