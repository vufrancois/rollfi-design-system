import { type ReactNode, createContext, useContext, useState, useCallback } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import './Accordion.css';

type AccordionType = 'single' | 'multiple';

interface AccordionContextValue {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

interface AccordionProps {
  type?: AccordionType;
  defaultValue?: string | string[];
  children: ReactNode;
  className?: string;
}

export function Accordion({ type = 'single', defaultValue, children, className = '' }: AccordionProps) {
  const [open, setOpen] = useState<Set<string>>(() => {
    if (!defaultValue) return new Set();
    return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
  });

  const isOpen = useCallback((value: string) => open.has(value), [open]);
  const toggle = useCallback(
    (value: string) => {
      setOpen(prev => {
        const next = new Set(type === 'single' && !prev.has(value) ? [] : prev);
        if (next.has(value)) next.delete(value);
        else next.add(value);
        return next;
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div className={`rf-accordion ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: string;
  children: ReactNode;
}

const ItemContext = createContext<string | null>(null);

export function AccordionItem({ value, children }: AccordionItemProps) {
  return (
    <ItemContext.Provider value={value}>
      <div className="rf-accordion__item">{children}</div>
    </ItemContext.Provider>
  );
}

export function AccordionTrigger({ children, trailing }: { children: ReactNode; trailing?: ReactNode }) {
  const ctx = useContext(AccordionContext);
  const value = useContext(ItemContext);
  if (!ctx || value === null) return null;
  const open = ctx.isOpen(value);
  return (
    <button
      type="button"
      className={`rf-accordion__trigger ${open ? 'rf-accordion__trigger--open' : ''}`}
      onClick={() => ctx.toggle(value)}
      aria-expanded={open}
    >
      <span className="rf-accordion__trigger-label">{children}</span>
      {trailing && <span className="rf-accordion__trigger-trailing">{trailing}</span>}
      <CaretDown size={14} className="rf-accordion__chevron" />
    </button>
  );
}

export function AccordionContent({ children }: { children: ReactNode }) {
  const ctx = useContext(AccordionContext);
  const value = useContext(ItemContext);
  if (!ctx || value === null) return null;
  const open = ctx.isOpen(value);
  return (
    <div className={`rf-accordion__content ${open ? 'rf-accordion__content--open' : ''}`}>
      <div className="rf-accordion__content-inner">{children}</div>
    </div>
  );
}
