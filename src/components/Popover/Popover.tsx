import { type ReactNode, useState, useRef, useEffect, useLayoutEffect, cloneElement, isValidElement, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import './Popover.css';

type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
type PopoverAlign = 'start' | 'center' | 'end';

interface PopoverProps {
  trigger: ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
  children: ReactNode;
  side?: PopoverSide;
  align?: PopoverAlign;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Popover({
  trigger,
  children,
  side = 'bottom',
  align = 'start',
  open: openProp,
  onOpenChange,
  className = '',
}: PopoverProps) {
  const [internal, setInternal] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internal;
  const setOpen = (next: boolean) => {
    if (!isControlled) setInternal(next);
    onOpenChange?.(next);
  };

  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, isControlled]);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !panelRef.current) return;
    const t = triggerRef.current.getBoundingClientRect();
    const p = panelRef.current.getBoundingClientRect();
    const gap = 6;
    let top = 0, left = 0;
    if (side === 'bottom') top = t.bottom + gap;
    if (side === 'top')    top = t.top - p.height - gap;
    if (side === 'left')   { left = t.left - p.width - gap; top = t.top + t.height / 2 - p.height / 2; }
    if (side === 'right')  { left = t.right + gap; top = t.top + t.height / 2 - p.height / 2; }
    if (side === 'top' || side === 'bottom') {
      if (align === 'start')  left = t.left;
      if (align === 'center') left = t.left + t.width / 2 - p.width / 2;
      if (align === 'end')    left = t.right - p.width;
    }
    setCoords({ top: top + window.scrollY, left: left + window.scrollX });
  }, [open, side, align]);

  if (!isValidElement(trigger)) return null;

  const wrappedTrigger = cloneElement(trigger, {
    ref: (node: HTMLElement) => { triggerRef.current = node; },
    onClick: (e: React.MouseEvent) => {
      trigger.props.onClick?.(e);
      setOpen(!open);
    },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  return (
    <>
      {wrappedTrigger}
      {open && createPortal(
        <div
          ref={panelRef}
          className={`rf-popover ${className}`}
          style={coords ? { top: coords.top, left: coords.left } : { opacity: 0 }}
          role="dialog"
        >
          {children}
        </div>,
        document.body
      )}
    </>
  );
}
