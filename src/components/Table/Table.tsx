import { type ReactNode, useState, Fragment, useMemo } from 'react';
import { CaretUp, CaretDown, CaretUpDown, MagnifyingGlass, FunnelSimple, X, Check } from '@phosphor-icons/react';
import { Input } from '../Input/Input';
import { Popover } from '../Popover/Popover';
import './Table.css';

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  /** Optional override for what string this column contributes to the search index. Defaults to `String(row[key])`. */
  filterValue?: (row: T) => string;
  /** Opt this column into the structured Filter menu — derives distinct values from `data` and renders them as checkboxes. */
  filterable?: boolean;
  /** Override the option list shown in the Filter menu (use when the raw row values aren't display-ready). */
  filterOptions?: { label: string; value: string }[];
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
  /** Surface a search input above the table. Case-insensitive substring match across `filterKeys` (or all columns by default). */
  searchable?: boolean;
  /** Placeholder for the search input. Default: "Search…". */
  searchPlaceholder?: string;
  /** Controlled filter value. If omitted, the table tracks its own state. */
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  /** Restrict which column keys participate in the search. Defaults to every column. */
  filterKeys?: string[];
  /** Custom filter predicate. When provided, replaces the built-in substring search. */
  filterFn?: (row: T, query: string) => boolean;
  /** Surface a structured Filter button (alongside or instead of search). Columns must opt in via `filterable: true`. */
  filterable?: boolean;
  /** Controlled active-filters map: `{ columnKey: [selectedValue, …] }`. */
  activeFilters?: Record<string, string[]>;
  onActiveFiltersChange?: (filters: Record<string, string[]>) => void;
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
  searchable,
  searchPlaceholder = 'Search…',
  filterValue,
  onFilterChange,
  filterKeys,
  filterFn,
  filterable,
  activeFilters,
  onActiveFiltersChange,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [internalFilter, setInternalFilter] = useState('');
  const [internalActiveFilters, setInternalActiveFilters] = useState<Record<string, string[]>>({});

  const isActiveFiltersControlled = activeFilters !== undefined;
  const active = isActiveFiltersControlled ? activeFilters : internalActiveFilters;

  // Functional updater — safe under rapid successive toggles.
  const applyUpdate = (update: (curr: Record<string, string[]>) => Record<string, string[]>) => {
    if (isActiveFiltersControlled) {
      onActiveFiltersChange?.(update(activeFilters!));
    } else {
      setInternalActiveFilters(prev => update(prev));
    }
  };

  const toggleFilterValue = (colKey: string, value: string) => {
    applyUpdate(curr => {
      const cv = curr[colKey] ?? [];
      const nextVals = cv.includes(value) ? cv.filter(v => v !== value) : [...cv, value];
      const merged = { ...curr, [colKey]: nextVals };
      if (nextVals.length === 0) delete merged[colKey];
      return merged;
    });
  };

  const clearFilters = () => applyUpdate(() => ({}));

  const filterableColumns = useMemo(() => columns.filter(c => c.filterable), [columns]);

  // Derive distinct option lists per filterable column from the unfiltered data.
  const filterOptionsByCol = useMemo(() => {
    const map: Record<string, { label: string; value: string }[]> = {};
    for (const col of filterableColumns) {
      if (col.filterOptions) {
        map[col.key] = col.filterOptions;
        continue;
      }
      const seen = new Map<string, string>();
      for (const row of data) {
        const raw = col.filterValue ? col.filterValue(row) : String(row[col.key] ?? '');
        if (!raw) continue;
        if (!seen.has(raw)) seen.set(raw, raw);
      }
      map[col.key] = [...seen.entries()].map(([value, label]) => ({ value, label }));
    }
    return map;
  }, [filterableColumns, data]);

  const totalActiveCount = Object.values(active).reduce((n, vs) => n + vs.length, 0);

  const isFilterControlled = filterValue !== undefined;
  const filterText = isFilterControlled ? filterValue : internalFilter;
  const setFilterText = (v: string) => {
    if (isFilterControlled) onFilterChange?.(v);
    else setInternalFilter(v);
  };

  const filteredData = (() => {
    let rows = data;

    // Structured filter menu: AND across columns, OR within a column.
    const activeKeys = Object.keys(active).filter(k => active[k].length > 0);
    if (activeKeys.length > 0) {
      rows = rows.filter(row =>
        activeKeys.every(k => {
          const col = columns.find(c => c.key === k);
          const raw = col?.filterValue ? col.filterValue(row) : String(row[k] ?? '');
          return active[k].includes(raw);
        })
      );
    }

    // Text search.
    if (!searchable && !filterFn) return rows;
    const q = filterText.trim().toLowerCase();
    if (!q && !filterFn) return rows;
    if (filterFn) return rows.filter(row => filterFn(row, q));
    const keys = filterKeys ?? columns.map(c => c.key);
    return rows.filter(row =>
      keys.some(k => {
        const col = columns.find(c => c.key === k);
        const raw = col?.filterValue ? col.filterValue(row) : String(row[k] ?? '');
        return raw.toLowerCase().includes(q);
      })
    );
  })();

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
    if (!sortKey || !sortDir) return filteredData;
    const col = columns.find(c => c.key === sortKey);
    if (!col) return filteredData;
    const getVal = (row: T) =>
      col.sortValue ? col.sortValue(row) : (row[sortKey] as string | number);
    return [...filteredData].sort((a, b) => {
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

  const allKeys = filteredData.map(rowKey);
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

  const isSearching = filterText.trim().length > 0;
  const isFiltered = isSearching || totalActiveCount > 0;
  const resolvedEmptyMessage = isFiltered && filteredData.length === 0
    ? isSearching
      ? `No results for "${filterText.trim()}"`
      : 'No rows match the current filters'
    : emptyMessage;

  return (
    <div className="rf-table-wrap">
      {(searchable || filterable) && (
        <div className="rf-table__toolbar">
          {searchable && (
            <Input
              icon={<MagnifyingGlass />}
              placeholder={searchPlaceholder}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              inputSize="sm"
              className="rf-table__search"
              aria-label="Search table"
            />
          )}
          {filterable && filterableColumns.length > 0 && (
            <Popover
              side="bottom"
              align="start"
              trigger={
                <button
                  type="button"
                  className={`rf-table__filter-btn ${totalActiveCount > 0 ? 'rf-table__filter-btn--active' : ''}`}
                >
                  <FunnelSimple size={14} />
                  <span>Filter</span>
                  {totalActiveCount > 0 && (
                    <span className="rf-table__filter-btn-count">{totalActiveCount}</span>
                  )}
                </button>
              }
            >
              <div className="rf-table__filter-menu">
                {filterableColumns.map(col => {
                  const opts = filterOptionsByCol[col.key] ?? [];
                  const selected = active[col.key] ?? [];
                  return (
                    <div key={col.key} className="rf-table__filter-group">
                      <div className="rf-table__filter-group-label">{col.header}</div>
                      <div className="rf-table__filter-group-opts">
                        {opts.length === 0 && (
                          <span className="rf-table__filter-empty">No values</span>
                        )}
                        {opts.map(opt => {
                          const isOn = selected.includes(opt.value);
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              className={`rf-table__filter-opt ${isOn ? 'rf-table__filter-opt--on' : ''}`}
                              onClick={() => toggleFilterValue(col.key, opt.value)}
                              role="checkbox"
                              aria-checked={isOn}
                            >
                              <span className="rf-table__filter-opt-box">
                                {isOn && <Check size={11} weight="bold" />}
                              </span>
                              <span>{opt.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                {totalActiveCount > 0 && (
                  <div className="rf-table__filter-menu-footer">
                    <button
                      type="button"
                      className="rf-table__filter-clear"
                      onClick={clearFilters}
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>
            </Popover>
          )}
          {isFiltered && (
            <span className="rf-table__filter-count">
              {filteredData.length} of {data.length}
            </span>
          )}
          {totalActiveCount > 0 && (
            <div className="rf-table__filter-chips" role="group" aria-label="Active filters">
              {Object.entries(active).flatMap(([colKey, values]) => {
                const col = columns.find(c => c.key === colKey);
                const opts = filterOptionsByCol[colKey] ?? [];
                return values.map(v => {
                  const opt = opts.find(o => o.value === v);
                  return (
                    <button
                      key={`${colKey}:${v}`}
                      type="button"
                      className="rf-table__filter-chip"
                      onClick={() => toggleFilterValue(colKey, v)}
                      aria-label={`Remove filter ${col?.header}: ${opt?.label ?? v}`}
                    >
                      <span className="rf-table__filter-chip-label">{col?.header}:</span>
                      <span>{opt?.label ?? v}</span>
                      <X size={11} weight="bold" />
                    </button>
                  );
                });
              })}
            </div>
          )}
        </div>
      )}
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
                {resolvedEmptyMessage}
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
