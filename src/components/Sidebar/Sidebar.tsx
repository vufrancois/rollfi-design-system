import { type ReactNode } from 'react';
import './Sidebar.css';

interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  activeId: string;
  onSelect: (id: string) => void;
  logo?: ReactNode;
  footer?: ReactNode;
}

export function Sidebar({ items, activeId, onSelect, logo, footer }: SidebarProps) {
  return (
    <aside className="rf-sidebar">
      {logo && <div className="rf-sidebar__logo">{logo}</div>}
      <nav className="rf-sidebar__nav">
        {items.map(item => (
          <button
            key={item.id}
            type="button"
            className={`rf-sidebar__item ${activeId === item.id ? 'rf-sidebar__item--active' : ''}`}
            onClick={() => onSelect(item.id)}
            aria-current={activeId === item.id ? 'page' : undefined}
          >
            {item.icon && <span className="rf-sidebar__icon">{item.icon}</span>}
            <span className="rf-sidebar__label">{item.label}</span>
            {item.badge && <span className="rf-sidebar__badge">{item.badge}</span>}
          </button>
        ))}
      </nav>
      {footer && <div className="rf-sidebar__footer">{footer}</div>}
    </aside>
  );
}
