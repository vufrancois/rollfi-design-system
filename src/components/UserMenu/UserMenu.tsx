import { type ReactNode, useEffect, useRef, useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { Avatar } from '../Avatar/Avatar';
import './UserMenu.css';

export interface UserMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  /** Render as a destructive item (red). Useful for Sign out. */
  danger?: boolean;
  disabled?: boolean;
  /** Render a divider below this item (groups menu sections). */
  dividerAfter?: boolean;
  /** Optional trailing right-side content (e.g. a status pill, a Cmd shortcut, a switch). */
  trailing?: ReactNode;
}

interface UserMenuProps {
  name: string;
  role?: string;
  avatarSrc?: string;
  items: UserMenuItem[];
  /**
   * `compact` — avatar only, no name/role inline. Use for tight headers.
   * Defaults to `false` (avatar + name + role + chevron).
   */
  compact?: boolean;
  align?: 'left' | 'right';
  className?: string;
}

export function UserMenu({
  name,
  role,
  avatarSrc,
  items,
  compact = false,
  align = 'right',
  className = '',
}: UserMenuProps) {
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
    <div ref={ref} className={`rf-user-menu ${className}`}>
      <button
        type="button"
        className={`rf-user-menu__trigger ${compact ? 'rf-user-menu__trigger--compact' : ''} ${open ? 'rf-user-menu__trigger--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar name={name} src={avatarSrc} size="sm" />
        {!compact && (
          <span className="rf-user-menu__id">
            <span className="rf-user-menu__name">{name}</span>
            {role && <span className="rf-user-menu__role">{role}</span>}
          </span>
        )}
        {!compact && (
          <span className={`rf-user-menu__chevron ${open ? 'rf-user-menu__chevron--open' : ''}`}>
            <CaretDown size={12} weight="bold" />
          </span>
        )}
      </button>

      {open && (
        <div className={`rf-user-menu__panel rf-user-menu__panel--${align}`} role="menu">
          <div className="rf-user-menu__header">
            <Avatar name={name} src={avatarSrc} size="md" />
            <div className="rf-user-menu__header-id">
              <span className="rf-user-menu__header-name">{name}</span>
              {role && <span className="rf-user-menu__header-role">{role}</span>}
            </div>
          </div>
          <div className="rf-user-menu__items">
            {items.map((item, idx) => (
              <div key={`${item.label}-${idx}`}>
                <button
                  type="button"
                  role="menuitem"
                  className={`rf-user-menu__item ${item.danger ? 'rf-user-menu__item--danger' : ''}`}
                  disabled={item.disabled}
                  onClick={() => { item.onClick(); setOpen(false); }}
                >
                  {item.icon && <span className="rf-user-menu__item-icon">{item.icon}</span>}
                  <span className="rf-user-menu__item-label">{item.label}</span>
                  {item.trailing && <span className="rf-user-menu__item-trailing">{item.trailing}</span>}
                </button>
                {item.dividerAfter && <div className="rf-user-menu__divider" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
