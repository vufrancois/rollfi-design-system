import { type ReactNode, useState, useRef, useEffect, useLayoutEffect, cloneElement, isValidElement, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import './HoverCard.css';

type HoverCardSide = 'top' | 'right' | 'bottom' | 'left';

interface HoverCardProps {
  trigger: ReactElement<{ onMouseEnter?: (e: React.MouseEvent) => void; onMouseLeave?: (e: React.MouseEvent) => void }>;
  children: ReactNode;
  side?: HoverCardSide;
  openDelay?: number;
  closeDelay?: number;
  className?: string;
}

export function HoverCard({ trigger, children, side = 'bottom', openDelay = 200, closeDelay = 120, className = '' }: HoverCardProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const cancel = () => {
    if (openTimer.current) { window.clearTimeout(openTimer.current); openTimer.current = null; }
    if (closeTimer.current) { window.clearTimeout(closeTimer.current); closeTimer.current = null; }
  };
  const scheduleOpen = () => { cancel(); openTimer.current = window.setTimeout(() => setOpen(true), openDelay); };
  const scheduleClose = () => { cancel(); closeTimer.current = window.setTimeout(() => setOpen(false), closeDelay); };

  useEffect(() => () => cancel(), []);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !cardRef.current) return;
    const t = triggerRef.current.getBoundingClientRect();
    const c = cardRef.current.getBoundingClientRect();
    const gap = 8;
    let top = 0, left = 0;
    if (side === 'top')    { top = t.top - c.height - gap; left = t.left + t.width / 2 - c.width / 2; }
    if (side === 'bottom') { top = t.bottom + gap;          left = t.left + t.width / 2 - c.width / 2; }
    if (side === 'left')   { left = t.left - c.width - gap; top = t.top + t.height / 2 - c.height / 2; }
    if (side === 'right')  { left = t.right + gap;          top = t.top + t.height / 2 - c.height / 2; }
    setCoords({ top: top + window.scrollY, left: left + window.scrollX });
  }, [open, side]);

  if (!isValidElement(trigger)) return null;

  const wrapped = cloneElement(trigger, {
    ref: (n: HTMLElement) => { triggerRef.current = n; },
    onMouseEnter: (e: React.MouseEvent) => { scheduleOpen(); trigger.props.onMouseEnter?.(e); },
    onMouseLeave: (e: React.MouseEvent) => { scheduleClose(); trigger.props.onMouseLeave?.(e); },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  return (
    <>
      {wrapped}
      {open && createPortal(
        <div
          ref={cardRef}
          className={`rf-hover-card ${className}`}
          onMouseEnter={cancel}
          onMouseLeave={scheduleClose}
          style={coords ? { top: coords.top, left: coords.left } : { opacity: 0 }}
        >
          {children}
        </div>,
        document.body
      )}
    </>
  );
}
