import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import './Pagination.css';

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
  siblingCount?: number;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function buildPages(current: number, total: number, sibling: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];
  const left = Math.max(2, current - sibling);
  const right = Math.min(total - 1, current + sibling);
  pages.push(1);
  if (left > 2) pages.push('ellipsis');
  range(left, right).forEach(p => pages.push(p));
  if (right < total - 1) pages.push('ellipsis');
  if (total > 1) pages.push(total);
  return pages;
}

export function Pagination({ current, total, onChange, siblingCount = 1 }: PaginationProps) {
  if (total <= 1) return null;
  const pages = buildPages(current, total, siblingCount);
  return (
    <nav aria-label="Pagination" className="rf-pagination">
      <button
        type="button"
        className="rf-pagination__btn"
        onClick={() => onChange(current - 1)}
        disabled={current <= 1}
        aria-label="Previous page"
      >
        <CaretLeft size={14} /> Previous
      </button>
      <ul className="rf-pagination__list">
        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <li key={`e-${i}`} className="rf-pagination__ellipsis" aria-hidden="true">…</li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className={`rf-pagination__page ${p === current ? 'rf-pagination__page--active' : ''}`}
                onClick={() => onChange(p)}
                aria-current={p === current ? 'page' : undefined}
                aria-label={`Page ${p}`}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ul>
      <button
        type="button"
        className="rf-pagination__btn"
        onClick={() => onChange(current + 1)}
        disabled={current >= total}
        aria-label="Next page"
      >
        Next <CaretRight size={14} />
      </button>
    </nav>
  );
}
