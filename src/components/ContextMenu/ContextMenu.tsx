import { type ReactNode, useState, useEffect, useRef, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import './ContextMenu.css';

interface ContextMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  children: ReactNode;
}

export function ContextMenu({ items, children }: ContextMenuProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pos) return;
    const close = () => setPos(null);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPos(null); };
    window.addEventListener('click', close);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('click', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [pos]);

  const onContext = (e: MouseEvent) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div onContextMenu={onContext} className="rf-context-target">{children}</div>
      {pos && createPortal(
        <div
          ref={menuRef}
          className="rf-context-menu"
          style={{ top: pos.y, left: pos.x }}
          role="menu"
          onClick={e => e.stopPropagation()}
        >
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              className={`rf-context-menu__item ${item.danger ? 'rf-context-menu__item--danger' : ''}`}
              onClick={() => { item.onClick(); setPos(null); }}
            >
              {item.icon && <span className="rf-context-menu__icon">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}
