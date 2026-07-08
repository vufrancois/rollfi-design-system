import { useEffect, useState } from 'react';
import { Clock, Play, Coffee, StopCircle } from '@phosphor-icons/react';
import { Button } from '../Button/Button';
import './ClockWidget.css';

export type ClockStatus = 'idle' | 'working' | 'break';

interface ClockWidgetProps {
  /**
   * Uncontrolled by default: the widget owns its state. Pass `status` (+ callbacks)
   * to run in controlled mode — useful when persisting to a backend.
   */
  status?: ClockStatus;
  onStatusChange?: (status: ClockStatus) => void;
  /** Shown on the "Clocked in since HH:MM" line. When controlled, pass the persisted time. */
  clockInTime?: Date | null;
  onClockIn?: (time: Date) => void;
  onClockOut?: (time: Date) => void;
  onBreakStart?: (time: Date) => void;
  onBreakEnd?: (time: Date) => void;
  /** Header label. Default: `Clock In/Out`. */
  title?: string;
  className?: string;
}

const fmtTime = (d: Date) =>
  d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

const fmtElapsed = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export function ClockWidget({
  status: controlledStatus,
  onStatusChange,
  clockInTime: controlledClockInTime,
  onClockIn,
  onClockOut,
  onBreakStart,
  onBreakEnd,
  title = 'Clock In/Out',
  className = '',
}: ClockWidgetProps) {
  const isControlled = controlledStatus !== undefined;

  const [internalStatus, setInternalStatus] = useState<ClockStatus>('idle');
  const [internalClockInTime, setInternalClockInTime] = useState<Date | null>(null);
  const [now, setNow] = useState(() => new Date());
  const [workElapsed, setWorkElapsed] = useState(0);
  const [breakElapsed, setBreakElapsed] = useState(0);

  const status = isControlled ? controlledStatus : internalStatus;
  const clockInTime = isControlled ? controlledClockInTime ?? null : internalClockInTime;

  // Live wall-clock tick.
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Elapsed counter — restarts per phase.
  useEffect(() => {
    if (status === 'working') {
      const t = setInterval(() => setWorkElapsed(e => e + 1), 1000);
      return () => clearInterval(t);
    }
    if (status === 'break') {
      const t = setInterval(() => setBreakElapsed(e => e + 1), 1000);
      return () => clearInterval(t);
    }
  }, [status]);

  const transition = (next: ClockStatus) => {
    if (!isControlled) setInternalStatus(next);
    onStatusChange?.(next);
  };

  const doClockIn = () => {
    const t = new Date();
    if (!isControlled) setInternalClockInTime(t);
    setWorkElapsed(0);
    setBreakElapsed(0);
    transition('working');
    onClockIn?.(t);
  };

  const doClockOut = () => {
    if (!isControlled) setInternalClockInTime(null);
    setWorkElapsed(0);
    setBreakElapsed(0);
    transition('idle');
    onClockOut?.(new Date());
  };

  const doBreakStart = () => {
    setBreakElapsed(0);
    transition('break');
    onBreakStart?.(new Date());
  };

  const doBreakEnd = () => {
    transition('working');
    onBreakEnd?.(new Date());
  };

  return (
    <div className={`rf-clock ${className}`}>
      <div className="rf-clock__header">
        <div className="rf-clock__title">
          <Clock size={16} />
          <span>{title}</span>
        </div>
        <span className="rf-clock__date">{fmtDate(now)}</span>
      </div>

      {status === 'idle' ? (
        <>
          <div className="rf-clock__now-label">Current time</div>
          <div className="rf-clock__now">{fmtTime(now)}</div>
          <Button
            fullWidth
            onClick={doClockIn}
            icon={<Play size={14} weight="fill" />}
          >
            Clock In
          </Button>
        </>
      ) : (
        <>
          <div className="rf-clock__stats">
            <div className="rf-clock__stat">
              <div className="rf-clock__stat-label">Current time</div>
              <div className="rf-clock__stat-value">{fmtTime(now)}</div>
            </div>
            <div className="rf-clock__stat">
              <div className="rf-clock__stat-label">
                {status === 'break' ? 'Break time' : 'Working time'}
              </div>
              <div className="rf-clock__stat-value">
                {fmtElapsed(status === 'break' ? breakElapsed : workElapsed)}
              </div>
            </div>
          </div>

          <div className="rf-clock__since">
            <span
              className={`rf-clock__pulse ${status === 'break' ? 'rf-clock__pulse--warning' : 'rf-clock__pulse--success'}`}
            />
            {status === 'break'
              ? 'On break'
              : `Clocked in since ${clockInTime ? fmtTime(clockInTime) : '—'}`}
          </div>

          {status === 'working' ? (
            <div className="rf-clock__actions">
              <Button
                variant="danger"
                onClick={doClockOut}
                icon={<StopCircle size={14} weight="fill" />}
                fullWidth
              >
                Clock Out
              </Button>
              <Button
                variant="secondary"
                onClick={doBreakStart}
                icon={<Coffee size={14} />}
              >
                Start Break
              </Button>
            </div>
          ) : (
            <Button
              variant="danger"
              fullWidth
              onClick={doBreakEnd}
              icon={<Play size={14} weight="fill" />}
            >
              End Break
            </Button>
          )}
        </>
      )}
    </div>
  );
}
