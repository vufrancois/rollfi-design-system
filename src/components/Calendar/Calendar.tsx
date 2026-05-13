import { useState, useMemo } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import './Calendar.css';

interface CalendarProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  min?: Date;
  max?: Date;
  /** Month to display initially (otherwise: today, or value's month) */
  defaultMonth?: Date;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function addMonths(d: Date, n: number) { return new Date(d.getFullYear(), d.getMonth() + n, 1); }

export function Calendar({ value, onChange, min, max, defaultMonth }: CalendarProps) {
  const [view, setView] = useState<Date>(() => startOfMonth(defaultMonth || value || new Date()));
  const today = new Date();

  const days = useMemo(() => {
    const first = startOfMonth(view);
    const startDow = first.getDay();
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const cells: { date: Date; outside: boolean }[] = [];
    // leading days from previous month
    for (let i = startDow - 1; i >= 0; i--) {
      cells.push({ date: new Date(view.getFullYear(), view.getMonth(), -i), outside: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(view.getFullYear(), view.getMonth(), d), outside: false });
    }
    // trailing days to fill last week
    while (cells.length % 7 !== 0) {
      const last = cells[cells.length - 1].date;
      cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), outside: true });
    }
    return cells;
  }, [view]);

  const disabled = (d: Date) => (min && d < min) || (max && d > max);

  return (
    <div className="rf-calendar">
      <div className="rf-calendar__header">
        <button type="button" className="rf-calendar__nav" onClick={() => setView(addMonths(view, -1))} aria-label="Previous month">
          <CaretLeft size={14} />
        </button>
        <span className="rf-calendar__title">{MONTHS[view.getMonth()]} {view.getFullYear()}</span>
        <button type="button" className="rf-calendar__nav" onClick={() => setView(addMonths(view, 1))} aria-label="Next month">
          <CaretRight size={14} />
        </button>
      </div>
      <div className="rf-calendar__grid">
        {WEEKDAYS.map(d => <span key={d} className="rf-calendar__weekday">{d}</span>)}
        {days.map(({ date, outside }) => {
          const selected = value && isSameDay(date, value);
          const isToday = isSameDay(date, today);
          const isDisabled = disabled(date);
          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={isDisabled}
              onClick={() => onChange?.(date)}
              className={`rf-calendar__day ${outside ? 'rf-calendar__day--outside' : ''} ${selected ? 'rf-calendar__day--selected' : ''} ${isToday && !selected ? 'rf-calendar__day--today' : ''}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
