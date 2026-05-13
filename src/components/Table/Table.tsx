import { type ReactNode, useState, Fragment } from 'react';
import { CaretUp, CaretDown, CaretUpDown } from '@phosphor-icons/react';
import './Table.css';

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  expandable?: (row: T) => ReactNode;
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
}

type SortDir = 'asc' | 'desc' | null;

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  onRowClick,
  emptyMessage = 'No data',
  expandable,
  selectable,
  selectedKeys = [],
  onSelectionChange,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    if (sortKey !== col.key) {
      setSortKey(col.key);
      setSortDir('asc');
    } else if (sortDir === 'asc') {
      setSortDir('desc');
    } else {
      setSortKey(null);
      setSortDir(null);
    }
  };

  const sortedData = (() => {
    if (!sortKey || !sortDir) return data;
    const col = columns.find(c => c.key === sortKey);
    if (!col) return data;
    const getVal = (row: T) =>
      col.sortValue ? col.sortValue(row) : (row[sortKey] as string | number);
    return [...data].sort((a, b) => {
      const av = getVal(a);
      const bv = getVal(b);
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  })();

  const toggleExpand = (key: string) => {
    setExpandedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const allKeys = data.map(rowKey);
  const allSelected = selectable && allKeys.length > 0 && allKeys.every(k => selectedKeys.includes(k));
  const someSelected = selectable && selectedKeys.length > 0 && !allSelected;

  const toggleAll = () => {
    if (!onSelectionChange) return;
    onSelectionChange(allSelected ? [] : allKeys);
  };

  const toggleRow = (key: string) => {
    if (!onSelectionChange) return;
    onSelectionChange(
      selectedKeys.includes(key)
        ? selectedKeys.filter(k => k !== key)
        : [...selectedKeys, key]
    );
  };

  const totalCols = columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0);

  return (
    <div className="rf-table-wrap">
      <table className={`rf-table ${onRowClick ? 'rf-table--clickable' : ''}`}>
        <thead>
          <tr>
            {selectable && (
              <th className="rf-table__th rf-table__th--checkbox">
                <input
                  type="checkbox"
                  className="rf-table__checkbox"
                  checked={!!allSelected}
                  ref={el => { if (el) el.indeterminate = !!someSelected; }}
                  onChange={toggleAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {expandable && <th className="rf-table__th rf-table__th--expand" />}
            {columns.map(col => (
              <th
                key={col.key}
                className={`rf-table__th ${col.sortable ? 'rf-table__th--sortable' : ''}`}
                style={{ textAlign: col.align || 'left', width: col.width }}
                onClick={col.sortable ? () => handleSort(col) : undefined}
              >
                <span className="rf-table__th-content">
                  {col.header}
                  {col.sortable && (
                    <span className="rf-table__sort-icon" aria-hidden="true">
                      {sortKey === col.key
                        ? sortDir === 'asc'
                          ? <CaretUp size={11} weight="bold" />
                          : <CaretDown size={11} weight="bold" />
                        : <CaretUpDown size={11} />}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td className="rf-table__empty" colSpan={totalCols}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map(row => {
              const key = rowKey(row);
              const isExpanded = expandedKeys.has(key);
              const isSelected = selectedKeys.includes(key);
              return (
                <Fragment key={key}>
                  <tr
                    className={`rf-table__row ${isSelected ? 'rf-table__row--selected' : ''}`}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    {selectable && (
                      <td className="rf-table__td rf-table__td--checkbox" onClick={e => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          className="rf-table__checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(key)}
                          aria-label="Select row"
                        />
                      </td>
                    )}
                    {expandable && (
                      <td className="rf-table__td rf-table__td--expand" onClick={e => { e.stopPropagation(); toggleExpand(key); }}>
                        <button
                          type="button"
                          className={`rf-table__expand-btn ${isExpanded ? 'rf-table__expand-btn--open' : ''}`}
                          aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                          aria-expanded={isExpanded}
                        >
                          ▸
                        </button>
                      </td>
                    )}
                    {columns.map(col => (
                      <td
                        key={col.key}
                        className="rf-table__td"
                        style={{ textAlign: col.align || 'left' }}
                      >
                        {col.render ? col.render(row) : String(row[col.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                  {expandable && isExpanded && (
                    <tr className="rf-table__expanded-row">
                      <td className="rf-table__expanded-cell" colSpan={totalCols}>
                        {expandable(row)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
