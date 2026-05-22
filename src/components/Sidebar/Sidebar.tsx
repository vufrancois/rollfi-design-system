import { type ReactNode, useEffect, useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import './Sidebar.css';

interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: ReactNode;
  onClick?: () => void;
  /** Optional one-level nested items. When present, the parent renders a chevron and toggles its children on click. */
  children?: SidebarItem[];
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
  /**
   * Controlled expansion state. If omitted, Sidebar tracks expansion
   * internally and auto-expands any parent containing the active id.
   */
  expandedIds?: string[];
  onExpandedChange?: (ids: string[]) => void;
}

function parentsOfActive(items: SidebarItem[], activeId: string): Set<string> {
  const parents = new Set<string>();
  for (const i of items) {
    if (i.children?.some(c => c.id === activeId)) parents.add(i.id);
  }
  return parents;
}

export function Sidebar({
  items,
  activeId,
  onSelect,
  logo,
  secondaryItems,
  footer,
  expandedIds,
  onExpandedChange,
}: SidebarProps) {
  const isControlled = expandedIds !== undefined;
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
    () => parentsOfActive(items, activeId),
  );

  // Auto-expand any parent that owns the active id (uncontrolled only).
  useEffect(() => {
    if (isControlled) return;
    setInternalExpanded(prev => {
      const next = new Set(prev);
      for (const id of parentsOfActive(items, activeId)) next.add(id);
      return next;
    });
  }, [activeId, items, isControlled]);

  const expanded: Set<string> = isControlled
    ? new Set(expandedIds)
    : internalExpanded;

  const writeExpanded = (next: Set<string>) => {
    if (isControlled) onExpandedChange?.([...next]);
    else setInternalExpanded(next);
  };

  const toggleExpanded = (id: string) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    writeExpanded(next);
  };

  const renderLeaf = (item: SidebarItem, isActive: boolean, isChild = false) => (
    <button
      key={item.id}
      type="button"
      className={`rf-sidebar__item ${isActive ? 'rf-sidebar__item--active' : ''} ${isChild ? 'rf-sidebar__item--child' : ''}`}
      onClick={() => (item.onClick ? item.onClick() : onSelect(item.id))}
      aria-current={isActive ? 'page' : undefined}
    >
      {item.icon && <span className="rf-sidebar__icon">{item.icon}</span>}
      <span className="rf-sidebar__label">{item.label}</span>
      {item.badge && <span className="rf-sidebar__badge">{item.badge}</span>}
    </button>
  );

  const renderTopLevel = (item: SidebarItem) => {
    const hasChildren = !!item.children && item.children.length > 0;
    if (!hasChildren) return renderLeaf(item, item.id === activeId);

    const isOpen = expanded.has(item.id);
    return (
      <div key={item.id} className="rf-sidebar__group">
        <button
          type="button"
          className={`rf-sidebar__item ${item.id === activeId ? 'rf-sidebar__item--active' : ''}`}
          onClick={() => {
            if (item.onClick) item.onClick();
            else onSelect(item.id);
            toggleExpanded(item.id);
          }}
          aria-current={item.id === activeId ? 'page' : undefined}
          aria-expanded={isOpen}
        >
          {item.icon && <span className="rf-sidebar__icon">{item.icon}</span>}
          <span className="rf-sidebar__label">{item.label}</span>
          {item.badge && <span className="rf-sidebar__badge">{item.badge}</span>}
          <span className={`rf-sidebar__chevron ${isOpen ? 'rf-sidebar__chevron--open' : ''}`}>
            <CaretDown size={12} />
          </span>
        </button>
        <div className={`rf-sidebar__children ${isOpen ? 'rf-sidebar__children--open' : ''}`}>
          <div className="rf-sidebar__children-inner">
            {item.children!.map(child => renderLeaf(child, child.id === activeId, true))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <aside className="rf-sidebar">
      {logo && <div className="rf-sidebar__logo">{logo}</div>}
      <nav className="rf-sidebar__nav">
        {items.map(renderTopLevel)}
      </nav>
      {secondaryItems && secondaryItems.length > 0 && (
        <div className="rf-sidebar__secondary">
          {secondaryItems.map(item => renderLeaf(item, activeId === item.id))}
        </div>
      )}
      {footer && <div className="rf-sidebar__footer">{footer}</div>}
    </aside>
  );
}
