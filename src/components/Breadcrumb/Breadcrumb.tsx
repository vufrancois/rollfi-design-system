import { type ReactNode, Fragment } from 'react';
import { CaretRight } from '@phosphor-icons/react';
import './Breadcrumb.css';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
}

export function Breadcrumb({ items, separator, maxItems = 4 }: BreadcrumbProps) {
  const sep = separator ?? <CaretRight size={12} className="rf-breadcrumb__sep-icon" />;
  const showOverflow = items.length > maxItems;
  const visible = showOverflow
    ? [items[0], { label: '…', overflow: true } as BreadcrumbItem & { overflow?: boolean }, ...items.slice(-(maxItems - 2))]
    : items;

  return (
    <nav aria-label="Breadcrumb" className="rf-breadcrumb">
      <ol className="rf-breadcrumb__list">
        {visible.map((item, i) => {
          const isLast = i === visible.length - 1;
          const isOverflow = (item as { overflow?: boolean }).overflow;
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li className="rf-breadcrumb__item">
                {isOverflow ? (
                  <span className="rf-breadcrumb__overflow" aria-hidden="true">…</span>
                ) : isLast ? (
                  <span className="rf-breadcrumb__current" aria-current="page">{item.label}</span>
                ) : item.href ? (
                  <a href={item.href} className="rf-breadcrumb__link">{item.label}</a>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="rf-breadcrumb__link"
                  >
                    {item.label}
                  </button>
                )}
              </li>
              {!isLast && <li className="rf-breadcrumb__separator" aria-hidden="true">{sep}</li>}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
