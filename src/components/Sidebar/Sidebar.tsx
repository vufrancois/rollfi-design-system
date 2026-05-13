import { type ReactNode } from 'react';
import './Sidebar.css';

interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: ReactNode;
  onClick?: () => void;
}

interface SidebarProps {
  items: SidebarItem[];
  activeId: string;
  onSelect: (id: string) => void;
  logo?: ReactNode;
  /** Secondary nav-styled items rendered below the main nav (e.g. Notifications, Sign out). */
  secondaryItems?: SidebarItem[];
  /** Bottom-anchored slot (e.g. user profile). */
  footer?: ReactNode;
}

export function Sidebar({ items, activeId, onSelect, logo, secondaryItems, footer }: SidebarProps) {
  const renderItem = (item: SidebarItem, isActive: boolean) => (
    <button
      key={item.id}
      type="button"
      className={`rf-sidebar__item ${isActive ? 'rf-sidebar__item--active' : ''}`}
      onClick={() => (item.onClick ? item.onClick() : onSelect(item.id))}
      aria-current={isActive ? 'page' : undefined}
    >
      {item.icon && <span className="rf-sidebar__icon">{item.icon}</span>}
      <span className="rf-sidebar__label">{item.label}</span>
      {item.badge && <span className="rf-sidebar__badge">{item.badge}</span>}
    </button>
  );

  return (
    <aside className="rf-sidebar">
      {logo && <div className="rf-sidebar__logo">{logo}</div>}
      <nav className="rf-sidebar__nav">
        {items.map(item => renderItem(item, activeId === item.id))}
      </nav>
      {secondaryItems && secondaryItems.length > 0 && (
        <div className="rf-sidebar__secondary">
          {secondaryItems.map(item => renderItem(item, activeId === item.id))}
        </div>
      )}
      {footer && <div className="rf-sidebar__footer">{footer}</div>}
    </aside>
  );
}
