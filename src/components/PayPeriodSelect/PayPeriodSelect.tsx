import { useMemo, useState, useRef, useEffect } from 'react';
import { CaretDown, Check } from '@phosphor-icons/react';
import { Badge } from '../Badge/Badge';
import { StatusDot } from '../StatusDot/StatusDot';
import { Popover } from '../Popover/Popover';
import './PayPeriodSelect.css';

export interface PayPeriodOption {
  id: string;
  /** Pay date — ISO 'YYYY-MM-DD'. Drives sort order. */
  payDate: string;
  /** Pay period range start — ISO. */
  payBeginDate: string;
  /** Pay period range end — ISO. */
  payEndDate: string;
  /** Optional label rendered as a Badge in the right column (e.g. 'Regular', 'Off-cycle', 'Dismissal'). */
  type?: string;
  /** Status pulse — surfaces a colored StatusDot. 'failed' pulses to draw attention. */
  status?: 'paid' | 'pending' | 'failed' | 'draft';
}

interface PayPeriodSelectProps {
  options: PayPeriodOption[];
  value: string | null;
  onChange: (id: string) => void;
  /** Sort direction by `payDate`. Default: newest first. */
  sortBy?: 'paydate-desc' | 'paydate-asc';
  /** Placeholder shown when nothing is selected. */
  placeholder?: string;
  /** Optional form-style label rendered above the trigger. */
  label?: string;
  disabled?: boolean;
  /** Width override (default: 100% of the container, min 240px). */
  width?: number | string;
  className?: string;
}

const STATUS_VARIANT: Record<NonNullable<PayPeriodOption['status']>, 'success' | 'warning' | 'danger' | 'neutral'> = {
  paid: 'success',
  pending: 'warning',
  failed: 'danger',
  draft: 'neutral',
};

const TYPE_VARIANT = (type: string): 'info' | 'warning' | 'purple' | 'neutral' => {
  if (type === 'Regular') return 'info';
  if (type === 'Off-cycle' || type === 'Off-Cycle') return 'warning';
  if (type === 'Dismissal') return 'purple';
  return 'neutral';
};

function fmtDate(iso: string): string {
  // Use UTC to avoid TZ shifts on bare date strings.
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

function fmtRange(begin: string, end: string): string {
  return `${fmtDate(begin)} – ${fmtDate(end)}`;
}

export function PayPeriodSelect({
  options,
  value,
  onChange,
  sortBy = 'paydate-desc',
  placeholder = 'Select pay period',
  label,
  disabled,
  width,
  className = '',
}: PayPeriodSelectProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [menuWidth, setMenuWidth] = useState<number>();

  // Match menu width to trigger so the rich rows align.
  useEffect(() => {
    if (open && triggerRef.current) {
      setMenuWidth(triggerRef.current.getBoundingClientRect().width);
    }
  }, [open]);

  const sorted = useMemo(() => {
    const cp = [...options];
    cp.sort((a, b) => {
      const cmp = a.payDate.localeCompare(b.payDate);
      return sortBy === 'paydate-desc' ? -cmp : cmp;
    });
    return cp;
  }, [options, sortBy]);

  const selected = value ? options.find(o => o.id === value) ?? null : null;

  return (
    <div className={`rf-pp-select ${className}`} style={{ width }}>
      {label && <label className="rf-pp-select__label">{label}</label>}
      <Popover
        side="bottom"
        align="start"
        open={open}
        onOpenChange={setOpen}
        trigger={
          <button
            type="button"
            className="rf-pp-select__trigger"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <div ref={triggerRef} className="rf-pp-select__trigger-inner">
              {selected ? (
                <>
                  <div className="rf-pp-select__trigger-main">
                    <span className="rf-pp-select__trigger-paydate">Pay {fmtDate(selected.payDate)}</span>
                    {selected.type && (
                      <Badge variant={TYPE_VARIANT(selected.type)}>{selected.type}</Badge>
                    )}
                  </div>
                  <div className="rf-pp-select__trigger-range">
                    {fmtRange(selected.payBeginDate, selected.payEndDate)}
                  </div>
                </>
              ) : (
                <span className="rf-pp-select__placeholder">{placeholder}</span>
              )}
            </div>
            <span className={`rf-pp-select__chevron ${open ? 'rf-pp-select__chevron--open' : ''}`}>
              <CaretDown size={14} weight="bold" />
            </span>
          </button>
        }
      >
        <div
          className="rf-pp-select__menu"
          role="listbox"
          style={menuWidth ? { width: menuWidth } : undefined}
        >
          {sorted.length === 0 && (
            <div className="rf-pp-select__empty">No pay periods</div>
          )}
          {sorted.map(opt => {
            const isSelected = opt.id === value;
            return (
              <button
                key={opt.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`rf-pp-select__item ${isSelected ? 'rf-pp-select__item--selected' : ''}`}
                onClick={() => { onChange(opt.id); setOpen(false); }}
              >
                <div className="rf-pp-select__item-tick">
                  {isSelected && <Check size={12} weight="bold" />}
                </div>
                <div className="rf-pp-select__item-body">
                  <div className="rf-pp-select__item-row">
                    <span className="rf-pp-select__item-paydate">Pay {fmtDate(opt.payDate)}</span>
                    <div className="rf-pp-select__item-right">
                      {opt.status && <StatusDot variant={STATUS_VARIANT[opt.status]} pulse={opt.status === 'failed'} />}
                      {opt.type && <Badge variant={TYPE_VARIANT(opt.type)}>{opt.type}</Badge>}
                    </div>
                  </div>
                  <div className="rf-pp-select__item-range">
                    {fmtRange(opt.payBeginDate, opt.payEndDate)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Popover>
    </div>
  );
}
