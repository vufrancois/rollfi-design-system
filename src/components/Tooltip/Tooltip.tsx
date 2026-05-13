import { type ReactNode, useState, useRef, useEffect, useLayoutEffect, cloneElement, isValidElement, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import './Tooltip.css';

type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps {
  content: ReactNode;
  side?: TooltipSide;
  delay?: number;
  children: ReactElement<{ onMouseEnter?: (e: React.MouseEvent) => void; onMouseLeave?: (e: React.MouseEvent) => void; onFocus?: (e: React.FocusEvent) => void; onBlur?: (e: React.FocusEvent) => void }>;
}

export function Tooltip({ content, side = 'top', delay = 200, children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const timer = useRef<number | null>(null);

  const show = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(false);
  };

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !tooltipRef.current) return;
    const t = triggerRef.current.getBoundingClientRect();
    const p = tooltipRef.current.getBoundingClientRect();
    const gap = 8;
    let top = 0, left = 0;
    if (side === 'top')    { top = t.top - p.height - gap;  left = t.left + t.width / 2 - p.width / 2; }
    if (side === 'bottom') { top = t.bottom + gap;          left = t.left + t.width / 2 - p.width / 2; }
    if (side === 'left')   { top = t.top + t.height / 2 - p.height / 2; left = t.left - p.width - gap; }
    if (side === 'right')  { top = t.top + t.height / 2 - p.height / 2; left = t.right + gap; }
    setCoords({ top: top + window.scrollY, left: left + window.scrollX });
  }, [open, side]);

  if (!isValidElement(children)) return children;

  const trigger = cloneElement(children, {
    ref: (node: HTMLElement) => { triggerRef.current = node; },
    onMouseEnter: (e: React.MouseEvent) => { show(); children.props.onMouseEnter?.(e); },
    onMouseLeave: (e: React.MouseEvent) => { hide(); children.props.onMouseLeave?.(e); },
    onFocus: (e: React.FocusEvent) => { show(); children.props.onFocus?.(e); },
    onBlur:  (e: React.FocusEvent) => { hide(); children.props.onBlur?.(e); },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  return (
    <>
      {trigger}
      {open && createPortal(
        <div
          ref={tooltipRef}
          className={`rf-tooltip rf-tooltip--${side}`}
          role="tooltip"
          style={coords ? { top: coords.top, left: coords.left } : { opacity: 0 }}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
}
