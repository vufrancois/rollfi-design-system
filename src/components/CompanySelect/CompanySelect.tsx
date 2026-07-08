import { useMemo, useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { CaretDown, Check, MagnifyingGlass, Buildings } from '@phosphor-icons/react';
import { Avatar } from '../Avatar/Avatar';
import { Input } from '../Input/Input';
import { Popover } from '../Popover/Popover';
import './CompanySelect.css';

export interface CompanyOption {
  id: string;
  name: string;
  avatarSrc?: string;
  /** Optional secondary line — e.g. "Pro · 124 employees". */
  meta?: string;
}

interface CompanySelectProps {
  options: CompanyOption[];
  value: string | null;
  onChange: (id: string | null) => void;
  /** Hides the search input. Combobox semantics still apply (just no typing). */
  searchable?: boolean;
  searchPlaceholder?: string;
  placeholder?: string;
  /** Prepends an "All companies" row whose id is `null`. */
  allowAll?: boolean;
  allLabel?: string;
  /** Compact trigger — avatar only. */
  compact?: boolean;
  align?: 'start' | 'center' | 'end';
  width?: number | string;
  className?: string;
}

const ALL_ID = '__rf-company-all__';

type Row =
  | { kind: 'all'; id: typeof ALL_ID }
  | { kind: 'company'; id: string; option: CompanyOption };

export function CompanySelect({
  options,
  value,
  onChange,
  searchable = true,
  searchPlaceholder = 'Search companies…',
  placeholder = 'Select company',
  allowAll = false,
  allLabel = 'All companies',
  compact = false,
  align = 'start',
  width,
  className = '',
}: CompanySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [menuWidth, setMenuWidth] = useState<number>();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && triggerRef.current) {
      setMenuWidth(triggerRef.current.getBoundingClientRect().width);
    }
    if (!open) {
      setQuery('');
      setActiveIndex(0);
    }
  }, [open]);

  // Build the unified row list (All row + matching companies).
  const rows = useMemo<Row[]>(() => {
    const q = query.trim().toLowerCase();
    const matched = q
      ? options.filter(o => o.name.toLowerCase().includes(q))
      : options;
    const list: Row[] = matched.map(o => ({ kind: 'company', id: o.id, option: o }));
    if (allowAll && (!q || allLabel.toLowerCase().includes(q))) {
      list.unshift({ kind: 'all', id: ALL_ID });
    }
    return list;
  }, [options, query, allowAll, allLabel]);

  // Reset activeIndex when the row list changes so the highlight stays on the first match.
  useEffect(() => { setActiveIndex(0); }, [query]);

  // Scroll the active item into view as the user arrows through.
  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>('[data-active="true"]');
    active?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

  const selected = value ? options.find(o => o.id === value) ?? null : null;

  const selectRow = (row: Row) => {
    onChange(row.kind === 'all' ? null : row.id);
    setOpen(false);
  };

  const onSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, rows.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const row = rows[activeIndex];
      if (row) selectRow(row);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIndex(rows.length - 1);
    }
  };

  // Auto-collapse to a static display when there's nothing to choose:
  // one option and no "All companies" affordance = no menu needed.
  const effectiveOptionCount = options.length + (allowAll ? 1 : 0);
  const isStatic = effectiveOptionCount <= 1;

  if (isStatic) {
    const only = selected ?? options[0] ?? null;
    return (
      <div className={`rf-company-select rf-company-select--static ${className}`} style={{ width }}>
        <div className="rf-company-select__trigger rf-company-select__trigger--static">
          <div className="rf-company-select__trigger-inner">
            {only ? (
              <>
                <Avatar name={only.name} src={only.avatarSrc} size="sm" />
                {!compact && (
                  <span className="rf-company-select__trigger-text">
                    <span className="rf-company-select__trigger-name">{only.name}</span>
                    {only.meta && (
                      <span className="rf-company-select__trigger-meta">{only.meta}</span>
                    )}
                  </span>
                )}
              </>
            ) : (
              <>
                <span className="rf-company-select__placeholder-icon">
                  <Buildings size={16} />
                </span>
                {!compact && <span className="rf-company-select__placeholder">{placeholder}</span>}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  const triggerContent = selected ? (
    <>
      <Avatar name={selected.name} src={selected.avatarSrc} size="sm" />
      {!compact && (
        <span className="rf-company-select__trigger-text">
          <span className="rf-company-select__trigger-name">{selected.name}</span>
          {selected.meta && (
            <span className="rf-company-select__trigger-meta">{selected.meta}</span>
          )}
        </span>
      )}
    </>
  ) : (
    <>
      <span className="rf-company-select__placeholder-icon">
        <Buildings size={16} />
      </span>
      {!compact && <span className="rf-company-select__placeholder">{allowAll && !value ? allLabel : placeholder}</span>}
    </>
  );

  return (
    <div className={`rf-company-select ${className}`} style={{ width }}>
      <Popover
        side="bottom"
        align={align}
        open={open}
        onOpenChange={setOpen}
        trigger={
          <button
            type="button"
            className={`rf-company-select__trigger ${compact ? 'rf-company-select__trigger--compact' : ''} ${open ? 'rf-company-select__trigger--open' : ''}`}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <div ref={triggerRef} className="rf-company-select__trigger-inner">
              {triggerContent}
            </div>
            {!compact && (
              <span className={`rf-company-select__chevron ${open ? 'rf-company-select__chevron--open' : ''}`}>
                <CaretDown size={12} weight="bold" />
              </span>
            )}
          </button>
        }
      >
        <div
          className="rf-company-select__menu"
          style={menuWidth ? { minWidth: Math.max(menuWidth, 280) } : undefined}
        >
          {searchable && (
            <div className="rf-company-select__search">
              <Input
                icon={<MagnifyingGlass />}
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onSearchKeyDown}
                inputSize="sm"
                aria-label="Search companies"
                autoFocus
                role="combobox"
                aria-expanded
                aria-autocomplete="list"
                aria-controls="rf-company-select-listbox"
                aria-activedescendant={rows[activeIndex] ? `rf-company-select-row-${rows[activeIndex].id}` : undefined}
              />
            </div>
          )}
          <div
            ref={listRef}
            className="rf-company-select__items"
            id="rf-company-select-listbox"
            role="listbox"
          >
            {rows.length === 0 && (
              <div className="rf-company-select__empty">
                {query ? `No results for "${query}"` : 'No companies'}
              </div>
            )}
            {rows.map((row, idx) => {
              const isActive = idx === activeIndex;
              const isSelected = row.kind === 'all' ? value === null : row.id === value;
              const id = `rf-company-select-row-${row.id}`;
              if (row.kind === 'all') {
                return (
                  <RowButton
                    key={row.id}
                    id={id}
                    name={allLabel}
                    meta={`${options.length} companies`}
                    isSelected={isSelected}
                    isActive={isActive}
                    onClick={() => selectRow(row)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    isAll
                  />
                );
              }
              return (
                <RowButton
                  key={row.id}
                  id={id}
                  name={row.option.name}
                  meta={row.option.meta}
                  avatarSrc={row.option.avatarSrc}
                  isSelected={isSelected}
                  isActive={isActive}
                  onClick={() => selectRow(row)}
                  onMouseEnter={() => setActiveIndex(idx)}
                />
              );
            })}
          </div>
        </div>
      </Popover>
    </div>
  );
}

function RowButton({
  id, name, meta, avatarSrc, isSelected, isActive, onClick, onMouseEnter, isAll = false,
}: {
  id: string;
  name: string;
  meta?: string;
  avatarSrc?: string;
  isSelected: boolean;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  isAll?: boolean;
}) {
  return (
    <button
      id={id}
      type="button"
      role="option"
      aria-selected={isSelected}
      data-active={isActive || undefined}
      className={`rf-company-select__item ${isSelected ? 'rf-company-select__item--selected' : ''} ${isActive ? 'rf-company-select__item--active' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div className="rf-company-select__item-tick">
        {isSelected && <Check size={12} weight="bold" />}
      </div>
      {isAll ? (
        <div className="rf-company-select__item-all-icon">
          <Buildings size={16} />
        </div>
      ) : (
        <Avatar name={name} src={avatarSrc} size="sm" />
      )}
      <div className="rf-company-select__item-body">
        <span className="rf-company-select__item-name">{name}</span>
        {meta && <span className="rf-company-select__item-meta">{meta}</span>}
      </div>
    </button>
  );
}
